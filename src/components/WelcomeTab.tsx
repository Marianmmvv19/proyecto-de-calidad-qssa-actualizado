import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Globe, 
  Award, 
  ArrowRight, 
  Sun, 
  CheckCircle2, 
  Building2, 
  FileCheck2, 
  Sparkles,
  BarChart3,
  Users,
  Compass
} from 'lucide-react';
import { TabType } from '../types';
import heroBgImage from '../assets/images/qssa_hero_bg_1784953559107.jpg';
import qssaLogo from '../assets/images/qssa_home_logo.png';
import imgTraining from '../assets/images/qssa_training_iso.jpg';
import imgAudit from '../assets/images/qssa_audit_compliance.jpg';
import imgRefinery from '../assets/images/qssa_refinery_left.png';

interface WelcomeTabProps {
  onEnterPortal: (tab?: TabType) => void;
  isPortalUnlocked?: boolean;
  totalServicesCount: number;
  lang?: 'ES' | 'EN';
  onLanguageChange?: (lang: 'ES' | 'EN') => void;
}

export const WelcomeTab: React.FC<WelcomeTabProps> = ({
  onEnterPortal,
  isPortalUnlocked,
  totalServicesCount,
  lang = 'ES',
  onLanguageChange
}) => {

  const content = {
    ES: {
      tagline: 'EFICIENCIA · CALIDAD · CONFIANZA · ESTANDARIZACIÓN',
      title1: 'QUALITY STANDARD',
      title2: 'SERVICES',
      title3: 'ASSOCIATION S.R.L.',
      subtitle: 'Líderes en estandarización, capacitación y certificación de sistemas de gestión en Bolivia y la región.',
      btnEnter: 'INGRESAR AL PORTAL →',
      accreditorTitle: 'ORGANISMO DE ACREDITACIÓN',
      accreditorValue: 'QSSA Organismo Regional de Normalización',
      competenceTitle: 'COMPETENCIA TÉCNICA',
      competenceValue: 'ISO/IEC 17021 · ISO/IEC 17024 · ISO/IEC 17025',
      stats: [
        { label: 'Servicios de Calidad y Normalización', value: totalServicesCount.toString() },
        { label: 'Cobertura Institucional', value: 'Bolivia · Chile · Perú' },
        { label: 'Sistemas de Gestión ISO', value: '100% Certificables' },
      ],
      categoriesTitle: 'Catálogo de Normalización y Servicios QSSA',
      categoriesSubtitle: 'Acceda a nuestro portafolio especializado inspirado en estándares internacionales de calidad.'
    },
    EN: {
      tagline: 'EFFICIENCY · QUALITY · TRUST · STANDARDIZATION',
      title1: 'QUALITY STANDARD',
      title2: 'SERVICES',
      title3: 'ASSOCIATION S.R.L.',
      subtitle: 'Leaders in standardization, training and certification of management systems in Bolivia and the region.',
      btnEnter: 'ENTER PORTAL →',
      accreditorTitle: 'ACCREDITATION BODY',
      accreditorValue: 'QSSA Regional Standardization Body',
      competenceTitle: 'TECHNICAL COMPETENCE',
      competenceValue: 'ISO/IEC 17021 · ISO/IEC 17024 · ISO/IEC 17025',
      stats: [
        { label: 'Quality & Standardization Services', value: totalServicesCount.toString() },
        { label: 'Institutional Coverage', value: 'Bolivia · Chile · Peru' },
        { label: 'ISO Management Systems', value: '100% Certifiable' },
      ],
      categoriesTitle: 'QSSA Standardization & Services Catalog',
      categoriesSubtitle: 'Access our specialized portfolio inspired by international quality standards.'
    }
  }[lang];

  return (
    <div className="space-y-12 pb-16 font-sans">
      
      {/* HERO SECTION (Original Color Theme with Blended Left Refinery Image) */}
      <div className="relative rounded-3xl overflow-hidden shadow-sm border border-slate-200/90 bg-white min-h-[500px] flex flex-col justify-between p-6 sm:p-10 lg:p-12 text-slate-900 welcome-hero-enter">
        
        {/* Left Ambient Industrial Refinery Image (High Visibility & Elegantly Blended) */}
        <div className="absolute top-0 left-0 bottom-0 w-full sm:w-7/12 pointer-events-none overflow-hidden rounded-l-3xl">
          <img 
            src={imgRefinery} 
            alt="Planta Industrial QSSA" 
            className="w-full h-full object-cover object-left opacity-75 sm:opacity-85 filter contrast-115 transition-opacity duration-500" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/70 to-white" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-white/50" />
        </div>

        {/* Subtle Ambient Soft Glows */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-100/60 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-teal-100/60 rounded-full blur-3xl pointer-events-none" />

        {/* Hero Middle Content */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-4">
          
          {/* Left Text Block */}
          <div className="lg:col-span-7 space-y-6 welcome-copy-enter">
            
            {/* Tagline */}
            <div className="text-emerald-700 text-xs font-black tracking-widest uppercase flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block animate-pulse" />
              <span>{content.tagline}</span>
            </div>

            {/* Title - ASSOCIATION S.R.L. in Solid Black */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight leading-[1.08]">
              {content.title1} <br />
              {content.title2} <br />
              <span className="text-slate-950 block transition-colors duration-300 hover:text-emerald-700">
                {content.title3}
              </span>
            </h1>

            {/* Subtitle - Justified and Bold */}
            <p className="text-sm sm:text-base text-slate-700 font-bold leading-relaxed max-w-xl text-justify">
              {content.subtitle}
            </p>

            {/* CTA Button: INGRESAR AL PORTAL */}
            <div className="pt-2">
              <button
                onClick={() => onEnterPortal('company')}
                className="group relative inline-flex items-center space-x-3 px-9 py-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-black text-sm tracking-wide shadow-lg shadow-emerald-600/20 hover:scale-[1.03] active:scale-95 transition-all duration-300 animate-pulse-glow"
              >
                <span className="text-white uppercase tracking-wider">{content.btnEnter}</span>
              </button>
            </div>

          </div>

          {/* Right Logo Display */}
          <div className="lg:col-span-5 flex justify-center items-center p-4 welcome-logo-enter">
            <img 
              src={qssaLogo} 
              alt="Logo Oficial QSSA" 
              className="w-56 h-auto sm:w-72 lg:w-full lg:max-w-[20rem] object-contain drop-shadow-xl"
            />
          </div>

        </div>

        {/* Hero Bottom Badges */}
        <div className="relative z-10 pt-6 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-4 welcome-badges-enter">
          
          <div className="bg-slate-50/80 rounded-2xl p-4 border border-slate-200/80 flex items-center space-x-3.5 hover:border-emerald-500/50 transition shadow-sm">
            <div className="p-2.5 bg-emerald-100 text-emerald-800 rounded-xl">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                {content.accreditorTitle}
              </div>
              <div className="text-xs sm:text-sm font-black text-slate-900 mt-0.5">
                {content.accreditorValue}
              </div>
            </div>
          </div>

          <div className="bg-slate-50/80 rounded-2xl p-4 border border-slate-200/80 flex items-center space-x-3.5 hover:border-teal-500/50 transition shadow-sm">
            <div className="p-2.5 bg-teal-100 text-teal-800 rounded-xl">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                {content.competenceTitle}
              </div>
              <div className="text-xs sm:text-sm font-black text-slate-900 mt-0.5">
                {content.competenceValue}
              </div>
            </div>
          </div>

        </div>

        {/* Quick Stats Grid inside Hero Box */}
        <div className="relative z-10 pt-6 border-t border-slate-200 grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {content.stats.map((st, idx) => (
            <div 
              key={idx} 
              className="bg-slate-50/80 rounded-2xl p-5 border border-slate-200/80 text-center hover:border-emerald-500/50 transition-all duration-200 hover:-translate-y-0.5 shadow-sm"
            >
              <div className="text-2xl sm:text-3xl font-black text-slate-900 mb-1 tracking-tight">{st.value}</div>
              <div className="text-[11px] font-extrabold text-emerald-700 uppercase tracking-wider">{st.label}</div>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
};
