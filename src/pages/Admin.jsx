import React, { useState } from 'react';
import { useCMS } from '../hooks/useCMS';
import {
  GeneralEditor,
  NavLinksEditor,
  HeroEditor,
  AboutEditor,
  ServicesEditor,
  ContactEditor,
} from '../admin/SettingsPanels';
import {
  Sliders,
  Link2,
  Image as ImageIcon,
  Info,
  Briefcase,
  PhoneCall,
  Save,
  RotateCcw,
  CheckCircle,
  Lock,
  LogOut,
  AlertCircle,
} from 'lucide-react';

export default function Admin() {
  const { content, updateContent, resetToDefault } = useCMS();
  
  // Local state to store edits before clicking save
  const [localContent, setLocalContent] = useState(content);
  const [activeTab, setActiveTab] = useState('general');
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);
  const [showResetSuccess, setShowResetSuccess] = useState(false);

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('admin_authenticated') === 'true';
  });
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    const correctPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'admin123';
    
    if (passwordInput === correctPassword) {
      setIsAuthenticated(true);
      sessionStorage.setItem('admin_authenticated', 'true');
      setAuthError('');
    } else {
      setAuthError('Incorrect password. Please try again.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('admin_authenticated');
    setPasswordInput('');
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateContent(localContent);
    setShowSaveSuccess(true);
    setTimeout(() => setShowSaveSuccess(false), 3000);
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all content to site defaults? This will erase current customizations.')) {
      resetToDefault();
      import('../data/defaultContent.json').then((module) => {
        setLocalContent(module.default);
        setShowResetSuccess(true);
        setTimeout(() => setShowResetSuccess(false), 3000);
      });
    }
  };

  const tabs = [
    { id: 'general', label: 'General & Footer', icon: Sliders },
    { id: 'navLinks', label: 'Navbar Links', icon: Link2 },
    { id: 'hero', label: 'Hero Section', icon: ImageIcon },
    { id: 'about', label: 'About Page', icon: Info },
    { id: 'services', label: 'Services List', icon: Briefcase },
    { id: 'contact', label: 'Contact Info', icon: PhoneCall },
  ];

  const renderActiveEditor = () => {
    switch (activeTab) {
      case 'general':
        return <GeneralEditor data={localContent} onChange={setLocalContent} />;
      case 'navLinks':
        return <NavLinksEditor data={localContent} onChange={setLocalContent} />;
      case 'hero':
        return <HeroEditor data={localContent} onChange={setLocalContent} />;
      case 'about':
        return <AboutEditor data={localContent} onChange={setLocalContent} />;
      case 'services':
        return <ServicesEditor data={localContent} onChange={setLocalContent} />;
      case 'contact':
        return <ContactEditor data={localContent} onChange={setLocalContent} />;
      default:
        return null;
    }
  };

  // Render Login Screen if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 sm:py-24">
        <div className="bg-white border border-slate-200/80 rounded-2xl p-8 shadow-sm space-y-8">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-indigo-50 text-indigo-600 mb-2">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Admin Login Gate
            </h1>
            <p className="text-sm text-slate-500">
              Access is restricted. Please enter the administrator password.
            </p>
          </div>

          {authError && (
            <div className="p-4 rounded-lg bg-rose-50 border border-rose-100 flex items-start gap-2.5 text-xs text-rose-800 font-medium">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="admin_pass" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <input
                type="password"
                id="admin_pass"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all duration-200"
                required
                autoFocus
              />
            </div>

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 border border-transparent text-sm font-semibold rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm transition-colors duration-200"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Render CMS Dashboard if authenticated
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16 space-y-12">
      {/* Title */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="max-w-3xl space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
            CMS Control Panel
          </span>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
            Admin Dashboard
          </h1>
          <p className="text-sm text-slate-600">
            Configure site content details in real-time. Changes are immediately synced.
          </p>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="inline-flex items-center gap-1.5 px-3 py-2 border border-slate-250 rounded-lg text-xs font-semibold text-slate-600 bg-white hover:bg-slate-50 hover:text-slate-900 transition-colors duration-150 shadow-sm"
        >
          <LogOut className="w-3.5 h-3.5" />
          Sign Out
        </button>
      </div>

      {/* Form notifications */}
      <div className="space-y-4">
        {showSaveSuccess && (
          <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center gap-3 text-sm text-emerald-800 font-medium">
            <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
            Changes saved successfully! All page sections have updated.
          </div>
        )}
        {showResetSuccess && (
          <div className="p-4 rounded-lg bg-amber-50 border border-amber-100 flex items-center gap-3 text-sm text-amber-800 font-medium">
            <CheckCircle className="w-5 h-5 text-amber-600 shrink-0" />
            Content reset to defaults.
          </div>
        )}
      </div>

      {/* Main Panel Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sidebar Nav */}
        <div className="lg:col-span-4 bg-white border border-slate-200/80 rounded-xl overflow-hidden shadow-sm">
          <div className="p-4 bg-slate-50 border-b border-slate-200/60">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Settings Category
            </h3>
          </div>
          <nav className="divide-y divide-slate-100">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 text-left text-sm font-medium transition-colors duration-150 ${
                    isSelected
                      ? 'text-indigo-600 bg-indigo-50/40'
                      : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-indigo-600' : 'text-slate-400'}`} />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Editor Screen & Action Buttons */}
        <div className="lg:col-span-8 space-y-6">
          <form onSubmit={handleSave} className="bg-white border border-slate-200/80 rounded-xl p-6 sm:p-8 shadow-sm space-y-8">
            <div className="min-h-[300px]">
              {renderActiveEditor()}
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-100">
              <button
                type="button"
                onClick={handleReset}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 transition-colors duration-150"
              >
                <RotateCcw className="w-4 h-4 text-slate-400" />
                Reset Defaults
              </button>

              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 border border-transparent rounded-lg text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm hover:shadow transition-all duration-150"
              >
                <Save className="w-4 h-4" />
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
