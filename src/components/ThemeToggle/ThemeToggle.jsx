import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const ThemeToggle = () => {
  const { dark, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      aria-label={dark ? 'Переключить на светлую тему' : 'Переключить на тёмную тему'}
      className="p-2 rounded-lg text-gray-500 dark:text-gray-400
        hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
    >
      {dark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
};

export default ThemeToggle;
