import React, { useState } from 'react';
import { 
  Building2, 
  Target, 
  Eye, 
  ShieldCheck, 
  CheckCircle2, 
  Award, 
  Phone, 
  Mail, 
  Globe, 
  MapPin, 
  ArrowRight,
  Sparkles,
  Users,
  Scale,
  BarChart3,
  BookOpen,
  FileCheck2,
  HardHat
} from 'lucide-react';
import { TabType } from '../types';
import qssaLogo from '../assets/qssa_official_logo-4aPsr4dZ.png';
import imgTraining from '../assets/images/qssa_training_iso.jpg';
import imgAudit from '../assets/images/qssa_audit_compliance.jpg';
import imgInspection from '../assets/images/qssa_industrial_inspection.jpg';

interface CompanyTabProps {
  onNavigateTab: (tab: TabType) => void;
  lang?: 'ES' | 'EN';
}

export const CompanyTab: React.FC<CompanyTabProps> = ({ onNavigateTab, lang = 'ES' }) => {

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-16 font-sans text-slate-800 animate-in fade-in duration-300">
      
      {/* OVERVIEW SECTION - CONCISE & HIGH IMPACT WITH HERO PHOTO SPLIT */}
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200/80 transition-all duration-300 hover:shadow-md group overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-4">
            <span className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-black uppercase tracking-wider border border-emerald-200/80">
              {lang === 'ES' ? 'Institucional QSSA Bolivia' : 'About QSSA Bolivia'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-snug">
              {lang === 'ES' 
                ? 'Quality Standard Services Association (QSSA)' 
                : 'Quality Standard Services Association (QSSA)'}
            </h2>
            
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-bold transition-colors duration-200 group-hover:text-slate-900 text-justify">
              {lang === 'ES'
                ? 'Organización privada en Bolivia y la región orientada a fortalecer la infraestructura de la calidad empresarial. Impulsamos la competitividad y gestión transparente mediante normalización técnica, auditorías ISO y formación profesional de alto nivel.'
                : 'Private organization in Bolivia & the region dedicated to strengthening corporate quality infrastructure through ISO standardization, conformity assessment, and technical qualification.'}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-500 border-t border-slate-100 mt-4">
              <span className="flex items-center space-x-1.5 text-emerald-700 font-bold">
                <img src={qssaLogo} alt="QSSA Logo" className="w-4 h-4 object-contain inline-block" />
                <span>Acreditación ISO/IEC 17021</span>
              </span>
              <span>&bull;</span>
              <span className="flex items-center space-x-1.5 text-slate-700 font-bold">
                <Globe className="w-4 h-4 text-emerald-600" />
                <span>Red Regional Bolivia - Chile - Perú</span>
              </span>
            </div>
          </div>

          {/* Right Image Feature Card */}
          <div className="lg:col-span-5 relative rounded-2xl overflow-hidden shadow-lg border-2 border-emerald-200 group/img">
            <img 
              src={imgAudit} 
              alt="Auditorías y Cumplimiento QSSA" 
              className="w-full h-64 sm:h-72 object-cover transition-transform duration-500 group-hover/img:scale-105" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex flex-col justify-end p-5 text-white">
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-500/30 w-fit mb-1">
                Auditorías & Cumplimiento ISO
              </span>
              <p className="text-xs font-extrabold text-slate-100 leading-snug">
                Revisión integral de sistemas de gestión de la calidad en entornos corporativos.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* MISSION & VISION - SIDE BY SIDE WITH SMOOTH HOVER TRANSITIONS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Misión */}
        <div className="bg-white rounded-3xl p-7 shadow-sm border border-slate-200/80 space-y-3 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-emerald-300 group">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-200/60 transition-transform duration-300 group-hover:scale-110">
            <Target className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-black text-slate-900">
            {lang === 'ES' ? 'Nuestra Misión' : 'Our Mission'}
          </h3>
          <p className="text-sm font-bold text-slate-700 leading-relaxed transition-colors duration-200 group-hover:text-slate-900 text-justify">
            {lang === 'ES'
              ? 'Elevar la productividad y calidad de las empresas mediante certificaciones transparentes, normalización técnica actualizada y formación rigurosa de su talento humano.'
              : 'Enhancing productivity and quality across industries through impartial certification, standard implementation, and expert technical training.'}
          </p>
        </div>

        {/* Visión */}
        <div className="bg-white rounded-3xl p-7 shadow-sm border border-slate-200/80 space-y-3 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-emerald-300 group">
          <div className="w-10 h-10 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center border border-teal-200/60 transition-transform duration-300 group-hover:scale-110">
            <Eye className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-black text-slate-900">
            {lang === 'ES' ? 'Nuestra Visión' : 'Our Vision'}
          </h3>
          <p className="text-sm font-bold text-slate-700 leading-relaxed transition-colors duration-200 group-hover:text-slate-900 text-justify">
            {lang === 'ES'
              ? 'Ser el organismo referente de normalización técnica y acreditación en la región, promoviendo la cultura de la calidad, seguridad laboral y sostenibilidad ambiental.'
              : 'Becoming the leading regional standardization and accreditation body, driving quality culture, workplace safety, and environmental responsibility.'}
          </p>
        </div>

      </div>

      {/* NEW FEATURED GALLERY: ÁREAS DE EJECUCIÓN Y CAPACITACIÓN EN ACCIÓN */}
      <div className="space-y-6">
        <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
          <div>
            <span className="text-xs font-black uppercase text-emerald-700 tracking-wider">
              {lang === 'ES' ? 'Infraestructura y Servicios en Operación' : 'Operational Infrastructure & Field Execution'}
            </span>
            <h3 className="text-2xl font-black text-slate-950 tracking-tight mt-0.5">
              {lang === 'ES' ? 'Servicios de Normalización e Inspección en Acción' : 'Standardization & Inspection Services in Action'}
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Capacitaciones ISO */}
          <div className="bg-white rounded-3xl overflow-hidden border-2 border-slate-200 shadow-sm hover:shadow-md hover:border-emerald-400 transition-all duration-300 group flex flex-col justify-between">
            <div>
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={imgTraining} 
                  alt="Capacitación en Normas ISO" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <span className="absolute top-3 left-3 bg-emerald-700 text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                  Capacitación In-House
                </span>
              </div>
              <div className="p-5 space-y-2">
                <div className="flex items-center space-x-2 text-emerald-700 font-extrabold text-xs">
                  <BookOpen className="w-4 h-4" />
                  <span>Formación de Auditores ISO</span>
                </div>
                <h4 className="font-black text-slate-950 text-base">
                  Cursos de Interpretación y Auditoría Interna
                </h4>
                <p className="text-xs font-extrabold text-slate-700 leading-relaxed text-justify">
                  Seminarios corporativos presenciales y virtuales sobre ISO 9001, 14001, 45001 y 17025 para equipos directivos y técnicos.
                </p>
              </div>
            </div>
            <div className="px-5 pb-5 pt-2">
              <button 
                onClick={() => onNavigateTab('services')}
                className="w-full py-2.5 bg-slate-100 hover:bg-emerald-600 hover:text-white text-slate-900 font-black text-xs rounded-xl transition flex items-center justify-center space-x-2"
              >
                <span>Ver Capacitaciones</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 2: Auditorías de Cumplimiento */}
          <div className="bg-white rounded-3xl overflow-hidden border-2 border-slate-200 shadow-sm hover:shadow-md hover:border-emerald-400 transition-all duration-300 group flex flex-col justify-between">
            <div>
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={imgAudit} 
                  alt="Auditorías de Cumplimiento ISO" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <span className="absolute top-3 left-3 bg-blue-700 text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                  Auditoría Integrada
                </span>
              </div>
              <div className="p-5 space-y-2">
                <div className="flex items-center space-x-2 text-blue-700 font-extrabold text-xs">
                  <FileCheck2 className="w-4 h-4" />
                  <span>Evaluación de Conformidad</span>
                </div>
                <h4 className="font-black text-slate-950 text-base">
                  Auditorías de Brechas e Imparcialidad
                </h4>
                <p className="text-xs font-extrabold text-slate-700 leading-relaxed text-justify">
                  Evaluaciones independientes de sistemas de gestión para verificar cumplimiento de requisitos legales e internacionales.
                </p>
              </div>
            </div>
            <div className="px-5 pb-5 pt-2">
              <button 
                onClick={() => onNavigateTab('diagnostic')}
                className="w-full py-2.5 bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-900 font-black text-xs rounded-xl transition flex items-center justify-center space-x-2"
              >
                <span>Realizar Diagnóstico</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 3: Inspección Industrial */}
          <div className="bg-white rounded-3xl overflow-hidden border-2 border-slate-200 shadow-sm hover:shadow-md hover:border-emerald-400 transition-all duration-300 group flex flex-col justify-between">
            <div>
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={imgInspection} 
                  alt="Inspección Industrial en Planta" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <span className="absolute top-3 left-3 bg-amber-700 text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                  Inspección en Planta
                </span>
              </div>
              <div className="p-5 space-y-2">
                <div className="flex items-center space-x-2 text-amber-700 font-extrabold text-xs">
                  <HardHat className="w-4 h-4" />
                  <span>Inspección Industrial & OEA</span>
                </div>
                <h4 className="font-black text-slate-950 text-base">
                  Inspecciones ISO/IEC 17020 y Campo
                </h4>
                <p className="text-xs font-extrabold text-slate-700 leading-relaxed text-justify">
                  Verificación in situ de instalaciones industriales, cadenas de suministro y laboratorios bajo normativa internacional.
                </p>
              </div>
            </div>
            <div className="px-5 pb-5 pt-2">
              <button 
                onClick={() => onNavigateTab('standards')}
                className="w-full py-2.5 bg-slate-100 hover:bg-amber-600 hover:text-white text-slate-900 font-black text-xs rounded-xl transition flex items-center justify-center space-x-2"
              >
                <span>Ver Normas ISO</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* CORE QUALITY PRINCIPLES - RESUMIDO & MODERNO */}
      <div className="bg-white rounded-3xl p-8 text-slate-900 shadow-sm border border-slate-200/80 space-y-6 transition-all duration-300">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-4 gap-2">
          <div>
            <h3 className="text-xl font-black text-slate-900 tracking-tight">
              {lang === 'ES' ? '7 Principios de Evaluación QSSA' : '7 Core Assessment Principles'}
            </h3>
            <p className="text-xs font-bold text-slate-600 mt-1 text-justify">
              Garantía de transparencia e imparcialidad bajo directivas ISO internacionales
            </p>
          </div>
          <button
            onClick={() => onNavigateTab('services')}
            className="self-start sm:self-auto inline-flex items-center space-x-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition shadow-sm"
          >
            <span>Explorar Servicios</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          {[
            { title: '1. Imparcialidad', desc: 'Independencia objetiva libre de conflictos de interés.' },
            { title: '2. Competencia Técnica', desc: 'Auditores calificados bajo estándar ISO/IEC 17021.' },
            { title: '3. Responsabilidad', desc: 'Decisiones fundamentadas en evidencia verificable.' },
            { title: '4. Transparencia', desc: 'Acceso público a la validez de los certificados expedidos.' },
            { title: '5. Confidencialidad', desc: 'Protección estricta de los datos técnicos del cliente.' },
            { title: '6. Enfoque en Riesgos', desc: 'Evaluación integral de riesgos normativos e industriales.' }
          ].map((item, idx) => (
            <div 
              key={idx} 
              className="bg-slate-50/80 p-4 rounded-2xl border border-slate-200/80 hover:border-emerald-500/50 transition-all duration-200 space-y-1.5"
            >
              <div className="font-black text-emerald-800 text-sm">{item.title}</div>
              <p className="text-slate-800 font-bold leading-relaxed text-[11px] text-justify">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* PANEL & ESTADÍSTICAS HIGHLIGHT */}
      <div className="bg-gradient-to-r from-emerald-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 rounded-full text-xs font-black uppercase tracking-wider">
            <BarChart3 className="w-3.5 h-3.5 text-emerald-400" />
            <span>{lang === 'ES' ? 'Panel de Control Institucional' : 'Institutional Dashboard'}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black tracking-tight">
            {lang === 'ES' ? 'Estadísticas e Indicadores de Servicios QSSA' : 'QSSA Service Metrics & Analytics'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 font-medium max-w-2xl text-justify">
            {lang === 'ES' 
              ? 'Acceda al panel con métricas detalladas por sector industrial, modalidad de ejecución, porcentaje de viabilidad y distribución de la oferta acreditada.'
              : 'Access the dashboard with detailed metrics by industrial sector, execution modality, viability percentages and service distribution.'}
          </p>
        </div>
        <button
          onClick={() => onNavigateTab('dashboard')}
          className="self-start sm:self-auto px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl transition shadow-lg flex items-center space-x-2 shrink-0"
        >
          <span>{lang === 'ES' ? 'Abrir Panel' : 'Open Dashboard'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};

