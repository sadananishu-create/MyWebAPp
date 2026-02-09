import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import FeedPage from './pages/FeedPage';
import ExplorePage from './pages/ExplorePage';
import ProfilePage from './pages/ProfilePage';
import ParentDashboard from './pages/ParentDashboard';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to="/feed" replace />} />
        <Route path="/feed" element={<FeedPage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/parent" element={<ParentDashboard />} />
      </Route>
    </Routes>
  );
}
