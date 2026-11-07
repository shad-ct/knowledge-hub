import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  ArrowLeft,
  Save,
  Clock,
  History,
  AlertTriangle,
  Image as ImageIcon,
  X,
} from 'lucide-react';
import { articlesApi, categoriesApi, topicsApi } from '../lib/api';
import MarkdownRenderer from '../components/MarkdownRenderer';
import { cn, formatRelativeDate } from '../lib/utils';
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

export default function EditArticlePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [contentType, setContentType] = useState<ContentType>('article');
  const [category, setCategory] = useState('');
  const [topicsInput, setTopicsInput] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [author, setAuthor] = useState('');
  const [sourceUrl, setSourceUrl] = useState('');
  const [featuredImage, setFeaturedImage] = useState('');
  const [referencesInput, setReferencesInput] = useState('');
  const [status, setStatus] = useState<ArticleStatus>('published');
  const [tab, setTab] = useState<'write' | 'preview' | 'split'>('split');
  const [isDirty, setIsDirty] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInsertImage = () => {
    const url = prompt('Enter image URL:');
    if (!url) return;
    const alt = prompt('Enter image caption/alt text:', 'Illustration') || 'Image';
    const imageMarkdown = `\n![${alt}](${url.trim()})\n`;

    if (textareaRef.current) {
      const textarea = textareaRef.current;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newContent = content.substring(0, start) + imageMarkdown + content.substring(end);
      setContent(newContent);
      setIsDirty(true);
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start + imageMarkdown.length, start + imageMarkdown.length);
      }, 50);
    } else {
      setContent((prev) => prev + imageMarkdown);
      setIsDirty(true);
    }
  };

  const { data: articleData, isLoading } = useQuery({
    queryKey: ['article', id],
    queryFn: () => articlesApi.get(id!),
    enabled: !!id,
  });

  const { data: categoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn: () => categoriesApi.list(),
  });

  const { data: topicsData } = useQuery({
    queryKey: ['topics'],
    queryFn: () => topicsApi.list(),
  });

  const { data: versionsData } = useQuery({
    queryKey: ['article-versions', id],
    queryFn: () => articlesApi.getVersions(id!),
    enabled: !!id,
  });

  useEffect(() => {
    if (articleData?.data) {
      const a = articleData.data;
      setTitle(a.title || '');
      setDescription(a.description || '');
      setContent(a.content || '');
      setContentType(a.contentType || 'article');
      setCategory(a.categoryId?.name || '');
      setTopicsInput((a.topicIds || []).map((t) => t.name).join(', '));
      setTagsInput((a.tagIds || []).map((t) => t.displayName || t.name).join(', '));
      setAuthor(a.author || '');
      setSourceUrl(a.sourceUrl || '');
      setFeaturedImage(a.featuredImage || '');
      setReferencesInput((a.references || []).join('\n'));
      setStatus(a.status || 'published');
      setIsDirty(false);
    }
  }, [articleData]);

  const updateMutation = useMutation({
    mutationFn: (payload: any) => articlesApi.update(id!, payload),
    onSuccess: () => {
      toast.success('Article updated successfully');
      queryClient.invalidateQueries({ queryKey: ['article', id] });
      queryClient.invalidateQueries({ queryKey: ['articles'] });
      queryClient.invalidateQueries({ queryKey: ['article-versions', id] });
      navigate(`/articles/${id}`);
    },
    onError: (err: any) => {
      const msg = err.response?.data?.error || err.message || 'Failed to update article';
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

    updateMutation.mutate({
      title: title.trim(),
      description: description.trim(),
      content,
      contentType,
      category: category || undefined,
      topics,
      tags,
      author: author.trim() || undefined,
      sourceUrl: sourceUrl.trim() || undefined,
      featuredImage: featuredImage.trim() || undefined,
      references,
      status,
      editedBy: 'Curator',
    });
  };

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto py-12 text-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-xs text-muted-foreground">Loading article editor...</p>
      </div>
    );
  }

  const versions = versionsData?.data || [];

  return (
    <form onSubmit={handleSubmit} className="max-w-5xl mx-auto space-y-6 pb-12">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate(`/articles/${id}`)}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Article
          </button>
          {isDirty && (
            <span className="flex items-center gap-1 text-[11px] text-yellow-400 bg-yellow-500/10 border border-yellow-500/20 px-2 py-0.5 rounded">
              <AlertTriangle className="w-3 h-3" />
              Unsaved changes
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {versions.length > 0 && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground bg-muted px-2.5 py-1 rounded">
              <History className="w-3.5 h-3.5" />
              <span>{versions.length} versions</span>
            </div>
          )}

          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value as ArticleStatus);
              setIsDirty(true);
            }}
            className="bg-card border border-border rounded-md px-2.5 py-1 text-xs outline-none focus:border-primary text-foreground"
          >
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>

          <button
            type="submit"
            disabled={updateMutation.isPending}
            className="flex items-center gap-1.5 px-4 py-1.5 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            <Save className="w-3.5 h-3.5" />
            {updateMutation.isPending ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      {/* Title */}
      <div className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Article Title..."
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setIsDirty(true);
            }}
            className="w-full bg-transparent text-2xl font-bold tracking-tight outline-none placeholder:text-muted-foreground/50 border-b border-transparent focus:border-border pb-1 transition-colors"
            required
          />
        </div>

        <div>
          <textarea
            placeholder="Short summary or abstract..."
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              setIsDirty(true);
            }}
            rows={2}
            className="w-full bg-card border border-border rounded-md px-3 py-2 text-sm outline-none focus:border-primary placeholder:text-muted-foreground/60 resize-none transition-colors"
            required
          />
        </div>
      </div>

      {/* Metadata Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 bg-card border border-border rounded-lg p-3">
        <div className="space-y-1">
          <label className="text-[11px] font-medium text-muted-foreground">Content Type</label>
          <select
            value={contentType}
            onChange={(e) => {
              setContentType(e.target.value as ContentType);
              setIsDirty(true);
            }}
            className="w-full bg-background border border-border rounded px-2.5 py-1 text-xs outline-none focus:border-primary text-foreground"
          >
            {contentTypes.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-[11px] font-medium text-muted-foreground">Category</label>
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setIsDirty(true);
            }}
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

        <div className="space-y-1">
          <label className="text-[11px] font-medium text-muted-foreground">Author / Contributor</label>
          <input
            type="text"
            value={author}
            onChange={(e) => {
              setAuthor(e.target.value);
              setIsDirty(true);
            }}
            className="w-full bg-background border border-border rounded px-2.5 py-1 text-xs outline-none focus:border-primary text-foreground"
          />
        </div>

        <div className="space-y-1">
          <label className="text-[11px] font-medium text-muted-foreground">Source URL</label>
          <input
            type="url"
            value={sourceUrl}
            onChange={(e) => {
              setSourceUrl(e.target.value);
              setIsDirty(true);
            }}
            className="w-full bg-background border border-border rounded px-2.5 py-1 text-xs outline-none focus:border-primary text-foreground"
          />
        </div>
      </div>

      {/* Topics and Tags */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-[11px] font-medium text-muted-foreground">
            Topics (comma-separated)
          </label>
          <input
            type="text"
            value={topicsInput}
            onChange={(e) => {
              setTopicsInput(e.target.value);
              setIsDirty(true);
            }}
            className="w-full bg-card border border-border rounded-md px-3 py-1.5 text-xs outline-none focus:border-primary"
          />
        </div>

        <div className="space-y-1">
          <label className="text-[11px] font-medium text-muted-foreground">
            Tags (comma-separated)
          </label>
          <input
            type="text"
            value={tagsInput}
            onChange={(e) => {
              setTagsInput(e.target.value);
              setIsDirty(true);
            }}
            className="w-full bg-card border border-border rounded-md px-3 py-1.5 text-xs outline-none focus:border-primary"
          />
        </div>
      </div>

      {/* Featured Image & Visual Assets */}
      <div className="bg-card border border-border rounded-lg p-3 space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-[11px] font-medium text-muted-foreground flex items-center gap-1.5">
            <ImageIcon className="w-3.5 h-3.5 text-primary" />
            Featured Header Image URL (Optional)
          </label>
          {featuredImage && (
            <button
              type="button"
              onClick={() => {
                setFeaturedImage('');
                setIsDirty(true);
              }}
              className="text-[10px] text-muted-foreground hover:text-red-400 flex items-center gap-1 transition-colors"
            >
              <X className="w-3 h-3" /> Remove image
            </button>
          )}
        </div>
        <div className="flex items-center gap-2">
          <input
            type="url"
            placeholder="https://images.unsplash.com/... or https://domain.com/photo.jpg"
            value={featuredImage}
            onChange={(e) => {
              setFeaturedImage(e.target.value);
              setIsDirty(true);
            }}
            className="w-full bg-background border border-border rounded px-3 py-1.5 text-xs outline-none focus:border-primary text-foreground placeholder:text-muted-foreground/60"
          />
        </div>
        {featuredImage && (
          <div className="relative rounded-md overflow-hidden border border-border max-h-40 bg-muted/40 flex items-center justify-center">
            <img
              src={featuredImage}
              alt="Featured preview"
              className="w-full h-40 object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLElement).style.display = 'none';
              }}
            />
          </div>
        )}
      </div>

      {/* Markdown Content Editor */}
      <div className="space-y-2">
        <div className="flex items-center justify-between border-b border-border pb-1">
          <div className="flex items-center gap-3">
            <label className="text-xs font-semibold text-foreground">Markdown Content</label>
            <button
              type="button"
              onClick={handleInsertImage}
              className="flex items-center gap-1 text-[11px] text-muted-foreground hover:text-primary bg-muted/60 hover:bg-muted px-2 py-0.5 rounded transition-colors"
              title="Insert image markdown at cursor"
            >
              <ImageIcon className="w-3 h-3" />
              <span>Insert Image</span>
            </button>
          </div>
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(tab === 'write' || tab === 'split') && (
            <div className={cn(tab === 'split' ? '' : 'md:col-span-2')}>
              <textarea
                ref={textareaRef}
                value={content}
                onChange={(e) => {
                  setContent(e.target.value);
                  setIsDirty(true);
                }}
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
          value={referencesInput}
          onChange={(e) => {
            setReferencesInput(e.target.value);
            setIsDirty(true);
          }}
          rows={3}
          className="w-full bg-card border border-border rounded-md px-3 py-2 text-xs outline-none focus:border-primary resize-none"
        />
      </div>
    </form>
  );
}

