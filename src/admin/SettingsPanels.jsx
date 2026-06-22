import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

// Reusable Input Field Component
const FormInput = ({ label, name, value, onChange, type = 'text', placeholder }) => (
  <div>
    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value || ''}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all duration-200"
    />
  </div>
);

// Reusable Textarea Field Component
const FormTextarea = ({ label, name, value, onChange, placeholder, rows = 4 }) => (
  <div>
    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
      {label}
    </label>
    <textarea
      name={name}
      value={value || ''}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all duration-200 resize-none"
    />
  </div>
);

export function GeneralEditor({ data, onChange }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({ ...data, [name]: value });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-bold text-slate-900 border-b pb-2 border-slate-100">
        General Configuration
      </h3>
      <FormInput
        label="Website Title"
        name="siteTitle"
        value={data.siteTitle}
        onChange={handleChange}
        placeholder="e.g. My Portfolio Studio"
      />
      <FormInput
        label="Footer Content Text"
        name="footerText"
        value={data.footerText}
        onChange={handleChange}
        placeholder="e.g. © 2026 Studio. All rights reserved."
      />
    </div>
  );
}

export function NavLinksEditor({ data, onChange }) {
  const handleLinkChange = (index, field, value) => {
    const updatedLinks = [...data.navLinks];
    updatedLinks[index] = { ...updatedLinks[index], [field]: value };
    onChange({ ...data, navLinks: updatedLinks });
  };

  const addLink = () => {
    const updatedLinks = [...data.navLinks, { label: 'New Link', path: '/new-path' }];
    onChange({ ...data, navLinks: updatedLinks });
  };

  const removeLink = (index) => {
    const updatedLinks = data.navLinks.filter((_, i) => i !== index);
    onChange({ ...data, navLinks: updatedLinks });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center border-b pb-2 border-slate-100">
        <h3 className="text-lg font-bold text-slate-900">Navbar Menu Links</h3>
        <button
          type="button"
          onClick={addLink}
          className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-100 rounded-md transition-colors duration-150"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Link
        </button>
      </div>

      <div className="space-y-4">
        {data.navLinks.map((link, idx) => (
          <div
            key={idx}
            className="flex flex-col sm:flex-row items-end gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200/60"
          >
            <div className="flex-1 w-full">
              <FormInput
                label="Label"
                value={link.label}
                onChange={(e) => handleLinkChange(idx, 'label', e.target.value)}
                placeholder="Home"
              />
            </div>
            <div className="flex-1 w-full">
              <FormInput
                label="Path"
                value={link.path}
                onChange={(e) => handleLinkChange(idx, 'path', e.target.value)}
                placeholder="/"
              />
            </div>
            <button
              type="button"
              onClick={() => removeLink(idx)}
              className="p-2.5 rounded-lg text-rose-600 bg-rose-50 hover:bg-rose-100 border border-rose-100 transition-colors duration-150 sm:mb-0.5"
              title="Delete Link"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}

        {data.navLinks.length === 0 && (
          <p className="text-sm text-slate-400 text-center py-4">
            No navigation links configured. Click "Add Link" to create one.
          </p>
        )}
      </div>
    </div>
  );
}

export function HeroEditor({ data, onChange }) {
  const handleHeroChange = (e) => {
    const { name, value } = e.target;
    onChange({
      ...data,
      hero: {
        ...data.hero,
        [name]: value,
      },
    });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-bold text-slate-900 border-b pb-2 border-slate-100">
        Hero Section Content
      </h3>
      <FormInput
        label="Hero Title"
        name="title"
        value={data.hero.title}
        onChange={handleHeroChange}
        placeholder="We build digital products"
      />
      <FormTextarea
        label="Hero Subtitle"
        name="subtitle"
        value={data.hero.subtitle}
        onChange={handleHeroChange}
        placeholder="Enter sub-text for your hero section"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormInput
          label="CTA Button Text"
          name="ctaText"
          value={data.hero.ctaText}
          onChange={handleHeroChange}
          placeholder="Get Started"
        />
        <FormInput
          label="CTA Button Destination Link"
          name="ctaLink"
          value={data.hero.ctaLink}
          onChange={handleHeroChange}
          placeholder="/contact"
        />
      </div>
    </div>
  );
}

export function AboutEditor({ data, onChange }) {
  const handleAboutChange = (e) => {
    const { name, value } = e.target;
    onChange({
      ...data,
      about: {
        ...data.about,
        [name]: value,
      },
    });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-bold text-slate-900 border-b pb-2 border-slate-100">
        About Section Content
      </h3>
      <FormInput
        label="About Page Title"
        name="title"
        value={data.about.title}
        onChange={handleAboutChange}
        placeholder="Our philosophy"
      />
      <FormInput
        label="About Page Subtitle"
        name="subtitle"
        value={data.about.subtitle}
        onChange={handleAboutChange}
        placeholder="Enter introductory slogan"
      />
      <FormTextarea
        label="About Page Main Text Content"
        name="content"
        value={data.about.content}
        onChange={handleAboutChange}
        placeholder="Explain your philosophy or company story"
        rows={6}
      />
    </div>
  );
}

export function ServicesEditor({ data, onChange }) {
  const handleServiceChange = (index, field, value) => {
    const updatedServices = [...data.services];
    updatedServices[index] = { ...updatedServices[index], [field]: value };
    onChange({ ...data, services: updatedServices });
  };

  const addService = () => {
    const newId = data.services.length > 0 ? Math.max(...data.services.map((s) => s.id)) + 1 : 1;
    const updatedServices = [
      ...data.services,
      { id: newId, title: 'New Service', description: 'Description of service', iconName: 'Laptop' },
    ];
    onChange({ ...data, services: updatedServices });
  };

  const removeService = (index) => {
    const updatedServices = data.services.filter((_, i) => i !== index);
    onChange({ ...data, services: updatedServices });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center border-b pb-2 border-slate-100">
        <h3 className="text-lg font-bold text-slate-900">Services Configuration</h3>
        <button
          type="button"
          onClick={addService}
          className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-100 rounded-md transition-colors duration-150"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Service
        </button>
      </div>

      <div className="space-y-6">
        {data.services.map((service, idx) => (
          <div
            key={service.id || idx}
            className="p-5 rounded-xl bg-slate-50 border border-slate-200/60 space-y-4 relative"
          >
            <div className="flex justify-between items-start gap-4">
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-slate-200 text-slate-700">
                Service #{idx + 1}
              </span>
              <button
                type="button"
                onClick={() => removeService(idx)}
                className="p-1.5 rounded-md text-rose-600 hover:bg-rose-50 transition-colors duration-150"
                title="Delete Service"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormInput
                label="Service Title"
                value={service.title}
                onChange={(e) => handleServiceChange(idx, 'title', e.target.value)}
                placeholder="e.g. Graphic Design"
              />
              <FormInput
                label="Lucide Icon Component Name"
                value={service.iconName}
                onChange={(e) => handleServiceChange(idx, 'iconName', e.target.value)}
                placeholder="e.g. Laptop, Smartphone, Search, Mail, Shield"
              />
            </div>
            <FormTextarea
              label="Service Description"
              value={service.description}
              onChange={(e) => handleServiceChange(idx, 'description', e.target.value)}
              placeholder="Describe the service benefits"
              rows={3}
            />
          </div>
        ))}

        {data.services.length === 0 && (
          <p className="text-sm text-slate-400 text-center py-4">
            No services configured. Click "Add Service" to create one.
          </p>
        )}
      </div>
    </div>
  );
}

export function ContactEditor({ data, onChange }) {
  const handleContactChange = (e) => {
    const { name, value } = e.target;
    onChange({
      ...data,
      contact: {
        ...data.contact,
        [name]: value,
      },
    });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-bold text-slate-900 border-b pb-2 border-slate-100">
        Contact Information Details
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormInput
          label="Contact Email"
          name="email"
          value={data.contact.email}
          onChange={handleContactChange}
          placeholder="contact@studio.com"
        />
        <FormInput
          label="Contact Phone"
          name="phone"
          value={data.contact.phone}
          onChange={handleContactChange}
          placeholder="+1 (555) 012-3456"
        />
      </div>
      <FormInput
        label="Physical Studio Address"
        name="address"
        value={data.contact.address}
        onChange={handleContactChange}
        placeholder="123 Creative Blvd, New York, NY"
      />
      <FormInput
        label="Office Operations Hours"
        name="hours"
        value={data.contact.hours}
        onChange={handleContactChange}
        placeholder="Mon - Fri, 9AM - 5PM"
      />
    </div>
  );
}
