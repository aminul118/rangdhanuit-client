# syntax=docker/dockerfile:1

ARG NODE_VERSION=22

FROM node:${NODE_VERSION}-alpine AS base

RUN apk add --no-cache wget

RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001 -G nodejs

FROM base AS deps

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

ENV HUSKY=0

COPY pnpm-lock.yaml package.json ./

RUN pnpm install --frozen-lockfile

FROM base AS build

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV HUSKY=0
ENV NEXT_TELEMETRY_DISABLED=1

RUN pnpm build

FROM base AS production

WORKDIR /app

COPY --chown=nodejs:nodejs --from=deps /app/package.json ./package.json
COPY --chown=nodejs:nodejs --from=deps /app/pnpm-lock.yaml ./pnpm-lock.yaml

RUN corepack enable && corepack prepare pnpm@latest --activate && \
    pnpm install --frozen-lockfile --prod && \
    pnpm store prune

COPY --chown=nodejs:nodejs --from=build /app/.next ./.next
COPY --chown=nodejs:nodejs --from=build /app/public ./public
COPY --chown=nodejs:nodejs --from=build /app/next.config.ts ./next.config.ts

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

USER nodejs

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
    CMD wget -qO- http://localhost:3000 || exit 1

CMD ["pnpm", "start"]
