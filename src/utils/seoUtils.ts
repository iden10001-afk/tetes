import { NavTab, PageSeoConfig, SeoSettingsMap } from '../types';

export const getBaseOrigin = (): string => {
  if (typeof window !== 'undefined' && window.location) {
    return window.location.origin;
  }
  return 'https://clearworks.kr';
};

export const getDefaultSeoSettings = (): SeoSettingsMap => {
  const origin = getBaseOrigin();

  return {
    home: {
      pageKey: 'home',
      pageName: '메인 홈',
      title: '서울,수도권 구단위로 전체 유리창청소 전문업체 | 클리어웍스',
      metaDescription: '클리어웍스는 서울 25개 구 및 수도권 전지역 대상 아파트·상가·오피스 프리미엄 유리창청소 전문업체입니다. 100% 무료 견적, 전후 시공사례, 현장상담, 사후관리 보증.',
      canonicalUrl: `${origin}/`,
      keywords: '유리창청소 전문업체, 유리창청소 전문업체 상담, 유리창청소 전문업체 추천, 유리창청소 전문업체 비용, 유리창청소 전문업체 후기, 아파트 유리창 청소, 상가 유리창 청소',
      ogTitle: '서울,수도권 구단위로 전체 유리창청소 전문업체 | 클리어웍스',
      ogDescription: '클리어웍스는 서울, 수도권 전지역 아파트·상가·빌딩 유리창청소 전문업체입니다. 무료 견적 및 빠른 현장 상담을 신청하세요.',
      lastUpdated: '2026-11-11 09:00'
    },
    about: {
      pageKey: 'about',
      pageName: '회사소개',
      title: '클리어웍스 회사소개 | 서울·수도권 유리창청소 전문업체',
      metaDescription: '독일 Unger 0 TDS 초순수 정수 필터링과 나노 실리카 발수코팅을 고집하는 유리창청소 전문업체 클리어웍스. 현대해상 1억원 배상책임보험 및 100% 직영 마스터 시공.',
      canonicalUrl: `${origin}/about`,
      keywords: '유리창청소 전문업체 소개, 클리어웍스, 유리창청소 장비, 순수정수세정, 현대해상 배상보험',
      ogTitle: '클리어웍스 회사소개 | 투명함의 기준을 세우는 유리창청소 전문업체',
      ogDescription: '3,500세대 누적 시공, 94.8% 재방문 추천율을 자랑하는 서울·수도권 유리창청소 전문 브랜드 클리어웍스를 소개합니다.',
      lastUpdated: '2026-11-11 09:00'
    },
    services: {
      pageKey: 'services',
      pageName: '서비스 소개',
      title: '서비스 소개 | 아파트 외창·상가 쇼윈도·오피스 유리창청소 전문업체',
      metaDescription: '아파트 외창+내창 올인원, 상가 쇼윈도 정기관리, 고층 주상복합 특수창호, 나노 실리카 발수코팅까지 맞춤형 유리창청소 전문 서비스를 확인하세요.',
      canonicalUrl: `${origin}/services`,
      keywords: '유리창청소 전문업체, 아파트 외창 청소, 상가 쇼윈도 청소, 발수코팅, 유리창청소 전문업체 추천',
      ogTitle: '클리어웍스 서비스 소개 | 맞춤형 프리미엄 유리창케어',
      ogDescription: '석회수 물때와 매연 유막을 화학 박리하고 발수코팅으로 6개월 이상 맑은 시야를 유지해 드립니다.',
      lastUpdated: '2026-11-11 09:00'
    },
    regions: {
      pageKey: 'regions',
      pageName: '서비스지역',
      title: '서울·수도권 구단위 서비스지역 안내 | 클리어웍스 유리창청소 전문업체',
      metaDescription: '서울 25개 구 전체 및 경기(분당·일산·수지·광교·하남 등), 인천(송도·청라 등) 서울·수도권 구단위 전지역 출장비 0원 무료 방문 서비스 안내.',
      canonicalUrl: `${origin}/regions`,
      keywords: '유리창청소 전문업체, 유리창청소 전문업체 서비스지역, 서울 유리창청소, 경기 유리창청소, 수도권 유리창청소, 출장비 0원',
      ogTitle: '클리어웍스 서울·수도권 구단위 서비스지역 안내',
      ogDescription: '서울 25개 구 및 수도권 전지역 출장비 0원! 100% 직영 마스터 2인 1조 상주 출동망을 확인하세요.',
      lastUpdated: '2026-11-11 09:00'
    },
    pricing: {
      pageKey: 'pricing',
      pageName: '가격 안내 & 견적',
      title: '유리창청소 전문업체 비용 및 가격 안내 | 100% 정찰제 클리어웍스',
      metaDescription: '아파트 20평형대부터 50평형대, 상가 쇼윈도까지 투명한 정찰제 요율표와 30초 실시간 예상 견적 계산기를 제공합니다. 현장 추가금 0원 보증.',
      canonicalUrl: `${origin}/pricing`,
      keywords: '유리창청소 전문업체 비용, 유리창청소 가격, 아파트 유리창 청소 비용, 상가 청소 견적, 유리창청소 정찰제',
      ogTitle: '유리창청소 전문업체 비용 안내 | 클리어웍스 투명 정찰가',
      ogDescription: '바가지 없는 정직한 평형별 표준 요율표와 실시간 견적 계산기를 확인하세요.',
      lastUpdated: '2026-11-11 09:00'
    },
    cases: {
      pageKey: 'cases',
      pageName: '시공사례',
      title: '유리창청소 시공사례 & 비포애프터 포트폴리오 | 클리어웍스',
      metaDescription: '서울 서초·강남·송파, 판교·분당·일산·송도 등 수도권 3,500세대 실제 현장의 드라마틱한 비포&애프터 인터랙티브 비교 사진을 확인하세요.',
      canonicalUrl: `${origin}/cases`,
      keywords: '유리창청소 전문업체 후기, 유리창청소 전후 사진, 시공사례, 비포애프터, 아파트 유리창 물때 제거',
      ogTitle: '클리어웍스 시공사례 | 눈부신 비포 & 애프터 갤러리',
      ogDescription: '뿌연 묵은 때가 사라지고 파노라마 전망이 살아난 실제 시공 기록을 직접 비교해보세요.',
      lastUpdated: '2026-11-11 09:00'
    },
    reviews: {
      pageKey: 'reviews',
      pageName: '고객후기',
      title: '유리창청소 전문업체 후기 만족도 1위 | 클리어웍스 리얼 리뷰',
      metaDescription: '평점 4.96점! 실제 서울·수도권 거주 고객님들이 직접 작성해주신 솔직한 유리창청소 시공 후기와 영수증 인증 내돈내산 평가를 만나보세요.',
      canonicalUrl: `${origin}/reviews`,
      keywords: '유리창청소 전문업체 후기, 유리창청소 추천, 내돈내산 리뷰, 아파트 유리창청소 만족도',
      ogTitle: '클리어웍스 고객후기 | 평점 4.96점 검증된 만족도',
      ogDescription: '3,500세대가 입을 모아 칭찬한 깨끗함의 차이! 실제 고객 리뷰를 확인하세요.',
      lastUpdated: '2026-11-11 09:00'
    },
    faq: {
      pageKey: 'faq',
      pageName: '자주 묻는 질문',
      title: '유리창청소 전문업체 상담 & 자주 묻는 질문 FAQ 10선 | 클리어웍스',
      metaDescription: '유리창청소 전문업체 상담 방법, 비용 산정 기준, 아랫집 물튐 방지 공법, 비 온 뒤 관리 등 고객님들이 가장 자주 묻는 질문 10가지를 총정리했습니다.',
      canonicalUrl: `${origin}/faq`,
      keywords: '유리창청소 전문업체 상담, 유리창청소 FAQ, 유리창청소 비용 문의, 비 온 뒤 청소',
      ogTitle: '클리어웍스 자주 묻는 질문 (FAQ) 10선',
      ogDescription: '유리창청소 예약 전 꼭 알아야 할 필수 상식과 궁금증을 명쾌하게 해소해 드립니다.',
      lastUpdated: '2026-11-11 09:00'
    },
    booking: {
      pageKey: 'booking',
      pageName: '견적·예약하기',
      title: '유리창청소 무료견적 신청 및 현장상담 예약 | 클리어웍스',
      metaDescription: '서울 25개 구 및 수도권 전지역 무료 출장 견적 신청! 사진 1장으로 10분 내 100% 확정 견적을 안내해 드립니다. 나노 발수코팅 무상 지원 프로모션 진행 중.',
      canonicalUrl: `${origin}/booking`,
      keywords: '유리창청소 전문업체 상담, 무료 견적 신청, 유리창청소 예약, 출장 견적',
      ogTitle: '클리어웍스 무료 견적 및 상담 예약하기',
      ogDescription: '10분 내 신속한 맞춤 견적 발송 및 일정 확정! 부담 없이 신청하세요.',
      lastUpdated: '2026-11-11 09:00'
    },
    blog: {
      pageKey: 'blog',
      pageName: '청소칼럼',
      title: '유리창청소 전문업체 추천 칼럼 & 꿀팁 10선 | 클리어웍스 블로그',
      metaDescription: '유리창청소 전문업체 선택 기준, 평형별 비용 절약법, 석회수 물때 제거 과학, 상가 정기구독 혜택 등 유용한 전문 칼럼 10편을 제공합니다.',
      canonicalUrl: `${origin}/blog`,
      keywords: '유리창청소 전문업체 추천, 유리창청소 전문업체 비용, 유리창청소 팁, 물때 제거법',
      ogTitle: '클리어웍스 유리창청소 전문 칼럼 & 가이드 10선',
      ogDescription: '유리창 케어의 모든 것! 전문가가 직접 알려주는 핵심 노하우를 확인하세요.',
      lastUpdated: '2026-11-11 09:00'
    },
    notices: {
      pageKey: 'notices',
      pageName: '공지사항',
      title: '클리어웍스 공식 공지사항 및 이벤트 소식',
      metaDescription: '동절기 유리창 케어 프로모션, 독일 초순수 정수 장비 도입 안내, 배상책임보험 갱신 소식을 전해드립니다.',
      canonicalUrl: `${origin}/notices`,
      keywords: '클리어웍스 공지사항, 유리창청소 이벤트, 프로모션, 장비 안내',
      ogTitle: '클리어웍스 공식 공지사항',
      ogDescription: '클리어웍스의 최신 혜택과 서비스 공지를 안내합니다.',
      lastUpdated: '2026-11-11 09:00'
    },
    admin: {
      pageKey: 'admin',
      pageName: '관리자 모드',
      title: '클리어웍스 관리자 콘솔 | 견적 및 SEO 메타태그 관리',
      metaDescription: '클리어웍스 실시간 견적 접수 현황 및 페이지별 동적 SEO 메타 디스크립션, 캐노니컬 URL 설정 콘솔입니다.',
      canonicalUrl: `${origin}/admin`,
      keywords: '클리어웍스 관리자, SEO 관리',
      ogTitle: '클리어웍스 관리자 콘솔',
      ogDescription: '견적 관리 및 SEO 메타데이터 실시간 제어',
      lastUpdated: '2026-11-11 09:00'
    }
  };
};

