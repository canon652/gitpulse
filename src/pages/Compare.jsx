import { useState } from 'react';
import { Search } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
} from 'recharts';
import { useGitHubUser } from '../hooks/useGitHubUser';
import ProfileCard from '../components/ProfileCard/ProfileCard';
import { ProfileSkeleton } from '../components/Skeleton/Skeleton';

const MiniSearch = ({ label, onSearch }) => {
  const [value, setValue] = useState('');
  const handleSubmit = () => {
    const trimmed = value.trim();
    if (trimmed) onSearch(trimmed);
  };
  return (
    <div className="flex gap-2">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
        placeholder={label}
        className="flex-1 px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700
          bg-white dark:bg-[#161b22] text-gray-900 dark:text-gray-100
          placeholder-gray-400 dark:placeholder-gray-600
          outline-none focus:border-indigo-500 transition-colors text-sm"
      />
      <button
        onClick={handleSubmit}
        disabled={!value.trim()}
        aria-label="Найти"
        className="px-3 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700
          text-white transition-colors disabled:opacity-50"
      >
        <Search size={16} />
      </button>
    </div>
  );
};

const CompareBar = ({ dataA, dataB, usernameA, usernameB }) => {
  const totalStars = (repos) =>
    repos.reduce((sum, r) => sum + r.stargazers_count, 0);

  const chartData = [
    {
      name: 'Репозитории',
      [usernameA]: dataA.user.public_repos,
      [usernameB]: dataB.user.public_repos,
    },
    {
      name: 'Подписчики',
      [usernameA]: dataA.user.followers,
      [usernameB]: dataB.user.followers,
    },
    {
      name: 'Подписки',
      [usernameA]: dataA.user.following,
      [usernameB]: dataB.user.following,
    },
    {
      name: 'Звёзды',
      [usernameA]: totalStars(dataA.repos),
      [usernameB]: totalStars(dataB.repos),
    },
  ];

  const tableRows = [
    {
      label: 'Репозитории',
      a: dataA.user.public_repos,
      b: dataB.user.public_repos,
    },
    {
      label: 'Подписчики',
      a: dataA.user.followers,
      b: dataB.user.followers,
    },
    {
      label: 'Подписки',
      a: dataA.user.following,
      b: dataB.user.following,
    },
    {
      label: 'Суммарно звёзд',
      a: totalStars(dataA.repos),
      b: totalStars(dataB.repos),
    },
  ];

  return (
    <div className="mt-6 space-y-4">
      <div className="p-6 rounded-2xl bg-white dark:bg-[#161b22]
        border border-gray-200 dark:border-gray-800">
        <h3 className="text-sm uppercase tracking-widest text-gray-500 dark:text-gray-600 mb-4">
          Сравнение метрик
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-500 dark:text-gray-500">
                <th className="text-left pb-3 font-medium">Метрика</th>
                <th className="text-right pb-3 font-mono font-medium text-indigo-500">
                  @{usernameA}
                </th>
                <th className="text-right pb-3 font-mono font-medium text-violet-500">
                  @{usernameB}
                </th>
              </tr>
            </thead>
            <tbody>
              {tableRows.map((row) => {
                const aWins = row.a >= row.b;
                const bWins = row.b >= row.a;
                return (
                  <tr
                    key={row.label}
                    className="border-t border-gray-100 dark:border-gray-800"
                  >
                    <td className="py-2.5 text-gray-600 dark:text-gray-400">
                      {row.label}
                    </td>
                    <td
                      className={`py-2.5 text-right font-mono ${aWins ? 'font-bold text-indigo-500' : 'text-gray-500 dark:text-gray-500'}`}
                    >
                      {row.a.toLocaleString('ru-RU')}
                    </td>
                    <td
                      className={`py-2.5 text-right font-mono ${bWins ? 'font-bold text-violet-500' : 'text-gray-500 dark:text-gray-500'}`}
                    >
                      {row.b.toLocaleString('ru-RU')}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-white dark:bg-[#161b22]
        border border-gray-200 dark:border-gray-800">
        <h3 className="text-sm uppercase tracking-widest text-gray-500 dark:text-gray-600 mb-4">
          Диаграмма сравнения
        </h3>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={chartData} barGap={4}>
            <XAxis
              dataKey="name"
              tick={{ fontSize: 12, fill: '#6b7280' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis hide />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--tooltip-bg, #fff)',
                border: '1px solid #e5e7eb',
                borderRadius: 8,
                fontSize: 12,
              }}
            />
            <Legend formatter={(v) => <span className="text-xs">@{v}</span>} />
            <Bar dataKey={usernameA} fill="#6366f1" radius={[4, 4, 0, 0]} />
            <Bar dataKey={usernameB} fill="#8b5cf6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const Placeholder = ({ label }) => (
  <div className="flex-1 min-w-0 rounded-2xl border-2 border-dashed
    border-gray-200 dark:border-gray-800 flex items-center justify-center
    h-40 text-gray-400 dark:text-gray-700 text-sm">
    {label}
  </div>
);

const UserColumn = ({ result, label }) => {
  const { data, loading, error } = result;
  if (loading) return <div className="flex-1 min-w-0"><ProfileSkeleton /></div>;
  if (error)
    return (
      <div className="flex-1 min-w-0 rounded-2xl border border-red-200 dark:border-red-900/40
        bg-red-50 dark:bg-red-900/10 p-4 text-center">
        <p className="text-red-500 text-sm">{error === 'rate_limit' ? 'Лимит исчерпан' : error}</p>
      </div>
    );
  if (!data) return <Placeholder label={label} />;
  return <div className="flex-1 min-w-0"><ProfileCard user={data.user} /></div>;
};

const Compare = () => {
  const [usernameA, setUsernameA] = useState('');
  const [usernameB, setUsernameB] = useState('');

  const resultA = useGitHubUser(usernameA);
  const resultB = useGitHubUser(usernameB);

  const bothLoaded = resultA.data && resultB.data;

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
        <MiniSearch label="Первый пользователь (напр. torvalds)" onSearch={setUsernameA} />
        <MiniSearch label="Второй пользователь (напр. gaearon)" onSearch={setUsernameB} />
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <UserColumn result={resultA} label="Введи первый профиль" />
        <UserColumn result={resultB} label="Введи второй профиль" />
      </div>

      {bothLoaded && (
        <CompareBar
          dataA={resultA.data}
          dataB={resultB.data}
          usernameA={usernameA}
          usernameB={usernameB}
        />
      )}
    </div>
  );
};

export default Compare;
