import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Building2, 
  Wrench, 
  Send,
  FileCheck2,
  Tag
} from 'lucide-react';
import { ServiceItem } from '../types';

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onRequestQuote: (service: ServiceItem) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  onRequestQuote
}) => {
  if (!service) return null;

  // Helpers for difficulty styling
  const getDifficultyBadge = (dificultad: string) => {
    if (dificultad.includes('1')) {
      return <span className="bg-emerald-100 text-emerald-800 text-xs px-2.5 py-1 rounded-full font-semibold border border-emerald-200">1 - Muy fácil</span>;
    } else if (dificultad.includes('2')) {
      return <span className="bg-blue-100 text-blue-800 text-xs px-2.5 py-1 rounded-full font-semibold border border-blue-200">2 - Fácil</span>;
    } else if (dificultad.includes('3')) {
      return <span className="bg-amber-100 text-amber-800 text-xs px-2.5 py-1 rounded-full font-semibold border border-amber-200">3 - Media</span>;
    } else {
      return <span className="bg-red-100 text-red-800 text-xs px-2.5 py-1 rounded-full font-semibold border border-red-200">4 - Difícil</span>;
    }
  };

  const getPriorityBadge = (prioridad: string) => {
    if (prioridad.toLowerCase().includes('alta')) {
      return <span className="bg-purple-100 text-purple-800 text-xs px-2.5 py-1 rounded-full font-bold border border-purple-200">Prioridad Alta</span>;
    } else if (prioridad.toLowerCase().includes('media')) {
      return <span className="bg-slate-100 text-slate-800 text-xs px-2.5 py-1 rounded-medium border border-slate-200">Prioridad Media</span>;
    }
    return <span className="bg-gray-100 text-gray-700 text-xs px-2.5 py-1 rounded-full border border-gray-200">Prioridad Baja</span>;
  };

  const getViabilityBadge = (viabilidad: string) => {
    if (viabilidad.toLowerCase().includes('alta')) {
      return <span className="bg-emerald-50 text-emerald-700 text-xs px-2.5 py-1 rounded-md font-semibold border border-emerald-200 flex items-center space-x-1"><CheckCircle2 className="w-3.5 h-3.5" /><span>Viabilidad Alta sin equipos</span></span>;
    } else if (viabilidad.toLowerCase().includes('media')) {
      return <span className="bg-blue-50 text-blue-700 text-xs px-2.5 py-1 rounded-md font-semibold border border-blue-200 flex items-center space-x-1"><CheckCircle2 className="w-3.5 h-3.5" /><span>Viabilidad Media sin equipos</span></span>;
    }
    return <span className="bg-amber-50 text-amber-800 text-xs px-2.5 py-1 rounded-md font-semibold border border-amber-200 flex items-center space-x-1"><AlertTriangle className="w-3.5 h-3.5" /><span>Viabilidad Condicionada</span></span>;
  };

  // Split resources into checklist items
  const resourceItems = service.recursos.split(/;|\./).filter(r => r.trim().length > 0);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl lg:max-w-5xl w-full overflow-hidden border border-slate-200 animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-white bg-slate-800/80 p-1.5 rounded-full transition"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-2 text-xs font-bold text-emerald-400 mb-2">
            <Tag className="w-3.5 h-3.5" />
            <span>Servicio #{service.orden} &bull; {service.categoria}</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight pr-6 tracking-tight">
            {service.servicio}
          </h3>

          <div className="flex flex-wrap items-center gap-2 mt-4">
            {getPriorityBadge(service.prioridadComercial)}
            {getDifficultyBadge(service.dificultad)}
            {getViabilityBadge(service.viabilidad)}
          </div>
        </div>

        {/* Content - Horizontal Grid Layout */}
        <div className="p-6 space-y-6 text-slate-800">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            
            {/* Left Column: Modalidad & Recursos */}
            <div className="space-y-5">
              {/* Modalidad */}
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-600 mb-1.5 flex items-center space-x-1.5">
                  <Building2 className="w-4 h-4 text-emerald-600" />
                  <span>Modalidad de Ejecución Recomendada</span>
                </h4>
                <p className="text-sm font-bold text-slate-900 text-justify">
                  {service.modalidad}
                </p>
              </div>

              {/* Recursos Necesarios */}
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-600 mb-2 flex items-center space-x-1.5">
                  <Wrench className="w-4 h-4 text-emerald-600" />
                  <span>Recursos e Insumos Requeridos</span>
                </h4>
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 max-h-64 overflow-y-auto">
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {resourceItems.map((item, idx) => (
                      <li key={idx} className="flex items-start space-x-2 text-xs sm:text-sm text-slate-800 font-bold text-justify">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{item.trim()}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Right Column: Limitaciones & CTA Actions */}
            <div className="space-y-5 flex flex-col justify-between h-full">
              {/* Limitaciones / Condiciones */}
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-600 mb-2 flex items-center space-x-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>Consideraciones Técnicas y Limitaciones</span>
                </h4>
                <div className="bg-amber-50/90 rounded-xl p-4 border border-amber-200/80 text-slate-900 text-sm font-bold leading-relaxed text-justify">
                  {service.limitaciones}
                </div>
              </div>

              {/* Quote CTA Banner inside Right Column */}
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-4 border border-emerald-200/80 space-y-3">
                <div className="text-xs font-bold text-emerald-900">
                  ¿Desea implementar o requerir una propuesta formal para este servicio?
                </div>
                <button
                  onClick={() => {
                    onClose();
                    onRequestQuote(service);
                  }}
                  className="w-full inline-flex items-center justify-center space-x-2 px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm rounded-xl shadow-md transition transform active:scale-95"
                >
                  <Send className="w-4 h-4" />
                  <span>Solicitar Cotización de este Servicio</span>
                </button>
              </div>
            </div>

          </div>

          {/* Actions Footer */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
            <button
              onClick={onClose}
              className="px-5 py-2.5 text-sm font-bold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition"
            >
              Cerrar Detalle
            </button>

            <button
              onClick={() => {
                onClose();
                onRequestQuote(service);
              }}
              className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-sm rounded-2xl shadow-md hover:shadow-lg transition transform active:scale-95"
            >
              <Send className="w-4 h-4" />
              <span>Solicitar Cotización de este Servicio</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
