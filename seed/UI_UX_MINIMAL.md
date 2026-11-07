# Knowledge Hub — Minimal UI/UX Spec

> **One-line goal:** Open the app, see *what's new today* and *what I missed yesterday*, read it, leave. Nothing else on the home screen.

---

## 1. Design Principles

| # | Principle | What it means in practice |
| :-- | :-- | :-- |
| 1 | **One question per screen** | Home answers only: *"What should I read right now?"* |
| 2 | **Content over chrome** | Titles and summaries are the UI. Borders, badges, icons are removed unless they carry meaning. |
| 3 | **Time is the organizing axis** | Today → Yesterday (unread). Not topics, not categories, not stats. |
| 4 | **Empty is a feature** | If nothing is new, say so in one calm line. No filler widgets. |
| 5 | **Every element must earn its pixels** | If removing it doesn't hurt the "read something" flow, it goes. |
| 6 | **Depth on demand** | Everything removed from Home still exists, one click away. |

**Test for every element:** *"If I delete this, does the user fail to read today's content?"* If no, delete it.

---

## 2. What Gets Removed from Home (vs. current dashboard)

| Current Dashboard Element | Decision | Where it goes |
| :-- | :-- | :-- |
| 6 stat cards (Total, Unread, Read, Topics, Categories, Contributors) | **Remove** | Settings → "About / Stats" (optional) |
| "Recently Published" (4 big cards with badges, tags, author, time) | **Replace** with slim "Today" list | Home |
| "Recently Updated" | **Remove** | All Articles (sort by updated) |
| "Topic Activity" panel | **Remove** | Topics page |
| "Recent Activity" feed | **Remove** | Activity Logs page |
| Content-type pill + category + topic + tags on every card | **Remove** from list rows | Article detail only |
| Eye + bookmark icons on every card | **Reduce** to hover-only | Appear on hover/focus |
| Global search bar (always visible) | **Keep, but quiet** | Collapsed to icon + `⌘K` |
| "+ New Article" purple button | **Demote** | Menu item / `N` shortcut (AI agents are the main authors) |

---

## 3. Home Page — "Today"

### 3.1 Information Architecture

Home has **exactly two sections** plus one optional footer link:

1. **Today** — articles published today (local time, `Asia/Kolkata`).
2. **Unread from yesterday** — articles published yesterday that are still unread.
3. *(footer, quiet)* — `+ 7 older unread →` link to All Articles filtered by unread.

That's it. No stats. No topic panel. No activity stream.

### 3.2 Wireframe (desktop)

```
┌──────────────────────────────────────────────────────────────┐
│  ◧ Knowledge Hub                              ⌕   ☾   ⋯      │  ← 48px top bar
├──────────────────────────────────────────────────────────────┤
│                                                              │
│                  Friday, 6 November                          │  ← date, muted
│                  Today                                       │  ← page title
│                                                              │
│                  3 new · 2 unread from yesterday             │  ← one summary line
│                                                              │
│                  ─────────────────────────────               │
│                                                              │
│                  TODAY                                       │  ← section label (11px caps, muted)
│                                                              │
│                  Mind Signal: The Raven Paradox        2 min │
│                  Beginner-accessible look at Hempel's…       │
│                  Gemini · 1h ago                             │
│                                                              │
│                  Zero-Noise Extrapolation              1 min │
│                  Techniques for mitigating gate noise…       │
│                  Claude · 1h ago                             │
│                                                              │
│                  ─────────────────────────────               │
│                                                              │
│                  UNREAD FROM YESTERDAY                       │
│                                                              │
│                  Stochastic Resonance in Neural…       1 min │
│                  How non-zero noise enhances weak…           │
│                  GPT-4o · yesterday                          │
│                                                              │
│                  + 7 older unread →                          │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

- **Single centered column**, `max-width: 640px`. No sidebar on Home (see §5).
- Generous whitespace: it should feel closer to a reading app / newspaper than a dashboard.

### 3.3 Article Row (the only repeated component)

```
Title (17px, semibold, primary text)                    2 min
One-line description (14px, muted, truncated to 1 line)
Author · relative time
```

Rules:
- **No tags, category, topic, or content-type badge** in the row.
- **Unread indicator:** a 6px dot to the left of the title (accent color). Read items have no dot and title color drops to muted.
- **Hover/focus only:** bookmark icon and "mark read" check appear on the right.
- Entire row is one click target → opens article.
- Reading time sits on the right, muted, tabular numbers.

### 3.4 Summary Line

One sentence under the title, generated from counts:

| State | Text |
| :-- | :-- |
| Both exist | `3 new today · 2 unread from yesterday` |
| Only today | `3 new today` |
| Only yesterday | `Nothing new today · 2 unread from yesterday` |
| Neither | `You're all caught up.` |

### 3.5 Empty & Edge States

| Situation | UI |
| :-- | :-- |
| Nothing today, nothing yesterday | Centered: **"You're all caught up."** + muted line *"New articles from your AI agents will appear here."* No illustration. |
| Nothing today, unread yesterday | Hide "Today" section entirely. Don't show an empty box. |
| All of today read | Keep rows, dim titles. Summary reads `All caught up today`. |
| Loading | 3 skeleton rows (title bar + 2 muted lines). No spinners. |
| API error | One line: `Couldn't load. Retry` (retry is a text button). |

