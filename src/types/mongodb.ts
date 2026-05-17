// MongoDB Collection Types

export interface CareerJob {
  _id?: string;
  lang: string;
  title: string;
  position: string;
  salary: string;
  description: string;
  experience: string;
  skills: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface CareerApplication {
  _id?: string;
  lang: string;
  jobId: string;
  fullName: string;
  email: string;
  phone: string;
  experience: string;
  portfolio?: string;
  coverLetter: string;
  createdAt?: string;
}

export interface NewsArticle {
  _id?: string;
  lang: string;
  title: string;
  slug: string;
  thumbnail: string;
  content: string;
  excerpt?: string;
  author?: string;
  publishedAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Article {
  _id?: string;
  lang: string;
  title: string;
  slug: string;
  thumbnail: string;
  content: string;
  excerpt?: string;
  author?: string;
  publishedAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Page {
  _id?: string;
  lang: string;
  title: string;
  slug: string;
  description: string;
  content?: string;
  sections?: any[];
  hideNavbar?: boolean;
  hideFooter?: boolean;
  showInNavbar?: boolean;
  showInFooter?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Brochure {
  _id?: string;
  lang: string;
  title: string;
  slug: string;
  fileId: string;
  fileData: string;
  thumbnail: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface InvestorRelation {
  _id?: string;
  lang: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  thumbnail: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface NavigationLink {
  _id?: string;
  lang: string;
  type: 'navbar' | 'footer';
  title: string;
  href: string;
  order?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface MediaFile {
  _id?: string;
  lang: string;
  filename: string;
  type: string;
  size: number;
  url: string;
  mimeType: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface DashboardMetrics {
  _id?: string;
  date: string;
  clicks: number;
  impressions: number;
  position: number;
}
