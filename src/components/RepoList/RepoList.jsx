import RepoCard from '../RepoCard/RepoCard';

const RepoList = ({ repos }) => (
  <div className="mb-4">
    <h3 className="text-sm uppercase tracking-widest text-gray-500 dark:text-gray-600 mb-4">
      Популярные репозитории
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {repos.map((repo) => (
        <RepoCard key={repo.id} repo={repo} />
      ))}
    </div>
  </div>
);

export default RepoList;
