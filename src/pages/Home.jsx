import React from 'react';
import { Link } from 'react-router-dom';
import { useCMS } from '../hooks/useCMS';
import { ArrowRight, Laptop, Shield, Sparkles } from 'lucide-react';

export default function Home() {
  const { content } = useCMS();

  return (
    <div className="space-y-20 md:space-y-28">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-8 max-w-4xl mx-auto py-12 md:py-20">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100">
            <Sparkles className="w-3.5 h-3.5" />
            Empowering Modern Businesses
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {content.hero.title}
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
            {content.hero.subtitle}
          </p>
          <div className="pt-4 flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link
              to={content.hero.ctaLink}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-transparent text-base font-semibold rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm hover:shadow transition-all duration-200"
            >
              {content.hero.ctaText}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/about"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 border border-slate-200 text-base font-semibold rounded-lg text-slate-700 bg-white hover:bg-slate-50 hover:border-slate-300 transition-colors duration-200"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="bg-white py-20 border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
              Designed For Humans, Engineered For Results
            </h2>
            <p className="text-slate-600">
              We skip the flashy, bloated gimmicks and deliver clean, responsive digital solutions that drive authentic growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-md transition-all duration-300 space-y-4">
              <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Laptop className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">Developer-First Craft</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Hand-coded React templates build system using Vite to guarantee fast load times, semantic accessibility, and clean markup.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-md transition-all duration-300 space-y-4">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">Production-Ready Code</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Thoroughly modular CSS, flexible responsive grids, and standard React patterns built with beginner developer readability in mind.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-md transition-all duration-300 space-y-4">
              <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">Instant Dynamic Editing</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Includes our built-in lightweight local CMS panel, enabling instant updates to titles, sections, lists, and footer data.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="bg-slate-900 text-white rounded-2xl p-8 md:p-12 shadow-xl border border-slate-800 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="space-y-4 max-w-xl text-center md:text-left">
            <h3 className="text-2xl md:text-3xl font-bold tracking-tight">
              Ready to explore our solutions?
            </h3>
            <p className="text-slate-400 text-sm md:text-base">
              Take a look at the comprehensive services we offer, dynamically managed and fine-tuned for modern browser standards.
            </p>
          </div>
          <Link
            to="/services"
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3 border border-transparent text-base font-semibold rounded-lg text-slate-900 bg-white hover:bg-slate-100 transition-colors duration-200"
          >
            Explore Services
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
