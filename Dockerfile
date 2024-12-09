FROM node:21.4.0 AS base

ARG APP_NAME=web

# Setup pnpm and turbo on the base
RUN npm install -g pnpm turbo typescript prisma @nestjs/cli && \
    pnpm config set store-dir ~/.pnpm-store

WORKDIR /app


COPY . .

RUN rm -rf apps/api/

# First install dependencies and cache them
RUN --mount=type=cache,target=/root/.pnpm-store pnpm install

# Prune and build the specific subworkspace in a single step                   
RUN pnpm turbo build --filter=@apps/${APP_NAME}

FROM node:21.4.0 AS runner

WORKDIR /app

# Copy only the required app
COPY --from=base /app/apps/web /app/apps/web
COPY --from=base /app/node_modules /app/node_modules
COPY --from=base /app/packages /app/packages
COPY --from=base app/apps/web/package.json /app/package.json

RUN npm install -g pnpm

WORKDIR /app/apps/web

EXPOSE 3000

CMD sh -c "pnpm start"
