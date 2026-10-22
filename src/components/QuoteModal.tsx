import React, { useState } from 'react';
import { X, Send, CheckCircle2, Mail, Phone, Building } from 'lucide-react';
import qssaLogo from '../assets/qssa_official_logo-4aPsr4dZ.png';
import { ServiceItem } from '../types';

interface QuoteModalProps {
  service: ServiceItem | null;
  onClose: () => void;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({ service, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    notes: ''
  });

  if (!service) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-3xl w-full overflow-hidden border border-slate-200">
        
        {/* Header */}
        <div className="bg-slate-900 p-5 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <img src={qssaLogo} alt="Logo QSSA" className="w-7 h-7 object-contain" />
            <h3 className="font-bold text-base">Solicitud de Cotización QSSA</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold text-slate-900">¡Solicitud Registrada con Éxito!</h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              Hemos registrado la solicitud de cotización para el servicio <br />
              <strong className="text-slate-900">{service.servicio}</strong>.
            </p>
            <p className="text-xs text-slate-500">
              Un consultor senior de QSSA se pondrá en contacto al correo <strong className="text-slate-800">{formData.email}</strong> a la brevedad.
            </p>
            <button
              onClick={onClose}
              className="mt-4 px-6 py-2.5 bg-slate-900 text-white rounded-xl font-semibold text-sm hover:bg-slate-800 transition"
            >
              Volver a la Matriz de Servicios
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="bg-emerald-50/80 border border-emerald-200/90 rounded-xl p-4">
              <p className="text-xs text-emerald-800 font-extrabold uppercase tracking-wider">Servicio Seleccionado:</p>
              <p className="text-base font-black text-slate-900 mt-1">{service.servicio}</p>
              <p className="text-xs font-bold text-slate-700 mt-1">Categoría: {service.categoria} &bull; Modalidad: {service.modalidad}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-extrabold text-slate-800 mb-1">Nombre de la Empresa u Organización *</label>
                  <div className="relative">
                    <Building className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      required
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      placeholder="Ej. Minera del Sur S.A."
                      className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-slate-800 mb-1">Nombre del Contacto *</label>
                  <input
                    type="text"
                    required
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                    placeholder="Ej. Ing. Juan Pérez"
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none font-medium"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-extrabold text-slate-800 mb-1">Correo Electrónico *</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="contacto@empresa.com"
                      className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-slate-800 mb-1">Teléfono / WhatsApp</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+591 700 00000"
                      className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none font-medium"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-extrabold text-slate-800 mb-1">Alcance o Notas Adicionales</label>
              <textarea
                rows={2}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Indique sedes, número de trabajadores o requerimientos específicos..."
                className="w-full p-3 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none font-medium"
              />
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-800"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="inline-flex items-center space-x-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm rounded-xl shadow transition"
              >
                <Send className="w-4 h-4" />
                <span>Enviar Solicitud</span>
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
