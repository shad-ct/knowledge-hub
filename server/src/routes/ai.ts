import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { Article } from '../models/Article.js';
import { Topic } from '../models/Topic.js';
import { Category } from '../models/Category.js';
import { asyncHandler, createError } from '../middleware/errorHandler.js';
import { apiKeyMiddleware } from '../middleware/apiKey.js';
import { generateSlug, ensureUniqueSlug } from '../utils/slug.js';
import { calculateReadingTime } from '../utils/readingTime.js';
import { logActivity } from '../utils/activityLogger.js';
import { resolveOrCreateTags } from '../utils/tagResolver.js';
import { renderPublishUiHtml } from '../views/publishUi.js';
import { Types } from 'mongoose';
import slugify from 'slugify';

const router = Router();

const PRODUCTION_DOMAIN =
  process.env.PUBLIC_DOMAIN ||
  'https://knowledge-hub-production-b1d6.up.railway.app';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getFullUrl(req: Request, path: string): string {
  const origin = req.headers.host
    ? `${req.protocol || 'https'}://${req.headers.host}`
    : PRODUCTION_DOMAIN;
  return `${origin}${path}`;
}

/**
 * Auto-resolves or creates a Topic in MongoDB.
 */
async function resolveOrCreateTopic(topicName?: string): Promise<Types.ObjectId | null> {
  if (!topicName || typeof topicName !== 'string' || !topicName.trim()) {
    return null;
  }
  const cleanName = topicName.trim();
  const slug = slugify(cleanName, { lower: true, strict: true }) || 'topic';

  let topic = await Topic.findOne({
    $or: [
      { slug },
      { name: new RegExp(`^${cleanName}$`, 'i') },
    ],
  });

  if (!topic) {
    topic = await Topic.create({
      name: cleanName,
      slug,
      description: `Comprehensive research and explorations in ${cleanName}.`,
      instructions: `Write scientifically rigorous, high-quality articles, observations, and research notes on ${cleanName}. Include mathematical formulations, citations, and practical insights.`,
      keywords: [cleanName.toLowerCase()],
      suggestedTags: [slug],
      priority: 'high',
      status: 'active',
    });

    await logActivity({
      action: 'topic.created',
      entityType: 'topic',
      entityId: topic._id as Types.ObjectId,
      entityTitle: topic.name,
      actor: 'AI Agent Auto-Resolution',
    });
  }

  return topic._id as Types.ObjectId;
}

/**
 * Auto-resolves or creates a Category in MongoDB.
 */
async function resolveOrCreateCategory(categoryName?: string): Promise<Types.ObjectId | null> {
  if (!categoryName || typeof categoryName !== 'string' || !categoryName.trim()) {
    return null;
  }
  const cleanName = categoryName.trim();
  const slug = slugify(cleanName, { lower: true, strict: true }) || 'general';

  let category = await Category.findOne({
    $or: [
      { slug },
      { name: new RegExp(`^${cleanName}$`, 'i') },
    ],
  });

  if (!category) {
    category = await Category.create({
      name: cleanName,
      slug,
      description: `Articles and research related to ${cleanName}.`,
      color: '#6366f1',
    });

    await logActivity({
      action: 'category.created',
      entityType: 'category',
      entityId: category._id as Types.ObjectId,
      entityTitle: category.name,
      actor: 'AI Agent Auto-Resolution',
    });
  }

  return category._id as Types.ObjectId;
}

/**
 * Normalizes tags from array or comma-separated string.
 */
function normalizeTagsInput(tags: unknown): string[] {
  if (Array.isArray(tags)) {
    return tags.map((t) => String(t).trim()).filter(Boolean);
  }
  if (typeof tags === 'string') {
    return tags.split(',').map((t) => t.trim()).filter(Boolean);
  }
  return [];
}

/**
 * Normalizes references from array or newline/comma string.
 */
function normalizeReferencesInput(references: unknown): string[] {
  if (Array.isArray(references)) {
    return references.map((r) => String(r).trim()).filter(Boolean);
  }
  if (typeof references === 'string') {
    return references
      .split(/[\n\r]+/)
      .map((r) => r.trim())
      .filter(Boolean);
  }
  return [];
}

/**
 * Core article publish/upsert engine.
 * Handles auto-resolution, tag creation, idempotency, and activity logging.
 */
