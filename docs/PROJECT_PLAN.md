# Knowledge Hub — Project Plan

## Project Objectives

Build a production-ready, self-hosted AI-powered Knowledge Hub where:
- Multiple AI agents can publish articles, research notes, observations, and explanations via REST API.
- The human user acts as curator: browsing, reading, organizing, annotating, and managing content.
- The platform is entirely AI-agnostic (any HTTP-capable agent can contribute).
- All content is stored in MongoDB; nothing lives only in browser storage.
- No authentication/login system is required.

## Live Deployment Details

- **Production URL**: [https://knowledge-hub-production-b1d6.up.railway.app](https://knowledge-hub-production-b1d6.up.railway.app)
- **Health Check**: [https://knowledge-hub-production-b1d6.up.railway.app/health](https://knowledge-hub-production-b1d6.up.railway.app/health)
- **Interactive API Documentation (Swagger)**: [https://knowledge-hub-production-b1d6.up.railway.app/api/docs](https://knowledge-hub-production-b1d6.up.railway.app/api/docs)
- **AI Agent Context**: [https://knowledge-hub-production-b1d6.up.railway.app/api/v1/ai/context](https://knowledge-hub-production-b1d6.up.railway.app/api/v1/ai/context)
- **AI Publish Endpoint**: `POST https://knowledge-hub-production-b1d6.up.railway.app/api/v1/ai/publish`
- **Database**: MongoDB hosted on Railway with persistent volume storage (`/data/db`).

## Complete Feature Matrix

### Core & Architecture
- [x] Monorepo structure: `server/` (Express + TypeScript, ESM) and `client/` (React + Vite + TypeScript)
- [x] MongoDB via Mongoose with robust schemas, references, and indexes
- [x] Railway-hosted MongoDB with automatic volume persistence
- [x] Single-service production architecture: Express serves optimized Vite client bundle
- [x] Health-check endpoint with environment & uptime status

### Article Management
- [x] Complete CRUD functionality (Create, Read, Update, Soft-delete, Restore, Permanent delete)
- [x] Markdown rendering with GitHub Flavored Markdown (tables, autolinks, task lists)
- [x] Math rendering via KaTeX ($inline$ and $$display$$ math)
- [x] Code blocks with copy-to-clipboard functionality
- [x] Reading progress bar at top of viewport
- [x] Interactive Table of Contents generated dynamically from Markdown headings
- [x] Independent Read/Unread status with bulk updates
- [x] Independent Library Bookmarking system
- [x] Article version history tracking (capped at 20 versions per document)
- [x] Related articles dynamically linked by shared tags, topics, and category
- [x] Full JSON repository export / backup feature

### Topics & AI Guidelines
- [x] Full topic lifecycle (Active, Paused, Archived)
- [x] Priorities: Low, Medium, High, Critical
- [x] Detailed writing guidelines & instructions for external AI agents
- [x] Topic dashboard displaying article counts and recent contributions
- [x] Dedicated discovery endpoints for AI agents (`/api/v1/ai/topics` & `/instructions`)

### Categories & Tags
- [x] Category CRUD with color swatches and article counts
- [x] Auto-resolution and creation of tags upon article publishing
- [x] Tag normalization (lowercase deduplication) with display name preservation
- [x] Tag cloud with proportional typography scaling and list view

### Activity Logging
- [x] MongoDB-backed persistent activity log (`activitylogs` collection)
- [x] Logged events: creation, edits, deletions, restorations, reads, bookmarks, topic edits, AI publishes
- [x] Chronological timeline with action icons and AI agent distinction pills
- [x] Search and filtering by action, actor, entity, date

### UI & UX Design
- [x] Dark-first editorial aesthetic inspired by Notion, Obsidian, Linear, and Readwise Reader
- [x] High-contrast readable typography hierarchy
- [x] Light / Dark theme switcher
- [x] Responsive layout with mobile sliding navigation drawer
- [x] Cmd+K Global Search modal querying across articles, topics, categories, and tags
- [x] Split-view live Markdown editor and preview

## Current Phase
**Phase 7 Complete — Application fully built, tested, and running in production on Railway.**
