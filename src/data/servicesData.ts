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
}

export const INITIAL_SERVICES: ServiceItem[] = [
  {
    "id": 1,
    "orden": "1",
    "categoria": "Capacitaciones \"In House\", capacitaciones abiertas",
    "servicio": "Interpretación de la Norma ISO/IEC 17020",
    "viabilidad": "Alta",
    "modalidad": "Online o presencial",
    "recursos": "Instructor competente; material didáctico; norma/licencia de consulta; ejercicios de hallazgos; checklist; evaluación; certificado; Zoom/Meet/Teams; Moodle opcional.",
    "limitaciones": "No requiere equipos; muy alineado al perfil de QSSA.",
    "dificultad": "1 - Muy fácil",
    "prioridadComercial": "Alta"
  },
  {
    "id": 2,
    "orden": "2",
    "categoria": "Capacitaciones \"In House\", capacitaciones abiertas",
    "servicio": "Interpretación de la Norma ISO/IEC 17025",
    "viabilidad": "Alta",
    "modalidad": "Online o presencial",
    "recursos": "Instructor competente; presentación; norma/licencia de consulta; casos prácticos; evaluación; certificado; plataforma Zoom/Meet/Teams; Moodle/Google Classroom opcional; laptop; proyector si es presencial.",
    "limitaciones": "No requiere equipos de medición; puede ejecutarse con ejemplos documentales.",
    "dificultad": "1 - Muy fácil",
    "prioridadComercial": "Alta"
  },
  {
    "id": 3,
    "orden": "3",
    "categoria": "Capacitaciones \"In House\", capacitaciones abiertas",
    "servicio": "Interpretación de la Norma ISO 9001",
    "viabilidad": "Alta",
    "modalidad": "Online o presencial",
    "recursos": "Instructor competente; presentación; norma/licencia de consulta; casos prácticos; evaluación; certificado; plataforma Zoom/Meet/Teams; Moodle/Google Classroom opcional; laptop; proyector si es presencial.",
    "limitaciones": "No requiere equipos; muy alineado al perfil de QSSA.",
    "dificultad": "1 - Muy fácil",
    "prioridadComercial": "Alta"
  },
  {
    "id": 4,
    "orden": "4",
    "categoria": "Capacitaciones \"In House\", capacitaciones abiertas",
    "servicio": "Interpretación de la Norma ISO 14001",
    "viabilidad": "Alta",
    "modalidad": "Online o presencial",
    "recursos": "Instructor competente; presentación; norma/licencia de consulta; casos prácticos; evaluación; certificado; plataforma Zoom/Meet/Teams; Moodle/Google Classroom opcional; laptop; proyector si es presencial.",
    "limitaciones": "No requiere equipos; muy alineado al perfil de QSSA.",
    "dificultad": "1 - Muy fácil",
    "prioridadComercial": "Alta"
  },
  {
    "id": 5,
    "orden": "5",
    "categoria": "Capacitaciones \"In House\", capacitaciones abiertas",
    "servicio": "Interpretación de la Norma ISO 45001",
    "viabilidad": "Alta",
    "modalidad": "Online o presencial",
    "recursos": "Instructor competente; presentación; norma/licencia de consulta; casos prácticos; evaluación; certificado; plataforma Zoom/Meet/Teams; Moodle/Google Classroom opcional; laptop; proyector si es presencial.",
    "limitaciones": "No requiere equipos; muy alineado al perfil de QSSA.",
    "dificultad": "1 - Muy fácil",
    "prioridadComercial": "Alta"
  },
  {
    "id": 6,
    "orden": "6",
    "categoria": "Diagnósticos de Sistemas de Gestión",
    "servicio": "Diagnóstico de Preparación para Certificación o Auditoría Externa OEA",
    "viabilidad": "Alta",
    "modalidad": "Remota o mixta",
    "recursos": "Auditor OEA; checklist de norma aplicable; agenda; acceso a documentos y registros; entrevistas; matriz de riesgos de auditoría; informe ejecutivo.",
    "limitaciones": "Puede requerir visita si se desea validar implementación física.",
    "dificultad": "1 - Muy fácil",
    "prioridadComercial": "Alta"
  },
  {
    "id": 7,
    "orden": "7",
    "categoria": "Diagnósticos de Sistemas de Gestión",
    "servicio": "Diagnóstico del Sistema de Gestión de Calidad (ISO 9001)",
    "viabilidad": "Alta",
    "modalidad": "Remota o mixta",
    "recursos": "Consultor/auditor competente; norma; checklist; plan de entrevistas; acceso documental; matriz de brechas; laptop; plantilla de informe.",
    "limitaciones": "No requiere equipos; ideal para inicio comercial.",
    "dificultad": "1 - Muy fácil",
    "prioridadComercial": "Alta"
  },
  {
    "id": 8,
    "orden": "8",
    "categoria": "Auditorías Internas",
    "servicio": "Auditoría Interna Integrada de Sistemas de Gestión (ISO 9001, 14001 y 45001)",
    "viabilidad": "Alta",
    "modalidad": "Mixta",
    "recursos": "Equipo auditor o auditor integrado; normas; plan integrado; checklists; matriz legal; entrevistas; recorrido; informe consolidado.",
    "limitaciones": "Mayor alcance; no requiere mediciones propias.",
    "dificultad": "2 - Fácil",
    "prioridadComercial": "Alta"
  },
  {
    "id": 9,
    "orden": "9",
    "categoria": "Auditorías Internas",
    "servicio": "Auditoría Interna a Organismos de Inspección – ISO/IEC 17020:2012",
    "viabilidad": "Alta",
    "modalidad": "Mixta",
    "recursos": "Auditor 17020; norma; criterios de acreditación aplicables; checklist; acceso a procedimientos, informes, competencia, imparcialidad; entrevistas; informe.",
    "limitaciones": "La testificación con actividad del cliente.",
    "dificultad": "2 - Fácil",
    "prioridadComercial": "Alta"
  },
  {
    "id": 10,
    "orden": "10",
    "categoria": "Auditorías Internas",
    "servicio": "Auditoría Interna al Sistema de Gestión de Calidad – ISO 9001:2015",
    "viabilidad": "Alta",
    "modalidad": "Mixta",
    "recursos": "Auditor ISO 9001; programa y plan de auditoría; checklist; acceso documental; entrevistas; formato de hallazgos; informe.",
    "limitaciones": "Muy viable sin equipos si el alcance es documental/procesos.",
    "dificultad": "2 - Fácil",
    "prioridadComercial": "Alta"
  },
  {
    "id": 11,
    "orden": "11",
    "categoria": "Auditorías Internas",
    "servicio": "Auditoría Interna programa OEA",
    "viabilidad": "Alta",
    "modalidad": "Mixta",
    "recursos": "Auditor OEA; programa y plan de auditoría; checklist; acceso documental; entrevistas; formato de hallazgos; informe.",
    "limitaciones": "Muy viable sin equipos si el alcance es documental/procesos.",
    "dificultad": "2 - Fácil",
    "prioridadComercial": "Alta"
  },
  {
    "id": 12,
    "orden": "12",
    "categoria": "Diagnósticos de Sistemas de Gestión",
    "servicio": "Diagnóstico del Sistema de Gestión Ambiental (ISO 14001)",
    "viabilidad": "Alta",
    "modalidad": "Mixta",
    "recursos": "Auditor ambiental; norma; matriz legal; checklist; acceso a aspectos/impactos; entrevistas; visita de reconocimiento; plantilla de informe.",
    "limitaciones": "Sin mediciones ambientales; se limita a revisión documental y observación visual.",
    "dificultad": "2 - Fácil",
    "prioridadComercial": "Alta"
  },
  {
    "id": 13,
    "orden": "13",
    "categoria": "Diagnósticos de Sistemas de Gestión",
    "servicio": "Diagnóstico del Sistema de Gestión de Seguridad y Salud en el Trabajo (ISO 45001)",
    "viabilidad": "Alta",
    "modalidad": "Mixta",
    "recursos": "Auditor SST; norma; matriz IPER; matriz legal; checklist; entrevistas; recorrido visual; evidencia fotográfica; informe.",
    "limitaciones": "No incluye mediciones ocupacionales si no se subcontratan.",
    "dificultad": "2 - Fácil",
    "prioridadComercial": "Alta"
  },
  {
    "id": 14,
    "orden": "14",
    "categoria": "Servicios específicos Corredor Bioceánico Bolivia - Chile - Perú",
    "servicio": "Preparación para Operador Económico Autorizado (OEA)",
    "viabilidad": "Alta",
    "modalidad": "Asistencia técnica mixta",
    "recursos": "Consultor OEA; requisitos por país; checklist; matriz de brechas; formatos de seguridad; capacitación; plan de acción; seguimiento documental.",
    "limitaciones": "No requiere equipos; puede demandar varias jornadas según brechas.",
    "dificultad": "2 - Fácil",
    "prioridadComercial": "Alta"
  },
  {
    "id": 15,
    "orden": "15",
    "categoria": "Auditorías Internas",
    "servicio": "Auditoría Interna a Laboratorios de Ensayo – ISO/IEC 17025:2017",
    "viabilidad": "Media",
    "modalidad": "Mixta",
    "recursos": "Auditor 17025; checklist; acceso a registros técnicos; entrevistas; revisión de métodos, validación, trazabilidad y aseguramiento de calidad; informe.",
    "limitaciones": "No requiere equipos propios si se audita al laboratorio del cliente.",
    "dificultad": "2 - Fácil",
    "prioridadComercial": "Media"
  },
  {
    "id": 16,
    "orden": "16",
    "categoria": "Auditorías Internas",
    "servicio": "Auditoría Interna de Cumplimiento Legal Ambiental y de Seguridad",
    "viabilidad": "Media",
    "modalidad": "Mixta",
    "recursos": "Especialista legal/técnico; matriz legal; permisos, licencias y reportes; checklist; visita; evidencia fotográfica; informe de cumplimiento.",
    "limitaciones": "No incluye monitoreos/mediciones ambientales u ocupacionales salvo subcontratación.",
    "dificultad": "2 - Fácil",
    "prioridadComercial": "Media"
  },
  {
    "id": 17,
    "orden": "17",
    "categoria": "Diagnósticos de Sistemas de Gestión",
    "servicio": "Diagnóstico del Sistema de Gestión de Organismo de Inspección (ISO/IEC 17020)",
    "viabilidad": "Media",
    "modalidad": "Mixta",
    "recursos": "Experto 17020; checklist; acceso a métodos, equipos, calibraciones, validaciones, aseguramiento de calidad; entrevistas; informe de brechas.",
    "limitaciones": "No se ejecutan inspecciones; solo diagnóstico documental/técnico.",
    "dificultad": "2 - Fácil",
    "prioridadComercial": "Media"
  },
  {
    "id": 18,
    "orden": "18",
    "categoria": "Diagnósticos de Sistemas de Gestión",
    "servicio": "Diagnóstico del Sistema de Gestión de Laboratorios (ISO/IEC 17025)",
    "viabilidad": "Media",
    "modalidad": "Mixta",
    "recursos": "Experto 17025; checklist; acceso a métodos, equipos, calibraciones, validaciones, aseguramiento de calidad; entrevistas; informe de brechas.",
    "limitaciones": "No se ejecutan ensayos ni comprobaciones; solo diagnóstico documental/técnico.",
    "dificultad": "2 - Fácil",
    "prioridadComercial": "Media"
  },
  {
    "id": 19,
    "orden": "19",
    "categoria": "Implementación de Sistemas de Gestión",
    "servicio": "Implementación de Sistemas de Gestión de Calidad – ISO 9001:2015",
    "viabilidad": "Alta",
    "modalidad": "Consultoría mixta",
    "recursos": "Consultor ISO 9001; diagnóstico; mapa de procesos; procedimientos; registros; capacitación; auditoría interna; plan de certificación.",
    "limitaciones": "No requiere equipos propios; demanda dedicación documental y seguimiento.",
    "dificultad": "3 - Media",
    "prioridadComercial": "Alta"
  },
  {
    "id": 20,
    "orden": "20",
    "categoria": "Servicios específicos Corredor Bioceánico Bolivia - Chile - Perú",
    "servicio": "Implementación de Sistema de Gestión de Seguridad de la Cadena de Suministro - ISO 28000",
    "viabilidad": "Alta",
    "modalidad": "Consultoría mixta",
    "recursos": "Especialista ISO 28000; diagnóstico; matriz de amenazas/vulnerabilidades; procedimientos; capacitación; auditoría interna.",
    "limitaciones": "No requiere equipos propios; requiere visitas y compromiso operativo.",
    "dificultad": "3 - Media",
    "prioridadComercial": "Alta"
  },
  {
    "id": 21,
    "orden": "21",
    "categoria": "Certificación de Sistemas de Gestión",
    "servicio": "Certificación de Sistemas de Gestión Ambiental – ISO 14001:2015",
    "viabilidad": "Media",
    "modalidad": "Servicio de certificación/auditoría",
    "recursos": "Auditores ambientales; proceso de certificación; matriz de competencia; comité; revisión técnica; seguimiento; control de imparcialidad.",
    "limitaciones": "No requiere equipos, pero sí competencia ambiental y proceso robusto.",
    "dificultad": "3 - Media",
    "prioridadComercial": "Media"
  },
  {
    "id": 22,
    "orden": "22",
    "categoria": "Certificación de Sistemas de Gestión",
    "servicio": "Certificación de Sistemas de Gestión de Seguridad y Salud en el Trabajo – ISO 45001:2018",
    "viabilidad": "Media",
    "modalidad": "Servicio de certificación/auditoría",
    "recursos": "Auditores SST; proceso de certificación; revisión técnica; comité; criterios de competencia; formatos e informes.",
    "limitaciones": "No requiere equipos; requiere competencia sectorial y control legal.",
    "dificultad": "3 - Media",
    "prioridadComercial": "Media"
  },
  {
    "id": 23,
    "orden": "23",
    "categoria": "Certificación de Sistemas de Gestión",
    "servicio": "Certificación de Sistemas de Gestión de la Calidad – ISO 9001:2015",
    "viabilidad": "Media",
    "modalidad": "Servicio de certificación/auditoría",
    "recursos": "Proceso de certificación; auditores calificados; comité de certificación; reglas de uso de marca; formatos; base de clientes; control de imparcialidad.",
    "limitaciones": "Requiere estructura de organismo de certificación; no equipos.",
    "dificultad": "3 - Media",
    "prioridadComercial": "Media"
  },
  {
    "id": 24,
    "orden": "24",
    "categoria": "Implementación de Sistemas de Gestión",
    "servicio": "Implementación de Sistemas Integrados de Gestión (ISO 9001 + 14001 + 45001)",
    "viabilidad": "Alta",
    "modalidad": "Consultoría mixta",
    "recursos": "Consultor integrado; diagnóstico cruzado; matriz legal; procedimientos integrados; indicadores; capacitación; auditoría interna.",
    "limitaciones": "Mayor duración y coordinación; no requiere equipos propios.",
    "dificultad": "3 - Media",
    "prioridadComercial": "Media"
  },
  {
    "id": 25,
    "orden": "25",
    "categoria": "Implementación de Sistemas de Gestión",
    "servicio": "Implementación de Sistemas de Gestión Ambiental – ISO 14001:2015",
    "viabilidad": "Alta",
    "modalidad": "Consultoría mixta",
    "recursos": "Consultor ambiental; diagnóstico; matriz de aspectos/impactos; matriz legal; procedimientos; capacitación; auditoría interna.",
    "limitaciones": "No incluye mediciones ambientales propias; si se requieren, subcontratar.",
    "dificultad": "3 - Media",
    "prioridadComercial": "Media"
  },
  {
    "id": 26,
    "orden": "26",
    "categoria": "Implementación de Sistemas de Gestión",
    "servicio": "Implementación de Sistemas de Gestión de Laboratorios – ISO/IEC 17025:2017",
    "viabilidad": "Media",
    "modalidad": "Consultoría mixta",
    "recursos": "Experto 17025; diseño documental; plan de validación/verificación; trazabilidad; aseguramiento de calidad; capacitación; auditoría interna.",
    "limitaciones": "La implementación técnica depende de equipos/métodos del laboratorio cliente.",
    "dificultad": "3 - Media",
    "prioridadComercial": "Media"
  },
  {
    "id": 27,
    "orden": "27",
    "categoria": "Implementación de Sistemas de Gestión",
    "servicio": "Implementación de Sistemas de Gestión de Seguridad y Salud en el Trabajo – ISO 45001:2018",
    "viabilidad": "Alta",
    "modalidad": "Consultoría mixta",
    "recursos": "Consultor SST; IPER; matriz legal; procedimientos; planes de emergencia; capacitación; auditoría interna.",
    "limitaciones": "No incluye mediciones ocupacionales propias; requiere participación operativa.",
    "dificultad": "3 - Media",
    "prioridadComercial": "Media"
  },
  {
    "id": 28,
    "orden": "28",
    "categoria": "Verificación/Validación",
    "servicio": "Validación de Métodos de Ensayo en Laboratorios Ambientales o Mineros",
    "viabilidad": "Condicionada",
    "modalidad": "Asistencia técnica al laboratorio cliente",
    "recursos": "Experto técnico; plan de validación; hojas de cálculo; MRC/patrones y equipos del cliente; datos de ensayos; informe.",
    "limitaciones": "QSSA puede asesorar y analizar datos, y ejecutar ensayos en laboratorio del cliente.",
    "dificultad": "4 - Difícil",
    "prioridadComercial": "Media"
  },
  {
    "id": 29,
    "orden": "29",
    "categoria": "Otros Servicios",
    "servicio": "Medición de Ruido Ambiental u Ocupacional",
    "viabilidad": "Condicionada",
    "modalidad": "Subcontratada o con equipo alquilado",
    "recursos": "Sonómetro/dosímetro calibrado; calibrador acústico; trípode; EPP; plan de medición; software/plantilla; informe.",
    "limitaciones": "No viable sin sonómetro/dosímetro calibrado.",
    "dificultad": "4 - Difícil",
    "prioridadComercial": "Baja"
  }
];
