import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import path from 'path';
import { fileURLToPath } from 'url';
import swaggerUi from 'swagger-ui-express';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

import connectDB from './config/database.js';
import { openApiSpec } from './config/openApiSpec.js';
import { renderPublishUiHtml } from './views/publishUi.js';
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

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(
  helmet({
    contentSecurityPolicy: false, // Disabled to allow Swagger UI + KaTeX + Agent Publisher UI
    crossOriginEmbedderPolicy: false,
  })
);
app.use(compression());
app.use(morgan(NODE_ENV === 'production' ? 'combined' : 'dev'));

// Permissive CORS for AI agents, external integrations, and browser automation
const corsOptions: cors.CorsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'X-API-Key', 'Authorization', 'Accept', 'Origin', 'X-Requested-With'],
  credentials: false,
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ─── Health Check ─────────────────────────────────────────────────────────────
app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'knowledge-hub',
    version: '2.0.0',
    timestamp: new Date().toISOString(),
    environment: NODE_ENV,
    requireApiKey: process.env.REQUIRE_API_KEY === 'true',
  });
});

// ─── Dedicated Flat Agent Fast-Publish UI ──────────────────────────────────────
app.get(['/ai/publish-ui', '/ai/publish_ui'], (_req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(renderPublishUiHtml());
});

// ─── API Routes ───────────────────────────────────────────────────────────────
app.use('/api/v1/articles', articleRoutes);
app.use('/api/v1/topics', topicRoutes);
app.use('/api/v1/categories', categoryRoutes);
app.use('/api/v1/tags', tagRoutes);
app.use('/api/v1/library', libraryRoutes);
app.use('/api/v1/activity', activityRoutes);
app.use('/api/v1/ai', aiRoutes);

// ─── OpenAPI 3.0 Documentation & Swagger UI ───────────────────────────────────
app.get('/api/docs.json', (_req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.json(openApiSpec);
});

app.use(
  '/api/docs',
  swaggerUi.serve,
  swaggerUi.setup(openApiSpec, {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'Knowledge Hub API Documentation',
    swaggerOptions: {
      docExpansion: 'list',
      tryItOutEnabled: true,
      persistAuthorization: true,
    },
  })
);

// ─── Serve Frontend (Production) ──────────────────────────────────────────────
const clientDist = path.join(__dirname, '../../client/dist');
if (fs.existsSync(path.join(clientDist, 'index.html')) || NODE_ENV === 'production') {
  app.use(express.static(clientDist));
  app.get('*', (req, res, next) => {
    if (
      req.path.startsWith('/api') ||
      req.path.startsWith('/ai') ||
      req.path === '/health'
    ) {
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
      console.log(`⚡ Agent UI: http://localhost:${PORT}/ai/publish-ui`);
      console.log(`💚 Health: http://localhost:${PORT}/health`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

export default app;