const SEO_STORAGE_KEY = 'clearworks_page_seo_configs_v1';

export const loadStoredSeoSettings = (): SeoSettingsMap => {
  const defaults = getDefaultSeoSettings();
  if (typeof window === 'undefined') return defaults;

  try {
    const raw = localStorage.getItem(SEO_STORAGE_KEY);
    if (!raw) return defaults;
    const parsed = JSON.parse(raw);
    return { ...defaults, ...parsed };
  } catch (err) {
    console.error('Failed to parse stored SEO configs:', err);
    return defaults;
  }
};

export const saveStoredSeoSettings = (settings: SeoSettingsMap): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(SEO_STORAGE_KEY, JSON.stringify(settings));
  } catch (err) {
    console.error('Failed to save SEO configs to localStorage:', err);
  }
};

/**
 * Dynamically updates document.title, <meta name="description">,
 * <link rel="canonical">, OpenGraph tags, and keywords directly in document.head
 */
export const applySeoToDom = (config: PageSeoConfig): void => {
  if (typeof document === 'undefined') return;

  // 1. Document Title
  if (config.title) {
    document.title = config.title;
  }

  // Helper to get or create a <meta> tag
  const setMetaTag = (attributeName: 'name' | 'property', attributeValue: string, content: string) => {
    let element = document.querySelector(`meta[${attributeName}="${attributeValue}"]`) as HTMLMetaElement | null;
    if (!element) {
      element = document.createElement('meta');
      element.setAttribute(attributeName, attributeValue);
      document.head.appendChild(element);
    }
    element.content = content;
  };

  // 2. Meta Description
  if (config.metaDescription) {
    setMetaTag('name', 'description', config.metaDescription);
  }

  // 3. Keywords
  if (config.keywords) {
    setMetaTag('name', 'keywords', config.keywords);
  }

  // 4. Canonical Link (<link rel="canonical" href="...">)
  if (config.canonicalUrl) {
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = config.canonicalUrl;
  }

  // 5. OpenGraph Tags
  setMetaTag('property', 'og:title', config.ogTitle || config.title);
  setMetaTag('property', 'og:description', config.ogDescription || config.metaDescription);
  if (config.canonicalUrl) {
    setMetaTag('property', 'og:url', config.canonicalUrl);
  }

  // 6. Twitter Card Tags
  setMetaTag('name', 'twitter:title', config.ogTitle || config.title);
  setMetaTag('name', 'twitter:description', config.ogDescription || config.metaDescription);
};

