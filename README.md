# bowatt-instagramm-ui

React + Vite app with Tailwind CSS, Radix UI, TanStack Query, and TanStack Router.

Instagram-style image feed backed by `bowatt-instagramm-api`.

## Prerequisites

- [pnpm](https://pnpm.io/)
- Backend API running on `http://localhost:8080`

## Setup

```bash
pnpm install
```

## Development

copy .env file with the url to api server: `http://localhost:8080`
```bash
cp .env.copy .env
```

Start the API first, then the UI:

```bash
pnpm dev
```

The Vite dev server proxies `/api`, `/images`, and `/ws` to `http://localhost:8080`.

With `VITE_API_BASE_URL=http://localhost:8080` in `.env`, the UI connects directly to the API (including WebSocket at `ws://localhost:8080/ws`).

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
- Tag filter (`/?tags=beach,summer`)
- Image upload at `/upload`
- Live feed updates via STOMP WebSocket (`/topic/images`, event `IMAGE_CREATED`)
