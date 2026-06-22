import React from 'react';
import { useCMS } from '../hooks/useCMS';
import { Target, Users, BookOpen } from 'lucide-react';

export default function About() {
  const { content } = useCMS();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16 space-y-16">
      {/* Intro Header */}
      <div className="max-w-3xl space-y-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
          Who We Are
        </span>
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
          {content.about.title}
        </h1>
        <p className="text-xl text-slate-600 leading-relaxed font-light">
          {content.about.subtitle}
        </p>
      </div>

      {/* Main Philosophy Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-7 space-y-6">
          <p className="text-slate-600 leading-relaxed whitespace-pre-line text-base">
            {content.about.content}
          </p>
        </div>

        {/* Visual Highlights (Mock Card Grid) */}
        <div className="lg:col-span-5 bg-white border border-slate-200/80 rounded-xl p-8 shadow-sm space-y-6">
          <h3 className="text-lg font-bold text-slate-900 border-b pb-3 border-slate-100">
            Core Values
          </h3>

          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="shrink-0 w-8 h-8 rounded bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Target className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-900">Pixel Perfection</h4>
                <p className="text-xs text-slate-500 mt-1">
                  We verify alignments, test responsiveness, and enforce readable type scales across all viewports.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="shrink-0 w-8 h-8 rounded bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-900">User Centricity</h4>
                <p className="text-xs text-slate-500 mt-1">
                  Every transition, component, and animation is designed to improve accessibility and readability.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="shrink-0 w-8 h-8 rounded bg-amber-50 text-amber-600 flex items-center justify-center">
                <BookOpen className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-900">Clean Standards</h4>
                <p className="text-xs text-slate-500 mt-1">
                  We use standard libraries, standard React hooks, and standard Tailwind utilities to keep code maintainable.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
