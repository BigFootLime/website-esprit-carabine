# To use this Dockerfile, set `output: 'standalone'` in next.config.mjs

FROM node:22.12.0-alpine AS base

# ---------- deps ----------
FROM base AS deps
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app

# (Optional but recommended) match your local npm 10.9.4
RUN npm i -g npm@10.9.4 && npm -v

# 1) Copy manifests BEFORE installing
COPY package.json package-lock.json ./

# 2) Clean, reproducible install
RUN npm ci --audit=false --fund=false

# ---------- build ----------
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
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

# Next standalone output
RUN mkdir -p .next && chown -R nextjs:nodejs .next public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Healthcheck deps
RUN apk add --no-cache curl

USER nextjs
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=30s \
  CMD curl -fsS http://127.0.0.1:3000/ >/dev/null || exit 1

CMD ["node", "server.js"]
