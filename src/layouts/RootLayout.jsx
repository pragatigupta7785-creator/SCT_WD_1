import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function RootLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 selection:bg-indigo-500 selection:text-white">
      {/* Fixed Sticky Header */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-grow pt-20 md:pt-24 pb-16">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
