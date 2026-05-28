# bowatt-instagramm-ui

Instagram-style image feed backed by `bowatt-instagramm-api`.

## Prerequisites

- [pnpm](https://pnpm.io/)
- Backend API running on `http://localhost:8080`. To run the backend API see README.md in repo of the backend api.


## Stack

| Layer | Technology |
|--------|------------|
| Language | TypeScript |
| Framework | **React + Vite** |
| Router | **TanStack** |
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

## Features

- Vertical image feed with infinite scroll
- Image upload at `/upload`
- Live feed updates via STOMP WebSocket (`/topic/images`, event `IMAGE_CREATED`)
