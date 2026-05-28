# Aangan Restaurant

MERN stack restaurant website — separate **client** (React + Vite + TanStack Query) and **server** (Express + MongoDB).

## Structure

```
Aangan_Restaurant/
├── client/          # Frontend — install & run independently
│   └── src/
│       ├── hooks/queries/     # TanStack Query hooks
│       ├── hooks/mutations/
│       ├── services/api.js    # API client
│       └── ...
└── server/          # Backend API — install & run independently
```

## Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)

## Setup

### Quick start (recommended)

From the repo root:

```bash
npm install
cd server && npm install && cp .env.example .env && cd ..
cd client && npm install && cd ..
cd server && npm run seed && cd ..   # first time only
npm run dev                          # starts API, then client
```

Open **only** the URL Vite prints (usually `http://localhost:5173/`).

### Manual start (two terminals)

**Server**

```bash
cd server
npm install
cp .env.example .env    # edit MONGO_URI, JWT_SECRET, etc.
npm run seed            # first time only — seeds admin + menu
npm run dev             # http://localhost:5000
```

**Client** (after the server is running)

```bash
cd client
npm install
npm run dev             # http://localhost:5173
```

Vite proxies `/api` and `/uploads` to the port in `server/.env` (`PORT`, default 5000).

## Troubleshooting

| Problem | Cause | Fix |
|---------|--------|-----|
| Page has no styling (plain HTML) | Wrong dev URL | Close other apps on port 5173, then use **this project's** Vite URL only. If `npm run dev` in `client/` fails with "port in use", stop the other process: `netstat -ano \| findstr :5173` then `taskkill /PID <pid> /F`. |
| `[vite] http proxy error` / `ECONNREFUSED` | API not running (or wrong port) | Start server first: `cd server && npm run dev`, or use root `npm run dev`. Ensure `server/.env` `PORT` matches what Vite proxies to (default 5000). |
| `MongoDB connection error: bad auth` | Invalid Atlas password in `MONGO_URI` | Fix credentials in [MongoDB Atlas](https://cloud.mongodb.com), or use local `mongodb://127.0.0.1:27017/aangan` in `server/.env`. URL-encode special characters in passwords. |
| `Request failed: 500` / empty menu | DB not seeded or not connected | After MongoDB connects: `cd server && npm run seed` |

## Integration

| Feature | API | TanStack Query |
|---------|-----|----------------|
| Menu (home + order page) | `GET /api/foods` | `useFoodsQuery` |
| Hero carousel | `GET /api/banners` | `useBannersQuery` |
| Place order | `POST /api/orders` | `useCreateOrderMutation` |

## Scripts

**Root**

| Command | Description |
|---------|-------------|
| `npm run dev` | Server + client (waits for API before Vite) |
| `npm run dev:server` | API only |
| `npm run dev:client` | Vite only (start server first) |

**Client** (`cd client`)

| Command | Description |
|---------|-------------|
| `npm run dev` | Vite dev server |
| `npm run build` | Production build |
| `npm run lint` | ESLint |

**Server** (`cd server`)

| Command | Description |
|---------|-------------|
| `npm run dev` | Nodemon API |
| `npm run start` | Production API |
| `npm run seed` | Seed DB |

## Re-seed menu

If you have old pizza/burger seed data, clear the `foods` collection in MongoDB and run `npm run seed` again in the server folder.
