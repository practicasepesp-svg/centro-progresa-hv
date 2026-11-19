# Creador de Hoja de Vida Institucional — Centro Progresa E.P.E.

Plataforma web diseñada especialmente para estudiantes de **UNIMINUTO Rectoría Bogotá**, desarrollada para facilitar la creación, previsualización en tiempo real y exportación a PDF de hojas de vida estandarizadas para postulación a **prácticas profesionales**.

🌐 **Aplicación en vivo:** [centro-progresa-hv.vercel.app](https://centro-progresa-hv.vercel.app/)

---

## Características Principales

- **Formulario estructurado por secciones:**
  1. **Información Personal:** Datos de contacto básicos y enlaces a portafolios o redes profesionales (LinkedIn, GitHub, etc.).
  2. **Perfil Profesional:** Perfil ocupacional, habilidades blandas, dominio de herramientas/software e idiomas (marco MCER).
  3. **Formación:** Formación académica principal en UNIMINUTO (preconfigurada), estudios previos y formación complementaria (cursos, talleres, diplomados).
  4. **Experiencia Profesional:** Experiencia laboral con funciones detalladas y proyectos académicos con enlaces de demostración.
  5. **Voluntariado:** Participación en organizaciones sociales, fundaciones o actividades comunitarias.
- **Vista previa en tiempo real:** Visualización instantánea del documento bajo la línea gráfica institucional de UNIMINUTO.
- **Exportación limpia a PDF:** Optimizada para la función nativa de impresión del navegador (`Guardar como PDF`), conservando hipervínculos activos, tipografía vectorial y saltos de página limpios sin cortes en medio de bloques.
- **100% Privacidad y Protección de Datos (Habeas Data):** De conformidad con la **Ley Estatutaria 1581 de 2012** de Colombia, la aplicación funciona completamente del lado del cliente. Ningún dato ingresado es almacenado en bases de datos ni enviado a servidores externos; toda la información se elimina automáticamente de la memoria al cerrar la pestaña o el navegador.

---

## Tecnologías Utilizadas

- **Framework:** Next.js 13 (App Router) y React 18
- **Lenguaje:** TypeScript
- **Estilos e Iconografía:** Tailwind CSS y Lucide React
- **Despliegue y Control de Versiones:** [GitHub](https://github.com/practicasepesp-svg/centro-progresa-hv) y [Vercel](https://vercel.com/practicas-profesionales/centro-progresa-hv)

---

## Licencia y Reconocimientos

Este proyecto es una adaptación institucional desarrollada para **UNIMINUTO Rectoría Bogotá (Centro Progresa E.P.E.)**, basada inicialmente en el proyecto de código abierto [OpenResume](https://github.com/xitanggg/open-resume) (Copyright © Xitang Zhao).

### Principales modificaciones respecto al proyecto original
- Rediseño completo de la interfaz, estructura y formulario en español bajo la identidad visual de UNIMINUTO.
- Eliminación del analizador de PDF y de dependencias externas; generación nativa de hoja de vida en formato tabla optimizada para impresión en navegador.
- Procesamiento 100% local en el navegador sin almacenamiento ni envío de datos a servidores externos (cumplimiento de la Ley 1581 de 2012 de Colombia).

De conformidad con la licencia del proyecto original, el código fuente de este repositorio se distribuye igualmente bajo los términos de la licencia **GNU Affero General Public License v3.0 (AGPL-3.0)**. Consulta el archivo [LICENSE](https://github.com/practicasepesp-svg/centro-progresa-hv/blob/main/LICENSE) para más detalles.

> **Nota sobre propiedad intelectual institucional:** Los logotipos, escudos e identidad visual de **UNIMINUTO** y **Centro Progresa E.P.E.** incluidos en la carpeta `public/` son propiedad intelectual de la Corporación Universitaria Minuto de Dios, no están cubiertos por la licencia AGPL-3.0 y su uso está reservado exclusivamente para fines institucionales.
