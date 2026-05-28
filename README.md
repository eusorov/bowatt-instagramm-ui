# bowatt-instagramm-ui

Instagram-style image feed backed by [bowatt-instagramm-api](https://github.com/eusorov/bowatt-instagramm-api).

## Prerequisites

- [pnpm](https://pnpm.io/)
- Backend API running on `http://localhost:8080`. To run the backend API see README.md in repo of the backend api.

## Decisions
The frontend is a simple React + Vite setup. The API uses Tanstack to fetch and cache data.
The images are coming paginated from API, with infitive scroll next page is fetched.
The backend can notify frontend about new image via websockets, then the tanstack query is invalidated.

## Features:
- user can upload new images with a title and tags.
- user can see uploaded images with their titles and tags. The feed is updated live via a websocket.
- user can filter the feed by tags.
- Dockerfile is created
- there is an infinite-scroll feed

## Out of scope
- user authentification
- server / client security with JWT
- progress bar 

## Stack

| Layer | Technology |
|--------|------------|
| Language | TypeScript |
| Framework | **React + Vite** |
| Router | **TanStack** |
| API Layer | **TanStack** |
| UI | **Radix UI** |
| CSS | **Tailwind** |

## Setup locally

```bash
pnpm install
```

## Development

copy .env file with the url to api server: `http://localhost:8080`
```bash
cp .env.copy .env
```
With `VITE_API_BASE_URL=http://localhost:8080` in `.env`, the UI connects directly to the API (including WebSocket at `ws://localhost:8080/ws`).

Start the API first, then the UI:

```bash
pnpm dev
```

## Build

```bash
pnpm build
pnpm preview
```

For production when UI and API are on different origins, set:

```bash
VITE_API_BASE_URL=http://localhost:8080 pnpm build
```

## Docker
There is a Dockerfile and docker compose file to create / run the UI in an container. The backend API still needs to be run before. There is a docker-compose.deploy.yml file to deploy on [VPS](https://insta.usomi.de). It uses also letsencrypt for handling SSL. 

