# To use this Dockerfile, set `output: 'standalone'` in next.config.mjs

FROM node:22.12.0-alpine AS base

# ---------- deps ----------
FROM base AS deps
# libc6-compat: node prebuilt binaries, openssl: Neon/Postgres TLS
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app

# Install deps with your package manager
COPY package.json package-lock.json ./
RUN npm ci --audit=false

# ---------- build ----------
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# (Optional) disable telemetry at build
ENV NEXT_TELEMETRY_DISABLED=1
RUN \
  if [ -f yarn.lock ]; then yarn build; \
  elif [ -f package-lock.json ]; then npm run build; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build; \
  else echo "Lockfile not found." && exit 1; \
  fi

# ---------- run ----------
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000

# Non-root user
RUN addgroup --system --gid 1001 nodejs \
 && adduser  --system --uid 1001 nextjs

# public assets (incl. uploads mount path)
COPY --from=builder /app/public ./public

# standalone server
RUN mkdir -p .next && chown -R nextjs:nodejs .next public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

# Healthcheck (Coolify-friendly)
HEALTHCHECK --interval=30s --timeout=5s --start-period=30s \
  CMD wget -qO- http://127.0.0.1:3000/ > /dev/null || exit 1

# Next standalone server
CMD HOSTNAME="0.0.0.0" node server.js
