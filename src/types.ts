export interface ServiceItem {
  id: number;
  orden: string;
  categoria: string;
  servicio: string;
  viabilidad: string;
  modalidad: string;
  recursos: string;
  limitaciones: string;
  dificultad: string;
  prioridadComercial: string;
  customNotes?: string;
  isCustom?: boolean;
}

export type TabType = 'welcome' | 'company' | 'services' | 'dashboard' | 'diagnostic' | 'standards' | 'assistant' | 'contact';

export interface ServiceFilterState {
  searchQuery: string;
  selectedCategory: string;
  selectedViability: string;
  selectedDifficulty: string;
  selectedPriority: string;
  selectedModality: string;
  viewMode: 'table' | 'grid';
}

export interface QuoteRequest {
  serviceId: number;
  serviceTitle: string;
  companyName: string;
  contactEmail: string;
  contactPhone: string;
  modalityPreference: string;
  notes: string;
}

export interface DiagnosticAnswer {
  companyType: string;
  hasOwnEquipment: boolean;
  targetStandards: string[];
  urgency: string;
  budgetLevel: string;
}
