import React from 'react';
import { Heart, Github } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 py-4 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4">
        {/* Desktop Layout */}
        <div className="hidden md:block">
          <div className="relative flex items-center justify-center">
            {/* Center - Made with love and copyright */}
            <p className="text-slate-600 dark:text-slate-400 text-sm flex items-center gap-2 font-medium">
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
              <span className="text-slate-400 dark:text-slate-600">|</span>
              <button 
                onClick={() => window.location.reload()} 
                className="font-bold text-slate-700 dark:text-slate-300 tracking-tight hover:text-primary-600 dark:hover:text-primary-400 transition-colors cursor-pointer"
              >
                RepoHealth AI © 2026
              </button>
            </p>

            {/* Right - GitHub Link (absolutely positioned) */}
            <a
              href="https://github.com/Muhammad-Ahmed-Rayyan/RepoHealth-AI"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute right-0 inline-flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              title="View on GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden">
          <div className="flex flex-col items-center gap-3 text-center">
            {/* Made with love */}
            <p className="text-slate-600 dark:text-slate-400 text-xs flex items-center gap-1.5 font-medium flex-wrap justify-center">
              Made with 
              <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 animate-pulse" />
              by
              <a
                href="https://github.com/Muhammad-Ahmed-Rayyan"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-all duration-200"
              >
                Muhammad Ahmed Rayyan
              </a>
            </p>

            {/* Copyright and GitHub */}
            <div className="flex items-center gap-3">
              <button 
                onClick={() => window.location.reload()} 
                className="font-bold text-slate-700 dark:text-slate-300 tracking-tight hover:text-primary-600 dark:hover:text-primary-400 transition-colors cursor-pointer text-xs"
              >
                RepoHealth AI © 2026
              </button>
              <span className="text-slate-400 dark:text-slate-600">|</span>
              <a
                href="https://github.com/Muhammad-Ahmed-Rayyan/RepoHealth-AI"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-slate-700 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                title="View on GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
