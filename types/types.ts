export interface Project {
  id: number;
  title: string;
  category: string;
  description?: string;
  tech?: string[];
  live?: string;
  image?: string;
  year: string;
}


export interface Skill {
  name: string;
  category: string;
  icon: string;
  color: string;
  accent: string;
}
