import React from 'react';
import { BookOpen, CheckCircle, Award, Shield, FileCheck2, Globe, ArrowRight } from 'lucide-react';
import imgTraining from '../assets/images/qssa_training_iso.jpg';
import imgAudit from '../assets/images/qssa_audit_compliance.jpg';
import imgInspection from '../assets/images/qssa_industrial_inspection.jpg';

interface StandardsTabProps {
  lang?: 'ES' | 'EN';
  onNavigateTab?: (tab: string) => void;
}

export const StandardsTab: React.FC<StandardsTabProps> = ({ lang = 'ES', onNavigateTab }) => {
  const standardsList = [
    {
      code: 'ISO 9001:2015',
      title: lang === 'ES' ? 'Sistemas de Gestión de la Calidad' : 'Quality Management Systems',
      description: lang === 'ES'
        ? 'Estándar internacional que especifica los requisitos para un sistema de gestión de la calidad cuando una organización necesita demostrar su capacidad para proporcionar productos y servicios que satisfagan los clientes y requisitos legales.'
        : 'International standard specifying requirements for a quality management system when an organization needs to demonstrate its ability to consistently provide products and services that meet customer and regulatory requirements.',
      focus: lang === 'ES' 
        ? ['Enfoque basado en procesos y gestión operativa', 'Pensamiento basado en riesgos y oportunidades', 'Satisfacción al cliente y expectativas del mercado', 'Mejora continua e innovación de servicios']
        : ['Process-based approach and operational management', 'Risk-based thinking and opportunities', 'Customer satisfaction and market expectations', 'Continuous improvement and service innovation'],
      servicesCount: lang === 'ES' ? '8 servicios mapeados' : '8 mapped services'
    },
    {
      code: 'ISO 14001:2015',
      title: lang === 'ES' ? 'Sistemas de Gestión Ambiental' : 'Environmental Management Systems',
      description: lang === 'ES'
        ? 'Especifica los requisitos para un sistema de gestión ambiental que una organización puede utilizar para mejorar su desempeño ambiental, gestionar sus aspectos e impactos y cumplir con la legislación aplicable.'
        : 'Specifies the requirements for an environmental management system that an organization can use to enhance its environmental performance, manage aspects and impacts, and fulfill compliance obligations.',
      focus: lang === 'ES'
        ? ['Matriz de aspectos e impactos ambientales', 'Cumplimiento normativo legal ambiental en Bolivia', 'Prevención activa de la contaminación industrial', 'Análisis del ciclo de vida y sostenibilidad']
        : ['Aspects and environmental impacts matrix', 'Environmental legal compliance in Bolivia', 'Active industrial pollution prevention', 'Life cycle analysis and sustainability'],
      servicesCount: lang === 'ES' ? '6 servicios mapeados' : '6 mapped services'
    },
    {
      code: 'ISO 45001:2018',
      title: lang === 'ES' ? 'Sistemas de Gestión de Seguridad y Salud en el Trabajo' : 'Occupational Health and Safety Systems',
      description: lang === 'ES'
        ? 'Proporciona un marco para gestionar los riesgos de SST y las oportunidades, permitiendo prevenir lesiones y deterioros de la salud relacionados con el trabajo en entornos operacionales.'
        : 'Provides a framework for managing OH&S risks and opportunities, enabling prevention of work-related injury and ill health in operational environments.',
      focus: lang === 'ES'
        ? ['Matriz de identificación de peligros IPERC', 'Participación y consulta activa de trabajadores', 'Planes de contingencia y respuesta a emergencias', 'Cumplimiento estricto de leyes laborales y SST']
        : ['IPERC hazard identification matrix', 'Worker consultation and active participation', 'Contingency and emergency response plans', 'Strict compliance with labor and OH&S laws'],
      servicesCount: lang === 'ES' ? '6 servicios mapeados' : '6 mapped services'
    },
    {
      code: 'ISO/IEC 17020:2012',
      title: lang === 'ES' ? 'Evaluación de la Conformidad - Organismos de Inspección' : 'Conformity Assessment - Inspection Bodies',
      description: lang === 'ES'
        ? 'Criterios generales para el funcionamiento de diferentes tipos de organismos que realizan inspección, garantizando competencia técnica, imparcialidad y consistencia en los dictámenes.'
        : 'General criteria for the operation of various types of bodies performing inspection, ensuring technical competence, impartiality, and consistency.',
      focus: lang === 'ES'
        ? ['Independencia e imparcialidad en auditorías', 'Competencia técnica certificada del personal inspector', 'Métodos estandarizados e informes oficiales de inspección']
        : ['Independence and impartiality in audits', 'Certified technical competence of inspection staff', 'Standardized methods and official inspection reports'],
      servicesCount: lang === 'ES' ? '4 servicios mapeados' : '4 mapped services'
    },
    {
      code: 'ISO/IEC 17025:2017',
      title: lang === 'ES' ? 'Competencia de Laboratorios de Ensayo y Calibración' : 'Competence of Testing & Calibration Laboratories',
      description: lang === 'ES'
        ? 'Requisitos generales para la competencia, la imparcialidad y la operación coherente de los laboratorios de ensayo y calibración acreditados.'
        : 'General requirements for the competence, impartiality and consistent operation of accredited testing and calibration laboratories.',
      focus: lang === 'ES'
        ? ['Validación y verificación rigurosa de métodos', 'Trazabilidad metrológica e incertidumbre de medición', 'Aseguramiento continuo de la validez de resultados']
        : ['Rigorous method validation and verification', 'Metrological traceability and measurement uncertainty', 'Continuous quality assurance of test results'],
      servicesCount: lang === 'ES' ? '5 servicios mapeados' : '5 mapped services'
    },
    {
      code: 'Programa OEA / ISO 28000',
      title: lang === 'ES' ? 'Seguridad en la Cadena de Suministro (Corredor Bioceánico)' : 'Supply Chain Security (Bioceanic Corridor)',
      description: lang === 'ES'
        ? 'Estándares internacionales de seguridad logística y aduanera para operadores de comercio exterior en el corredor transcontinental Bolivia - Chile - Perú.'
        : 'International logistics and customs security standards for foreign trade operators across the transcontinental Bolivia - Chile - Peru corridor.',
      focus: lang === 'ES'
        ? ['Matriz de gestión de amenazas de seguridad', 'Logística transfronteriza e inspección de carga', 'Acreditación aduanera OEA y cumplimiento internacional']
        : ['Security threats management matrix', 'Cross-border logistics and cargo inspection', 'AEO customs accreditation and international compliance'],
      servicesCount: lang === 'ES' ? '3 servicios mapeados' : '3 mapped services'
    }
  ];

  return (
    <div className="space-y-8 pb-12 font-sans">
      
      {/* PROMINENT ISO STANDARDS HIGHLIGHT SECTION (EJE PRINCIPAL) */}
      <div className="bg-gradient-to-br from-emerald-50 via-teal-50/50 to-slate-50 rounded-3xl p-6 sm:p-8 border-2 border-emerald-300 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-emerald-200/80 pb-4">
          <div>
            <span className="inline-block px-3 py-1 bg-emerald-600 text-white text-xs font-black rounded-full uppercase tracking-widest mb-2 shadow-sm">
              {lang === 'ES' ? 'EJE PRINCIPAL DE CERTIFICACIÓN & NORMATIVA' : 'MAIN CERTIFICATION & NORMATIVE AXIS'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              {lang === 'ES' ? 'Normas Técnicas Internacionales ISO' : 'ISO International Technical Standards'}
            </h2>
            <p className="text-sm sm:text-base font-bold text-slate-900 mt-1.5 text-justify leading-relaxed max-w-4xl">
              {lang === 'ES' 
                ? 'Estándares internacionales de alta exigencia para la gestión, auditoría, calidad y certificación de organizaciones en Bolivia.'
                : 'High-demanding international standards for organization management, auditing, quality and certification in Bolivia.'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl border-2 border-emerald-300 shadow-sm hover:shadow-md transition overflow-hidden group flex flex-col justify-between">
            <div>
              <div className="h-36 overflow-hidden relative">
                <img src={imgTraining} alt="ISO 9001 Calidad" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <span className="absolute top-2.5 right-2.5 px-2.5 py-0.5 bg-emerald-700 text-white text-xs font-black rounded-lg shadow">
                  Calidad
                </span>
              </div>
              <div className="p-5 space-y-2">
                <span className="text-xl font-black text-emerald-800 font-mono tracking-tight block">
                  ISO 9001:2015
                </span>
                <h3 className="text-base font-black text-slate-950">
                  Sistema de Gestión de la Calidad
                </h3>
                <p className="text-xs font-bold text-slate-800 leading-relaxed text-justify">
                  Estándar internacional que especifica los requisitos para un sistema de gestión de la calidad cuando una organización necesita demostrar su capacidad para proporcionar productos y servicios con satisfacción del cliente.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border-2 border-emerald-300 shadow-sm hover:shadow-md transition overflow-hidden group flex flex-col justify-between">
            <div>
              <div className="h-36 overflow-hidden relative">
                <img src={imgAudit} alt="ISO 14001 Ambiental" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <span className="absolute top-2.5 right-2.5 px-2.5 py-0.5 bg-teal-700 text-white text-xs font-black rounded-lg shadow">
                  Ambiental
                </span>
              </div>
              <div className="p-5 space-y-2">
                <span className="text-xl font-black text-emerald-800 font-mono tracking-tight block">
                  ISO 14001:2015
                </span>
                <h3 className="text-base font-black text-slate-950">
                  Sistema de Gestión Ambiental
                </h3>
                <p className="text-xs font-bold text-slate-800 leading-relaxed text-justify">
                  Norma internacional que permite a las empresas demostrar su compromiso con la protección del medio ambiente a través de la gestión de los riesgos e impactos ambientales asociados a la actividad.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border-2 border-emerald-300 shadow-sm hover:shadow-md transition overflow-hidden group flex flex-col justify-between">
            <div>
              <div className="h-36 overflow-hidden relative">
                <img src={imgInspection} alt="ISO 45001 Seguridad" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <span className="absolute top-2.5 right-2.5 px-2.5 py-0.5 bg-sky-700 text-white text-xs font-black rounded-lg shadow">
                  Seguridad
                </span>
              </div>
              <div className="p-5 space-y-2">
                <span className="text-xl font-black text-emerald-800 font-mono tracking-tight block">
                  ISO 45001:2018
                </span>
                <h3 className="text-base font-black text-slate-950">
                  Seguridad y Salud en el Trabajo
                </h3>
                <p className="text-xs font-bold text-slate-800 leading-relaxed text-justify">
                  Estándar para sistemas de gestión de seguridad y salud en el trabajo, diseñado para proteger a los empleados de accidentes y enfermedades laborales en entornos de campo e industriales.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Banner Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border-2 border-emerald-200/90 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3.5">
            <div className="p-3 bg-emerald-100 text-emerald-900 rounded-2xl shrink-0">
              <BookOpen className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {lang === 'ES' ? 'Normas ISO & Esquemas de Acreditación QSSA' : 'ISO Standards & QSSA Accreditation Schemes'}
              </h2>
              <p className="text-xs sm:text-sm font-black text-emerald-800 uppercase tracking-widest mt-0.5">
                {lang === 'ES' ? 'EJE CENTRAL DE NORMALIZACIÓN Y AUDITORÍA EN BOLIVIA' : 'CORE AXIS OF STANDARDIZATION & AUDITING IN BOLIVIA'}
              </p>
            </div>
          </div>
          
          {onNavigateTab && (
            <button
              onClick={() => onNavigateTab('services')}
              className="self-start sm:self-auto px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-black text-xs uppercase tracking-wider rounded-xl transition shadow-sm flex items-center space-x-2 shrink-0"
            >
              <span>{lang === 'ES' ? 'Ver Servicios Acreditados' : 'View Accredited Services'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

        <p className="text-sm sm:text-base font-bold text-slate-800 leading-relaxed text-justify border-t border-slate-100 pt-3">
          {lang === 'ES'
            ? 'Los estándares de la Organización Internacional de Normalización (ISO) definen los requisitos técnicos, de gestión y seguridad que garantizan la máxima calidad operativa. En QSSA Bolivia, la aplicación rigurosa de estas normas respalda cada auditoría, certificación y servicio técnico en todo el país.'
            : 'International Organization for Standardization (ISO) standards establish technical, management, and security requirements to ensure maximum operational excellence. At QSSA Bolivia, rigorous application of these norms backs every audit, certification, and technical service nationwide.'}
        </p>
      </div>

      {/* Standards Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {standardsList.map((std, idx) => (
          <div 
            key={idx} 
            className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm border-2 border-slate-200/90 hover:border-emerald-500 transition-all duration-200 flex flex-col justify-between space-y-5 hover:-translate-y-0.5"
          >
            <div>
              <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                <span className="bg-emerald-100 text-emerald-950 border border-emerald-300 text-xs font-black px-3 py-1 rounded-lg tracking-wide uppercase">
                  {std.code}
                </span>
                <span className="text-xs font-black text-slate-700 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-lg">
                  {std.servicesCount}
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-black text-slate-900 mb-3 leading-snug tracking-tight">
                {std.title}
              </h3>
              
              <p className="text-xs sm:text-sm font-bold text-slate-800 leading-relaxed mb-5 text-justify">
                {std.description}
              </p>

              <div className="space-y-2 pt-4 border-t-2 border-slate-100">
                <div className="text-[11px] font-black text-slate-900 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block" />
                  <span>{lang === 'ES' ? 'Pilares Clave de Evaluación:' : 'Key Assessment Pillars:'}</span>
                </div>
                {std.focus.map((f, fIdx) => (
                  <div key={fIdx} className="flex items-start space-x-2.5 text-xs sm:text-sm font-bold text-slate-900 leading-snug text-justify">
                    <CheckCircle className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

