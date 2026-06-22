import React from 'react';
import { useCMS } from '../hooks/useCMS';

export default function Footer() {
  const { content } = useCMS();

  return (
    <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <span className="text-lg font-bold text-white tracking-tight">
              {content.siteTitle}
            </span>
            <p className="mt-2 text-sm text-slate-400 max-w-md">
              Crafting lightweight, responsive, and performance-oriented websites for the modern web.
            </p>
          </div>
          <div className="text-center md:text-right">
            <p className="text-xs text-slate-500">
              {content.footerText}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
