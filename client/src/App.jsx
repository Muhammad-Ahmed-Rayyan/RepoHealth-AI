import React, { useState } from 'react';
import { Github, Sparkles } from 'lucide-react';
import SearchBar from './components/SearchBar';
import LoadingSkeleton from './components/LoadingSkeleton';
import ErrorDisplay from './components/ErrorDisplay';
import HealthScore from './components/HealthScore';
import StatsCards from './components/StatsCards';
import Charts from './components/Charts';
import AIAnalysis from './components/AIAnalysis';
import ThemeToggle from './components/ThemeToggle';
import Footer from './components/Footer';
import { analyzeRepo } from './utils/api';

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [searchUrl, setSearchUrl] = useState('');

  const handleSearch = async (repoUrl) => {
    setLoading(true);
    setError(null);
    setData(null);
    setSearchUrl(repoUrl);

    try {
      // Note: AI analysis is no longer included in initial call
      // It will be triggered separately by user action
      const result = await analyzeRepo(repoUrl, false); // false = don't include AI
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    if (searchUrl) {
      handleSearch(searchUrl);
    }
  };

  // Reset function to go back to initial state
  const handleReset = () => {
    setData(null);
    setError(null);
    setLoading(false);
    setSearchUrl('');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <header className="border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Left side - Logo (clickable) */}
            <button 
              onClick={() => window.location.reload()} 
              className="flex items-center gap-3 hover:opacity-80 transition-opacity cursor-pointer"
            >
              <div className="p-2 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg shadow-lg">
                <Github className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 dark:from-primary-400 dark:to-accent-400 bg-clip-text text-transparent tracking-tight">
                  RepoHealth AI
                </h1>
              </div>
            </button>

            {/* Right side - Powered by AI text AND theme toggle */}
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 font-medium">
                <Sparkles className="w-4 h-4 text-accent-500" />
                <span>Powered by AI</span>
              </div>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full">
        <div className="max-w-7xl mx-auto px-4 py-12">
          {!data && !loading && !error && (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
              <div className="text-center mb-12 animate-fade-in">
              <h2 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-primary-600 via-primary-500 to-accent-500 dark:from-primary-400 dark:via-primary-300 dark:to-accent-400 bg-clip-text text-transparent tracking-tight">
                Analyze Your Repository
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto font-normal">
                Get instant insights into your GitHub repository's health with AI-powered suggestions
              </p>
            </div>
            <SearchBar onSearch={handleSearch} loading={loading} />
          </div>
        )}

        {loading && <LoadingSkeleton />}

        {error && <ErrorDisplay error={error} onRetry={handleRetry} onBack={handleReset} />}

        {data && !loading && !error && (
          <div className="space-y-8">
            {/* Repository Info */}
            <div className="text-center animate-fade-in">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                {data.repository.name}
              </h2>
              <p className="text-slate-600 dark:text-slate-300 mb-4">{data.repository.description}</p>
              <a
                href={data.repository.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm hover:underline"
              >
                {data.repository.url}
              </a>
            </div>

            {/* New Search */}
            <div className="flex justify-center">
              <SearchBar onSearch={handleSearch} loading={loading} />
            </div>

            {/* Health Score */}
            <HealthScore 
              score={data.healthScore.total} 
              grade={data.healthScore.grade}
            />

            {/* Stats Cards */}
            <StatsCards stats={data.stats} />

            {/* Charts */}
            <Charts charts={data.charts} />

            {/* AI Analysis - Now with manual trigger */}
            <AIAnalysis 
              repositoryData={data}
              repoUrl={searchUrl}
            />
          </div>
        )}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
