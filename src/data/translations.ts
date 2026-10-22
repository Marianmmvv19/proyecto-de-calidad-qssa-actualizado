import { ServiceItem } from '../types';

export const CATEGORY_TRANSLATIONS: Record<string, { ES: string; EN: string }> = {
  'Capacitaciones "In House", capacitaciones abiertas': {
    ES: 'Capacitaciones "In House", capacitaciones abiertas',
    EN: '"In-House" & Open Training Courses'
  },
  'Diagnósticos de Sistemas de Gestión': {
    ES: 'Diagnósticos de Sistemas de Gestión',
    EN: 'Management Systems Diagnostics'
  },
  'Auditorías Internas': {
    ES: 'Auditorías Internas',
    EN: 'Internal Audits'
  },
  'Servicios específicos Corredor Bioceánico Bolivia - Chile - Perú': {
    ES: 'Servicios específicos Corredor Bioceánico Bolivia - Chile - Perú',
    EN: 'Bioceanic Corridor Specific Services (Bolivia - Chile - Peru)'
  },
  'Implementación de Sistemas de Gestión': {
    ES: 'Implementación de Sistemas de Gestión',
    EN: 'Management Systems Implementation'
  },
  'Certificación de Sistemas de Gestión': {
    ES: 'Certificación de Sistemas de Gestión',
    EN: 'Management Systems Certification'
  },
  'Verificación/Validación': {
    ES: 'Verificación/Validación',
    EN: 'Verification / Validation'
  },
  'Otros Servicios': {
    ES: 'Otros Servicios',
    EN: 'Other Services'
  }
};

export const VIABILITY_TRANSLATIONS: Record<string, { ES: string; EN: string }> = {
  'Alta': { ES: 'Alta', EN: 'High' },
  'Media': { ES: 'Media', EN: 'Medium' },
  'Condicionada': { ES: 'Condicionada', EN: 'Conditional' },
  'Viabilidad Alta sin equipos': { ES: 'Viabilidad Alta sin equipos', EN: 'High Viability without own equipment' },
  'Viabilidad Media sin equipos': { ES: 'Viabilidad Media sin equipos', EN: 'Medium Viability without own equipment' },
  'Viabilidad Condicionada': { ES: 'Viabilidad Condicionada', EN: 'Conditional Viability' }
};

export const DIFFICULTY_TRANSLATIONS: Record<string, { ES: string; EN: string }> = {
  '1 - Muy fácil': { ES: '1 - Muy fácil', EN: '1 - Very Easy' },
  '2 - Fácil': { ES: '2 - Fácil', EN: '2 - Easy' },
  '3 - Media': { ES: '3 - Media', EN: '3 - Medium' },
  '4 - Difícil': { ES: '4 - Difícil', EN: '4 - Difficult' }
};

export const PRIORITY_TRANSLATIONS: Record<string, { ES: string; EN: string }> = {
  'Alta': { ES: 'Alta', EN: 'High' },
  'Media': { ES: 'Media', EN: 'Medium' },
  'Baja': { ES: 'Baja', EN: 'Low' }
};

export const MODALITY_TRANSLATIONS: Record<string, { ES: string; EN: string }> = {
  'Online o presencial': { ES: 'Online o presencial', EN: 'Online or In-Person' },
  'Presencial': { ES: 'Presencial', EN: 'In-Person' },
  'Remota o mixta': { ES: 'Remota o mixta', EN: 'Remote or Hybrid' },
  'Presencial con soporte técnico remoto': { ES: 'Presencial con soporte técnico remoto', EN: 'In-Person with remote support' }
};