export interface DomInspectionResult {
  title: string;
  description: string;
  canonical: string;
  keywords: string;
  ogTitle: string;
  ogDescription: string;
  ogUrl: string;
}

/**
 * Reads back the live values directly from the DOM head for instant admin verification
 */
export const getCurrentDomSeo = (): DomInspectionResult => {
  if (typeof document === 'undefined') {
    return {
      title: '',
      description: '',
      canonical: '',
      keywords: '',
      ogTitle: '',
      ogDescription: '',
      ogUrl: ''
    };
  }

  const descMeta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
  const kwMeta = document.querySelector('meta[name="keywords"]') as HTMLMetaElement | null;
  const canLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  const ogTitleMeta = document.querySelector('meta[property="og:title"]') as HTMLMetaElement | null;
  const ogDescMeta = document.querySelector('meta[property="og:description"]') as HTMLMetaElement | null;
  const ogUrlMeta = document.querySelector('meta[property="og:url"]') as HTMLMetaElement | null;

  return {
    title: document.title || '',
    description: descMeta?.content || '',
    canonical: canLink?.href || '',
    keywords: kwMeta?.content || '',
    ogTitle: ogTitleMeta?.content || '',
    ogDescription: ogDescMeta?.content || '',
    ogUrl: ogUrlMeta?.content || ''
  };
};

