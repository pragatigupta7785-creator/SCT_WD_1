import React from 'react';
import { useCMS } from '../hooks/useCMS';
import ServiceCard from '../components/ServiceCard';

export default function Services() {
  const { content } = useCMS();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16 space-y-12">
      {/* Page Heading */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
          What We Offer
        </span>
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
          Professional Digital Services
        </h1>
        <p className="text-lg text-slate-600">
          Tailored solutions designed for scalability, speed, and standard compliance.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-8">
        {content.services.map((service) => (
          <ServiceCard
            key={service.id}
            title={service.title}
            description={service.description}
            iconName={service.iconName}
          />
        ))}
      </div>
    </div>
  );
}
