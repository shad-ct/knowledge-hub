import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  Plus,
  Edit2,
  Trash2,
  X,
  Loader2,
  Layers,
  Tag,
  Calendar,
  FileText,
  ChevronDown,
  AlertTriangle,
  Play,
  Pause,
  Archive,
} from 'lucide-react';
import { topicsApi } from '../lib/api';
import { cn, formatRelativeDate, priorityColor, priorityLabel } from '../lib/utils';
import type { Topic, TopicStatus, TopicPriority } from '../types';

// ─── Status helpers ────────────────────────────────────────────────────────────
const statusColor: Record<TopicStatus, string> = {
  active: 'bg-green-500/10 text-green-400 border-green-500/20',
  paused: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  archived: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
};

const statusLabel: Record<TopicStatus, string> = {
  active: 'Active',
  paused: 'Paused',
  archived: 'Archived',
};

const priorityBadge: Record<TopicPriority, string> = {
  low: 'bg-muted text-muted-foreground border-border',
  medium: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  high: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  critical: 'bg-red-500/10 text-red-400 border-red-500/20',
};

// ─── Empty form state ──────────────────────────────────────────────────────────
const emptyForm = {
  name: '',
  description: '',
  instructions: '',
  keywords: '',
  suggestedTags: '',
  priority: 'medium' as TopicPriority,
  status: 'active' as TopicStatus,
};

type TopicForm = typeof emptyForm;

// ─── Skeleton ─────────────────────────────────────────────────────────────────
function TopicCardSkeleton() {
  return (
    <div className="bg-card border border-border rounded-lg p-5 animate-pulse">
      <div className="flex items-start justify-between mb-3">
        <div className="h-5 w-48 bg-muted rounded" />
        <div className="flex gap-1.5">
          <div className="h-5 w-16 bg-muted rounded-full" />
          <div className="h-5 w-14 bg-muted rounded-full" />
        </div>
      </div>
      <div className="h-4 w-full bg-muted rounded mb-2" />
      <div className="h-4 w-3/4 bg-muted rounded mb-4" />
      <div className="flex gap-2">
        <div className="h-3 w-16 bg-muted rounded" />
        <div className="h-3 w-16 bg-muted rounded" />
      </div>
    </div>
  );
}

// ─── Topic Modal ──────────────────────────────────────────────────────────────
interface TopicModalProps {
  topic?: Topic | null;
  onClose: () => void;
}