export const SERVICE_NAME_TRANSLATIONS: Record<string, { ES: string; EN: string }> = {
  "1": { ES: "Interpretación de la Norma ISO/IEC 17020", EN: "Interpretation of ISO/IEC 17020 Standard (Inspection Bodies)" },
  "2": { ES: "Interpretación de la Norma ISO/IEC 17025", EN: "Interpretation of ISO/IEC 17025 Standard (Testing & Calibration Labs)" },
  "3": { ES: "Interpretación de la Norma ISO 9001", EN: "Interpretation of ISO 9001 Standard (Quality Management)" },
  "4": { ES: "Interpretación de la Norma ISO 14001", EN: "Interpretation of ISO 14001 Standard (Environmental Management)" },
  "5": { ES: "Interpretación de la Norma ISO 45001", EN: "Interpretation of ISO 45001 Standard (Occupational Health & Safety)" },
  "6": { ES: "Diagnóstico de Preparación para Certificación o Auditoría Externa OEA", EN: "Readiness Assessment for AEO Certification or External Audit" },
  "7": { ES: "Diagnóstico del Sistema de Gestión de Calidad (ISO 9001)", EN: "Quality Management System Diagnostic (ISO 9001)" },
  "8": { ES: "Auditoría Interna Integrada de Sistemas de Gestión (ISO 9001, 14001 y 45001)", EN: "Integrated Management Systems Internal Audit (ISO 9001, 14001 & 45001)" },
  "9": { ES: "Auditoría Interna a Organismos de Inspección – ISO/IEC 17020:2012", EN: "Internal Audit for Inspection Bodies – ISO/IEC 17020:2012" },
  "10": { ES: "Auditoría Interna al Sistema de Gestión de Calidad – ISO 9001:2015", EN: "Quality Management System Internal Audit – ISO 9001:2015" },
  "11": { ES: "Auditoría Interna programa OEA", EN: "AEO Program Internal Audit (Authorized Economic Operator)" },
  "12": { ES: "Diagnóstico del Sistema de Gestión Ambiental (ISO 14001)", EN: "Environmental Management System Diagnostic (ISO 14001)" },
  "13": { ES: "Diagnóstico del Sistema de Gestión de Seguridad y Salud en el Trabajo (ISO 45001)", EN: "Occupational Health & Safety Management System Diagnostic (ISO 45001)" },
  "14": { ES: "Preparación para Operador Económico Autorizado (OEA)", EN: "Authorized Economic Operator (AEO) Preparation & Advisory" },
  "15": { ES: "Auditoría Interna a Laboratorios de Ensayo – ISO/IEC 17025:2017", EN: "Testing Laboratories Internal Audit – ISO/IEC 17025:2017" },
  "16": { ES: "Auditoría Interna de Cumplimiento Legal Ambiental y de Seguridad", EN: "Environmental and Safety Legal Compliance Internal Audit" },
  "17": { ES: "Diagnóstico del Sistema de Gestión de Organismo de Inspección (ISO/IEC 17020)", EN: "Inspection Body Management System Diagnostic (ISO/IEC 17020)" },
  "18": { ES: "Diagnóstico del Sistema de Gestión de Laboratorios (ISO/IEC 17025)", EN: "Laboratory Management System Diagnostic (ISO/IEC 17025)" },
  "19": { ES: "Implementación de Sistemas de Gestión de Calidad – ISO 9001:2015", EN: "Quality Management Systems Implementation – ISO 9001:2015" },
  "20": { ES: "Implementación de Sistema de Gestión de Seguridad de la Cadena de Suministro - ISO 28000", EN: "Supply Chain Security Management System Implementation - ISO 28000" },
  "21": { ES: "Certificación de Sistemas de Gestión Ambiental – ISO 14001:2015", EN: "Environmental Management Systems Certification – ISO 14001:2015" },
  "22": { ES: "Certificación de Sistemas de Gestión de Seguridad y Salud en el Trabajo – ISO 45001:2018", EN: "Occupational Health & Safety Management Systems Certification – ISO 45001:2018" },
  "23": { ES: "Certificación de Sistemas de Gestión de la Calidad – ISO 9001:2015", EN: "Quality Management Systems Certification – ISO 9001:2015" },
  "24": { ES: "Implementación de Sistemas Integrados de Gestión (ISO 9001 + 14001 + 45001)", EN: "Integrated Management Systems Implementation (ISO 9001 + 14001 + 45001)" },
  "25": { ES: "Implementación de Sistemas de Gestión Ambiental – ISO 14001:2015", EN: "Environmental Management Systems Implementation – ISO 14001:2015" },
  "26": { ES: "Implementación de Sistemas de Gestión de Laboratorios – ISO/IEC 17025:2017", EN: "Laboratory Management Systems Implementation – ISO/IEC 17025:2017" },
  "27": { ES: "Implementación de Sistemas de Gestión de Seguridad y Salud en el Trabajo – ISO 45001:2018", EN: "Occupational Health & Safety Management Systems Implementation – ISO 45001:2018" },
  "28": { ES: "Validación de Métodos de Ensayo en Laboratorios Ambientales o Mineros", EN: "Test Method Validation in Environmental or Mining Laboratories" },
  "29": { ES: "Medición de Ruido Ambiental u Ocupacional", EN: "Environmental or Occupational Noise Measurement" }
};

