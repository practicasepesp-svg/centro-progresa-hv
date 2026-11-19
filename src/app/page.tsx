"use client";

import { useState, useEffect, useRef } from "react";
import {
  Printer, Briefcase, GraduationCap, Award, Phone, Mail, MapPin,
  Trash2, Plus, User, Languages, HeartHandshake, Link as LinkIcon,
  BookOpen, Wrench, CheckCircle, Globe, ShieldCheck, Code, ArrowRight,
  Sparkles, RotateCcw, Download, Upload, FileText, Cpu, CalendarCheck, ArrowUpDown
} from "lucide-react";

interface LinkItem { label: string; url: string; }
interface ToolItem { name: string; level: string; }
interface LanguageItem { language: string; level: string; }
interface Education { institution: string; degree: string; level: string; year: string; isCurrent?: boolean; semester?: string; }
interface ComplementaryEdu { title: string; institution: string; year: string; }
interface Experience { company: string; position: string; startDate: string; endDate: string; description: string; }
interface Project { name: string; role: string; description: string; linkLabel?: string; linkUrl?: string; }
interface Volunteer { organization: string; role: string; startDate: string; endDate: string; description: string; }

interface ResumeFormData {
  fullName: string;
  headline: string;
  availability: string;
  email: string;
  phone: string;
  city: string;
  links: LinkItem[];
  profile: string;
  technicalSkills: string;
  softSkills: string;
  toolsList: ToolItem[];
  languageList: LanguageItem[];
  prioritizeExperience: boolean;
  education: Education[];
  complementaryEdu: ComplementaryEdu[];
  experiences: Experience[];
  projects: Project[];
  volunteers: Volunteer[];
}

const UNIMINUTO_PROGRAMS: { name: string; level: string }[] = [
  { name: "Administración de Empresas", level: "Profesional" },
  { name: "Administración de Empresas Turísticas y Hoteleras", level: "Profesional" },
  { name: "Administración en Seguridad y Salud en el Trabajo", level: "Profesional" },
  { name: "Administración Financiera", level: "Profesional" },
  { name: "Ciencias Bíblicas", level: "Profesional" },
  { name: "Comunicación Social", level: "Profesional" },
  { name: "Comunicación Social Periodismo", level: "Profesional" },
  { name: "Comunicación Visual", level: "Profesional" },
  { name: "Contaduría Pública", level: "Profesional" },
  { name: "Creación Audiovisual", level: "Profesional" },
  { name: "Derecho", level: "Profesional" },
  { name: "Estudios en Filosofía", level: "Profesional" },
  { name: "Ingeniería Agroecológica", level: "Profesional" },
  { name: "Ingeniería Civil", level: "Profesional" },
  { name: "Ingeniería de Ciencias de Datos e Inteligencia Artificial", level: "Profesional" },
  { name: "Ingeniería de Sistemas", level: "Profesional" },
  { name: "Ingeniería en Electrónica y Sistemas Inteligentes", level: "Profesional" },
  { name: "Ingeniería Industrial", level: "Profesional" },
  { name: "Licenciatura en Ciencias Naturales y Educación Ambiental", level: "Profesional" },
  { name: "Licenciatura en Educación Artística", level: "Profesional" },
  { name: "Licenciatura en Educación Física", level: "Profesional" },
  { name: "Licenciatura en Educación Física, Recreación y Deportes", level: "Profesional" },
  { name: "Licenciatura en Educación Infantil", level: "Profesional" },
  { name: "Licenciatura en Filosofía", level: "Profesional" },
  { name: "Licenciatura en Humanidades y Lengua Castellana", level: "Profesional" },
  { name: "Licenciatura en Informática", level: "Profesional" },
  { name: "Licenciatura en Lengua Extranjera con Énfasis en Inglés", level: "Profesional" },
  { name: "Mercadeo", level: "Profesional" },
  { name: "Psicología", level: "Profesional" },
  { name: "Tecnología en Comunicación Gráfica", level: "Tecnólogo" },
  { name: "Tecnología en Costos y Auditoría", level: "Tecnólogo" },
  { name: "Tecnología en Electrónica", level: "Tecnólogo" },
  { name: "Tecnología en Gestión de Mercadeo", level: "Tecnólogo" },
  { name: "Tecnología en Gestión de Seguridad en Redes de Computadores", level: "Tecnólogo" },
  { name: "Tecnología en Gestión de Talento Humano", level: "Tecnólogo" },
  { name: "Tecnología en Informática", level: "Tecnólogo" },
  { name: "Tecnología en Logística Empresarial", level: "Tecnólogo" },
  { name: "Tecnología en Realización Audiovisual", level: "Tecnólogo" },
  { name: "Trabajo Social", level: "Profesional" },
];

const AVAILABILITY_OPTIONS: string[] = [
  "",
  "Disponible para Contrato de Aprendizaje (Tiempo Completo)",
  "Disponible para Convenio de Prácticas (Tiempo Completo)",
  "Disponible para Pasantía / Práctica Profesional",
  "Modalidad Validación por Experiencia Laboral",
  "Disponibilidad Inmediata - Tiempo Completo",
  "Disponibilidad Medio Tiempo"
];

const INITIAL_FORM_DATA: ResumeFormData = {
  fullName: "",
  headline: "",
  availability: "",
  email: "",
  phone: "",
  city: "Bogotá D.C.",
  links: [],
  profile: "",
  technicalSkills: "",
  softSkills: "",
  toolsList: [],
  languageList: [],
  prioritizeExperience: false,
  education: [
    {
      institution: "Corporación Universitaria Minuto de Dios - UNIMINUTO",
      degree: "",
      level: "Profesional",
      year: "",
      isCurrent: true,
      semester: ""
    }
  ],
  complementaryEdu: [],
  experiences: [],
  projects: [],
  volunteers: []
};

const SAMPLE_FORM_DATA: ResumeFormData = {
  fullName: "Diana Prince",
  headline: "Estudiante de Tecnología en Gestión de Mercadeo | Candidata a Práctica Profesional",
  availability: "Disponible para Contrato de Aprendizaje (Tiempo Completo)",
  email: "ejemplo.estudiante@uniminuto.edu.co",
  phone: "300 000 0000",
  city: "Bogotá D.C.",
  links: [
    { label: "LinkedIn", url: "linkedin.com/in/ejemplo-estudiante" },
    { label: "Portafolio", url: "behance.net/ejemplo-portafolio" }
  ],
  profile:
    "Estudiante de octavo semestre de Tecnología en Gestión de Mercadeo en UNIMINUTO Rectoría Bogotá, con dos años de experiencia en atención al cliente, apoyo comercial y gestión de contenidos digitales. Cuento con conocimientos en investigación de mercados, analítica web y estrategias de fidelización. Busco realizar mis prácticas profesionales aportando en el posicionamiento digital y análisis de campañas comerciales.",
  technicalSkills: "Investigación de mercados, Marketing digital, Servicio al cliente, Gestión comercial, Análisis de indicadores (KPI)",
  softSkills: "Trabajo en equipo, Comunicación asertiva, Orientación al logro, Pensamiento analítico",
  toolsList: [
    { name: "Microsoft Excel", level: "Avanzado" },
    { name: "Canva", level: "Avanzado" },
    { name: "Google Analytics", level: "Intermedio" }
  ],
  languageList: [
    { language: "Inglés", level: "B1 - Intermedio" }
  ],
  prioritizeExperience: false,
  education: [
    {
      institution: "Corporación Universitaria Minuto de Dios - UNIMINUTO",
      degree: "Tecnología en Gestión de Mercadeo",
      level: "Tecnólogo",
      year: "Octavo Semestre",
      isCurrent: true,
      semester: "Octavo Semestre"
    },
    {
      institution: "SENA - Servicio Nacional de Aprendizaje",
      degree: "Técnico en Asistencia Administrativa",
      level: "Técnico",
      year: "2021",
      isCurrent: false
    }
  ],
  complementaryEdu: [
    {
      title: "Curso de Marketing Digital y Analítica Web",
      institution: "UNIMINUTO - Educación Continua",
      year: "2025"
    },
    {
      title: "Taller de Excel Aplicado a la Gestión Comercial",
      institution: "Plataforma de Formación Virtual",
      year: "2024"
    }
  ],
  experiences: [
    {
      company: "Empresa Ejemplo S.A.S.",
      position: "Asesora Comercial y Servicio al Cliente",
      startDate: "Ene 2023",
      endDate: "Dic 2024",
      description:
        "Gestionar la atención personalizada y telefónica de más de 40 clientes diarios, logrando un índice de satisfacción superior al 92%.\nEstructurar bases de datos comerciales y seguimiento de cotizaciones en Microsoft Excel, reduciendo en un 20% los tiempos de respuesta.\nApoyar la ejecución de campañas promocionales en punto de venta para el lanzamiento de nuevas líneas de producto."
    }
  ],
  projects: [
    {
      name: "Plan Estratégico de Posicionamiento Digital para MiPymes Locales",
      role: "Líder de Investigación de Mercados (Proyecto Integrador)",
      description:
        "Elaboración de diagnóstico digital y plan de contenidos para emprendimientos locales mediante encuestas estructuradas y análisis de competencia.",
      linkLabel: "Presentación",
      linkUrl: "behance.net/ejemplo-portafolio"
    }
  ],
  volunteers: [
    {
      organization: "Pastoral Social UNIMINUTO",
      role: "Voluntaria de Apoyo Logístico y Comunitario",
      startDate: "Ago 2024",
      endDate: "Nov 2024",
      description:
        "Coordinar la logística de jornadas de recolección y entrega de kits escolares para niños en situación de vulnerabilidad."
    }
  ]
};

