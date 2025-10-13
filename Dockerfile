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
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000

# Non-root user
RUN addgroup --system --gid 1001 nodejs \
 && adduser  --system --uid 1001 nextjs

# Copy runtime files
# 1) Next build output
COPY --from=builder /app/.next ./.next
# 2) node_modules from deps
COPY --from=deps /app/node_modules ./node_modules
# 3) public (may be empty)
RUN mkdir -p public
COPY --from=builder /app/public ./public
# 4) package.json so `npm run start` works
COPY --from=builder /app/package.json ./package.json

RUN mkdir -p /app/public/uploads \
 && chown -R nextjs:nodejs /app/public \
 && chown -R nextjs:nodejs /app/.next
 
# Healthcheck deps
RUN apk add --no-cache curl

USER nextjs
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=30s \
  CMD curl -fsS http://127.0.0.1:3000/ >/dev/null || exit 1

# Use Next's server
CMD ["npm", "run", "start"]
