import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
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

// Custom Logo Component - README and Code Icon
const RepoHealthLogo = () => (
  <svg 
    width="28" 
    height="28" 
    viewBox="0 0 32 32" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className="w-7 h-7"
  >
    {/* Document/README outline */}
    <rect 
      x="6" 
      y="4" 
      width="20" 
      height="24" 
      rx="2" 
      stroke="white" 
      strokeWidth="2.5" 
      fill="none"
    />
    {/* Document lines representing README text */}
    <line x1="10" y1="10" x2="22" y2="10" stroke="white" strokeWidth="2" strokeLinecap="round" />
    <line x1="10" y1="15" x2="22" y2="15" stroke="white" strokeWidth="2" strokeLinecap="round" />
    
    {/* Code brackets </> inside the document */}
    <path 
      d="M 12 20 L 10 22 L 12 24" 
      stroke="white" 
      strokeWidth="2.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      fill="none"
    />
    <path 
      d="M 20 20 L 22 22 L 20 24" 
      stroke="white" 
      strokeWidth="2.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

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
      <header className="border-b border-white/5 dark:border-white/5 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Left side - Logo (clickable) */}
            <button 
              onClick={() => window.location.reload()} 
              className="flex items-center gap-3 hover:opacity-80 transition-opacity cursor-pointer"
            >
              <div className="relative p-1 bg-primary-500 rounded-lg shadow-lg">
                <RepoHealthLogo />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
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
        <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
          {!data && !loading && !error && (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
              <div className="text-center mb-12 animate-fade-in">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-primary-600 dark:text-primary-500 tracking-tight">
                Analyze Your Repository
              </h2>
              <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto font-normal">
                Get instant insights into your GitHub repository's health with AI-powered suggestions
              </p>
            </div>
            <SearchBar onSearch={handleSearch} loading={loading} />
          </div>
        )}

        {loading && <LoadingSkeleton />}

        {error && <ErrorDisplay error={error} onRetry={handleRetry} onBack={handleReset} />}

        {data && !loading && !error && (
          <div className="space-y-5">
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