export function getServiceText(service: ServiceItem, lang: 'ES' | 'EN') {
  if (lang === 'ES') {
    return {
      servicio: service.servicio,
      categoria: service.categoria,
      viabilidad: service.viabilidad,
      modalidad: service.modalidad,
      dificultad: service.dificultad,
      prioridadComercial: service.prioridadComercial,
      recursos: service.recursos,
      limitaciones: service.limitaciones
    };
  }

  const translatedTitle = SERVICE_NAME_TRANSLATIONS[service.orden]?.EN || service.servicio;
  const translatedCategory = CATEGORY_TRANSLATIONS[service.categoria]?.EN || service.categoria;
  const translatedViab = VIABILITY_TRANSLATIONS[service.viabilidad]?.EN || service.viabilidad;
  const translatedMod = MODALITY_TRANSLATIONS[service.modalidad]?.EN || service.modalidad;
  const translatedDif = DIFFICULTY_TRANSLATIONS[service.dificultad]?.EN || service.dificultad;
  const translatedPrio = PRIORITY_TRANSLATIONS[service.prioridadComercial]?.EN || service.prioridadComercial;

  return {
    servicio: translatedTitle,
    categoria: translatedCategory,
    viabilidad: translatedViab,
    modalidad: translatedMod,
    dificultad: translatedDif,
    prioridadComercial: translatedPrio,
    recursos: service.recursos,
    limitaciones: service.limitaciones
  };
}

