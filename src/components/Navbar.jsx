import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, Settings } from 'lucide-react';
import { useCMS } from '../hooks/useCMS';

export default function Navbar() {
  const { content } = useCMS();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        scrolled
          ? 'bg-white/95 shadow-sm py-3 border-slate-200/80 backdrop-blur-md'
          : 'bg-white/85 shadow-none py-5 border-transparent backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo / Title */}
          <Link
            to="/"
            onClick={closeMobileMenu}
            className="text-xl font-bold tracking-tight text-slate-900 hover:text-indigo-600 transition-colors duration-200"
          >
            {content.siteTitle}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {content.navLinks.map((link, idx) => (
              <NavLink
                key={idx}
                to={link.path}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors duration-300 nav-link-underline py-1 ${
                    isActive
                      ? 'text-indigo-600 nav-link-active'
                      : 'text-slate-600 hover:text-indigo-600'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Link
              to="/admin"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors duration-200"
            >
              <Settings className="w-3.5 h-3.5" />
              Admin
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-4 md:hidden">
            <Link
              to="/admin"
              onClick={closeMobileMenu}
              className="p-1.5 text-slate-500 hover:text-indigo-600 transition-colors duration-200"
              aria-label="Admin Dashboard"
            >
              <Settings className="w-5 h-5" />
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-slate-600 hover:text-indigo-600 hover:bg-slate-100 focus:outline-none transition-colors duration-200"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out border-slate-200 bg-white ${
          mobileMenuOpen ? 'max-h-64 border-t mt-3 py-4' : 'max-h-0 border-t-0 py-0'
        }`}
      >
        <div className="px-4 space-y-3">
          {content.navLinks.map((link, idx) => (
            <NavLink
              key={idx}
              to={link.path}
              onClick={closeMobileMenu}
              className={({ isActive }) =>
                `block text-base font-medium py-2 px-3 rounded-md transition-colors duration-200 ${
                  isActive
                    ? 'text-indigo-600 bg-indigo-50/50 font-semibold'
                    : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-50'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}
