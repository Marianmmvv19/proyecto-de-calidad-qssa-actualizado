import React, { useState, useMemo } from 'react';
import { 
  FileText, 
  CheckCircle2, 
  Sparkles, 
  ChevronRight, 
  RotateCcw,
  Building,
  Wrench,
  ShieldAlert,
  Send,
  HelpCircle
} from 'lucide-react';
import { ServiceItem } from '../types';
import imgAudit from '../assets/images/qssa_audit_compliance.jpg';
import imgInspection from '../assets/images/qssa_industrial_inspection.jpg';

interface DiagnosticTabProps {
  services: ServiceItem[];
  onSelectService: (service: ServiceItem) => void;
  onRequestQuote: (service: ServiceItem) => void;
}

export const DiagnosticTab: React.FC<DiagnosticTabProps> = ({
  services,
  onSelectService,
  onRequestQuote
}) => {
  // Wizard state
  const [step, setStep] = useState<number>(1);
  const [answers, setAnswers] = useState({
    objective: 'capacitacion', // capacitacion | diagnostico | auditoria | certificacion | corredor
    hasEquipment: false,
    isoStandard: '9001', // 9001 | 14001 | 45001 | 17020 | 17025 | 28000 | OEA
    preferOnline: true
  });

  // Recommendation engine
  const recommendedServices = useMemo(() => {
    return services.filter(service => {
      // Filter by objective
      let objMatch = false;
      const catLower = service.categoria.toLowerCase();
      const servLower = service.servicio.toLowerCase();

      if (answers.objective === 'capacitacion') {
        objMatch = catLower.includes('capacitaciones') || servLower.includes('interpretación');
      } else if (answers.objective === 'diagnostico') {
        objMatch = catLower.includes('diagnósticos') || servLower.includes('diagnóstico');
      } else if (answers.objective === 'auditoria') {
        objMatch = catLower.includes('auditorías') || servLower.includes('auditoría');
      } else if (answers.objective === 'certificacion') {
        objMatch = catLower.includes('certificación') || catLower.includes('implementación');
      } else if (answers.objective === 'corredor') {
        objMatch = catLower.includes('corredor') || servLower.includes('oea') || servLower.includes('28000');
      }

      // Standard match
      let stdMatch = true;
      if (answers.isoStandard !== 'ALL') {
        stdMatch = servLower.includes(answers.isoStandard.toLowerCase());
      }

      return objMatch && stdMatch;
    }).slice(0, 5);
  }, [services, answers]);

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12 font-sans">
      
      {/* Header Banner with Rich Visual Feature */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border-2 border-slate-200 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-7 space-y-3">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-emerald-100 text-emerald-900 rounded-full text-xs font-black uppercase tracking-wider">
              <FileText className="w-4 h-4 text-emerald-700" />
              <span>Evaluación de Necesidades QSSA</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              Diagnóstico Interactivo de Calidad e Inspección
            </h2>
            <p className="text-xs sm:text-sm font-bold text-slate-700 leading-relaxed text-justify">
              Responda las preguntas de evaluación para determinar la combinación óptima de capacitaciones, auditorías de brechas y certificaciones ISO aplicables a su sector.
            </p>
          </div>

          <div className="md:col-span-5 h-44 rounded-2xl overflow-hidden relative shadow-md border-2 border-emerald-300 group">
            <img 
              src={imgAudit} 
              alt="Diagnóstico e Inspección" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-4">
              <span className="text-xs font-black text-white">Mapeo Rápido de Soluciones Normativas</span>
            </div>
          </div>
        </div>
      </div>

      {/* Wizard Form */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-6">
        
        {/* Step 1: Objective */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
            1. ¿Cuál es el objetivo principal de su organización?
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { id: 'capacitacion', title: 'Capacitación del Personal', desc: 'Cursos in-house e interpretación de normas ISO' },
              { id: 'diagnostico', title: 'Diagnóstico de Brechas', desc: 'Evaluación de preparación previa a auditorías' },
              { id: 'auditoria', title: 'Auditoría Interna', desc: 'Auditorías integradas ISO 9001, 14001, 45001, 17020' },
              { id: 'certificacion', title: 'Implementación o Certificación', desc: 'Acompañamiento completo hacia la certificación' },
              { id: 'corredor', title: 'Comercio Exterior / OEA', desc: 'Corredor Bioceánico Bolivia - Chile - Perú' },
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setAnswers({ ...answers, objective: item.id })}
                className={`p-4 rounded-xl border text-left transition ${
                  answers.objective === item.id
                    ? 'border-blue-600 bg-blue-50/60 ring-2 ring-blue-500/20'
                    : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100'
                }`}
              >
                <div className="font-bold text-sm text-slate-900">{item.title}</div>
                <div className="text-xs text-slate-500 mt-1">{item.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Target ISO Standard */}
        <div className="pt-4 border-t border-slate-100">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
            2. ¿En qué norma o referente se enfoca su requerimiento?
          </label>
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'ALL', label: 'Todas las normas' },
              { id: '9001', label: 'ISO 9001 (Calidad)' },
              { id: '14001', label: 'ISO 14001 (Ambiental)' },
              { id: '45001', label: 'ISO 45001 (SST)' },
              { id: '17020', label: 'ISO/IEC 17020 (Inspección)' },
              { id: '17025', label: 'ISO/IEC 17025 (Laboratorios)' },
              { id: 'OEA', label: 'Programa OEA / ISO 28000' },
            ].map(std => (
              <button
                key={std.id}
                onClick={() => setAnswers({ ...answers, isoStandard: std.id })}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
                  answers.isoStandard === std.id
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {std.label}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Recommendations Results */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm">
            <Sparkles className="w-5 h-5" />
            <span>Servicios QSSA Mapeados Recomendados ({recommendedServices.length})</span>
          </div>
        </div>

        {recommendedServices.length === 0 ? (
          <div className="p-6 text-center text-slate-400 text-sm">
            No se encontraron servicios específicos con esa combinación. Pruebe seleccionando "Todas las normas".
          </div>
        ) : (
          <div className="space-y-3">
            {recommendedServices.map(service => (
              <div
                key={service.id}
                onClick={() => onSelectService(service)}
                className="bg-slate-800/90 border border-slate-700 hover:border-blue-500 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 transition cursor-pointer"
              >
                <div>
                  <div className="text-xs text-blue-400 font-bold mb-1">
                    Servicio #{service.orden} &bull; {service.categoria}
                  </div>
                  <h4 className="text-sm font-bold text-white">{service.servicio}</h4>
                  <p className="text-xs text-slate-300 mt-1">
                    Viabilidad: <strong className="text-emerald-400">{service.viabilidad}</strong> &bull; Modalidad: {service.modalidad}
                  </p>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onRequestQuote(service);
                  }}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl shrink-0 transition"
                >
                  Cotizar Servicio
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
