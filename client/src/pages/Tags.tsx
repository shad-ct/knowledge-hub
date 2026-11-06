import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  Hash,
  Search,
  LayoutGrid,
  List,
  Tag as TagIcon,
  X,
  FileText,
} from 'lucide-react';
import { tagsApi } from '../lib/api';
import { cn } from '../lib/utils';
import type { Tag } from '../types';

export default function TagsPage() {
  const [search, setSearch] = useState('');
  const [view, setView] = useState<'cloud' | 'list'>('cloud');
  const [sortBy, setSortBy] = useState<'count' | 'alpha'>('count');

  const { data: tagsData, isLoading } = useQuery({
    queryKey: ['tags'],
    queryFn: () => tagsApi.list(),
  });

  const rawTags = tagsData?.data || [];

  // Filter
  const filtered = rawTags.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.displayName.toLowerCase().includes(search.toLowerCase())
  );

  // Sort
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'count') {
      return (b.articleCount || 0) - (a.articleCount || 0);
    }
    return a.displayName.localeCompare(b.displayName);
  });

  // Calculate cloud sizes
  const maxCount = Math.max(...rawTags.map((t) => t.articleCount || 0), 1);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Tags</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {rawTags.length} distinct concepts and keywords across all articles
          </p>
        </div>

        {/* View toggles & Sort */}
        <div className="flex items-center gap-2">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'count' | 'alpha')}
            className="bg-card border border-border rounded px-2.5 py-1 text-xs outline-none focus:border-primary text-foreground"
          >
            <option value="count">Most Used First</option>
            <option value="alpha">Alphabetical</option>
          </select>

          <div className="flex items-center bg-muted rounded p-0.5 border border-border">
            <button
              onClick={() => setView('cloud')}
              className={cn(
                'p-1.5 rounded transition-colors',
                view === 'cloud'
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              )}
              title="Cloud View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setView('list')}
              className={cn(
                'p-1.5 rounded transition-colors',
                view === 'list'
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              )}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Filter tags..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-card border border-border rounded-md pl-9 pr-8 py-1.5 text-sm outline-none focus:border-primary"
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Tags Display */}
      {isLoading ? (
        <div className="py-12 text-center text-xs text-muted-foreground">Loading tags...</div>
      ) : sorted.length > 0 ? (
        view === 'cloud' ? (
          /* Cloud View */
          <div className="bg-card border border-border rounded-xl p-8 flex flex-wrap gap-3 items-center justify-center">
            {sorted.map((tag) => {
              const weight = Math.max(0.8, Math.min(1.8, 0.8 + ((tag.articleCount || 0) / maxCount) * 1.0));
              return (
                <Link
                  key={tag._id}
                  to={`/tags/${tag.name}`}
                  style={{ fontSize: `${weight}rem` }}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border border-border/70 bg-background/50 hover:bg-primary/10 hover:border-primary/40 hover:text-primary transition-all group"
                >
                  <Hash className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary" />
                  <span className="font-medium">{tag.displayName}</span>
                  <span className="text-[10px] bg-muted px-1.5 py-0.2 rounded-full text-muted-foreground">
                    {tag.articleCount || 0}
                  </span>
                </Link>
              );
            })}
          </div>
        ) : (
          /* List View */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {sorted.map((tag) => (
              <Link
                key={tag._id}
                to={`/tags/${tag.name}`}
                className="bg-card border border-border rounded-lg px-3 py-2.5 flex items-center justify-between hover:border-primary/40 transition-colors group"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <Hash className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                  <span className="text-xs font-medium text-foreground truncate group-hover:text-primary transition-colors">
                    {tag.displayName}
                  </span>
                </div>
                <span className="text-[11px] text-muted-foreground bg-muted px-2 py-0.5 rounded flex-shrink-0">
                  {tag.articleCount || 0} {tag.articleCount === 1 ? 'article' : 'articles'}
                </span>
              </Link>
            ))}
          </div>
        )
      ) : (
        <div className="py-16 text-center border border-dashed border-border rounded-lg bg-card/40">
          <Hash className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3" />
          <h3 className="font-semibold text-foreground text-sm">No tags found</h3>
          <p className="text-xs text-muted-foreground mt-1 max-w-sm mx-auto">
            {search
              ? `No tags matched "${search}".`
              : 'Tags are automatically created when AI agents or you publish articles.'}
          </p>
        </div>
      )}
    </div>
  );
}