function TopicModal({ topic, onClose }: TopicModalProps) {
  const queryClient = useQueryClient();
  const isEdit = !!topic;

  const [form, setForm] = useState<TopicForm>(() =>
    topic
      ? {
          name: topic.name,
          description: topic.description,
          instructions: topic.instructions || '',
          keywords: topic.keywords?.join(', ') || '',
          suggestedTags: topic.suggestedTags?.join(', ') || '',
          priority: topic.priority,
          status: topic.status,
        }
      : emptyForm
  );

  const createMutation = useMutation({
    mutationFn: () =>
      topicsApi.create({
        name: form.name,
        description: form.description,
        instructions: form.instructions || undefined,
        keywords: form.keywords
          ? form.keywords.split(',').map((k) => k.trim()).filter(Boolean)
          : [],
        suggestedTags: form.suggestedTags
          ? form.suggestedTags.split(',').map((t) => t.trim()).filter(Boolean)
          : [],
        priority: form.priority,
        status: form.status,
      }),
    onSuccess: () => {
      toast.success('Topic created');
      queryClient.invalidateQueries({ queryKey: ['topics'] });
      onClose();
    },
    onError: () => toast.error('Failed to create topic'),
  });

  const updateMutation = useMutation({
    mutationFn: () =>
      topicsApi.update(topic!._id, {
        name: form.name,
        description: form.description,
        instructions: form.instructions || undefined,
        keywords: form.keywords
          ? form.keywords.split(',').map((k) => k.trim()).filter(Boolean)
          : [],
        suggestedTags: form.suggestedTags
          ? form.suggestedTags.split(',').map((t) => t.trim()).filter(Boolean)
          : [],
        priority: form.priority,
        status: form.status,
      }),
    onSuccess: () => {
      toast.success('Topic updated');
      queryClient.invalidateQueries({ queryKey: ['topics'] });
      queryClient.invalidateQueries({ queryKey: ['topic', topic!._id] });
      onClose();
    },
    onError: () => toast.error('Failed to update topic'),
  });

  const isPending = createMutation.isPending || updateMutation.isPending;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) { toast.error('Name is required'); return; }
    if (!form.description.trim()) { toast.error('Description is required'); return; }
    isEdit ? updateMutation.mutate() : createMutation.mutate();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-card border border-border rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border sticky top-0 bg-card z-10">
          <h2 className="font-semibold text-base">{isEdit ? 'Edit Topic' : 'New Topic'}</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-1.5">
              Name <span className="text-red-400">*</span>
            </label>
            <input
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder="e.g. Machine Learning Fundamentals"
              className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors placeholder:text-muted-foreground"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1.5">
              Description <span className="text-red-400">*</span>
            </label>
            <textarea
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              placeholder="Brief description of this topic..."
              rows={2}
              className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors resize-none placeholder:text-muted-foreground"
            />
          </div>

          {/* Instructions */}
          <div>
            <label className="block text-sm font-medium mb-1.5">
              Instructions
              <span className="ml-1.5 text-xs text-muted-foreground font-normal">(Markdown supported — guides AI agents)</span>
            </label>
            <textarea
              value={form.instructions}
              onChange={(e) => setForm((f) => ({ ...f, instructions: e.target.value }))}
              placeholder="Detailed instructions for how to handle content in this topic..."
              rows={6}
              className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors resize-y placeholder:text-muted-foreground font-mono"
            />
          </div>

          {/* Keywords */}
          <div>
            <label className="block text-sm font-medium mb-1.5">
              Keywords
              <span className="ml-1.5 text-xs text-muted-foreground font-normal">(comma-separated)</span>
            </label>
            <input
              value={form.keywords}
              onChange={(e) => setForm((f) => ({ ...f, keywords: e.target.value }))}
              placeholder="neural networks, deep learning, pytorch"
              className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors placeholder:text-muted-foreground"
            />
          </div>

          {/* Suggested Tags */}
          <div>
            <label className="block text-sm font-medium mb-1.5">
              Suggested Tags
              <span className="ml-1.5 text-xs text-muted-foreground font-normal">(comma-separated)</span>
            </label>
            <input
              value={form.suggestedTags}
              onChange={(e) => setForm((f) => ({ ...f, suggestedTags: e.target.value }))}
              placeholder="ml, ai, python"
              className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors placeholder:text-muted-foreground"
            />
          </div>

          {/* Priority + Status */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">Priority</label>
              <div className="relative">
                <select
                  value={form.priority}
                  onChange={(e) => setForm((f) => ({ ...f, priority: e.target.value as TopicPriority }))}
                  className="w-full appearance-none bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors pr-8"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="critical">Critical</option>
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Status</label>
              <div className="relative">
                <select
                  value={form.status}
                  onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as TopicStatus }))}
                  className="w-full appearance-none bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors pr-8"
                >
                  <option value="active">Active</option>
                  <option value="paused">Paused</option>
                  <option value="archived">Archived</option>
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isPending}
              className="px-4 py-2 text-sm border border-border rounded-lg hover:bg-accent transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 disabled:opacity-50 transition-colors"
            >
              {isPending && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              {isEdit ? 'Save Changes' : 'Create Topic'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Delete Confirmation ───────────────────────────────────────────────────────
interface DeleteConfirmProps {
  topic: Topic;
  onCancel: () => void;
  onConfirm: () => void;
  isPending: boolean;
}

function DeleteConfirm({ topic, onCancel, onConfirm, isPending }: DeleteConfirmProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onCancel} />
      <div className="relative bg-card border border-border rounded-xl shadow-2xl w-full max-w-sm p-6">
        <div className="flex items-start gap-4 mb-5">
          <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-5 h-5 text-red-400" />
          </div>
          <div>
            <h3 className="font-semibold mb-1">Delete Topic</h3>
            <p className="text-sm text-muted-foreground">
              Are you sure you want to delete <span className="font-medium text-foreground">"{topic.name}"</span>? This action cannot be undone.
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            disabled={isPending}
            className="flex-1 px-4 py-2 text-sm border border-border rounded-lg hover:bg-accent transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isPending}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg disabled:opacity-50 transition-colors"
          >
            {isPending && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Topic Card ────────────────────────────────────────────────────────────────
interface TopicCardProps {
  topic: Topic;
  onEdit: (topic: Topic) => void;
  onDelete: (topic: Topic) => void;
}

function TopicCard({ topic, onEdit, onDelete }: TopicCardProps) {
  const queryClient = useQueryClient();

  const statusMutation = useMutation({
    mutationFn: (status: TopicStatus) => topicsApi.update(topic._id, { status }),
    onSuccess: (_, status) => {
      toast.success(`Topic ${statusLabel[status].toLowerCase()}`);
      queryClient.invalidateQueries({ queryKey: ['topics'] });
    },
    onError: () => toast.error('Failed to update status'),
  });

  const nextStatus: Record<TopicStatus, { status: TopicStatus; icon: React.ReactNode; label: string }> = {
    active: { status: 'paused', icon: <Pause className="w-3.5 h-3.5" />, label: 'Pause' },
    paused: { status: 'active', icon: <Play className="w-3.5 h-3.5" />, label: 'Activate' },
    archived: { status: 'active', icon: <Play className="w-3.5 h-3.5" />, label: 'Reactivate' },
  };

  const next = nextStatus[topic.status];

  return (
    <div className="bg-card border border-border rounded-lg p-5 hover:border-border/80 transition-colors group">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <Link to={`/topics/${topic._id}`} className="font-semibold text-sm hover:text-primary transition-colors line-clamp-1 flex-1">
          {topic.name}
        </Link>
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <span className={cn('text-xs px-2 py-0.5 rounded-full border', priorityBadge[topic.priority])}>
            {priorityLabel[topic.priority]}
          </span>
          <span className={cn('text-xs px-2 py-0.5 rounded-full border', statusColor[topic.status])}>
            {statusLabel[topic.status]}
          </span>
        </div>
      </div>

      {/* Description */}
      <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{topic.description}</p>

      {/* Keywords */}
      {topic.keywords && topic.keywords.length > 0 && (
        <div className="flex items-center gap-1.5 flex-wrap mb-3">
          <Tag className="w-3 h-3 text-muted-foreground/60 flex-shrink-0" />
          {topic.keywords.slice(0, 5).map((kw) => (
            <span key={kw} className="text-xs bg-muted text-muted-foreground px-1.5 py-0.5 rounded">
              {kw}
            </span>
          ))}
          {topic.keywords.length > 5 && (
            <span className="text-xs text-muted-foreground">+{topic.keywords.length - 5} more</span>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-border">
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <FileText className="w-3 h-3" />
            {topic.articleCount ?? 0} articles
          </span>
          {topic.lastContribution && (
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {formatRelativeDate(topic.lastContribution)}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => statusMutation.mutate(next.status)}
            disabled={statusMutation.isPending}
            title={next.label}
            className="flex items-center gap-1 px-2 py-1 text-xs text-muted-foreground hover:text-foreground hover:bg-accent rounded transition-colors"
          >
            {statusMutation.isPending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : next.icon}
            <span className="hidden sm:inline">{next.label}</span>
          </button>
          <button
            onClick={() => topic.status !== 'archived' && statusMutation.mutate('archived')}
            disabled={statusMutation.isPending || topic.status === 'archived'}
            title="Archive"
            className="flex items-center gap-1 px-2 py-1 text-xs text-muted-foreground hover:text-foreground hover:bg-accent rounded transition-colors disabled:opacity-30"
          >
            <Archive className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onEdit(topic)}
            title="Edit"
            className="flex items-center gap-1 px-2 py-1 text-xs text-muted-foreground hover:text-foreground hover:bg-accent rounded transition-colors"
          >
            <Edit2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onDelete(topic)}
            title="Delete"
            className="flex items-center gap-1 px-2 py-1 text-xs text-muted-foreground hover:text-red-400 hover:bg-red-500/10 rounded transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
type FilterTab = 'all' | TopicStatus;

export default function TopicsPage() {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<FilterTab>('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [editTopic, setEditTopic] = useState<Topic | null>(null);
  const [deleteTopic, setDeleteTopic] = useState<Topic | null>(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['topics'],
    queryFn: () => topicsApi.list(),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => topicsApi.delete(id),
    onSuccess: () => {
      toast.success('Topic deleted');
      queryClient.invalidateQueries({ queryKey: ['topics'] });
      setDeleteTopic(null);
    },
    onError: () => toast.error('Failed to delete topic'),
  });

  const topics: Topic[] = data?.data ?? [];

  const filtered = activeTab === 'all' ? topics : topics.filter((t) => t.status === activeTab);

  const tabs: { key: FilterTab; label: string; count: number }[] = [
    { key: 'all', label: 'All', count: topics.length },
    { key: 'active', label: 'Active', count: topics.filter((t) => t.status === 'active').length },
    { key: 'paused', label: 'Paused', count: topics.filter((t) => t.status === 'paused').length },
    { key: 'archived', label: 'Archived', count: topics.filter((t) => t.status === 'archived').length },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold flex items-center gap-2">
            <Layers className="w-5 h-5 text-primary" />
            Topics
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Manage research topics and AI agent instructions
          </p>
        </div>
        <button
          onClick={() => { setEditTopic(null); setModalOpen(true); }}
          className="flex items-center gap-1.5 px-3 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Topic
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1 border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={cn(
              'flex items-center gap-1.5 px-4 py-2 text-sm font-medium border-b-2 transition-colors -mb-px',
              activeTab === tab.key
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            )}
          >
            {tab.label}
            <span className={cn(
              'text-xs px-1.5 py-0.5 rounded-full',
              activeTab === tab.key ? 'bg-primary/15 text-primary' : 'bg-muted text-muted-foreground'
            )}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => <TopicCardSkeleton key={i} />)}
        </div>
      ) : isError ? (
        <div className="text-center py-16 text-muted-foreground">
          <AlertTriangle className="w-10 h-10 mx-auto mb-3 text-red-400" />
          <p className="font-medium text-foreground mb-1">Failed to load topics</p>
          <p className="text-sm">Please try refreshing the page.</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <Layers className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p className="font-medium text-foreground mb-1">
            {activeTab === 'all' ? 'No topics yet' : `No ${activeTab} topics`}
          </p>
          <p className="text-sm mb-4">
            {activeTab === 'all'
              ? 'Create your first topic to organize AI agent research areas.'
              : `You don't have any ${activeTab} topics right now.`}
          </p>
          {activeTab === 'all' && (
            <button
              onClick={() => { setEditTopic(null); setModalOpen(true); }}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors"
            >
              <Plus className="w-4 h-4" />
              New Topic
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((topic) => (
            <TopicCard
              key={topic._id}
              topic={topic}
              onEdit={(t) => { setEditTopic(t); setModalOpen(true); }}
              onDelete={setDeleteTopic}
            />
          ))}
        </div>
      )}

      {/* Create / Edit Modal */}
      {modalOpen && (
        <TopicModal
          topic={editTopic}
          onClose={() => { setModalOpen(false); setEditTopic(null); }}
        />
      )}

      {/* Delete Confirmation */}
      {deleteTopic && (
        <DeleteConfirm
          topic={deleteTopic}
          onCancel={() => setDeleteTopic(null)}
          onConfirm={() => deleteMutation.mutate(deleteTopic._id)}
          isPending={deleteMutation.isPending}
        />
      )}
    </div>
  );
}