export interface KeywordDensityResult {
  keyword: string;
  count: number;
  density: number; // percentage (e.g. 1.8%)
  status: 'optimal' | 'low' | 'high' | 'missing';
  inTitle: boolean;
  inDescription: boolean;
  suggestion: string;
}

export interface PageDensityAnalysis {
  pageKey: NavTab;
  pageName: string;
  totalWords: number;
  totalChars: number;
  primaryKeyword: string;
  primaryDensity: number;
  primaryCount: number;
  primaryStatus: 'optimal' | 'low' | 'high' | 'missing';
  keywords: KeywordDensityResult[];
  overallScore: number;
  generalSuggestions: string[];
}

/**
 * Extracts text content from the current view or page key
 */
export const extractTextFromCurrentView = (pageKey?: NavTab): string => {
  // If in browser and main element is present
  if (typeof document !== 'undefined') {
    const mainEl = document.querySelector('main');
    if (mainEl && mainEl.innerText && mainEl.innerText.length > 200) {
      if (!pageKey) return mainEl.innerText;
      const text = mainEl.innerText;
      // If the currently mounted view matches the requested page, use live DOM text
      if (
        (pageKey === 'home' && text.includes('클리어웍스')) ||
        (pageKey === 'about' && text.includes('회사소개')) ||
        (pageKey === 'services' && text.includes('서비스 소개')) ||
        (pageKey === 'regions' && text.includes('서비스지역')) ||
        (pageKey === 'pricing' && text.includes('가격 안내')) ||
        (pageKey === 'cases' && text.includes('시공사례')) ||
        (pageKey === 'reviews' && text.includes('고객후기')) ||
        (pageKey === 'faq' && text.includes('자주 묻는 질문')) ||
        (pageKey === 'booking' && text.includes('예약')) ||
        (pageKey === 'blog' && text.includes('칼럼')) ||
        (pageKey === 'notices' && text.includes('공지사항'))
      ) {
        return text;
      }
    }
  }

  return getPageContentSample(pageKey || 'home');
};

const PAGE_NAMES: Record<NavTab, string> = {
  home: '메인 홈',
  about: '회사소개',
  services: '서비스 소개',
  regions: '서비스지역',
  pricing: '가격 안내',
  cases: '시공사례',
  reviews: '고객후기',
  faq: '자주 묻는 질문',
  booking: '견적·예약하기',
  blog: '청소칼럼',
  notices: '공지사항',
  admin: '관리자 모드'
};

/**
 * Calculates keyword density by extracting text content from the current view/page
 * and comparing the frequency of target keywords.
 */
