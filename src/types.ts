export type NavTab = 
  | 'home' 
  | 'about' 
  | 'services' 
  | 'regions'
  | 'pricing' 
  | 'cases' 
  | 'reviews' 
  | 'faq' 
  | 'booking' 
  | 'notices'
  | 'blog'
  | 'admin';

export interface QuoteRequest {
  id: string;
  createdAt: string;
  name: string;
  phone: string;
  serviceType: 'apartment' | 'commercial' | 'building' | 'house';
  regionDistrict: string; // e.g. 서울 강남구, 경기 성남시 분당구
  detailAddress?: string;
  sizeInfo: string; // e.g. 34평형, 전면 15m
  preferredDate: string;
  isExteriorIncluded: boolean;
  notes: string;
  status: '접수완료' | '상담중' | '방문확정' | '시공완료';
  estimatedCost: number;
}

export interface CaseStudy {
  id: string;
  title: string;
  category: '아파트' | '상가·카페' | '빌딩·사옥' | '단독·타운하우스';
  region: string;
  date: string;
  beforeImage: string;
  afterImage: string;
  description: string;
  highlights: string[];
  clientType: string;
  seoKeyword: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  location: string;
  serviceType: string;
  rating: number;
  date: string;
  content: string;
  image?: string;
  verified: boolean;
}

export interface NoticeItem {
  id: string;
  title: string;
  date: string;
  category: '공지' | '이벤트' | '안내';
  content: string;
  views: number;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: '상담/예약' | '비용/견적' | '시공/소요시간' | '사후관리/A/S';
  keywords: string[];
}

export interface BlogItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  date: string;
  readTime: string;
  seoKeyword: string;
  summary: string;
  contentParagraphs: string[];
}

export interface PageSeoConfig {
  pageKey: NavTab;
  pageName: string;
  title: string;
  metaDescription: string;
  canonicalUrl: string;
  keywords: string;
  ogTitle: string;
  ogDescription: string;
  lastUpdated: string;
}

export type SeoSettingsMap = Record<NavTab, PageSeoConfig>;

