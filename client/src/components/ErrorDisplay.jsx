import React from 'react';
import { AlertCircle, RefreshCw, ArrowLeft } from 'lucide-react';

export default function ErrorDisplay({ error, onRetry, onBack }) {
  return (
    <div className="w-full max-w-2xl mx-auto px-4 animate-fade-in">
      <div className="bg-white dark:bg-slate-800 border border-red-200 dark:border-red-900/30 rounded-xl p-8 text-center shadow-lg">
        <div className="flex justify-center mb-4">
          <div className="p-4 bg-red-100 dark:bg-red-900/20 rounded-full">
            <AlertCircle className="w-12 h-12 text-red-600 dark:text-red-400" />
          </div>
        </div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2 tracking-tight">Analysis Failed</h3>
        <p className="text-slate-600 dark:text-slate-300 mb-6 font-normal">{error}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={onBack}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Search
          </button>
          <button
            onClick={onRetry}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white rounded-lg transition-all duration-200 shadow-md hover:shadow-lg font-semibold"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
}
