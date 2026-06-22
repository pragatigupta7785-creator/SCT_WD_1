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
} from 'lucide-react';

export default function Admin() {
  const { content, updateContent, resetToDefault } = useCMS();
  
  // Local state to store edits before clicking save
  const [localContent, setLocalContent] = useState(content);
  const [activeTab, setActiveTab] = useState('general');
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);
  const [showResetSuccess, setShowResetSuccess] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    updateContent(localContent);
    setShowSaveSuccess(true);
    setTimeout(() => setShowSaveSuccess(false), 3000);
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all content to site defaults? This will erase current customizations.')) {
      resetToDefault();
      // Reset local inputs to trigger re-renders
      // Wait, we can fetch default content. Since resetToDefault updates context,
      // we can reload/update localContent from the default JSON data.
      // Let's import defaultContent or just fetch it. To be safe, we can trigger reload:
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16 space-y-12">
      {/* Title */}
      <div className="max-w-3xl space-y-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
          CMS Control Panel
        </span>
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
          Admin Dashboard
        </h1>
        <p className="text-lg text-slate-600">
          Configure site content details in real-time. Changes are immediately synced to local storage and active pages.
        </p>
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