async function publishSingleArticle(rawItem: Record<string, any>, req: Request) {
  const title = (rawItem.title || '').trim();
  if (!title) throw createError('Article title is required', 400);

  const description = (rawItem.description || title).trim();
  const content = (rawItem.content || '').trim();
  if (!content) throw createError('Article content is required', 400);

  const contentType = rawItem.contentType || 'article';
  const author = rawItem.author || 'Gemini';
  const status = rawItem.status === 'draft' ? 'draft' : 'published';
  const allowDuplicate = Boolean(rawItem.allowDuplicate);

  // Auto-resolve topic & category
  const topicId = await resolveOrCreateTopic(rawItem.topic);
  const categoryId = await resolveOrCreateCategory(rawItem.category);
  const topicIds = topicId ? [topicId] : [];

  // Auto-resolve tags & references
  const rawTags = normalizeTagsInput(rawItem.tags);
  const tagIds = await resolveOrCreateTags(rawTags);
  const references = normalizeReferencesInput(rawItem.references);
  const sourceUrl = rawItem.sourceUrl ? String(rawItem.sourceUrl).trim() : undefined;
  const featuredImage = rawItem.featuredImage ? String(rawItem.featuredImage).trim() : undefined;

  const baseSlug = generateSlug(title);
  const readingTime = calculateReadingTime(content);

  // Check for existing article by slug or title for idempotent upsert
  let article = null;
  if (!allowDuplicate) {
    article = await Article.findOne({
      deletedAt: null,
      $or: [{ slug: baseSlug }, { title }],
    });
  }

  const isUpdate = Boolean(article);

  if (article) {
    // Idempotent update
    article.title = title;
    article.description = description;
    article.content = content;
    article.contentType = contentType;
    if (categoryId) article.categoryId = categoryId;
    if (topicIds.length > 0) article.topicIds = topicIds;
    if (tagIds.length > 0) article.tagIds = tagIds;
    article.author = author;
    if (sourceUrl !== undefined) article.sourceUrl = sourceUrl;
    if (references.length > 0) article.references = references;
    if (featuredImage !== undefined) article.featuredImage = featuredImage;
    article.status = status;
    article.readingTime = readingTime;
    article.updatedAt = new Date();
    await article.save();

    await logActivity({
      action: 'article.updated',
      entityType: 'article',
      entityId: article._id as Types.ObjectId,
      entityTitle: article.title,
      actor: author,
      metadata: {
        topic: rawItem.topic,
        category: rawItem.category,
        tags: rawTags,
        contentType,
        isIdempotentUpdate: true,
      },
    });
  } else {
    // Create new article with guaranteed unique slug
    const uniqueSlug = await ensureUniqueSlug(baseSlug);
    article = await Article.create({
      title,
      slug: uniqueSlug,
      description,
      content,
      contentType,
      categoryId,
      topicIds,
      tagIds,
      author,
      sourceUrl,
      references,
      featuredImage,
      status,
      readingTime,
      publishedAt: status === 'published' ? new Date() : undefined,
    });

    await logActivity({
      action: 'article.published_by_ai',
      entityType: 'article',
      entityId: article._id as Types.ObjectId,
      entityTitle: article.title,
      actor: author,
      metadata: {
        topic: rawItem.topic,
        category: rawItem.category,
        tags: rawTags,
        contentType,
      },
    });
  }

  const articlePath = `/articles/${article.slug}`;
  const fullArticleUrl = getFullUrl(req, articlePath);
  const fullApiUrl = getFullUrl(req, `/api/v1/articles/${article._id}`);

  return {
    id: article._id,
    title: article.title,
    slug: article.slug,
    url: articlePath,
    fullUrl: fullArticleUrl,
    apiUrl: fullApiUrl,
    isUpdate,
  };
}

// ─── Endpoints ────────────────────────────────────────────────────────────────

// GET /ai/publish-ui — Flat, agent-friendly quick publish page
router.get(['/publish-ui', '/publish_ui'], (_req: Request, res: Response) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(renderPublishUiHtml());
});

