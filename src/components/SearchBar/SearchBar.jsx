import { useState } from 'react';
import { Search, X } from 'lucide-react';

const SearchBar = ({ onSearch, initialValue = '' }) => {
  const [value, setValue] = useState(initialValue);

  const handleSubmit = () => {
    const trimmed = value.trim();
    if (trimmed) onSearch(trimmed);
  };

  const handleClear = () => {
    setValue('');
    onSearch('');
  };

  return (
    <div className="flex gap-2 max-w-xl mx-auto my-6">
      <div className="relative flex-1">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          placeholder="Имя пользователя GitHub (напр. torvalds)"
          className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700
            bg-white dark:bg-[#161b22] text-gray-900 dark:text-gray-100
            placeholder-gray-400 dark:placeholder-gray-600
            outline-none focus:border-indigo-500 dark:focus:border-indigo-400
            transition-colors pr-10"
        />
        {value && (
          <button
            onClick={handleClear}
            aria-label="Очистить"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400
              hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
          >
            <X size={16} />
          </button>
        )}
      </div>
      <button
        onClick={handleSubmit}
        className="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700
          text-white font-medium flex items-center gap-2 transition-colors
          disabled:opacity-50"
        disabled={!value.trim()}
      >
        <Search size={18} />
        Найти
      </button>
    </div>
  );
};

export default SearchBar;
