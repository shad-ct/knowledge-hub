import { useState, useId } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  ArrowLeft,
  Eye,
  Edit3,
  Send,
  Save,
  HelpCircle,
  Sparkles,
} from 'lucide-react';
import { articlesApi, categoriesApi, topicsApi } from '../lib/api';
import MarkdownRenderer from '../components/MarkdownRenderer';
import { cn } from '../lib/utils';
import type { ContentType, ArticleStatus } from '../types';

const contentTypes: { value: ContentType; label: string }[] = [
  { value: 'article', label: 'Article' },
  { value: 'research-note', label: 'Research Note' },
  { value: 'observation', label: 'Observation' },
  { value: 'tutorial', label: 'Tutorial' },
  { value: 'explanation', label: 'Explanation' },
  { value: 'experiment', label: 'Experiment' },
  { value: 'reference', label: 'Reference' },
  { value: 'other', label: 'Other' },
];

export default function CreateArticlePage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [autoSlug, setAutoSlug] = useState(true);
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [contentType, setContentType] = useState<ContentType>('article');
  const [category, setCategory] = useState('');
  const [topicsInput, setTopicsInput] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [author, setAuthor] = useState('Curator');
  const [sourceUrl, setSourceUrl] = useState('');
  const [referencesInput, setReferencesInput] = useState('');
  const [status, setStatus] = useState<ArticleStatus>('published');
  const [tab, setTab] = useState<'write' | 'preview' | 'split'>('split');

  // Slug auto-generation
  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (autoSlug) {
      const generated = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
      setSlug(generated);
    }
  };

  const { data: categoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn: () => categoriesApi.list(),
  });

  const { data: topicsData } = useQuery({
    queryKey: ['topics'],
    queryFn: () => topicsApi.list(),
  });

  const createMutation = useMutation({
    mutationFn: articlesApi.create,
    onSuccess: (res) => {
      toast.success('Article created successfully');
      queryClient.invalidateQueries({ queryKey: ['articles'] });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
      navigate(`/articles/${res.data._id}`);
    },
    onError: (err: any) => {
      const msg = err.response?.data?.error || err.message || 'Failed to create article';
      toast.error(msg);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return toast.error('Title is required');
    if (!description.trim()) return toast.error('Description is required');
    if (!content.trim()) return toast.error('Content is required');

    const topics = topicsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim().replace(/^#/, ''))
      .filter(Boolean);

    const references = referencesInput
      .split('\n')
      .map((r) => r.trim())
      .filter(Boolean);

    createMutation.mutate({
      title: title.trim(),
      slug: slug.trim() || undefined,
      description: description.trim(),
      content,
      contentType,
      category: category || undefined,
      topics,
      tags,
      author: author.trim() || 'Curator',
      sourceUrl: sourceUrl.trim() || undefined,
      references,
      status,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-5xl mx-auto space-y-6 pb-12">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-border pb-4">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <div className="flex items-center gap-2">
          {/* Status selector */}
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as ArticleStatus)}
            className="bg-card border border-border rounded-md px-2.5 py-1 text-xs outline-none focus:border-primary text-foreground"
          >
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>

          <button
            type="submit"
            disabled={createMutation.isPending}
            className="flex items-center gap-1.5 px-4 py-1.5 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {status === 'published' ? (
              <Send className="w-3.5 h-3.5" />
            ) : (
              <Save className="w-3.5 h-3.5" />
            )}
            {createMutation.isPending ? 'Publishing...' : status === 'published' ? 'Publish Article' : 'Save Draft'}
          </button>
        </div>
      </div>

      {/* Title & Slug */}
      <div className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Article Title..."
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            className="w-full bg-transparent text-2xl font-bold tracking-tight outline-none placeholder:text-muted-foreground/50 border-b border-transparent focus:border-border pb-1 transition-colors"
            required
          />
        </div>

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>Slug:</span>
          <input
            type="text"
            placeholder="article-slug"
            value={slug}
            onChange={(e) => {
              setAutoSlug(false);
              setSlug(e.target.value);
            }}
            className="bg-muted px-2 py-0.5 rounded font-mono text-xs outline-none focus:ring-1 focus:ring-primary flex-1 max-w-sm"
          />
          {autoSlug && (
            <span className="text-[10px] text-muted-foreground/60">(Auto-generated)</span>
          )}
        </div>

        {/* Short description */}
        <div>
          <textarea
            placeholder="Short summary or abstract of this article / discovery..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
            className="w-full bg-card border border-border rounded-md px-3 py-2 text-sm outline-none focus:border-primary placeholder:text-muted-foreground/60 resize-none transition-colors"
            required
          />
        </div>
      </div>

      {/* Metadata Fields Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 bg-card border border-border rounded-lg p-3">
        {/* Content Type */}
        <div className="space-y-1">
          <label className="text-[11px] font-medium text-muted-foreground">Content Type</label>
          <select
            value={contentType}
            onChange={(e) => setContentType(e.target.value as ContentType)}
            className="w-full bg-background border border-border rounded px-2.5 py-1 text-xs outline-none focus:border-primary text-foreground"
          >
            {contentTypes.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>

        {/* Category */}
        <div className="space-y-1">
          <label className="text-[11px] font-medium text-muted-foreground">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full bg-background border border-border rounded px-2.5 py-1 text-xs outline-none focus:border-primary text-foreground"
          >
            <option value="">Select Category...</option>
            {(categoriesData?.data || []).map((cat) => (
              <option key={cat._id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Author */}
        <div className="space-y-1">
          <label className="text-[11px] font-medium text-muted-foreground">Author / Contributor</label>
          <input
            type="text"
            placeholder="e.g. Claude, GPT-4, Researcher"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full bg-background border border-border rounded px-2.5 py-1 text-xs outline-none focus:border-primary text-foreground"
          />
        </div>

        {/* Source URL */}
        <div className="space-y-1">
          <label className="text-[11px] font-medium text-muted-foreground">Source URL (Optional)</label>
          <input
            type="url"
            placeholder="https://..."
            value={sourceUrl}
            onChange={(e) => setSourceUrl(e.target.value)}
            className="w-full bg-background border border-border rounded px-2.5 py-1 text-xs outline-none focus:border-primary text-foreground"
          />
        </div>
      </div>

      {/* Topics and Tags */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-[11px] font-medium text-muted-foreground">
            Topics (comma-separated names)
          </label>
          <input
            type="text"
            placeholder="Astrophysics, Computational Science"
            value={topicsInput}
            onChange={(e) => setTopicsInput(e.target.value)}
            className="w-full bg-card border border-border rounded-md px-3 py-1.5 text-xs outline-none focus:border-primary"
          />
          {topicsData?.data && topicsData.data.length > 0 && (
            <div className="flex flex-wrap gap-1 pt-1">
              {topicsData.data.slice(0, 6).map((t) => (
                <button
                  key={t._id}
                  type="button"
                  onClick={() => {
                    const current = topicsInput ? topicsInput.split(',').map((x) => x.trim()) : [];
                    if (!current.includes(t.name)) {
                      setTopicsInput([...current, t.name].join(', '));
                    }
                  }}
                  className="text-[10px] bg-muted hover:bg-muted/80 text-muted-foreground px-1.5 py-0.5 rounded transition-colors"
                >
                  + {t.name}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-1">
          <label className="text-[11px] font-medium text-muted-foreground">
            Tags (comma-separated, e.g. blackholes, quantum)
          </label>
          <input
            type="text"
            placeholder="blackholes, relativity, event-horizon"
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            className="w-full bg-card border border-border rounded-md px-3 py-1.5 text-xs outline-none focus:border-primary"
          />
        </div>
      </div>

      {/* Markdown Content Editor */}
      <div className="space-y-2">
        <div className="flex items-center justify-between border-b border-border pb-1">
          <label className="text-xs font-semibold text-foreground">Markdown Content</label>
          <div className="flex items-center gap-1 bg-muted rounded p-0.5 text-xs">
            <button
              type="button"
              onClick={() => setTab('write')}
              className={cn(
                'px-2 py-0.5 rounded transition-colors',
                tab === 'write' ? 'bg-background text-foreground font-medium shadow-sm' : 'text-muted-foreground'
              )}
            >
              Write
            </button>
            <button
              type="button"
              onClick={() => setTab('preview')}
              className={cn(
                'px-2 py-0.5 rounded transition-colors',
                tab === 'preview' ? 'bg-background text-foreground font-medium shadow-sm' : 'text-muted-foreground'
              )}
            >
              Preview
            </button>
            <button
              type="button"
              onClick={() => setTab('split')}
              className={cn(
                'px-2 py-0.5 rounded transition-colors hidden md:block',
                tab === 'split' ? 'bg-background text-foreground font-medium shadow-sm' : 'text-muted-foreground'
              )}
            >
              Split View
            </button>
          </div>
        </div>

        {/* Editor Area */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(tab === 'write' || tab === 'split') && (
            <div className={cn(tab === 'split' ? '' : 'md:col-span-2')}>
              <textarea
                placeholder="# Write your article in Markdown...&#10;&#10;Supports syntax highlighting, tables, KaTeX math ($...$), and code blocks."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={20}
                className="w-full bg-card border border-border rounded-lg p-4 font-mono text-xs leading-relaxed outline-none focus:border-primary resize-y transition-colors"
                required
              />
            </div>
          )}

          {(tab === 'preview' || tab === 'split') && (
            <div
              className={cn(
                'bg-card border border-border rounded-lg p-6 overflow-y-auto max-h-[500px]',
                tab === 'split' ? '' : 'md:col-span-2'
              )}
            >
              {content ? (
                <MarkdownRenderer content={content} />
              ) : (
                <div className="text-muted-foreground text-xs italic">
                  Live preview will appear here...
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* References */}
      <div className="space-y-1">
        <label className="text-[11px] font-medium text-muted-foreground">
          Citations / References (one per line)
        </label>
        <textarea
          placeholder="Hawking, S. W. (1974). Black hole explosions? Nature, 248(5443), 30-31."
          value={referencesInput}
          onChange={(e) => setReferencesInput(e.target.value)}
          rows={3}
          className="w-full bg-card border border-border rounded-md px-3 py-2 text-xs outline-none focus:border-primary resize-none"
        />
      </div>
    </form>
  );
}
