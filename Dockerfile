# 1. Install deps
FROM node:24-alpine3.24 AS deps
RUN apk add --no-cache libc6-compat
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile


# 2. Runner
FROM node:24-alpine3.24 AS runner
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . ./

EXPOSE 3000

CMD [ "pnpm", "run", "start:dev" ]