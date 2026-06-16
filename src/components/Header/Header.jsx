import { Link, NavLink } from 'react-router-dom';
import ThemeToggle from '../ThemeToggle/ThemeToggle';

const Header = () => (
  <header className="sticky top-0 z-10 border-b border-gray-200 dark:border-gray-800
    bg-white/95 dark:bg-[#0d1117]/95 backdrop-blur-md">
    <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-2 font-bold text-lg">
        <span className="text-indigo-500 font-mono">{'<'}</span>
        <span className="dark:text-white">GitPulse</span>
        <span className="text-indigo-500 font-mono">{'/>'}</span>
      </Link>
      <div className="flex items-center gap-1">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              isActive
                ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`
          }
        >
          Профиль
        </NavLink>
        <NavLink
          to="/compare"
          className={({ isActive }) =>
            `px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              isActive
                ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`
          }
        >
          Сравнить
        </NavLink>
        <ThemeToggle />
      </div>
    </div>
  </header>
);

export default Header;
