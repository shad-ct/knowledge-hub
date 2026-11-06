import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  Settings as SettingsIcon,
  Moon,
  Sun,
  Key,
  Database,
  Download,
  Info,
  CheckCircle,
  XCircle,
  BookOpen,
  LayoutList,
  LayoutGrid,
} from 'lucide-react';
import { useTheme } from '../lib/theme';
import { articlesApi } from '../lib/api';
import { cn } from '../lib/utils';

export default function SettingsPage() {
  const { theme, toggleTheme } = useTheme();

  const [apiKey, setApiKey] = useState(
    () => localStorage.getItem('kh_api_key') || ''
  );
  const [testStatus, setTestStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>(
    () => (localStorage.getItem('kh_view_mode') as 'list' | 'grid') || 'list'
  );
  const [defaultSort, setDefaultSort] = useState(
    () => localStorage.getItem('kh_sort') || 'publishedAt'
  );

  const { data: statsData } = useQuery({
    queryKey: ['stats'],
    queryFn: () => articlesApi.getStats(),
  });

  const handleSaveApiKey = () => {
    if (apiKey.trim()) {
      localStorage.setItem('kh_api_key', apiKey.trim());
      toast.success('API key saved for client requests');
    } else {
      localStorage.removeItem('kh_api_key');
      toast.info('API key cleared');
    }
  };

  const handleTestConnection = async () => {
    setTestStatus('testing');
    try {
      const res = await fetch('/health');
      if (res.ok) {
        setTestStatus('success');
        toast.success('Backend connection verified (HTTP 200 OK)');
      } else {
        setTestStatus('error');
        toast.error(`Healthcheck returned status ${res.status}`);
      }
    } catch (err) {
      setTestStatus('error');
      toast.error('Failed to connect to backend server');
    }
  };

  const handleExportJson = async () => {
    try {
      toast.loading('Preparing repository backup...');
      const res = await articlesApi.list({ limit: 1000 });
      const articles = res.data || [];

      const blob = new Blob([JSON.stringify(articles, null, 2)], {
        type: 'application/json',
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `knowledge-hub-backup-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
      toast.dismiss();
      toast.success(`Exported ${articles.length} articles to JSON`);
    } catch (err) {
      toast.dismiss();
      toast.error('Failed to export repository');
    }
  };

  const stats = statsData?.data;

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Configure interface appearance, API access keys, and repository maintenance
        </p>
      </div>

      {/* Appearance */}
      <div className="bg-card border border-border rounded-xl p-5 space-y-4">
        <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
          {theme === 'dark' ? <Moon className="w-4 h-4 text-primary" /> : <Sun className="w-4 h-4 text-primary" />}
          Interface Theme
        </h2>
        <p className="text-xs text-muted-foreground">
          Choose between high-contrast editorial dark mode or crisp daylight reading mode.
        </p>

        <div className="flex items-center gap-3 pt-1">
          <button
            onClick={() => {
              if (theme !== 'dark') toggleTheme();
            }}
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-lg border text-xs font-medium transition-colors',
              theme === 'dark'
                ? 'bg-primary/10 border-primary text-primary'
                : 'border-border text-muted-foreground hover:text-foreground'
            )}
          >
            <Moon className="w-4 h-4" />
            Dark Theme
          </button>

          <button
            onClick={() => {
              if (theme !== 'light') toggleTheme();
            }}
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-lg border text-xs font-medium transition-colors',
              theme === 'light'
                ? 'bg-primary/10 border-primary text-primary'
                : 'border-border text-muted-foreground hover:text-foreground'
            )}
          >
            <Sun className="w-4 h-4" />
            Light Theme
          </button>
        </div>
      </div>

      {/* API Key Configuration */}
      <div className="bg-card border border-border rounded-xl p-5 space-y-4">
        <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <Key className="w-4 h-4 text-primary" />
          API Write Key
        </h2>
        <p className="text-xs text-muted-foreground">
          If your server has an <code className="text-foreground bg-muted px-1.5 py-0.5 rounded font-mono">API_WRITE_KEY</code> configured,
          enter it here to authorize browser management actions (or provide it via header <code className="text-foreground bg-muted px-1.5 py-0.5 rounded font-mono">X-API-Key</code> for AI agents).
        </p>

        <div className="flex flex-col sm:flex-row gap-2 max-w-lg">
          <input
            type="password"
            placeholder="Enter API key..."
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="flex-1 bg-background border border-border rounded-md px-3 py-1.5 text-xs outline-none focus:border-primary font-mono"
          />
          <button
            onClick={handleSaveApiKey}
            className="px-4 py-1.5 bg-primary text-primary-foreground text-xs font-medium rounded hover:bg-primary/90 transition-colors whitespace-nowrap"
          >
            Save Key
          </button>
        </div>

        {/* Server Health Check */}
        <div className="pt-2 flex items-center gap-3 text-xs">
          <button
            onClick={handleTestConnection}
            disabled={testStatus === 'testing'}
            className="px-3 py-1 bg-muted hover:bg-muted/80 rounded border border-border text-foreground transition-colors"
          >
            {testStatus === 'testing' ? 'Testing...' : 'Test Backend Connection'}
          </button>
          {testStatus === 'success' && (
            <span className="flex items-center gap-1 text-emerald-400">
              <CheckCircle className="w-3.5 h-3.5" />
              Connected
            </span>
          )}
          {testStatus === 'error' && (
            <span className="flex items-center gap-1 text-destructive">
              <XCircle className="w-3.5 h-3.5" />
              Connection failed
            </span>
          )}
        </div>
      </div>

      {/* Reading & View Preferences */}
      <div className="bg-card border border-border rounded-xl p-5 space-y-4">
        <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-primary" />
          Reading & View Preferences
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Default Article Layout</label>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setViewMode('list');
                  localStorage.setItem('kh_view_mode', 'list');
                  toast.success('Default layout set to List');
                }}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-1.5 rounded border text-xs transition-colors',
                  viewMode === 'list' ? 'bg-primary/10 border-primary text-primary font-medium' : 'border-border text-muted-foreground'
                )}
              >
                <LayoutList className="w-3.5 h-3.5" />
                List
              </button>
              <button
                onClick={() => {
                  setViewMode('grid');
                  localStorage.setItem('kh_view_mode', 'grid');
                  toast.success('Default layout set to Grid');
                }}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-1.5 rounded border text-xs transition-colors',
                  viewMode === 'grid' ? 'bg-primary/10 border-primary text-primary font-medium' : 'border-border text-muted-foreground'
                )}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                Grid
              </button>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Default Article Sorting</label>
            <select
              value={defaultSort}
              onChange={(e) => {
                setDefaultSort(e.target.value);
                localStorage.setItem('kh_sort', e.target.value);
                toast.success('Default sorting updated');
              }}
              className="bg-background border border-border rounded px-3 py-1.5 text-xs outline-none focus:border-primary text-foreground w-full"
            >
              <option value="publishedAt">Publication Date</option>
              <option value="createdAt">Date Created</option>
              <option value="updatedAt">Recently Updated</option>
              <option value="title">Alphabetical (Title)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Data Export & Backup */}
      <div className="bg-card border border-border rounded-xl p-5 space-y-4">
        <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <Database className="w-4 h-4 text-primary" />
          Data Backup & Repository Export
        </h2>
        <p className="text-xs text-muted-foreground">
          Export the entire knowledge base as structured JSON. All documents, metadata, topics, and markdown content are included.
        </p>

        <button
          onClick={handleExportJson}
          className="flex items-center gap-2 px-4 py-2 bg-secondary hover:bg-secondary/80 text-foreground text-xs font-medium rounded-lg transition-colors"
        >
          <Download className="w-3.5 h-3.5" />
          Export All Articles (JSON)
        </button>
      </div>

      {/* About Application */}
      <div className="bg-card border border-border rounded-xl p-5 space-y-3">
        <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <Info className="w-4 h-4 text-primary" />
          About Knowledge Hub
        </h2>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Knowledge Hub is a self-hosted, AI-agnostic digital knowledge repository. Multiple AI agents publish research, empirical observations, and technical explanations programmatically through standard REST endpoints, while human curators review, categorize, and synthesize insights.
        </p>
        <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2 border-t border-border/60">
          <span>Version: <strong>1.0.0</strong></span>
          <span>Storage: <strong>MongoDB</strong></span>
          <span>Renderer: <strong>KaTeX + Shiki / hljs</strong></span>
        </div>
      </div>
    </div>
  );
}
