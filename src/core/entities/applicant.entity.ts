export interface Applicant {
    nombres: string;
    apellidos: string;
    dniOpassaporte: string;
    pais?: string;
    provincia?: string;
    ciudad?: string;
    edad?: number;
    fechaNacimiento?: string;
    empresa?: string; 
    aniosExperiencia?: number;
    aniosEmpresaActual?: number;
    tecnologias?: string[];
    expectativaSalarial?: number;
    email: string;
  }
  