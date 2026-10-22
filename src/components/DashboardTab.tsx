import React from 'react';
import { 
  BarChart3, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles, 
  Zap, 
  TrendingUp,
  FileCheck,
  ChevronRight
} from 'lucide-react';
import { ServiceItem } from '../types';
import { CATEGORY_TRANSLATIONS, UI_DICTIONARY } from '../data/translations';

interface DashboardTabProps {
  services: ServiceItem[];
  onNavigateToServices: (filterCategory?: string) => void;
  lang?: 'ES' | 'EN';
}

export const DashboardTab: React.FC<DashboardTabProps> = ({
  services,
  onNavigateToServices,
  lang = 'ES'
}) => {
  const t = UI_DICTIONARY[lang];

  // Compute Key Analytics
  const totalServices = services.length;
  
  const highPriority = services.filter(s => s.prioridadComercial.toLowerCase().includes('alta')).length;
  const highViability = services.filter(s => s.viabilidad.toLowerCase().includes('alta')).length;
  const easyDifficulty = services.filter(s => s.dificultad.includes('1') || s.dificultad.includes('2')).length;

  // Group by category
  const categoryStats: { [cat: string]: number } = {};
  services.forEach(s => {
    categoryStats[s.categoria] = (categoryStats[s.categoria] || 0) + 1;
  });

  // Top ISO standards covered
  const isoStandards = [
    { code: 'ISO 9001', name: lang === 'ES' ? 'Gestión de la Calidad' : 'Quality Management', count: services.filter(s => s.servicio.includes('9001')).length },
    { code: 'ISO 14001', name: lang === 'ES' ? 'Gestión Ambiental' : 'Environmental Management', count: services.filter(s => s.servicio.includes('14001')).length },
    { code: 'ISO 45001', name: lang === 'ES' ? 'Seguridad y Salud en el Trabajo' : 'Occupational Health & Safety', count: services.filter(s => s.servicio.includes('45001')).length },
    { code: 'ISO/IEC 17020', name: lang === 'ES' ? 'Organismos de Inspección' : 'Inspection Bodies', count: services.filter(s => s.servicio.includes('17020')).length },
    { code: 'ISO/IEC 17025', name: lang === 'ES' ? 'Laboratorios de Ensayo/Calibración' : 'Testing & Calibration Labs', count: services.filter(s => s.servicio.includes('17025')).length },
    { code: 'OEA / ISO 28000', name: lang === 'ES' ? 'Seguridad en Cadena de Suministro' : 'Supply Chain Security (AEO)', count: services.filter(s => s.servicio.includes('OEA') || s.servicio.includes('28000')).length },
  ];

  return (
    <div className="space-y-6 pb-12 font-sans">
      
      {/* Top Banner Overview */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-slate-800">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center space-x-2 bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-xs font-semibold mb-3 border border-blue-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.dashTag}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2">
            {t.dashTitle}
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            {t.dashDesc}
          </p>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">{t.dashTotal}</span>
            <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900">{totalServices}</div>
          <p className="text-xs text-slate-500 mt-1">{t.dashTotalSub}</p>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">{t.dashPriority}</span>
            <div className="p-2 bg-purple-50 text-purple-600 rounded-xl">
              <Zap className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-purple-900">{highPriority}</div>
          <p className="text-xs text-slate-500 mt-1">{t.dashPrioritySub}</p>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">{t.dashViability}</span>
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-emerald-900">{highViability}</div>
          <p className="text-xs text-slate-500 mt-1">{t.dashViabilitySub}</p>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">{t.dashSpeed}</span>
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-indigo-900">{easyDifficulty}</div>
          <p className="text-xs text-slate-500 mt-1">{t.dashSpeedSub}</p>
        </div>

      </div>

      {/* Category Breakdown & ISO Coverage */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Categories Breakdown */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center justify-between">
            <span>{t.dashCatDistribution}</span>
            <BarChart3 className="w-5 h-5 text-slate-400" />
          </h3>

          <div className="space-y-3">
            {Object.entries(categoryStats).map(([cat, count], idx) => {
              const percentage = Math.round((count / totalServices) * 100);
              const translatedCatName = CATEGORY_TRANSLATIONS[cat]?.[lang] || cat;
              return (
                <div 
                  key={idx}
                  onClick={() => onNavigateToServices(cat)}
                  className="p-3 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/40 cursor-pointer transition"
                >
                  <div className="flex items-center justify-between text-xs font-bold text-slate-800 mb-1.5">
                    <span className="line-clamp-1">{translatedCatName}</span>
                    <span className="text-blue-600 font-extrabold">{count} ({percentage}%)</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-blue-600 h-full rounded-full transition-all duration-500" 
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ISO Standards Coverage */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center justify-between">
            <span>{t.dashIsoCoverage}</span>
            <FileCheck className="w-5 h-5 text-emerald-600" />
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {isoStandards.map((std, idx) => (
              <div 
                key={idx}
                className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 hover:border-blue-300 transition"
              >
                <div className="text-xs font-black text-blue-700 uppercase tracking-wider">{std.code}</div>
                <div className="text-sm font-bold text-slate-900 my-1">{std.name}</div>
                <div className="text-xs text-slate-500 font-medium">
                  {std.count} {lang === 'ES' ? `servicio${std.count !== 1 ? 's' : ''} en el catálogo` : `service${std.count !== 1 ? 's' : ''} in catalog`}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 pt-4 border-t border-slate-100 text-right">
            <button
              onClick={() => onNavigateToServices()}
              className="inline-flex items-center space-x-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 transition cursor-pointer"
            >
              <span>{t.dashViewCatalog}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
