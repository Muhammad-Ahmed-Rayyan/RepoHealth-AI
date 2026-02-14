import React from 'react';

export default function LoadingSkeleton() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 animate-fade-in">
      {/* Health Score Skeleton */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-8 mb-8 animate-pulse shadow-sm">
        <div className="flex items-center justify-center">
          <div className="w-48 h-48 rounded-full bg-slate-200 dark:bg-slate-700"></div>
        </div>
      </div>

      {/* Stats Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 animate-pulse shadow-sm">
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-20 mb-3"></div>
            <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-24"></div>
          </div>
        ))}
      </div>

      {/* Charts Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 animate-pulse shadow-sm">
            <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-40 mb-4"></div>
            <div className="h-64 bg-slate-200 dark:bg-slate-700 rounded"></div>
          </div>
        ))}
      </div>

      {/* AI Analysis Skeleton */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-8 animate-pulse shadow-sm">
        <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-48 mb-6"></div>
        <div className="space-y-3">
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full"></div>
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-5/6"></div>
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-4/6"></div>
        </div>
      </div>
    </div>
  );
}
