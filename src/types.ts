export interface ResearchInterest {
  id: string;
  title: string;
  code: string;
  summary: string;
  details: string[];
  icon: 'timeline' | 'vision' | 'agent' | 'data';
}

export interface FeaturedRepo {
  id: string;
  code: string;
  name: string;
  repoUrl: string;
  focus: string;
  description: string;
  stack: string[];
  iconType: 'vision' | 'nlp' | 'timeseries' | 'weather' | 'copilot' | 'gameai';
  metrics?: { label: string; value: string }[];
  telemetryLogs: string[];
  keyHighlights: string[];
}

export interface AcademicDegree {
  degree: string;
  institution: string;
  shortCode: string;
  period: string;
  status: string;
  description: string;
  details: string[];
}

export interface TechStackCategory {
  id: string;
  key: string;
  title: string;
  items: string[];
  skills: { name: string; level: number; tag: string }[];
  description: string;
}

export interface ContactChannel {
  name: string;
  value: string;
  url?: string;
  isEmail?: boolean;
  isWebsite?: boolean;
  actionLabel: string;
}