export const UI_DICTIONARY = {
  ES: {
    // Header & Navigation
    searchPlaceholder: "Buscar por código de norma, servicio, sector o equipo...",
    clearSearch: "Limpiar",
    adminLoginTitle: "Acceso Administrador",
    searchIconTitle: "Buscar servicio o norma",
    navAbout: "Nosotros",
    navStandards: "Normalización",
    navTraining: "Formación",
    navAssessment: "Evaluación & Matriz",
    navContact: "Contacto",
    navDashboard: "Panel",
    navDiagnostic: "Diagnóstico",
    navAssistant: "Asistente",

    // Services Tab
    servicesTitle: "Catálogo de Servicios y Matriz de Normalización",
    formacionBannerBadge: "Centro de Formación & Capacitación Técnica QSSA Bolivia",
    formacionAvailable: "Cursos de Formación Disponibles",
    formacionTitle: "Cursos de Formación y Capacitación Técnica Profesional",
    formacionDesc: "Esta sección está dedicada exclusivamente a la formación técnica continua, capacitación profesional e interpretación de normas internacionales para personal de empresas, laboratorios, organismos de inspección y sectores industriales en Bolivia.",
    cardIsoTitle: "Interpretación de Normas ISO",
    cardIsoDesc: "Cursos especializados en la interpretación práctica de normas ISO/IEC 17020, 17025, 9001, 14001 y 45001 con ejercicios y casos reales.",
    cardAuditorsTitle: "Formación de Auditores e Inspectores",
    cardAuditorsDesc: "Capacitación intensiva para auditores internos y cualificación de inspectores de campo con enfoque en gestión del riesgo.",
    cardInHouseTitle: "Modalidades In-House & Moodle",
    cardInHouseDesc: "Talleres presenciales personalizados 'In-House' para empresas o cursos virtuales con evaluación en aula Moodle y certificado.",
    categoryPillsHeader: "Categorías de Servicios QSSA",
    cleanFilters: "Limpiar Filtros",
    allCategories: "Todas las Categorías",
    filtersLabel: "Filtros:",
    viabilityAll: "Viabilidad (Todas)",
    viabilityHigh: "Viabilidad Alta",
    viabilityMed: "Viabilidad Media",
    viabilityCond: "Viabilidad Condicionada",
    priorityAll: "Prioridad Comercial (Todas)",
    priorityHigh: "Prioridad Alta",
    priorityMed: "Prioridad Media",
    priorityLow: "Prioridad Baja",
    difficultyAll: "Dificultad (Todas)",
    difficulty1: "1 - Muy Fácil",
    difficulty2: "2 - Fácil",
    difficulty3: "3 - Media",
    difficulty4: "4 - Difícil",
    viewModeTable: "Tabla",
    viewModeCards: "Tarjetas",
    showingCount: "Mostrando",
    ofServices: "de",
    servicesInCatalog: "servicios en el catálogo",
    sortBy: "Ordenar por:",
    sortOrder: "Orden #",
    sortName: "Nombre",
    noServicesFound: "No se encontraron servicios",
    noServicesFoundDesc: "No hay ningún servicio que coincida con la combinación de filtros seleccionados o el término de búsqueda.",
    resetFiltersBtn: "Restablecer Filtros",
    thNum: "#",
    thService: "Servicio / Norma ISO",
    thCategory: "Categoría",
    thViability: "Viabilidad",
    thModality: "Modalidad",
    thDifficulty: "Dificultad",
    thPriority: "Prioridad",
    thAction: "Acción",
    badgeCourse: "CURSO / FORMACIÓN",
    badgeConformity: "EVALUACIÓN CONFORMIDAD",
    badgeIso: "ESTÁNDAR ISO",
    btnView: "Ver",
    btnQuote: "Cotizar",
    btnViewDetail: "Ver Detalle",
    serviceHash: "Servicio #",
    customBadge: "Personalizado",

    // Dashboard Tab
    dashTag: "Matriz Estratégica QSSA 2026",
    dashTitle: "Panel de Diagnóstico y Portafolio de Servicios de Calidad",
    dashDesc: "Consulte la viabilidad operativa, niveles de dificultad, modalidades de ejecución y recursos requeridos para los 29 servicios de sistemas de gestión, auditorías e ISO.",
    dashTotal: "Total Servicios",
    dashTotalSub: "Servicios listados en el catálogo",
    dashPriority: "Prioridad Alta",
    dashPrioritySub: "Servicios de rápida respuesta comercial",
    dashViability: "Viabilidad Alta sin Equipos",
    dashViabilitySub: "Ejecutables sin equipos de medición",
    dashSpeed: "Implementación Rápida",
    dashSpeedSub: "Dificultad Nivel 1 (Muy fácil) y Nivel 2 (Fácil)",
    dashCatDistribution: "Distribución por Categoría de Servicio",
    dashIsoCoverage: "Cobertura de Normas ISO & Acreditación",
    dashViewCatalog: "Ver Catálogo Completo en Matriz de Servicios",
    servicesCountLabel: "servicios en el catálogo",

    // Diagnostic Tab
    diagBadge: "Evaluación de Necesidades QSSA",
    diagTitle: "Diagnóstico Interactivo de Calidad e Inspección",
    diagDesc: "Responda las preguntas de evaluación para determinar la combinación óptima de capacitaciones, auditorías de brechas y certificaciones ISO aplicables a su sector.",
    diagImageTag: "Mapeo Rápido de Soluciones Normativas",
    diagQ1: "1. ¿Cuál es el objetivo principal de su organización?",
    diagQ2: "2. ¿En qué norma o referente se enfoca su requerimiento?",
    diagAllStandards: "Todas las normas",
    diagRecTitle: "Servicios QSSA Mapeados Recomendados",
    diagRecEmpty: "No se encontraron servicios específicos con esa combinación. Pruebe seleccionando 'Todas las normas'.",
    diagBtnQuote: "Cotizar Servicio",

    // Company Tab
    compInfrastructureBadge: "Infraestructura y Servicios en Operación",
    compInfrastructureTitle: "Servicios de Normalización e Inspección en Acción",
    compPrinciplesTitle: "7 Principios de Evaluación QSSA",
    compPrinciplesDesc: "Garantía de transparencia e imparcialidad bajo directivas ISO internacionales",
    compExploreServices: "Explorar Servicios",
    compCard1Badge: "Capacitación In-House",
    compCard1Pill: "Formación de Auditores ISO",
    compCard1Title: "Cursos de Interpretación y Auditoría Interna",
    compCard1Desc: "Seminarios corporativos presenciales y virtuales sobre ISO 9001, 14001, 45001 y 17025 para equipos directivos y técnicos.",
    compCard1Btn: "Ver Capacitaciones",
    compCard2Badge: "Auditoría Integrada",
    compCard2Pill: "Evaluación de Conformidad",
    compCard2Title: "Auditorías de Brechas e Imparcialidad",
    compCard2Desc: "Evaluaciones independientes de sistemas de gestión para verificar cumplimiento de requisitos legales e internacionales.",
    compCard2Btn: "Realizar Diagnóstico",
    compCard3Badge: "Inspección en Planta",
    compCard3Pill: "Inspección Industrial & OEA",
    compCard3Title: "Inspecciones ISO/IEC 17020 y Campo",
    compCard3Desc: "Verificación in situ de instalaciones industriales, cadenas de suministro y laboratorios bajo normativa internacional.",
    compCard3Btn: "Ver Normas ISO",

    // Contact Tab
    contactBadge: "Atención al Cliente QSSA Bolivia",
    contactHeroTitle: "Información de Contacto y Sedes",
    contactHeroDesc: "Si te encuentras en Bolivia o en la región, visítanos en nuestras oficinas o contáctanos de forma directa vía WhatsApp para asesoría inmediata sobre normas ISO y servicios de calidad.",
    btnWaBolivia: "WhatsApp Bolivia (+591 77225772)",
    btnWaChile: "WhatsApp Chile (+56979713820)",
    contactFormTitle: "Solicita más información",
    contactFormSubtitle: "Completa el formulario y nos pondremos en contacto a la brevedad.",
    formSuccessTitle: "¡Mensaje Enviado con Éxito!",
    formSuccessDesc: "Gracias por contactarnos. Un especialista técnico revisará tu requerimiento en menos de 24 horas.",
    formSendAnother: "Enviar otro mensaje",
    formFullName: "Nombre Completo *",
    formEmail: "Correo Electrónico *",
    formPhone: "Teléfono / WhatsApp",
    formPhoneHint: "Código de país en recuadro con + por defecto.",
    formCity: "Ciudad o Sede",
    formMessage: "Mensaje / Consulta *",
    formSubmitBtn: "Enviar Solicitud de Información",
    officesHeading: "Oficinas en Bolivia",
    cityAll: "TODAS",
    hostingerBadge: "Acceso al Correo Corporativo QSSA",
    hostingerTitle: "Inicia sesión en Hostinger Mail:",
    hostingerDesc: "Plataforma oficial de correo web corporativo para el equipo técnico, consultores, auditores y personal administrativo de QSSA Bolivia.",
    hostingerBtn: "Inicia sesión en Hostinger Mail",

    // Assistant Tab
    assistantBadge: "Asistente Técnico de Calidad QSSA",
    assistantTagline: "Consultas en tiempo real sobre la Matriz de 29 Servicios, Normas ISO y Recomendaciones Técnicas.",
    assistantPlaceholder: "Pregunte sobre los servicios, normas ISO o viabilidad...",
    assistantLoading: "Analizando matriz QSSA y generando respuesta técnica...",

    // Modals
    modalQuoteTitle: "Solicitud de Cotización QSSA",
    modalQuoteSuccessTitle: "¡Solicitud Registrada con Éxito!",
    modalQuoteSuccessDesc: "Hemos registrado la solicitud de cotización para el servicio seleccionado.",
    modalQuoteSuccessSub: "Un consultor senior de QSSA se pondrá en contacto a la brevedad.",
    modalQuoteBackBtn: "Volver a la Matriz de Servicios",
    modalQuoteSelected: "Servicio Seleccionado:",
    modalQuoteCompany: "Nombre de la Empresa u Organización *",
    modalQuoteContact: "Nombre del Contacto *",
    modalQuoteEmail: "Correo Electrónico *",
    modalQuotePhone: "Teléfono / WhatsApp",
    modalQuoteNotes: "Alcance o Notas Adicionales",
    modalQuoteCancel: "Cancelar",
    modalQuoteSubmit: "Enviar Solicitud de Cotización",
    modalDetailModalidad: "Modalidad de Ejecución",
    modalDetailRecursos: "Recursos y Entregables Requeridos",
    modalDetailCondiciones: "Condiciones y Alcance Técnico",
    modalDetailClose: "Cerrar",
    modalDetailQuote: "Solicitar Cotización de este Servicio"
  },
  EN: {
    // Header & Navigation
    searchPlaceholder: "Search by standard code, service, sector or equipment...",
    clearSearch: "Clear",
    adminLoginTitle: "Admin Login",
    searchIconTitle: "Search service or standard",
    navAbout: "About Us",
    navStandards: "Standardization",
    navTraining: "Training",
    navAssessment: "Assessment & Matrix",
    navContact: "Contact",
    navDashboard: "Dashboard",
    navDiagnostic: "Diagnostic",
    navAssistant: "Assistant",

    // Services Tab
    servicesTitle: "Services Catalog & Standardization Matrix",
    formacionBannerBadge: "QSSA Technical Training & Capacity Building Center",
    formacionAvailable: "Professional Training Courses Available",
    formacionTitle: "Professional Technical Training & Qualification Courses",
    formacionDesc: "This section is exclusively dedicated to continuous technical education, professional qualification, and international standards interpretation for organizations, laboratories, inspection bodies, and industrial sectors across the region.",
    cardIsoTitle: "ISO Standards Interpretation",
    cardIsoDesc: "Specialized courses in practical interpretation of ISO/IEC 17020, 17025, 9001, 14001, and 45001 with practical exercises and case studies.",
    cardAuditorsTitle: "Auditor & Inspector Qualification",
    cardAuditorsDesc: "Intensive training for internal auditors and qualification of field technical inspectors with a risk-based focus.",
    cardInHouseTitle: "In-House & Moodle Modalities",
    cardInHouseDesc: "Customized on-site corporate workshops or virtual courses with structured assessments on Moodle and certified credentials.",
    categoryPillsHeader: "QSSA Service Categories",
    cleanFilters: "Clear Filters",
    allCategories: "All Categories",
    filtersLabel: "Filters:",
    viabilityAll: "Viability (All)",
    viabilityHigh: "High Viability",
    viabilityMed: "Medium Viability",
    viabilityCond: "Conditional Viability",
    priorityAll: "Commercial Priority (All)",
    priorityHigh: "High Priority",
    priorityMed: "Medium Priority",
    priorityLow: "Low Priority",
    difficultyAll: "Difficulty (All)",
    difficulty1: "1 - Very Easy",
    difficulty2: "2 - Easy",
    difficulty3: "3 - Medium",
    difficulty4: "4 - Difficult",
    viewModeTable: "Table",
    viewModeCards: "Cards",
    showingCount: "Showing",
    ofServices: "of",
    servicesInCatalog: "services in the catalog",
    sortBy: "Sort by:",
    sortOrder: "Order #",
    sortName: "Name",
    noServicesFound: "No services found",
    noServicesFoundDesc: "No services match the selected combination of filters or search criteria.",
    resetFiltersBtn: "Reset Filters",
    thNum: "#",
    thService: "Service / ISO Standard",
    thCategory: "Category",
    thViability: "Viability",
    thModality: "Modality",
    thDifficulty: "Difficulty",
    thPriority: "Priority",
    thAction: "Action",
    badgeCourse: "COURSE / TRAINING",
    badgeConformity: "CONFORMITY ASSESSMENT",
    badgeIso: "ISO STANDARD",
    btnView: "View",
    btnQuote: "Quote",
    btnViewDetail: "View Details",
    serviceHash: "Service #",
    customBadge: "Custom",

    // Dashboard Tab
    dashTag: "QSSA 2026 Strategic Matrix",
    dashTitle: "Diagnostic Dashboard & Quality Services Portfolio",
    dashDesc: "Review operational viability, difficulty levels, execution modalities, and required resources across all 29 management systems, audits, and ISO services.",
    dashTotal: "Total Services",
    dashTotalSub: "Services registered in catalog",
    dashPriority: "High Priority",
    dashPrioritySub: "Quick-response commercial services",
    dashViability: "High Viability without Equipment",
    dashViabilitySub: "Executable without own measuring hardware",
    dashSpeed: "Rapid Deployment",
    dashSpeedSub: "Level 1 (Very easy) and Level 2 (Easy)",
    dashCatDistribution: "Distribution by Service Category",
    dashIsoCoverage: "ISO Standards & Accreditation Coverage",
    dashViewCatalog: "View Full Catalog in Services Matrix",
    servicesCountLabel: "services in catalog",

    // Diagnostic Tab
    diagBadge: "QSSA Organizational Needs Assessment",
    diagTitle: "Interactive Quality & Inspection Diagnostic",
    diagDesc: "Answer the diagnostic questions to identify the ideal combination of training courses, gap audits, and ISO certifications suited for your sector.",
    diagImageTag: "Fast Mapping of Regulatory Solutions",
    diagQ1: "1. What is your organization's primary objective?",
    diagQ2: "2. Which standard or framework is your requirement focused on?",
    diagAllStandards: "All standards",
    diagRecTitle: "Recommended QSSA Mapped Services",
    diagRecEmpty: "No specific services match this exact criteria. Try selecting 'All standards'.",
    diagBtnQuote: "Request Quotation",

    // Company Tab
    compInfrastructureBadge: "Operational Infrastructure & Field Execution",
    compInfrastructureTitle: "Standardization & Inspection Services in Action",
    compPrinciplesTitle: "7 Core Assessment Principles",
    compPrinciplesDesc: "Guarantee of transparency and impartiality under international ISO directives",
    compExploreServices: "Explore Services",
    compCard1Badge: "In-House Training",
    compCard1Pill: "ISO Auditor Qualification",
    compCard1Title: "Interpretation & Internal Audit Courses",
    compCard1Desc: "Corporate seminars (in-person and virtual) on ISO 9001, 14001, 45001, and 17025 for managerial and technical teams.",
    compCard1Btn: "View Training",
    compCard2Badge: "Integrated Audit",
    compCard2Pill: "Conformity Assessment",
    compCard2Title: "GAP Analysis & Impartiality Audits",
    compCard2Desc: "Independent management system evaluations to verify compliance with national legal and international standards.",
    compCard2Btn: "Perform Diagnostic",
    compCard3Badge: "On-Site Inspection",
    compCard3Pill: "Industrial & AEO Inspection",
    compCard3Title: "ISO/IEC 17020 & Field Inspections",
    compCard3Desc: "On-site verification of industrial facilities, international supply chains, and testing laboratories.",
    compCard3Btn: "View ISO Standards",

    // Contact Tab
    contactBadge: "QSSA Bolivia Customer Support",
    contactHeroTitle: "Contact Information & Offices",
    contactHeroDesc: "If you are in Bolivia or the surrounding region, visit our corporate offices or contact us directly via WhatsApp for immediate guidance on ISO standards and quality services.",
    btnWaBolivia: "WhatsApp Bolivia (+591 77225772)",
    btnWaChile: "WhatsApp Chile (+56979713820)",
    contactFormTitle: "Request More Information",
    contactFormSubtitle: "Fill out the form and our technical team will contact you promptly.",
    formSuccessTitle: "Message Sent Successfully!",
    formSuccessDesc: "Thank you for contacting us. A senior technical consultant will review your inquiry within 24 hours.",
    formSendAnother: "Send another inquiry",
    formFullName: "Full Name *",
    formEmail: "Corporate Email *",
    formPhone: "Phone / WhatsApp",
    formPhoneHint: "Country code pre-filled with + by default.",
    formCity: "City or Branch",
    formMessage: "Message / Inquiry *",
    formSubmitBtn: "Submit Information Request",
    officesHeading: "Offices in Bolivia",
    cityAll: "ALL",
    hostingerBadge: "QSSA Corporate Webmail Access",
    hostingerTitle: "Sign in to Hostinger Mail:",
    hostingerDesc: "Official webmail platform for QSSA technical consultants, certified auditors, inspectors, and administrative staff.",
    hostingerBtn: "Sign in to Hostinger Mail",

    // Assistant Tab
    assistantBadge: "QSSA Technical Quality Assistant",
    assistantTagline: "Real-time technical consultation across the 29 Services Matrix, ISO Standards, and Recommendations.",
    assistantPlaceholder: "Ask about ISO standards, services, or technical viability...",
    assistantLoading: "Analyzing QSSA matrix and compiling technical response...",

    // Modals
    modalQuoteTitle: "QSSA Quotation Request",
    modalQuoteSuccessTitle: "Request Successfully Registered!",
    modalQuoteSuccessDesc: "We have registered your quotation request for the selected service.",
    modalQuoteSuccessSub: "A senior QSSA consultant will contact you shortly.",
    modalQuoteBackBtn: "Return to Services Matrix",
    modalQuoteSelected: "Selected Service:",
    modalQuoteCompany: "Company or Organization Name *",
    modalQuoteContact: "Contact Name *",
    modalQuoteEmail: "Email Address *",
    modalQuotePhone: "Phone / WhatsApp",
    modalQuoteNotes: "Scope or Additional Notes",
    modalQuoteCancel: "Cancel",
    modalQuoteSubmit: "Submit Quotation Request",
    modalDetailModalidad: "Execution Modality",
    modalDetailRecursos: "Required Resources & Deliverables",
    modalDetailCondiciones: "Conditions & Technical Scope",
    modalDetailClose: "Close",
    modalDetailQuote: "Request Quotation for this Service"
  }
};
