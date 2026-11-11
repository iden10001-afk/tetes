import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  PhoneCall, 
  MessageCircle, 
  Droplets, 
  Layers, 
  Award, 
  MapPin, 
  ChevronRight,
  HelpCircle,
  Clock,
  Star,
  Building2,
  Store,
  Home
} from 'lucide-react';
import { NavTab, CaseStudy, ReviewItem, FaqItem } from '../types';
import { 
  HERO_IMAGE, 
  CRAFTSMAN_IMAGE, 
  STOREFRONT_IMAGE, 
  APARTMENT_IMAGE,
  CASE_STUDIES, 
  REVIEWS, 
  FAQS,
  METRO_REGIONS 
} from '../data/mockData';
import { BeforeAfterSlider } from '../components/BeforeAfterSlider';
import { InstantEstimator } from '../components/InstantEstimator';

import { useStudio } from '../context/StudioContext';
import { StudioEditable } from '../components/StudioEditable';

interface HomeViewProps {
  onSelectTab: (tab: NavTab) => void;
  onOpenQuote: () => void;
  onOpenKakao: () => void;
  onApplyEstimate: (data: any) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onSelectTab,
  onOpenQuote,
  onOpenKakao,
  onApplyEstimate
}) => {
  const [openFaqId, setOpenFaqId] = useState<string | null>(FAQS[0].id);
  const { content } = useStudio();

  return (
    <div className="space-y-16 lg:space-y-24">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-neutral-950 text-white pt-10 pb-16 lg:pt-16 lg:pb-24">
        {/* Ambient background blur */}
        <div className="absolute inset-0 z-0 opacity-40">
          <img
            src={HERO_IMAGE}
            alt="서울 파노라마 전망 클리어웍스 유리창청소"
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover filter brightness-75 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/85 to-neutral-950/40" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Headlines & CTAs */}
            <div className="lg:col-span-7 space-y-6">
              {/* Region trust indicator */}
              <button
                type="button"
                onClick={() => onSelectTab('regions')}
                className="inline-flex items-center gap-2 text-xs font-semibold text-sky-400 bg-sky-950/70 border border-sky-800/60 rounded-full px-3.5 py-1.5 backdrop-blur-xs hover:bg-sky-900/80 transition-colors cursor-pointer text-left"
                title="서비스 지역 구단위 상세 보기"
              >
                <MapPin className="h-3.5 w-3.5 text-sky-400 shrink-0" />
                <StudioEditable contentKey="heroBadge">
                  {content.heroBadge}
                </StudioEditable>
                <ChevronRight className="h-3 w-3 text-sky-300 ml-0.5 shrink-0" />
              </button>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                <StudioEditable contentKey="heroTitlePrefix" as="span">
                  {content.heroTitlePrefix}
                </StudioEditable>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-sky-200 to-white">
                  <StudioEditable contentKey="heroTitleHighlight" as="span">
                    {content.heroTitleHighlight}
                  </StudioEditable>
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-neutral-300 leading-relaxed max-w-2xl font-normal">
                <StudioEditable contentKey="heroDescription" multiline as="span">
                  {content.heroDescription}
                </StudioEditable>
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={onOpenQuote}
                  className="px-6 py-3.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-neutral-950 font-bold text-sm transition-all shadow-lg shadow-sky-900/30 flex items-center gap-2 hover:scale-102 active:scale-98"
                >
                  <StudioEditable contentKey="heroCtaPrimary" as="span">
                    {content.heroCtaPrimary}
                  </StudioEditable>
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={onOpenKakao}
                  className="px-5 py-3.5 rounded-xl bg-[#FEE500] hover:bg-yellow-400 text-neutral-900 font-bold text-sm transition-all flex items-center gap-2 shadow-xs"
                >
                  <MessageCircle className="h-4 w-4 fill-current" />
                  <StudioEditable contentKey="heroCtaSecondary" as="span">
                    {content.heroCtaSecondary}
                  </StudioEditable>
                </button>
                <a
                  href={`tel:${content.contactPhone}`}
                  className="px-4 py-3.5 rounded-xl bg-neutral-800/80 hover:bg-neutral-800 text-white font-medium text-sm transition-colors border border-neutral-700 flex items-center gap-2"
                >
                  <PhoneCall className="h-4 w-4 text-sky-400" />
                  <StudioEditable contentKey="heroCtaPhone" as="span">
                    {content.heroCtaPhone}
                  </StudioEditable>
                </a>
              </div>

              {/* Trust Badges */}
              <div className="pt-4 border-t border-neutral-800/80 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-neutral-400">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-emerald-400" />
                  <span>
                    <StudioEditable contentKey="stat3Label">{content.stat3Label}</StudioEditable>{' '}
                    <strong className="text-white"><StudioEditable contentKey="stat3Value">{content.stat3Value}</StudioEditable></strong>
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Droplets className="h-4 w-4 text-sky-400" />
                  <span>0 TDS 초순수 정수 세정</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Award className="h-4 w-4 text-amber-400" />
                  <span>
                    <StudioEditable contentKey="stat2Label">{content.stat2Label}</StudioEditable>{' '}
                    <strong className="text-white"><StudioEditable contentKey="stat2Value">{content.stat2Value}</StudioEditable></strong>
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Before/After Showcase */}
            <div className="lg:col-span-5">
              <div className="bg-neutral-900/90 rounded-2xl p-3 border border-neutral-800 shadow-2xl">
                <div className="text-xs font-semibold text-neutral-400 mb-2 flex items-center justify-between px-1">
                  <span>실제 서초구 아파트 34평형 외창 비포&애프터</span>
                  <span className="text-sky-400">터치 후 좌우 드래그</span>
                </div>
                <BeforeAfterSlider
                  beforeImage={CRAFTSMAN_IMAGE}
                  afterImage={HERO_IMAGE}
                  aspectRatioClass="aspect-[4/3]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PROBLEM EMPATHY (문제 공감) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="text-xs font-bold text-sky-600 tracking-wider uppercase">고객이 겪는 진짜 고민</div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900">
            유리창청소, 왜 일반 청소로는 해결되지 않을까요?
          </h2>
          <p className="text-sm sm:text-base text-neutral-600">
            손이 닿지 않는 위험성, 닦아도 며칠 만에 번지는 물때 얼룩, 아랫집 민원 걱정까지… 클리어웍스가 한 번에 해결합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-xs space-y-3">
            <div className="h-10 w-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold text-base">
              01
            </div>
            <h3 className="text-lg font-bold text-neutral-900">유리 표면에 고착된 석회·유막</h3>
            <p className="text-sm text-neutral-600 leading-relaxed">
              빗물 속 산성 성분과 시멘트 분진이 결합해 형성된 석회 스팟은 일반 세제나 걸레질로는 절대 지워지지 않고 오히려 흠집을 남깁니다.
            </p>
            <div className="text-xs font-semibold text-sky-700 bg-sky-50 p-2.5 rounded-lg">
              ✓ 클리어웍스: 전용 약품 화학 박리 + 나노 폴리싱
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-xs space-y-3">
            <div className="h-10 w-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-base">
              02
            </div>
            <h3 className="text-lg font-bold text-neutral-900">창틀 탈거의 위험과 아랫집 물튐</h3>
            <p className="text-sm text-neutral-600 leading-relaxed">
              무거운 창문을 억지로 떼어내다 레일 파손이나 추락 사고가 발생할 수 있으며, 고압수 세척 시 아랫집 베란다에 흙탕물이 흘러내려 분쟁이 일어납니다.
            </p>
            <div className="text-xs font-semibold text-sky-700 bg-sky-50 p-2.5 rounded-lg">
              ✓ 클리어웍스: 무탈거 실내 안전공법 + 하부 방수 보양
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-xs space-y-3">
            <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-base">
              03
            </div>
            <h3 className="text-lg font-bold text-neutral-900">청소 직후 비 오면 다시 도로아미타불?</h3>
            <p className="text-sm text-neutral-600 leading-relaxed">
              발수 보호막 없이 먼지만 털어낸 유리는 비가 오면 공기 중 매연이 다시 엉겨 붙어 2주 만에 다시 뿌옇게 변합니다.
            </p>
            <div className="text-xs font-semibold text-sky-700 bg-sky-50 p-2.5 rounded-lg">
              ✓ 클리어웍스: 독일 나노 실리카 발수코팅 (6개월 보증)
            </div>
          </div>
        </div>
      </section>

      {/* 3. CORE SERVICES (대표 서비스 소개) */}
      <section className="bg-neutral-100/70 py-16 lg:py-20 border-y border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="text-xs font-bold text-sky-600 tracking-wider uppercase mb-1">맞춤형 케어 솔루션</div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900">
                공간별 특화된 클리어웍스 대표 서비스
              </h2>
            </div>
            <button
              onClick={() => onSelectTab('services')}
              className="text-sm font-semibold text-sky-600 hover:text-sky-700 flex items-center gap-1"
            >
              전체 서비스 상세 보기 <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Service 1 */}
            <div className="bg-white rounded-2xl overflow-hidden border border-neutral-200 shadow-xs flex flex-col group">
              <div className="h-48 overflow-hidden relative">
                <img
                  src={APARTMENT_IMAGE}
                  alt="아파트 외창 내창 올인원 케어"
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 bg-neutral-900/80 text-white text-[11px] font-semibold px-2.5 py-1 rounded">
                  인기 1위
                </span>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-bold text-base text-neutral-900 mb-1">아파트 외창+내창 올인원</h3>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    거실 대창, 방 창호, 난간창의 물때와 방충망 먼지까지 한 번에 완벽 청소
                  </p>
                </div>
                <div className="pt-2 border-t border-neutral-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-neutral-900">220,000원부터~</span>
                  <button
                    onClick={onOpenQuote}
                    className="text-xs font-semibold text-sky-600 hover:underline"
                  >
                    견적 확인 →
                  </button>
                </div>
              </div>
            </div>

            {/* Service 2 */}
            <div className="bg-white rounded-2xl overflow-hidden border border-neutral-200 shadow-xs flex flex-col group">
              <div className="h-48 overflow-hidden relative">
                <img
                  src={STOREFRONT_IMAGE}
                  alt="상가 매장 쇼윈도 클리닝"
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 bg-sky-700 text-white text-[11px] font-semibold px-2.5 py-1 rounded">
                  매장 전용
                </span>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-bold text-base text-neutral-900 mb-1">상가·카페 쇼윈도 케어</h3>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    매장 매출을 올리는 첫인상! 손지문, 스티커 잔사, 도로 분진 말끔 제거
                  </p>
                </div>
                <div className="pt-2 border-t border-neutral-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-neutral-900">정기구독 시 20% 할인</span>
                  <button
                    onClick={onOpenQuote}
                    className="text-xs font-semibold text-sky-600 hover:underline"
                  >
                    견적 확인 →
                  </button>
                </div>
              </div>
            </div>

            {/* Service 3 */}
            <div className="bg-white rounded-2xl overflow-hidden border border-neutral-200 shadow-xs flex flex-col group">
              <div className="h-48 overflow-hidden relative">
                <img
                  src={CRAFTSMAN_IMAGE}
                  alt="주상복합 시스템창호 통유리"
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 bg-neutral-900/80 text-white text-[11px] font-semibold px-2.5 py-1 rounded">
                  고난도 전문
                </span>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-bold text-base text-neutral-900 mb-1">주상복합·오피스 통유리</h3>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    개폐가 불가능한 고층 시스템 창호 및 사옥 로비 대형 유리창 특수 케어
                  </p>
                </div>
                <div className="pt-2 border-t border-neutral-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-neutral-900">현장 맞춤 견적</span>
                  <button
                    onClick={onOpenQuote}
                    className="text-xs font-semibold text-sky-600 hover:underline"
                  >
                    견적 확인 →
                  </button>
                </div>
              </div>
            </div>

            {/* Service 4 */}
            <div className="bg-white rounded-2xl overflow-hidden border border-neutral-200 shadow-xs flex flex-col group">
              <div className="h-48 overflow-hidden relative">
                <img
                  src={HERO_IMAGE}
                  alt="나노 실리카 발수코팅"
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 bg-emerald-700 text-white text-[11px] font-semibold px-2.5 py-1 rounded">
                  이벤트 무료
                </span>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-bold text-base text-neutral-900 mb-1">나노 실리카 발수코팅</h3>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    비가 와도 물방울이 자연 배출되는 9H 경도 나노 코팅으로 6개월 이상 깨끗함 유지
                  </p>
                </div>
                <div className="pt-2 border-t border-neutral-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-700">전체 시공 시 무상 시공</span>
                  <button
                    onClick={onOpenQuote}
                    className="text-xs font-semibold text-sky-600 hover:underline"
                  >
                    혜택 받기 →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. INSTANT ESTIMATOR CALCULATOR (실시간 견적 계산기) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
          <div className="text-xs font-bold text-sky-600 tracking-wider uppercase">실시간 정찰가 확인</div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900">
            우리 집 유리창청소 비용, 지금 바로 확인하세요
          </h2>
          <p className="text-sm text-neutral-600">
            복잡한 전화 상담 없이 평형과 유형만 선택하면 1초 만에 투명한 기준 견적이 나옵니다.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <InstantEstimator onApplyEstimate={onApplyEstimate} />
        </div>
      </section>

      {/* 5. DIFFERENTIATION POINTS (차별화 포인트) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 space-y-5">
            <div className="text-xs font-bold text-sky-600 tracking-wider uppercase">왜 클리어웍스인가?</div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 leading-tight">
              3,500세대가 입을 모아<br />
              극찬한 4가지 차별화 원칙
            </h2>
            <p className="text-sm text-neutral-600 leading-relaxed">
              단순히 걸레로 닦아내는 일반 청소와는 완전히 다릅니다. 독일 전문 글라스 케어 장비와 엄격한 작업 수칙으로 유리 본연의 맑음을 복원합니다.
            </p>
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-sky-100 text-sky-700 font-bold text-xs shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <h3 className="text-sm font-bold text-neutral-900">0 TDS 순수 정수 필터링 (Pure Water)</h3>
                  <p className="text-xs text-neutral-600 mt-0.5">수돗물 속 칼슘 미네랄을 99.9% 제거해 건조 후 백화 얼룩이 전혀 남지 않습니다.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-sky-100 text-sky-700 font-bold text-xs shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <h3 className="text-sm font-bold text-neutral-900">무수분 흡수 스퀴지 & 하부 완벽 보양</h3>
                  <p className="text-xs text-neutral-600 mt-0.5">실내 마루와 아랫집 베란다에 물 한 방울 떨어지지 않는 철저한 방수 보양을 시행합니다.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-sky-100 text-sky-700 font-bold text-xs shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <h3 className="text-sm font-bold text-neutral-900">친환경 생분해 유리 전용 케미컬</h3>
                  <p className="text-xs text-neutral-600 mt-0.5">독한 화학 냄새가 없으며 어린이나 반려동물이 있는 가정에서도 100% 안전합니다.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-sky-100 text-sky-700 font-bold text-xs shrink-0 mt-0.5">
                  4
                </div>
                <div>
                  <h3 className="text-sm font-bold text-neutral-900">현대해상 1억원 영업배상책임보험</h3>
                  <p className="text-xs text-neutral-600 mt-0.5">시공 중 만에 하나 발생할 수 있는 창호 기물 파손에 대해 100% 신속 보상 체계를 갖추었습니다.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="relative rounded-2xl overflow-hidden border border-neutral-200 shadow-lg">
              <img
                src={CRAFTSMAN_IMAGE}
                alt="클리어웍스 전문 마스터의 스퀴지 세정 공법"
                referrerPolicy="no-referrer"
                className="w-full h-[440px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent flex items-end p-6">
                <div className="text-white space-y-1">
                  <div className="font-bold text-base">전문 글라스 마스터 2인 1조 직영 시공</div>
                  <p className="text-xs text-neutral-300">
                    하도급이나 일용직 배정 없이, 본사 전문 교육을 이수한 베테랑 마스터가 직접 현장을 책임집니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. STEP-BY-STEP PROCESS (진행 과정) */}
      <section className="bg-neutral-900 text-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <div className="text-xs font-bold text-sky-400 tracking-wider uppercase">체계적인 5단계 표준 시공</div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              신청부터 검수까지, 투명하고 정확하게
            </h2>
            <p className="text-sm text-neutral-400">
              약속된 시간에 방문하여 표준 매뉴얼에 맞춰 한 뼘의 사각지대도 남기지 않고 시공합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              {
                step: '01',
                title: '간편 견적 & 상담',
                desc: '창문 사진 1장 또는 거주 평형으로 10분 내 100% 확정 견적 안내'
              },
              {
                step: '02',
                title: '방문 및 정밀 보양',
                desc: '실내 마루 및 창틀 하부 3중 방수 테이핑으로 오염수 완벽 차단'
              },
              {
                step: '03',
                title: '유막 & 석회 화학 박리',
                desc: '유리 표면 손상 없는 전용 약품 도포로 묵은 때와 분진 연화'
              },
              {
                step: '04',
                title: '초순수 세정 & 스퀴징',
                desc: '0 TDS 정수 물과 마이크로 블레이드로 물자국 제로 투명 시야 구현'
              },
              {
                step: '05',
                title: '발수코팅 & 고객 검수',
                desc: '나노 실리카 보호막 시공 후 고객님과 함께 투명도 확인 및 보증서 발급'
              }
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-neutral-800/80 rounded-2xl p-5 border border-neutral-700/80 space-y-3 relative flex flex-col justify-between"
              >
                <div className="text-2xl font-black text-sky-400 font-mono">
                  {item.step}
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-base text-white">{item.title}</h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={onOpenQuote}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-neutral-950 font-bold text-sm transition-all"
            >
              <span>우리 집 맞춤 시공 신청하기</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 7. REVIEWS & CASE STUDIES (후기 / 사례) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="text-xs font-bold text-sky-600 tracking-wider uppercase mb-1">리얼 시공 검증</div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900">
              서울·수도권 고객님들의 생생한 후기
            </h2>
          </div>
          <button
            onClick={() => onSelectTab('reviews')}
            className="text-sm font-semibold text-sky-600 hover:text-sky-700 flex items-center gap-1"
          >
            후기 전체보기 (평점 4.96) <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.slice(0, 3).map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-xs flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs text-neutral-400">{rev.date}</span>
                </div>
                <p className="text-sm text-neutral-700 leading-relaxed font-normal">
                  "{rev.content}"
                </p>
              </div>

              <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-neutral-900">{rev.author}</div>
                  <div className="text-neutral-500">{rev.location}</div>
                </div>
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  시공 인증
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. METRO SERVICE AREAS HIGHLIGHT (서울·수도권 구단위 서비스지역 안내) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-br from-neutral-900 via-neutral-900 to-sky-950 text-white rounded-3xl p-6 sm:p-10 border border-neutral-800 shadow-xl space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-neutral-800 pb-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-400 bg-sky-950/80 border border-sky-800/80 px-3 py-1 rounded-full">
                <MapPin className="h-3.5 w-3.5" />
                <span>출장비 0원 전액 무료 직영 배차</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                서울·수도권 구 단위 전지역 출동 네트워크
              </h2>
              <p className="text-xs sm:text-sm text-neutral-300 max-w-2xl">
                서울 25개 자치구 전체 및 분당·일산·수지·광교·송도 등 수도권 전역에 100% 본사 직영 2인 1조 마스터팀이 상주합니다.
              </p>
            </div>

            <button
              type="button"
              onClick={() => onSelectTab('regions')}
              className="px-4 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-neutral-950 font-bold text-xs transition-colors flex items-center gap-1.5 whitespace-nowrap self-start md:self-end"
            >
              <span>구단위 서비스지역 전체보기</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* Quick cluster highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Seoul */}
            <div className="bg-neutral-950/60 border border-neutral-800 rounded-2xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-sky-400">서울특별시 (25개 구 전체)</span>
                <span className="text-[11px] bg-sky-950 text-sky-300 px-2 py-0.5 rounded border border-sky-800">
                  직영팀 상주
                </span>
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed">
                강남구, 서초구, 송파구, 강동구, 마포구, 용산구, 성동구, 영등포구, 양천구, 동작구, 서대문구, 은평구, 종로구, 중구, 노원구 등 25개 구 전역 30분 내 배차
              </p>
            </div>

            {/* Gyeonggi */}
            <div className="bg-neutral-950/60 border border-neutral-800 rounded-2xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-400">경기도 (구·시 단위 세분화)</span>
                <span className="text-[11px] bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-800">
                  출장비 0원
                </span>
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed">
                성남시 분당·수정·중원구, 수원시 영통·팔달·권선·장안구, 용인시 수지·기흥·처인구, 고양시 일산동·서·덕양구, 부천시, 안양시, 화성시 동탄, 남양주, 하남, 광명, 김포, 파주 전역
              </p>
            </div>

            {/* Incheon */}
            <div className="bg-neutral-950/60 border border-neutral-800 rounded-2xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-400">인천광역시 (주요 구 단위)</span>
                <span className="text-[11px] bg-amber-950 text-amber-300 px-2 py-0.5 rounded border border-amber-800">
                  염분 케어 특화
                </span>
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed">
                연수구 송도국제도시, 서구 청라·검단·루원시티, 남동구 구월·논현, 부평구, 중구 영종국제도시 등 해풍 염분막 박리 및 나노 실리카 코팅 특화
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. FAQ ACCORDION (자주 묻는 질문 5선) */}
      <section className="bg-neutral-100/70 py-16 border-y border-neutral-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 space-y-2">
            <div className="text-xs font-bold text-sky-600 tracking-wider uppercase">궁금증 해결</div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900">
              자주 묻는 질문 (FAQ)
            </h2>
            <p className="text-sm text-neutral-600">
              고객님들이 상담 시 가장 자주 문의하시는 내용을 명쾌하게 답변해 드립니다.
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.slice(0, 5).map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-xs transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-neutral-900 hover:bg-neutral-50"
                  >
                    <span className="flex items-center gap-2.5">
                      <HelpCircle className="h-4 w-4 text-sky-600 shrink-0" />
                      {faq.question}
                    </span>
                    <span className="text-neutral-400 text-lg shrink-0">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-neutral-600 leading-relaxed border-t border-neutral-100">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => onSelectTab('faq')}
              className="text-xs font-semibold text-neutral-600 hover:text-neutral-900 underline underline-offset-4"
            >
              10개 전체 질문 & 답변 보러가기 →
            </button>
          </div>
        </div>
      </section>

      {/* 9. BOTTOM CONVERSION CTA BANNER (하단 CTA) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="rounded-3xl bg-gradient-to-br from-neutral-900 via-neutral-900 to-sky-950 text-white p-8 sm:p-12 lg:p-16 border border-neutral-800 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-sky-500/20 text-sky-300 text-xs px-3 py-1 font-semibold border border-sky-500/30">
              <Sparkles className="h-3.5 w-3.5" />
              지금 신청 시 프리미엄 나노 발수코팅 무상 업그레이드
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
              뿌옇게 가려졌던 우리 집 뷰,<br />
              <span className="text-sky-400">내일 바로 깨끗하게 바꿔보세요</span>
            </h2>

            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
              서울 25개 구 및 수도권 전지역 방문 출장! 사진 1장으로 10분 만에 확정 견적을 받아보실 수 있습니다.
              부담 없이 지금 바로 신청하세요.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={onOpenQuote}
                className="px-6 py-3.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-neutral-950 font-bold text-sm transition-all shadow-lg shadow-sky-900/30 flex items-center gap-2 active:scale-98"
              >
                <span>무료 견적신청하기</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={onOpenKakao}
                className="px-5 py-3.5 rounded-xl bg-[#FEE500] hover:bg-yellow-400 text-neutral-900 font-bold text-sm transition-all flex items-center gap-2"
              >
                <MessageCircle className="h-4 w-4 fill-current" />
                <span>카카오톡 1:1 상담</span>
              </button>
              <a
                href="tel:1588-7241"
                className="px-4 py-3.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-medium text-sm transition-colors border border-neutral-700 flex items-center gap-2"
              >
                <PhoneCall className="h-4 w-4 text-sky-400" />
                <span>1588-7241 전화문의</span>
              </a>
            </div>

            <div className="text-xs text-neutral-400 pt-3 flex flex-wrap items-center gap-4">
              <span>✓ 출장비 일체 없음</span>
              <span>✓ 현장 일방적 추가비용 없음</span>
              <span>✓ 시공 후 7일 A/S 보증</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
