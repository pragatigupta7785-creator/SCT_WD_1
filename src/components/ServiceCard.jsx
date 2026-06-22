import React from 'react';
import * as Icons from 'lucide-react';

export default function ServiceCard({ title, description, iconName }) {
  // Dynamically resolve icon component by string name
  const IconComponent = Icons[iconName] || Icons.HelpCircle;

  return (
    <div className="bg-white border border-slate-200/80 rounded-xl p-8 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300 flex flex-col justify-between">
      <div className="space-y-4">
        <div className="w-12 h-12 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
          <IconComponent className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-semibold text-slate-900 tracking-tight">
          {title}
        </h3>
        <p className="text-sm text-slate-600 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
