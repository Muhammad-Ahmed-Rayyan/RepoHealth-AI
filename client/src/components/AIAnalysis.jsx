import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { 
  Sparkles, 
  TrendingUp, 
  AlertTriangle,
  FileText,
  Shield,
  Users,
  Wrench,
  CheckCircle2,
  RefreshCw,
  Loader2
} from 'lucide-react';
import { generateAIInsights } from '../utils/api';

const categoryIcons = {
  'Documentation': FileText,
  'Maintenance': Wrench,
  'Community': Users,
  'Testing': CheckCircle2,
  'Security': Shield,
  'Quality': TrendingUp
};

const getPriorityColor = (priority) => {
  switch (priority?.toLowerCase()) {
    case 'high': 
      return 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 border-red-300 dark:border-red-800';
    case 'medium': 
      return 'bg-amber-100 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 border-amber-300 dark:border-amber-800';
    case 'low': 
      return 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border-blue-300 dark:border-blue-800';
    default: 
      return 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-400 border-slate-300 dark:border-slate-700';
  }
};

const SuggestionCard = ({ suggestion, index }) => {
  const Icon = categoryIcons[suggestion.category] || AlertTriangle;
  
  // Get priority-based left border color
  const getBorderColor = () => {
    switch (suggestion.priority?.toLowerCase()) {
      case 'high': 
        return 'border-l-4 border-l-rose-500';
      case 'medium': 
        return 'border-l-4 border-l-amber-500';
      case 'low': 
        return 'border-l-4 border-l-blue-500';
      default: 
        return 'border-l-4 border-l-slate-500';
    }
  };
  
  return (
    <div 
      className={`bg-gradient-to-br from-slate-50 to-white dark:from-slate-700/50 dark:to-slate-700/30 border border-white/5 dark:border-white/5 rounded-2xl p-5 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 animate-slide-up shadow-lg ${getBorderColor()}`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex items-start gap-4">
        <div className="p-2 bg-white/5 dark:bg-white/5 rounded-lg flex-shrink-0">
          <Icon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <div className="markdown-content">
              <ReactMarkdown className="text-slate-900 dark:text-slate-100 font-bold text-lg inline tracking-tight">
                {suggestion.title}
              </ReactMarkdown>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getPriorityColor(suggestion.priority)}`}>
              {suggestion.priority}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700">
              {suggestion.category}
            </span>
          </div>
          <div className="markdown-content text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            <ReactMarkdown>{suggestion.description}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
};

const LoadingState = () => (
  <div className="animate-pulse space-y-4">
    <div className="flex items-center justify-center py-8">
      <Loader2 className="w-12 h-12 text-primary-500 dark:text-primary-400 animate-spin" />
    </div>
    <div className="text-center">
      <p className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
        AI is Analyzing Your Repository...
      </p>
      <p className="text-sm text-slate-600 dark:text-slate-400">
        This may take 10-20 seconds. Please wait.
      </p>
    </div>
    <div className="space-y-3 mt-8">
      <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mx-auto"></div>
      <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-5/6 mx-auto"></div>
      <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-2/3 mx-auto"></div>
    </div>
  </div>
);

export default function AIAnalysis({ repositoryData, repoUrl }) {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerateInsights = async () => {
    setLoading(true);
    setError(null);
    
    console.log('🔍 Generating AI insights...');
    console.log('📦 Repository Data:', repositoryData);
    console.log('🏥 Has _rawData:', !!repositoryData?._rawData);
    
    try {
      // Use the raw data if available, otherwise use the whole repositoryData
      const dataToSend = repositoryData?._rawData || repositoryData;
      console.log('📤 Sending data to AI:', dataToSend);
      
      const result = await generateAIInsights(repoUrl, dataToSend);
      setAnalysis(result);
      console.log('✅ AI insights generated successfully');
    } catch (err) {
      console.error('❌ AI generation failed:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegenerate = () => {
    setAnalysis(null);
    handleGenerateInsights();
  };

  return (
    <div className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-800/60 border border-white/5 dark:border-white/5 rounded-2xl p-8 animate-fade-in shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-primary-500 rounded-xl shadow-lg">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">AI-Powered Insights</h2>
      </div>

      {/* Initial State - Show Generate Button */}
      {!analysis && !loading && !error && (
        <div className="text-center py-12 border border-dashed border-white/10 dark:border-white/10 rounded-xl">
          <div className="mb-6">
            <div className="inline-flex p-4 bg-primary-100 dark:bg-primary-900/20 rounded-full mb-4">
              <Sparkles className="w-12 h-12 text-primary-600 dark:text-primary-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2 tracking-tight">
              Get AI-Powered Recommendations
            </h3>
            <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto mb-6 font-normal">
              Let our AI analyze this repository and provide personalized insights, strengths, and actionable improvement suggestions.
            </p>
          </div>
          <button
            onClick={handleGenerateInsights}
            className="inline-flex items-center gap-3 px-6 md:px-8 py-3 md:py-4 bg-primary-500 hover:bg-primary-600 text-white rounded-xl font-bold text-base md:text-lg transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 transform tracking-tight"
          >
            <Sparkles className="w-5 h-5 md:w-6 md:h-6" />
            <span className="whitespace-nowrap">Generate AI Insights</span>
          </button>
          <p className="text-xs text-slate-500 dark:text-slate-500 mt-4 font-medium">
            Powered by advanced AI • Takes 10-20 seconds
          </p>
        </div>
      )}

      {/* Loading State */}
      {loading && <LoadingState />}

      {/* Error State */}
      {error && !loading && (
        <div className="text-center py-8">
          <div className="inline-flex p-4 bg-red-100 dark:bg-red-900/20 rounded-full mb-4">
            <AlertTriangle className="w-12 h-12 text-red-600 dark:text-red-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
            Failed to Generate AI Insights
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-6">{error}</p>
          <button
            onClick={handleGenerateInsights}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>
        </div>
      )}

      {/* Success State - Display AI Analysis */}
      {analysis && !loading && (
        <div>
          {/* Summary */}
          <div className="mb-8 p-6 bg-primary-50 dark:bg-primary-900/10 rounded-lg border border-primary-200 dark:border-primary-800">
            <div className="markdown-content text-slate-700 dark:text-slate-200 text-lg leading-relaxed font-normal">
              <ReactMarkdown>{analysis.summary}</ReactMarkdown>
            </div>
          </div>

          {/* Strengths */}
          {analysis.strengths && analysis.strengths.length > 0 && (
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">Strengths</h3>
              </div>
              <div className="space-y-3">
                {analysis.strengths.map((strength, index) => (
                  <div 
                    key={index}
                    className="flex items-start gap-3 p-4 bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-200 dark:border-emerald-800 rounded-lg animate-slide-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div className="markdown-content text-slate-700 dark:text-slate-200 font-normal">
                      <ReactMarkdown>{strength}</ReactMarkdown>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Improvement Suggestions */}
          {analysis.suggestions && analysis.suggestions.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">Improvement Suggestions</h3>
              </div>
              <div className="space-y-4">
                {analysis.suggestions.map((suggestion, index) => (
                  <SuggestionCard key={index} suggestion={suggestion} index={index} />
                ))}
              </div>
            </div>
          )}

          {/* Regenerate Button */}
          <div className="text-center pt-6 border-t border-slate-200 dark:border-slate-700">
            <button
              onClick={handleRegenerate}
              className="inline-flex items-center gap-2 px-6 py-3 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md font-semibold"
            >
              <RefreshCw className="w-4 h-4" />
              Regenerate AI Analysis
            </button>
            <p className="text-xs text-slate-500 dark:text-slate-500 mt-2 font-medium">
              Get fresh insights with updated AI analysis
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
