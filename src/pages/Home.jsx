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

const EXAMPLES = [
  { login: 'torvalds', name: 'Linus Torvalds' },
  { login: 'gaearon', name: 'Dan Abramov' },
  { login: 'yyx990803', name: 'Evan You' },
  { login: 'sindresorhus', name: 'Sindre Sorhus' },
];

const EmptyState = ({ onPick }) => (
  <div className="grid-bg rounded-2xl text-center py-16 px-4 mt-2">
    <p className="text-xs uppercase tracking-widest text-indigo-400 dark:text-indigo-500 mb-3 font-mono">
      GitHub Profile Visualizer
    </p>
    <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
      Визуализируй любой{' '}
      <span className="text-indigo-500">GitHub</span>‑профиль
    </h1>
    <p className="text-gray-500 dark:text-gray-400 text-lg mb-10 max-w-md mx-auto">
      Статистика, языки, репозитории — в одном красивом дашборде
    </p>

    <p className="text-sm text-gray-400 dark:text-gray-600 mb-4">
      Попробуй на примере:
    </p>
    <div className="flex flex-wrap justify-center gap-3">
      {EXAMPLES.map((ex) => (
        <button
          key={ex.login}
          onClick={() => onPick(ex.login)}
          className="flex items-center gap-2 px-4 py-2 rounded-full
            border border-gray-200 dark:border-gray-700
            bg-white dark:bg-[#161b22]
            hover:border-indigo-400 dark:hover:border-indigo-500
            hover:shadow-md transition-all text-sm"
        >
          <img
            src={`https://github.com/${ex.login}.png?size=40`}
            alt={ex.name}
            className="w-6 h-6 rounded-full"
          />
          <span className="font-mono text-gray-700 dark:text-gray-300">
            @{ex.login}
          </span>
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

  const handleSearch = (value) => setUsername(value);

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
        <EmptyState onPick={(u) => setUsername(u)} />
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
