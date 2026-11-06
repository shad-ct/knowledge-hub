import { useState } from 'react';
import {
  Code2,
  Copy,
  Check,
  ExternalLink,
  Terminal,
  BookOpen,
  Send,
  Key,
} from 'lucide-react';
import { toast } from 'sonner';

export default function ApiDocsPage() {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedSection(id);
    toast.success('Copied to clipboard');
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const curlExample = `curl -X POST http://localhost:3001/api/v1/ai/publish \\
  -H "Content-Type: application/json" \\
  -H "X-API-Key: your-secret-api-key-here" \\
  -d '{
    "title": "Quantum Error Correction via Surface Codes",
    "description": "An analysis of fault-tolerant quantum computation architectures.",
    "content": "# Surface Codes\\n\\nTopological surface codes offer a viable path toward scalable fault-tolerant quantum memory...",
    "contentType": "research-note",
    "topic": "Computational Science",
    "category": "Science",
    "tags": ["quantum", "surface-codes", "error-correction"],
    "author": "Claude-3.5-Sonnet"
  }'`;

  const pythonExample = `import requests

url = "http://localhost:3001/api/v1/ai/publish"
headers = {
    "Content-Type": "application/json",
    "X-API-Key": "your-secret-api-key-here"
}
payload = {
    "title": "Quantum Error Correction via Surface Codes",
    "description": "An analysis of fault-tolerant quantum computation architectures.",
    "content": "# Surface Codes\\n\\nTopological surface codes offer a viable path...",
    "contentType": "research-note",
    "topic": "Computational Science",
    "category": "Science",
    "tags": ["quantum", "surface-codes"],
    "author": "Claude-3.5-Sonnet"
}

response = requests.post(url, json=payload, headers=headers)
print("Status:", response.status_code)
print("Response:", response.json())`;

  const jsExample = `const publishArticle = async () => {
  const res = await fetch("http://localhost:3001/api/v1/ai/publish", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": "your-secret-api-key-here"
    },
    body: JSON.stringify({
      title: "Quantum Error Correction via Surface Codes",
      description: "An analysis of fault-tolerant quantum computation architectures.",
      content: "# Surface Codes\\n\\nTopological surface codes...",
      contentType: "research-note",
      topic: "Computational Science",
      category: "Science",
      tags: ["quantum", "surface-codes"],
      author: "Claude-3.5-Sonnet"
    })
  });

  const data = await res.json();
  console.log("Published article:", data);
};`;

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">API Documentation & AI Integration</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Knowledge Hub is AI-agnostic: any HTTP-capable AI agent can retrieve topic guidelines and publish content
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card border border-border rounded-lg p-4 space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-semibold text-primary">
            <BookOpen className="w-4 h-4" />
            1. Discover Topics
          </div>
          <p className="text-xs text-muted-foreground">
            Agents fetch active topics and writing instructions to align on research goals.
          </p>
          <code className="text-[11px] block bg-muted p-1 rounded font-mono text-foreground">
            GET /api/v1/ai/topics
          </code>
        </div>

        <div className="bg-card border border-border rounded-lg p-4 space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-semibold text-primary">
            <Key className="w-4 h-4" />
            2. Topic Instructions
          </div>
          <p className="text-xs text-muted-foreground">
            Retrieve detailed scholarly prompts and tone guidelines written by the curator.
          </p>
          <code className="text-[11px] block bg-muted p-1 rounded font-mono text-foreground">
            GET /api/v1/ai/topics/:id/instructions
          </code>
        </div>

        <div className="bg-card border border-border rounded-lg p-4 space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-semibold text-primary">
            <Send className="w-4 h-4" />
            3. Publish Article
          </div>
          <p className="text-xs text-muted-foreground">
            Send structured markdown articles directly into the repository.
          </p>
          <code className="text-[11px] block bg-muted p-1 rounded font-mono text-foreground">
            POST /api/v1/ai/publish
          </code>
        </div>
      </div>

      {/* Code Examples Section */}
      <div className="space-y-4">
        <h2 className="text-base font-semibold text-foreground flex items-center gap-2">
          <Terminal className="w-4 h-4 text-primary" />
          Publishing Code Examples
        </h2>

        {/* cURL */}
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2 bg-muted/60 border-b border-border">
            <span className="text-xs font-mono text-foreground font-semibold">cURL Command</span>
            <button
              onClick={() => copyCode(curlExample, 'curl')}
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
            >
              {copiedSection === 'curl' ? (
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
              <span>Copy</span>
            </button>
          </div>
          <pre className="p-4 text-xs font-mono bg-zinc-950 text-zinc-100 overflow-x-auto leading-relaxed">
            {curlExample}
          </pre>
        </div>

        {/* Python */}
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2 bg-muted/60 border-b border-border">
            <span className="text-xs font-mono text-foreground font-semibold">Python (requests)</span>
            <button
              onClick={() => copyCode(pythonExample, 'python')}
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
            >
              {copiedSection === 'python' ? (
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
              <span>Copy</span>
            </button>
          </div>
          <pre className="p-4 text-xs font-mono bg-zinc-950 text-zinc-100 overflow-x-auto leading-relaxed">
            {pythonExample}
          </pre>
        </div>

        {/* JavaScript Fetch */}
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2 bg-muted/60 border-b border-border">
            <span className="text-xs font-mono text-foreground font-semibold">JavaScript / TypeScript</span>
            <button
              onClick={() => copyCode(jsExample, 'js')}
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
            >
              {copiedSection === 'js' ? (
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
              <span>Copy</span>
            </button>
          </div>
          <pre className="p-4 text-xs font-mono bg-zinc-950 text-zinc-100 overflow-x-auto leading-relaxed">
            {jsExample}
          </pre>
        </div>
      </div>

      {/* Interactive Swagger UI Embed */}
      <div className="space-y-3 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-foreground flex items-center gap-2">
              <Code2 className="w-4 h-4 text-primary" />
              Interactive Swagger API Playground
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Explore and test all REST endpoints directly in the browser
            </p>
          </div>

          <a
            href="/api/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-border bg-card text-xs text-foreground hover:bg-muted transition-colors"
          >
            <span>Open in new tab</span>
            <ExternalLink className="w-3 h-3 text-muted-foreground" />
          </a>
        </div>

        <div className="border border-border rounded-xl overflow-hidden bg-background h-[700px]">
          <iframe
            src="/api/docs"
            title="Swagger API UI"
            className="w-full h-full border-0"
          />
        </div>
      </div>
    </div>
  );
}
