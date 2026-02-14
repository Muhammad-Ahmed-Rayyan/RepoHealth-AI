import React from 'react';
import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 py-4 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center">
          <p className="text-slate-600 dark:text-slate-400 text-sm flex items-center justify-center gap-2 flex-wrap font-medium">
            <button 
              onClick={() => window.location.reload()} 
              className="font-bold text-slate-700 dark:text-slate-300 tracking-tight hover:text-primary-600 dark:hover:text-primary-400 transition-colors cursor-pointer"
            >
              RepoHealth AI © 2026
            </button>
            <span className="text-slate-400 dark:text-slate-600">|</span>
            <span className="flex items-center gap-2">
              Made with 
              <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
              by
              <a
                href="https://github.com/Muhammad-Ahmed-Rayyan"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-all duration-200 hover:underline decoration-2 underline-offset-2"
              >
                Muhammad Ahmed Rayyan
              </a>
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
