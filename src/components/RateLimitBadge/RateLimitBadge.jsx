import { useState, useEffect } from 'react';
import { fetchRateLimit } from '../../api/githubApi';

const RateLimitBadge = () => {
  const [limit, setLimit] = useState(null);

  useEffect(() => {
    fetchRateLimit()
      .then((d) => setLimit(d.rate))
      .catch(() => {});
  }, []);

  if (!limit) return null;

  const resetTime = new Date(limit.reset * 1000).toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const pct = Math.round((limit.remaining / limit.limit) * 100);
  const color =
    pct > 50
      ? 'text-green-500'
      : pct > 20
        ? 'text-yellow-500'
        : 'text-red-500';

  return (
    <p className={`text-xs text-center font-mono mb-2 ${color}`}>
      API: {limit.remaining}/{limit.limit} запросов · сброс в {resetTime}
    </p>
  );
};

export default RateLimitBadge;