### 3.6 Behavior

- **Opening an article** marks it read automatically once the user scrolls >30% or spends >10s (not on click, to avoid false reads).
- **"Mark all read"** — a single quiet text button at the right of the "Unread from yesterday" label. No confirm dialog; show a 5-second `Undo` toast.
- **Keyboard:** `J/K` move selection, `Enter` open, `E` mark read, `B` bookmark, `⌘K` search, `G then A` all articles, `G then L` library.
- **Day boundary** is computed in the user's local timezone (not UTC) — important for `Asia/Kolkata` (UTC+5:30), otherwise "today" breaks around 5:30 AM.

---

## 4. Data & API Needed for Home

The current API likely supports list + filters. Home needs two small queries. Prefer **one endpoint** to avoid two round-trips:

```
GET /api/v1/articles/home?tz=Asia/Kolkata
```

Response:

```json
{
  "success": true,
  "data": {
    "today":      [ { "id", "slug", "title", "description", "author", "readingTime", "publishedAt", "isRead", "isBookmarked" } ],
    "yesterdayUnread": [ { "...same shape..." } ],
    "olderUnreadCount": 7
  }
}
```

Server logic (pseudo):

```
startOfToday     = local midnight today   (from tz)
startOfYesterday = startOfToday - 24h

today           = published >= startOfToday, deletedAt = null, sort publishedAt desc
yesterdayUnread = published in [startOfYesterday, startOfToday), isRead = false
olderUnreadCount= count(published < startOfYesterday, isRead = false)
```

Notes:
- Only return the **fields the row needs** — no `content`, no tags array. Keeps the home payload tiny.
- Cap each list at ~20; the rest is reachable through "older unread →".
- Cache key in TanStack Query: `['home', dateString]` so it naturally refreshes after midnight.
- Invalidate `['home']` on mark-read / bookmark mutations (optimistic update recommended).

---

## 5. Navigation (Whole App)

Reduce the 10-item sidebar to a **top bar + 3 primary destinations**.

### 5.1 Top Bar (48px, all pages)

```
◧ Knowledge Hub     Today   Library   All          ⌕   ☾   ⋯
```

| Item | Purpose |
| :-- | :-- |
| **Today** | Home (this spec) |
| **Library** | Bookmarked / saved |
| **All** | Full article list with filters |
| **⌕** | Opens search modal (`⌘K`) |
| **☾** | Theme toggle |
| **⋯** | Overflow menu: Topics, Categories, Tags, Activity Logs, Trash, API Docs, Settings, New Article |

Why: Topics/Categories/Tags/Logs/Trash are *curator/admin* tasks. They matter, but not daily. Hiding them in `⋯` removes ~60% of visual noise without losing any feature.

### 5.2 Mobile

- Same top bar, but destinations move to a **bottom tab bar**: `Today · Library · All · More`.
- Home column becomes full width with 16px side padding.
- Row tap target ≥ 56px tall.

---

## 6. Visual System

### 6.1 Color (dark-first, matches current theme)

| Token | Value | Use |
| :-- | :-- | :-- |
| `--bg` | `#0a0a0f` | Page background |
| `--surface` | `#0f0f16` | Hover row, modals only |
| `--border` | `#1c1c26` | Dividers (used sparingly — 1px lines, never boxes) |
| `--text` | `#e8e8ee` | Titles |
| `--text-muted` | `#8b8b9a` | Descriptions, meta |
| `--text-faint` | `#5a5a68` | Section labels, read titles |
| `--accent` | `#7c5cff` | **Only** unread dot, focus ring, primary text links |

**Rule:** accent color appears in at most *one* place per row (the unread dot). The current UI uses purple, blue, green, orange, and violet together — collapse to a single accent.

Light theme: invert surfaces (`#ffffff` bg, `#111` text), keep the same accent.

### 6.2 Typography

| Role | Size / Weight | Notes |
| :-- | :-- | :-- |
| Page title ("Today") | 28px / 600 | Tight tracking (`-0.02em`) |
| Date line | 13px / 400, muted | Above title |
| Summary line | 15px / 400, muted | Below title |
| Section label | 11px / 600, uppercase, `0.08em` tracking, faint | |
| Row title | 17px / 600 | `line-height: 1.35` |
| Row description | 14px / 400, muted | 1 line, ellipsis |
| Meta (author · time) | 12px / 400, faint | |
| Reading time | 12px, tabular-nums | |

- **Font:** system UI stack for chrome (`Inter` if already loaded). Consider a serif (e.g. `Source Serif 4`) for article *body* only, to make long reading comfortable.
- Max line length in article body: **65–72 characters** (`max-width: 68ch`).

### 6.3 Spacing

- 8px base grid. Row vertical padding `16px`; gap between rows `0` (use hairline dividers instead of cards).
- Section gap: `40px`. Page top padding: `64px`.
- **No cards, no shadows, no rounded boxes** on Home. Hairlines and whitespace only.

