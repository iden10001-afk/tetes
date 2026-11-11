import React, { useState } from 'react';
import { 
  Sparkles, 
  X, 
  Eye, 
  Edit3, 
  RotateCcw, 
  Smartphone, 
  Tablet, 
  Monitor, 
  Save, 
  Sliders, 
  Phone, 
  Layers, 
  MapPin, 
  CheckCircle2,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useStudio, StudioContent } from '../context/StudioContext';

export const GoogleStudioEditor: React.FC = () => {
  const {
    content,
    isStudioOpen,
    setIsStudioOpen,
    isLiveEditing,
    setIsLiveEditing,
    previewDevice,
    setPreviewDevice,
    updateContent,
    resetToDefaults,
    lastSavedAt
  } = useStudio();

  const [activeTab, setActiveTab] = useState<'hero' | 'brand' | 'pricing' | 'stats' | 'region'>('hero');
  const [collapsedPill, setCollapsedPill] = useState(false);

  const handleTextChange = (key: keyof StudioContent, value: string) => {
    updateContent(key, value);
  };

  return (
    <>
      {/* 1. TOP LIVE STUDIO STATUS BANNER (when editing is ON) */}
      {isLiveEditing && (
        <aside 
          aria-label="Google Studio 실시간 편집 바"
          className="sticky top-0 z-50 bg-gradient-to-r from-neutral-950 via-sky-950 to-neutral-950 text-white border-b border-sky-500/40 shadow-xl px-4 py-2"
        >
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="font-extrabold text-sky-400 tracking-wide uppercase">
                Google Studio Live
              </span>
              <span className="hidden sm:inline text-neutral-300">
                실시간 비주얼 편집 모드가 활성화되어 있습니다.
              </span>
              <span className="bg-sky-900/60 text-sky-200 border border-sky-700/60 px-2 py-0.5 rounded text-[11px] font-mono">
                자동 저장: {lastSavedAt}
              </span>
            </div>

            {/* Device preview toggles */}
            <div className="flex items-center gap-1 bg-neutral-900/80 p-0.5 rounded-lg border border-neutral-700">
              <button
                type="button"
                onClick={() => setPreviewDevice('desktop')}
                className={`p-1.5 rounded flex items-center gap-1 transition-colors ${
                  previewDevice === 'desktop' ? 'bg-sky-600 text-white' : 'text-neutral-400 hover:text-white'
                }`}
                title="데스크톱 뷰 (100%)"
              >
                <Monitor className="h-3.5 w-3.5" />
                <span className="text-[11px] hidden md:inline">PC</span>
              </button>
              <button
                type="button"
                onClick={() => setPreviewDevice('tablet')}
                className={`p-1.5 rounded flex items-center gap-1 transition-colors ${
                  previewDevice === 'tablet' ? 'bg-sky-600 text-white' : 'text-neutral-400 hover:text-white'
                }`}
                title="태블릿 뷰 (768px)"
              >
                <Tablet className="h-3.5 w-3.5" />
                <span className="text-[11px] hidden md:inline">태블릿</span>
              </button>
              <button
                type="button"
                onClick={() => setPreviewDevice('mobile')}
                className={`p-1.5 rounded flex items-center gap-1 transition-colors ${
                  previewDevice === 'mobile' ? 'bg-sky-600 text-white' : 'text-neutral-400 hover:text-white'
                }`}
                title="모바일 뷰 (400px)"
              >
                <Smartphone className="h-3.5 w-3.5" />
                <span className="text-[11px] hidden md:inline">모바일</span>
              </button>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsStudioOpen(!isStudioOpen)}
                className="px-2.5 py-1 rounded bg-sky-500 hover:bg-sky-400 text-neutral-950 font-bold text-[11px] flex items-center gap-1 transition-colors shadow-xs"
              >
                <Sliders className="h-3 w-3" />
                <span>{isStudioOpen ? '패널 닫기' : '편집 패널 열기'}</span>
              </button>

              <button
                type="button"
                onClick={() => setIsLiveEditing(false)}
                className="px-2.5 py-1 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-[11px] font-medium flex items-center gap-1 transition-colors border border-neutral-700"
              >
                <Eye className="h-3 w-3" />
                <span>미리보기</span>
              </button>
            </div>
          </div>
        </aside>
      )}

      {/* 2. FLOATING STUDIO DOCK BUTTON */}
      <div className="fixed bottom-20 md:bottom-5 right-4 z-40">
        {!collapsedPill ? (
          <div className="flex items-center gap-1 bg-neutral-950/90 text-white p-1 rounded-full shadow-2xl border border-neutral-700 backdrop-blur-md">
            <button
              type="button"
              onClick={() => {
                const nextState = !isLiveEditing;
                setIsLiveEditing(nextState);
                if (nextState) setIsStudioOpen(true);
              }}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-bold transition-all ${
                isLiveEditing
                  ? 'bg-gradient-to-r from-sky-500 to-emerald-500 text-neutral-950 shadow-md shadow-sky-500/20'
                  : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-200'
              }`}
              title="Google Studio 실시간 비주얼 편집기 토글"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>{isLiveEditing ? '구글스튜디오 [LIVE ON]' : '구글스튜디오 실시간편집'}</span>
            </button>

            {isLiveEditing && (
              <button
                type="button"
                onClick={() => setIsStudioOpen(!isStudioOpen)}
                className="p-2 text-neutral-400 hover:text-white rounded-full transition-colors"
                title="설정 패널 토글"
              >
                <Sliders className="h-4 w-4" />
              </button>
            )}

            <button
              type="button"
              onClick={() => setCollapsedPill(true)}
              className="p-1.5 text-neutral-500 hover:text-neutral-300 rounded-full transition-colors"
              title="최소화"
            >
              <ChevronDown className="h-3.5 w-3.5" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setCollapsedPill(false)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-950/80 hover:bg-neutral-900 text-neutral-300 text-xs font-semibold rounded-full border border-neutral-800 shadow-xl backdrop-blur-md"
            title="Google Studio 열기"
          >
            <Sparkles className="h-3.5 w-3.5 text-sky-400" />
            <span>Studio</span>
            <ChevronUp className="h-3 w-3 text-neutral-400" />
          </button>
        )}
      </div>

      {/* 3. STUDIO INSPECTOR DRAWER / MODAL */}
      {isStudioOpen && (
        <div className="fixed inset-y-0 right-0 w-full sm:w-[420px] bg-neutral-950 text-white z-50 shadow-2xl border-l border-neutral-800 flex flex-col animate-in slide-in-from-right duration-200">
          {/* Header */}
          <div className="p-4 border-b border-neutral-800 flex items-center justify-between bg-neutral-900/60">
            <div className="flex items-center gap-2.5">
              <div className="h-7 w-7 rounded-lg bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-sky-400">
                <Sparkles className="h-4 w-4" />
              </div>
              <div>
                <div className="text-xs font-black tracking-tight flex items-center gap-1.5">
                  <span>Google Studio</span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.2 rounded font-mono">
                    LIVE
                  </span>
                </div>
                <div className="text-[11px] text-neutral-400">
                  실시간 변경 즉시 반영 · LocalStorage 영구 보존
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsStudioOpen(false)}
              className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Category Tabs */}
          <div className="grid grid-cols-4 p-2 gap-1 border-b border-neutral-800 text-[11px] font-bold bg-neutral-900/40">
            <button
              type="button"
              onClick={() => setActiveTab('hero')}
              className={`py-1.5 px-2 rounded text-center transition-all ${
                activeTab === 'hero' ? 'bg-sky-600 text-white' : 'text-neutral-400 hover:text-white'
              }`}
            >
              헤로 카피
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('brand')}
              className={`py-1.5 px-2 rounded text-center transition-all ${
                activeTab === 'brand' ? 'bg-sky-600 text-white' : 'text-neutral-400 hover:text-white'
              }`}
            >
              브랜드·연락
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('pricing')}
              className={`py-1.5 px-2 rounded text-center transition-all ${
                activeTab === 'pricing' ? 'bg-sky-600 text-white' : 'text-neutral-400 hover:text-white'
              }`}
            >
              가격·혜택
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('stats')}
              className={`py-1.5 px-2 rounded text-center transition-all ${
                activeTab === 'stats' ? 'bg-sky-600 text-white' : 'text-neutral-400 hover:text-white'
              }`}
            >
              실적 지표
            </button>
          </div>

          {/* Form Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-5 text-xs">
            {/* TAB: HERO COPY */}
            {activeTab === 'hero' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-[11px] font-semibold text-neutral-300 mb-1">
                    헤로 뱃지 문구
                  </label>
                  <input
                    type="text"
                    value={content.heroBadge}
                    onChange={(e) => handleTextChange('heroBadge', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white focus:border-sky-500 focus:outline-hidden text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-neutral-300 mb-1">
                    헤드라인 1번째 줄 (상단 접두사)
                  </label>
                  <input
                    type="text"
                    value={content.heroTitlePrefix}
                    onChange={(e) => handleTextChange('heroTitlePrefix', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white focus:border-sky-500 focus:outline-hidden text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-neutral-300 mb-1">
                    헤드라인 2번째 줄 (그라디언트 강조 문구)
                  </label>
                  <input
                    type="text"
                    value={content.heroTitleHighlight}
                    onChange={(e) => handleTextChange('heroTitleHighlight', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white focus:border-sky-500 focus:outline-hidden text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-neutral-300 mb-1">
                    헤로 설명 본문
                  </label>
                  <textarea
                    rows={4}
                    value={content.heroDescription}
                    onChange={(e) => handleTextChange('heroDescription', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white focus:border-sky-500 focus:outline-hidden text-xs leading-relaxed"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-neutral-300 mb-1">
                      1차 CTA 버튼 문구
                    </label>
                    <input
                      type="text"
                      value={content.heroCtaPrimary}
                      onChange={(e) => handleTextChange('heroCtaPrimary', e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white focus:border-sky-500 focus:outline-hidden text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-neutral-300 mb-1">
                      카카오 CTA 버튼 문구
                    </label>
                    <input
                      type="text"
                      value={content.heroCtaSecondary}
                      onChange={(e) => handleTextChange('heroCtaSecondary', e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white focus:border-sky-500 focus:outline-hidden text-xs"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB: BRAND & CONTACT */}
            {activeTab === 'brand' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-[11px] font-semibold text-neutral-300 mb-1">
                    브랜드명
                  </label>
                  <input
                    type="text"
                    value={content.brandName}
                    onChange={(e) => handleTextChange('brandName', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white focus:border-sky-500 focus:outline-hidden text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-neutral-300 mb-1">
                    슬로건
                  </label>
                  <input
                    type="text"
                    value={content.brandSlogan}
                    onChange={(e) => handleTextChange('brandSlogan', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white focus:border-sky-500 focus:outline-hidden text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-neutral-300 mb-1">
                    대표 전화번호
                  </label>
                  <input
                    type="text"
                    value={content.contactPhone}
                    onChange={(e) => handleTextChange('contactPhone', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white focus:border-sky-500 focus:outline-hidden text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-neutral-300 mb-1">
                    상담 가능 시간
                  </label>
                  <input
                    type="text"
                    value={content.businessHours}
                    onChange={(e) => handleTextChange('businessHours', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white focus:border-sky-500 focus:outline-hidden text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-neutral-300 mb-1">
                    최상단 공지 롤링바 문구
                  </label>
                  <input
                    type="text"
                    value={content.topNotice}
                    onChange={(e) => handleTextChange('topNotice', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white focus:border-sky-500 focus:outline-hidden text-xs"
                  />
                </div>
              </div>
            )}

            {/* TAB: PRICING & PROMOTIONS */}
            {activeTab === 'pricing' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-neutral-300 mb-1">
                      아파트 최저 시작가
                    </label>
                    <input
                      type="text"
                      value={content.pricingAptStart}
                      onChange={(e) => handleTextChange('pricingAptStart', e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white focus:border-sky-500 focus:outline-hidden text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-neutral-300 mb-1">
                      상가 최저 시작가
                    </label>
                    <input
                      type="text"
                      value={content.pricingStoreStart}
                      onChange={(e) => handleTextChange('pricingStoreStart', e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white focus:border-sky-500 focus:outline-hidden text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-neutral-300 mb-1">
                    프로모션 혜택 문구
                  </label>
                  <textarea
                    rows={2}
                    value={content.pricingPromoBadge}
                    onChange={(e) => handleTextChange('pricingPromoBadge', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white focus:border-sky-500 focus:outline-hidden text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-neutral-300 mb-1">
                    서비스지역 출장비 보증 문구
                  </label>
                  <input
                    type="text"
                    value={content.regionGuarantee}
                    onChange={(e) => handleTextChange('regionGuarantee', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white focus:border-sky-500 focus:outline-hidden text-xs"
                  />
                </div>
              </div>
            )}

            {/* TAB: STATS & TRUST */}
            {activeTab === 'stats' && (
              <div className="space-y-4">
                <div className="p-3 bg-neutral-900/80 rounded-xl border border-neutral-800 space-y-2">
                  <div className="text-[11px] font-bold text-sky-400">지표 1 (시공 실적)</div>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="수치 (예: 3,500+ 세대)"
                      value={content.stat1Value}
                      onChange={(e) => handleTextChange('stat1Value', e.target.value)}
                      className="px-2.5 py-1.5 rounded bg-neutral-950 border border-neutral-700 text-white text-xs"
                    />
                    <input
                      type="text"
                      placeholder="라벨 (예: 누적 시공 실적)"
                      value={content.stat1Label}
                      onChange={(e) => handleTextChange('stat1Label', e.target.value)}
                      className="px-2.5 py-1.5 rounded bg-neutral-950 border border-neutral-700 text-white text-xs"
                    />
                  </div>
                </div>

                <div className="p-3 bg-neutral-900/80 rounded-xl border border-neutral-800 space-y-2">
                  <div className="text-[11px] font-bold text-emerald-400">지표 2 (만족도)</div>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="수치 (예: 4.96점)"
                      value={content.stat2Value}
                      onChange={(e) => handleTextChange('stat2Value', e.target.value)}
                      className="px-2.5 py-1.5 rounded bg-neutral-950 border border-neutral-700 text-white text-xs"
                    />
                    <input
                      type="text"
                      placeholder="라벨 (예: 고객 만족도)"
                      value={content.stat2Label}
                      onChange={(e) => handleTextChange('stat2Label', e.target.value)}
                      className="px-2.5 py-1.5 rounded bg-neutral-950 border border-neutral-700 text-white text-xs"
                    />
                  </div>
                </div>

                <div className="p-3 bg-neutral-900/80 rounded-xl border border-neutral-800 space-y-2">
                  <div className="text-[11px] font-bold text-amber-400">지표 3 (보험)</div>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="수치 (예: 1억원)"
                      value={content.stat3Value}
                      onChange={(e) => handleTextChange('stat3Value', e.target.value)}
                      className="px-2.5 py-1.5 rounded bg-neutral-950 border border-neutral-700 text-white text-xs"
                    />
                    <input
                      type="text"
                      placeholder="라벨 (예: 배상책임보험)"
                      value={content.stat3Label}
                      onChange={(e) => handleTextChange('stat3Label', e.target.value)}
                      className="px-2.5 py-1.5 rounded bg-neutral-950 border border-neutral-700 text-white text-xs"
                    />
                  </div>
                </div>

                <div className="p-3 bg-neutral-900/80 rounded-xl border border-neutral-800 space-y-2">
                  <div className="text-[11px] font-bold text-sky-400">지표 4 (정찰제)</div>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="수치 (예: 0원)"
                      value={content.stat4Value}
                      onChange={(e) => handleTextChange('stat4Value', e.target.value)}
                      className="px-2.5 py-1.5 rounded bg-neutral-950 border border-neutral-700 text-white text-xs"
                    />
                    <input
                      type="text"
                      placeholder="라벨 (예: 현장 추가금)"
                      value={content.stat4Label}
                      onChange={(e) => handleTextChange('stat4Label', e.target.value)}
                      className="px-2.5 py-1.5 rounded bg-neutral-950 border border-neutral-700 text-white text-xs"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer Controls */}
          <div className="p-4 border-t border-neutral-800 bg-neutral-900/80 space-y-2">
            <div className="flex items-center justify-between text-[11px] text-neutral-400">
              <span className="flex items-center gap-1 text-emerald-400">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>입력 즉시 실시간 동기화 완료</span>
              </span>
              <span>{lastSavedAt}</span>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={resetToDefaults}
                className="flex-1 py-2 px-3 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-medium text-xs flex items-center justify-center gap-1.5 transition-colors border border-neutral-700"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>기본값 초기화</span>
              </button>
              <button
                type="button"
                onClick={() => setIsStudioOpen(false)}
                className="flex-1 py-2 px-3 rounded-lg bg-sky-500 hover:bg-sky-400 text-neutral-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs"
              >
                <span>완료 및 닫기</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
