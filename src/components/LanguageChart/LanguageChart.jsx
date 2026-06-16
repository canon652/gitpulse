import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { getLanguageColor } from '../../utils/languageColors';

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const { name, value } = payload[0].payload;
  return (
    <div className="px-3 py-2 rounded-lg bg-white dark:bg-[#161b22]
      border border-gray-200 dark:border-gray-700 text-sm shadow-lg">
      <span className="font-medium dark:text-white">{name}</span>
      <span className="text-gray-500 dark:text-gray-400 ml-2">{value} репо</span>
    </div>
  );
};

const LanguageChart = ({ languages }) => {
  if (!languages.length)
    return (
      <p className="text-gray-500 dark:text-gray-600 text-sm text-center py-8">
        Нет данных о языках
      </p>
    );

  const top = languages.slice(0, 7);

  return (
    <div className="p-6 rounded-2xl bg-white dark:bg-[#161b22]
      border border-gray-200 dark:border-gray-800 mb-4">
      <h3 className="text-sm uppercase tracking-widest text-gray-500 dark:text-gray-600 mb-4">
        Языки программирования
      </h3>
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={top}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            innerRadius={50}
            paddingAngle={2}
          >
            {top.map((entry) => (
              <Cell key={entry.name} fill={getLanguageColor(entry.name)} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            formatter={(value) => (
              <span className="text-sm text-gray-700 dark:text-gray-300">{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LanguageChart;
