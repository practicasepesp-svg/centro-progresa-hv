# Creador de Hoja de Vida Institucional — Centro Progresa E.P.E.

Plataforma web diseñada especialmente para estudiantes de pregrado de **UNIMINUTO Rectoría Bogotá**, desarrollada para facilitar la creación, previsualización en tiempo real y exportación a PDF de hojas de vida estandarizadas para postulación a **prácticas profesionales**.

🌐 **Aplicación en vivo:** [centro-progresa-hv.vercel.app](https://centro-progresa-hv.vercel.app/)

---

## Características Principales

- **Formulario estructurado en 5 secciones:**
  1. **Información Personal:** Datos de contacto básicos y enlaces clicables a portafolios o redes profesionales (LinkedIn, GitHub, Behance, etc.).
  2. **Perfil Profesional:** Perfil ocupacional con contador de caracteres, limpieza automática de habilidades blandas, dominio de herramientas/software e idiomas (marco MCER).
  3. **Formación:** Catálogo integrado de programas de pregrado de UNIMINUTO Rectoría Bogotá (con asignación automática del nivel académico y opción de ingreso manual), estudios previos y formación complementaria presentada en cuadrícula de dos columnas.
  4. **Experiencia Profesional:** Experiencia laboral con funciones detalladas y proyectos académicos con enlaces de demostración.
  5. **Voluntariado:** Participación en organizaciones sociales, fundaciones o actividades comunitarias.
- **Vista previa en tiempo real e indicador de extensión:** Visualización instantánea bajo la línea gráfica institucional de UNIMINUTO con cálculo estimado de páginas (recomendado de 1 a 2 hojas).
- **Respaldo portátil local (`.json`) y guía interactiva:**
  - **Guardar / Cargar Avance:** Permite descargar un archivo `.json` directamente en el equipo del estudiante para retomar o actualizar su hoja de vida en el futuro sin depender de bases de datos externas.
  - **Cargar Ejemplo:** Rellena el formulario con una hoja de vida ilustrativa ficticia para orientar la redacción del estudiante.
- **Exportación limpia a PDF:** Optimizada para la función nativa de impresión del navegador (`Guardar como PDF`), conservando hipervínculos activos, tipografía vectorial (`Montserrat` empaquetada localmente con `next/font`) y saltos de página sin cortes en medio de bloques.
- **100% Privacidad y Protección de Datos (Habeas Data):** De conformidad con la **Ley Estatutaria 1581 de 2012** de Colombia, la aplicación funciona completamente del lado del cliente. Ningún dato ingresado es almacenado ni enviado a servidores externos; el borrador temporal en `sessionStorage` protege contra recargas accidentales y se elimina automáticamente al cerrar la pestaña o el navegador.

---

## Tecnologías Utilizadas

- **Framework:** Next.js 13 (App Router con `next/font/google`) y React 18
- **Lenguaje:** TypeScript
- **Estilos e Iconografía:** Tailwind CSS y Lucide React
- **Despliegue y Control de Versiones:** [GitHub](https://github.com/practicasepesp-svg/centro-progresa-hv) y [Vercel](https://vercel.com/practicas-profesionales/centro-progresa-hv)

---

## Licencia y Reconocimientos

Este proyecto es una adaptación institucional desarrollada para **UNIMINUTO Rectoría Bogotá (Centro Progresa E.P.E.)**, basada inicialmente en el proyecto de código abierto [OpenResume](https://github.com/xitanggg/open-resume) (Copyright © Xitang Zhao).

### Principales modificaciones respecto al proyecto original
- Rediseño completo de la interfaz, estructura y formulario en español bajo la identidad visual de UNIMINUTO Rectoría Bogotá.
- Eliminación del analizador de PDF y de dependencias externas; generación nativa de hoja de vida en formato tabla optimizada para impresión en navegador.
- Incorporación de respaldo local portátil (`.json`), guardado temporal en `sessionStorage` y procesamiento 100% local sin almacenamiento en servidores externos (cumplimiento de la Ley 1581 de 2012 de Colombia).

De conformidad con la licencia del proyecto original, el código fuente de este repositorio se distribuye igualmente bajo los términos de la licencia **GNU Affero General Public License v3.0 (AGPL-3.0)**. Consulta el archivo [LICENSE](https://github.com/practicasepesp-svg/centro-progresa-hv/blob/main/LICENSE) para más detalles.

> **Nota sobre propiedad intelectual institucional:** Los logotipos, escudos e identidad visual de **UNIMINUTO** y **Centro Progresa E.P.E.** incluidos en la carpeta `public/` son propiedad intelectual de la Corporación Universitaria Minuto de Dios, no están cubiertos por la licencia AGPL-3.0 y su uso está reservado exclusivamente para fines institucionales.
