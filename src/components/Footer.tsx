import React from 'react';
import qssaLogo from '../assets/qssa_official_logo-4aPsr4dZ.png';

interface FooterProps {
  totalServices: number;
  onExportCSV?: () => void;
  lang?: 'ES' | 'EN';
}

export const Footer: React.FC<FooterProps> = ({ totalServices, lang = 'ES' }) => {
  return (
    <footer className="bg-gradient-to-r from-emerald-50/70 via-white to-teal-50/70 border-t-2 border-emerald-200/80 py-8 text-xs font-sans shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        
        <div className="flex items-center space-x-3.5">
          <img 
            src={qssaLogo} 
            alt="Logo QSSA Oficial" 
            className="w-10 h-10 object-contain shrink-0 drop-shadow-sm" 
          />
          <div>
            <div className="text-slate-950 font-black text-sm sm:text-base tracking-wide">
              QUALITY STANDARD SERVICES ASSOCIATION S.R.L. (QSSA BOLIVIA)
            </div>
            <p className="text-slate-700 text-xs mt-0.5 font-bold">
              {lang === 'ES' 
                ? `Normalización, Certificación y Evaluación de la Conformidad • ${totalServices} Servicios en Bolivia`
                : `Standardization, Certification & Conformity Assessment • ${totalServices} Services in Bolivia`}
            </p>
          </div>
        </div>

        <div className="text-center md:text-right border-t md:border-t-0 border-emerald-200/60 pt-4 md:pt-0 w-full md:w-auto">
          <p className="text-slate-950 font-black text-xs">
            © 2026 Quality Standard Services Association S.R.L.
          </p>
          <p className="text-slate-600 text-[11px] font-bold mt-0.5">
            {lang === 'ES' ? 'Todos los derechos reservados.' : 'All rights reserved.'}
          </p>
        </div>

      </div>
    </footer>
  );
};
