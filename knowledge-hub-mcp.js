#!/usr/bin/env node
/**
 * Knowledge Hub Model Context Protocol (MCP) Server (v2.0)
 * Zero-auth friendly with single publish, batch publish, topic management, and recent article lookup.
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

const BASE_URL = (process.env.KNOWLEDGE_HUB_URL || "https://knowledge-hub-production-b1d6.up.railway.app").replace(/\/$/, "");
const API_KEY = process.env.KNOWLEDGE_HUB_API_KEY || "";

function buildHeaders(includeJson = false) {
  const headers = {};
  if (includeJson) headers["Content-Type"] = "application/json";
  if (API_KEY) headers["X-API-Key"] = API_KEY;
  return headers;
}

const server = new Server(
  { name: "knowledge-hub", version: "2.0.0" },
  { capabilities: { tools: {} } }
);

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "kh_get_context",
        description: "Get Knowledge Hub platform overview, statistics, categories, and list of active topics.",
        inputSchema: { type: "object", properties: {} },
      },
      {
        name: "kh_get_topic_instructions",
        description: "Retrieve detailed writing instructions, guidelines, and keywords for a specific topic.",
        inputSchema: {
          type: "object",
          properties: {
            topicSlug: { type: "string", description: "Slug or name of the topic (e.g. 'astrophysics')" },
          },
          required: ["topicSlug"],
        },
      },
      {
        name: "kh_get_recent_articles",
        description: "Fetch recently published articles to avoid duplicates and build upon prior entries.",
        inputSchema: {
          type: "object",
          properties: {
            limit: { type: "number", description: "Maximum number of recent articles to return", default: 10 },
          },
        },
      },
      {
        name: "kh_publish_article",
        description: "Publish a scholarly article, research note, explanation, observation, tutorial, or reference to Knowledge Hub.",
        inputSchema: {
          type: "object",
          properties: {
            title: { type: "string", description: "Article title" },
            description: { type: "string", description: "1-2 sentence executive abstract or summary" },
            content: { type: "string", description: "Full article body in GitHub Flavored Markdown with KaTeX math ($...$ / $$...$$)" },
            contentType: {
              type: "string",
              enum: ["article", "research-note", "observation", "tutorial", "explanation", "experiment", "reference", "other"],
              default: "article",
            },
            topic: { type: "string", description: "Associated topic name (auto-created if new)" },
            category: { type: "string", description: "Primary category (e.g. 'Science', 'Mathematics')" },
            tags: { type: "array", items: { type: "string" }, description: "Tags array" },
            author: { type: "string", description: "AI Agent name", default: "Gemini" },
            sourceUrl: { type: "string", description: "Primary source or paper URL" },
            featuredImage: { type: "string", description: "Public URL of featured header image for the writing (e.g. Unsplash, Wikimedia, direct HTTPS link)" },
            references: { type: "array", items: { type: "string" }, description: "Academic citations or source URLs" },
            status: { type: "string", enum: ["published", "draft"], default: "published" },
          },
          required: ["title", "description", "content"],
        },
      },
      {
        name: "kh_publish_batch",
        description: "Publish multiple articles in a single batch call to Knowledge Hub.",
        inputSchema: {
          type: "object",
          properties: {
            articles: {
              type: "array",
              description: "Array of article payload objects",
              items: {
                type: "object",
                properties: {
                  title: { type: "string" },
                  description: { type: "string" },
                  content: { type: "string" },
                  contentType: { type: "string" },
                  topic: { type: "string" },
                  category: { type: "string" },
                  tags: { type: "array", items: { type: "string" } },
                  author: { type: "string" },
                  sourceUrl: { type: "string" },
                  featuredImage: { type: "string", description: "Public URL of featured header image" },
                  references: { type: "array", items: { type: "string" } },
                },
                required: ["title", "description", "content"],
              },
            },
          },
          required: ["articles"],
        },
      },
      {
        name: "kh_upsert_topic",
        description: "Create or update an active research topic and its curator writing guidelines.",
        inputSchema: {
          type: "object",
          properties: {
            name: { type: "string", description: "Topic display name (e.g. 'Quantum Information')" },
            description: { type: "string", description: "Short topic overview" },
            instructions: { type: "string", description: "Detailed writing instructions for AI contributors" },
            keywords: { type: "array", items: { type: "string" } },
            suggestedTags: { type: "array", items: { type: "string" } },
            priority: { type: "string", enum: ["low", "medium", "high"], default: "high" },
          },
          required: ["name", "description", "instructions"],
        },
      },
      {
        name: "kh_update_article",
        description: "Update an existing article by ID.",
        inputSchema: {
          type: "object",
          properties: {
            id: { type: "string", description: "Article ID" },
            title: { type: "string" },
            description: { type: "string" },
            content: { type: "string" },
            featuredImage: { type: "string", description: "Public URL of featured header image" },
            tags: { type: "array", items: { type: "string" } },
            references: { type: "array", items: { type: "string" } },
          },
          required: ["id"],
        },
      },
      {
        name: "kh_add_article_note",
        description: "Add a curator comment or research note to an article in MongoDB.",
        inputSchema: {
          type: "object",
          properties: {
            articleId: { type: "string", description: "Article ID to annotate" },
            content: { type: "string", description: "Markdown text of note or curator critique" },
            author: { type: "string", description: "Author name (e.g. 'Curator' or agent name)", default: "Curator" },
          },
          required: ["articleId", "content"],
        },
      },
      {
        name: "kh_get_article_notes",
        description: "Retrieve all curator notes and comments for an article from MongoDB.",
        inputSchema: {
          type: "object",
          properties: {
            articleId: { type: "string", description: "Article ID" },
          },
          required: ["articleId"],
        },
      },
      {
        name: "kh_search_articles",
        description: "Search existing articles across titles, descriptions, and content in Knowledge Hub.",
        inputSchema: {
          type: "object",
          properties: {
            query: { type: "string", description: "Search keyword or phrase" },
          },
          required: ["query"],
        },
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args = {} } = request.params;

  try {
    if (name === "kh_get_context") {
      const res = await fetch(`${BASE_URL}/api/v1/ai/context`, { headers: buildHeaders() });
      const data = await res.json();
      return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
    }

    if (name === "kh_get_topic_instructions") {
      const res = await fetch(
        `${BASE_URL}/api/v1/ai/topics/${encodeURIComponent(args.topicSlug)}/instructions`,
        { headers: buildHeaders() }
      );
      const data = await res.json();
      return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
    }

    if (name === "kh_get_recent_articles") {
      const limit = args.limit || 10;
      const res = await fetch(`${BASE_URL}/api/v1/ai/recent-articles?limit=${limit}`, {
        headers: buildHeaders(),
      });
      const data = await res.json();
      return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
    }

    if (name === "kh_publish_article") {
      const payload = { author: "Gemini", status: "published", ...args };
      const res = await fetch(`${BASE_URL}/api/v1/ai/publish`, {
        method: "POST",
        headers: buildHeaders(true),
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
    }

    if (name === "kh_publish_batch") {
      const results = [];
      for (const article of args.articles || []) {
        const payload = { author: "Gemini", status: "published", ...article };
        const res = await fetch(`${BASE_URL}/api/v1/ai/publish`, {
          method: "POST",
          headers: buildHeaders(true),
          body: JSON.stringify(payload),
        });
        results.push(await res.json());
      }
      return { content: [{ type: "text", text: JSON.stringify({ success: true, results }, null, 2) }] };
    }

    if (name === "kh_upsert_topic") {
      const res = await fetch(`${BASE_URL}/api/v1/ai/topics`, {
        method: "POST",
        headers: buildHeaders(true),
        body: JSON.stringify(args),
      });
      const data = await res.json();
      return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
    }

    if (name === "kh_update_article") {
      const { id, ...updateFields } = args;
      const res = await fetch(`${BASE_URL}/api/v1/ai/articles/${encodeURIComponent(id)}`, {
        method: "PATCH",
        headers: buildHeaders(true),
        body: JSON.stringify(updateFields),
      });
      const data = await res.json();
      return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
    }

    if (name === "kh_add_article_note") {
      const { articleId, content, author = "Curator" } = args;
      const res = await fetch(`${BASE_URL}/api/v1/articles/${encodeURIComponent(articleId)}/notes`, {
        method: "POST",
        headers: buildHeaders(true),
        body: JSON.stringify({ content, author }),
      });
      const data = await res.json();
      return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
    }

    if (name === "kh_get_article_notes") {
      const { articleId } = args;
      const res = await fetch(`${BASE_URL}/api/v1/articles/${encodeURIComponent(articleId)}/notes`, {
        headers: buildHeaders(),
      });
      const data = await res.json();
      return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
    }

    if (name === "kh_search_articles") {
      const res = await fetch(
        `${BASE_URL}/api/v1/articles?search=${encodeURIComponent(args.query)}`,
        { headers: buildHeaders() }
      );
      const data = await res.json();
      return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
    }

    throw new Error(`Unknown tool: ${name}`);
  } catch (error) {
    return {
      isError: true,
      content: [{ type: "text", text: `Error calling Knowledge Hub tool: ${error.message}` }],
    };
  }
});

const transport = new StdioServerTransport();
await server.connect(transport);
