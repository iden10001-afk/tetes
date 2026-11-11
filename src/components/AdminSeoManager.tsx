import React, { useState, useEffect, useMemo } from 'react';
import { 
  Globe, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  RefreshCw, 
  ExternalLink, 
  AlertCircle, 
  ShieldCheck,
  Eye,
  Sliders,
  Copy,
  Check,
  BarChart3,
  Target,
  Lightbulb,
  FileText,
  AlertTriangle,
  XCircle,
  Edit3
} from 'lucide-react';
import { NavTab, PageSeoConfig, SeoSettingsMap } from '../types';
import { PageDensityProgressBar } from './PageDensityProgressBar';
import { 
  applySeoToDom, 
  getCurrentDomSeo, 
  DomInspectionResult, 
  getDefaultSeoSettings,
  calculateKeywordDensity,
  getPageContentSample,
  PageDensityAnalysis
} from '../utils/seoUtils';

interface AdminSeoManagerProps {
  seoSettings: SeoSettingsMap;
  onUpdateSeoSettings: (newSettings: SeoSettingsMap) => void;
  currentPageKey: NavTab;
}

export const AdminSeoManager: React.FC<AdminSeoManagerProps> = ({
  seoSettings,
  onUpdateSeoSettings,
  currentPageKey
}) => {
  const [activeTabKey, setActiveTabKey] = useState<NavTab>(
    currentPageKey === 'admin' ? 'home' : currentPageKey
  );
  const [formData, setFormData] = useState<PageSeoConfig>(
    seoSettings[activeTabKey] || seoSettings['home']
  );
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [domInspection, setDomInspection] = useState<DomInspectionResult>(getCurrentDomSeo());
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Page content for keyword density analysis (Active by default for edit mode)
  const [pageContent, setPageContent] = useState<string>(() => getPageContentSample(activeTabKey));
  const [showContentEditor, setShowContentEditor] = useState(true);

  // Sync form and page content when active tab key changes
  useEffect(() => {
    if (seoSettings[activeTabKey]) {
      setFormData(seoSettings[activeTabKey]);
    }
    setPageContent(getPageContentSample(activeTabKey));
    setDomInspection(getCurrentDomSeo());
  }, [activeTabKey, seoSettings]);

  // Real-time keyword density analysis
  const densityAnalysis: PageDensityAnalysis = useMemo(() => {
    return calculateKeywordDensity(
      pageContent,
      formData.keywords,
      formData.title,
      formData.metaDescription
    );
  }, [pageContent, formData.keywords, formData.title, formData.metaDescription]);

  const pageTabs: { key: NavTab; label: string }[] = [
    { key: 'home', label: '메인 홈' },
    { key: 'about', label: '회사소개' },
    { key: 'services', label: '서비스 소개' },
    { key: 'pricing', label: '가격 안내' },
    { key: 'cases', label: '시공사례' },
    { key: 'reviews', label: '고객후기' },
    { key: 'faq', label: '자주 묻는 질문' },
    { key: 'booking', label: '견적·예약하기' },
    { key: 'blog', label: '청소칼럼' },
    { key: 'notices', label: '공지사항' }
  ];

  const handleFieldChange = (field: keyof PageSeoConfig, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    const updatedConfig: PageSeoConfig = {
      ...formData,
      lastUpdated: new Date().toLocaleString('ko-KR', { hour12: false })
    };

    const newMap: SeoSettingsMap = {
      ...seoSettings,
      [activeTabKey]: updatedConfig
    };

    onUpdateSeoSettings(newMap);

    // Apply live to DOM if this is the active page
    applySeoToDom(updatedConfig);
    setDomInspection(getCurrentDomSeo());

    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleResetCurrent = () => {
    if (!confirm(`'${formData.pageName}' 페이지의 SEO 설정을 초기 표준값으로 복원하시겠습니까?`)) {
      return;
    }
    const defaults = getDefaultSeoSettings();
    const defaultConfig = defaults[activeTabKey];
    setFormData(defaultConfig);

    const newMap: SeoSettingsMap = {
      ...seoSettings,
      [activeTabKey]: defaultConfig
    };
    onUpdateSeoSettings(newMap);
    applySeoToDom(defaultConfig);
    setDomInspection(getCurrentDomSeo());
  };

  const handleAppendKeyword = (keyword: string) => {
    setFormData((prev) => {
      const currentKw = prev.keywords.trim();
      if (!currentKw) return { ...prev, keywords: keyword };
      if (currentKw.includes(keyword)) return prev;
      return { ...prev, keywords: `${currentKw}, ${keyword}` };
    });
  };

  const handleCopy = (text: string, fieldId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldId);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const refreshDomInspector = () => {
    setDomInspection(getCurrentDomSeo());
  };

  const titleLength = formData.title.length;
  const descLength = formData.metaDescription.length;

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-sky-50 text-sky-600">
              <Globe className="h-5 w-5" />
            </span>
            <h2 className="text-xl font-bold text-neutral-900">
              페이지별 동적 SEO 메타 디스크립션 & 캐노니컬 URL 유틸리티
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-neutral-500 max-w-2xl leading-relaxed">
            구글(Google)과 네이버(Naver) 검색엔진 노출을 극대화하기 위해 각 개별 페이지의 메타 설명(Description), 
            대표 URL(Canonical), 소셜 공유 오픈그래프(OG) 태그를 실시간 수정하고 즉시 브라우저 DOM에 적용합니다.
          </p>
        </div>

        <button
          type="button"
          onClick={refreshDomInspector}
          className="px-4 py-2.5 rounded-xl border border-neutral-300 text-xs font-semibold text-neutral-700 hover:bg-neutral-50 transition-colors flex items-center gap-1.5 shrink-0 self-start md:self-auto"
        >
          <RefreshCw className="h-3.5 w-3.5 text-neutral-500" />
          <span>브라우저 DOM 상태 새로고침</span>
        </button>
      </div>

      {/* Page Tabs */}
      <div className="bg-white p-2.5 rounded-2xl border border-neutral-200 shadow-xs">
        <div className="text-xs font-bold text-neutral-500 mb-2 px-2">설정할 페이지 선택:</div>
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {pageTabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTabKey(tab.key)}
              className={`px-3.5 py-2 text-xs font-semibold rounded-xl transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                activeTabKey === tab.key
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                activeTabKey === tab.key ? 'bg-sky-700 text-sky-100' : 'bg-neutral-200 text-neutral-600'
              }`}>
                /{tab.key === 'home' ? '' : tab.key}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form Controls (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
            <div>
              <div className="text-xs font-bold text-sky-600">[{formData.pageName}] SEO 메타데이터 편집</div>
              <h3 className="text-lg font-bold text-neutral-900 mt-0.5">검색엔진 최적화 설정</h3>
            </div>
            <span className="text-[11px] text-neutral-400">
              최종 수정: {formData.lastUpdated}
            </span>
          </div>

          <form onSubmit={handleSave} className="space-y-5">
            {/* 1. Page Title */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-neutral-800 flex items-center gap-1.5">
                  <span>페이지 타이틀 (&lt;title&gt; & og:title)</span>
                  <span className="text-rose-500">*</span>
                </label>
                <span className={`text-[11px] font-mono ${
                  titleLength >= 30 && titleLength <= 60
                    ? 'text-emerald-600 font-bold'
                    : 'text-amber-600'
                }`}>
                  {titleLength}자 (권장: 30~60자)
                </span>
              </div>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => handleFieldChange('title', e.target.value)}
                placeholder="예: 서울,수도권 구단위로 전체 유리창청소 전문업체 | 클리어웍스"
                className="w-full rounded-xl border border-neutral-300 px-3.5 py-2.5 text-xs sm:text-sm focus:border-sky-600 focus:outline-hidden"
              />
              <p className="text-[11px] text-neutral-400 mt-1">
                검색 결과 첫 줄에 파란색 링크로 노출되는 가장 중요한 타이틀입니다.
              </p>
            </div>

            {/* 2. Meta Description */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-neutral-800 flex items-center gap-1.5">
                  <span>메타 디스크립션 (&lt;meta name="description"&gt;)</span>
                  <span className="text-rose-500">*</span>
                </label>
                <span className={`text-[11px] font-mono ${
                  descLength >= 100 && descLength <= 160
                    ? 'text-emerald-600 font-bold'
                    : descLength < 100
                    ? 'text-amber-600'
                    : 'text-rose-600'
                }`}>
                  {descLength}자 (권장: 120~160자)
                </span>
              </div>
              <textarea
                rows={3}
                required
                value={formData.metaDescription}
                onChange={(e) => handleFieldChange('metaDescription', e.target.value)}
                placeholder="페이지의 핵심 가치와 서비스 대상(서울·수도권 전지역, 무료견적 등)을 자연스러운 문장으로 설명하세요."
                className="w-full rounded-xl border border-neutral-300 px-3.5 py-2.5 text-xs sm:text-sm focus:border-sky-600 focus:outline-hidden resize-none"
              />
              {/* Length indicator bar */}
              <div className="w-full bg-neutral-100 h-1.5 rounded-full overflow-hidden mt-1">
                <div
                  className={`h-full transition-all ${
                    descLength >= 120 && descLength <= 160
                      ? 'bg-emerald-500'
                      : descLength < 120
                      ? 'bg-amber-400'
                      : 'bg-rose-500'
                  }`}
                  style={{ width: `${Math.min(100, (descLength / 160) * 100)}%` }}
                />
              </div>
              <p className="text-[11px] text-neutral-400 mt-1">
                검색엔진 스니펫 본문에 노출되어 클릭률(CTR)을 결정합니다.
              </p>
            </div>

            {/* 3. Canonical URL */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-neutral-800 flex items-center gap-1.5">
                  <span>대표 캐노니컬 URL (&lt;link rel="canonical"&gt;)</span>
                  <span className="text-rose-500">*</span>
                </label>
                <button
                  type="button"
                  onClick={() => handleCopy(formData.canonicalUrl, 'can')}
                  className="text-[11px] text-neutral-500 hover:text-neutral-900 flex items-center gap-1"
                >
                  {copiedField === 'can' ? (
                    <span className="text-emerald-600 flex items-center gap-0.5">
                      <Check className="h-3 w-3" /> 복사됨
                    </span>
                  ) : (
                    <span className="flex items-center gap-0.5">
                      <Copy className="h-3 w-3" /> 주소 복사
                    </span>
                  )}
                </button>
              </div>
              <input
                type="url"
                required
                value={formData.canonicalUrl}
                onChange={(e) => handleFieldChange('canonicalUrl', e.target.value)}
                placeholder="https://your-domain.com/path"
                className="w-full rounded-xl border border-neutral-300 px-3.5 py-2.5 text-xs font-mono focus:border-sky-600 focus:outline-hidden"
              />
              <p className="text-[11px] text-neutral-400 mt-1">
                중복 콘텐츠 페널티를 방지하고 검색엔진 크롤러가 색인할 공식 대표 표준 URL입니다.
              </p>
            </div>

            {/* 4. Target Keywords */}
            <div>
              <label className="block text-xs font-bold text-neutral-800 mb-1.5">
                타깃 검색 키워드 (&lt;meta name="keywords"&gt;)
              </label>
              <input
                type="text"
                value={formData.keywords}
                onChange={(e) => handleFieldChange('keywords', e.target.value)}
                placeholder="쉼표(,)로 구분된 키워드 목록"
                className="w-full rounded-xl border border-neutral-300 px-3.5 py-2.5 text-xs sm:text-sm focus:border-sky-600 focus:outline-hidden"
              />

              {/* Quick Append Keywords */}
              <div className="pt-2">
                <span className="text-[11px] text-neutral-500 mr-2">고효율 키워드 즉시 추가:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {[
                    '유리창청소 전문업체',
                    '유리창청소 전문업체 상담',
                    '유리창청소 전문업체 추천',
                    '유리창청소 전문업체 비용',
                    '유리창청소 전문업체 후기',
                    '서울 수도권 전지역',
                    '아파트 외창 청소',
                    '나노 발수코팅',
                    '100% 정찰제'
                  ].map((kw) => (
                    <button
                      key={kw}
                      type="button"
                      onClick={() => handleAppendKeyword(kw)}
                      className="text-[10px] bg-neutral-100 hover:bg-neutral-200 text-neutral-700 px-2 py-0.5 rounded transition-colors"
                    >
                      + {kw}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* OpenGraph Overrides Toggle/Fields */}
            <div className="pt-2 border-t border-neutral-100 space-y-3">
              <div className="text-xs font-bold text-neutral-800">
                소셜 공유(카카오톡·페이스북) 오픈그래프 설정
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-neutral-500 mb-1">OG 제목</label>
                  <input
                    type="text"
                    value={formData.ogTitle}
                    onChange={(e) => handleFieldChange('ogTitle', e.target.value)}
                    placeholder="미입력 시 기본 타이틀과 동일"
                    className="w-full rounded-xl border border-neutral-300 px-3 py-2 text-xs focus:border-sky-600 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-neutral-500 mb-1">OG 설명</label>
                  <input
                    type="text"
                    value={formData.ogDescription}
                    onChange={(e) => handleFieldChange('ogDescription', e.target.value)}
                    placeholder="미입력 시 기본 메타설명과 동일"
                    className="w-full rounded-xl border border-neutral-300 px-3 py-2 text-xs focus:border-sky-600 focus:outline-hidden"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-neutral-200 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleResetCurrent}
                className="px-4 py-2.5 rounded-xl border border-neutral-200 text-xs font-semibold text-neutral-600 hover:bg-neutral-50 transition-colors"
              >
                이 페이지 기본값으로 복원
              </button>

              <div className="flex items-center gap-2">
                {saveSuccess && (
                  <span className="text-xs text-emerald-600 font-bold flex items-center gap-1 animate-pulse">
                    <CheckCircle2 className="h-4 w-4" />
                    저장 및 DOM 반영 완료!
                  </span>
                )}
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs sm:text-sm transition-all shadow-sm active:scale-98"
                >
                  현재 페이지 SEO 저장 및 즉시 반영
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Right Column: SERP Live Preview & DOM Inspector (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* 1. Google / Naver Search Snippet Preview */}
          <div className="bg-white rounded-3xl p-6 border border-neutral-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Search className="h-4 w-4 text-sky-600" />
                <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
                  검색엔진 노출 미리보기 (SERP Preview)
                </h4>
              </div>
              <span className="text-[10px] bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded font-mono">
                Google / Naver
              </span>
            </div>

            {/* Snippet Card */}
            <div className="bg-neutral-50 rounded-2xl p-4 border border-neutral-200 space-y-1 font-sans">
              <div className="text-[11px] text-neutral-500 flex items-center gap-1.5 truncate">
                <span className="font-semibold text-neutral-700">클리어웍스</span>
                <span>›</span>
                <span className="text-neutral-500 truncate">{formData.canonicalUrl}</span>
              </div>
              <h5 className="text-sm sm:text-base font-semibold text-[#1a0dab] hover:underline cursor-pointer line-clamp-1 leading-snug">
                {formData.title || '페이지 제목이 여기에 표시됩니다'}
              </h5>
              <p className="text-xs text-[#4d5156] line-clamp-2 leading-relaxed">
                {formData.metaDescription || '페이지 메타 디스크립션 설명문이 여기에 2~3줄로 노출됩니다.'}
              </p>
            </div>

            {/* Quality Checklist */}
            <div className="pt-2 border-t border-neutral-100 space-y-2 text-xs">
              <div className="font-bold text-neutral-800">SEO 품질 점검 체크리스트:</div>
              <ul className="space-y-1.5 text-[11px]">
                <li className="flex items-center gap-1.5">
                  {titleLength >= 30 && titleLength <= 60 ? (
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                  ) : (
                    <AlertCircle className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                  )}
                  <span>타이틀 길이: {titleLength}자 (권장: 30~60자)</span>
                </li>
                <li className="flex items-center gap-1.5">
                  {descLength >= 100 && descLength <= 160 ? (
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                  ) : (
                    <AlertCircle className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                  )}
                  <span>디스크립션 길이: {descLength}자 (권장: 120~160자)</span>
                </li>
                <li className="flex items-center gap-1.5">
                  {formData.canonicalUrl.startsWith('http') ? (
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                  ) : (
                    <AlertCircle className="h-3.5 w-3.5 text-rose-500 shrink-0" />
                  )}
                  <span>절대경로 캐노니컬 URL 형식 올바름</span>
                </li>
                <li className="flex items-center gap-1.5">
                  {formData.title.includes('유리창청소') || formData.metaDescription.includes('유리창청소') ? (
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                  ) : (
                    <AlertCircle className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                  )}
                  <span>핵심 타깃 키워드(유리창청소) 포함됨</span>
                </li>
              </ul>
            </div>
          </div>

          {/* 2. Real Live DOM Inspector */}
          <div className="bg-neutral-900 text-white rounded-3xl p-6 border border-neutral-800 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4 text-emerald-400" />
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  실제 브라우저 DOM 헤드 검사기
                </h4>
              </div>
              <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live Active
              </span>
            </div>

            <p className="text-[11px] text-neutral-400">
              현재 활성화된 웹페이지 &lt;head&gt; 내부의 실제 태그를 실시간 추출한 결과입니다:
            </p>

            <div className="bg-neutral-950 rounded-xl p-3 font-mono text-[11px] space-y-2 text-neutral-300 overflow-x-auto max-h-56">
              <div>
                <span className="text-sky-400">&lt;title&gt;</span>
                <span className="text-white">{domInspection.title}</span>
                <span className="text-sky-400">&lt;/title&gt;</span>
              </div>
              <div>
                <span className="text-amber-400">&lt;meta name="description" content="</span>
                <span className="text-neutral-200">{domInspection.description}</span>
                <span className="text-amber-400">" /&gt;</span>
              </div>
              <div>
                <span className="text-purple-400">&lt;link rel="canonical" href="</span>
                <span className="text-sky-300">{domInspection.canonical}</span>
                <span className="text-purple-400">" /&gt;</span>
              </div>
              <div>
                <span className="text-emerald-400">&lt;meta property="og:title" content="</span>
                <span className="text-neutral-200">{domInspection.ogTitle}</span>
                <span className="text-emerald-400">" /&gt;</span>
              </div>
            </div>

            <button
              type="button"
              onClick={refreshDomInspector}
              className="w-full py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
            >
              <RefreshCw className="h-3 w-3" />
              <span>DOM 재조회</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. KEYWORD DENSITY CALCULATION & SEO SUGGESTIONS UTILITY */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-xs space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-100 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-sky-50 text-sky-600">
                <BarChart3 className="h-5 w-5" />
              </span>
              <h3 className="text-lg font-bold text-neutral-900">
                [{formData.pageName}] 본문 키워드 밀도 분석 및 최적화 제안
              </h3>
            </div>
            <p className="text-xs text-neutral-500 max-w-2xl leading-relaxed">
              메타태그에 등록된 타깃 키워드와 현재 페이지 본문 텍스트 간의 출현 빈도와 밀도 비율을 실시간 계산하여 검색엔진(구글·네이버) 최적화 제안을 생성합니다.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowContentEditor(!showContentEditor)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 self-start md:self-auto shrink-0 shadow-2xs ${
              showContentEditor
                ? 'bg-emerald-600 text-white hover:bg-emerald-500'
                : 'border border-neutral-300 bg-white text-neutral-800 hover:bg-neutral-50'
            }`}
          >
            <Edit3 className="h-3.5 w-3.5" />
            <span>{showContentEditor ? '✏️ 본문 편집모드 [활성화됨]' : '✏️ 본문 편집모드 활성화'}</span>
          </button>
        </div>

        {/* Content Simulator Drawer (optional toggle) */}
        {showContentEditor && (
          <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-neutral-800">
                실시간 본문 텍스트 시뮬레이터 (수정 시 아래 키워드 밀도가 즉시 재계산됩니다)
              </span>
              <button
                type="button"
                onClick={() => setPageContent(getPageContentSample(activeTabKey))}
                className="text-[11px] text-sky-600 hover:underline flex items-center gap-1"
              >
                <RefreshCw className="h-3 w-3" />
                기본 페이지 텍스트로 초기화
              </button>
            </div>
            <textarea
              rows={5}
              value={pageContent}
              onChange={(e) => setPageContent(e.target.value)}
              placeholder="분석할 페이지 본문 텍스트를 입력하거나 수정하세요."
              className="w-full rounded-xl border border-neutral-300 p-3 text-xs focus:border-sky-600 focus:outline-hidden bg-white"
            />
          </div>
        )}

        {/* High-level Analysis Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {/* 1. Overall Score */}
          <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-1">
            <div className="text-[11px] font-bold text-neutral-500 flex items-center justify-between">
              <span>SEO 키워드 최적화 지수</span>
              <Target className="h-3.5 w-3.5 text-sky-600" />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-black font-mono tracking-tight text-neutral-900">
                {densityAnalysis.overallScore}
              </span>
              <span className="text-xs text-neutral-500">/ 100점</span>
            </div>
            <div className="text-[11px] font-medium">
              {densityAnalysis.overallScore >= 80 ? (
                <span className="text-emerald-700">✓ 최적 상태 (상위노출 권장)</span>
              ) : densityAnalysis.overallScore >= 60 ? (
                <span className="text-amber-700">△ 양호 (일부 보강 필요)</span>
              ) : (
                <span className="text-rose-700">! 개선 권장</span>
              )}
            </div>
          </div>

          {/* 2. Word Count */}
          <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-1">
            <div className="text-[11px] font-bold text-neutral-500 flex items-center justify-between">
              <span>페이지 본문 분량</span>
              <FileText className="h-3.5 w-3.5 text-neutral-500" />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-black font-mono tracking-tight text-neutral-900">
                {densityAnalysis.totalWords}
              </span>
              <span className="text-xs text-neutral-500">단어 ({densityAnalysis.totalChars}자)</span>
            </div>
            <div className="text-[11px] text-neutral-500">충분한 콘텐츠 깊이 보유</div>
          </div>

          {/* 3. Optimal density count */}
          <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-1">
            <div className="text-[11px] font-bold text-neutral-500 flex items-center justify-between">
              <span>최적 밀도 키워드</span>
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-black font-mono tracking-tight text-emerald-600">
                {densityAnalysis.keywords.filter((k) => k.status === 'optimal').length}
              </span>
              <span className="text-xs text-neutral-500">/ {densityAnalysis.keywords.length}개</span>
            </div>
            <div className="text-[11px] text-neutral-500">권장 범위(1.0%~3.0%) 유지</div>
          </div>

          {/* 4. Missing in Title count */}
          <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-1">
            <div className="text-[11px] font-bold text-neutral-500 flex items-center justify-between">
              <span>타이틀 일치 항목</span>
              <Sparkles className="h-3.5 w-3.5 text-amber-500" />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-black font-mono tracking-tight text-sky-600">
                {densityAnalysis.keywords.filter((k) => k.inTitle).length}
              </span>
              <span className="text-xs text-neutral-500">/ {densityAnalysis.keywords.length}개</span>
            </div>
            <div className="text-[11px] text-neutral-500">&lt;title&gt; 태그 내 배치됨</div>
          </div>
        </div>

        {/* Live Progress Bar Component for Current Page */}
        <PageDensityProgressBar
          analysis={densityAnalysis}
          showAllKeywords={false}
        />

        {/* Detailed Keyword Density Breakdown Table */}
        <div className="rounded-2xl border border-neutral-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-neutral-600">
              <thead className="bg-neutral-50 text-[11px] font-bold text-neutral-700 uppercase border-b border-neutral-200">
                <tr>
                  <th className="px-4 py-3">타깃 검색 키워드</th>
                  <th className="px-4 py-3 text-center">출현 횟수</th>
                  <th className="px-4 py-3">키워드 밀도 (%)</th>
                  <th className="px-4 py-3 text-center">타이틀</th>
                  <th className="px-4 py-3 text-center">디스크립션</th>
                  <th className="px-4 py-3">맞춤 SEO 최적화 제안</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {densityAnalysis.keywords.map((item, idx) => (
                  <tr key={idx} className="hover:bg-neutral-50/60 transition-colors">
                    {/* Keyword */}
                    <td className="px-4 py-3.5 font-bold text-neutral-900 whitespace-nowrap">
                      {item.keyword}
                    </td>

                    {/* Occurrences Count */}
                    <td className="px-4 py-3.5 text-center font-mono font-bold text-neutral-800">
                      {item.count}회
                    </td>

                    {/* Density Meter */}
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-neutral-900 min-w-[36px]">
                          {item.density}%
                        </span>
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded font-semibold ${
                            item.status === 'optimal'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : item.status === 'low'
                              ? 'bg-amber-50 text-amber-700 border border-amber-200'
                              : item.status === 'high'
                              ? 'bg-rose-50 text-rose-700 border border-rose-200'
                              : 'bg-neutral-100 text-neutral-500 border border-neutral-200'
                          }`}
                        >
                          {item.status === 'optimal'
                            ? '최적 (1~3%)'
                            : item.status === 'low'
                            ? '밀도 부족'
                            : item.status === 'high'
                            ? '과다 (주의)'
                            : '본문 미등장'}
                        </span>
                      </div>
                    </td>

                    {/* In Title */}
                    <td className="px-4 py-3.5 text-center whitespace-nowrap">
                      {item.inTitle ? (
                        <span className="text-emerald-600 font-bold flex items-center justify-center gap-0.5">
                          <CheckCircle2 className="h-3.5 w-3.5" /> 포함
                        </span>
                      ) : (
                        <span className="text-neutral-400 font-medium">누락</span>
                      )}
                    </td>

                    {/* In Meta Description */}
                    <td className="px-4 py-3.5 text-center whitespace-nowrap">
                      {item.inDescription ? (
                        <span className="text-emerald-600 font-bold flex items-center justify-center gap-0.5">
                          <CheckCircle2 className="h-3.5 w-3.5" /> 포함
                        </span>
                      ) : (
                        <span className="text-neutral-400 font-medium">누락</span>
                      )}
                    </td>

                    {/* Suggestion */}
                    <td className="px-4 py-3.5 text-[11px] text-neutral-700 leading-relaxed max-w-sm">
                      {item.suggestion}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* General Actionable Suggestions Box */}
        <div className="p-5 rounded-2xl bg-sky-50/70 border border-sky-100 space-y-2">
          <div className="flex items-center gap-2 font-bold text-xs text-sky-950">
            <Lightbulb className="h-4 w-4 text-sky-600" />
            <span>검색엔진 상위 랭킹을 위한 종합 액션 플랜</span>
          </div>
          <ul className="space-y-1.5 text-xs text-sky-900 leading-relaxed pl-1">
            {densityAnalysis.generalSuggestions.map((sug, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-sky-600 font-bold">•</span>
                <span>{sug}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