export const calculateKeywordDensity = (
  pageOrContent: NavTab | string,
  targetKeywords?: string[] | string,
  title?: string,
  metaDescription?: string
): PageDensityAnalysis => {
  const isNavTab = (val: string): val is NavTab => val in PAGE_NAMES;
  
  let pageKey: NavTab = 'home';
  let content = '';

  if (isNavTab(pageOrContent)) {
    pageKey = pageOrContent;
    content = extractTextFromCurrentView(pageKey);
  } else {
    content = pageOrContent;
  }

  const defaults = getDefaultSeoSettings();
  const defaultPageConfig = defaults[pageKey] || defaults['home'];

  const resolvedKeywords = targetKeywords
    ? Array.isArray(targetKeywords)
      ? targetKeywords.join(', ')
      : targetKeywords
    : defaultPageConfig.keywords;

  const resolvedTitle = title ?? defaultPageConfig.title;
  const resolvedDesc = metaDescription ?? defaultPageConfig.metaDescription;

  // Normalize text: clean punctuation, lowercase
  const cleanContent = content.replace(/[\r\n\t]/g, ' ').trim();
  const words = cleanContent.split(/\s+/).filter(Boolean);
  const totalWords = Math.max(1, words.length);
  const totalChars = cleanContent.replace(/\s/g, '').length;

  const rawKeywords = resolvedKeywords
    .split(',')
    .map((k) => k.trim())
    .filter((k) => k.length > 0);

  // If no keywords specified, add standard fallbacks
  const keywordsList = rawKeywords.length > 0 
    ? rawKeywords 
    : ['유리창청소 전문업체', '유리창청소 전문업체 비용', '유리창청소 전문업체 추천'];

  const lowerContent = cleanContent.toLowerCase();
  const lowerTitle = resolvedTitle.toLowerCase();
  const lowerDesc = resolvedDesc.toLowerCase();

  let optimalCount = 0;
  let totalScorePoints = 0;

  const keywordResults: KeywordDensityResult[] = keywordsList.map((kw) => {
    const lowerKw = kw.toLowerCase();
    
    // Exact phrase match counting
    let count = 0;
    let pos = 0;
    while ((pos = lowerContent.indexOf(lowerKw, pos)) !== -1) {
      count++;
      pos += lowerKw.length;
    }

    // Keyword word token count
    const kwWordCount = Math.max(1, kw.split(/\s+/).length);
    // Density calculation: (count * kwWordCount / totalWords) * 100
    const rawDensity = (count * kwWordCount / totalWords) * 100;
    const density = Math.round(rawDensity * 10) / 10;

    const inTitle = lowerTitle.includes(lowerKw);
    const inDescription = lowerDesc.includes(lowerKw);

    let status: KeywordDensityResult['status'] = 'optimal';
    let suggestion = '';

    if (count === 0) {
      status = 'missing';
      suggestion = `본문에 0회 등장합니다. H2 소제목이나 설명 단락에 최소 1~2회 추가하여 검색엔진 색인 가중치를 확보하세요.`;
    } else if (density < 1.0) {
      status = 'low';
      suggestion = `밀도가 ${density}%로 다소 낮습니다. (권장: 1.0~3.0%) 본문 서술어에 1~2회 더 자연스럽게 보강을 권장합니다.`;
    } else if (density > 3.2) {
      status = 'high';
      suggestion = `밀도가 ${density}%로 높습니다 (3.2% 초과). 키워드 과다 반복(스팸 페널티)을 방지하기 위해 동의어로 분산하세요.`;
    } else {
      status = 'optimal';
      optimalCount++;
      suggestion = `밀도 ${density}%로 검색엔진 크롤러가 가장 선호하는 자연스러운 빈도(1.0~3.0%)를 유지하고 있습니다.`;
    }

    if (!inTitle) {
      suggestion += ` [주의] 페이지 타이틀(<title>)에 누락되어 있습니다.`;
    } else {
      totalScorePoints += 15;
    }

    if (!inDescription) {
      suggestion += ` [권장] 메타 디스크립션에도 포함하면 검색 결과에서 굵은 글씨로 강조됩니다.`;
    } else {
      totalScorePoints += 10;
    }

    if (status === 'optimal') {
      totalScorePoints += 25;
    } else if (status === 'low') {
      totalScorePoints += 15;
    } else if (status === 'high') {
      totalScorePoints += 10;
    }

    return {
      keyword: kw,
      count,
      density,
      status,
      inTitle,
      inDescription,
      suggestion
    };
  });

  // Primary keyword (first keyword in the list)
  const primaryResult = keywordResults[0] || {
    keyword: '유리창청소 전문업체',
    count: 0,
    density: 0,
    status: 'missing'
  };

  // Calculate overall score (0 to 100)
  const maxPossible = keywordsList.length * 50;
  const overallScore = maxPossible > 0 ? Math.min(100, Math.round((totalScorePoints / maxPossible) * 100)) : 70;

  // Generate general suggestions
  const generalSuggestions: string[] = [];

  const missingTitleCount = keywordResults.filter((k) => !k.inTitle).length;
  if (missingTitleCount > 0) {
    generalSuggestions.push(
      `핵심 키워드 중 ${missingTitleCount}개가 타이틀에 없습니다. 첫 번째 타깃 키워드는 타이틀 앞단에 배치하는 것이 좋습니다.`
    );
  }

  const lowCount = keywordResults.filter((k) => k.status === 'low' || k.status === 'missing').length;
  if (lowCount > 0) {
    generalSuggestions.push(
      `본문 내 언급 빈도가 낮은 키워드가 ${lowCount}개 있습니다. 페이지 콘텐츠 본문 또는 FAQ 문답에 해당 키워드를 자연스럽게 포함하세요.`
    );
  }

  const highCount = keywordResults.filter((k) => k.status === 'high').length;
  if (highCount > 0) {
    generalSuggestions.push(
      `키워드 밀도가 3.2%를 초과하는 항목이 ${highCount}개 발견되었습니다. 동일 키워드를 억지로 반복하기보다 '유리창 세정', '외창 클리닝' 등의 유사어로 변환하세요.`
    );
  }

  if (generalSuggestions.length === 0) {
    generalSuggestions.push(
      `모든 타깃 키워드의 밀도와 타이틀/메타설명 배치가 완벽한 수준입니다! 검색엔진 크롤링 시 높은 관련성 점수를 획득할 수 있습니다.`
    );
  }

  return {
    pageKey,
    pageName: PAGE_NAMES[pageKey] || pageKey,
    totalWords,
    totalChars,
    primaryKeyword: primaryResult.keyword,
    primaryDensity: primaryResult.density,
    primaryCount: primaryResult.count,
    primaryStatus: primaryResult.status,
    keywords: keywordResults,
    overallScore,
    generalSuggestions
  };
};

