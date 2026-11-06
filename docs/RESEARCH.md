
# Knowledge Hub — Research & Findings

## Markdown Rendering

**react-markdown ecosystem:**
- `react-markdown` — core renderer
- `remark-gfm` — GitHub Flavored Markdown (tables, strikethrough, task lists)
- `remark-math` — math expression parsing (`$...$` and `$$...$$`)
- `rehype-katex` — KaTeX math rendering
- `rehype-highlight` — code syntax highlighting via highlight.js
- `rehype-slug` — adds id attributes to headings (required for ToC)
- `rehype-autolink-headings` — links headings to themselves

**KaTeX:** Must include `katex/dist/katex.min.css` in the application.

## MongoDB Text Search

MongoDB text indexes support:
- Multi-field indexes with weights
- Case-insensitive search
- Stemming (English by default)
- Phrase search with quotes
- Negation with `-`

Limitation: Only one text index per collection. Must include all searchable fields in that index.

```javascript
ArticleSchema.index(
  { title: 'text', description: 'text', content: 'text' },
  { weights: { title: 10, description: 5, content: 1 }, name: 'article_text_search' }
);
```

## Slug Generation

Slugs should be:
- Lowercase
- Spaces replaced with hyphens
- Special characters removed
- Unique (append numeric suffix if collision)

Library: `slugify` npm package

## Reading Time Estimation

Formula: `Math.ceil(wordCount / 200)` minutes (average adult reading speed ~200-250 wpm).

Library: `reading-time` npm package

## Railway Deployment

Railway supports:
- Nixpacks (auto-detects Node.js)
- Custom Dockerfile
- Environment variable groups
- TCP/HTTP services
- MongoDB plugin (adds `MONGO_URL` env var)

Railway CLI relevant commands:
- `railway init` — create new project
- `railway link` — link existing project
- `railway up` — deploy
- `railway variables set KEY=VALUE` — set env vars
- `railway logs` — view logs
- `railway status` — service status

## shadcn/ui

shadcn/ui components are copy-pasted into the project (not installed as a package).
Must run: `npx shadcn@latest init` and `npx shadcn@latest add <component>`.

Required components for this project:
- button, input, textarea, select, badge
- card, separator, dialog, alert-dialog
- dropdown-menu, popover, command (for search)
- scroll-area, tabs, tooltip
- progress, skeleton
- sheet (mobile sidebar)
- sonner (toast notifications)

## OpenAPI / Swagger

- `swagger-jsdoc` — generates OpenAPI spec from JSDoc comments
- `swagger-ui-express` — serves Swagger UI
- Spec version: OpenAPI 3.0.3

## Security Considerations

- API write key stored only in server env vars, never sent to client
- Client makes API calls to same-origin backend in production (no key exposure)
- Input validation on all endpoints prevents injection
- MongoDB queries use parameterized values via Mongoose (no string concatenation)
- CORS: restrictive in production, permissive in dev

## Performance Considerations

- Paginate all list endpoints (default: 20 items per page)
- MongoDB text search is indexed, so performant at scale
- Article content is stored as plain text in MongoDB (no binary)
- Article versions are capped at 20 per article
- TanStack Query handles client-side caching and stale-while-revalidate
- Large Markdown documents rendered client-side with memoization

## Potential Issues

1. **Tag array growth in articles:** Using separate Tags collection with references avoids unbounded arrays.
2. **Search relevance:** MongoDB text search is basic; may need Meilisearch upgrade for large repositories.
3. **Version history storage:** Large articles + many edits = large collection. 20-version cap mitigates this.
4. **Railway cold starts:** With a single-service deployment, cold starts may be noticeable. Acceptable for personal use.
