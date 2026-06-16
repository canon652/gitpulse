const StatCard = ({ label, value }) => (
  <div className="p-5 rounded-xl bg-white dark:bg-[#161b22]
    border border-gray-200 dark:border-gray-800 text-center">
    <p className="text-3xl font-bold font-mono text-indigo-500">
      {value.toLocaleString('ru-RU')}
    </p>
    <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">{label}</p>
  </div>
);

const StatsGrid = ({ user }) => {
  const stats = [
    { label: 'Репозитории', value: user.public_repos },
    { label: 'Подписчики', value: user.followers },
    { label: 'Подписки', value: user.following },
  ];
  return (
    <div className="grid grid-cols-3 gap-4 mb-4">
      {stats.map((s) => (
        <StatCard key={s.label} {...s} />
      ))}
    </div>
  );
};

export default StatsGrid;
