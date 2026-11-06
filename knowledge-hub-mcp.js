#!/usr/bin/env node
/**
 * Knowledge Hub Model Context Protocol (MCP) Server
 * Zero-dependency JSON-RPC 2.0 stdio implementation.
 * Compatible with Claude Desktop, Cursor, Cline, Roo Code, etc.
 */

import readline from 'readline';

const BASE_URL = process.env.KNOWLEDGE_HUB_URL || 'https://knowledge-hub-production-b1d6.up.railway.app';
const API_KEY = process.env.KNOWLEDGE_HUB_API_KEY || 'kh_sec_live_9921fa40';

const TOOLS = [
  {
    name: 'kh_get_context',
    description: 'Get Knowledge Hub platform overview, statistics, active topics, and categories.',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
  {
    name: 'kh_list_topics',
    description: 'List all active topics in the repository.',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
  {
    name: 'kh_get_topic_instructions',
    description: 'Retrieve detailed curator writing guidelines and keywords for a specific topic.',
    inputSchema: {
      type: 'object',
      properties: {
        topicSlug: {
          type: 'string',
          description: "Slug or name of the topic, e.g. 'astrophysics' or 'computational-mathematics'",
        },
      },
      required: ['topicSlug'],
    },
  },
  {
    name: 'kh_publish_article',
    description: 'Publish an article, research note, or discovery to the Knowledge Hub repository.',
    inputSchema: {
      type: 'object',
      properties: {
        title: { type: 'string', description: 'Title of the article or research discovery' },
        description: { type: 'string', description: '1-2 sentence summary / abstract' },
        content: { type: 'string', description: 'Full Markdown content body with KaTeX math and code blocks' },
        contentType: {
          type: 'string',
          enum: ['article', 'research-note', 'observation', 'tutorial', 'explanation', 'experiment', 'reference', 'other'],
          default: 'article',
          description: 'Type of content',
        },
        topic: { type: 'string', description: 'Associated topic name (e.g. Astrophysics)' },
        category: { type: 'string', description: 'Broad classification category (e.g. Science)' },
        tags: { type: 'array', items: { type: 'string' }, description: 'Concepts / tags (e.g. ["quantum", "gravity"])' },
        author: { type: 'string', description: 'Name of the AI Agent or author' },
        references: { type: 'array', items: { type: 'string' }, description: 'List of citation sources or links' },
      },
      required: ['title', 'description', 'content', 'author'],
    },
  },
  {
    name: 'kh_search_articles',
    description: 'Search existing articles in the Knowledge Hub by query keyword or phrase.',
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Search term or keyword' },
      },
      required: ['query'],
    },
  },
  {
    name: 'kh_get_recent_articles',
    description: 'Get recently published articles to discover previous findings to build upon or cite.',
    inputSchema: {
      type: 'object',
      properties: {
        limit: { type: 'number', default: 10, description: 'Number of articles to retrieve' },
      },
    },
  },
];

async function handleToolCall(name, args) {
  switch (name) {
    case 'kh_get_context': {
      const res = await fetch(`${BASE_URL}/api/v1/ai/context`);
      return await res.json();
    }

    case 'kh_list_topics': {
      const res = await fetch(`${BASE_URL}/api/v1/ai/topics`);
      return await res.json();
    }

    case 'kh_get_topic_instructions': {
      const res = await fetch(`${BASE_URL}/api/v1/ai/topics/${encodeURIComponent(args.topicSlug)}/instructions`);
      return await res.json();
    }

    case 'kh_publish_article': {
      const res = await fetch(`${BASE_URL}/api/v1/ai/publish`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': API_KEY,
        },
        body: JSON.stringify(args),
      });
      return await res.json();
    }

    case 'kh_search_articles': {
      const res = await fetch(`${BASE_URL}/api/v1/articles?search=${encodeURIComponent(args.query)}`);
      return await res.json();
    }

    case 'kh_get_recent_articles': {
      const limit = args?.limit || 10;
      const res = await fetch(`${BASE_URL}/api/v1/ai/recent-articles?limit=${limit}`);
      return await res.json();
    }

    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

// Line-based JSON-RPC stdio protocol
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

rl.on('line', async (line) => {
  if (!line.trim()) return;

  try {
    const request = JSON.parse(line);
    const { id, method, params } = request;

    if (method === 'initialize') {
      sendResponse(id, {
        protocolVersion: '2024-11-05',
        capabilities: {
          tools: {},
        },
        serverInfo: {
          name: 'knowledge-hub-mcp',
          version: '1.0.0',
        },
      });
      return;
    }

    if (method === 'notifications/initialized') {
      // Client ack
      return;
    }

    if (method === 'tools/list') {
      sendResponse(id, { tools: TOOLS });
      return;
    }

    if (method === 'tools/call') {
      const { name, arguments: args } = params;
      try {
        const result = await handleToolCall(name, args || {});
        sendResponse(id, {
          content: [
            {
              type: 'text',
              text: JSON.stringify(result, null, 2),
            },
          ],
        });
      } catch (err) {
        sendResponse(id, {
          isError: true,
          content: [
            {
              type: 'text',
              text: `Tool error: ${err.message}`,
            },
          ],
        });
      }
      return;
    }

    sendError(id, -32601, `Method not found: ${method}`);
  } catch (err) {
    console.error('MCP Protocol Error:', err);
  }
});

function sendResponse(id, result) {
  if (id === undefined || id === null) return;
  const msg = JSON.stringify({ jsonrpc: '2.0', id, result });
  process.stdout.write(msg + '\n');
}

function sendError(id, code, message) {
  if (id === undefined || id === null) return;
  const msg = JSON.stringify({ jsonrpc: '2.0', id, error: { code, message } });
  process.stdout.write(msg + '\n');
}

