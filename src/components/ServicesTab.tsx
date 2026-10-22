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
}) => {
  // Filter states
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedViability, setSelectedViability] = useState<string>('ALL');
  const [selectedPriority, setSelectedPriority] = useState<string>('ALL');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('ALL');
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [sortField, setSortField] = useState<'orden' | 'servicio' | 'dificultad' | 'prioridad'>('orden');
  const [sortAsc, setSortAsc] = useState<boolean>(true);
  const [formacionSubTab, setFormacionSubTab] = useState<'all' | 'cursos' | 'matriz'>('all');

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
      selectedCategory.toLowerCase().includes('capacit')
    );
  }, [searchQuery, selectedCategory]);

  // Filter & Sort Logic
  const filteredServices = useMemo(() => {
    return services.filter(service => {
      // Text Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();

        // Special handling for Formación / Capacitación / Cursos
        if (q.includes('formac') || q.includes('capacit') || q.includes('curso') || q.includes('taller')) {
          return service.categoria.toLowerCase().includes('capacit') || service.categoria.toLowerCase().includes('formac');
        } else {
          // Standard text matching
          const matchesText = 
            service.servicio.toLowerCase().includes(q) ||
            service.categoria.toLowerCase().includes(q) ||
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
      if (selectedDifficulty !== 'ALL' && !service.dificultad.toLowerCase().includes(selectedDifficulty.toLowerCase())) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      let result = 0;
      if (sortField === 'orden') {
        result = parseInt(a.orden) - parseInt(b.orden);
      } else if (sortField === 'servicio') {
        result = a.servicio.localeCompare(b.servicio);
      } else if (sortField === 'prioridad') {
        result = a.prioridadComercial.localeCompare(b.prioridadComercial);
      } else if (sortField === 'dificultad') {
        result = a.dificultad.localeCompare(b.dificultad);
      }
      return sortAsc ? result : -result;
    });
  }, [services, searchQuery, selectedCategory, selectedViability, selectedPriority, selectedDifficulty, sortField, sortAsc, formacionSubTab]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('ALL');
    setSelectedViability('ALL');
    setSelectedPriority('ALL');
    setSelectedDifficulty('ALL');
  };

  const hasActiveFilters = searchQuery || selectedCategory !== 'ALL' || selectedViability !== 'ALL' || selectedPriority !== 'ALL' || selectedDifficulty !== 'ALL';

  // Helper Badge Renderers
  const renderDifficultyBadge = (dificultad: string) => {
    if (dificultad.includes('1')) {
      return <span className="bg-emerald-50 text-emerald-700 text-xs px-2 py-0.5 rounded-md font-semibold border border-emerald-200/80">1 - Muy fácil</span>;
    } else if (dificultad.includes('2')) {
      return <span className="bg-blue-50 text-blue-700 text-xs px-2 py-0.5 rounded-md font-semibold border border-blue-200/80">2 - Fácil</span>;
    } else if (dificultad.includes('3')) {
      return <span className="bg-amber-50 text-amber-800 text-xs px-2 py-0.5 rounded-md font-semibold border border-amber-200/80">3 - Media</span>;
    }
    return <span className="bg-red-50 text-red-700 text-xs px-2 py-0.5 rounded-md font-semibold border border-red-200/80">4 - Difícil</span>;
  };

  const renderPriorityBadge = (prioridad: string) => {
    if (prioridad.toLowerCase().includes('alta')) {
      return <span className="bg-purple-100 text-purple-800 text-xs px-2 py-0.5 rounded-md font-bold">Alta</span>;
    } else if (prioridad.toLowerCase().includes('media')) {
      return <span className="bg-slate-100 text-slate-800 text-xs px-2 py-0.5 rounded-md font-semibold">Media</span>;
    }
    return <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-md">Baja</span>;
  };

  const renderViabilityBadge = (viabilidad: string) => {
    if (viabilidad.toLowerCase().includes('alta')) {
      return <span className="text-emerald-700 text-xs font-semibold flex items-center space-x-1"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /><span>Alta</span></span>;
    } else if (viabilidad.toLowerCase().includes('media')) {
      return <span className="text-blue-700 text-xs font-semibold flex items-center space-x-1"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" /><span>Media</span></span>;
    }
    return <span className="text-amber-800 text-xs font-semibold flex items-center space-x-1"><AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" /><span>Condicionada</span></span>;
  };

  const isCapacitacionItem = (service: ServiceItem) => {
    return service.categoria.toLowerCase().includes('capacit') || service.categoria.toLowerCase().includes('formac');
  };

  return (
    <div className="space-y-6 pb-12">

      {/* DEDICATED FORMACIÓN & CAPACITACIÓN EXPLANATION BANNER (ENHANCED READABILITY & JUSTIFIED) */}
      {isFormacionSearch && (
        <div className="bg-gradient-to-r from-emerald-50 via-teal-50/70 to-slate-50 rounded-2xl p-6 sm:p-7 border-l-8 border-l-emerald-600 border border-emerald-300 shadow-md space-y-5 animate-in fade-in duration-300">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-emerald-300/80">
            <div className="flex items-center space-x-2 text-emerald-950 text-xs sm:text-sm font-black uppercase tracking-wider bg-emerald-100 px-4 py-1.5 rounded-full border border-emerald-400 shadow-xs">
              <GraduationCap className="w-5 h-5 text-emerald-700 shrink-0" />
              <span>Centro de Formación & Capacitación Técnica QSSA Bolivia</span>
            </div>
            <div className="text-xs sm:text-sm text-emerald-950 font-black bg-white px-4 py-1.5 rounded-xl border border-emerald-300 shadow-xs">
              {filteredServices.length} Cursos de Formación Disponibles
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              Cursos de Formación y Capacitación Técnica Profesional
            </h2>
            <p className="text-slate-900 text-sm sm:text-base md:text-lg font-semibold leading-relaxed text-justify max-w-5xl">
              Esta sección está dedicada exclusivamente a la <strong className="font-black text-emerald-950 bg-emerald-100/80 px-1 py-0.5 rounded">formación técnica continua, capacitación profesional e interpretación de normas internacionales</strong> para personal de empresas, laboratorios, organismos de inspección y sectores industriales en Bolivia.
            </p>
          </div>

          {/* Feature Highlights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="bg-white p-4.5 rounded-xl border-2 border-emerald-200/90 shadow-sm space-y-2">
              <div className="flex items-center space-x-2.5 text-emerald-950 font-extrabold text-sm sm:text-base">
                <BookOpen className="w-5 h-5 text-emerald-700 shrink-0" />
                <span>Interpretación de Normas ISO</span>
              </div>
              <p className="text-slate-800 text-xs sm:text-sm font-semibold leading-relaxed text-justify">
                Cursos especializados en la interpretación práctica de normas <strong>ISO/IEC 17020, 17025, 9001, 14001 y 45001</strong> con ejercicios y casos reales.
              </p>
            </div>

            <div className="bg-white p-4.5 rounded-xl border-2 border-emerald-200/90 shadow-sm space-y-2">
              <div className="flex items-center space-x-2.5 text-emerald-950 font-extrabold text-sm sm:text-base">
                <Award className="w-5 h-5 text-emerald-700 shrink-0" />
                <span>Formación de Auditores e Inspectores</span>
              </div>
              <p className="text-slate-800 text-xs sm:text-sm font-semibold leading-relaxed text-justify">
                Capacitación intensiva para <strong>auditores internos y cualificación de inspectores</strong> de campo con enfoque en gestión del riesgo.
              </p>
            </div>

            <div className="bg-white p-4.5 rounded-xl border-2 border-emerald-200/90 shadow-sm space-y-2">
              <div className="flex items-center space-x-2.5 text-emerald-950 font-extrabold text-sm sm:text-base">
                <Users className="w-5 h-5 text-emerald-700 shrink-0" />
                <span>Modalidades In-House & Moodle</span>
              </div>
              <p className="text-slate-800 text-xs sm:text-sm font-semibold leading-relaxed text-justify">
                Talleres presenciales personalizados <strong>"In-House"</strong> para empresas o cursos virtuales con evaluación en aula Moodle y certificado.
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
              <span>Categorías de Servicios QSSA</span>
            </h2>
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="text-xs text-red-600 hover:text-red-700 font-semibold flex items-center space-x-1"
              >
                <X className="w-3.5 h-3.5" />
                <span>Limpiar Filtros</span>
              </button>
            )}
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden sm:flex-wrap">
            <button
              onClick={() => setSelectedCategory('ALL')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition shrink-0 whitespace-nowrap ${
                selectedCategory === 'ALL'
                  ? 'bg-slate-900 text-white shadow'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Todas las Categorías ({services.length})
            </button>
            {categories.map((cat, idx) => {
              const count = services.filter(s => s.categoria === cat).length;
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition shrink-0 whitespace-nowrap ${
                    isSelected
                      ? 'bg-blue-600 text-white font-semibold shadow'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {cat} <span className="text-xs opacity-75">({count})</span>
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
            <span>Filtros:</span>
          </div>

          {/* Viability Select */}
          <select
            value={selectedViability}
            onChange={(e) => setSelectedViability(e.target.value)}
            className="bg-slate-50 border border-slate-300 text-slate-800 text-xs rounded-xl px-3 py-2 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="ALL">Viabilidad (Todas)</option>
            <option value="Alta">Viabilidad Alta</option>
            <option value="Media">Viabilidad Media</option>
            <option value="Condicionada">Viabilidad Condicionada</option>
          </select>

          {/* Priority Select */}
          <select
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
            className="bg-slate-50 border border-slate-300 text-slate-800 text-xs rounded-xl px-3 py-2 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="ALL">Prioridad Comercial (Todas)</option>
            <option value="Alta">Prioridad Alta</option>
            <option value="Media">Prioridad Media</option>
            <option value="Baja">Prioridad Baja</option>
          </select>

          {/* Difficulty Select */}
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="bg-slate-50 border border-slate-300 text-slate-800 text-xs rounded-xl px-3 py-2 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="ALL">Dificultad (Todas)</option>
            <option value="1">1 - Muy Fácil</option>
            <option value="2">2 - Fácil</option>
            <option value="3">3 - Media</option>
            <option value="4">4 - Difícil</option>
          </select>

        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center space-x-2 bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setViewMode('table')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              viewMode === 'table'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <List className="w-4 h-4" />
            <span className="hidden sm:inline">Tabla</span>
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              viewMode === 'grid'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
            <span className="hidden sm:inline">Tarjetas</span>
          </button>
        </div>

      </div>

      {/* Results Banner */}
      <div className="flex items-center justify-between text-xs text-slate-600 px-1">
        <span>
          Mostrando <strong className="text-slate-900">{filteredServices.length}</strong> de <strong className="text-slate-900">{services.length}</strong> servicios en el catálogo
        </span>
        <div className="flex items-center space-x-2">
          <span className="text-slate-400">Ordenar por:</span>
          <button
            onClick={() => {
              if (sortField === 'orden') setSortAsc(!sortAsc);
              else { setSortField('orden'); setSortAsc(true); }
            }}
            className={`hover:text-blue-600 font-semibold ${sortField === 'orden' ? 'text-blue-600' : ''}`}
          >
            Orden #{sortField === 'orden' && (sortAsc ? ' ↑' : ' ↓')}
          </button>
          <span>&bull;</span>
          <button
            onClick={() => {
              if (sortField === 'servicio') setSortAsc(!sortAsc);
              else { setSortField('servicio'); setSortAsc(true); }
            }}
            className={`hover:text-blue-600 font-semibold ${sortField === 'servicio' ? 'text-blue-600' : ''}`}
          >
            Nombre{sortField === 'servicio' && (sortAsc ? ' ↑' : ' ↓')}
          </button>
        </div>
      </div>

      {/* Main Content View */}
      {filteredServices.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-sm space-y-3">
          <Search className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">No se encontraron servicios</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            No hay ningún servicio que coincida con la combinación de filtros seleccionados o el término de búsqueda.
          </p>
          <button
            onClick={resetFilters}
            className="mt-2 inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold hover:bg-blue-500 transition"
          >
            <span>Restablecer Filtros</span>
          </button>
        </div>
      ) : viewMode === 'table' ? (
        /* TABLE VIEW */
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-800 font-extrabold uppercase tracking-wider border-b border-slate-200">
                  <th className="py-3.5 px-4 w-12 text-center">#</th>
                  <th className="py-3.5 px-4 min-w-[220px]">Servicio / Norma ISO</th>
                  <th className="py-3.5 px-4 min-w-[180px]">Categoría</th>
                  <th className="py-3.5 px-4 min-w-[120px]">Viabilidad</th>
                  <th className="py-3.5 px-4 min-w-[140px]">Modalidad</th>
                  <th className="py-3.5 px-4 min-w-[110px]">Dificultad</th>
                  <th className="py-3.5 px-4 min-w-[100px]">Prioridad</th>
                  <th className="py-3.5 px-4 text-right min-w-[130px]">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredServices.map((service) => (
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
                            <span>CURSO / FORMACIÓN</span>
                          </span>
                        ) : (
                          <span className="bg-blue-50 text-blue-900 border border-blue-200 text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider shrink-0 flex items-center gap-1">
                            <Award className="w-3 h-3 text-blue-700" />
                            <span>EVALUACIÓN CONFORMIDAD</span>
                          </span>
                        )}
                        {service.servicio.toUpperCase().includes('ISO') && (
                          <span className="bg-slate-100 text-slate-800 border border-slate-300 text-[10px] font-black px-1.5 py-0.5 rounded uppercase shrink-0">
                            ISO
                          </span>
                        )}
                        <span>{service.servicio}</span>
                      </div>
                      {service.isCustom && (
                        <span className="inline-block mt-1 bg-blue-100 text-blue-800 text-[10px] px-2 py-0.5 rounded font-bold">Personalizado</span>
                      )}
                    </td>

                    <td className="py-3 px-4 text-slate-800 font-bold text-justify">
                      <div className="line-clamp-2">{service.categoria}</div>
                    </td>

                    <td className="py-3 px-4">
                      {renderViabilityBadge(service.viabilidad)}
                    </td>

                    <td className="py-3 px-4 text-slate-700">
                      <span className="bg-slate-100 text-slate-800 text-[11px] px-2 py-1 rounded-md font-medium">
                        {service.modalidad}
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
                          className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium text-[11px] transition"
                        >
                          Ver
                        </button>
                        <button
                          onClick={() => onRequestQuote(service)}
                          title="Cotizar servicio"
                          className="px-2.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-semibold text-[11px] transition"
                        >
                          Cotizar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* GRID CARDS VIEW */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              onClick={() => onSelectService(service)}
              className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 hover:shadow-md hover:border-blue-300 transition duration-200 flex flex-col justify-between cursor-pointer group"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-400 group-hover:text-blue-600">
                    Servicio #{service.orden}
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
                        <span>CURSO / FORMACIÓN</span>
                      </span>
                    ) : (
                      <span className="bg-blue-50 text-blue-900 border border-blue-200 text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider shrink-0 flex items-center gap-1">
                        <Award className="w-3 h-3 text-blue-700" />
                        <span>EVALUACIÓN CONFORMIDAD</span>
                      </span>
                    )}
                    {service.servicio.toUpperCase().includes('ISO') && (
                      <span className="bg-slate-100 text-slate-800 border border-slate-300 text-[10px] font-black px-1.5 py-0.5 rounded uppercase">
                        ESTÁNDAR ISO
                      </span>
                    )}
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-slate-900 group-hover:text-emerald-700 transition leading-snug">
                    {service.servicio}
                  </h3>
                </div>

                <p className="text-xs font-bold text-slate-700 mb-3 line-clamp-1 text-justify">
                  {service.categoria}
                </p>

                <div className="space-y-2 text-xs bg-slate-50 p-3 rounded-xl border border-slate-100 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600 font-bold">Viabilidad:</span>
                    {renderViabilityBadge(service.viabilidad)}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600 font-bold">Modalidad:</span>
                    <span className="font-extrabold text-slate-900">{service.modalidad}</span>
                  </div>
                </div>

                <div className="text-xs text-slate-800 font-bold line-clamp-3 mb-4 text-justify leading-relaxed">
                  "{service.limitaciones}"
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2" onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={() => onSelectService(service)}
                  className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center space-x-1"
                >
                  <span>Ver Detalle</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => onRequestQuote(service)}
                  className="inline-flex items-center space-x-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold transition"
                >
                  <Send className="w-3 h-3" />
                  <span>Cotizar</span>
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
};
