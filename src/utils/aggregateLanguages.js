export const aggregateLanguages = (repos) => {
  const counts = {};
  repos.forEach((repo) => {
    if (repo.language) {
      counts[repo.language] = (counts[repo.language] || 0) + 1;
    }
  });
  return Object.entries(counts)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
};
