import React from 'react';

export default function HealthScore({ score, grade }) {
  const [displayScore, setDisplayScore] = React.useState(0);

  // Animate the score counting up
  React.useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = score / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      setDisplayScore(Math.min(Math.round(increment * currentStep), score));
      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [score]);

  // Color based on score
  const getColor = () => {
    if (score >= 80) return 'text-emerald-600 dark:text-emerald-400';
    if (score >= 50) return 'text-amber-600 dark:text-amber-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getStrokeColor = () => {
    if (score >= 80) return '#10b981';
    if (score >= 50) return '#f59e0b';
    return '#ef4444';
  };

  const circumference = 2 * Math.PI * 90;
  const strokeDashoffset = circumference - (displayScore / 100) * circumference;

  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-8 text-center animate-scale-in shadow-sm">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6 tracking-tight">Repository Health Score</h2>
      
      <div className="relative inline-flex items-center justify-center">
        {/* Background circle */}
        <svg className="w-56 h-56 transform -rotate-90">
          <circle
            cx="112"
            cy="112"
            r="90"
            stroke="currentColor"
            className="text-slate-200 dark:text-slate-700"
            strokeWidth="12"
            fill="none"
          />
          {/* Progress circle */}
          <circle
            cx="112"
            cy="112"
            r="90"
            stroke={getStrokeColor()}
            strokeWidth="12"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        
        {/* Score text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-6xl font-extrabold ${getColor()} tracking-tight`}>
            {displayScore}
          </span>
          <span className="text-slate-400 dark:text-slate-500 text-sm mt-1 font-medium">/ 100</span>
        </div>
      </div>

      <div className="mt-6">
        <div className={`text-2xl font-semibold ${getColor()} mb-1`}>
          {grade.letter}
        </div>
        <div className="text-slate-600 dark:text-slate-300 text-lg">
          {grade.description}
        </div>
      </div>
    </div>
  );
}
