import React, { useState, useMemo } from 'react';
import { 
  FileText, 
  Sparkles, 
  Send
} from 'lucide-react';
import { ServiceItem } from '../types';
import imgAudit from '../assets/images/qssa_audit_compliance.jpg';
import { getServiceText, UI_DICTIONARY } from '../data/translations';

interface DiagnosticTabProps {
  services: ServiceItem[];
  onSelectService: (service: ServiceItem) => void;
  onRequestQuote: (service: ServiceItem) => void;
  lang?: 'ES' | 'EN';
}

export const DiagnosticTab: React.FC<DiagnosticTabProps> = ({
  services,
  onSelectService,
  onRequestQuote,
  lang = 'ES'
}: DiagnosticTabProps) => {
  const t = UI_DICTIONARY[lang];

  // Wizard state
  const [answers, setAnswers] = useState({
    objective: 'capacitacion', // capacitacion | diagnostico | auditoria | certificacion | corredor
    hasEquipment: false,
    isoStandard: '9001', // 9001 | 14001 | 45001 | 17020 | 17025 | 28000 | OEA
    preferOnline: true
  });

  // Recommendation engine
  const recommendedServices = useMemo(() => {
    return services.filter(service => {
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

      let stdMatch = true;
      if (answers.isoStandard !== 'ALL') {
        stdMatch = servLower.includes(answers.isoStandard.toLowerCase());
      }

      return objMatch && stdMatch;
    }).slice(0, 5);
  }, [services, answers]);

  const objectives = [
    {
      id: 'capacitacion',
      title: lang === 'ES' ? 'Capacitación del Personal' : 'Staff Training & Courses',
      desc: lang === 'ES' ? 'Cursos in-house e interpretación de normas ISO' : 'In-house courses & ISO standards interpretation'
    },
    {
      id: 'diagnostico',
      title: lang === 'ES' ? 'Diagnóstico de Brechas' : 'GAP Analysis Diagnostic',
      desc: lang === 'ES' ? 'Evaluación de preparación previa a auditorías' : 'Pre-audit readiness and baseline assessment'
    },
    {
      id: 'auditoria',
      title: lang === 'ES' ? 'Auditoría Interna' : 'Internal Audits',
      desc: lang === 'ES' ? 'Auditorías integradas ISO 9001, 14001, 45001, 17020' : 'Integrated audits (ISO 9001, 14001, 45001, 17020)'
    },
    {
      id: 'certificacion',
      title: lang === 'ES' ? 'Implementación o Certificación' : 'Implementation or Certification',
      desc: lang === 'ES' ? 'Acompañamiento completo hacia la certificación' : 'End-to-end guidance toward accredited certification'
    },
    {
      id: 'corredor',
      title: lang === 'ES' ? 'Comercio Exterior / OEA' : 'Foreign Trade & Supply Chain (AEO)',
      desc: lang === 'ES' ? 'Corredor Bioceánico Bolivia - Chile - Perú' : 'Bioceanic Corridor (Bolivia - Chile - Peru)'
    },
  ];

  const standardsOptions = [
    { id: 'ALL', label: lang === 'ES' ? 'Todas las normas' : 'All standards' },
    { id: '9001', label: lang === 'ES' ? 'ISO 9001 (Calidad)' : 'ISO 9001 (Quality)' },
    { id: '14001', label: lang === 'ES' ? 'ISO 14001 (Ambiental)' : 'ISO 14001 (Environmental)' },
    { id: '45001', label: lang === 'ES' ? 'ISO 45001 (SST)' : 'ISO 45001 (OH&S)' },
    { id: '17020', label: lang === 'ES' ? 'ISO/IEC 17020 (Inspección)' : 'ISO/IEC 17020 (Inspection)' },
    { id: '17025', label: lang === 'ES' ? 'ISO/IEC 17025 (Laboratorios)' : 'ISO/IEC 17025 (Laboratories)' },
    { id: 'OEA', label: lang === 'ES' ? 'Programa OEA / ISO 28000' : 'AEO Program / ISO 28000' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12 font-sans">
      
      {/* Header Banner with Rich Visual Feature */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border-2 border-slate-200 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-7 space-y-3">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-emerald-100 text-emerald-900 rounded-full text-xs font-black uppercase tracking-wider">
              <FileText className="w-4 h-4 text-emerald-700" />
              <span>{t.diagBadge}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              {t.diagTitle}
            </h2>
            <p className="text-xs sm:text-sm font-bold text-slate-700 leading-relaxed text-justify">
              {t.diagDesc}
            </p>
          </div>

          <div className="md:col-span-5 h-44 rounded-2xl overflow-hidden relative shadow-md border-2 border-emerald-300 group">
            <img 
              src={imgAudit} 
              alt="Diagnóstico e Inspección" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-4">
              <span className="text-xs font-black text-white">{t.diagImageTag}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Wizard Form */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-6">
        
        {/* Step 1: Objective */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
            {t.diagQ1}
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {objectives.map(item => (
              <button
                key={item.id}
                onClick={() => setAnswers({ ...answers, objective: item.id })}
                className={`p-4 rounded-xl border text-left transition cursor-pointer ${
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
            {t.diagQ2}
          </label>
          <div className="flex flex-wrap gap-2">
            {standardsOptions.map(std => (
              <button
                key={std.id}
                onClick={() => setAnswers({ ...answers, isoStandard: std.id })}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
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
            <span>{t.diagRecTitle} ({recommendedServices.length})</span>
          </div>
        </div>

        {recommendedServices.length === 0 ? (
          <div className="p-6 text-center text-slate-400 text-sm">
            {t.diagRecEmpty}
          </div>
        ) : (
          <div className="space-y-3">
            {recommendedServices.map(service => {
              const sInfo = getServiceText(service, lang);
              return (
                <div
                  key={service.id}
                  onClick={() => onSelectService(service)}
                  className="bg-slate-800/90 border border-slate-700 hover:border-blue-500 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 transition cursor-pointer"
                >
                  <div>
                    <div className="text-xs text-blue-400 font-bold mb-1">
                      {lang === 'ES' ? 'Servicio #' : 'Service #'}{service.orden} &bull; {sInfo.categoria}
                    </div>
                    <h4 className="text-sm font-bold text-white">{sInfo.servicio}</h4>
                    <p className="text-xs text-slate-300 mt-1">
                      {lang === 'ES' ? 'Viabilidad:' : 'Viability:'} <strong className="text-emerald-400">{sInfo.viabilidad}</strong> &bull; {lang === 'ES' ? 'Modalidad:' : 'Modality:'} {sInfo.modalidad}
                    </p>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRequestQuote(service);
                    }}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl shrink-0 transition cursor-pointer"
                  >
                    {t.diagBtnQuote}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
};
