# Knowledge Hub — Changelog

## [1.0.0] - 2026-11-06

### Added
- Complete AI-powered Knowledge Repository monorepo (`server/` + `client/`).
- Mongoose data layer with Article, Topic, Category, Tag, Bookmark, ActivityLog, ArticleVersion schemas.
- REST API with `/api/v1/articles`, `/topics`, `/categories`, `/tags`, `/library`, `/activity`, and `/ai`.
- AI agent workflow endpoints: `/ai/context`, `/ai/topics`, `/ai/topics/:id/instructions`, `/ai/publish`.
- Optional shared API Key middleware (`X-API-Key`).
- OpenAPI 3.0 specification and Swagger UI documentation at `/api/docs`.
- React + Vite + TypeScript frontend with dark/light themes and editorial aesthetic.
- Global Search modal with keyboard shortcuts (`Cmd+K`).
- Dynamic Markdown reader with KaTeX math formula rendering and code copy blocks.
- Real-time scroll reading progress indicator and table of contents.
- Independent Read/Unread tracking and Library Bookmarking systems.
- Recoverable Trash system with article restoration and permanent deletion.
- Live Railway deployment with dedicated MongoDB service and volume persistence.
