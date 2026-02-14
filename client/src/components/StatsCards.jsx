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
      className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-800/60 border border-white/5 dark:border-white/5 rounded-2xl p-6 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 animate-slide-up shadow-lg"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Mobile: centered, Desktop: left-aligned */}
      <div className="flex flex-col items-center md:items-start text-center md:text-left">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 rounded-lg bg-white/5 dark:bg-white/5">
            <Icon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
          </div>
        </div>
        <div className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-1 tracking-tight">
          {value !== null && value !== undefined ? value.toLocaleString() : 'N/A'}
        </div>
        <div className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">
          {label}
        </div>
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
