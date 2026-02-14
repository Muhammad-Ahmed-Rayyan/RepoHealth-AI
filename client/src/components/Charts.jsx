import React from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { useTheme } from '../context/ThemeContext';

// Theme-aware colors for other charts
const LIGHT_COLORS = ['#0d9488', '#f59e0b', '#ec4899', '#8b5cf6', '#3b82f6', '#06b6d4', '#10b981'];
const DARK_COLORS = ['#14b8a6', '#fbbf24', '#f472b6', '#a78bfa', '#60a5fa', '#22d3ee', '#34d399'];

// Standard programming language colors (based on GitHub's language colors)
const LANGUAGE_COLORS = {
  'JavaScript': '#f1e05a',
  'TypeScript': '#3178c6',
  'Python': '#3572A5',
  'Java': '#b07219',
  'C++': '#f34b7d',
  'C': '#555555',
  'C#': '#178600',
  'PHP': '#4F5D95',
  'Ruby': '#701516',
  'Go': '#00ADD8',
  'Rust': '#dea584',
  'Swift': '#ffac45',
  'Kotlin': '#A97BFF',
  'Dart': '#00B4AB',
  'HTML': '#e34c26',
  'CSS': '#563d7c',
  'SCSS': '#c6538c',
  'Sass': '#a53b70',
  'Shell': '#89e051',
  'Vue': '#41b883',
  'React': '#61dafb',
  'Objective-C': '#438eff',
  'Perl': '#0298c3',
  'Scala': '#c22d40',
  'R': '#198CE7',
  'Haskell': '#5e5086',
  'Lua': '#000080',
  'Clojure': '#db5855',
  'Elixir': '#6e4a7e',
  'Elm': '#60B5CC',
  'Default': '#8884d8'
};

// Function to get color for a language
const getLanguageColor = (languageName) => {
  return LANGUAGE_COLORS[languageName] || LANGUAGE_COLORS['Default'];
};

const ChartCard = ({ title, children }) => (
  <div className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-800/60 border border-white/5 dark:border-white/5 rounded-2xl p-6 animate-slide-up shadow-lg">
    <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-4 pb-4 border-b border-white/5 dark:border-white/5">{title}</h3>
    <div className="h-64">
      {children}
    </div>
  </div>
);

export default function Charts({ charts }) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const COLORS = isDark ? DARK_COLORS : LIGHT_COLORS;

  // Prepare data for charts
  const commitData = charts.commitActivity || [];
  
  const languageData = (charts.languages || []).map((lang, index) => ({
    name: lang.name,
    value: parseFloat(lang.percentage),
    color: COLORS[index % COLORS.length]
  }));

  const contributorData = (charts.topContributors || [])
    .slice(0, 10)
    .sort((a, b) => b.contributions - a.contributions);

  const issuesData = [
    { name: 'Open', value: charts.issues?.open || 0, color: isDark ? '#f87171' : '#ef4444' },
    { name: 'Closed', value: charts.issues?.closed || 0, color: isDark ? '#34d399' : '#10b981' }
  ];

  // Theme-aware chart colors
  const gridColor = isDark ? '#334155' : '#e2e8f0';
  const textColor = isDark ? '#94a3b8' : '#64748b';
  const tooltipBg = isDark ? '#1e293b' : '#ffffff';
  const tooltipBorder = isDark ? '#334155' : '#e2e8f0';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Commit Activity */}
      <ChartCard title="Commit Activity (Last 30 Days)">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={commitData}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
            <XAxis 
              dataKey="date" 
              stroke={textColor}
              tick={{ fill: textColor, fontSize: 12 }}
              tickFormatter={(value) => {
                const date = new Date(value);
                return `${date.getMonth() + 1}/${date.getDate()}`;
              }}
            />
            <YAxis 
              stroke={textColor}
              tick={{ fill: textColor, fontSize: 12 }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: isDark ? 'rgb(31 41 55)' : '#ffffff', 
                border: `1px solid ${isDark ? 'rgb(75 85 99)' : '#e2e8f0'}`,
                borderRadius: '8px',
                color: isDark ? '#ffffff' : '#000000'
              }}
              itemStyle={{ 
                color: isDark ? '#ffffff' : '#000000'
              }}
              labelStyle={{ 
                color: isDark ? '#ffffff' : '#000000'
              }}
            />
            <Line
              type="monotone" 
              dataKey="commits" 
              stroke={COLORS[0]} 
              strokeWidth={2}
              dot={{ fill: COLORS[0], r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Language Breakdown */}
      <ChartCard title="Language Breakdown">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={languageData}
              cx="50%"
              cy="42%"
              outerRadius={85}
              fill="#8884d8"
              dataKey="value"
              label={false}
              stroke="none"
            >
              {languageData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getLanguageColor(entry.name)} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: isDark ? 'rgb(31 41 55)' : '#ffffff', 
                border: `1px solid ${isDark ? 'rgb(75 85 99)' : '#e2e8f0'}`,
                borderRadius: '8px',
                color: isDark ? '#ffffff' : '#000000'
              }}
              itemStyle={{ 
                color: isDark ? '#ffffff' : '#000000'
              }}
              labelStyle={{ 
                color: isDark ? '#ffffff' : '#000000'
              }}
              formatter={(value) => `${value}%`}
            />
            <Legend 
              verticalAlign="bottom" 
              height={50}
              iconType="square"
              wrapperStyle={{ 
                paddingTop: '24px',
                paddingBottom: '12px',
                color: textColor,
                fontSize: '12px',
                maxWidth: '100%'
              }}
              formatter={(value, entry) => {
                // Truncate long language names on mobile
                const maxLength = 15;
                const displayName = value.length > maxLength ? value.substring(0, maxLength) + '...' : value;
                return `${displayName}: ${entry.payload.value}%`;
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Top Contributors */}
      <ChartCard title="Top Contributors">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={contributorData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
            <XAxis 
              type="number" 
              stroke={textColor}
              tick={{ fill: textColor, fontSize: 12 }}
            />
            <YAxis 
              type="category" 
              dataKey="login" 
              stroke={textColor}
              tick={{ fill: textColor, fontSize: 12 }}
              width={100}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: isDark ? 'rgb(31 41 55)' : '#ffffff', 
                border: `1px solid ${isDark ? 'rgb(75 85 99)' : '#e2e8f0'}`,
                borderRadius: '8px',
                color: isDark ? '#ffffff' : '#000000'
              }}
              itemStyle={{ 
                color: isDark ? '#ffffff' : '#000000'
              }}
              labelStyle={{ 
                color: isDark ? '#ffffff' : '#000000'
              }}
            />
            <Bar dataKey="contributions" fill={COLORS[1]} radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Issues Overview */}
      <ChartCard title="Issues Overview">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={issuesData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value }) => `${name}: ${value}`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {issuesData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: isDark ? 'rgb(31 41 55)' : '#ffffff', 
                border: `1px solid ${isDark ? 'rgb(75 85 99)' : '#e2e8f0'}`,
                borderRadius: '8px',
                color: isDark ? '#ffffff' : '#000000'
              }}
              itemStyle={{ 
                color: isDark ? '#ffffff' : '#000000'
              }}
              labelStyle={{ 
                color: isDark ? '#ffffff' : '#000000'
              }}
            />
            <Legend 
              wrapperStyle={{ color: textColor }}
            />
          </PieChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  );
}
