import { useState, useEffect } from 'react';
import { fetchUser, fetchRepos } from '../api/githubApi';
import { getCached, setCached } from '../utils/cache';

export const useGitHubUser = (username) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!username) return;

    const cached = getCached(username);
    if (cached) {
      setData(cached);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    Promise.all([fetchUser(username), fetchRepos(username)])
      .then(([user, repos]) => {
        const result = { user, repos };
        setData(result);
        setCached(username, result);
      })
      .catch((err) => {
        setError(err.message);
        setData(null);
      })
      .finally(() => setLoading(false));
  }, [username]);

  return { data, loading, error };
};
