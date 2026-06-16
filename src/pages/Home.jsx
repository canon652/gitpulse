import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Share2, Check } from 'lucide-react';
import { useGitHubUser } from '../hooks/useGitHubUser';
import { aggregateLanguages } from '../utils/aggregateLanguages';
import SearchBar from '../components/SearchBar/SearchBar';
import ProfileCard from '../components/ProfileCard/ProfileCard';
import StatsGrid from '../components/StatsGrid/StatsGrid';
import LanguageChart from '../components/LanguageChart/LanguageChart';
import RepoList from '../components/RepoList/RepoList';
import RateLimitBadge from '../components/RateLimitBadge/RateLimitBadge';
import { HomeSkeleton } from '../components/Skeleton/Skeleton';

const POPULAR_USERS = ['torvalds', 'gaearon', 'sindresorhus', 'yyx990803'];

const EmptyState = ({ onExampleClick }) => (
  <div className="text-center py-16 text-gray-400 dark:text-gray-600">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-16 h-16 mx-auto mb-4 opacity-20 fill-current">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
    </svg>
    <p className="text-lg font-medium text-gray-500 dark:text-gray-500 mb-2">
      Введи имя пользователя GitHub
    </p>
    <p className="text-sm mb-6">Попробуй популярные профили:</p>
    <div className="flex flex-wrap justify-center gap-2">
      {POPULAR_USERS.map((u) => (
        <button
          key={u}
          onClick={() => onExampleClick(u)}
          className="px-4 py-1.5 rounded-full border border-gray-300 dark:border-gray-700
            text-sm font-mono text-gray-600 dark:text-gray-400
            hover:border-indigo-400 hover:text-indigo-500 transition-colors"
        >
          {u}
        </button>
      ))}
    </div>
  </div>
);

const ErrorMessage = ({ message }) => {
  const isRateLimit = message === 'rate_limit';
  return (
    <div className="text-center py-12 rounded-2xl border border-red-200 dark:border-red-900/40
      bg-red-50 dark:bg-red-900/10 mt-4">
      <p className="text-red-500 font-medium text-lg mb-1">
        {isRateLimit ? 'Превышен лимит запросов API' : message}
      </p>
      {isRateLimit && (
        <p className="text-sm text-gray-500 dark:text-gray-500">
          GitHub даёт 60 запросов в час без авторизации. Подождите немного и попробуйте снова.
        </p>
      )}
    </div>
  );
};

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [username, setUsername] = useState(searchParams.get('user') || '');
  const [copied, setCopied] = useState(false);
  const { data, loading, error } = useGitHubUser(username);

  useEffect(() => {
    if (username) {
      setSearchParams({ user: username }, { replace: true });
    } else {
      setSearchParams({}, { replace: true });
    }
  }, [username, setSearchParams]);

  const handleSearch = (value) => {
    setUsername(value);
  };

  const handleShare = async () => {
    const url = `${window.location.origin}${window.location.pathname}?user=${username}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt('Скопируй ссылку:', url);
    }
  };

  const languages = data ? aggregateLanguages(data.repos) : [];
  const topRepos = data
    ? [...data.repos]
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .slice(0, 6)
    : [];

  return (
    <div>
      <SearchBar onSearch={handleSearch} initialValue={username} />
      <RateLimitBadge />

      {!username && !loading && (
        <EmptyState onExampleClick={(u) => { setUsername(u); }} />
      )}

      {loading && <HomeSkeleton />}
      {error && !loading && <ErrorMessage message={error} />}

      {data && !loading && (
        <>
          <div className="flex justify-end mb-2">
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm
                text-gray-500 dark:text-gray-400 hover:bg-gray-100
                dark:hover:bg-gray-800 transition-colors"
            >
              {copied ? (
                <>
                  <Check size={15} className="text-green-500" />
                  <span className="text-green-500">Скопировано!</span>
                </>
              ) : (
                <>
                  <Share2 size={15} />
                  Поделиться
                </>
              )}
            </button>
          </div>
          <ProfileCard user={data.user} />
          <StatsGrid user={data.user} />
          <LanguageChart languages={languages} />
          <RepoList repos={topRepos} />
        </>
      )}
    </div>
  );
};

export default Home;
