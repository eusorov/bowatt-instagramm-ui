FROM node:20-alpine AS development-dependencies-env
ENV CI=true
RUN corepack enable
COPY . /app
WORKDIR /app
RUN pnpm install --frozen-lockfile

FROM node:20-alpine AS build-env
ENV CI=true
ARG VITE_API_BASE_URL=
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
RUN corepack enable
COPY . /app/
COPY --from=development-dependencies-env /app/node_modules /app/node_modules
WORKDIR /app
RUN pnpm run build

FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-env /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
