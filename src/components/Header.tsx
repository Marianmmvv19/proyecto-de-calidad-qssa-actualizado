import React, { useState, useRef } from 'react';
import { 
  ShieldCheck, 
  Table, 
  BarChart3, 
  Sparkles, 
  FileText, 
  BookOpen, 
  Search,
  Plus,
  Building2,
  PhoneCall,
  ChevronDown,
  ArrowRight,
  Layers,
  User,
  GraduationCap,
  Lock,
  Unlock,
  AlertTriangle,
  Menu,
  X,
  Target
} from 'lucide-react';
import qssaLogo from '../assets/qssa_official_logo-4aPsr4dZ.png';
import { TabType } from '../types';

interface HeaderProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  isPortalUnlocked?: boolean;
  onUnlockPortal?: (targetTab?: TabType) => void;
  totalServicesCount: number;
  filteredCount: number;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onOpenAddModal: () => void;
  onOpenLoginModal?: () => void;
  onExportCSV: () => void;
  lang?: 'ES' | 'EN';
  onLanguageChange?: (lang: 'ES' | 'EN') => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  totalServicesCount,
  filteredCount,
  searchQuery,
  setSearchQuery,
  onOpenAddModal,
  onOpenLoginModal,
  onExportCSV,
  lang = 'ES',
  onLanguageChange
}) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [showSearchModal, setShowSearchModal] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [mobileExpandedSection, setMobileExpandedSection] = useState<string | null>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnterDropdown = (menu: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setOpenDropdown(menu);
  };

  const handleMouseLeaveDropdown = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    // Keep dropdown open for 800ms before closing so users have plenty of time
    dropdownTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 800);
  };

  const toggleDropdown = (menu: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setOpenDropdown(prev => (prev === menu ? null : menu));
  };

  const toggleMobileSection = (section: string) => {
    setMobileExpandedSection(prev => (prev === section ? null : section));
  };

  const handleSubOptionClick = (tab: TabType, searchFilter?: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setActiveTab(tab);
    if (searchFilter !== undefined) {
      setSearchQuery(searchFilter);
    }
    setOpenDropdown(null);
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-white border-b border-slate-200/80 text-slate-800 sticky top-0 z-40 shadow-sm backdrop-blur-md bg-white/95 transition-all">
      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Brand - Inspired by IBNORCA Minimalist Header */}
          <div 
            className="flex items-center space-x-2.5 sm:space-x-3.5 cursor-pointer group select-none shrink-0 min-w-0" 
            onClick={() => handleSubOptionClick('welcome')}
          >
            <img 
              src={qssaLogo} 
              alt="Logo QSSA Oficial" 
              className="w-10 h-10 sm:w-12 sm:h-12 object-contain group-hover:scale-105 transition-transform shrink-0 drop-shadow-sm" 
            />
            <div className="min-w-0">
              <div className="flex items-center space-x-1.5 sm:space-x-2">
                <span className="font-black text-lg sm:text-2xl tracking-tight text-slate-900 group-hover:text-emerald-600 transition-colors">
                  QSSA
                </span>
                <span className="bg-emerald-50 text-emerald-800 text-[9px] sm:text-[10px] uppercase font-black px-1.5 sm:px-2 py-0.5 rounded-full shrink-0">
                  Bolivia
                </span>
              </div>
              {/* Subtitle removed per user request */}
            </div>
          </div>

          {/* Right Action Icons (Matching IBNORCA Style Utility Bar) */}
          <div className="flex items-center space-x-1 sm:space-x-2.5 shrink-0">
            
            {/* Search Trigger Icon */}
            <button
              onClick={() => setShowSearchModal(!showSearchModal)}
              className="p-1.5 sm:p-2 text-slate-600 hover:text-emerald-600 hover:bg-slate-100 rounded-full transition shrink-0"
              title={lang === 'ES' ? "Buscar servicio o norma" : "Search service or standard"}
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* User Icon - Admin Login Trigger */}
            <button 
              onClick={() => {
                if (onOpenLoginModal) {
                  onOpenLoginModal();
                } else {
                  handleSubOptionClick('diagnostic');
                }
              }}
              className="p-1.5 sm:p-2 text-slate-600 hover:text-emerald-600 hover:bg-slate-100 rounded-full transition flex items-center justify-center shrink-0" 
              title={lang === 'ES' ? "Acceso Administrador" : "Admin Login"}
            >
              <User className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Language Selector Switcher */}
            <div className="flex items-center bg-slate-100 p-0.5 rounded-xl text-[11px] sm:text-xs font-bold text-slate-700 border border-slate-200 shrink-0">
              <button
                type="button"
                onClick={() => onLanguageChange && onLanguageChange('ES')}
                className={`px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-lg transition-all duration-200 ${
                  lang === 'ES' 
                    ? 'bg-emerald-600 text-white shadow-sm font-black' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Español"
              >
                <span className="sm:hidden">ES</span>
                <span className="hidden sm:inline">Español</span>
              </button>
              <button
                type="button"
                onClick={() => onLanguageChange && onLanguageChange('EN')}
                className={`px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-lg transition-all duration-200 ${
                  lang === 'EN' 
                    ? 'bg-emerald-600 text-white shadow-sm font-black' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="English"
              >
                <span className="sm:hidden">EN</span>
                <span className="hidden sm:inline">English</span>
              </button>
            </div>

            {/* Mobile Hamburger Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 sm:p-2 text-slate-800 hover:text-emerald-700 hover:bg-slate-100 rounded-xl border border-slate-200 transition flex items-center justify-center shrink-0"
              aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
            >
              {mobileMenuOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-700" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5 text-slate-800" />}
            </button>
          </div>
        </div>

        {/* Search Modal or Search Expansion Bar */}
        {showSearchModal && (
          <div className="py-3 px-2 border-t border-slate-100 animate-in fade-in slide-in-from-top-1 duration-150">
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                autoFocus
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (activeTab !== 'services') setActiveTab('services');
                }}
                placeholder="Buscar por código de norma, servicio, sector o equipo..."
                className="w-full bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 text-sm rounded-xl pl-10 pr-10 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs font-semibold text-slate-400 hover:text-slate-600"
                >
                  Limpiar
                </button>
              )}
            </div>
          </div>
        )}

        {/* MOBILE NAVIGATION DRAWER (when mobile hamburger is open) */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white rounded-b-3xl shadow-2xl p-4 my-2 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-xs font-black uppercase text-slate-400 tracking-wider">
                {lang === 'ES' ? 'Menú de Navegación QSSA' : 'QSSA Navigation Menu'}
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* 1. NOSOTROS Accordion */}
            <div className="border border-slate-200/80 rounded-2xl overflow-hidden bg-slate-50/50">
              <button
                onClick={() => toggleMobileSection('nosotros')}
                className={`w-full p-3 text-left font-extrabold text-sm flex items-center justify-between ${
                  activeTab === 'company' ? 'text-emerald-700 bg-emerald-50' : 'text-slate-800'
                }`}
              >
                <span>{lang === 'ES' ? '1. Nosotros e Institucional' : '1. About & Institutional'}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpandedSection === 'nosotros' ? 'rotate-180 text-emerald-600' : ''}`} />
              </button>

              {mobileExpandedSection === 'nosotros' && (
                <div className="p-3 bg-white border-t border-slate-200 space-y-2 text-xs font-bold">
                  {/* #1 MISIÓN Y VISIÓN FIRST */}
                  <button
                    onClick={() => handleSubOptionClick('company')}
                    className="w-full text-left p-2.5 rounded-xl bg-emerald-50 text-emerald-950 font-black flex items-center justify-between border border-emerald-200/80 shadow-sm"
                  >
                    <span className="flex items-center space-x-2">
                      <Target className="w-4 h-4 text-emerald-600" />
                      <span>{lang === 'ES' ? 'Misión, Visión y Principios' : 'Mission & Vision'}</span>
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-emerald-600" />
                  </button>
                  <button
                    onClick={() => handleSubOptionClick('company')}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-emerald-50 text-slate-800 hover:text-emerald-800 flex items-center justify-between"
                  >
                    <span>{lang === 'ES' ? 'Sobre QSSA Bolivia' : 'About QSSA Bolivia'}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-emerald-600" />
                  </button>
                  <button
                    onClick={() => handleSubOptionClick('dashboard')}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-emerald-50 text-emerald-900 bg-slate-50 font-extrabold flex items-center justify-between"
                  >
                    <span className="flex items-center space-x-2">
                      <BarChart3 className="w-4 h-4 text-emerald-600" />
                      <span>{lang === 'ES' ? 'Panel de Estadísticas y KPIs' : 'Dashboard & KPIs'}</span>
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-emerald-600" />
                  </button>
                </div>
              )}
            </div>

            {/* 2. NORMALIZACIÓN Accordion */}
            <div className="border border-slate-200/80 rounded-2xl overflow-hidden bg-slate-50/50">
              <button
                onClick={() => toggleMobileSection('normalizacion')}
                className={`w-full p-3 text-left font-extrabold text-sm flex items-center justify-between ${
                  activeTab === 'standards' ? 'text-emerald-700 bg-emerald-50' : 'text-slate-800'
                }`}
              >
                <span>{lang === 'ES' ? '2. Normalización y Normas ISO' : '2. Standardization & ISO'}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpandedSection === 'normalizacion' ? 'rotate-180 text-emerald-600' : ''}`} />
              </button>

              {mobileExpandedSection === 'normalizacion' && (
                <div className="p-3 bg-white border-t border-slate-200 space-y-2 text-xs font-bold">
                  <button
                    onClick={() => handleSubOptionClick('standards')}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-emerald-50 text-slate-800 hover:text-emerald-800 flex items-center justify-between"
                  >
                    <span>{lang === 'ES' ? 'Catálogo de Normas Técnicas' : 'Technical Standards Catalog'}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-emerald-600" />
                  </button>
                  <button
                    onClick={() => handleSubOptionClick('services', 'ISO 9001')}
                    className="w-full text-left p-2 rounded-xl hover:bg-slate-100 text-slate-700"
                  >
                    &bull; ISO 9001 ({lang === 'ES' ? 'Sistemas de Calidad' : 'Quality Systems'})
                  </button>
                  <button
                    onClick={() => handleSubOptionClick('services', 'ISO 14001')}
                    className="w-full text-left p-2 rounded-xl hover:bg-slate-100 text-slate-700"
                  >
                    &bull; ISO 14001 ({lang === 'ES' ? 'Gestión Ambiental' : 'Environmental Management'})
                  </button>
                  <button
                    onClick={() => handleSubOptionClick('services', 'ISO 45001')}
                    className="w-full text-left p-2 rounded-xl hover:bg-slate-100 text-slate-700"
                  >
                    &bull; ISO 45001 ({lang === 'ES' ? 'Salud y Seguridad' : 'Occupational Health & Safety'})
                  </button>
                </div>
              )}
            </div>

            {/* 3. FORMACIÓN Accordion */}
            <div className="border border-slate-200/80 rounded-2xl overflow-hidden bg-slate-50/50">
              <button
                onClick={() => toggleMobileSection('formacion')}
                className={`w-full p-3 text-left font-extrabold text-sm flex items-center justify-between ${
                  activeTab === 'services' && searchQuery === 'Formación' ? 'text-emerald-700 bg-emerald-50' : 'text-slate-800'
                }`}
              >
                <span>{lang === 'ES' ? '3. Formación y Capacitación' : '3. Training & Courses'}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpandedSection === 'formacion' ? 'rotate-180 text-emerald-600' : ''}`} />
              </button>

              {mobileExpandedSection === 'formacion' && (
                <div className="p-3 bg-white border-t border-slate-200 space-y-2 text-xs font-bold">
                  <button
                    onClick={() => handleSubOptionClick('services', 'Formación')}
                    className="w-full text-left p-2.5 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-950 font-black border border-emerald-200 flex items-center justify-between shadow-xs"
                  >
                    <span className="flex items-center space-x-2">
                      <GraduationCap className="w-4 h-4 text-emerald-600" />
                      <span>{lang === 'ES' ? 'Ver Todos los Cursos de Formación' : 'View All Training Courses'}</span>
                    </span>
                    <ArrowRight className="w-4 h-4 text-emerald-700" />
                  </button>

                  <div className="grid grid-cols-1 gap-1 pt-1">
                    <button
                      onClick={() => handleSubOptionClick('services', 'Formación')}
                      className="text-left p-2 rounded-xl hover:bg-slate-50 text-slate-800 flex items-center space-x-2"
                    >
                      <span className="text-emerald-600 font-bold">&rarr;</span>
                      <span>{lang === 'ES' ? 'Interpretación de Normas ISO' : 'ISO Standards Interpretation'}</span>
                    </button>
                    <button
                      onClick={() => handleSubOptionClick('services', 'ISO 17020')}
                      className="text-left p-2 rounded-xl hover:bg-slate-50 text-slate-800 flex items-center space-x-2"
                    >
                      <span className="text-emerald-600 font-bold">&rarr;</span>
                      <span>{lang === 'ES' ? 'Curso ISO/IEC 17020 (Inspección)' : 'ISO/IEC 17020 Course (Inspection)'}</span>
                    </button>
                    <button
                      onClick={() => handleSubOptionClick('services', 'ISO 17025')}
                      className="text-left p-2 rounded-xl hover:bg-slate-50 text-slate-800 flex items-center space-x-2"
                    >
                      <span className="text-emerald-600 font-bold">&rarr;</span>
                      <span>{lang === 'ES' ? 'Curso ISO/IEC 17025 (Laboratorios)' : 'ISO/IEC 17025 Course (Labs)'}</span>
                    </button>
                    <button
                      onClick={() => handleSubOptionClick('services', 'ISO 9001')}
                      className="text-left p-2 rounded-xl hover:bg-slate-50 text-slate-800 flex items-center space-x-2"
                    >
                      <span className="text-emerald-600 font-bold">&rarr;</span>
                      <span>{lang === 'ES' ? 'Formación en Sistemas ISO 9001 / 14001 / 45001' : 'ISO 9001 / 14001 / 45001 Training'}</span>
                    </button>
                    <button
                      onClick={() => handleSubOptionClick('services', 'In House')}
                      className="text-left p-2 rounded-xl hover:bg-slate-50 text-slate-800 flex items-center space-x-2"
                    >
                      <span className="text-emerald-600 font-bold">&rarr;</span>
                      <span>{lang === 'ES' ? 'Capacitaciones In-House para Empresas' : 'In-House Corporate Training'}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* 4. EVALUACIÓN DE LA CONFORMIDAD Accordion */}
            <div className="border border-slate-200/80 rounded-2xl overflow-hidden bg-slate-50/50">
              <button
                onClick={() => toggleMobileSection('conformidad')}
                className={`w-full p-3 text-left font-extrabold text-sm flex items-center justify-between ${
                  activeTab === 'services' && searchQuery !== 'Formación' ? 'text-emerald-700 bg-emerald-50' : 'text-slate-800'
                }`}
              >
                <span>{lang === 'ES' ? '4. Evaluación de la Conformidad & Matriz' : '4. Conformity Assessment & Matrix'}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpandedSection === 'conformidad' ? 'rotate-180 text-emerald-600' : ''}`} />
              </button>

              {mobileExpandedSection === 'conformidad' && (
                <div className="p-3 bg-white border-t border-slate-200 space-y-2 text-xs font-bold">
                  <button
                    onClick={() => handleSubOptionClick('services', '')}
                    className="w-full text-left p-2.5 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-950 font-black border border-emerald-200 flex items-center justify-between"
                  >
                    <span>{lang === 'ES' ? 'Ver Todos los Servicios de la Matriz' : 'View All Matrix Services'}</span>
                    <ArrowRight className="w-4 h-4 text-emerald-700" />
                  </button>

                  <div className="grid grid-cols-1 gap-1 pt-1">
                    <button
                      onClick={() => handleSubOptionClick('services', 'Inspección')}
                      className="text-left p-2 rounded-xl hover:bg-slate-50 text-slate-800 flex items-center space-x-2"
                    >
                      <span className="text-emerald-600 font-black">&rarr;</span>
                      <span>{lang === 'ES' ? 'Inspección Técnica' : 'Technical Inspection'}</span>
                    </button>
                    <button
                      onClick={() => handleSubOptionClick('services', 'Sistemas de Gestión')}
                      className="text-left p-2 rounded-xl hover:bg-slate-50 text-slate-800 flex items-center space-x-2"
                    >
                      <span className="text-emerald-600 font-black">&rarr;</span>
                      <span>{lang === 'ES' ? 'Certificación a Sistemas' : 'Systems Certification'}</span>
                    </button>
                    <button
                      onClick={() => handleSubOptionClick('services', 'Producto')}
                      className="text-left p-2 rounded-xl hover:bg-slate-50 text-slate-800 flex items-center space-x-2"
                    >
                      <span className="text-emerald-600 font-black">&rarr;</span>
                      <span>{lang === 'ES' ? 'Certificación a Producto' : 'Product Certification'}</span>
                    </button>
                    <button
                      onClick={() => handleSubOptionClick('services', 'Procesos')}
                      className="text-left p-2 rounded-xl hover:bg-slate-50 text-slate-800 flex items-center space-x-2"
                    >
                      <span className="text-emerald-600 font-black">&rarr;</span>
                      <span>{lang === 'ES' ? 'Certificación a Procesos' : 'Process Certification'}</span>
                    </button>
                    <button
                      onClick={() => handleSubOptionClick('services', 'Servicios')}
                      className="text-left p-2 rounded-xl hover:bg-slate-50 text-slate-800 flex items-center space-x-2"
                    >
                      <span className="text-emerald-600 font-black">&rarr;</span>
                      <span>{lang === 'ES' ? 'Certificación a Servicios' : 'Services Certification'}</span>
                    </button>
                    <button
                      onClick={() => handleSubOptionClick('services', 'Laboratorio')}
                      className="text-left p-2 rounded-xl hover:bg-slate-50 text-slate-800 flex items-center space-x-2"
                    >
                      <span className="text-emerald-600 font-black">&rarr;</span>
                      <span>{lang === 'ES' ? 'Ensayos de Laboratorio' : 'Laboratory Testing'}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* 5. CONTACTO Accordion */}
            <div className="border border-slate-200/80 rounded-2xl overflow-hidden bg-slate-50/50">
              <button
                onClick={() => toggleMobileSection('contacto')}
                className={`w-full p-3 text-left font-extrabold text-sm flex items-center justify-between ${
                  activeTab === 'contact' ? 'text-emerald-700 bg-emerald-50' : 'text-slate-800'
                }`}
              >
                <span>{lang === 'ES' ? '5. Contacto y Sedes QSSA' : '5. Contact & Offices'}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpandedSection === 'contacto' ? 'rotate-180 text-emerald-600' : ''}`} />
              </button>

              {mobileExpandedSection === 'contacto' && (
                <div className="p-3 bg-white border-t border-slate-200 space-y-2 text-xs font-bold">
                  <button
                    onClick={() => handleSubOptionClick('contact')}
                    className="w-full text-left p-2.5 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-950 font-black border border-emerald-200 flex items-center justify-between shadow-xs"
                  >
                    <span className="flex items-center space-x-2">
                      <PhoneCall className="w-4 h-4 text-emerald-600" />
                      <span>{lang === 'ES' ? 'Formulario de Contacto y Sede' : 'Contact Form & Headquarters'}</span>
                    </span>
                    <ArrowRight className="w-4 h-4 text-emerald-700" />
                  </button>

                  <div className="grid grid-cols-1 gap-1 pt-1">
                    <button
                      onClick={() => handleSubOptionClick('contact')}
                      className="text-left p-2 rounded-xl hover:bg-slate-50 text-slate-800 flex items-center space-x-2"
                    >
                      <span className="text-emerald-600 font-bold">&rarr;</span>
                      <span>{lang === 'ES' ? 'Sede Central Oruro (Bolivia)' : 'Oruro Headquarters (Bolivia)'}</span>
                    </button>
                    <button
                      onClick={() => handleSubOptionClick('contact')}
                      className="text-left p-2 rounded-xl hover:bg-slate-50 text-slate-800 flex items-center space-x-2"
                    >
                      <span className="text-emerald-600 font-bold">&rarr;</span>
                      <span>{lang === 'ES' ? 'Atención Nacional e Internacional' : 'Nationwide & International Support'}</span>
                    </button>
                    <button
                      onClick={() => handleSubOptionClick('contact')}
                      className="text-left p-2 rounded-xl hover:bg-slate-50 text-slate-800 flex items-center space-x-2"
                    >
                      <span className="text-emerald-600 font-bold">&rarr;</span>
                      <span>{lang === 'ES' ? 'Solicitar Cotización de Servicios' : 'Request Quotation'}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Lower Navigation Bar: Responsive 3-top / 2-bottom grid on mobile vertical, single horizontal flex row on desktop */}
        <div className="border-t border-slate-100/90 py-2">
          <nav className="flex flex-col gap-1.5 md:flex-row md:items-center md:justify-between md:space-x-2 font-sans text-xs sm:text-sm font-semibold" aria-label="Navegación Principal">
            
            {/* ROW 1 ON MOBILE (3 TABS: Nosotros, Normalización, Formación) */}
            <div className="grid grid-cols-3 gap-1 md:contents">
              
              {/* 1. NOSOTROS */}
              <div 
                className="relative shrink-0 w-full md:w-auto" 
                onMouseEnter={() => handleMouseEnterDropdown('nosotros')}
                onMouseLeave={handleMouseLeaveDropdown}
              >
                <button
                  onClick={() => toggleDropdown('nosotros')}
                  className={`w-full md:w-auto flex items-center justify-center space-x-1 px-2 sm:px-3 py-1.5 rounded-xl transition-all duration-150 whitespace-nowrap ${
                    activeTab === 'company' || openDropdown === 'nosotros'
                      ? 'text-emerald-700 bg-emerald-50 font-bold border border-emerald-200/60'
                      : 'text-slate-700 hover:text-emerald-600 hover:bg-slate-50'
                  }`}
                >
                  <span>{lang === 'ES' ? 'Nosotros' : 'About Us'}</span>
                  <ChevronDown 
                    className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${openDropdown === 'nosotros' ? 'rotate-180 text-emerald-600' : ''}`} 
                  />
                </button>

                {/* Light Minimalist Dropdown */}
                {openDropdown === 'nosotros' && (
                  <div className="absolute left-0 mt-1 w-72 sm:w-80 bg-white border border-slate-200/80 rounded-2xl shadow-2xl p-3 z-50 text-xs space-y-1.5 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="text-[10px] uppercase font-black text-slate-400 px-3 py-1 border-b border-slate-100 tracking-wider flex items-center justify-between">
                      <span>{lang === 'ES' ? 'INSTITUCIONAL' : 'INSTITUTIONAL'}</span>
                      <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded-full">QSSA</span>
                    </div>

                    {/* #1 MISIÓN Y VISIÓN - PRIORITIZED AT THE VERY TOP */}
                    <button
                      onClick={() => handleSubOptionClick('company')}
                      className="w-full text-left p-2.5 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 hover:from-emerald-100 hover:to-teal-100 text-emerald-950 font-black flex items-center justify-between transition-all border border-emerald-200/80 shadow-sm group"
                    >
                      <div className="flex items-center space-x-2">
                        <div className="p-1 rounded-lg bg-emerald-600 text-white shadow-xs group-hover:scale-105 transition-transform">
                          <Target className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-xs">{lang === 'ES' ? 'Misión, Visión y Principios QSSA' : 'Mission, Vision & QSSA Principles'}</span>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-emerald-700 group-hover:translate-x-0.5 transition-transform shrink-0" />
                    </button>

                    {/* #2 SOBRE QSSA BOLIVIA */}
                    <button
                      onClick={() => handleSubOptionClick('company')}
                      className="w-full text-left px-3 py-2 rounded-xl hover:bg-emerald-50 text-slate-800 hover:text-emerald-700 font-bold flex items-center justify-between transition-colors"
                    >
                      <span>{lang === 'ES' ? 'Sobre QSSA Bolivia' : 'About QSSA Bolivia'}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-emerald-600" />
                    </button>

                    {/* #3 PANEL DE ESTADÍSTICAS Y KPIS */}
                    <button
                      onClick={() => handleSubOptionClick('dashboard')}
                      className="w-full text-left px-3 py-2 rounded-xl hover:bg-emerald-50 text-slate-800 hover:text-emerald-700 font-bold flex items-center justify-between transition-colors border-t border-slate-100 pt-2 mt-1"
                    >
                      <span className="flex items-center space-x-2">
                        <BarChart3 className="w-4 h-4 text-emerald-600" />
                        <span>{lang === 'ES' ? 'Panel de Estadísticas y KPIs' : 'Dashboard & KPIs'}</span>
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-emerald-600" />
                    </button>
                  </div>
                )}
              </div>

              {/* 2. NORMALIZACIÓN */}
              <div 
                className="relative shrink-0 w-full md:w-auto" 
                onMouseEnter={() => handleMouseEnterDropdown('normalizacion')}
                onMouseLeave={handleMouseLeaveDropdown}
              >
                <button
                  onClick={() => toggleDropdown('normalizacion')}
                  className={`w-full md:w-auto flex items-center justify-center space-x-1 px-2 sm:px-3 py-1.5 rounded-xl transition-all duration-150 whitespace-nowrap ${
                    activeTab === 'standards' || openDropdown === 'normalizacion'
                      ? 'text-emerald-700 bg-emerald-50 font-bold border border-emerald-200/60'
                      : 'text-slate-700 hover:text-emerald-600 hover:bg-slate-50'
                  }`}
                >
                  <span>{lang === 'ES' ? 'Normalización' : 'Standardization'}</span>
                  <ChevronDown 
                    className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${openDropdown === 'normalizacion' ? 'rotate-180 text-emerald-600' : ''}`} 
                  />
                </button>

                {/* Light Dropdown */}
                {openDropdown === 'normalizacion' && (
                  <div className="absolute left-0 mt-1 w-64 sm:w-72 bg-white border border-slate-200/80 rounded-2xl shadow-2xl p-3 z-50 text-xs space-y-1 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="text-[10px] uppercase font-black text-slate-400 px-3 py-1.5 border-b border-slate-100 tracking-wider">
                      {lang === 'ES' ? 'NORMAS TÉCNICAS E ISO' : 'TECHNICAL & ISO STANDARDS'}
                    </div>
                    <button
                      onClick={() => handleSubOptionClick('standards')}
                      className="w-full text-left px-3 py-2 rounded-xl hover:bg-emerald-50 text-slate-800 hover:text-emerald-700 font-bold flex items-center justify-between transition-colors"
                    >
                      <span>{lang === 'ES' ? 'Catálogo de Normas Técnicas' : 'Technical Standards Catalog'}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-emerald-600" />
                    </button>
                    <button
                      onClick={() => handleSubOptionClick('services', 'ISO 9001')}
                      className="w-full text-left px-3 py-1.5 rounded-xl hover:bg-slate-50 text-slate-600 hover:text-emerald-700 font-medium transition-colors"
                    >
                      &bull; ISO 9001 ({lang === 'ES' ? 'Sistemas de Calidad' : 'Quality Systems'})
                    </button>
                    <button
                      onClick={() => handleSubOptionClick('services', 'ISO 14001')}
                      className="w-full text-left px-3 py-1.5 rounded-xl hover:bg-slate-50 text-slate-600 hover:text-emerald-700 font-medium transition-colors"
                    >
                      &bull; ISO 14001 ({lang === 'ES' ? 'Gestión Ambiental' : 'Environmental Management'})
                    </button>
                    <button
                      onClick={() => handleSubOptionClick('services', 'ISO 45001')}
                      className="w-full text-left px-3 py-1.5 rounded-xl hover:bg-slate-50 text-slate-600 hover:text-emerald-700 font-medium transition-colors"
                    >
                      &bull; ISO 45001 ({lang === 'ES' ? 'Salud y Seguridad' : 'Occupational Health & Safety'})
                    </button>
                  </div>
                )}
              </div>

              {/* 3. FORMACIÓN Dropdown */}
              <div 
                className="relative shrink-0 w-full md:w-auto" 
                onMouseEnter={() => handleMouseEnterDropdown('formacion')}
                onMouseLeave={handleMouseLeaveDropdown}
              >
                <button
                  onClick={() => toggleDropdown('formacion')}
                  onMouseEnter={() => setOpenDropdown('formacion')}
                  className={`w-full md:w-auto flex items-center justify-center space-x-1 px-2 sm:px-3 py-1.5 rounded-xl transition-all duration-150 whitespace-nowrap ${
                    (activeTab === 'services' && searchQuery === 'Formación') || openDropdown === 'formacion'
                      ? 'text-emerald-700 bg-emerald-50 font-bold border border-emerald-200/60'
                      : 'text-slate-700 hover:text-emerald-600 hover:bg-slate-50'
                  }`}
                >
                  <span>{lang === 'ES' ? 'Formación' : 'Training'}</span>
                  <ChevronDown 
                    className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${openDropdown === 'formacion' ? 'rotate-180 text-emerald-600' : ''}`} 
                  />
                </button>

                {/* Light Dropdown for Formación */}
                {openDropdown === 'formacion' && (
                  <div className="absolute left-0 sm:-left-4 mt-1 w-72 sm:w-80 bg-white border border-slate-200/80 rounded-2xl shadow-2xl p-3 z-50 text-xs space-y-1.5 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="text-[10px] uppercase font-black text-slate-400 px-3 py-1 border-b border-slate-100 tracking-wider flex items-center justify-between">
                      <span>{lang === 'ES' ? 'CENTRO DE CAPACITACIÓN QSSA' : 'QSSA TRAINING CENTER'}</span>
                      <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded-full">BOLIVIA</span>
                    </div>

                    <button
                      onClick={() => handleSubOptionClick('services', 'Formación')}
                      className="w-full text-left p-2.5 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 hover:from-emerald-100 hover:to-teal-100 text-emerald-950 font-black flex items-center justify-between transition-all border border-emerald-200/80 shadow-xs group"
                    >
                      <div className="flex items-center space-x-2">
                        <GraduationCap className="w-4 h-4 text-emerald-600" />
                        <span>{lang === 'ES' ? 'Ver Todos los Cursos de Formación' : 'View All Training Courses'}</span>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    </button>

                    <button
                      onClick={() => handleSubOptionClick('services', 'Formación')}
                      className="w-full text-left px-3 py-1.5 rounded-xl hover:bg-emerald-50 text-slate-800 hover:text-emerald-700 font-bold flex items-center justify-between transition-colors"
                    >
                      <span>{lang === 'ES' ? 'Interpretación de Normas ISO' : 'ISO Standards Interpretation'}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-emerald-600" />
                    </button>

                    <button
                      onClick={() => handleSubOptionClick('services', 'ISO 17020')}
                      className="w-full text-left px-3 py-1.5 rounded-xl hover:bg-slate-50 text-slate-600 hover:text-emerald-700 font-medium transition-colors"
                    >
                      &bull; {lang === 'ES' ? 'Curso ISO/IEC 17020 (Inspección)' : 'ISO/IEC 17020 Course'}
                    </button>

                    <button
                      onClick={() => handleSubOptionClick('services', 'ISO 17025')}
                      className="w-full text-left px-3 py-1.5 rounded-xl hover:bg-slate-50 text-slate-600 hover:text-emerald-700 font-medium transition-colors"
                    >
                      &bull; {lang === 'ES' ? 'Curso ISO/IEC 17025 (Laboratorios)' : 'ISO/IEC 17025 Course'}
                    </button>

                    <button
                      onClick={() => handleSubOptionClick('services', 'In House')}
                      className="w-full text-left px-3 py-1.5 rounded-xl hover:bg-slate-50 text-slate-600 hover:text-emerald-700 font-medium transition-colors"
                    >
                      &bull; {lang === 'ES' ? 'Talleres In-House para Empresas' : 'In-House Corporate Workshops'}
                    </button>
                  </div>
                )}
              </div>

            </div>

            {/* ROW 2 ON MOBILE (2 TABS: Evaluación & Matriz, Contacto) */}
            <div className="grid grid-cols-2 gap-1 md:contents">

              {/* 4. EVALUACIÓN DE LA CONFORMIDAD Y MATRIZ DE SERVICIOS */}
              <div 
                className="relative shrink-0 w-full md:w-auto" 
                onMouseEnter={() => handleMouseEnterDropdown('conformidad')}
                onMouseLeave={handleMouseLeaveDropdown}
              >
                <button
                  onClick={() => toggleDropdown('conformidad')}
                  onMouseEnter={() => setOpenDropdown('conformidad')}
                  className={`w-full md:w-auto flex items-center justify-center space-x-1 px-2 sm:px-3 py-1.5 rounded-xl transition-all duration-150 whitespace-nowrap ${
                    (activeTab === 'services' && searchQuery !== 'Formación') || openDropdown === 'conformidad'
                      ? 'text-emerald-700 bg-emerald-50 font-bold border border-emerald-200/60'
                      : 'text-slate-700 hover:text-emerald-600 hover:bg-slate-50'
                  }`}
                >
                  <span className="hidden sm:inline">{lang === 'ES' ? 'Evaluación de la Conformidad & Matriz' : 'Conformity Assessment & Services'}</span>
                  <span className="inline sm:hidden">{lang === 'ES' ? 'Evaluación & Matriz' : 'Assessment & Matrix'}</span>
                  <ChevronDown 
                    className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${openDropdown === 'conformidad' ? 'rotate-180 text-emerald-600' : ''}`} 
                  />
                </button>

                {/* Rich Light Mega-Dropdown Panel */}
                {openDropdown === 'conformidad' && (
                  <div className="absolute left-0 sm:-left-12 mt-1 w-[calc(100vw-2rem)] max-w-sm sm:max-w-md sm:w-[480px] bg-white border border-slate-200/80 rounded-3xl shadow-2xl p-4 sm:p-5 z-50 text-xs animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="mb-3 pb-2.5 border-b border-slate-100 flex items-center justify-between">
                      <div>
                        <p className="text-[11px] font-black uppercase text-emerald-800 tracking-wider">
                          {lang === 'ES' ? 'MATRIZ DE EVALUACIÓN Y CERTIFICACIÓN QSSA' : 'QSSA ASSESSMENT & CERTIFICATION MATRIX'}
                        </p>
                        <p className="text-slate-600 text-[11px] mt-0.5 font-medium">
                          {lang === 'ES' ? 'Catálogo completo con todos los servicios de acreditación y certificación.' : 'Complete catalog with all accredited services.'}
                        </p>
                      </div>
                    </div>

                    {/* Direct Link to All Services */}
                    <button
                      onClick={() => handleSubOptionClick('services', '')}
                      className="w-full text-left p-3 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200/80 text-emerald-950 font-black flex items-center justify-between transition-transform hover:scale-[1.01] mb-3 shadow-sm"
                    >
                      <div className="flex items-center space-x-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
                        <span>{lang === 'ES' ? 'Ver Todos los Servicios de la Matriz' : 'View All Matrix Services'}</span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-emerald-700" />
                    </button>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <button
                        onClick={() => handleSubOptionClick('services', 'Inspección')}
                        className="text-left p-2.5 rounded-xl hover:bg-emerald-50 text-slate-800 hover:text-emerald-700 font-bold flex items-center space-x-2 transition-colors border border-transparent hover:border-slate-200/60"
                      >
                        <span className="text-emerald-600 font-bold">&rarr;</span>
                        <span>{lang === 'ES' ? 'Inspección Técnica' : 'Technical Inspection'}</span>
                      </button>

                      <button
                        onClick={() => handleSubOptionClick('services', 'Sistemas de Gestión')}
                        className="text-left p-2.5 rounded-xl hover:bg-emerald-50 text-slate-800 hover:text-emerald-700 font-bold flex items-center space-x-2 transition-colors border border-transparent hover:border-slate-200/60"
                      >
                        <span className="text-emerald-600 font-bold">&rarr;</span>
                        <span>{lang === 'ES' ? 'Certificación a Sistemas' : 'Systems Certification'}</span>
                      </button>

                      <button
                        onClick={() => handleSubOptionClick('services', 'Producto')}
                        className="text-left p-2.5 rounded-xl hover:bg-emerald-50 text-slate-800 hover:text-emerald-700 font-bold flex items-center space-x-2 transition-colors border border-transparent hover:border-slate-200/60"
                      >
                        <span className="text-emerald-600 font-bold">&rarr;</span>
                        <span>{lang === 'ES' ? 'Certificación a Producto' : 'Product Certification'}</span>
                      </button>

                      <button
                        onClick={() => handleSubOptionClick('services', 'Procesos')}
                        className="text-left p-2.5 rounded-xl hover:bg-emerald-50 text-slate-800 hover:text-emerald-700 font-bold flex items-center space-x-2 transition-colors border border-transparent hover:border-slate-200/60"
                      >
                        <span className="text-emerald-600 font-bold">&rarr;</span>
                        <span>{lang === 'ES' ? 'Certificación a Procesos' : 'Process Certification'}</span>
                      </button>

                      <button
                        onClick={() => handleSubOptionClick('services', 'Servicios')}
                        className="text-left p-2.5 rounded-xl hover:bg-emerald-50 text-slate-800 hover:text-emerald-700 font-bold flex items-center space-x-2 transition-colors border border-transparent hover:border-slate-200/60"
                      >
                        <span className="text-emerald-600 font-bold">&rarr;</span>
                        <span>{lang === 'ES' ? 'Certificación a Servicios' : 'Services Certification'}</span>
                      </button>

                      <button
                        onClick={() => handleSubOptionClick('services', 'Laboratorio')}
                        className="text-left p-2.5 rounded-xl hover:bg-emerald-50 text-slate-800 hover:text-emerald-700 font-bold flex items-center space-x-2 transition-colors border border-transparent hover:border-slate-200/60"
                      >
                        <span className="text-emerald-600 font-bold">&rarr;</span>
                        <span>{lang === 'ES' ? 'Ensayos de Laboratorio' : 'Laboratory Testing'}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* 5. CONTACTO Dropdown */}
              <div 
                className="relative shrink-0 w-full md:w-auto" 
                onMouseEnter={() => handleMouseEnterDropdown('contacto')}
                onMouseLeave={handleMouseLeaveDropdown}
              >
                <button
                  onClick={() => toggleDropdown('contacto')}
                  onMouseEnter={() => setOpenDropdown('contacto')}
                  className={`w-full md:w-auto flex items-center justify-center space-x-1 px-3 py-1.5 rounded-xl transition-all duration-150 whitespace-nowrap ${
                    activeTab === 'contact' || openDropdown === 'contacto'
                      ? 'text-emerald-700 bg-emerald-50 font-bold border border-emerald-200/60 shadow-sm'
                      : 'text-slate-700 hover:text-emerald-600 hover:bg-slate-50'
                  }`}
                >
                  <span>{lang === 'ES' ? 'Contacto' : 'Contact'}</span>
                  <ChevronDown 
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${openDropdown === 'contacto' ? 'rotate-180' : ''}`} 
                  />
                </button>

                {/* Light Dropdown for Contacto */}
                {openDropdown === 'contacto' && (
                  <div className="absolute right-0 mt-1 w-72 sm:w-80 bg-white border border-slate-200/80 rounded-2xl shadow-2xl p-3 z-50 text-xs space-y-1.5 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="text-[10px] uppercase font-black text-slate-400 px-3 py-1 border-b border-slate-100 tracking-wider flex items-center justify-between">
                      <span>{lang === 'ES' ? 'ATENCIÓN AL CLIENTE Y SEDES' : 'CUSTOMER SUPPORT & OFFICES'}</span>
                      <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded-full">QSSA</span>
                    </div>

                    <button
                      onClick={() => handleSubOptionClick('contact')}
                      className="w-full text-left p-2.5 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 hover:from-emerald-100 hover:to-teal-100 text-emerald-950 font-black flex items-center justify-between transition-all border border-emerald-200/80 shadow-xs group"
                    >
                      <div className="flex items-center space-x-2">
                        <PhoneCall className="w-4 h-4 text-emerald-600" />
                        <span>{lang === 'ES' ? 'Formulario de Contacto y Directorio' : 'Contact Form & Directory'}</span>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    </button>

                    <button
                      onClick={() => handleSubOptionClick('contact')}
                      className="w-full text-left px-3 py-1.5 rounded-xl hover:bg-emerald-50 text-slate-800 hover:text-emerald-700 font-bold flex items-center justify-between transition-colors"
                    >
                      <span>{lang === 'ES' ? 'Sede Central Oruro (Bolivia)' : 'Oruro Headquarters (Bolivia)'}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-emerald-600" />
                    </button>

                    <button
                      onClick={() => handleSubOptionClick('contact')}
                      className="w-full text-left px-3 py-1.5 rounded-xl hover:bg-slate-50 text-slate-600 hover:text-emerald-700 font-medium transition-colors"
                    >
                      &bull; {lang === 'ES' ? 'Atención Nacional e Internacional' : 'Nationwide & International Support'}
                    </button>

                    <button
                      onClick={() => handleSubOptionClick('contact')}
                      className="w-full text-left px-3 py-1.5 rounded-xl hover:bg-slate-50 text-slate-600 hover:text-emerald-700 font-medium transition-colors border-t border-slate-100 pt-2 mt-1"
                    >
                      &bull; {lang === 'ES' ? 'Solicitar Cotización Directa' : 'Request Direct Quotation'}
                    </button>
                  </div>
                )}
              </div>

            </div>

          </nav>
        </div>
      </div>
    </header>
  );
};

