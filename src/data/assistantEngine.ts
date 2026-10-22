import { INITIAL_SERVICES, ServiceItem } from './servicesData.js';

function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

export function processAssistantQuery(userMessage: string): string {
  const norm = normalizeText(userMessage);

  if (!norm) {
    return 'Por favor, ingrese una consulta sobre los servicios, normas ISO o requerimientos técnicos de QSSA.';
  }

  // 1. Saludos iniciales
  if (/^(hola|buen dia|buenos dias|buenas tardes|buenas noches|saludos|que tal|hola qssa)/i.test(norm) && norm.length < 25) {
    return `¡Hola! Bienvenido al Sistema de Calidad y Servicios de QSSA (Quality Standard Services Association S.R.L.).

Estoy a su disposición para orientarle técnicamente sobre nuestro catálogo oficial de 29 servicios en Bolivia e internacional:
• Capacitaciones "In House" y abiertas (ISO 9001, 14001, 45001, 17020, 17025).
• Diagnósticos y GAP Analysis de conformidad.
• Implementación de Sistemas de Gestión y Acreditación.
• Auditorías internas de 1ra y 2da parte.
• Servicios específicos para el Corredor Bioceánico Bolivia - Chile - Perú (OEA e ISO 28000).

¿En qué norma o servicio específico requiere asistencia técnica hoy?`;
  }

  // 2. Pregunta Sugerida: Capacitar auditores internos en ISO 9001
  if ((norm.includes('capacitar') || norm.includes('formar') || norm.includes('curso')) && norm.includes('auditor') && (norm.includes('9001') || norm.includes('calidad'))) {
    const s3 = INITIAL_SERVICES.find(s => s.orden === '3');
    const s10 = INITIAL_SERVICES.find(s => s.orden === '10');
    const s8 = INITIAL_SERVICES.find(s => s.orden === '8');

    return `Para capacitar y calificar a sus auditores internos en ISO 9001, la solución recomendada combina la formación teórico-práctica con el acompañamiento en auditorías reales:

📌 **1. Capacitación Base Oficial [Orden 3]: ${s3?.servicio}**
• **Categoría:** ${s3?.categoria}
• **Viabilidad:** ${s3?.viabilidad} (No requiere equipos propios).
• **Modalidad:** ${s3?.modalidad}.
• **Recursos:** ${s3?.recursos}
• **Beneficios:** Formación exhaustiva en la estructura de alto nivel de la norma, enfoque basado en riesgos y criterios de auditoría según ISO 19011.

📌 **2. Auditoría Interna Práctica [Orden 10]: ${s10?.servicio}**
• **Categoría:** ${s10?.categoria}
• **Viabilidad:** ${s10?.viabilidad}.
• **Modalidad:** ${s10?.modalidad}.
• **Acompañamiento:** Permite que sus futuros auditores participen como observadores o co-auditores guiados por un Auditor Líder senior de QSSA.

💡 Si su organización cuenta con un Sistema Integrado (Calidad, Ambiente y Seguridad), también disponemos del **Servicio [Orden 8]: ${s8?.servicio}**.`;
  }

  // 3. Pregunta Sugerida: Servicios sin necesidad de alquilar equipos de medición
  if ((norm.includes('sin necesidad') || norm.includes('sin equipo') || norm.includes('equipos propios') || norm.includes('alquilar equipo')) || (norm.includes('equipo') && norm.includes('medicion') && norm.includes('viab'))) {
    return `Dentro de la Matriz de 29 Servicios de QSSA, más del **85% de los servicios cuentan con Viabilidad Alta sin requerir adquisición ni alquiler de equipos de medición**, ya que se basan estrictamente en competencia técnica, análisis documental y metodologías de gestión:

1. 📚 **Capacitaciones Especializadas (Servicios 1 al 5):**
   • Interpretación ISO/IEC 17020 (Orden 1)
   • Interpretación ISO/IEC 17025 (Orden 2)
   • Interpretación ISO 9001 (Orden 3)
   • Interpretación ISO 14001 (Orden 4)
   • Interpretación ISO 45001 (Orden 5)

2. 🔍 **Diagnósticos de Sistemas de Gestión (Servicios 6, 7, 12, 13, 17, 18):**
   • Diagnóstico de línea base y GAP analysis para ISO 9001, ISO 14001, ISO 45001, ISO/IEC 17020, ISO/IEC 17025 y Programa OEA.

3. 📋 **Auditorías Internas (Servicios 8, 9, 10, 11, 15, 16):**
   • Auditorías internas integradas, a organismos de inspección, laboratorios y cumplimiento legal.

4. 🚀 **Implementación y Asesoría Técnica (Servicios 14, 19, 20, 24, 25, 26, 27):**
   • Desarrollo documental y puesta en marcha de Sistemas de Gestión ISO y requisitos OEA.

⚠️ *Únicamente servicios específicos como Medición de Ruido (Orden 29) o Ensayos/Validación física (Orden 28) requieren instrumental calibrado.*`;
  }

  // 4. Pregunta Sugerida: Corredor Bioceánico (Bolivia, Chile, Perú) y OEA / ISO 28000
  if (norm.includes('bioceanico') || norm.includes('corredor') || norm.includes('chile') || norm.includes('peru') || norm.includes('oea') || norm.includes('28000') || norm.includes('cadena de suministro')) {
    const s6 = INITIAL_SERVICES.find(s => s.orden === '6');
    const s11 = INITIAL_SERVICES.find(s => s.orden === '11');
    const s14 = INITIAL_SERVICES.find(s => s.orden === '14');
    const s20 = INITIAL_SERVICES.find(s => s.orden === '20');

    return `Para empresas de transporte internacional, agencias aduaneras, puertos y operadores logísticos del **Corredor Bioceánico Central (Bolivia - Chile - Perú)**, QSSA ofrece servicios clave de alta prioridad:

1. 🌐 **[Orden 14]: ${s14?.servicio}**
   • **Categoría:** ${s14?.categoria}
   • **Viabilidad:** ${s14?.viabilidad} | **Modalidad:** ${s14?.modalidad}
   • **Recursos:** ${s14?.recursos}
   • **Enfoque:** Cumplimiento de estándares de seguridad aduanera para agilizar el cruce en pasos fronterizos (Tambo Quemado, Pisiga, Arica, Iquique).

2. 🛡️ **[Orden 20]: ${s20?.servicio}**
   • **Categoría:** ${s20?.categoria}
   • **Viabilidad:** ${s20?.viabilidad} | **Modalidad:** ${s20?.modalidad}
   • **Recursos:** ${s20?.recursos}
   • **Enfoque:** Blindaje integral de la cadena logística internacional y prevención de riesgos.

3. 📋 **Diagnóstico y Auditorías OEA:**
   • **[Orden 6]:** ${s6?.servicio} (Evaluación inicial de cumplimiento).
   • **[Orden 11]:** ${s11?.servicio} (Auditoría periódica de mantenimiento de estatus OEA).`;
  }

  // 5. Pregunta Sugerida: Diferencia entre diagnóstico e implementación de ISO 17020
  if (norm.includes('diferencia') && (norm.includes('diagnostico') || norm.includes('gap')) && (norm.includes('implementacion') || norm.includes('asesoria') || norm.includes('17020'))) {
    const s17 = INITIAL_SERVICES.find(s => s.orden === '17');
    const s1 = INITIAL_SERVICES.find(s => s.orden === '1');
    const s9 = INITIAL_SERVICES.find(s => s.orden === '9');

    return `La diferencia técnica entre un **Diagnóstico** y una **Implementación** (específicamente en la norma **ISO/IEC 17020:2012** para Organismos de Inspección) radica en el objetivo, duración y entregables:

📊 **1. Diagnóstico de Organismo de Inspección [Orden 17]: ${s17?.servicio}**
• **Objetivo:** Evaluación puntual de línea base (GAP Analysis) para comparar la situación actual contra cada requisito de la norma.
• **Duración:** Rápida (1 a 3 semanas).
• **Entregable:** Informe ejecutivo con matriz cuantitativa de brechas, clasificación de hallazgos y la Hoja de Ruta técnica con el cronograma y recursos requeridos.
• **Viabilidad:** ${s17?.viabilidad} (No requiere equipos propios).

🛠️ **2. Proceso de Implementación Completo:**
• **Objetivo:** Es el proceso integral donde QSSA diseña, redacta y valida toda la estructura operativa del Organismo de Inspección.
• **Alcance:** Manual de calidad, procedimientos técnicos de inspección, políticas de imparcialidad e independencia (Tipo A, B o C), gestión de riesgos, trazabilidad metrológica y preparación de la auditoría interna ([Orden 9]: ${s9?.servicio}).
• **Duración:** Mediana (de 3 a 8 meses según el alcance de inspección).
• **Entregable:** Sistema completamente operativo listo para solicitar la auditoría de acreditación formal ante el Organismo Boliviano de Acreditación (OBA) o entes pares internacionales.

💡 *Paso inicial sugerido:* Cursar la capacitación oficial **[Orden 1]: ${s1?.servicio}** para familiarizar al equipo de inspectores.`;
  }

  // 6. Consultas sobre Contacto, Oficinas y Oruro
  if (norm.includes('contacto') || norm.includes('oruro') || norm.includes('direccion') || norm.includes('telefono') || norm.includes('whatsapp') || norm.includes('oficina') || norm.includes('sedes') || norm.includes('correo') || norm.includes('hostinger') || norm.includes('mail')) {
    return `🏢 **Datos Oficiales de Contacto de QSSA Bolivia:**

📍 **Sede Central Oruro:**
• **Dirección:** Urbanización Millenium , zona las retamas , calle s/n, Oruro - Bolivia
• **WhatsApp Bolivia:** [+591 77225772](https://wa.me/59177225772)
• **WhatsApp Chile / Internacional:** [+56979713820](https://wa.me/56979713820)
• **Correo Electrónico:** oruro@qssa-bolivia.com

✉️ **Acceso al Correo Institucional QSSA:**
• Inicia sesión en Hostinger Mail: [https://mail.hostinger.com/auth/login](https://mail.hostinger.com/auth/login)

🌐 **Otras Oficinas en Bolivia:**
• **La Paz:** Av. Arce N° 2631, Edificio Multicentro, Piso 12 (WhatsApp: +591 71100224)
• **Santa Cruz:** Equipetrol Norte, Calle 7 Oeste N° 14 (WhatsApp: +591 71100225)
• **Cochabamba:** Av. Pando N° 1122, Zona Recoleta (WhatsApp: +591 71100226)`;
  }

  // 7. Búsqueda por Norma ISO Específica
  const isoMatch = norm.match(/(17020|17025|9001|14001|45001|28000)/);
  if (isoMatch) {
    const isoCode = isoMatch[1];
    const matchingServices = INITIAL_SERVICES.filter(s => 
      s.servicio.includes(isoCode) || s.categoria.includes(isoCode) || s.recursos.includes(isoCode)
    );

    if (matchingServices.length > 0) {
      let response = `Encontré **${matchingServices.length} servicios oficiales** de QSSA relacionados con la norma **ISO ${isoCode}**:\n\n`;
      matchingServices.slice(0, 5).forEach(s => {
        response += `🔹 **Orden ${s.orden}: ${s.servicio}**\n`;
        response += `   • Categoría: ${s.categoria}\n`;
        response += `   • Viabilidad: ${s.viabilidad} | Modalidad: ${s.modalidad}\n`;
        response += `   • Recursos: ${s.recursos}\n\n`;
      });
      response += `Puede consultar los detalles completos de cualquiera de estos servicios desde la pestaña **"Servicios"** o solicitar una cotización técnica personalizada.`;
      return response;
    }
  }

  // 8. Búsqueda por Categoría (Capacitación, Diagnóstico, Auditoría, Implementación)
  if (norm.includes('capacita') || norm.includes('curso') || norm.includes('taller')) {
    const caps = INITIAL_SERVICES.filter(s => s.categoria.toLowerCase().includes('capacita'));
    return `QSSA cuenta con **${caps.length} cursos y capacitaciones especializadas** en modalidad In House y abierta:\n\n` +
      caps.map(s => `• **Orden ${s.orden}:** ${s.servicio} (${s.modalidad})`).join('\n') +
      `\n\nTodos los cursos incluyen material didáctico oficial, ejercicios prácticos de hallazgos y certificado con valor curricular.`;
  }

  if (norm.includes('diagnostico') || norm.includes('gap')) {
    const diags = INITIAL_SERVICES.filter(s => s.categoria.toLowerCase().includes('diagn'));
    return `En el área de **Diagnósticos de Sistemas de Gestión**, QSSA ofrece evaluación objetiva de cumplimiento para determinar el nivel de preparación de su empresa:\n\n` +
      diags.map(s => `• **Orden ${s.orden}:** ${s.servicio} — Viabilidad: ${s.viabilidad}`).join('\n') +
      `\n\nAl concluir el diagnóstico se entrega la matriz cuantitativa de hallazgos y el cronograma para la implementación.`;
  }

  if (norm.includes('auditoria') || norm.includes('auditor')) {
    const audits = INITIAL_SERVICES.filter(s => s.categoria.toLowerCase().includes('auditor') || s.servicio.toLowerCase().includes('auditor'));
    return `QSSA provee servicios de **Auditorías Internas (1ra parte) y de Proveedores (2da parte)** con auditores líderes certificados:\n\n` +
      audits.map(s => `• **Orden ${s.orden}:** ${s.servicio} (${s.modalidad})`).join('\n') +
      `\n\nNuestras auditorías garantizan un informe exhaustivo con hallazgos categorizados para asegurar su aprobación ante entes certificadores o acreditadores.`;
  }

  // 9. Búsqueda libre por coincidencia de palabras clave en el catálogo
  const words = norm.split(/\s+/).filter(w => w.length > 3 && !['para', 'como', 'donde', 'tiene', 'sobre', 'este', 'esta', 'unos', 'unas', 'pero', 'hacer'].includes(w));
  
  if (words.length > 0) {
    const scoredServices = INITIAL_SERVICES.map(service => {
      const fullText = normalizeText(`${service.orden} ${service.categoria} ${service.servicio} ${service.recursos} ${service.limitaciones} ${service.modalidad}`);
      let score = 0;
      words.forEach(w => {
        if (fullText.includes(w)) score += 1;
      });
      return { service, score };
    }).filter(item => item.score > 0).sort((a, b) => b.score - a.score);

    if (scoredServices.length > 0) {
      const topMatches = scoredServices.slice(0, 3);
      let response = `En base a su consulta, los servicios más relevantes en el catálogo de QSSA son:\n\n`;
      topMatches.forEach(({ service }) => {
        response += `📋 **Servicio [Orden ${service.orden}]: ${service.servicio}**\n`;
        response += `• **Categoría:** ${service.categoria}\n`;
        response += `• **Viabilidad:** ${service.viabilidad}\n`;
        response += `• **Modalidad:** ${service.modalidad}\n`;
        response += `• **Recursos:** ${service.recursos}\n\n`;
      });
      response += `Si desea más detalles sobre alguno de estos servicios o requiere una propuesta técnica a medida, puede indicarme el número de Orden o ingresar a la pestaña de Servicios.`;
      return response;
    }
  }

  // 10. Fallback asistido
  return `He analizado su consulta. QSSA cuenta con 29 servicios en normalización, diagnóstico, auditorías internas y sistemas de gestión ISO (9001, 14001, 45001, 17020, 17025 y OEA/ISO 28000).

Para brindarle una recomendación exacta, puede indicarme:
1. ¿Qué norma ISO o estándar busca implementar o auditar?
2. ¿Necesita capacitaciones para su personal, un diagnóstico de brechas o una auditoría interna?
3. ¿Su rubro corresponde a inspección, laboratorios de ensayo/calibración o transporte/logística?

También puede explorar la matriz interactiva en la pestaña **"Servicios"** o consultar en **"Contacto"** para comunicarse directamente con nuestras oficinas en Oruro (+591 77225772 / +56979713820).`;
}
