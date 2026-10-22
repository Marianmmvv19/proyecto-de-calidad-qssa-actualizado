import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Send, 
  MessageSquare, 
  Headphones, 
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { TabType } from '../types';

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
      name: 'Sede Central Oruro',
      address: 'Urbanización Millenium , zona las retamas , calle s/n, Oruro - Bolivia',
      phone: '+591 77225772',
      whatsappContacts: [
        {
          label: 'WhatsApp Bolivia (+591)',
          number: '+591 77225772',
          cleanNumber: '59177225772',
          waLink: 'https://wa.me/59177225772'
        },
        {
          label: 'WhatsApp Chile / Internacional (+56)',
          number: '+56979713820',
          cleanNumber: '56979713820',
          waLink: 'https://wa.me/56979713820'
        }
      ],
      email: 'oruro@qssa-bolivia.com',
      hours: 'Lun - Vie: 08:30 - 18:30'
    },
    {
      id: 'lapaz',
      name: 'Oficina La Paz',
      address: 'Av. Arce N° 2631, Edificio Multicentro, Piso 12, La Paz - Bolivia',
      phone: '+591 2 2431000',
      whatsappContacts: [
        {
          label: 'WhatsApp La Paz',
          number: '+591 71100224',
          cleanNumber: '59171100224',
          waLink: 'https://wa.me/59171100224'
        }
      ],
      email: 'lapaz@qssa-bolivia.com',
      hours: 'Lun - Vie: 08:30 - 18:30'
    },
    {
      id: 'santacruz',
      name: 'Oficina Santa Cruz',
      address: 'Equipetrol Norte, Calle 7 Oeste N° 14, Santa Cruz de la Sierra - Bolivia',
      phone: '+591 3 3422000',
      whatsappContacts: [
        {
          label: 'WhatsApp Santa Cruz',
          number: '+591 71100225',
          cleanNumber: '59171100225',
          waLink: 'https://wa.me/59171100225'
        }
      ],
      email: 'santacruz@qssa-bolivia.com',
      hours: 'Lun - Vie: 08:00 - 17:30'
    },
    {
      id: 'cochabamba',
      name: 'Oficina Cochabamba',
      address: 'Av. Pando N° 1122, Zona Recoleta, Cochabamba - Bolivia',
      phone: '+591 4 4581000',
      whatsappContacts: [
        {
          label: 'WhatsApp Cochabamba',
          number: '+591 71100226',
          cleanNumber: '59171100226',
          waLink: 'https://wa.me/59171100226'
        }
      ],
      email: 'cochabamba@qssa-bolivia.com',
      hours: 'Lun - Vie: 08:30 - 18:00'
    }
  ];

  const cityLabels: Record<string, string> = {
    all: 'TODAS',
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
      
      {/* HEADER HERO BANNER - LIGHT & BOLD LEGIBILITY */}
      <div className="bg-gradient-to-br from-white via-emerald-50/40 to-slate-50 rounded-3xl p-8 sm:p-10 shadow-sm border-2 border-emerald-200/90 transition-all duration-300 hover:shadow-md">
        <div className="max-w-4xl space-y-4">
          <div className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-950 text-xs sm:text-sm font-black uppercase tracking-wider shadow-xs">
            <Headphones className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>Atención al Cliente QSSA Bolivia</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight leading-tight">
            Información de Contacto y Sedes
          </h1>

          <p className="text-slate-900 text-base sm:text-lg font-bold leading-relaxed text-justify">
            Si te encuentras en Bolivia o en la región, visítanos en nuestras oficinas o contáctanos de forma directa vía WhatsApp para asesoría inmediata sobre normas ISO y servicios de calidad.
          </p>

          {/* TWO DIRECT WHATSAPP ACCESS BUTTONS */}
          <div className="pt-3 flex flex-wrap items-center gap-4">
            <a
              href="https://wa.me/59177225772?text=Hola%20QSSA,%20deseo%20más%20información"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2.5 px-6 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-black text-sm rounded-2xl shadow-md transition-all duration-200 hover:scale-[1.02]"
              title="Abrir WhatsApp Bolivia"
            >
              <MessageSquare className="w-5 h-5 shrink-0" />
              <span>WhatsApp (+591 77225772)</span>
            </a>

            <a
              href="https://wa.me/56979713820?text=Hola%20QSSA,%20deseo%20más%20información"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2.5 px-6 py-3.5 bg-emerald-800 hover:bg-emerald-900 text-white font-black text-sm rounded-2xl shadow-md transition-all duration-200 hover:scale-[1.02]"
              title="Abrir WhatsApp Chile"
            >
              <MessageSquare className="w-5 h-5 shrink-0" />
              <span>WhatsApp (+56979713820)</span>
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
              Solicita más información
            </h2>
            <p className="text-sm sm:text-base font-bold text-slate-900 mt-1.5">
              Completa el formulario y nos pondremos en contacto a la brevedad.
            </p>
          </div>

          {formSubmitted ? (
            <div className="p-8 bg-emerald-50 rounded-2xl border-2 border-emerald-300 text-center space-y-4 animate-in fade-in duration-300">
              <CheckCircle2 className="w-12 h-12 text-emerald-700 mx-auto" />
              <h3 className="text-xl font-black text-emerald-950">¡Mensaje Enviado con Éxito!</h3>
              <p className="text-sm font-bold text-slate-900 leading-relaxed">
                Gracias <strong>{formData.name || 'por contactarnos'}</strong>. Un especialista técnico revisará tu requerimiento en menos de 24 horas.
              </p>
              <button
                onClick={() => setFormSubmitted(false)}
                className="text-sm font-black text-emerald-800 hover:text-emerald-900 underline pt-2 block mx-auto cursor-pointer"
              >
                Enviar otro mensaje
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 text-sm font-sans">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="min-w-0">
                  <label className="block font-black text-slate-950 text-sm sm:text-base mb-1.5">
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ej. Juan Pérez"
                    className="w-full bg-slate-50 border-2 border-slate-300 rounded-xl px-4 py-3 text-slate-950 font-extrabold text-base focus:outline-none focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 transition-all duration-150"
                  />
                </div>

                <div className="min-w-0">
                  <label className="block font-black text-slate-950 text-sm sm:text-base mb-1.5">
                    Correo Electrónico *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Ej. info@qssa.bo (Correo institucional)"
                    className="w-full bg-slate-50 border-2 border-slate-300 rounded-xl px-4 py-3 text-slate-950 font-extrabold text-base focus:outline-none focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 transition-all duration-150"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="min-w-0">
                  <label className="block font-black text-slate-950 text-sm sm:text-base mb-1.5">
                    Teléfono / WhatsApp
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
                        title="Código de País"
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
                    Código de país en recuadro con <span className="font-black text-slate-950">+</span> por defecto.
                  </p>
                </div>

                <div className="min-w-0">
                  <label className="block font-black text-slate-950 text-sm sm:text-base mb-1.5">
                    Ciudad o Sede
                  </label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full min-w-0 bg-slate-50 border-2 border-slate-300 rounded-xl px-4 py-3 text-slate-950 font-black text-base focus:outline-none focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 transition-all duration-150"
                  >
                    <option value="Oruro">Sede Central Oruro</option>
                    <option value="La Paz">La Paz</option>
                    <option value="Santa Cruz">Santa Cruz</option>
                    <option value="Cochabamba">Cochabamba</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-black text-slate-950 text-sm sm:text-base mb-1.5">
                  Mensaje / Consulta *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Detalla tu requerimiento sobre normas, servicios o cotizaciones..."
                  className="w-full bg-slate-50 border-2 border-slate-300 rounded-xl px-4 py-3 text-slate-950 font-extrabold text-base focus:outline-none focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 transition-all duration-150"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-emerald-700 hover:bg-emerald-800 text-white font-black text-base rounded-2xl shadow-md transition-all duration-200 flex items-center justify-center space-x-2.5 active:scale-[0.99] cursor-pointer"
              >
                <Send className="w-5 h-5" />
                <span>Enviar Solicitud de Información</span>
              </button>
            </form>
          )}
        </div>

        {/* Offices Cards List */}
        <div className="lg:col-span-5 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1">
            <h3 className="text-xl font-black text-slate-950 tracking-tight">
              Oficinas en Bolivia
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
                      title={`Abrir WhatsApp: ${contact.number}`}
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
            <span>Acceso al Correo Corporativo QSSA</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white">
            Inicia sesión en Hostinger Mail:
          </h3>
          <p className="text-slate-300 text-xs sm:text-sm font-semibold max-w-xl">
            Plataforma oficial de correo web corporativo para el equipo técnico, consultores, auditores y personal administrativo de QSSA Bolivia.
          </p>
        </div>

        <a
          href="https://mail.hostinger.com/auth/login"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-3 px-6 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm sm:text-base rounded-2xl shadow-lg transition-all duration-200 hover:scale-[1.03] shrink-0 active:scale-[0.98]"
        >
          <Mail className="w-5 h-5 text-slate-950 shrink-0" />
          <span>Inicia sesión en Hostinger Mail</span>
          <ExternalLink className="w-4 h-4 text-slate-950 shrink-0" />
        </a>
      </div>

    </div>
  );
};