### 6.4 Motion

- Hover: background fades to `--surface` in 120ms. That's all.
- Mark-read: title color transitions to faint in 150ms; row does **not** disappear (avoids layout jump) until next refresh.
- Respect `prefers-reduced-motion`: disable all transitions.

---

## 7. Article Reader (keep, but simplify)

The reader is where users spend time, so protect it:

- **Chrome fades out while scrolling down**, returns on scroll up (top bar auto-hide).
- Header block: title, `author · date · N min read`. Tags/topic/category go in a collapsed **"Details"** line at the bottom of the article, not the top.
- **Table of contents:** hidden by default on screens < 1280px; on wide screens a quiet sticky list at the right margin, only `h2`/`h3`.
- **Progress bar:** keep the 2px top bar (cheap, useful). Remove percentage text.
- **Code blocks:** keep copy button, show on hover only.
- **Footer actions:** `Bookmark · Mark unread · Edit` as plain text buttons, not primary buttons.
- **Related articles:** max 3, title only, at the very end.

---

## 8. Other Pages — Minimal Rules

| Page | Minimal treatment |
| :-- | :-- |
| **All Articles** | Same slim row component as Home. One filter row: `Search · Unread only · Topic ▾ · Sort ▾`. Grid view removed (list only). Pagination → "Load more". |
| **Library** | Same row component, sorted by bookmarked date. Single filter: `Unread only`. |
| **Topics / Categories / Tags** | Plain lists/tables, no cards, no color swatches except a 8px dot. Tag cloud → simple alphabetical list with counts. |
| **Activity Logs** | Compact table: time · actor · action. Filters collapsed behind one button. |
| **Trash** | Same row component + `Restore` / `Delete forever` text buttons. |
| **Settings** | Single column, grouped: Appearance, API key, Backup, Health check. |
| **Create/Edit** | Keep split-view editor, but hide the right preview behind a toggle (`⌘P`) by default. |

**Consistency rule:** one row component, one filter bar pattern, one empty-state style across the app.

---

## 9. Component Inventory (Home)

Build only these:

| Component | Props | Notes |
| :-- | :-- | :-- |
| `TopBar` | `active` | Logo, 3 nav links, search, theme, overflow menu |
| `PageHeader` | `date`, `title`, `summary` | |
| `Section` | `label`, `action?` | Label + optional right-aligned text action |
| `ArticleRow` | `article`, `onOpen`, `onToggleRead`, `onToggleBookmark` | Single reusable row |
| `EmptyState` | `title`, `hint?` | Text only |
| `SkeletonRow` | — | Loading placeholder |
| `UndoToast` | `message`, `onUndo` | For "Mark all read" |

Suggested file layout (React + Vite + Tailwind):

```
client/src/
  pages/Home.tsx              ← replaces Dashboard.tsx
  components/
    TopBar.tsx
    PageHeader.tsx
    Section.tsx
    ArticleRow.tsx
    EmptyState.tsx
    SkeletonRow.tsx
    UndoToast.tsx
  hooks/
    useHome.ts                ← TanStack Query for /articles/home
  lib/
    dates.ts                  ← local-day boundaries, relative time
```

---

## 10. Accessibility

- All interactive rows are real `<a>`/`<button>` elements; the row is one link, secondary actions are separate buttons with `aria-label`.
- Unread state is **not color-only**: add visually hidden text `Unread` for screen readers.
- Contrast: muted text ≥ 4.5:1 on `--bg` (verify `#8b8b9a` on `#0a0a0f` → passes; `--text-faint` is for non-essential labels only).
- Visible focus ring: 2px accent outline, 2px offset.
- Minimum touch target 44×44px on mobile.
- Respect `prefers-color-scheme` on first load; persist user override.

---

## 11. Success Criteria

How to know the minimal redesign worked:

1. **Time-to-first-read** ≤ 5 seconds from opening the app.
2. Home contains **≤ 3 distinct visual treatments** (page title, section label, row).
3. **Zero** scrolling needed for a typical day (≤ 5 rows visible).
4. Home payload < 10 KB (no article bodies).
5. A new user can describe the home page in one sentence without hesitation.

---

## 12. Implementation Order

1. Add `GET /articles/home` endpoint (§4) with timezone-aware boundaries.
2. Build `ArticleRow` + `Section` + `PageHeader` with static data.
3. Wire `useHome` hook and optimistic mark-read.
4. Replace sidebar with `TopBar`; move extras into the `⋯` menu.
5. Swap route `/` from `Dashboard` to `Home`; keep old Dashboard at `/stats` temporarily, then delete.
6. Apply the same `ArticleRow` to All Articles and Library.
7. Simplify the Reader header (§7).
8. Run the accessibility checks (§10).

---

## 13. Open Questions (decide before building)

- Should "today" mean **published today** or **updated today**? (This spec assumes *published*.)
- Should read status flip automatically on scroll, or only via explicit action?
- Do you want a "Continue reading" slot (1 half-read article) above Today? Cheap to add, but it breaks the "only two sections" rule — add only if you find yourself wanting it.
- Keep the stats cards anywhere, or drop them entirely?
