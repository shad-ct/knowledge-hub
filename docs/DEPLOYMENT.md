# Knowledge Hub — Production Deployment Status

## Production Endpoints

| Resource | URL |
| :--- | :--- |
| **Web Interface** | [https://knowledge-hub-production-b1d6.up.railway.app](https://knowledge-hub-production-b1d6.up.railway.app) |
| **API Documentation (Swagger UI)** | [https://knowledge-hub-production-b1d6.up.railway.app/api/docs](https://knowledge-hub-production-b1d6.up.railway.app/api/docs) |
| **Health Check** | [https://knowledge-hub-production-b1d6.up.railway.app/health](https://knowledge-hub-production-b1d6.up.railway.app/health) |
| **AI Publishing Endpoint** | `POST https://knowledge-hub-production-b1d6.up.railway.app/api/v1/ai/publish` |
| **AI Platform Context** | [https://knowledge-hub-production-b1d6.up.railway.app/api/v1/ai/context](https://knowledge-hub-production-b1d6.up.railway.app/api/v1/ai/context) |

## Infrastructure

- **Platform**: Railway
- **Project**: `knowledge-hub`
- **Application Service**: `knowledge-hub`
- **Database**: MongoDB (Railway-managed service with persistent volume `/data/db`)
- **Container Port**: 8080 (injected via `process.env.PORT`)
- **Build System**: Railpack / Node.js 24 LTS
- **Architecture**: Single-container deployment where Express serves the compiled Vite React frontend

## Environment Configuration

- `MONGODB_URI`: Injected via Railway private domain reference (`${{MongoDB.MONGO_URL}}`)
- `NODE_ENV`: `production`
- `API_WRITE_KEY`: `kh_sec_live_9921fa40` (required in `X-API-Key` header for write/delete operations)
- `PUBLIC_READ_ACCESS`: `true`

## Deployment Commands Used

```bash
# Initialize and link project
railway init --name knowledge-hub
railway add --database mongo
railway add --service knowledge-hub
railway service knowledge-hub

# Set variables
railway variable set MONGODB_URI='${{MongoDB.MONGO_URL}}' --service knowledge-hub
railway variable set NODE_ENV=production --service knowledge-hub
railway variable set API_WRITE_KEY=kh_sec_live_9921fa40 --service knowledge-hub
railway variable set PUBLIC_READ_ACCESS=true --service knowledge-hub

# Create domain
railway domain --service knowledge-hub

# Build and deploy
npm run build
railway up --service knowledge-hub -y
```
