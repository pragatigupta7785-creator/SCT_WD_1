import React, { createContext, useContext, useState, useEffect } from 'react';
import defaultContent from '../data/defaultContent.json';

const CMSContext = createContext(null);

const STORAGE_KEY = 'cms_website_content';

export const CMSProvider = ({ children }) => {
  const [content, setContent] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to parse CMS content from localStorage:', e);
    }
    return defaultContent;
  });

  const updateContent = (newContent) => {
    setContent(newContent);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newContent));
    } catch (e) {
      console.error('Failed to save CMS content to localStorage:', e);
    }
  };

  const resetToDefault = () => {
    updateContent(defaultContent);
  };

  return (
    <CMSContext.Provider value={{ content, updateContent, resetToDefault }}>
      {children}
    </CMSContext.Provider>
  );
};

export const useCMS = () => {
  const context = useContext(CMSContext);
  if (!context) {
    throw new Error('useCMS must be used within a CMSProvider');
  }
  return context;
};
