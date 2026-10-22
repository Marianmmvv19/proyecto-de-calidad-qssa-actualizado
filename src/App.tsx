import React, { useState, useEffect } from 'react';
import { INITIAL_SERVICES } from './data/servicesData';
import { ServiceItem, TabType } from './types';
import { Header } from './components/Header';
import { WelcomeTab } from './components/WelcomeTab';
import { CompanyTab } from './components/CompanyTab';
import { ServicesTab } from './components/ServicesTab';
import { DashboardTab } from './components/DashboardTab';
import { DiagnosticTab } from './components/DiagnosticTab';
import { StandardsTab } from './components/StandardsTab';
import { AiAssistantTab } from './components/AiAssistantTab';
import { ContactTab } from './components/ContactTab';
import { ServiceDetailModal } from './components/ServiceDetailModal';
import { QuoteModal } from './components/QuoteModal';
import { AddServiceModal } from './components/AddServiceModal';
import { AdminLoginModal } from './components/AdminLoginModal';
import { Footer } from './components/Footer';

export default function App() {
  const [services, setServices] = useState<ServiceItem[]>(() => {
    const saved = localStorage.getItem('qssa_custom_services');
    if (saved) {
      try {
        const customItems: ServiceItem[] = JSON.parse(saved);
        return [...INITIAL_SERVICES, ...customItems];
      } catch (e) {
        console.error('Error loading custom services:', e);
      }
    }
    return INITIAL_SERVICES;
  });

  const [isPortalUnlocked, setIsPortalUnlocked] = useState<boolean>(() => {
    return localStorage.getItem('qssa_portal_unlocked') === 'true';
  });

  const [activeTab, setActiveTab] = useState<TabType>('welcome');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [lang, setLang] = useState<'ES' | 'EN'>('ES');
  
  // Unlock portal handler
  const handleEnterPortal = (targetTab?: TabType) => {
    setIsPortalUnlocked(true);
    localStorage.setItem('qssa_portal_unlocked', 'true');
    setActiveTab(targetTab || 'company');
  };
  
  // Modals state
  const [selectedServiceForDetail, setSelectedServiceForDetail] = useState<ServiceItem | null>(null);
  const [selectedServiceForQuote, setSelectedServiceForQuote] = useState<ServiceItem | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);

  // Add new service
  const handleAddService = (newService: ServiceItem) => {
    setServices(prev => {
      const updated = [...prev, newService];
      const customOnly = updated.filter(s => s.isCustom);
      localStorage.setItem('qssa_custom_services', JSON.stringify(customOnly));
      return updated;
    });
  };

  // CSV Export
  const handleExportCSV = () => {
    const headers = ["Orden", "Categoría", "Servicio", "Viabilidad sin equipos propios", "Modalidad inicial recomendada", "Recursos necesarios", "Limitación / condición", "Dificultad", "Prioridad comercial"];
    const rows = services.map(s => [
      `"${s.orden}"`,
      `"${s.categoria.replace(/"/g, '""')}"`,
      `"${s.servicio.replace(/"/g, '""')}"`,
      `"${s.viabilidad.replace(/"/g, '""')}"`,
      `"${s.modalidad.replace(/"/g, '""')}"`,
      `"${s.recursos.replace(/"/g, '""')}"`,
      `"${s.limitaciones.replace(/"/g, '""')}"`,
      `"${s.dificultad.replace(/"/g, '""')}"`,
      `"${s.prioridadComercial.replace(/"/g, '""')}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8,\uFEFF" + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Matriz_Servicios_QSSA_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900 antialiased selection:bg-blue-500 selection:text-white">
      
      {/* Navbar */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isPortalUnlocked={isPortalUnlocked}
        onUnlockPortal={handleEnterPortal}
        totalServicesCount={services.length}
        filteredCount={services.length}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenAddModal={() => setIsAddModalOpen(true)}
        onOpenLoginModal={() => setIsLoginModalOpen(true)}
        onExportCSV={handleExportCSV}
        lang={lang}
        onLanguageChange={setLang}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {activeTab === 'welcome' && (
          <WelcomeTab
            onEnterPortal={handleEnterPortal}
            isPortalUnlocked={isPortalUnlocked}
            totalServicesCount={services.length}
            lang={lang}
            onLanguageChange={setLang}
          />
        )}

        {activeTab === 'company' && (
          <CompanyTab
            onNavigateTab={(tab) => setActiveTab(tab)}
            lang={lang}
          />
        )}

        {activeTab === 'services' && (
          <ServicesTab
            services={services}
            onSelectService={(s) => setSelectedServiceForDetail(s)}
            onRequestQuote={(s) => setSelectedServiceForQuote(s)}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            lang={lang}
          />
        )}

        {activeTab === 'dashboard' && (
          <DashboardTab
            services={services}
            onNavigateToServices={(category) => {
              setActiveTab('services');
            }}
          />
        )}

        {activeTab === 'diagnostic' && (
          <DiagnosticTab
            services={services}
            onSelectService={(s) => setSelectedServiceForDetail(s)}
            onRequestQuote={(s) => setSelectedServiceForQuote(s)}
          />
        )}

        {activeTab === 'standards' && (
          <StandardsTab
            lang={lang}
            onNavigateTab={(tab) => setActiveTab(tab as TabType)}
          />
        )}

        {activeTab === 'assistant' && (
          <AiAssistantTab />
        )}

        {activeTab === 'contact' && (
          <ContactTab
            onNavigateTab={(tab) => setActiveTab(tab)}
            lang={lang}
          />
        )}
      </main>

      {/* Modals */}
      <ServiceDetailModal
        service={selectedServiceForDetail}
        onClose={() => setSelectedServiceForDetail(null)}
        onRequestQuote={(s) => setSelectedServiceForQuote(s)}
      />

      <QuoteModal
        service={selectedServiceForQuote}
        onClose={() => setSelectedServiceForQuote(null)}
      />

      <AddServiceModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddService={handleAddService}
        nextOrder={services.length + 1}
      />

      <AdminLoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={() => {
          setIsAddModalOpen(true);
        }}
      />

      {/* Footer */}
      <Footer
        totalServices={services.length}
        onExportCSV={handleExportCSV}
        lang={lang}
      />

    </div>
  );
}
