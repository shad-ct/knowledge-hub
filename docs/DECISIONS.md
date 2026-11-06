# Knowledge Hub — Technical Decisions

## Decision 001: Monorepo Structure
**Decision:** Use a single git repository with `server/` and `client/` subdirectories.
**Context:** Simplifies deployment, keeps related code together, easier Railway configuration.
**Alternatives:** Separate repos, nx monorepo, turborepo.
**Reason:** Simplest approach for a two-package project. Railway can build from a single repo. Backend serves frontend static files in production.
**Consequences:** Single deployment unit. Must configure build order correctly.

## Decision 002: Backend Serves Frontend in Production
**Decision:** Express backend serves the compiled Vite output (`client/dist`) as static files.
**Context:** Railway deployment simplicity; avoids needing two services for a personal tool.
**Alternatives:** Separate Railway services for frontend and backend; Cloudflare Pages for frontend.
**Reason:** Single Railway service = simpler deployment, one URL, no CORS configuration in production.
**Consequences:** Backend must have a build step that compiles the frontend. Dev mode uses Vite dev server.

## Decision 003: No Authentication System
**Decision:** No login, sessions, or JWT. API key (env var) protects write endpoints only.
**Context:** Specification requirement. This is a personal self-hosted tool.
**Alternatives:** Basic auth, JWT, Clerk.
**Reason:** Requirement explicitly forbids authentication systems. API key is minimal protection for the write API.
**Consequences:** Anyone with network access to the read API can browse articles. Acceptable for self-hosted use.

## Decision 004: MongoDB Text Indexes for Search
**Decision:** Use MongoDB's built-in text indexes on article title, description, and content fields.
**Context:** Need full-text search without adding a separate search service.
**Alternatives:** Elasticsearch, Typesense, Meilisearch, manual regex.
**Reason:** No additional infrastructure needed. Adequate for a personal knowledge hub. Can be upgraded later.
**Consequences:** Search is case-insensitive but limited compared to dedicated search engines. No fuzzy matching.

## Decision 005: Soft Deletion with Trash System
**Decision:** Articles are soft-deleted by setting `deletedAt` timestamp. Permanent deletion is a separate action from the Trash page.
**Context:** Requirement specifies a recoverable trash system.
**Alternatives:** Hard delete with backup, archiving.
**Reason:** Prevents accidental data loss. Standard pattern for content management systems.
**Consequences:** All article queries must filter `deletedAt: null` by default. Trash queries filter `deletedAt: { $ne: null }`.

## Decision 006: Markdown Rendering Stack
**Decision:** react-markdown + rehype-highlight (Shiki) + remark-math + rehype-katex + remark-gfm.
**Context:** Need full-featured Markdown with syntax highlighting, math, tables, and code blocks.
**Alternatives:** marked.js, MDX, Tiptap.
**Reason:** react-markdown is the standard React Markdown renderer. The rehype/remark plugin ecosystem covers all required features.
**Consequences:** Bundle size impact. Must configure CSP headers appropriately.

## Decision 007: Validation with Zod
**Decision:** Use Zod for request body validation on all API endpoints.
**Context:** Need runtime type safety for incoming API payloads, especially from external AI agents.
**Alternatives:** Joi, express-validator, Yup.
**Reason:** Zod integrates cleanly with TypeScript, provides excellent error messages, and is widely adopted.
**Consequences:** Slight added dependency. Validation errors are returned as structured JSON.

## Decision 008: Activity Logging as Service
**Decision:** Create a dedicated `ActivityLogger` service that all route handlers call. Logging is best-effort (failures don't block the main operation).
**Context:** Every significant operation must be logged to MongoDB.
**Alternatives:** Middleware-based logging, event emitter pattern.
**Reason:** Explicit calls from route handlers give the most control over what metadata is logged. Failures are caught and reported to stderr without breaking the request.
**Consequences:** Route handlers are slightly more verbose. Log is comprehensive.

## Decision 009: Article Version History
**Decision:** Store snapshots in `articleversions` collection when an article is updated. Keep the last 20 versions per article.
**Context:** Version history requirement. Need to avoid unbounded growth.
**Alternatives:** Git-style diff storage, event sourcing.
**Reason:** Simple snapshot approach is easy to implement and understand. 20-version cap prevents unbounded document growth.
**Consequences:** Version documents can be large if articles are long. Acceptable for a personal tool.

## Decision 010: Tag Normalization
**Decision:** Tags are stored lowercase, trimmed. Display names preserve original casing of first use.
**Context:** Avoid duplicate tags from capitalization differences.
**Alternatives:** Always lowercase display, case-sensitive tags.
**Reason:** Requirement explicitly states to avoid duplicates regardless of capitalization.
**Consequences:** Tag lookup must normalize input before querying.

