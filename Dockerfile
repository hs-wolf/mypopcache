FROM node:lts-alpine AS base

RUN corepack enable

COPY . /app
WORKDIR /app

FROM base AS prod-deps
RUN pnpm install --prod --frozen-lockfile --ignore-scripts

FROM base AS build
RUN pnpm install --frozen-lockfile --ignore-scripts
RUN pnpm run build 

FROM base
COPY --from=prod-deps /app/node_modules /app/node_modules
COPY --from=build /app/.output /app/.output

CMD ["node", "./.output/server/index.mjs"]