import { Star, GitFork } from 'lucide-react';
import { getLanguageColor } from '../../utils/languageColors';

const RepoCard = ({ repo }) => (
  <a
    href={repo.html_url}
    target="_blank"
    rel="noreferrer"
    className="block p-5 rounded-xl bg-white dark:bg-[#161b22]
      border border-gray-200 dark:border-gray-800
      hover:border-indigo-400 dark:hover:border-indigo-600
      transition-colors group"
  >
    <h4 className="font-semibold text-indigo-500 group-hover:underline truncate">
      {repo.name}
    </h4>
    {repo.description && (
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2 leading-relaxed">
        {repo.description}
      </p>
    )}
    <div className="flex items-center gap-4 mt-3 text-sm text-gray-500 dark:text-gray-500">
      {repo.language && (
        <span className="flex items-center gap-1.5">
          <span
            className="w-3 h-3 rounded-full flex-shrink-0"
            style={{ background: getLanguageColor(repo.language) }}
          />
          {repo.language}
        </span>
      )}
      <span className="flex items-center gap-1">
        <Star size={14} />
        {repo.stargazers_count.toLocaleString('ru-RU')}
      </span>
      <span className="flex items-center gap-1">
        <GitFork size={14} />
        {repo.forks_count.toLocaleString('ru-RU')}
      </span>
    </div>
  </a>
);

export default RepoCard;
