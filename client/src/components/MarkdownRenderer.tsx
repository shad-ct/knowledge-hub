import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeSlug from 'rehype-slug';
import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { cn } from '../lib/utils';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

function CodeBlock({ children, className }: { children: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isInline = !className;

  if (isInline) {
    return (
      <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-foreground">
        {children}
      </code>
    );
  }

  return (
    <div className="code-block-wrapper group relative">
      <pre className={cn('rounded-lg overflow-x-auto text-sm', className)}>
        <code className={className}>{children}</code>
      </pre>
      <button
        onClick={copy}
        className="code-copy-btn absolute top-2 right-2 p-1.5 rounded bg-muted/80 hover:bg-muted border border-border text-muted-foreground hover:text-foreground transition-all"
        title="Copy code"
      >
        {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
      </button>
    </div>
  );
}

export default function MarkdownRenderer({ content, className }: MarkdownRendererProps) {
  return (
    <div className={cn('prose-knowledge', className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex, rehypeSlug]}
        components={{
          code({ children, className, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            const isBlock = !!match;
            
            if (!isBlock) {
              return (
                <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono" {...props}>
                  {children}
                </code>
              );
            }

            return (
              <CodeBlock className={className}>
                {String(children).replace(/\n$/, '')}
              </CodeBlock>
            );
          },
          pre({ children }) {
            return <>{children}</>;
          },
          a({ href, children }) {
            const isExternal = href?.startsWith('http');
            return (
              <a
                href={href}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noopener noreferrer' : undefined}
                className="text-primary hover:underline"
              >
                {children}
              </a>
            );
          },
          img({ src, alt }) {
            return (
              <img
                src={src}
                alt={alt}
                className="rounded-lg max-w-full border border-border"
                loading="lazy"
              />
            );
          },
          blockquote({ children }) {
            return (
              <blockquote className="border-l-4 border-primary/50 pl-4 italic text-muted-foreground">
                {children}
              </blockquote>
            );
          },
          table({ children }) {
            return (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">{children}</table>
              </div>
            );
          },
          th({ children }) {
            return (
              <th className="border border-border px-4 py-2 bg-muted text-left font-semibold text-sm">
                {children}
              </th>
            );
          },
          td({ children }) {
            return (
              <td className="border border-border px-4 py-2 text-sm">{children}</td>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

