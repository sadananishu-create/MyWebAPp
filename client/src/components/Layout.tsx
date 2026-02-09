import { Outlet, NavLink } from 'react-router-dom';
import { useUserStore } from '../store/userStore';

const navItems = [
  { to: '/feed', label: 'Feed', icon: '🏠' },
  { to: '/explore', label: 'Explore', icon: '🔍' },
  { to: '/profile', label: 'Profile', icon: '👤' },
  { to: '/parent', label: 'Parent', icon: '🛡️' },
];

export default function Layout() {
  const name = useUserStore((s) => s.name);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-primary-600 text-white px-4 py-3 flex items-center justify-between shadow-md">
        <h1 className="font-display text-xl font-extrabold tracking-tight">
          KidStream
        </h1>
        <span className="text-xs text-primary-200">Hi, {name}!</span>
      </header>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto pb-20">
        <Outlet />
      </main>

      {/* Bottom navigation (mobile-first) */}
      <nav className="fixed bottom-0 inset-x-0 bg-white border-t border-gray-200 flex justify-around py-2 z-50">
        {navItems.map(({ to, label, icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex flex-col items-center text-xs transition-colors ${
                isActive ? 'text-primary-600 font-semibold' : 'text-gray-500'
              }`
            }
          >
            <span className="text-lg">{icon}</span>
            {label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
