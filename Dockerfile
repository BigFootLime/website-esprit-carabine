# To use this Dockerfile, set `output: 'standalone'` in next.config.mjs

FROM node:22.12.0-alpine AS base

# ---------- deps ----------
FROM base AS deps
# libc6-compat: node prebuilt binaries, openssl: Neon/Postgres TLS
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app

# Pin npm to match your repo's packageManager (prevents npm ci lockfile mismatch)
RUN npm install --omit=peer --no-audit --no-fund

# Copy only manifests for clean, cacheable installs
COPY package.json package-lock.json ./

# Clean install exactly what's in the lockfile
RUN npm ci --audit=false --fund=false

# ---------- build ----------
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Disable telemetry at build
ENV NEXT_TELEMETRY_DISABLED=1

# Build with npm (we have a package-lock.json)
RUN npm run build

# ---------- run ----------
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000

# Non-root user
RUN addgroup --system --gid 1001 nodejs \
 && adduser  --system --uid 1001 nextjs

# Public assets
COPY --from=builder /app/public ./public

# Next standalone server files
RUN mkdir -p .next && chown -R nextjs:nodejs .next public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Healthcheck deps
RUN apk add --no-cache curl

USER nextjs

EXPOSE 3000

# Healthcheck (Coolify-friendly)
HEALTHCHECK --interval=30s --timeout=5s --start-period=30s \
  CMD curl -fsS http://127.0.0.1:3000/ >/dev/null || exit 1

# Next standalone server (JSON form avoids signal issues)
CMD ["node", "server.js"]
