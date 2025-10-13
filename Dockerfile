# To use this Dockerfile, you do NOT need output: 'standalone' in next.config.mjs

FROM node:22.12.0-alpine AS base

# ---------- deps ----------
FROM base AS deps
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app

# Match your local npm
RUN npm i -g npm@10.9.4 && npm -v

# Copy manifests BEFORE installing
COPY package*.json ./

# Clean, reproducible install
RUN npm ci --audit=false --fund=false

# ---------- build ----------
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
# Ensure public exists (even if empty) so later COPY doesn't fail
RUN mkdir -p public

RUN npm run build

# ---------- run ----------
FROM node:22.12.0-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000

# Users
RUN addgroup --system --gid 1001 nodejs \
 && adduser  --system --uid 1001 nextjs

# Copy runtime files
COPY --from=builder /app/.next ./.next
COPY --from=deps /app/node_modules ./node_modules
RUN mkdir -p public
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# Tools we need at runtime
RUN apk add --no-cache curl su-exec

# Run entrypoint as root so it can chown the mounted dir, then drop to nextjs
COPY docker/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]

EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=30s \
  CMD curl -fsS http://127.0.0.1:3000/ >/dev/null || exit 1

CMD ["npm", "run", "start"]