// GET /ai/context — Full platform context for AI agents
router.get(
  '/context',
  asyncHandler(async (req: Request, res: Response) => {
    const [activeTopics, categories, totalArticles, recentArticles] = await Promise.all([
      Topic.find({ status: 'active' }).sort({ priority: -1 }).lean(),
      Category.find().sort({ name: 1 }).lean(),
      Article.countDocuments({ deletedAt: null, status: 'published' }),
      Article.find({ deletedAt: null, status: 'published' })
        .sort({ publishedAt: -1 })
        .limit(5)
        .select('title slug author publishedAt contentType')
        .lean(),
    ]);

    res.json({
      success: true,
      data: {
        platform: 'Knowledge Hub',
        description: 'An AI-powered knowledge repository. External AI agents can publish articles with zero authentication.',
        publishEndpoint: '/api/v1/ai/publish',
        batchPublishEndpoint: '/api/v1/ai/publish/batch',
        publishUiUrl: getFullUrl(req, '/ai/publish-ui'),
        totalArticles,
        activeTopics: activeTopics.map((t) => ({
          id: t._id,
          name: t.name,
          slug: t.slug,
          description: t.description,
          priority: t.priority,
          instructionsUrl: `/api/v1/ai/topics/${t.slug}/instructions`,
        })),
        categories: categories.map((c) => ({ id: c._id, name: c.name, slug: c.slug })),
        recentArticles: recentArticles.map((a) => ({
          ...a,
          url: `/articles/${a.slug}`,
          fullUrl: getFullUrl(req, `/articles/${a.slug}`),
        })),
        contentTypes: [
          'article', 'research-note', 'observation', 'tutorial',
          'explanation', 'experiment', 'reference', 'other',
        ],
      },
    });
  })
);

// GET /ai/topics — List active research topics
router.get(
  '/topics',
  asyncHandler(async (_req: Request, res: Response) => {
    const topics = await Topic.find({ status: 'active' })
      .sort({ priority: -1, name: 1 })
      .select('name slug description instructions keywords suggestedTags priority status')
      .lean();

    res.json({ success: true, data: topics });
  })
);

// POST /ai/topics — Create or update research topic
router.post(
  '/topics',
  apiKeyMiddleware,
  asyncHandler(async (req: Request, res: Response) => {
    const { name, description, instructions, keywords, suggestedTags, priority, status } = req.body;
    if (!name || !instructions) {
      throw createError('Topic name and instructions are required', 400);
    }

    const cleanName = name.trim();
    const slug = slugify(cleanName, { lower: true, strict: true }) || 'topic';

    let topic = await Topic.findOne({
      $or: [{ slug }, { name: new RegExp(`^${cleanName}$`, 'i') }],
    });

    const isNew = !topic;

    if (topic) {
      if (description) topic.description = description;
      if (instructions) topic.instructions = instructions;
      if (keywords) topic.keywords = normalizeTagsInput(keywords);
      if (suggestedTags) topic.suggestedTags = normalizeTagsInput(suggestedTags);
      if (priority) topic.priority = priority;
      if (status) topic.status = status;
      await topic.save();
    } else {
      topic = await Topic.create({
        name: cleanName,
        slug,
        description: description || `Research topic for ${cleanName}`,
        instructions,
        keywords: normalizeTagsInput(keywords),
        suggestedTags: normalizeTagsInput(suggestedTags),
        priority: priority || 'high',
        status: status || 'active',
      });
    }

    await logActivity({
      action: isNew ? 'topic.created' : 'topic.updated',
      entityType: 'topic',
      entityId: topic._id as Types.ObjectId,
      entityTitle: topic.name,
      actor: req.body.author || 'AI Agent',
    });

    res.status(isNew ? 201 : 200).json({
      success: true,
      message: isNew ? 'Topic created successfully' : 'Topic updated successfully',
      data: topic,
    });
  })
);

// GET /ai/topics/:slug/instructions — Get topic guidelines
router.get(
  '/topics/:slug/instructions',
  asyncHandler(async (req: Request, res: Response) => {
    const param = req.params.slug;
    const isId = param.match(/^[0-9a-f]{24}$/);

    const topic = await Topic.findOne({
      $or: [
        ...(isId ? [{ _id: param }] : []),
        { slug: param },
        { name: new RegExp(`^${param}$`, 'i') },
      ],
    });

    if (!topic) throw createError(`Topic "${param}" not found`, 404);

    res.json({
      success: true,
      data: {
        id: topic._id,
        name: topic.name,
        slug: topic.slug,
        description: topic.description,
        instructions: topic.instructions,
        keywords: topic.keywords,
        suggestedTags: topic.suggestedTags,
        priority: topic.priority,
        status: topic.status,
      },
    });
  })
);

