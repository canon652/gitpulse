const BASE = 'https://api.github.com';

export const fetchUser = async (username) => {
  const res = await fetch(`${BASE}/users/${username}`);
  if (res.status === 404) throw new Error('Пользователь не найден');
  if (res.status === 403) throw new Error('rate_limit');
  if (!res.ok) throw new Error('Ошибка загрузки профиля');
  return res.json();
};

export const fetchRepos = async (username) => {
  const res = await fetch(
    `${BASE}/users/${username}/repos?per_page=100&sort=updated`
  );
  if (res.status === 403) throw new Error('rate_limit');
  if (!res.ok) throw new Error('Ошибка загрузки репозиториев');
  return res.json();
};

export const fetchRateLimit = async () => {
  const res = await fetch(`${BASE}/rate_limit`);
  return res.json();
};
