# Knowledge Hub

**Knowledge Hub** is an AI‑powered, full‑stack knowledge repository where users can create, organise, search and share articles, topics, categories and tags. It combines a React‑Vite frontend with an Express‑Node backend backed by MongoDB, provides a public‑read API (optionally protected by an API key) and an “AI Publish” UI for generating article drafts with large language models.

---

## Table of Contents

1. [What it is](#what-it-is)  
2. [How it works](#how-it-works)  
3. [Use‑cases](#use-cases)  
4. [Self‑hosting guide](#self-hosting-guide)  
5. [Running locally](#running-locally)  
6. [Deployment (Railway)](#deployment-railway)  
7. [Environment variables](#environment-variables)  
8. [API usage](#api-usage)  
9. [Frontend UI](#frontend-ui)  
10. [License](#license)

---

## 1. What it is

- **AI‑powered knowledge base** – store articles, group them into topics, categories and tags.  
- **Full‑text search & filtering** – search by title, tag, category or topic.  
- **Publish UI** – a dedicated `/ai/publish‑ui` endpoint that lets an LLM generate a draft article from a prompt.  
- **OpenAPI‑documented REST API** – complete CRUD operations, versioned under `/api/v1/`.  
- **Swagger UI** – interactive docs at `/api/docs`.  
- **Health check** – `/health` returns service status, version, environment and whether an API key is required.  
- **CORS‑open by default** – useful for AI agents, browser automation and external integrations.

---

## 2. How it works

| Layer | Technology | Responsibility |
|------|------------|----------------|
| **Frontend** | React + Vite, TypeScript, TailwindCSS | UI pages (Home, Articles, Article detail, Create/Edit, Tags, Topics, Library, Settings, etc.). Consumes `/api/v1/*` endpoints. |
| **Backend** | Node.js (ESM), Express, Mongoose, middlewares (helmet, cors, compression, morgan) | Exposes REST routes, validates API keys, handles DB operations, serves OpenAPI spec, renders the Publish UI. |
| **Database** | MongoDB (via Mongoose) | Stores `articles`, `topics`, `categories`, `tags`, `activity logs`, bookmarks, etc. |
| **AI routes** | Custom `ai.ts` route | Calls an LLM (configured elsewhere) to generate article drafts; the UI at `/ai/publish‑ui` uses this. |
| **Deployments** | Railway (Nixpacks build) | `railway.json` defines build & start commands; the service is automatically deployed on push. |

Data flow:

1. User interacts with the React UI.  
2. UI sends `fetch('/api/v1/articles', {...})` (or other resource) with optional `X‑API‑Key` header for write actions.  
3. Express validates the key (if `REQUIRE_API_KEY=true`), routes to the appropriate Mongoose model, performs the operation, returns JSON.  
4. UI updates the view; activity is logged in `ActivityLog` model.

---

## 3. Use‑cases

- **Personal knowledge vault** – store notes, research papers, code snippets; searchable by tag or topic.  
- **Team documentation** – centralised docs with controlled write access via API key.  
- **AI‑assisted content creation** – use the Publish UI to generate first‑draft articles, then edit manually.  
- **Knowledge‑base API** – expose a structured API for external tools (bots, IDE plugins, etc.).  
- **Learning platform** – topics can represent courses; articles can be lessons with markdown formatting.

---

## 4. Self‑hosting guide

### 4.1 Prerequisites

- **Node.js** >= 18 (LTS).  
- **MongoDB** instance (local MongoDB, MongoDB Atlas, or any compatible server).  
- **Git** to clone the repository.

### 4.2 Clone & install

```bash
git clone https://github.com/your‑org/knowledge-hub.git   # (or the actual repo URL)
cd knowledge-hub
npm install               # installs root deps (none besides the sdk)
cd server && npm install
cd ../client && npm install
```

### 4.3 Environment configuration

Copy `.env.example` to `.env` and fill the values:

```bash
cp .env.example .env
```

**Required variables** (see `.env.example` for defaults):

| Variable | Description |
|----------|-------------|
| `MONGODB_URI` | Full MongoDB connection string (e.g. `mongodb://localhost:27017/knowledge-hub`) |
| `PORT` | Server port (default `3001`) |
| `NODE_ENV` | `development` or `production` |
| `API_WRITE_KEY` | Secret key; write operations require `X‑API‑Key: <this value>` if `REQUIRE_API_KEY=true` |
| `CORS_ORIGINS` | Comma‑separated list of allowed front‑end origins (leave `*` for dev) |
| `PUBLIC_READ_ACCESS` | `true` if unauthenticated GETs should be allowed (default `true`) |
| `VITE_API_URL` (optional) | Base URL of the API for the client; if omitted the client points to the same host. |

### 4.4 Running locally

Start the backend:

```bash
cd server
npm run dev          # uses nodemon / ts-node for hot reload
```

Start the frontend (runs on `http://localhost:5173` by default):

```bash
cd client
npm run dev
```

The backend will listen on `http://0.0.0.0:3001` and the client on port `5173`. Open `http://localhost:5173` in a browser.

### 4.5 Production build

```bash
npm run build          # builds client (vite) and server (tsc)
npm start              # starts the server (node dist/index.js)
```

### 4.6 Docker (optional)

A Dockerfile is not provided, but the Railway `railway.json` uses **Nixpacks** to build and deploy automatically. If you prefer Docker, you can create one based on the `Nixpacks` build command:

```dockerfile
# Example multi‑stage Dockerfile – not part of the repo
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build   # adapt to your build script

FROM node:20-alpine AS runtime
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server/package*.json ./server/
RUN cd server && npm install --production
EXPOSE 3001
CMD ["node", "server/dist/index.js"]
```

### 4.7 Railway deployment

The project already contains `railway.json`. After linking the GitHub repo to Railway:

1. Create a new project on Railway.  
2. Click **New Service** → **Deploy from GitHub** and select this repo.  
3. Railway will run the build defined in `railway.json` (`npm install && npm run build` across client then server).  
4. The service will be live at a `*.up.railway.app` domain.

---

## 5. Running locally (quick commands)

```bash
# 1️⃣ Install
cd server && npm install
cd ../client && npm install

# 2️⃣ Configure
cp .env.example .env   # edit as described above

# 3️⃣ Start both
# terminal 1
cd server && npm run dev
# terminal 2
cd client && npm run dev
```

Visit `http://localhost:5173`.

---

## 6. Deployment (Railway)

The `railway.json` configures Nixpacks to:

1. `cd client && npm install && npm run build`
2. `cd ../server && npm install && npm run build`
3. Start the server with `cd server && npm start`

No extra steps are required. Just connect the repo, and Railway will auto‑deploy on each push.

---

## 7. Environment variables (full list)

```dotenv
# MongoDB
MONGODB_URI=mongodb://localhost:27017/knowledge-hub

# Server
PORT=3001
NODE_ENV=development

# Security (optional but recommended)
API_WRITE_KEY=your-secret-key-here

# CORS
CORS_ORIGINS=http://localhost:5173

# Public read access
PUBLIC_READ_ACCESS=true

# Client API base (optional)
# VITE_API_URL=https://knowledge-hub-production-b1d6.up.railway.app/api/v1
```

*All variables are read by `dotenv` at startup; missing required vars cause the server to exit with an error.*

---

## 8. API usage

All endpoints are under `/api/v1/`. The table below summarises the most used routes; see the generated OpenAPI spec at `/api/docs` for full details.

| Method | Path | Description | Auth |
|--------|------|-------------|------|
| `GET` | `/health` | Service health, version, environment, `requireApiKey` flag | None |
| `GET` | `/api/v1/articles` | List articles (filter by topic, category, tag) | Optional (key required if `REQUIRE_API_KEY=true` and method is write) |
| `POST` | `/api/v1/articles` | Create a new article | **X‑API‑Key** required |
| `GET` | `/api/v1/articles/:id` | Retrieve a single article | Optional |
| `PATCH` | `/api/v1/articles/:id` | Update article | **X‑API‑Key** required |
| `DELETE` | `/api/v1/articles/:id` | Soft‑delete article | **X‑API‑Key** required |
| `GET` | `/api/v1/topics` | List topics | Optional |
| `POST` | `/api/v1/topics` | Create topic | **X‑API‑Key** required |
| `GET` | `/api/v1/categories` | List categories | Optional |
| `POST` | `/api/v1/categories` | Create category | **X‑API‑Key** required |
| `GET` | `/api/v1/tags` | List tags | Optional |
| `POST` | `/api/v1/tags` | Create tag | **X‑API‑Key** required |
| `GET` | `/api/v1/library` | Browse the library (curated view) | Optional |
| `POST` | `/api/v1/activity` | Log activity (used internally) | Optional |
| `GET` | `/api/v1/ai/publish-ui` | Render the AI Publish UI HTML | None |
| `GET` | `/api/docs.json` | Raw OpenAPI 3.0 JSON | None |
| `GET` | `/api/docs` | Swagger UI (interactive) | None |

**Example curl request (create article):**

```bash
curl -X POST http://localhost:3001/api/v1/articles \
  -H "Content-Type: application/json" \
  -H "X-API-Key: your-secret-key-here" \
  -d '{"title":"My First Article","slug":"my-first-article","content":"# Hello world","topicId":"...","categoryId":"...","tagIds":[...]}'
```

**Example curl request (list articles, public read):**

```bash
curl http://localhost:3001/api/v1/articles
```

---

## 9. Frontend UI

| Page | URL (local) | Purpose |
|------|-------------|---------|
| Home | `http://localhost:5173` | Overview of recent articles, quick search |
| Articles | `http://localhost:5173/articles` | List, create, edit, delete articles |
| Article detail | `http://localhost:5173/articles/:id` | View a single article |
| Create Article | `http://localhost:5173/articles/create` | Form to write a new article (populates topic/category/tags) |
| Edit Article | `http://localhost:5173/articles/:id/edit` | Modify existing article |
| Tags | `http://localhost:5173/tags` | List & manage tags |
| Topics | `http://localhost:5173/topics` | List & manage topics |
| Library | `http://localhost:5173/library` | Curated collection of articles |
| Settings | `http://localhost:5173/settings` | Toggle public read API key requirements, etc. |
| AI Publish UI | `http://localhost:5173/ai/publish-ui` | OpenAI‑powered draft generator (POST to `/api/v1/ai/...` internally) |

All UI pages consume the `/api/v1/*` endpoints. Write actions include the `X‑API‑Key` header when `REQUIRE_API_KEY` is `true`.

---

## 10. License

This project is **private** and source‑available. See the root `LICENSE` (or the repository) for details. Use of the `modelcontextprotocol/sdk` dependency follows that library's license.

---

*Generated automatically from the codebase on 2026‑11‑08.*