// POST /ai/publish — Main flexible publishing endpoint (Single, Batch, or Form)
router.post(
  '/publish',
  apiKeyMiddleware,
  asyncHandler(async (req: Request, res: Response) => {
    const body = req.body;

    // Case 1: Batch array at root [...]
    if (Array.isArray(body)) {
      const results = [];
      for (const item of body) {
        results.push(await publishSingleArticle(item, req));
      }
      res.status(200).json({
        success: true,
        count: results.length,
        results,
        data: results,
      });
      return;
    }

    // Case 2: Batch object wrapper { articles: [...] }
    if (body.articles && Array.isArray(body.articles)) {
      const results = [];
      for (const item of body.articles) {
        results.push(await publishSingleArticle(item, req));
      }
      res.status(200).json({
        success: true,
        count: results.length,
        results,
        data: results,
      });
      return;
    }

    // Case 3: Single article object
    const result = await publishSingleArticle(body, req);

    res.status(result.isUpdate ? 200 : 201).json({
      success: true,
      message: result.isUpdate ? 'Article updated successfully (idempotent)' : 'Article published successfully',
      data: result,
    });
  })
);

// POST /ai/publish/batch — Dedicated Batch endpoint
router.post(
  '/publish/batch',
  apiKeyMiddleware,
  asyncHandler(async (req: Request, res: Response) => {
    const body = req.body;
    const articles = Array.isArray(body) ? body : body.articles;

    if (!articles || !Array.isArray(articles)) {
      throw createError('Request body must be an array of articles or contain an "articles" array field', 400);
    }

    const results = [];
    for (const item of articles) {
      results.push(await publishSingleArticle(item, req));
    }

    res.status(200).json({
      success: true,
      count: results.length,
      results,
      data: results,
    });
  })
);

// POST /ai/publish-form — Zero-JS Form fallback handler
router.post(
  '/publish-form',
  apiKeyMiddleware,
  asyncHandler(async (req: Request, res: Response) => {
    const result = await publishSingleArticle(req.body, req);

    // If client requested JSON, respond with JSON
    if (req.headers.accept && req.headers.accept.includes('application/json')) {
      res.status(201).json({ success: true, data: result });
      return;
    }

    // Otherwise redirect to the published article or send a confirmation HTML page
    res.redirect(result.url);
  })
);

// PATCH /ai/articles/:id — Update existing article
router.patch(
  '/articles/:id',
  apiKeyMiddleware,
  asyncHandler(async (req: Request, res: Response) => {
    const article = await Article.findOne({ _id: req.params.id, deletedAt: null });
    if (!article) throw createError('Article not found', 404);

    const data = req.body;
    if (data.content) data.readingTime = calculateReadingTime(data.content);
    if (data.tags) {
      const normalized = normalizeTagsInput(data.tags);
      data.tagIds = await resolveOrCreateTags(normalized);
      delete data.tags;
    }
    if (data.references) {
      data.references = normalizeReferencesInput(data.references);
    }
    data.updatedAt = new Date();

    const updated = await Article.findByIdAndUpdate(
      req.params.id,
      { $set: data },
      { new: true }
    );

    await logActivity({
      action: 'article.updated',
      entityType: 'article',
      entityId: article._id as Types.ObjectId,
      entityTitle: updated?.title || article.title,
      actor: data.author || article.author,
    });

    res.json({
      success: true,
      data: {
        id: updated?._id,
        title: updated?.title,
        slug: updated?.slug,
        url: `/articles/${updated?.slug}`,
        fullUrl: getFullUrl(req, `/articles/${updated?.slug}`),
      },
    });
  })
);

// GET /ai/recent-articles — Fetch recent articles
router.get(
  '/recent-articles',
  asyncHandler(async (req: Request, res: Response) => {
    const limit = Math.min(50, Math.max(1, parseInt((req.query.limit as string) || '10', 10)));
    const articles = await Article.find({ deletedAt: null, status: 'published' })
      .sort({ publishedAt: -1 })
      .limit(limit)
      .select('title slug description author publishedAt contentType categoryId')
      .populate('categoryId', 'name slug')
      .lean();

    res.json({
      success: true,
      data: articles.map((a) => ({
        id: a._id,
        title: a.title,
        slug: a.slug,
        description: a.description,
        author: a.author,
        contentType: a.contentType,
        category: (a.categoryId as any)?.name || 'General',
        publishedAt: a.publishedAt,
        url: `/articles/${a.slug}`,
        fullUrl: getFullUrl(req, `/articles/${a.slug}`),
      })),
    });
  })
);

export default router;
