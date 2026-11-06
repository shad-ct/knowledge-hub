import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, FileText, Layers, FolderOpen, Hash, X } from 'lucide-react';
import { articlesApi, topicsApi, categoriesApi, tagsApi } from '../lib/api';
import { cn } from '../lib/utils';
import type { Article, Topic, Category, Tag } from '../types';

interface GlobalSearchProps {
  onClose: () => void;
}

type SearchResult =
  | { type: 'article'; item: Article }
  | { type: 'topic'; item: Topic }
  | { type: 'category'; item: Category }
  | { type: 'tag'; item: Tag };

export default function GlobalSearch({ onClose }: GlobalSearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(0);
  const navigate = useNavigate();

  const search = useCallback(async (q: string) => {
    if (!q.trim()) {
      setResults([]);
      return;
    }
    setLoading(true);
    try {
      const [articlesRes, topicsRes, categoriesRes, tagsRes] = await Promise.allSettled([
        articlesApi.list({ search: q, limit: 5 }),
        topicsApi.list(),
        categoriesApi.list(),
        tagsApi.list(),
      ]);

      const all: SearchResult[] = [];

      if (articlesRes.status === 'fulfilled') {
        articlesRes.value.data.slice(0, 5).forEach((a) => all.push({ type: 'article', item: a }));
      }
      if (topicsRes.status === 'fulfilled') {
        topicsRes.value.data
          .filter((t) => t.name.toLowerCase().includes(q.toLowerCase()))
          .slice(0, 3)
          .forEach((t) => all.push({ type: 'topic', item: t }));
      }
      if (categoriesRes.status === 'fulfilled') {
        categoriesRes.value.data
          .filter((c) => c.name.toLowerCase().includes(q.toLowerCase()))
          .slice(0, 3)
          .forEach((c) => all.push({ type: 'category', item: c }));
      }
      if (tagsRes.status === 'fulfilled') {
        tagsRes.value.data
          .filter((t) => t.name.toLowerCase().includes(q.toLowerCase()))
          .slice(0, 3)
          .forEach((t) => all.push({ type: 'tag', item: t }));
      }

      setResults(all);
      setSelected(0);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => search(query), 300);
    return () => clearTimeout(timer);
  }, [query, search]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowDown') setSelected((s) => Math.min(s + 1, results.length - 1));
      if (e.key === 'ArrowUp') setSelected((s) => Math.max(s - 1, 0));
      if (e.key === 'Enter' && results[selected]) {
        navigateToResult(results[selected]);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [results, selected, onClose]);

  const navigateToResult = (result: SearchResult) => {
    onClose();
    switch (result.type) {
      case 'article':
        navigate(`/articles/${(result.item as Article)._id}`);
        break;
      case 'topic':
        navigate(`/topics/${(result.item as Topic)._id}`);
        break;
      case 'category':
        navigate(`/categories`);
        break;
      case 'tag':
        navigate(`/tags/${(result.item as Tag).name}`);
        break;
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'article': return <FileText className="w-4 h-4 text-blue-400" />;
      case 'topic': return <Layers className="w-4 h-4 text-purple-400" />;
      case 'category': return <FolderOpen className="w-4 h-4 text-orange-400" />;
      case 'tag': return <Hash className="w-4 h-4 text-green-400" />;
      default: return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4" onClick={onClose}>
      <div
        className="w-full max-w-xl bg-card border border-border rounded-xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
          <Search className="w-4 h-4 text-muted-foreground flex-shrink-0" />
          <input
            autoFocus
            type="text"
            placeholder="Search articles, topics, tags..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
          {loading && (
            <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
          )}
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results */}
        {results.length > 0 ? (
          <div className="py-2 max-h-[60vh] overflow-y-auto">
            {results.map((result, idx) => {
              const title = result.type === 'article'
                ? (result.item as Article).title
                : result.type === 'tag'
                ? `#${(result.item as Tag).name}`
                : (result.item as Topic | Category).name;
              const sub = result.type === 'article'
                ? (result.item as Article).description
                : result.type === 'topic'
                ? (result.item as Topic).description
                : '';

              return (
                <button
                  key={`${result.type}-${result.item._id}`}
                  onClick={() => navigateToResult(result)}
                  className={cn(
                    'w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-accent transition-colors',
                    idx === selected && 'bg-accent'
                  )}
                >
                  <div className="flex-shrink-0">{getIcon(result.type)}</div>
                  <div className="min-w-0">
                    <div className="text-sm font-medium truncate">{title}</div>
                    {sub && <div className="text-xs text-muted-foreground truncate">{sub}</div>}
                  </div>
                  <div className="ml-auto text-xs text-muted-foreground capitalize flex-shrink-0">{result.type}</div>
                </button>
              );
            })}
          </div>
        ) : query && !loading ? (
          <div className="py-8 text-center text-sm text-muted-foreground">
            No results for "{query}"
          </div>
        ) : !query ? (
          <div className="py-6 text-center text-sm text-muted-foreground">
            Start typing to search the knowledge base
          </div>
        ) : null}

        {/* Footer */}
        <div className="border-t border-border px-4 py-2 flex gap-4 text-xs text-muted-foreground">
          <span>↑↓ navigate</span>
          <span>↵ open</span>
          <span>Esc close</span>
        </div>
      </div>
    </div>
  );
}