/**
 * Returns keyword density analysis for all active website pages
 */
export const getAllPagesDensityAnalysis = (seoSettings?: SeoSettingsMap): PageDensityAnalysis[] => {
  const pages: NavTab[] = [
    'home',
    'about',
    'services',
    'regions',
    'pricing',
    'cases',
    'reviews',
    'faq',
    'booking',
    'blog',
    'notices'
  ];

  return pages.map((pageKey) => {
    const config = seoSettings ? seoSettings[pageKey] : undefined;
    return calculateKeywordDensity(
      pageKey,
      config?.keywords,
      config?.title,
      config?.metaDescription
    );
  });
};

/**
 * Returns representative content copy for a given page tab for SEO density calculation
 */
export const getPageContentSample = (pageKey: NavTab): string => {
  // If the page is currently mounted in DOM and matches the key, read live text
  if (typeof document !== 'undefined') {
    const mainEl = document.querySelector('main');
    if (mainEl && mainEl.innerText && mainEl.innerText.length > 200) {
      // Check if current view corresponds to pageKey
      const currentText = mainEl.innerText;
      if (
        (pageKey === 'home' && currentText.includes('클리어웍스')) ||
        (pageKey === 'about' && currentText.includes('회사소개')) ||
        (pageKey === 'services' && currentText.includes('서비스 소개')) ||
        (pageKey === 'pricing' && currentText.includes('가격 안내')) ||
        (pageKey === 'cases' && currentText.includes('시공사례')) ||
        (pageKey === 'reviews' && currentText.includes('고객후기')) ||
        (pageKey === 'faq' && currentText.includes('자주 묻는 질문')) ||
        (pageKey === 'booking' && currentText.includes('예약')) ||
        (pageKey === 'blog' && currentText.includes('칼럼')) ||
        (pageKey === 'notices' && currentText.includes('공지사항'))
      ) {
        return currentText;
      }
    }
  }

  // Pre-compiled comprehensive domain text per page
  switch (pageKey) {
    case 'home':
      return `서울 수도권 구단위로 전체 유리창청소 전문업체 클리어웍스.
      무료 견적부터 현장 상담까지 한 번에 확인하세요.
      뿌옇게 낀 묵은 물때와 매연 유막을 단 한 번의 시공으로 완벽 복원합니다.
      초순수 정수 필터 공법과 나노 발수코팅으로 창문 없는 듯 맑고 투명한 도심 조망권을 되찾으세요.
      유리창청소 전문업체 상담 추천 비용 후기 1위. 서울 25개 구 및 수도권 전지역 방문 출장 직영팀 상주.
      현대해상 1억원 영업배상책임보험 0 TDS 순수 정수 세정 3,500+ 시공 고객 만족도 4.96점.
      아파트 외창 내창 올인원 상가 매장 쇼윈도 케어 주상복합 오피스 통유리 프리미엄 나노 실리카 발수코팅.
      유리 표면에 고착된 석회 유막 화학 박리 무탈거 실내 안전공법 하부 방수 보양 아랫집 물튐 방지.
      30초 실시간 견적 계산기 정찰제 투명 견적 현장 추가금 0원 보증 시공 후 7일 A/S 보증.
      카카오톡 실시간 상담 무료 견적신청 빠른 전화문의 1588-7241.`;

    case 'about':
      return `클리어웍스 회사소개 서울 수도권 1등 유리창청소 전문업체.
      창문은 바깥 세상을 바라보는 집의 눈입니다. 첨단 순수 정수 기술과 정직한 장인 정신으로 조망권을 지킵니다.
      걸레질이 아닌 광학 복원 클리어웍스의 기준은 다릅니다.
      독일 Unger 0 TDS 초순수 정수 시스템 역삼투압 탈이온 수지 무결점 시야 보장.
      3,500+ 누적 시공 세대 94.8% 지인 추천 및 재이용율.
      현대해상 1억원 영업배상책임보험 100% 직영 마스터 2인 1조 책임 시공.
      서울 25개 구 강남 서초 송파 마포 용산 성동 영등포 경기 성남 분당 판교 수원 용인 일산 하남 인천 송도 청라 전지역 출장.
      유리창청소 전문업체 상담 무료 견적신청 전화문의.`;

    case 'services':
      return `클리어웍스 서비스 소개 아파트 외창 내창 올인원 상가 매장 쇼윈도 주상복합 통유리 나노 발수코팅.
      유리창청소 전문업체 추천 시공 프로세스.
      아파트 외창 내창 올인원 프리미엄 케어 거실 대창 난간창 방충망 먼지 세척 소요시간 3~4시간 2인 1조.
      상가 매장 카페 쇼윈도 정기관리 매장 첫인상 개선 월 정기구독 20% 할인 식품안전 생분해 세제.
      주상복합 오피스 사옥 대형 통유리 케어 고소작업 특수 카본 텔레스코픽 폴 시스템 자석 양면 클리너.
      프리미엄 나노 실리카 발수코팅 9H 경도 표면 보호막 6개월 이상 깨끗함 유지 빗물 셀프 클리닝.
      유리창청소 전문업체 비용 투명 견적 카카오톡 상담 무료 신청.`;

    case 'regions':
      return `서울 수도권 구단위 전지역 서비스지역 안내 클리어웍스 유리창청소 전문업체.
      서울 25개 구 전체 강남구 서초구 송파구 강동구 마포구 용산구 성동구 영등포구 양천구 동작구 서대문구 은평구 종로구 중구 노원구 강북구 등.
      경기도 성남시 분당구 수정구 중원구 수원시 영통구 팔달구 권선구 용인시 수지구 기흥구 고양시 일산동구 일산서구 덕양구 부천시 안양시 동안구 만안구 화성시 동탄 남양주시 하남시 평택시 김포시 파주시 광명시.
      인천광역시 연수구 송도국제도시 서구 청라 루원 남동구 부평구.
      서울 수도권 구단위 출장비 0원 무료 방문 견적 10분 내 신속 상담 직영 2인 1조 책임 시공 현대해상 1억원 배상보험.
      유리창청소 전문업체 상담 예약 카카오톡 문의 무료 견적신청.`;

    case 'pricing':
      return `클리어웍스 표준 가격 및 비용 안내 100% 정찰제 투명 견적 보장.
      유리창청소 전문업체 비용 아파트 20평형대 22만원 30평형대 28만원 40평형대 38만원 상가 쇼윈도 15만원부터.
      외부창 물때 유막 제거 실내측 유리 정밀 세정 창틀 하부 레일 먼지 청소 방충망 세척 나노 발수코팅 기본 제공.
      현장 추가금 요구 일체 금지 바가지 없는 정직한 요율표 30초 실시간 견적 계산기.
      정기 구독 시 최대 25% 할인 현대해상 1억원 배상보험 7일 A/S 안심보증.
      유리창청소 전문업체 상담 예약 카카오톡 문의 무료 견적신청.`;

    case 'cases':
      return `클리어웍스 시공사례 포트폴리오 비포애프터 갤러리 100% 실제 현장 사진.
      서울 서초구 래미안 원베일리 아파트 외부창 물때 석회 유막 100% 제거 나노 실리카 발수코팅.
      서울 강남구 압구정 로데오 명품 플래그십 스토어 쇼윈도 분진 제거 시야 투과율 98% 달성.
      경기 성남시 분당구 판교 알파리움 파노라마 전망창 프리미엄 시공 창틀 탈거 없는 실내 안전공법.
      인천 연수구 송도 단독형 타운하우스 3층 보이드창 염분 고착 세정 카본 폴 장비 운용.
      유리창청소 전문업체 후기 추천 비포앤애프터 비교 무료 견적신청.`;

    case 'reviews':
      return `클리어웍스 고객후기 평점 4.96점 서울 수도권 3,500세대 누적 고객 만족도 99%.
      유리창청소 전문업체 후기 만족도 1위.
      송파구 잠실엘스 아파트 외창 내창 종합케어 롯데타워 뷰가 안경 새로 쓴 것처럼 선명해요 마루 보양 꼼꼼.
      마포구 연남동 카페 쇼윈도 손자국 물자국 말끔 해결 발수코팅으로 비 와도 깨끗.
      분당구 수내동 아파트 투명 견적표 추가금 일절 없이 전문가 두 분 4시간 시공 대만족.
      용산구 한남더힐 대형 주상복합 프리미엄 케어 실리콘 곰팡이까지 깔끔 정리 유리창청소 전문업체 추천.
      친절도 99.8% 투명도 99.4% 정찰제 준수 100% 재이용 의향 96.2% 영수증 인증 후기.`;

    case 'faq':
      return `클리어웍스 자주 묻는 질문 FAQ 10선.
      유리창청소 전문업체 상담 어떻게 진행되나요? 무료 견적신청 카카오톡 상담 창문 사진 10분 내 예상 견적 안내.
      유리창청소 전문업체 비용 어떻게 산정되나요? 평형 창문 형태 기준 정찰제 투명 견적 현장 일방적 추가비용 없음.
      서울 수도권 구단위로 전체 지역 이용 가능한가요? 서울 25개 구 경기 성남 분당 일산 수원 하남 인천 송도 전역 직영팀 상주 출장.
      아파트 외부창 청소 시 아랫집 물방울 피해 없나요? 무수분 흡수 스퀴지 공법 하부 물받이 보양 테이핑.
      소요시간 30평형 기준 3~4시간. 비 온 뒤 나노 발수코팅 6개월 시야 유지. 현대해상 1억원 배상보험.
      모바일 하단 고정 버튼 무료 견적 전화 카카오톡 상담.`;

    case 'booking':
      return `클리어웍스 예약 및 견적문의 서울 수도권 전지역 무료 출장 견적.
      10분 내 100% 확정 견적 안내. 현장 추가금 0원 보증 현대해상 1억원 배상보험 시공 후 7일 A/S 무상 보증.
      아파트 빌라 상가 쇼윈도 오피스 빌딩 단독 타운하우스 신청자 성함 연락처 시구 지역 선택 평형 면적 희망 시공 일자.
      외부창 물때 유막 제거 포함 나노 실리카 발수코팅 창틀 하부 살균 무상 제공.
      개인정보 수집 및 이용 동의 상담 목적 외 일체 미사용. 전화문의 1588-7241 카카오톡 상담.`;

    case 'blog':
      return `클리어웍스 유리창청소 전문 칼럼 꿀팁 10선.
      유리창청소 전문업체 선택 전 확인해야 할 핵심 포인트 순수 정수 시스템 0 TDS.
      유리창청소 전문업체 상담 시 체크리스트 하부 보양 창틀 탈거 여부 배상책임보험 확인.
      유리창청소 전문업체 추천 1위 이유 신축 시멘트 가루 공사 분진 글라스 스크래퍼 기술.
      유리창청소 전문업체 비용 투명 비교 가이드 평형별 표준 요율 정찰제.
      유리창청소 전문업체 후기 비포애프터 감동 매연 유막 석회수 물때 제거.
      고소작업 안전 생분해 친환경 세제 상가 정기구독 혜택 영수증 인증 A/S 보증서.`;

    case 'notices':
      return `클리어웍스 공식 공지사항 및 이벤트 안내.
      동절기 전후 유리창 케어 프로모션 나노 발수코팅 무상 업그레이드.
      독일 Unger 4단계 초순수 정수 세정 장비 전면 도입 0 TDS 물자국 제로.
      현대해상 영업배상책임보험 1억원 갱신 완료 및 고객 안심보증제 시행 7일 무상 A/S.`;

    default:
      return '클리어웍스 서울 수도권 유리창청소 전문업체 무료 견적 및 상담.';
  }
};



