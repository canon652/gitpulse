export const formatDate = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

export const yearsOnGitHub = (createdAt) => {
  return new Date(createdAt).getFullYear();
};
