import React, { useState } from 'react';
import { 
  MapPin, 
  Mail, 
  Send, 
  MessageSquare, 
  Headphones, 
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { TabType } from '../types';
import { UI_DICTIONARY } from '../data/translations';

interface ContactTabProps {
  onNavigateTab?: (tab: TabType) => void;
  lang?: 'ES' | 'EN';
}

interface OfficeData {
  id: string;
  name: string;
  address: string;
  phone: string;
  whatsappContacts: {
    label: string;
    number: string;
    cleanNumber: string;
    waLink: string;
  }[];
  email: string;
  hours: string;
}

export const ContactTab: React.FC<ContactTabProps> = ({ lang = 'ES' }) => {
  const t = UI_DICTIONARY[lang];
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  
  // Form State with separate country code and phone
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    countryCode: '591',
    phone: '',
    company: '',
    city: 'Oruro',
    message: ''
  });

  const offices: OfficeData[] = [
    {
      id: 'oruro',
      name: lang === 'ES' ? 'Sede Central Oruro' : 'Oruro Main Office',
      address: 'Urbanización Millenium , zona las retamas , calle s/n, Oruro - Bolivia',
      phone: '+591 77225772',
      whatsappContacts: [
        {
          label: lang === 'ES' ? 'WhatsApp Bolivia (+591)' : 'WhatsApp Bolivia (+591)',
          number: '+591 77225772',
          cleanNumber: '59177225772',
          waLink: 'https://wa.me/59177225772'
        },
        {
          label: lang === 'ES' ? 'WhatsApp Chile / Internacional (+56)' : 'WhatsApp Chile / International (+56)',
          number: '+56979713820',
          cleanNumber: '56979713820',
          waLink: 'https://wa.me/56979713820'
        }
      ],
      email: 'oruro@qssa-bolivia.com',
      hours: lang === 'ES' ? 'Lun - Vie: 08:30 - 18:30' : 'Mon - Fri: 08:30 - 18:30'
    },
    {
      id: 'lapaz',
      name: lang === 'ES' ? 'Oficina La Paz' : 'La Paz Branch',
      address: 'Av. Arce N° 2631, Edificio Multicentro, Piso 12, La Paz - Bolivia',
      phone: '+591 2 2431000',
      whatsappContacts: [
        {
          label: lang === 'ES' ? 'WhatsApp La Paz' : 'WhatsApp La Paz',
          number: '+591 71100224',
          cleanNumber: '59171100224',
          waLink: 'https://wa.me/59171100224'
        }
      ],
      email: 'lapaz@qssa-bolivia.com',
      hours: lang === 'ES' ? 'Lun - Vie: 08:30 - 18:30' : 'Mon - Fri: 08:30 - 18:30'
    },
    {
      id: 'santacruz',
      name: lang === 'ES' ? 'Oficina Santa Cruz' : 'Santa Cruz Branch',
      address: 'Equipetrol Norte, Calle 7 Oeste N° 14, Santa Cruz de la Sierra - Bolivia',
      phone: '+591 3 3422000',
      whatsappContacts: [
        {
          label: lang === 'ES' ? 'WhatsApp Santa Cruz' : 'WhatsApp Santa Cruz',
          number: '+591 71100225',
          cleanNumber: '59171100225',
          waLink: 'https://wa.me/59171100225'
        }
      ],
      email: 'santacruz@qssa-bolivia.com',
      hours: lang === 'ES' ? 'Lun - Vie: 08:00 - 17:30' : 'Mon - Fri: 08:00 - 17:30'
    },
    {
      id: 'cochabamba',
      name: lang === 'ES' ? 'Oficina Cochabamba' : 'Cochabamba Branch',
      address: 'Av. Pando N° 1122, Zona Recoleta, Cochabamba - Bolivia',
      phone: '+591 4 4581000',
      whatsappContacts: [
        {
          label: lang === 'ES' ? 'WhatsApp Cochabamba' : 'WhatsApp Cochabamba',
          number: '+591 71100226',
          cleanNumber: '59171100226',
          waLink: 'https://wa.me/59171100226'
        }
      ],
      email: 'cochabamba@qssa-bolivia.com',
      hours: lang === 'ES' ? 'Lun - Vie: 08:30 - 18:00' : 'Mon - Fri: 08:30 - 18:00'
    }
  ];

  const cityLabels: Record<string, string> = {
    all: lang === 'ES' ? 'TODAS' : 'ALL',
    oruro: 'ORURO',
    lapaz: 'LA PAZ',
    santacruz: 'SANTA CRUZ',
    cochabamba: 'COCHABAMBA'
  };

  const filteredOffices = selectedCity === 'all' 
    ? offices 
    : offices.filter(o => o.id === selectedCity);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-16 font-sans text-slate-950 animate-in fade-in duration-300">
      
      {/* HEADER HERO BANNER */}
      <div className="bg-gradient-to-br from-white via-emerald-50/40 to-slate-50 rounded-3xl p-8 sm:p-10 shadow-sm border-2 border-emerald-200/90 transition-all duration-300 hover:shadow-md">
        <div className="max-w-4xl space-y-4">
          <div className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-950 text-xs sm:text-sm font-black uppercase tracking-wider shadow-xs">
            <Headphones className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>{t.contactBadge}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight leading-tight">
            {t.contactHeroTitle}
          </h1>

          <p className="text-slate-900 text-base sm:text-lg font-bold leading-relaxed text-justify">
            {t.contactHeroDesc}
          </p>

          {/* TWO DIRECT WHATSAPP ACCESS BUTTONS */}
          <div className="pt-3 flex flex-wrap items-center gap-4">
            <a
              href="https://wa.me/59177225772?text=Hola%20QSSA,%20deseo%20más%20información"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2.5 px-6 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-black text-sm rounded-2xl shadow-md transition-all duration-200 hover:scale-[1.02]"
              title="WhatsApp Bolivia"
            >
              <MessageSquare className="w-5 h-5 shrink-0" />
              <span>{t.btnWaBolivia}</span>
            </a>

            <a
              href="https://wa.me/56979713820?text=Hola%20QSSA,%20deseo%20más%20información"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2.5 px-6 py-3.5 bg-emerald-800 hover:bg-emerald-900 text-white font-black text-sm rounded-2xl shadow-md transition-all duration-200 hover:scale-[1.02]"
              title="WhatsApp Chile"
            >
              <MessageSquare className="w-5 h-5 shrink-0" />
              <span>{t.btnWaChile}</span>
            </a>
          </div>
        </div>
      </div>

      {/* TWO COLUMN CONTENT: FORM & OFFICES */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Contact Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-9 shadow-md border-2 border-slate-300 space-y-6">
          <div className="border-b-2 border-slate-200 pb-4">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              {t.contactFormTitle}
            </h2>
            <p className="text-sm sm:text-base font-bold text-slate-900 mt-1.5">
              {t.contactFormSubtitle}
            </p>
          </div>

          {formSubmitted ? (
            <div className="p-8 bg-emerald-50 rounded-2xl border-2 border-emerald-300 text-center space-y-4 animate-in fade-in duration-300">
              <CheckCircle2 className="w-12 h-12 text-emerald-700 mx-auto" />
              <h3 className="text-xl font-black text-emerald-950">{t.formSuccessTitle}</h3>
              <p className="text-sm font-bold text-slate-900 leading-relaxed">
                {lang === 'ES' 
                  ? `Gracias ${formData.name || 'por contactarnos'}. Un especialista técnico revisará tu requerimiento en menos de 24 horas.`
                  : `Thank you ${formData.name || 'for contacting us'}. A technical specialist will review your request within 24 hours.`}
              </p>
              <button
                onClick={() => setFormSubmitted(false)}
                className="text-sm font-black text-emerald-800 hover:text-emerald-900 underline pt-2 block mx-auto cursor-pointer"
              >
                {t.formSendAnother}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 text-sm font-sans">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="min-w-0">
                  <label className="block font-black text-slate-950 text-sm sm:text-base mb-1.5">
                    {t.formFullName}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={lang === 'ES' ? "Ej. Juan Pérez" : "e.g. John Doe"}
                    className="w-full bg-slate-50 border-2 border-slate-300 rounded-xl px-4 py-3 text-slate-950 font-extrabold text-base focus:outline-none focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 transition-all duration-150"
                  />
                </div>

                <div className="min-w-0">
                  <label className="block font-black text-slate-950 text-sm sm:text-base mb-1.5">
                    {t.formEmail}
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder={lang === 'ES' ? "Ej. info@qssa.bo" : "e.g. info@qssa.bo"}
                    className="w-full bg-slate-50 border-2 border-slate-300 rounded-xl px-4 py-3 text-slate-950 font-extrabold text-base focus:outline-none focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 transition-all duration-150"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="min-w-0">
                  <label className="block font-black text-slate-950 text-sm sm:text-base mb-1.5">
                    {t.formPhone}
                  </label>
                  <div className="flex items-center space-x-2 min-w-0 w-full">
                    <div className="relative flex items-center shrink-0">
                      <span className="absolute left-3 font-black text-slate-950 text-base select-none pointer-events-none">+</span>
                      <input
                        type="text"
                        value={formData.countryCode}
                        onChange={(e) => setFormData({ ...formData, countryCode: e.target.value.replace(/[^0-9]/g, '') })}
                        placeholder="591"
                        maxLength={4}
                        title="Country Code"
                        className="w-20 shrink-0 pl-7 pr-2 py-3 bg-slate-50 border-2 border-slate-300 rounded-xl font-black text-slate-950 text-base text-center focus:outline-none focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 transition-all duration-150"
                      />
                    </div>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="77225772"
                      className="min-w-0 flex-1 w-full bg-slate-50 border-2 border-slate-300 rounded-xl px-4 py-3 text-slate-950 font-extrabold text-base focus:outline-none focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 transition-all duration-150"
                    />
                  </div>
                  <p className="text-xs text-slate-700 font-bold mt-1">
                    {t.formPhoneHint}
                  </p>
                </div>

                <div className="min-w-0">
                  <label className="block font-black text-slate-950 text-sm sm:text-base mb-1.5">
                    {t.formCity}
                  </label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full min-w-0 bg-slate-50 border-2 border-slate-300 rounded-xl px-4 py-3 text-slate-950 font-black text-base focus:outline-none focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 transition-all duration-150"
                  >
                    <option value="Oruro">{lang === 'ES' ? 'Sede Central Oruro' : 'Oruro Main Office'}</option>
                    <option value="La Paz">{lang === 'ES' ? 'Oficina La Paz' : 'La Paz Branch'}</option>
                    <option value="Santa Cruz">{lang === 'ES' ? 'Oficina Santa Cruz' : 'Santa Cruz Branch'}</option>
                    <option value="Cochabamba">{lang === 'ES' ? 'Oficina Cochabamba' : 'Cochabamba Branch'}</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-black text-slate-950 text-sm sm:text-base mb-1.5">
                  {t.formMessage}
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={lang === 'ES' ? "Detalla tu requerimiento sobre normas, servicios o cotizaciones..." : "Detail your requirements regarding standards, services, or quotes..."}
                  className="w-full bg-slate-50 border-2 border-slate-300 rounded-xl px-4 py-3 text-slate-950 font-extrabold text-base focus:outline-none focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 transition-all duration-150"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-emerald-700 hover:bg-emerald-800 text-white font-black text-base rounded-2xl shadow-md transition-all duration-200 flex items-center justify-center space-x-2.5 active:scale-[0.99] cursor-pointer"
              >
                <Send className="w-5 h-5" />
                <span>{t.formSubmitBtn}</span>
              </button>
            </form>
          )}
        </div>

        {/* Offices Cards List */}
        <div className="lg:col-span-5 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1">
            <h3 className="text-xl font-black text-slate-950 tracking-tight">
              {t.officesHeading}
            </h3>
            <div className="flex flex-wrap gap-1.5 text-xs font-black">
              {['all', 'oruro', 'lapaz', 'santacruz', 'cochabamba'].map((city) => (
                <button
                  key={city}
                  onClick={() => setSelectedCity(city)}
                  className={`px-3 py-1.5 rounded-xl transition-all duration-150 cursor-pointer ${
                    selectedCity === city 
                      ? 'bg-slate-950 text-white font-black shadow-sm' 
                      : 'bg-slate-200 text-slate-900 hover:bg-slate-300 font-bold'
                  }`}
                >
                  {cityLabels[city] || city.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {filteredOffices.map((office) => (
              <div 
                key={office.id} 
                className="bg-white rounded-2xl p-6 border-2 border-slate-300 shadow-sm hover:shadow-md hover:border-emerald-400 transition-all duration-200 space-y-3 group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-black text-slate-950 text-lg group-hover:text-emerald-800 transition-colors">
                    {office.name}
                  </span>
                  <MapPin className="w-5 h-5 text-emerald-700 shrink-0" />
                </div>

                <p className="text-sm font-extrabold text-slate-900 leading-relaxed text-justify">
                  {office.address}
                </p>

                {/* WhatsApp Direct Links & Numbers */}
                <div className="pt-3 border-t-2 border-slate-100 flex flex-col gap-2.5 text-xs sm:text-sm font-extrabold text-slate-950">
                  {office.whatsappContacts.map((contact, cIdx) => (
                    <a
                      key={cIdx}
                      href={contact.waLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-between px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-950 font-black text-xs transition duration-150 group/wa"
                      title={`WhatsApp: ${contact.number}`}
                    >
                      <div className="flex items-center space-x-2">
                        <MessageSquare className="w-4 h-4 text-emerald-700 shrink-0 group-hover/wa:scale-110 transition-transform" />
                        <span>{contact.label}: <span className="text-emerald-900 font-extrabold">{contact.number}</span></span>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-emerald-700" />
                    </a>
                  ))}

                  <div className="flex items-center space-x-2 pt-1">
                    <Mail className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span className="text-emerald-950 font-bold">{office.email}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* CORPORATE WEBMAIL SECTION - INICIA SESIÓN EN HOSTINGER MAIL */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-950 rounded-3xl p-6 sm:p-8 text-white shadow-lg border-2 border-emerald-500/40 flex flex-col md:flex-row items-center justify-between gap-6 transition-all duration-300 hover:border-emerald-400">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-black uppercase tracking-wider border border-emerald-400/30">
            <Mail className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>{t.hostingerBadge}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white">
            {t.hostingerTitle}
          </h3>
          <p className="text-slate-300 text-xs sm:text-sm font-semibold max-w-xl">
            {t.hostingerDesc}
          </p>
        </div>

        <a
          href="https://mail.hostinger.com/auth/login"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-3 px-6 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm sm:text-base rounded-2xl shadow-lg transition-all duration-200 hover:scale-[1.03] shrink-0 active:scale-[0.98]"
        >
          <Mail className="w-5 h-5 text-slate-950 shrink-0" />
          <span>{t.hostingerBtn}</span>
          <ExternalLink className="w-4 h-4 text-slate-950 shrink-0" />
        </a>
      </div>

    </div>
  );
};
