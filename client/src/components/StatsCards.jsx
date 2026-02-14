import React from 'react';
import { 
  Star, 
  GitFork, 
  AlertCircle, 
  CheckCircle, 
  Users, 
  Calendar,
  Code,
  Eye 
} from 'lucide-react';

const StatCard = ({ icon: Icon, label, value, delay }) => {
  return (
    <div 
      className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 hover:border-primary-300 dark:hover:border-primary-700 hover:shadow-md transition-all duration-200 animate-slide-up shadow-sm"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900/30 dark:to-primary-800/30 rounded-lg">
          <Icon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
        </div>
        <span className="text-slate-500 dark:text-slate-400 text-sm font-semibold">{label}</span>
      </div>
      <div className="text-2xl font-bold text-slate-900 dark:text-slate-100 ml-11 tracking-tight">
        {value !== null && value !== undefined ? value.toLocaleString() : 'N/A'}
      </div>
    </div>
  );
};

export default function StatsCards({ stats }) {
  const formatDate = (dateStr) => {
    if (!dateStr) return 'Unknown';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const statsData = [
    { icon: Star, label: 'Stars', value: stats.stars },
    { icon: GitFork, label: 'Forks', value: stats.forks },
    { icon: AlertCircle, label: 'Open Issues', value: stats.openIssues },
    { icon: CheckCircle, label: 'Closed Issues', value: stats.closedIssues },
    { icon: Users, label: 'Contributors', value: stats.contributors },
    { icon: Calendar, label: 'Last Commit', value: formatDate(stats.lastCommit) },
    { icon: Code, label: 'Language', value: stats.language || 'Unknown' },
    { icon: Eye, label: 'Watchers', value: stats.watchers },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {statsData.map((stat, index) => (
        <StatCard 
          key={stat.label} 
          {...stat} 
          delay={index * 50}
        />
      ))}
    </div>
  );
}
