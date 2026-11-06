import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import {
  LayoutDashboard,
  FileText,
  BookMarked,
  Tags,
  FolderOpen,
  Hash,
  Activity,
  Settings,
  Trash2,
  Code2,
  Sun,
  Moon,
  Plus,
  Search,
  Menu,
  X,
  BookOpen,
  Layers,
} from 'lucide-react';
import { useTheme } from '../lib/theme';
import { cn } from '../lib/utils';
import GlobalSearch from './GlobalSearch';

const navItems = [
  { to: '/', label: 'Overview', icon: LayoutDashboard, exact: true },
  { to: '/articles', label: 'All Articles', icon: FileText },
  { to: '/library', label: 'Library', icon: BookMarked },
  { to: '/topics', label: 'Topics', icon: Layers },
  { to: '/categories', label: 'Categories', icon: FolderOpen },
  { to: '/tags', label: 'Tags', icon: Hash },
  { to: '/activity', label: 'Activity Logs', icon: Activity },
  { to: '/settings', label: 'Settings', icon: Settings },
];

const secondaryItems = [
  { to: '/trash', label: 'Trash', icon: Trash2 },
  { to: '/api-docs', label: 'API Docs', icon: Code2 },
];

export default function Layout() {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();

  const isArticleReader = location.pathname.match(/^\/articles\/[^/]+$/) && !location.pathname.endsWith('/edit');

  return (
    <div className="min-h-screen bg-background flex">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-56 bg-card border-r border-border flex flex-col transition-transform duration-200 lg:translate-x-0 lg:static lg:z-auto',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Logo */}
        <div className="flex items-center gap-2 px-4 py-4 border-b border-border">
          <div className="w-7 h-7 rounded-lg bg-primary/20 flex items-center justify-center">
            <BookOpen className="w-4 h-4 text-primary" />
          </div>
          <span className="font-semibold text-sm tracking-tight">Knowledge Hub</span>
          <button
            className="ml-auto lg:hidden text-muted-foreground hover:text-foreground"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-3 px-2 space-y-0.5 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.exact}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition-colors',
                  isActive
                    ? 'bg-primary/15 text-primary font-medium'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                )
              }
            >
              <item.icon className="w-4 h-4 flex-shrink-0" />
              {item.label}
            </NavLink>
          ))}

          <div className="pt-3 pb-1">
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground/60 px-3 pb-1">
              More
            </div>
            {secondaryItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition-colors',
                    isActive
                      ? 'bg-primary/15 text-primary font-medium'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  )
                }
              >
                <item.icon className="w-4 h-4 flex-shrink-0" />
                {item.label}
              </NavLink>
            ))}
          </div>
        </nav>

        {/* Sidebar footer */}
        <div className="p-3 border-t border-border">
          <button
            onClick={toggleTheme}
            className="flex items-center gap-2 px-3 py-2 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-accent w-full transition-colors"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            {theme === 'dark' ? 'Light mode' : 'Dark mode'}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top nav */}
        <header className="sticky top-0 z-30 bg-background/95 backdrop-blur border-b border-border">
          <div className="flex items-center gap-3 px-4 h-12">
            <button
              className="lg:hidden text-muted-foreground hover:text-foreground"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Search trigger */}
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-border bg-muted/40 text-muted-foreground text-sm hover:bg-muted transition-colors flex-1 max-w-sm"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Search knowledge base...</span>
              <kbd className="ml-auto text-xs bg-background border border-border rounded px-1.5 py-0.5 hidden sm:block">
                ⌘K
              </kbd>
            </button>

            <div className="ml-auto flex items-center gap-2">
              <button
                onClick={() => navigate('/articles/new')}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span className="hidden sm:block">New Article</span>
              </button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className={cn('flex-1', isArticleReader ? '' : 'max-w-7xl mx-auto w-full px-4 py-6')}>
          <Outlet />
        </main>
      </div>

      {/* Global search */}
      {searchOpen && <GlobalSearch onClose={() => setSearchOpen(false)} />}
    </div>
  );
}

