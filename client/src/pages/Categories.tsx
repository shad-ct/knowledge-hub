import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  FolderOpen,
  Plus,
  Edit2,
  Trash2,
  X,
  FileText,
  Palette,
} from 'lucide-react';
import { categoriesApi } from '../lib/api';
import { cn } from '../lib/utils';
import type { Category } from '../types';

const PRESET_COLORS = [
  '#6366f1', // Indigo
  '#3b82f6', // Blue
  '#06b6d4', // Cyan
  '#10b981', // Emerald
  '#f59e0b', // Amber
  '#ef4444', // Red
  '#ec4899', // Pink
  '#8b5cf6', // Violet
];

export default function CategoriesPage() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('#6366f1');

  const { data: categoriesData, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: () => categoriesApi.list(),
  });

  const categories = categoriesData?.data || [];

  const openCreateModal = () => {
    setEditingCategory(null);
    setName('');
    setDescription('');
    setColor('#6366f1');
    setIsModalOpen(true);
  };

  const openEditModal = (cat: Category) => {
    setEditingCategory(cat);
    setName(cat.name);
    setDescription(cat.description || '');
    setColor(cat.color || '#6366f1');
    setIsModalOpen(true);
  };

  const saveMutation = useMutation({
    mutationFn: (payload: { name: string; description?: string; color?: string }) => {
      if (editingCategory) {
        return categoriesApi.update(editingCategory._id, payload);
      }
      return categoriesApi.create(payload);
    },
    onSuccess: () => {
      toast.success(editingCategory ? 'Category updated' : 'Category created');
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      setIsModalOpen(false);
    },
    onError: (err: any) => {
      const msg = err.response?.data?.error || err.message || 'Operation failed';
      toast.error(msg);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: categoriesApi.delete,
    onSuccess: () => {
      toast.success('Category deleted');
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
    onError: () => toast.error('Failed to delete category'),
  });

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete the category "${name}"? Articles will keep existing without this category.`)) {
      deleteMutation.mutate(id);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return toast.error('Category name is required');
    saveMutation.mutate({
      name: name.trim(),
      description: description.trim() || undefined,
      color,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Categories</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Broad classifications for organizing articles across knowledge domains
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-primary-foreground rounded-md text-xs font-medium hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          New Category
        </button>
      </div>

      {/* Grid of Categories */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-32 bg-card border border-border rounded-lg animate-pulse" />
          ))}
        </div>
      ) : categories.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat) => (
            <div
              key={cat._id}
              className="bg-card border border-border rounded-lg p-5 flex flex-col justify-between hover:border-primary/40 transition-colors group relative"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-3.5 h-3.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: cat.color || '#6366f1' }}
                    />
                    <h3 className="font-semibold text-sm text-foreground">{cat.name}</h3>
                  </div>

                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => openEditModal(cat)}
                      className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                      title="Edit Category"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(cat._id, cat.name)}
                      className="p-1 text-muted-foreground hover:text-destructive transition-colors"
                      title="Delete Category"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground line-clamp-2 mb-4">
                  {cat.description || 'No description provided.'}
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-border/60">
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <FileText className="w-3 h-3" />
                  {cat.articleCount || 0} {cat.articleCount === 1 ? 'article' : 'articles'}
                </span>

                <Link
                  to={`/articles?category=${cat.slug}`}
                  className="text-xs font-medium text-primary hover:underline"
                >
                  Browse Articles →
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-16 text-center border border-dashed border-border rounded-lg bg-card/40">
          <FolderOpen className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3" />
          <h3 className="font-semibold text-foreground text-sm">No categories created</h3>
          <p className="text-xs text-muted-foreground mt-1 max-w-sm mx-auto">
            Categories help structure the repository into domains like Science, Technology, and Philosophy.
          </p>
          <button
            onClick={openCreateModal}
            className="mt-4 px-3 py-1.5 text-xs bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Create First Category
          </button>
        </div>
      )}

      {/* Modal Dialog */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
          <div className="bg-card border border-border rounded-xl w-full max-w-md p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-foreground">
                {editingCategory ? 'Edit Category' : 'Create New Category'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-medium text-muted-foreground">Category Name</label>
                <input
                  type="text"
                  placeholder="e.g. Theoretical Physics"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm outline-none focus:border-primary"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-muted-foreground">Description (Optional)</label>
                <textarea
                  placeholder="Domain definition or scope..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm outline-none focus:border-primary resize-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-muted-foreground">Accent Color</label>
                <div className="flex items-center gap-2 pt-1">
                  {PRESET_COLORS.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setColor(c)}
                      className={cn(
                        'w-6 h-6 rounded-full border-2 transition-transform',
                        color === c ? 'scale-125 border-foreground' : 'border-transparent'
                      )}
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-border">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-3 py-1.5 text-xs rounded border border-border text-foreground hover:bg-muted"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saveMutation.isPending}
                  className="px-4 py-1.5 text-xs bg-primary text-primary-foreground font-medium rounded hover:bg-primary/90 disabled:opacity-50"
                >
                  {saveMutation.isPending ? 'Saving...' : editingCategory ? 'Save Changes' : 'Create Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