const STORAGE_KEY = "centro_progresa_hv_draft_v2";

export default function Home() {
  const [started, setStarted] = useState(false);
  const [formData, setFormData] = useState<ResumeFormData>(INITIAL_FORM_DATA);
  const [customProgramMode, setCustomProgramMode] = useState(false);
  const [estimatedPages, setEstimatedPages] = useState(1);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const resumeTableRef = useRef<HTMLTableElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Recuperar borrador temporal de sessionStorage (se borra al cerrar la pestaña)
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === "object" && Array.isArray(parsed.education)) {
          setFormData({ ...INITIAL_FORM_DATA, ...parsed });
          const primaryDegree = parsed.education[0]?.degree || "";
          if (primaryDegree && !UNIMINUTO_PROGRAMS.some((p) => p.name === primaryDegree)) {
            setCustomProgramMode(true);
          }
        }
      }
    } catch {
      // Ignorar errores de lectura
    }
  }, []);

  // Guardar borrador temporal en sessionStorage mientras la pestaña esté abierta
  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    } catch {
      // Ignorar errores de cuota
    }
  }, [formData]);

  // Calcular extensión estimada en páginas Carta
  useEffect(() => {
    if (!started) return;
    const timer = setTimeout(() => {
      if (resumeTableRef.current) {
        const height = resumeTableRef.current.offsetHeight;
        const pages = Math.max(1, Math.ceil(height / 980));
        setEstimatedPages(pages);
      }
    }, 120);
    return () => clearTimeout(timer);
  }, [formData, started]);

  const showToast = (msg: string) => {
    setStatusMessage(msg);
    setTimeout(() => setStatusMessage(null), 3500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLoadSample = () => {
    setFormData(SAMPLE_FORM_DATA);
    setCustomProgramMode(false);
    showToast("Ejemplo ilustrativo cargado. Puedes editarlo o limpiarlo cuando quieras.");
  };

  const handleResetForm = () => {
    setFormData(INITIAL_FORM_DATA);
    setCustomProgramMode(false);
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignorar
    }
    showToast("Formulario limpiado.");
  };

  const handleExportJson = () => {
    const dataStr = JSON.stringify(formData, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const safeName = (formData.fullName || "estudiante")
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9áéíóúñ]+/gi, "_");
    link.href = url;
    link.download = `hv_uniminuto_${safeName}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast("Respaldo descargado en tu equipo.");
  };

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(String(event.target?.result || ""));
        if (parsed && typeof parsed === "object" && Array.isArray(parsed.education)) {
          setFormData({
            ...INITIAL_FORM_DATA,
            ...parsed
          });
          const primaryDegree = parsed.education[0]?.degree || "";
          setCustomProgramMode(
            Boolean(primaryDegree && !UNIMINUTO_PROGRAMS.some((p) => p.name === primaryDegree))
          );
          showToast("Respaldo cargado correctamente.");
        } else {
          showToast("El archivo seleccionado no tiene un formato válido.");
        }
      } catch {
        showToast("No se pudo leer el archivo de respaldo.");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  // Selección de programa principal UNIMINUTO + actualización inteligente del titular si está vacío o automático
  const handlePrimaryProgramSelect = (value: string) => {
    if (value === "__OTHER__") {
      setCustomProgramMode(true);
      updateEducation(0, "degree", "");
      return;
    }
    setCustomProgramMode(false);
    const found = UNIMINUTO_PROGRAMS.find((p) => p.name === value);
    const newEdu = [...formData.education];
    newEdu[0] = {
      ...newEdu[0],
      degree: value,
      level: found ? found.level : newEdu[0].level
    };
    const isAutoHeadline =
      !formData.headline ||
      formData.headline.startsWith("Estudiante de ");
    const nextHeadline = value && isAutoHeadline
      ? `Estudiante de ${value} | Candidato a Práctica Profesional`
      : formData.headline;

    setFormData({ ...formData, education: newEdu, headline: nextHeadline });
  };

  // Enlaces Profesionales
  const addLink = () => {
    setFormData({ ...formData, links: [...formData.links, { label: "LinkedIn", url: "" }] });
  };
  const updateLink = (index: number, field: keyof LinkItem, value: string) => {
    const list = [...formData.links];
    list[index] = { ...list[index], [field]: value };
    setFormData({ ...formData, links: list });
  };
  const removeLink = (index: number) => {
    setFormData({ ...formData, links: formData.links.filter((_, i) => i !== index) });
  };

  // Herramientas
  const addTool = () => {
    setFormData({ ...formData, toolsList: [...formData.toolsList, { name: "", level: "Intermedio" }] });
  };
  const updateTool = (index: number, field: keyof ToolItem, value: string) => {
    const list = [...formData.toolsList];
    list[index] = { ...list[index], [field]: value };
    setFormData({ ...formData, toolsList: list });
  };
  const removeTool = (index: number) => {
    setFormData({ ...formData, toolsList: formData.toolsList.filter((_, i) => i !== index) });
  };

  // Idiomas
  const addLanguage = () => {
    setFormData({ ...formData, languageList: [...formData.languageList, { language: "", level: "B2 - Intermedio Alto" }] });
  };
  const updateLanguage = (index: number, field: keyof LanguageItem, value: string) => {
    const list = [...formData.languageList];
    list[index] = { ...list[index], [field]: value };
    setFormData({ ...formData, languageList: list });
  };
  const removeLanguage = (index: number) => {
    setFormData({ ...formData, languageList: formData.languageList.filter((_, i) => i !== index) });
  };

  // Formación Académica
  const addEducation = () => {
    setFormData({
      ...formData,
      education: [
        ...formData.education,
        { institution: "", degree: "", level: "Técnico", year: "", isCurrent: false, semester: "" }
      ]
    });
  };
  const updateEducation = (index: number, field: keyof Education, value: string | boolean) => {
    const newEdu = [...formData.education];
    newEdu[index] = { ...newEdu[index], [field]: value };
    setFormData({ ...formData, education: newEdu });
  };
  const removeEducation = (index: number) => {
    setFormData({ ...formData, education: formData.education.filter((_, i) => i !== index) });
  };

  // Formación Complementaria
  const addComplementary = () => {
    setFormData({ ...formData, complementaryEdu: [...formData.complementaryEdu, { title: "", institution: "", year: "" }] });
  };
  const updateComplementary = (index: number, field: keyof ComplementaryEdu, value: string) => {
    const list = [...formData.complementaryEdu];
    list[index] = { ...list[index], [field]: value };
    setFormData({ ...formData, complementaryEdu: list });
  };
  const removeComplementary = (index: number) => {
    setFormData({ ...formData, complementaryEdu: formData.complementaryEdu.filter((_, i) => i !== index) });
  };

  // Experiencia Laboral
  const addExperience = () => {
    setFormData({
      ...formData,
      experiences: [...formData.experiences, { company: "", position: "", startDate: "", endDate: "", description: "" }]
    });
  };
  const updateExperience = (index: number, field: keyof Experience, value: string) => {
    const newExp = [...formData.experiences];
    newExp[index] = { ...newExp[index], [field]: value };
    setFormData({ ...formData, experiences: newExp });
  };
  const removeExperience = (index: number) => {
    setFormData({ ...formData, experiences: formData.experiences.filter((_, i) => i !== index) });
  };

  // Proyectos Académicos
  const addProject = () => {
    setFormData({
      ...formData,
      projects: [...formData.projects, { name: "", role: "", description: "", linkLabel: "GitHub", linkUrl: "" }]
    });
  };
  const updateProject = (index: number, field: keyof Project, value: string) => {
    const list = [...formData.projects];
    list[index] = { ...list[index], [field]: value };
    setFormData({ ...formData, projects: list });
  };
  const removeProject = (index: number) => {
    setFormData({ ...formData, projects: formData.projects.filter((_, i) => i !== index) });
  };

  // Voluntariado
  const addVolunteer = () => {
    setFormData({
      ...formData,
      volunteers: [...formData.volunteers, { organization: "", role: "", startDate: "", endDate: "", description: "" }]
    });
  };
  const updateVolunteer = (index: number, field: keyof Volunteer, value: string) => {
    const list = [...formData.volunteers];
    list[index] = { ...list[index], [field]: value };
    setFormData({ ...formData, volunteers: list });
  };
  const removeVolunteer = (index: number) => {
    setFormData({ ...formData, volunteers: formData.volunteers.filter((_, i) => i !== index) });
  };

  // Limpieza automática de etiquetas cortas
  const cleanTagList = (raw: string) =>
    raw
      .split(",")
      .map((s) => s.replace(/\s+/g, " ").replace(/\.+$/, "").trim())
      .filter(Boolean);

  const parsedTechnicalSkills = cleanTagList(formData.technicalSkills);
  const parsedSoftSkills = cleanTagList(formData.softSkills);

  // Titular dinámico en cabecera
  const computedHeadline =
    formData.headline.trim() ||
    (formData.education[0]?.degree
      ? `Estudiante de ${formData.education[0].degree} | Candidato a Práctica Profesional`
      : "Candidato a Práctica Profesional");

  // Componente auxiliar para títulos principales blindados contra huérfanos
  const SectionHeading = ({ title }: { title: string }) => (
    <div className="print-keep-with-next" style={{ margin: "18px 0 12px 0", textAlign: "center" }}>
      <div style={{ borderTop: "2px solid #fbbf24", height: "1px", width: "100%" }}></div>
      <div style={{ marginTop: "-10px" }}>
        <span
          style={{
            backgroundColor: "#ffffff",
            padding: "0 12px",
            fontSize: "13px",
            fontWeight: 800,
            textTransform: "uppercase",
            color: "#020617",
            letterSpacing: "0.05em",
            lineHeight: "16px",
            display: "inline-block"
          }}
        >
          {title}
        </span>
      </div>
    </div>
  );

  // Bloque reutilizable de Formación para permitir ordenamiento dinámico
  const renderEducationSection = () =>
    formData.education.length > 0 ? (
      <div className="mb-5 pt-2 border-t border-slate-100">
        <SectionHeading title="Formación" />

        <div className="mb-3">
          <div
            className="print-keep-with-next"
            style={{
              fontSize: "11px",
              fontWeight: 800,
              textTransform: "uppercase",
              color: "#334155",
              letterSpacing: "0.03em",
              borderBottom: "1px solid #cbd5e1",
              paddingBottom: "4px",
              marginBottom: "10px",
              lineHeight: "14px"
            }}
          >
            Académica
          </div>
          {formData.education.map((edu, i) => (
            <div key={i} className="text-[12px] space-y-0.5 print-atomic-item mb-3 pb-2.5 border-b border-slate-100 last:border-b-0 break-words">
              <span className="font-black text-slate-900 uppercase block">
                {edu.degree || "Título a obtener / Programa"}{" "}
                <span className="font-normal text-blue-900 normal-case">({edu.level})</span>
              </span>
              <span className="text-blue-900 font-semibold block">{edu.institution || "Institución"}</span>
              <span className="text-slate-500 block text-[11px]">
                {edu.isCurrent ? `En curso — ${edu.year || "Semestre actual"}` : edu.year}
              </span>
            </div>
          ))}
        </div>

        {formData.complementaryEdu.length > 0 && (
          <div className="pt-1">
            <div
              className="print-keep-with-next"
              style={{
                fontSize: "11px",
                fontWeight: 800,
                textTransform: "uppercase",
                color: "#334155",
                letterSpacing: "0.03em",
                borderBottom: "1px solid #cbd5e1",
                paddingBottom: "4px",
                marginBottom: "10px",
                lineHeight: "14px"
              }}
            >
              Complementaria
            </div>
            <div className="grid grid-cols-2 gap-3">
              {formData.complementaryEdu.map((comp, i) => (
                <div key={i} className="text-[12px] space-y-0.5 print-atomic-item bg-slate-50 p-2.5 rounded border border-slate-100 break-words">
                  <span className="font-black text-slate-900 uppercase block leading-snug">{comp.title || "Curso o Taller"}</span>
                  <span className="text-blue-900 font-semibold block">{comp.institution || "Institución"}</span>
                  <span className="text-slate-500 block text-[11px]">{comp.year}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    ) : null;

  // Bloque reutilizable de Experiencia Profesional para permitir ordenamiento dinámico
  const renderExperienceSection = () =>
    formData.experiences.length > 0 || formData.projects.length > 0 ? (
      <div className="mb-5 pt-2 border-t border-slate-100">
        <SectionHeading title="Experiencia Profesional" />

        {formData.experiences.length > 0 && (
          <div className="mb-3">
            <div
              className="print-keep-with-next"
              style={{
                fontSize: "11px",
                fontWeight: 800,
                textTransform: "uppercase",
                color: "#334155",
                letterSpacing: "0.03em",
                borderBottom: "1px solid #cbd5e1",
                paddingBottom: "4px",
                marginBottom: "10px",
                lineHeight: "14px"
              }}
            >
              Laboral
            </div>
            {formData.experiences.map((exp, i) => (
              <div key={i} className="text-[12px] space-y-1.5 print-atomic-item mb-3.5 pb-3 border-b border-slate-100 last:border-b-0 break-words">
                <div>
                  <span className="font-black text-slate-900 uppercase block">{exp.position || "Cargo"}</span>
                  <span className="text-blue-900 font-semibold block">{exp.company || "Empresa"}</span>
                  <span className="text-slate-500 block text-[11px]">
                    {exp.startDate} {exp.endDate ? `- ${exp.endDate}` : ""}
                  </span>
                </div>
                <table className="w-full text-slate-700 leading-relaxed" style={{ borderCollapse: "collapse", marginTop: "4px" }}>
                  <tbody>
                    {exp.description.split(/\n/).map((item, idx) => {
                      const trimmed = item.trim();
                      return trimmed ? (
                        <tr key={idx} className="print-atomic-item">
                          <td style={{ width: "1cm", verticalAlign: "top", fontWeight: 600, paddingBottom: "3px" }}>{idx + 1}.</td>
                          <td className="break-words" style={{ verticalAlign: "top", paddingBottom: "3px", textAlign: "justify" }}>{trimmed}</td>
                        </tr>
                      ) : null;
                    })}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        )}

        {formData.projects.length > 0 && (
          <div className="pt-1">
            <div
              className="print-keep-with-next"
              style={{
                fontSize: "11px",
                fontWeight: 800,
                textTransform: "uppercase",
                color: "#334155",
                letterSpacing: "0.03em",
                borderBottom: "1px solid #cbd5e1",
                paddingBottom: "4px",
                marginBottom: "10px",
                lineHeight: "14px"
              }}
            >
              Proyectos Académicos, Semilleros y Monitorías
            </div>
            {formData.projects.map((proj, i) => (
              <div key={i} className="text-[12px] space-y-1.5 print-atomic-item mb-3.5 pb-3 border-b border-slate-100 last:border-b-0 break-words">
                <div>
                  <span className="font-black text-slate-900 uppercase block">{proj.name || "Proyecto"}</span>
                  <span className="text-blue-900 font-semibold block">{proj.role || "Rol"}</span>
                </div>

                {proj.description && (
                  <div className="space-y-1.5">
                    {proj.description.split(/\n/).map((paragraph, pIdx) => {
                      const trimmed = paragraph.trim();
                      return trimmed ? (
                        <p key={pIdx} className="text-slate-700 leading-relaxed text-justify break-words">
                          {trimmed}
                        </p>
                      ) : null;
                    })}
                  </div>
                )}

                {proj.linkUrl && (
                  <div className="pt-0.5">
                    <a
                      href={proj.linkUrl.startsWith("http://") || proj.linkUrl.startsWith("https://") ? proj.linkUrl : `https://${proj.linkUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-blue-900 hover:underline font-semibold text-[11px]"
                    >
                      <LinkIcon size={11} className="text-blue-900" />
                      {proj.linkLabel || "Enlace"}
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    ) : null;

  // PANTALLA INICIAL / LANDING PAGE
  if (!started) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-slate-900 flex flex-col text-slate-100">
        <header className="bg-blue-950/80 backdrop-blur-md text-white px-6 py-4 flex justify-between items-center border-b border-blue-800/60 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <img src="/bogota-blanco.svg" alt="Rectoría Bogotá" className="h-7 object-contain" />
              <div className="h-5 w-px bg-blue-700"></div>
              <img src="/progresa-blanco.svg" alt="Centro Progresa" className="h-7 object-contain" />
            </div>
            <div>
              <h1 className="text-sm font-bold tracking-tight text-white">
                Centro Progresa E.P.E.
              </h1>
              <p className="text-xs text-amber-400 font-medium">Prácticas Profesionales • UNIMINUTO Rectoría Bogotá</p>
            </div>
          </div>
        </header>

        <main className="flex-1 max-w-5xl w-full mx-auto p-6 lg:p-12 flex flex-col justify-center space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl lg:text-5xl font-black tracking-tight text-white leading-tight">
              Creador de Hoja de Vida <span className="text-amber-400">Profesional</span>
            </h2>
            <p className="text-slate-300 text-sm lg:text-base max-w-2xl mx-auto leading-relaxed">
              Diseñado especialmente para estudiantes de pregrado de UNIMINUTO Rectoría Bogotá que buscan postularse a sus prácticas profesionales.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-900/40 backdrop-blur-md border border-blue-700/60 rounded-2xl p-6 space-y-3 shadow-lg">
              <div className="w-10 h-10 rounded-xl bg-amber-400/20 flex items-center justify-center text-amber-400 font-bold">
                <BookOpen size={20} />
              </div>
              <h3 className="text-lg font-bold text-white">1. ¿Cómo funciona?</h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                Es muy sencillo. Solo debes completar el formulario con tu información personal, formación académica institucional, perfil y experiencia mientras observas una <strong>vista previa en tiempo real</strong>. Además, puedes usar el botón <strong>Guardar Avance</strong> para descargar un archivo de respaldo en tu computador y utilizar <strong>Cargar Avance</strong> en cualquier momento si deseas retomarlo o actualizarlo más adelante, antes de exportarlo a PDF desde tu navegador.
              </p>
            </div>

            <div className="bg-blue-900/40 backdrop-blur-md border border-blue-700/60 rounded-2xl p-6 space-y-3 shadow-lg">
              <div className="w-10 h-10 rounded-xl bg-emerald-400/20 flex items-center justify-center text-emerald-400 font-bold">
                <ShieldCheck size={20} />
              </div>
              <h3 className="text-lg font-bold text-white">2. Privacidad y Protección de Datos</h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                De conformidad con la <strong className="text-white">Ley estatutaria 1581 de 2012</strong> de protección de datos personales en Colombia (Habeas Data), te informamos que <strong className="text-amber-400">ninguna información personal es almacenada ni enviada a servidores externos</strong>. Todo el proceso ocurre de forma 100% local en tu navegador web. <strong className="text-white">En cuanto cierres la pestaña o el navegador, todos los datos ingresados se borran automáticamente de la memoria</strong>, garantizando absoluta seguridad y confidencialidad con tu información.
              </p>
            </div>
          </div>

          <div className="flex justify-center pt-4">
            <button
              onClick={() => setStarted(true)}
              className="bg-amber-400 hover:bg-amber-300 text-blue-950 font-extrabold text-sm lg:text-base px-8 py-4 rounded-2xl shadow-xl shadow-amber-500/20 flex items-center gap-3 transition transform hover:-translate-y-0.5 active:scale-95 cursor-pointer"
            >
              Comenzar a Crear mi Hoja de Vida <ArrowRight size={20} />
            </button>
          </div>

          <div className="border-t border-blue-800/80 pt-6 mt-8 text-center space-y-3">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest flex items-center justify-center gap-1.5">
              <Code size={14} className="text-amber-400" /> Reconocimientos y Código Abierto
            </p>
            <div className="flex flex-wrap justify-center items-center gap-4 text-xs text-slate-300">
              <a
                href="https://github.com/xitanggg/open-resume"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 bg-blue-950/60 hover:bg-blue-900/80 px-3 py-1.5 rounded-lg border border-blue-800 hover:border-amber-400/60 transition"
              >
                <span>Basado en <strong className="text-white underline decoration-amber-400/60">OpenResume</strong> (AGPL-3.0)</span>
              </a>
              <a
                href="https://github.com/practicasepesp-svg/centro-progresa-hv"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 bg-blue-950/60 hover:bg-blue-900/80 px-3 py-1.5 rounded-lg border border-blue-800 hover:border-amber-400/60 transition"
              >
                <span>Código fuente en <strong className="text-white underline decoration-amber-400/60">GitHub</strong></span>
              </a>
              <span className="flex items-center gap-1.5 bg-blue-950/60 px-3 py-1.5 rounded-lg border border-blue-800">
                Hosting en <strong className="text-white">Vercel</strong>
              </span>
              <span className="flex items-center gap-1.5 bg-blue-950/60 px-3 py-1.5 rounded-lg border border-blue-800">
                Asistencia de <strong className="text-white">Gemini AI</strong>
              </span>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // APLICACIÓN / FORMULARIO PRINCIPAL
  return (
    <div className="min-h-screen bg-blue-950 flex flex-col text-slate-100 print:bg-white print:min-h-0">
      <style jsx global>{`
        @media print, screen {
          .print-atomic-item {
            break-inside: avoid;
            page-break-inside: avoid;
            display: block;
          }
          .print-keep-with-next {
            break-inside: avoid;
            page-break-inside: avoid;
            break-after: avoid;
            page-break-after: avoid;
            display: block;
          }
        }

        @media print {
          @page {
            size: letter;
            margin: 1cm;
          }
          body {
            background: white !important;
            -webkit-print-color-adjust: exact;
          }
          header, .print\\:hidden {
            display: none !important;
          }
          .resume-sheet {
            box-shadow: none !important;
            margin: 0 !important;
            width: 100% !important;
            max-width: none !important;
            border: none !important;
          }
        }
      `}</style>

      {/* Notificación flotante */}
      {statusMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-blue-900 border border-amber-400 text-white text-xs font-semibold px-4 py-3 rounded-xl shadow-2xl print:hidden">
          {statusMessage}
        </div>
      )}

      {/* Barra superior institucional */}
      <header className="bg-blue-900 text-white px-4 lg:px-6 py-3.5 print:hidden flex flex-wrap items-center gap-3 border-b border-blue-800 shadow-xl">
        <div className="flex items-center gap-3 lg:gap-4">
          <button
            onClick={() => setStarted(false)}
            className="text-xs text-blue-200 hover:text-white bg-blue-800/60 hover:bg-blue-800 px-3 py-1.5 rounded-lg font-medium transition flex items-center gap-1 cursor-pointer"
            title="Volver a la página de bienvenida"
          >
            ← Inicio
          </button>
          <div className="h-4 w-px bg-blue-700 hidden sm:block"></div>
          <div className="hidden sm:flex items-center gap-3">
            <img src="/bogota-blanco.svg" alt="Rectoría Bogotá" className="h-6 object-contain" />
            <div className="h-4 w-px bg-blue-700"></div>
            <img src="/progresa-blanco.svg" alt="Centro Progresa" className="h-6 object-contain" />
          </div>
          <div>
            <h1 className="text-xs lg:text-sm font-bold tracking-tight text-white">
              Creador de Hoja de Vida Institucional
            </h1>
            <p className="text-[11px] text-blue-200">Centro Progresa E.P.E. • Prácticas Profesionales</p>
          </div>
        </div>

        <div className="ml-auto flex flex-wrap items-center justify-end gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept=".json,application/json"
            onChange={handleImportJson}
            className="hidden"
          />
          <button
            onClick={handleExportJson}
            className="bg-blue-950/80 hover:bg-blue-800 text-blue-100 border border-blue-700 text-[11px] font-semibold px-3 py-2 rounded-xl flex items-center gap-1.5 transition cursor-pointer"
            title="Descargar archivo de respaldo (.json) para continuar después"
          >
            <Download size={14} className="text-amber-400" /> Guardar Avance
          </button>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="bg-blue-950/80 hover:bg-blue-800 text-blue-100 border border-blue-700 text-[11px] font-semibold px-3 py-2 rounded-xl flex items-center gap-1.5 transition cursor-pointer"
            title="Cargar un archivo de respaldo (.json) guardado previamente"
          >
            <Upload size={14} className="text-amber-400" /> Cargar Avance
          </button>
          <button
            onClick={() => window.print()}
            className="bg-amber-400 hover:bg-amber-300 text-blue-950 text-xs font-black px-4 lg:px-5 py-2 rounded-xl flex items-center gap-2 shadow-lg shadow-amber-500/20 transition transform active:scale-95 cursor-pointer"
            title="En Destino, elige Guardar como PDF para conservar los enlaces"
          >
            <Printer size={16} /> Imprimir / Guardar PDF
          </button>
        </div>
      </header>

      {/* Contenedor principal */}
      <div className="flex-1 max-w-[1800px] w-full mx-auto p-4 lg:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start print:block print:p-0 print:m-0 print:w-full print:max-w-none">
        
        {/* PANEL IZQUIERDO: Formulario */}
        <div className="lg:col-span-5 bg-blue-900/90 backdrop-blur-md rounded-2xl shadow-2xl border border-blue-800/80 overflow-hidden print:hidden flex flex-col max-h-[88vh] overflow-y-auto p-5 lg:p-6 space-y-5">
          
          {/* Barra de ayuda rápida: Cargar ejemplo o limpiar */}
          <div className="bg-blue-950/90 border border-blue-800 rounded-xl px-4 py-3 flex flex-wrap items-center justify-between gap-2">
            <span className="text-[11px] text-blue-200 font-medium">
              ¿No sabes cómo empezar?
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={handleLoadSample}
                className="text-[11px] bg-blue-800 hover:bg-blue-700 text-amber-300 font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition cursor-pointer"
              >
                <Sparkles size={13} /> Cargar Ejemplo
              </button>
              <button
                onClick={handleResetForm}
                className="text-[11px] bg-blue-900 hover:bg-rose-950/70 text-slate-300 hover:text-rose-200 border border-blue-800 font-semibold px-2.5 py-1.5 rounded-lg flex items-center gap-1 transition cursor-pointer"
                title="Borrar todos los campos"
              >
                <RotateCcw size={12} /> Limpiar
              </button>
            </div>
          </div>

          {/* SECCIÓN 1: INFORMACIÓN PERSONAL */}
          <div className="bg-blue-950/80 border border-blue-800 rounded-xl p-5 space-y-4 shadow-sm">
            <h2 className="text-xs font-extrabold uppercase tracking-widest text-amber-400 flex items-center gap-2 border-b border-blue-900 pb-2">
              <User size={15} /> 1. Información Personal
            </h2>
            <div>
              <label className="block text-[11px] font-semibold text-blue-200 mb-1">Nombre Completo</label>
              <input
                type="text"
                name="fullName"
                lang="es-CO"
                spellCheck={true}
                placeholder="Ej. Diana Prince"
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full p-3 text-[12px] bg-blue-900 border border-blue-700 rounded-xl text-white outline-none focus:border-amber-400 transition"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-blue-200 mb-1">
                Titular Profesional <span className="text-blue-300 font-normal">(se actualiza con tu programa o puedes editarlo)</span>
              </label>
              <input
                type="text"
                name="headline"
                lang="es-CO"
                spellCheck={true}
                placeholder="Ej. Estudiante de Ingeniería de Sistemas | Candidato a Práctica Profesional"
                value={formData.headline}
                onChange={handleInputChange}
                className="w-full p-3 text-[12px] bg-blue-900 border border-blue-700 rounded-xl text-white outline-none focus:border-amber-400 transition"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-blue-200 mb-1">Correo Electrónico</label>
                <input
                  type="email"
                  name="email"
                  lang="es-CO"
                  spellCheck={false}
                  placeholder="ejemplo.estudiante@uniminuto.edu.co"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-3 text-[12px] bg-blue-900 border border-blue-700 rounded-xl text-white outline-none focus:border-amber-400"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-blue-200 mb-1">Celular</label>
                <input
                  type="text"
                  name="phone"
                  lang="es-CO"
                  spellCheck={false}
                  placeholder="300 000 0000"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full p-3 text-[12px] bg-blue-900 border border-blue-700 rounded-xl text-white outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-blue-200 mb-1">Ciudad</label>
                <input
                  type="text"
                  name="city"
                  lang="es-CO"
                  spellCheck={true}
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full p-3 text-[12px] bg-blue-900 border border-blue-700 rounded-xl text-white outline-none focus:border-amber-400"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-blue-200 mb-1">Modalidad / Disponibilidad</label>
                <select
                  name="availability"
                  value={formData.availability}
                  onChange={handleInputChange}
                  className="w-full p-3 text-[12px] bg-blue-900 border border-blue-700 rounded-xl text-white outline-none focus:border-amber-400"
                >
                  <option value="">No especificar</option>
                  {AVAILABILITY_OPTIONS.filter(Boolean).map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Enlaces / Portafolios */}
            <div className="space-y-3 pt-2 border-t border-blue-900/60">
              <span className="text-[11px] font-bold text-blue-200 flex items-center gap-1"><LinkIcon size={13} /> Enlaces y Portafolios</span>
              {formData.links.map((link, idx) => (
                <div key={idx} className="flex gap-2 items-center bg-blue-900/40 p-2.5 rounded-lg border border-blue-800">
                  <input type="text" lang="es-CO" spellCheck={true} placeholder="Red (Ej. LinkedIn)" value={link.label} onChange={(e) => updateLink(idx, "label", e.target.value)} className="w-1/3 p-2 text-[12px] bg-blue-950 border border-blue-800 rounded text-white" />
                  <input type="text" lang="es-CO" spellCheck={false} placeholder="URL (linkedin.com/in/...)" value={link.url} onChange={(e) => updateLink(idx, "url", e.target.value)} className="flex-1 p-2 text-[12px] bg-blue-950 border border-blue-800 rounded text-white" />
                  <button onClick={() => removeLink(idx)} className="text-rose-300 hover:text-rose-100 p-1 cursor-pointer"><Trash2 size={14} /></button>
                </div>
              ))}
              <div className="flex justify-end pt-1">
                <button onClick={addLink} className="text-[11px] bg-amber-400 hover:bg-amber-300 text-blue-950 px-3 py-1.5 rounded-lg font-bold flex items-center gap-1 shadow transition cursor-pointer">
                  <Plus size={13} /> Añadir Enlace
                </button>
              </div>
            </div>
          </div>

          {/* SECCIÓN 2: PERFIL PROFESIONAL */}
          <div className="bg-blue-950/80 border border-blue-800 rounded-xl p-5 space-y-4 shadow-sm">
            <h2 className="text-xs font-extrabold uppercase tracking-widest text-amber-400 flex items-center gap-2 border-b border-blue-900 pb-2">
              <Award size={15} /> 2. Perfil Profesional
            </h2>
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-[11px] font-semibold text-blue-200">Perfil Ocupacional</label>
                <span className="text-[10px] text-blue-300">{formData.profile.length} caracteres</span>
              </div>
              <p className="text-[10px] text-blue-300/90 mb-1.5 leading-relaxed">
                💡 <strong>Estructura recomendada (4–5 líneas):</strong> Programa y semestre + conocimientos clave + experiencia o proyectos + qué valor aportarás en la práctica.
              </p>
              <textarea
                name="profile"
                lang="es-CO"
                spellCheck={true}
                rows={4}
                placeholder="Estudiante de octavo semestre de... con conocimientos en... Busco realizar mis prácticas profesionales aportando en..."
                value={formData.profile}
                onChange={handleInputChange}
                className="w-full p-3 text-[12px] bg-blue-900 border border-blue-700 rounded-xl text-white outline-none focus:border-amber-400 resize-y"
              ></textarea>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-blue-200 mb-1">
                Conocimientos Técnicos / Áreas de Dominio <span className="text-amber-300 font-normal">(palabras clave de tu carrera)</span>
              </label>
              <input
                type="text"
                name="technicalSkills"
                lang="es-CO"
                spellCheck={true}
                placeholder="Ej. NIIF, Liquidación de nómina, SG-SST, Investigación de mercados, SQL"
                value={formData.technicalSkills}
                onChange={handleInputChange}
                className="w-full p-3 text-[12px] bg-blue-900 border border-blue-700 rounded-xl text-white outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-blue-200 mb-1">Competencias Blandas (separadas por comas)</label>
              <input
                type="text"
                name="softSkills"
                lang="es-CO"
                spellCheck={true}
                placeholder="Ej. Trabajo en equipo, Comunicación asertiva, Orientación al logro"
                value={formData.softSkills}
                onChange={handleInputChange}
                className="w-full p-3 text-[12px] bg-blue-900 border border-blue-700 rounded-xl text-white outline-none focus:border-amber-400"
              />
            </div>

            {/* Herramientas */}
            <div className="space-y-3 pt-2 border-t border-blue-900/60">
              <span className="text-[11px] font-bold text-blue-200 flex items-center gap-1"><Wrench size={13} /> Herramientas (Software / Apps)</span>
              {formData.toolsList.map((tool, idx) => (
                <div key={idx} className="flex gap-2 items-center bg-blue-900/40 p-2.5 rounded-lg border border-blue-800">
                  <input type="text" lang="es-CO" spellCheck={true} placeholder="Ej. Microsoft Excel, SAP, Canva" value={tool.name} onChange={(e) => updateTool(idx, "name", e.target.value)} className="flex-1 p-2 text-[12px] bg-blue-950 border border-blue-800 rounded text-white" />
                  <select value={tool.level} onChange={(e) => updateTool(idx, "level", e.target.value)} className="p-2 text-[12px] bg-blue-950 border border-blue-800 rounded text-white">
                    <option value="Básico">Básico</option>
                    <option value="Intermedio">Intermedio</option>
                    <option value="Avanzado">Avanzado</option>
                    <option value="Experto">Experto</option>
                  </select>
                  <button onClick={() => removeTool(idx)} className="text-rose-300 hover:text-rose-100 p-1 cursor-pointer"><Trash2 size={14} /></button>
                </div>
              ))}
              <div className="flex justify-end pt-1">
                <button onClick={addTool} className="text-[11px] bg-amber-400 hover:bg-amber-300 text-blue-950 px-3 py-1.5 rounded-lg font-bold flex items-center gap-1 shadow transition cursor-pointer">
                  <Plus size={13} /> Añadir Herramienta
                </button>
              </div>
            </div>

            {/* Idiomas */}
            <div className="space-y-3 pt-2 border-t border-blue-900/60">
              <span className="text-[11px] font-bold text-blue-200 flex items-center gap-1"><Languages size={13} /> Idiomas</span>
              {formData.languageList.map((lang, idx) => (
                <div key={idx} className="flex gap-2 items-center bg-blue-900/40 p-2.5 rounded-lg border border-blue-800">
                  <input type="text" lang="es-CO" spellCheck={true} placeholder="Ej. Inglés, Francés" value={lang.language} onChange={(e) => updateLanguage(idx, "language", e.target.value)} className="flex-1 p-2 text-[12px] bg-blue-950 border border-blue-800 rounded text-white" />
                  <select value={lang.level} onChange={(e) => updateLanguage(idx, "level", e.target.value)} className="p-2 text-[12px] bg-blue-950 border border-blue-800 rounded text-white">
                    <option value="A1 - Principiante">A1 - Principiante</option>
                    <option value="A2 - Básico">A2 - Básico</option>
                    <option value="B1 - Intermedio">B1 - Intermedio</option>
                    <option value="B2 - Intermedio Alto">B2 - Intermedio Alto</option>
                    <option value="C1 - Avanzado">C1 - Avanzado</option>
                    <option value="C2 - Maestría / Nativo">C2 - Maestría / Nativo</option>
                  </select>
                  <button onClick={() => removeLanguage(idx)} className="text-rose-300 hover:text-rose-100 p-1 cursor-pointer"><Trash2 size={14} /></button>
                </div>
              ))}
              <div className="flex justify-end pt-1">
                <button onClick={addLanguage} className="text-[11px] bg-amber-400 hover:bg-amber-300 text-blue-950 px-3 py-1.5 rounded-lg font-bold flex items-center gap-1 shadow transition cursor-pointer">
                  <Plus size={13} /> Añadir Idioma
                </button>
              </div>
            </div>
          </div>

          {/* SECCIÓN 3: FORMACIÓN */}
          <div className="bg-blue-950/80 border border-blue-800 rounded-xl p-5 space-y-4 shadow-sm">
            <div className="flex flex-wrap justify-between items-center gap-2 border-b border-blue-900 pb-2">
              <h2 className="text-xs font-extrabold uppercase tracking-widest text-amber-400 flex items-center gap-2">
                <GraduationCap size={15} /> 3. Formación
              </h2>
              <label className="flex items-center gap-1.5 text-[10px] font-semibold text-blue-200 bg-blue-900/70 px-2.5 py-1 rounded-lg border border-blue-800 cursor-pointer" title="Activa esta opción si ya tienes experiencia laboral relevante en tu área y deseas mostrarla antes que tus estudios">
                <input
                  type="checkbox"
                  checked={formData.prioritizeExperience}
                  onChange={(e) => setFormData({ ...formData, prioritizeExperience: e.target.checked })}
                  className="rounded bg-blue-950 border-blue-700"
                />
                <ArrowUpDown size={11} className="text-amber-400" /> Priorizar Experiencia arriba
              </label>
            </div>

            {/* Académica */}
            <div className="space-y-3 pt-1">
              <span className="text-[11px] font-bold text-blue-200">Formación Académica</span>
              {formData.education.map((edu, idx) => (
                <div key={idx} className="p-3 border border-blue-800 rounded-xl bg-blue-900/50 space-y-2 relative">
                  {idx > 0 && (
                    <button onClick={() => removeEducation(idx)} className="absolute top-2.5 right-2.5 text-rose-300 hover:text-rose-100 cursor-pointer"><Trash2 size={14} /></button>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-amber-300">{idx === 0 ? "★ Pregrado Principal (UNIMINUTO)" : `Estudio #${idx + 1}`}</span>
                    <label className="flex items-center gap-1 text-[10px] text-blue-200 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={edu.isCurrent || false}
                        onChange={(e) => updateEducation(idx, "isCurrent", e.target.checked)}
                        className="rounded bg-blue-950 border-blue-700"
                      /> En curso
                    </label>
                  </div>

                  {idx === 0 ? (
                    <>
                      <input type="text" disabled value="Corporación Universitaria Minuto de Dios - UNIMINUTO" className="w-full p-2 text-[12px] bg-blue-950/60 border border-blue-800/60 rounded text-blue-300 cursor-not-allowed" />
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <select
                          value={customProgramMode ? "__OTHER__" : edu.degree}
                          onChange={(e) => handlePrimaryProgramSelect(e.target.value)}
                          className="p-2 text-[12px] bg-blue-950 border border-blue-800 rounded text-white"
                        >
                          <option value="">Selecciona tu programa...</option>
                          {UNIMINUTO_PROGRAMS.map((prog) => (
                            <option key={prog.name} value={prog.name}>
                              {prog.name}
                            </option>
                          ))}
                          <option value="__OTHER__">Otro programa (escribir manualmente)</option>
                        </select>
                        <select
                          value={edu.level}
                          onChange={(e) => updateEducation(idx, "level", e.target.value)}
                          className="p-2 text-[12px] bg-blue-950 border border-blue-800 rounded text-white"
                        >
                          <option value="Técnico">Técnico</option>
                          <option value="Tecnólogo">Tecnólogo</option>
                          <option value="Profesional">Profesional</option>
                        </select>
                      </div>
                      {customProgramMode && (
                        <input
                          type="text"
                          lang="es-CO"
                          spellCheck={true}
                          placeholder="Escribe el nombre oficial de tu programa de pregrado"
                          value={edu.degree}
                          onChange={(e) => updateEducation(idx, "degree", e.target.value)}
                          className="w-full p-2 text-[12px] bg-blue-950 border border-amber-400/60 rounded text-white"
                        />
                      )}
                    </>
                  ) : (
                    <>
                      <input type="text" lang="es-CO" spellCheck={true} placeholder="Institución (Ej. SENA, Colegio...)" value={edu.institution} onChange={(e) => updateEducation(idx, "institution", e.target.value)} className="w-full p-2 text-[12px] bg-blue-950 border border-blue-800 rounded text-white" />
                      <div className="grid grid-cols-2 gap-2">
                        <input type="text" lang="es-CO" spellCheck={true} placeholder="Título obtenido" value={edu.degree} onChange={(e) => updateEducation(idx, "degree", e.target.value)} className="p-2 text-[12px] bg-blue-950 border border-blue-800 rounded text-white" />
                        <select value={edu.level} onChange={(e) => updateEducation(idx, "level", e.target.value)} className="p-2 text-[12px] bg-blue-950 border border-blue-800 rounded text-white">
                          <option value="Bachiller">Bachiller</option>
                          <option value="Técnico">Técnico</option>
                          <option value="Tecnólogo">Tecnólogo</option>
                          <option value="Profesional">Profesional</option>
                        </select>
                      </div>
                    </>
                  )}

                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      lang="es-CO"
                      spellCheck={false}
                      placeholder={edu.isCurrent ? "Ej. Octavo Semestre" : "Año de grado (Ej. 2024)"}
                      value={edu.year}
                      onChange={(e) => updateEducation(idx, "year", e.target.value)}
                      className="p-2 text-[12px] bg-blue-950 border border-blue-800 rounded text-white"
                    />
                  </div>
                </div>
              ))}
              <div className="flex justify-end pt-1">
                <button onClick={addEducation} className="text-[11px] bg-amber-400 hover:bg-amber-300 text-blue-950 px-3 py-1.5 rounded-lg font-bold flex items-center gap-1 shadow transition cursor-pointer">
                  <Plus size={13} /> Añadir Título
                </button>
              </div>
            </div>

            {/* Complementaria */}
            <div className="space-y-3 pt-3 border-t border-blue-900/60">
              <span className="text-[11px] font-bold text-blue-200">Formación Complementaria</span>
              {formData.complementaryEdu.map((comp, idx) => (
                <div key={idx} className="p-3 border border-blue-800 rounded-xl bg-blue-900/50 space-y-2 relative">
                  <button onClick={() => removeComplementary(idx)} className="absolute top-2.5 right-2.5 text-rose-300 hover:text-rose-100 cursor-pointer"><Trash2 size={14} /></button>
                  <input type="text" lang="es-CO" spellCheck={true} placeholder="Nombre del Curso o Taller" value={comp.title} onChange={(e) => updateComplementary(idx, "title", e.target.value)} className="w-full p-2 text-[12px] bg-blue-950 border border-blue-800 rounded text-white" />
                  <div className="grid grid-cols-2 gap-2">
                    <input type="text" lang="es-CO" spellCheck={true} placeholder="Institución / Plataforma" value={comp.institution} onChange={(e) => updateComplementary(idx, "institution", e.target.value)} className="w-full p-2 text-[12px] bg-blue-950 border border-blue-800 rounded text-white" />
                    <input type="text" lang="es-CO" spellCheck={false} placeholder="Año (Ej. 2025)" value={comp.year} onChange={(e) => updateComplementary(idx, "year", e.target.value)} className="w-full p-2 text-[12px] bg-blue-950 border border-blue-800 rounded text-white" />
                  </div>
                </div>
              ))}
              <div className="flex justify-end pt-1">
                <button onClick={addComplementary} className="text-[11px] bg-amber-400 hover:bg-amber-300 text-blue-950 px-3 py-1.5 rounded-lg font-bold flex items-center gap-1 shadow transition cursor-pointer">
                  <Plus size={13} /> Añadir Curso / Taller
                </button>
              </div>
            </div>
          </div>

          {/* SECCIÓN 4: EXPERIENCIA PROFESIONAL */}
          <div className="bg-blue-950/80 border border-blue-800 rounded-xl p-5 space-y-4 shadow-sm">
            <h2 className="text-xs font-extrabold uppercase tracking-widest text-amber-400 flex items-center gap-2 border-b border-blue-900 pb-2">
              <Briefcase size={15} /> 4. Experiencia Profesional
            </h2>

            {/* Laboral */}
            <div className="space-y-3 pt-1">
              <span className="text-[11px] font-bold text-blue-200">Experiencia Laboral</span>
              <p className="text-[10px] text-blue-300/90 leading-relaxed">
                💡 <strong>Fórmula de impacto:</strong> Verbo de acción + actividad/herramienta + resultado medible (cada línea será un punto numerado).
              </p>
              {formData.experiences.map((exp, idx) => (
                <div key={idx} className="p-3 border border-blue-800 rounded-xl bg-blue-900/50 space-y-2 relative">
                  <button onClick={() => removeExperience(idx)} className="absolute top-2.5 right-2.5 text-rose-300 hover:text-rose-100 cursor-pointer"><Trash2 size={14} /></button>
                  <input type="text" lang="es-CO" spellCheck={true} placeholder="Empresa" value={exp.company} onChange={(e) => updateExperience(idx, "company", e.target.value)} className="w-full p-2 text-[12px] bg-blue-950 border border-blue-800 rounded text-white" />
                  <input type="text" lang="es-CO" spellCheck={true} placeholder="Cargo" value={exp.position} onChange={(e) => updateExperience(idx, "position", e.target.value)} className="w-full p-2 text-[12px] bg-blue-950 border border-blue-800 rounded text-white" />
                  <div className="grid grid-cols-2 gap-2">
                    <input type="text" lang="es-CO" spellCheck={false} placeholder="Inicio (Ej. Ene 2024)" value={exp.startDate} onChange={(e) => updateExperience(idx, "startDate", e.target.value)} className="p-2 text-[12px] bg-blue-950 border border-blue-800 rounded text-white" />
                    <input type="text" lang="es-CO" spellCheck={false} placeholder="Fin (Ej. Actual)" value={exp.endDate} onChange={(e) => updateExperience(idx, "endDate", e.target.value)} className="p-2 text-[12px] bg-blue-950 border border-blue-800 rounded text-white" />
                  </div>
                  <textarea lang="es-CO" spellCheck={true} placeholder="Ej. Gestionar reportes mensuales en Excel reduciendo tiempos de entrega en un 15%..." rows={4} value={exp.description} onChange={(e) => updateExperience(idx, "description", e.target.value)} className="w-full p-2.5 text-[12px] bg-blue-950 border border-blue-800 rounded text-white resize-y"></textarea>
                </div>
              ))}
              <div className="flex justify-end pt-1">
                <button onClick={addExperience} className="text-[11px] bg-amber-400 hover:bg-amber-300 text-blue-950 px-3 py-1.5 rounded-lg font-bold flex items-center gap-1 shadow transition cursor-pointer">
                  <Plus size={13} /> Añadir Experiencia
                </button>
              </div>
            </div>

            {/* Proyectos, Semilleros y Monitorías */}
            <div className="space-y-3 pt-3 border-t border-blue-900/60">
              <span className="text-[11px] font-bold text-blue-200">Proyectos Académicos, Semilleros y Monitorías</span>
              <p className="text-[10px] text-blue-300/90 leading-relaxed">
                💡 Si aún no tienes experiencia laboral formal, incluye aquí proyectos de aula, semilleros de investigación o monitorías universitarias.
              </p>
              {formData.projects.map((proj, idx) => (
                <div key={idx} className="p-3 border border-blue-800 rounded-xl bg-blue-900/50 space-y-2 relative">
                  <button onClick={() => removeProject(idx)} className="absolute top-2.5 right-2.5 text-rose-300 hover:text-rose-100 cursor-pointer"><Trash2 size={14} /></button>
                  <input type="text" lang="es-CO" spellCheck={true} placeholder="Nombre del Proyecto, Semillero o Monitoría" value={proj.name} onChange={(e) => updateProject(idx, "name", e.target.value)} className="w-full p-2 text-[12px] bg-blue-950 border border-blue-800 rounded text-white" />
                  <input type="text" lang="es-CO" spellCheck={true} placeholder="Rol / Participación (Ej. Monitor Académico, Investigador)" value={proj.role} onChange={(e) => updateProject(idx, "role", e.target.value)} className="w-full p-2 text-[12px] bg-blue-950 border border-blue-800 rounded text-white" />
                  <div className="flex gap-2 items-center bg-blue-950/60 p-2 rounded-lg border border-blue-800/80">
                    <input
                      type="text"
                      lang="es-CO"
                      spellCheck={true}
                      placeholder="Plataforma (Ej. GitHub, Demo)"
                      value={proj.linkLabel || ""}
                      onChange={(e) => updateProject(idx, "linkLabel", e.target.value)}
                      className="w-1/3 p-2 text-[12px] bg-blue-950 border border-blue-800 rounded text-white"
                    />
                    <input
                      type="text"
                      lang="es-CO"
                      spellCheck={false}
                      placeholder="URL (github.com/usuario/proyecto)"
                      value={proj.linkUrl || ""}
                      onChange={(e) => updateProject(idx, "linkUrl", e.target.value)}
                      className="flex-1 p-2 text-[12px] bg-blue-950 border border-blue-800 rounded text-white"
                    />
                  </div>
                  <textarea lang="es-CO" spellCheck={true} placeholder="Objetivo del proyecto, metodología aplicada y resultados obtenidos..." rows={4} value={proj.description} onChange={(e) => updateProject(idx, "description", e.target.value)} className="w-full p-2.5 text-[12px] bg-blue-950 border border-blue-800 rounded text-white resize-y"></textarea>
                </div>
              ))}
              <div className="flex justify-end pt-1">
                <button onClick={addProject} className="text-[11px] bg-amber-400 hover:bg-amber-300 text-blue-950 px-3 py-1.5 rounded-lg font-bold flex items-center gap-1 shadow transition cursor-pointer">
                  <Plus size={13} /> Añadir Proyecto / Semillero
                </button>
              </div>
            </div>
          </div>

          {/* SECCIÓN 5: VOLUNTARIADO */}
          <div className="bg-blue-950/80 border border-blue-800 rounded-xl p-5 space-y-4 shadow-sm">
            <div className="flex justify-between items-center border-b border-blue-900 pb-2">
              <h2 className="text-xs font-extrabold uppercase tracking-widest text-amber-400 flex items-center gap-2">
                <HeartHandshake size={15} /> 5. Voluntariado
              </h2>
            </div>
            {formData.volunteers.map((vol, idx) => (
              <div key={idx} className="p-3.5 border border-blue-800 rounded-xl bg-blue-900/50 space-y-2.5 relative">
                <button onClick={() => removeVolunteer(idx)} className="absolute top-3 right-3 text-rose-300 hover:text-rose-100 cursor-pointer"><Trash2 size={15} /></button>
                <input type="text" lang="es-CO" spellCheck={true} placeholder="Organización / Fundación" value={vol.organization} onChange={(e) => updateVolunteer(idx, "organization", e.target.value)} className="w-full p-2.5 text-[12px] bg-blue-950 border border-blue-800 rounded-lg text-white" />
                <input type="text" lang="es-CO" spellCheck={true} placeholder="Rol / Actividad" value={vol.role} onChange={(e) => updateVolunteer(idx, "role", e.target.value)} className="w-full p-2.5 text-[12px] bg-blue-950 border border-blue-800 rounded-lg text-white" />
                <div className="grid grid-cols-2 gap-2">
                  <input type="text" lang="es-CO" spellCheck={false} placeholder="Inicio" value={vol.startDate} onChange={(e) => updateVolunteer(idx, "startDate", e.target.value)} className="p-2.5 text-[12px] bg-blue-950 border border-blue-800 rounded-lg text-white" />
                  <input type="text" lang="es-CO" spellCheck={false} placeholder="Fin" value={vol.endDate} onChange={(e) => updateVolunteer(idx, "endDate", e.target.value)} className="p-2.5 text-[12px] bg-blue-950 border border-blue-800 rounded-lg text-white" />
                </div>
                <textarea lang="es-CO" spellCheck={true} placeholder="Funciones o aportes realizados (cada línea será un punto numerado)..." rows={3} value={vol.description} onChange={(e) => updateVolunteer(idx, "description", e.target.value)} className="w-full p-2.5 text-[12px] bg-blue-950 border border-blue-800 rounded-lg text-white resize-y"></textarea>
              </div>
            ))}
            <div className="flex justify-end pt-1">
              <button onClick={addVolunteer} className="text-[11px] bg-amber-400 hover:bg-amber-300 text-blue-950 px-3 py-1.5 rounded-lg font-bold flex items-center gap-1 shadow transition cursor-pointer">
                <Plus size={13} /> Añadir Voluntariado
              </button>
            </div>
          </div>

        </div>

        {/* PANEL DERECHO: Vista Previa */}
        <div className="lg:col-span-7 bg-blue-950/90 p-5 lg:p-6 rounded-2xl flex flex-col items-center shadow-2xl border border-blue-900 overflow-auto max-h-[88vh] print:p-0 print:m-0 print:bg-white print:overflow-visible print:max-h-none print:w-full print:shadow-none print:border-none">
          
          <div className="w-full max-w-[800px] flex flex-wrap justify-between items-center gap-2 mb-4 print:hidden px-1 text-xs text-blue-200">
            <span className="font-semibold tracking-wide uppercase flex items-center gap-1.5">
              <FileText size={14} className="text-amber-400" /> Vista Previa
            </span>
            <div className="flex items-center gap-2">
              <span
                className={`px-3 py-1 rounded-full border text-[11px] font-semibold ${
                  estimatedPages > 2
                    ? "bg-amber-950/80 border-amber-400 text-amber-300"
                    : "bg-blue-900 border-blue-800 text-blue-200"
                }`}
                title="Para prácticas profesionales se recomienda 1 a 2 páginas"
              >
                Extensión estimada: {estimatedPages} {estimatedPages === 1 ? "página" : "páginas"}
              </span>
              <span className="hidden sm:inline bg-blue-900 px-3 py-1 rounded-full border border-blue-800 text-[11px]">
                Optimizado para Chrome
              </span>
            </div>
          </div>

          {/* HOJA EN FORMATO TABLA NATIVA */}
          <table
            ref={resumeTableRef}
            id="resume-preview-sheet"
            className="resume-sheet bg-white text-slate-800 w-full max-w-[800px] shadow-[0_0_40px_rgba(0,0,0,0.4)] rounded-xl border-collapse table-fixed"
            style={{ fontSize: "12px" }}
          >
            <tbody>
              {/* Encabezado y Contacto */}
              <tr>
                <td className="p-[1.2cm] pb-0">
                  <div className="border-b-2 border-blue-900 pb-4 mb-4 flex flex-row justify-between items-center bg-white">
                    <div className="pr-4 min-w-0">
                      <h1 className="text-2xl lg:text-3xl font-black text-slate-900 uppercase tracking-tight break-words">
                        {formData.fullName || "Nombre del Estudiante"}
                      </h1>
                      <p className="text-blue-900 font-bold text-[11px] uppercase tracking-wider mt-1 break-words">
                        {computedHeadline}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-4 bg-white flex-shrink-0">
                      <img src="/bogota.svg" alt="Rectoría Bogotá" className="h-8 object-contain" />
                      <div className="h-6 w-px bg-slate-300"></div>
                      <img src="/progresa.svg" alt="Centro Progresa" className="h-8 object-contain" />
                    </div>
                  </div>

                  {/* Contacto centrado y Enlaces interactivos */}
                  <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-1.5 text-[11.5px] text-slate-600 mb-4 pb-3 border-b border-slate-100 font-medium text-center">
                    {formData.email && <span className="flex items-center gap-1 break-all"><Mail size={12} className="text-blue-900 flex-shrink-0" /> {formData.email}</span>}
                    {formData.phone && <span className="flex items-center gap-1"><Phone size={12} className="text-blue-900 flex-shrink-0" /> {formData.phone}</span>}
                    {formData.city && <span className="flex items-center gap-1"><MapPin size={12} className="text-blue-900 flex-shrink-0" /> {formData.city}</span>}
                    {formData.availability && (
                      <span className="flex items-center gap-1 text-blue-950 font-semibold">
                        <CalendarCheck size={12} className="text-blue-900 flex-shrink-0" /> {formData.availability}
                      </span>
                    )}
                    {formData.links.map((l, i) => (
                      l.url ? (
                        <a
                          key={i}
                          href={l.url.startsWith("http://") || l.url.startsWith("https://") ? l.url : `https://${l.url}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-blue-900 hover:underline font-semibold cursor-pointer"
                        >
                          <LinkIcon size={12} className="text-blue-900 flex-shrink-0" /> {l.label || "Enlace"}
                        </a>
                      ) : null
                    ))}
                  </div>
                </td>
              </tr>

              {/* Contenido principal de la Hoja de Vida */}
              <tr>
                <td className="px-[1.2cm]">
                  
                  {/* Perfil Profesional (Sección 2) */}
                  {(formData.profile || parsedTechnicalSkills.length > 0 || parsedSoftSkills.length > 0 || formData.toolsList.length > 0 || formData.languageList.length > 0) && (
                    <div className="mb-5 print-atomic-item">
                      <SectionHeading title="Perfil Profesional" />

                      {formData.profile && (
                        <p className="text-[12px] text-slate-700 text-justify leading-relaxed mb-3 break-words">
                          {formData.profile}
                        </p>
                      )}

                      {parsedTechnicalSkills.length > 0 && (
                        <div className="bg-slate-50 p-2.5 rounded border border-slate-100 mb-2 break-words text-[12px]">
                          <span className="font-bold inline-flex items-center gap-1.5 text-blue-900 mr-1.5">
                            <Cpu size={13} /> Conocimientos Técnicos:
                          </span>
                          <span className="text-slate-700">
                            {parsedTechnicalSkills.join(" • ")}
                          </span>
                        </div>
                      )}
                      
                      {(parsedSoftSkills.length > 0 || formData.toolsList.length > 0 || formData.languageList.length > 0) && (
                        <table className="w-full text-[12px] mt-1 border-separate border-spacing-2">
                          <tbody>
                            <tr>
                              {parsedSoftSkills.length > 0 && (
                                <td className="w-1/3 bg-slate-50 p-2.5 rounded border border-slate-100 align-top break-words">
                                  <span className="font-bold flex items-center gap-1.5 mb-1 text-blue-900">
                                    <CheckCircle size={13} /> Competencias:
                                  </span>
                                  <ul className="text-slate-700 space-y-0.5">
                                    {parsedSoftSkills.map((skill, i) => (
                                      <li key={i}>• {skill}</li>
                                    ))}
                                  </ul>
                                </td>
                              )}
                              {formData.toolsList.length > 0 && (
                                <td className="w-1/3 bg-slate-50 p-2.5 rounded border border-slate-100 align-top break-words">
                                  <span className="font-bold flex items-center gap-1.5 mb-1 text-blue-900">
                                    <Wrench size={13} /> Herramientas:
                                  </span>
                                  <ul className="text-slate-700 space-y-0.5">
                                    {formData.toolsList.map((t, i) => (
                                      <li key={i}>• {t.name} <span className="text-blue-900 font-semibold">({t.level})</span></li>
                                    ))}
                                  </ul>
                                </td>
                              )}
                              {formData.languageList.length > 0 && (
                                <td className="w-1/3 bg-slate-50 p-2.5 rounded border border-slate-100 align-top break-words">
                                  <span className="font-bold flex items-center gap-1.5 mb-1 text-blue-900">
                                    <Globe size={13} /> Idiomas:
                                  </span>
                                  <ul className="text-slate-700 space-y-0.5">
                                    {formData.languageList.map((l, i) => (
                                      <li key={i}>• {l.language} <span className="text-blue-900 font-semibold">({l.level})</span></li>
                                    ))}
                                  </ul>
                                </td>
                              )}
                            </tr>
                          </tbody>
                        </table>
                      )}
                    </div>
                  )}

                  {/* Orden dinámico: Formación primero o Experiencia primero */}
                  {formData.prioritizeExperience ? (
                    <>
                      {renderExperienceSection()}
                      {renderEducationSection()}
                    </>
                  ) : (
                    <>
                      {renderEducationSection()}
                      {renderExperienceSection()}
                    </>
                  )}

                  {/* Voluntariado (Sección 5) */}
                  {formData.volunteers.length > 0 && (
                    <div className="mb-5 pt-2 border-t border-slate-100">
                      <SectionHeading title="Voluntariado" />
                      <div>
                        {formData.volunteers.map((vol, i) => (
                          <div key={i} className="text-[12px] space-y-1.5 print-atomic-item mb-3.5 pb-3 border-b border-slate-100 last:border-b-0 break-words">
                            <div>
                              <span className="font-black text-slate-900 uppercase block">{vol.role || "Rol"}</span>
                              <span className="text-blue-900 font-semibold block">{vol.organization || "Organización"}</span>
                              <span className="text-slate-500 block text-[11px]">{vol.startDate} {vol.endDate ? `- ${vol.endDate}` : ""}</span>
                            </div>
                            <table className="w-full text-slate-700 leading-relaxed" style={{ borderCollapse: "collapse", marginTop: "4px" }}>
                              <tbody>
                                {vol.description.split(/\n/).map((item, idx) => {
                                  const trimmed = item.trim();
                                  return trimmed ? (
                                    <tr key={idx} className="print-atomic-item">
                                      <td style={{ width: "1cm", verticalAlign: "top", fontWeight: 600, paddingBottom: "3px" }}>{idx + 1}.</td>
                                      <td className="break-words" style={{ verticalAlign: "top", paddingBottom: "3px", textAlign: "justify" }}>{trimmed}</td>
                                    </tr>
                                  ) : null;
                                })}
                              </tbody>
                            </table>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </td>
              </tr>
            </tbody>

            <tfoot>
              <tr>
                <td className="p-[1.2cm] pt-3">
                  {/* Pie de página institucional */}
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <tbody>
                      <tr>
                        <td style={{ borderTop: "1px solid #cbd5e1", paddingTop: "8px", textAlign: "center", fontSize: "10px", color: "#64748b", lineHeight: "1.4" }}>
                          Línea de Atención al Usuario: 601 593 3004 · Línea Nacional: 01 8000 936 670<br />
                          <strong style={{ color: "#334155" }}>www.uniminuto.edu</strong>
                          <div style={{ width: "220px", margin: "4px auto 0 auto", padding: "2px 0", borderTop: "1px solid #94a3b8", borderBottom: "1px solid #94a3b8", fontWeight: "bold", letterSpacing: "2px", color: "#475569", fontSize: "9px", textAlign: "center" }}>
                            VIGILADA MINEDUCACIÓN
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}
