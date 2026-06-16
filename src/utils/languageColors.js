export const LANGUAGE_COLORS = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  Java: '#b07219',
  'C++': '#f34b7d',
  C: '#555555',
  HTML: '#e34c26',
  CSS: '#563d7c',
  SCSS: '#c6538c',
  Go: '#00ADD8',
  Rust: '#dea584',
  Ruby: '#701516',
  PHP: '#4F5D95',
  Swift: '#F05138',
  Kotlin: '#A97BFF',
  Shell: '#89e051',
  Dart: '#00B4AB',
  Vue: '#41b883',
  'Jupyter Notebook': '#DA5B0B',
  Dockerfile: '#384d54',
};

export const getLanguageColor = (lang) =>
  LANGUAGE_COLORS[lang] || '#8b949e';
