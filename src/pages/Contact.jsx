import React from 'react';
import { useCMS } from '../hooks/useCMS';
import ContactForm from '../components/ContactForm';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export default function Contact() {
  const { content } = useCMS();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16 space-y-12">
      {/* Headings */}
      <div className="max-w-3xl space-y-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
          Get In Touch
        </span>
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
          Connect With Us
        </h1>
        <p className="text-lg text-slate-600">
          Have an idea or a project in mind? We'd love to chat and see how we can assist you.
        </p>
      </div>

      {/* Grid of Form + Contact Info */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pt-4">
        {/* Contact details */}
        <div className="lg:col-span-5 space-y-8">
          <div className="bg-white border border-slate-200/80 rounded-xl p-8 shadow-sm space-y-8">
            <h3 className="text-lg font-bold text-slate-900 border-b pb-3 border-slate-100">
              Contact Information
            </h3>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="shrink-0 w-10 h-10 rounded bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-500">Email Address</h4>
                  <a
                    href={`mailto:${content.contact.email}`}
                    className="text-base text-slate-900 hover:text-indigo-600 transition-colors duration-200 font-medium"
                  >
                    {content.contact.email}
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="shrink-0 w-10 h-10 rounded bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-500">Phone Number</h4>
                  <a
                    href={`tel:${content.contact.phone}`}
                    className="text-base text-slate-900 hover:text-indigo-600 transition-colors duration-200 font-medium"
                  >
                    {content.contact.phone}
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="shrink-0 w-10 h-10 rounded bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-500">Studio Location</h4>
                  <p className="text-base text-slate-900 font-medium">
                    {content.contact.address}
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="shrink-0 w-10 h-10 rounded bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-500">Business Hours</h4>
                  <p className="text-base text-slate-900 font-medium">
                    {content.contact.hours}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
