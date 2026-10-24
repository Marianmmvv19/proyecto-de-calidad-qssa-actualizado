import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  LayoutGrid, 
  List, 
  CheckCircle2, 
  AlertTriangle, 
  Tag, 
  Send, 
  Info, 
  SlidersHorizontal,
  ChevronRight,
  ArrowUpDown,
  X,
  GraduationCap,
  BookOpen,
  Award,
  Users
} from 'lucide-react';
import { ServiceItem, ServiceFilterState } from '../types';
import { 
  CATEGORY_TRANSLATIONS, 
  VIABILITY_TRANSLATIONS, 
  DIFFICULTY_TRANSLATIONS, 
  PRIORITY_TRANSLATIONS, 
  MODALITY_TRANSLATIONS,
  getServiceText,
  UI_DICTIONARY
} from '../data/translations';

interface ServicesTabProps {
  services: ServiceItem[];
  onSelectService: (service: ServiceItem) => void;
  onRequestQuote: (service: ServiceItem) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  lang?: 'ES' | 'EN';
}

export const ServicesTab: React.FC<ServicesTabProps> = ({
  services,
  onSelectService,
  onRequestQuote,
  searchQuery,
  setSearchQuery,
  lang = 'ES'
}: ServicesTabProps) => {
  const t = UI_DICTIONARY[lang];

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedViability, setSelectedViability] = useState<string>('ALL');
  const [selectedPriority, setSelectedPriority] = useState<string>('ALL');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('ALL');
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [sortField, setSortField] = useState<'orden' | 'servicio' | 'dificultad' | 'prioridad'>('orden');
  const [sortAsc, setSortAsc] = useState<boolean>(true);

  // Extract unique categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    services.forEach(s => set.add(s.categoria));
    return Array.from(set);
  }, [services]);

  // Detect if user is viewing Formación / Capacitación
  const isFormacionSearch = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return (
      q.includes('formac') || 
      q.includes('capacit') || 
      q.includes('curso') || 
      q.includes('taller') || 
      q.includes('train') ||
      selectedCategory.toLowerCase().includes('capacit')
    );
  }, [searchQuery, selectedCategory]);

  // Filter & Sort Logic
  const filteredServices = useMemo(() => {
    return services.filter(service => {
      const sText = getServiceText(service, lang);

      // Text Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();

        if (q.includes('formac') || q.includes('capacit') || q.includes('curso') || q.includes('taller') || q.includes('train')) {
          return service.categoria.toLowerCase().includes('capacit') || service.categoria.toLowerCase().includes('formac');
        } else {
          const matchesText = 
            service.servicio.toLowerCase().includes(q) ||
            sText.servicio.toLowerCase().includes(q) ||
            service.categoria.toLowerCase().includes(q) ||
            sText.categoria.toLowerCase().includes(q) ||
            service.recursos.toLowerCase().includes(q) ||
            service.limitaciones.toLowerCase().includes(q) ||
            service.modalidad.toLowerCase().includes(q) ||
            service.orden.toString() === q;
          if (!matchesText) return false;
        }
      }

      // Category Filter
      if (selectedCategory !== 'ALL' && service.categoria !== selectedCategory) {
        return false;
      }

      // Viability Filter
      if (selectedViability !== 'ALL' && !service.viabilidad.toLowerCase().includes(selectedViability.toLowerCase())) {
        return false;
      }

      // Priority Filter
      if (selectedPriority !== 'ALL' && !service.prioridadComercial.toLowerCase().includes(selectedPriority.toLowerCase())) {
        return false;
      }

      // Difficulty Filter
      if (selectedDifficulty !== 'ALL' && !service.dificultad.includes(selectedDifficulty)) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      let comparison = 0;
      if (sortField === 'orden') {
        comparison = parseInt(a.orden, 10) - parseInt(b.orden, 10);
      } else if (sortField === 'servicio') {
        const titleA = getServiceText(a, lang).servicio;
        const titleB = getServiceText(b, lang).servicio;
        comparison = titleA.localeCompare(titleB);
      } else if (sortField === 'dificultad') {
        comparison = a.dificultad.localeCompare(b.dificultad);
      } else if (sortField === 'prioridad') {
        comparison = a.prioridadComercial.localeCompare(b.prioridadComercial);
      }
      return sortAsc ? comparison : -comparison;
    });
  }, [services, searchQuery, selectedCategory, selectedViability, selectedPriority, selectedDifficulty, sortField, sortAsc, lang]);

  const resetFilters = () => {
    setSelectedCategory('ALL');
    setSelectedViability('ALL');
    setSelectedPriority('ALL');
    setSelectedDifficulty('ALL');
    setSearchQuery('');
  };

  const hasActiveFilters = 
    selectedCategory !== 'ALL' || 
    selectedViability !== 'ALL' || 
    selectedPriority !== 'ALL' || 
    selectedDifficulty !== 'ALL' || 
    searchQuery.trim() !== '';

  const renderDifficultyBadge = (dificultad: string) => {
    if (dificultad.includes('1')) {
      return <span className="bg-emerald-50 text-emerald-700 text-xs px-2 py-0.5 rounded-md font-semibold border border-emerald-200/80">{lang === 'ES' ? '1 - Muy fácil' : '1 - Very Easy'}</span>;
    } else if (dificultad.includes('2')) {
      return <span className="bg-blue-50 text-blue-700 text-xs px-2 py-0.5 rounded-md font-semibold border border-blue-200/80">{lang === 'ES' ? '2 - Fácil' : '2 - Easy'}</span>;
    } else if (dificultad.includes('3')) {
      return <span className="bg-amber-50 text-amber-800 text-xs px-2 py-0.5 rounded-md font-semibold border border-amber-200/80">{lang === 'ES' ? '3 - Media' : '3 - Medium'}</span>;
    }
    return <span className="bg-red-50 text-red-700 text-xs px-2 py-0.5 rounded-md font-semibold border border-red-200/80">{lang === 'ES' ? '4 - Difícil' : '4 - Difficult'}</span>;
  };

  const renderPriorityBadge = (prioridad: string) => {
    if (prioridad.toLowerCase().includes('alta')) {
      return <span className="bg-purple-100 text-purple-800 text-xs px-2 py-0.5 rounded-md font-bold">{lang === 'ES' ? 'Alta' : 'High'}</span>;
    } else if (prioridad.toLowerCase().includes('media')) {
      return <span className="bg-slate-100 text-slate-800 text-xs px-2 py-0.5 rounded-md font-semibold">{lang === 'ES' ? 'Media' : 'Medium'}</span>;
    }
    return <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-md">{lang === 'ES' ? 'Baja' : 'Low'}</span>;
  };

  const renderViabilityBadge = (viabilidad: string) => {
    if (viabilidad.toLowerCase().includes('alta')) {
      return <span className="text-emerald-700 text-xs font-semibold flex items-center space-x-1"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /><span>{lang === 'ES' ? 'Alta' : 'High'}</span></span>;
    } else if (viabilidad.toLowerCase().includes('media')) {
      return <span className="text-blue-700 text-xs font-semibold flex items-center space-x-1"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" /><span>{lang === 'ES' ? 'Media' : 'Medium'}</span></span>;
    }
    return <span className="text-amber-800 text-xs font-semibold flex items-center space-x-1"><AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" /><span>{lang === 'ES' ? 'Condicionada' : 'Conditional'}</span></span>;
  };

  const isCapacitacionItem = (service: ServiceItem) => {
    return service.categoria.toLowerCase().includes('capacit') || service.categoria.toLowerCase().includes('formac');
  };

  return (
    <div className="space-y-6 pb-12 font-sans">

      {/* DEDICATED FORMACIÓN & CAPACITACIÓN EXPLANATION BANNER */}
      {isFormacionSearch && (
        <div className="bg-gradient-to-r from-emerald-50 via-teal-50/70 to-slate-50 rounded-2xl p-6 sm:p-7 border-l-8 border-l-emerald-600 border border-emerald-300 shadow-md space-y-5 animate-in fade-in duration-300">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-emerald-300/80">
            <div className="flex items-center space-x-2 text-emerald-950 text-xs sm:text-sm font-black uppercase tracking-wider bg-emerald-100 px-4 py-1.5 rounded-full border border-emerald-400 shadow-xs">
              <GraduationCap className="w-5 h-5 text-emerald-700 shrink-0" />
              <span>{t.formacionBannerBadge}</span>
            </div>
            <div className="text-xs sm:text-sm text-emerald-950 font-black bg-white px-4 py-1.5 rounded-xl border border-emerald-300 shadow-xs">
              {filteredServices.length} {t.formacionAvailable}
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              {t.formacionTitle}
            </h2>
            <p className="text-slate-900 text-sm sm:text-base md:text-lg font-semibold leading-relaxed text-justify max-w-5xl">
              {t.formacionDesc}
            </p>
          </div>

          {/* Feature Highlights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="bg-white p-4.5 rounded-xl border-2 border-emerald-200/90 shadow-sm space-y-2">
              <div className="flex items-center space-x-2.5 text-emerald-950 font-extrabold text-sm sm:text-base">
                <BookOpen className="w-5 h-5 text-emerald-700 shrink-0" />
                <span>{t.cardIsoTitle}</span>
              </div>
              <p className="text-slate-800 text-xs sm:text-sm font-semibold leading-relaxed text-justify">
                {t.cardIsoDesc}
              </p>
            </div>

            <div className="bg-white p-4.5 rounded-xl border-2 border-emerald-200/90 shadow-sm space-y-2">
              <div className="flex items-center space-x-2.5 text-emerald-950 font-extrabold text-sm sm:text-base">
                <Award className="w-5 h-5 text-emerald-700 shrink-0" />
                <span>{t.cardAuditorsTitle}</span>
              </div>
              <p className="text-slate-800 text-xs sm:text-sm font-semibold leading-relaxed text-justify">
                {t.cardAuditorsDesc}
              </p>
            </div>

            <div className="bg-white p-4.5 rounded-xl border-2 border-emerald-200/90 shadow-sm space-y-2">
              <div className="flex items-center space-x-2.5 text-emerald-950 font-extrabold text-sm sm:text-base">
                <Users className="w-5 h-5 text-emerald-700 shrink-0" />
                <span>{t.cardInHouseTitle}</span>
              </div>
              <p className="text-slate-800 text-xs sm:text-sm font-semibold leading-relaxed text-justify">
                {t.cardInHouseDesc}
              </p>
            </div>
          </div>
        </div>
      )}
      
      {/* Category Pills Header - Only show when NOT in dedicated Formación mode */}
      {!isFormacionSearch && (
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center space-x-2">
              <Tag className="w-4 h-4 text-blue-600" />
              <span>{t.categoryPillsHeader}</span>
            </h2>
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="text-xs text-red-600 hover:text-red-700 font-semibold flex items-center space-x-1 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
                <span>{t.cleanFilters}</span>
              </button>
            )}
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden sm:flex-wrap">
            <button
              onClick={() => setSelectedCategory('ALL')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition shrink-0 whitespace-nowrap cursor-pointer ${
                selectedCategory === 'ALL'
                  ? 'bg-slate-900 text-white shadow'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {t.allCategories} ({services.length})
            </button>
            {categories.map((cat, idx) => {
              const count = services.filter(s => s.categoria === cat).length;
              const isSelected = selectedCategory === cat;
              const translatedCatName = CATEGORY_TRANSLATIONS[cat]?.[lang] || cat;
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition shrink-0 whitespace-nowrap cursor-pointer ${
                    isSelected
                      ? 'bg-blue-600 text-white font-semibold shadow'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {translatedCatName} <span className="text-xs opacity-75">({count})</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Advanced Filter Bar & View Toggle */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 flex flex-wrap items-center justify-between gap-4">
        
        {/* Dropdown Filters */}
        <div className="flex flex-wrap items-center gap-3 flex-1 min-w-[280px]">
          <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider mr-1">
            <SlidersHorizontal className="w-4 h-4 text-blue-600" />
            <span>{t.filtersLabel}</span>
          </div>

          {/* Viability Select */}
          <select
            value={selectedViability}
            onChange={(e) => setSelectedViability(e.target.value)}
            className="bg-slate-50 border border-slate-300 text-slate-800 text-xs rounded-xl px-3 py-2 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="ALL">{t.viabilityAll}</option>
            <option value="Alta">{t.viabilityHigh}</option>
            <option value="Media">{t.viabilityMed}</option>
            <option value="Condicionada">{t.viabilityCond}</option>
          </select>

          {/* Priority Select */}
          <select
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
            className="bg-slate-50 border border-slate-300 text-slate-800 text-xs rounded-xl px-3 py-2 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="ALL">{t.priorityAll}</option>
            <option value="Alta">{t.priorityHigh}</option>
            <option value="Media">{t.priorityMed}</option>
            <option value="Baja">{t.priorityLow}</option>
          </select>

          {/* Difficulty Select */}
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="bg-slate-50 border border-slate-300 text-slate-800 text-xs rounded-xl px-3 py-2 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="ALL">{t.difficultyAll}</option>
            <option value="1">{t.difficulty1}</option>
            <option value="2">{t.difficulty2}</option>
            <option value="3">{t.difficulty3}</option>
            <option value="4">{t.difficulty4}</option>
          </select>

        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center space-x-2 bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setViewMode('table')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
              viewMode === 'table'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <List className="w-4 h-4" />
            <span className="hidden sm:inline">{t.viewModeTable}</span>
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
              viewMode === 'grid'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
            <span className="hidden sm:inline">{t.viewModeCards}</span>
          </button>
        </div>

      </div>

      {/* Results Banner */}
      <div className="flex items-center justify-between text-xs text-slate-600 px-1">
        <span>
          {t.showingCount} <strong className="text-slate-900">{filteredServices.length}</strong> {t.ofServices} <strong className="text-slate-900">{services.length}</strong> {t.servicesInCatalog}
        </span>
        <div className="flex items-center space-x-2">
          <span className="text-slate-400">{t.sortBy}</span>
          <button
            onClick={() => {
              if (sortField === 'orden') setSortAsc(!sortAsc);
              else { setSortField('orden'); setSortAsc(true); }
            }}
            className={`hover:text-blue-600 font-semibold cursor-pointer ${sortField === 'orden' ? 'text-blue-600' : ''}`}
          >
            {t.sortOrder}{sortField === 'orden' && (sortAsc ? ' ↑' : ' ↓')}
          </button>
          <span>&bull;</span>
          <button
            onClick={() => {
              if (sortField === 'servicio') setSortAsc(!sortAsc);
              else { setSortField('servicio'); setSortAsc(true); }
            }}
            className={`hover:text-blue-600 font-semibold cursor-pointer ${sortField === 'servicio' ? 'text-blue-600' : ''}`}
          >
            {t.sortName}{sortField === 'servicio' && (sortAsc ? ' ↑' : ' ↓')}
          </button>
        </div>
      </div>

      {/* Main Content View */}
      {filteredServices.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-sm space-y-3">
          <Search className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">{t.noServicesFound}</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            {t.noServicesFoundDesc}
          </p>
          <button
            onClick={resetFilters}
            className="mt-2 inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold hover:bg-blue-500 transition cursor-pointer"
          >
            <span>{t.resetFiltersBtn}</span>
          </button>
        </div>
      ) : viewMode === 'table' ? (
        /* TABLE VIEW */
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-800 font-extrabold uppercase tracking-wider border-b border-slate-200">
                  <th className="py-3.5 px-4 w-12 text-center">{t.thNum}</th>
                  <th className="py-3.5 px-4 min-w-[220px]">{t.thService}</th>
                  <th className="py-3.5 px-4 min-w-[180px]">{t.thCategory}</th>
                  <th className="py-3.5 px-4 min-w-[120px]">{t.thViability}</th>
                  <th className="py-3.5 px-4 min-w-[140px]">{t.thModality}</th>
                  <th className="py-3.5 px-4 min-w-[110px]">{t.thDifficulty}</th>
                  <th className="py-3.5 px-4 min-w-[100px]">{t.thPriority}</th>
                  <th className="py-3.5 px-4 text-right min-w-[130px]">{t.thAction}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredServices.map((service) => {
                  const sInfo = getServiceText(service, lang);
                  return (
                    <tr
                      key={service.id}
                      className="hover:bg-slate-50/80 transition cursor-pointer group"
                      onClick={() => onSelectService(service)}
                    >
                      <td className="py-3 px-4 text-center font-bold text-slate-400 group-hover:text-blue-600">
                        {service.orden}
                      </td>

                      <td className="py-3 px-4 font-black text-slate-900 group-hover:text-emerald-700 transition">
                        <div className="text-sm sm:text-base font-black text-slate-900 flex items-center flex-wrap gap-1.5">
                          {isCapacitacionItem(service) ? (
                            <span className="bg-emerald-100 text-emerald-950 border border-emerald-300/80 text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider shrink-0 flex items-center gap-1">
                              <GraduationCap className="w-3 h-3 text-emerald-700" />
                              <span>{t.badgeCourse}</span>
                            </span>
                          ) : (
                            <span className="bg-blue-50 text-blue-900 border border-blue-200 text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider shrink-0 flex items-center gap-1">
                              <Award className="w-3 h-3 text-blue-700" />
                              <span>{t.badgeConformity}</span>
                            </span>
                          )}
                          {service.servicio.toUpperCase().includes('ISO') && (
                            <span className="bg-slate-100 text-slate-800 border border-slate-300 text-[10px] font-black px-1.5 py-0.5 rounded uppercase shrink-0">
                              ISO
                            </span>
                          )}
                          <span>{sInfo.servicio}</span>
                        </div>
                        {service.isCustom && (
                          <span className="inline-block mt-1 bg-blue-100 text-blue-800 text-[10px] px-2 py-0.5 rounded font-bold">{t.customBadge}</span>
                        )}
                      </td>

                      <td className="py-3 px-4 text-slate-800 font-bold text-justify">
                        <div className="line-clamp-2">{sInfo.categoria}</div>
                      </td>

                      <td className="py-3 px-4">
                        {renderViabilityBadge(service.viabilidad)}
                      </td>

                      <td className="py-3 px-4 text-slate-700">
                        <span className="bg-slate-100 text-slate-800 text-[11px] px-2 py-1 rounded-md font-medium">
                          {sInfo.modalidad}
                        </span>
                      </td>

                      <td className="py-3 px-4">
                        {renderDifficultyBadge(service.dificultad)}
                      </td>

                      <td className="py-3 px-4">
                        {renderPriorityBadge(service.prioridadComercial)}
                      </td>

                      <td className="py-3 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end space-x-1">
                          <button
                            onClick={() => onSelectService(service)}
                            className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium text-[11px] transition cursor-pointer"
                          >
                            {t.btnView}
                          </button>
                          <button
                            onClick={() => onRequestQuote(service)}
                            title={t.btnQuote}
                            className="px-2.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-semibold text-[11px] transition cursor-pointer"
                          >
                            {t.btnQuote}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* GRID CARDS VIEW */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredServices.map((service) => {
            const sInfo = getServiceText(service, lang);
            return (
              <div
                key={service.id}
                onClick={() => onSelectService(service)}
                className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 hover:shadow-md hover:border-blue-300 transition duration-200 flex flex-col justify-between cursor-pointer group"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-400 group-hover:text-blue-600">
                      {t.serviceHash}{service.orden}
                    </span>
                    <div className="flex items-center space-x-1.5">
                      {renderPriorityBadge(service.prioridadComercial)}
                      {renderDifficultyBadge(service.dificultad)}
                    </div>
                  </div>

                  <div className="mb-2 space-y-1">
                    <div className="flex flex-wrap gap-1">
                      {isCapacitacionItem(service) ? (
                        <span className="bg-emerald-100 text-emerald-950 border border-emerald-300/80 text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider shrink-0 flex items-center gap-1">
                          <GraduationCap className="w-3 h-3 text-emerald-700" />
                          <span>{t.badgeCourse}</span>
                        </span>
                      ) : (
                        <span className="bg-blue-50 text-blue-900 border border-blue-200 text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider shrink-0 flex items-center gap-1">
                          <Award className="w-3 h-3 text-blue-700" />
                          <span>{t.badgeConformity}</span>
                        </span>
                      )}
                      {service.servicio.toUpperCase().includes('ISO') && (
                        <span className="bg-slate-100 text-slate-800 border border-slate-300 text-[10px] font-black px-1.5 py-0.5 rounded uppercase">
                          {t.badgeIso}
                        </span>
                      )}
                    </div>
                    <h3 className="text-base sm:text-lg font-black text-slate-900 group-hover:text-emerald-700 transition leading-snug">
                      {sInfo.servicio}
                    </h3>
                  </div>

                  <p className="text-xs font-bold text-slate-700 mb-3 line-clamp-1 text-justify">
                    {sInfo.categoria}
                  </p>

                  <div className="space-y-2 text-xs bg-slate-50 p-3 rounded-xl border border-slate-100 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600 font-bold">{t.thViability}:</span>
                      {renderViabilityBadge(service.viabilidad)}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600 font-bold">{t.thModality}:</span>
                      <span className="font-extrabold text-slate-900">{sInfo.modalidad}</span>
                    </div>
                  </div>

                  <div className="text-xs text-slate-800 font-bold line-clamp-3 mb-4 text-justify leading-relaxed">
                    "{service.limitaciones}"
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => onSelectService(service)}
                    className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center space-x-1 cursor-pointer"
                  >
                    <span>{t.btnViewDetail}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onRequestQuote(service)}
                    className="inline-flex items-center space-x-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold transition cursor-pointer"
                  >
                    <Send className="w-3 h-3" />
                    <span>{t.btnQuote}</span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
