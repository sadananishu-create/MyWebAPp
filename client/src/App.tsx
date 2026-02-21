import { Routes, Route, Navigate } from 'react-router-dom';
import { useUserStore } from './store/userStore';
import Layout from './components/Layout';
import OnboardingPage from './pages/OnboardingPage';
import FeedPage from './pages/FeedPage';
import ExplorePage from './pages/ExplorePage';
import ProfilePage from './pages/ProfilePage';
import ParentDashboard from './pages/ParentDashboard';

export default function App() {
  const onboarded = useUserStore((s) => s.onboarded);

  if (!onboarded) {
    return (
      <Routes>
        <Route path="*" element={<OnboardingPage />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to="/feed" replace />} />
        <Route path="/feed" element={<FeedPage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/parent" element={<ParentDashboard />} />
      </Route>
      <Route path="*" element={<Navigate to="/feed" replace />} />
    </Routes>
  );
}
