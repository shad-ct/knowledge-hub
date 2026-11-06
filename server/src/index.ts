import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import path from 'path';
import { fileURLToPath } from 'url';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import dotenv from 'dotenv';

import fs from 'fs';

dotenv.config();

import connectDB from './config/database.js';
import { errorHandler } from './middleware/errorHandler.js';
import articleRoutes from './routes/articles.js';
import topicRoutes from './routes/topics.js';
import categoryRoutes from './routes/categories.js';
import tagRoutes from './routes/tags.js';
import libraryRoutes from './routes/library.js';
import activityRoutes from './routes/activity.js';
import aiRoutes from './routes/ai.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = parseInt(process.env.PORT || '3001');
const NODE_ENV = process.env.NODE_ENV || 'development';

// ─── OpenAPI / Swagger ────────────────────────────────────────────────────────
const swaggerOptions = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'Knowledge Hub API',
      version: '1.0.0',
      description: `
# Knowledge Hub REST API

An AI-powered knowledge repository API. AI agents can publish articles, retrieve topic instructions, and interact with the platform.

## Authentication

Write operations require an API key passed in the \`X-API-Key\` header:

\`\`\`
X-API-Key: your-secret-key
\`\`\`

Read operations are publicly accessible by default.

## AI Agent Workflow

1. \`GET /ai/topics\` — Retrieve active topics
2. \`GET /ai/topics/:id/instructions\` — Get topic writing guidelines
3. Generate content externally (not in this platform)
4. \`POST /ai/publish\` — Submit article to the platform
      `,
      contact: { name: 'Knowledge Hub' },
    },
    servers: [
      { url: 'https://knowledge-hub-production-b1d6.up.railway.app/api/v1', description: 'Production Server (Railway)' },
      { url: '/api/v1', description: 'Current Origin / Relative Path' },
    ],
    components: {
      securitySchemes: {
        ApiKeyAuth: {
          type: 'apiKey',
          in: 'header',
          name: 'X-API-Key',
        },
      },
      schemas: {
        Article: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            title: { type: 'string' },
            slug: { type: 'string' },
            description: { type: 'string' },
            content: { type: 'string' },
            contentType: { type: 'string', enum: ['article', 'research-note', 'observation', 'tutorial', 'explanation', 'experiment', 'reference', 'other'] },
            author: { type: 'string' },
            isRead: { type: 'boolean' },
            readingTime: { type: 'number' },
            status: { type: 'string', enum: ['draft', 'published'] },
            publishedAt: { type: 'string', format: 'date-time' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        AIPublishPayload: {
          type: 'object',
          required: ['title', 'description', 'content', 'author'],
          properties: {
            title: { type: 'string', example: 'Understanding Black Holes' },
            description: { type: 'string', example: 'An introduction to black holes and their physics.' },
            content: { type: 'string', example: '# Black Holes\n\nBlack holes are...' },
            contentType: { type: 'string', enum: ['article', 'research-note', 'observation', 'tutorial', 'explanation', 'experiment', 'reference', 'other'], default: 'article' },
            topic: { type: 'string', example: 'Astrophysics' },
            category: { type: 'string', example: 'Science' },
            tags: { type: 'array', items: { type: 'string' }, example: ['blackholes', 'gravity', 'relativity'] },
            author: { type: 'string', example: 'Claude' },
            sourceUrl: { type: 'string', example: 'https://arxiv.org/...' },
            references: { type: 'array', items: { type: 'string' } },
            status: { type: 'string', enum: ['draft', 'published'], default: 'published' },
          },
        },
      },
    },
    tags: [
      { name: 'Articles', description: 'Article management' },
      { name: 'Topics', description: 'Topic management' },
      { name: 'Categories', description: 'Category management' },
      { name: 'Tags', description: 'Tag management' },
      { name: 'Library', description: 'Bookmarks / reading list' },
      { name: 'Activity', description: 'Activity logs' },
      { name: 'AI', description: 'AI agent integration endpoints' },
    ],
  },
  apis: ['./src/routes/*.ts', './dist/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(
  helmet({
    contentSecurityPolicy: false, // Disabled to allow Swagger UI + KaTeX
    crossOriginEmbedderPolicy: false,
  })
);
app.use(compression());
app.use(morgan(NODE_ENV === 'production' ? 'combined' : 'dev'));

const corsOptions: cors.CorsOptions = {
  origin:
    NODE_ENV === 'production'
      ? (process.env.CORS_ORIGINS || '').split(',').map((s) => s.trim()).filter(Boolean)
      : true,
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'X-API-Key', 'Authorization'],
};
app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// ─── Health Check ─────────────────────────────────────────────────────────────
app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'knowledge-hub',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    environment: NODE_ENV,
  });
});

// ─── API Routes ───────────────────────────────────────────────────────────────
app.use('/api/v1/articles', articleRoutes);
app.use('/api/v1/topics', topicRoutes);
app.use('/api/v1/categories', categoryRoutes);
app.use('/api/v1/tags', tagRoutes);
app.use('/api/v1/library', libraryRoutes);
app.use('/api/v1/activity', activityRoutes);
app.use('/api/v1/ai', aiRoutes);

// ─── API Docs ─────────────────────────────────────────────────────────────────
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'Knowledge Hub API Docs',
}));
app.get('/api/docs.json', (_req, res) => res.json(swaggerSpec));

// ─── Serve Frontend (Production) ──────────────────────────────────────────────
const clientDist = path.join(__dirname, '../../client/dist');
if (fs.existsSync(path.join(clientDist, 'index.html')) || NODE_ENV === 'production') {
  app.use(express.static(clientDist));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api') || req.path === '/health') {
      return next();
    }
    res.sendFile(path.join(clientDist, 'index.html'));
  });
}

// ─── Error Handler ────────────────────────────────────────────────────────────
app.use(errorHandler);

// ─── Start Server ─────────────────────────────────────────────────────────────
const startServer = async (): Promise<void> => {
  try {
    await connectDB();
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Knowledge Hub server running on port ${PORT}`);
      console.log(`📚 API: http://localhost:${PORT}/api/v1`);
      console.log(`📖 Docs: http://localhost:${PORT}/api/docs`);
      console.log(`💚 Health: http://localhost:${PORT}/health`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

export default app;

