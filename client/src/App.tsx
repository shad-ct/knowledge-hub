import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import DashboardPage from './pages/Dashboard';
import HomePage from './pages/Home';
import ArticlesPage from './pages/Articles';
import ArticleDetailPage from './pages/ArticleDetail';
import CreateArticlePage from './pages/CreateArticle';
import EditArticlePage from './pages/EditArticle';
import LibraryPage from './pages/Library';
import TopicsPage from './pages/Topics';
import TopicDetailPage from './pages/TopicDetail';
import CategoriesPage from './pages/Categories';
import TagsPage from './pages/Tags';
import TagDetailPage from './pages/TagDetail';
import ActivityLogsPage from './pages/ActivityLogs';
import TrashPage from './pages/Trash';
import ApiDocsPage from './pages/ApiDocs';
import SettingsPage from './pages/Settings';
import NotFoundPage from './pages/NotFound';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="stats" element={<DashboardPage />} />
        <Route path="articles" element={<ArticlesPage />} />
        <Route path="articles/new" element={<CreateArticlePage />} />
        <Route path="articles/:id" element={<ArticleDetailPage />} />
        <Route path="articles/:id/edit" element={<EditArticlePage />} />
        <Route path="library" element={<LibraryPage />} />
        <Route path="topics" element={<TopicsPage />} />
        <Route path="topics/:id" element={<TopicDetailPage />} />
        <Route path="categories" element={<CategoriesPage />} />
        <Route path="tags" element={<TagsPage />} />
        <Route path="tags/:name" element={<TagDetailPage />} />
        <Route path="activity" element={<ActivityLogsPage />} />
        <Route path="trash" element={<TrashPage />} />
        <Route path="api-docs" element={<ApiDocsPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
