import React, { useState, useMemo } from 'react';
import { Calculator, ArrowRight, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';

interface InstantEstimatorProps {
  onApplyEstimate: (data: {
    serviceType: 'apartment' | 'commercial' | 'building' | 'house';
    sizeInfo: string;
    estimatedCost: number;
    isExteriorIncluded: boolean;
  }) => void;
}

export const InstantEstimator: React.FC<InstantEstimatorProps> = ({ onApplyEstimate }) => {
  const [propertyType, setPropertyType] = useState<'apartment' | 'commercial' | 'house'>('apartment');
  const [aptPyeong, setAptPyeong] = useState<'20s' | '30s' | '40s' | '50s'>('30s');
  const [commercialWidth, setCommercialWidth] = useState<'small' | 'medium' | 'large'>('medium');
  const [isExterior, setIsExterior] = useState(true);
  const [includeScreenWash, setIncludeScreenWash] = useState(true);

  const calculated = useMemo(() => {
    let base = 0;
    let sizeLabel = '';

    if (propertyType === 'apartment') {
      switch (aptPyeong) {
        case '20s':
          base = 220000;
          sizeLabel = '20평형대 (전용 59㎡ 내외)';
          break;
        case '30s':
          base = 280000;
          sizeLabel = '30평형대 (전용 84㎡ 내외)';
          break;
        case '40s':
          base = 380000;
          sizeLabel = '40평형대 (전용 101~135㎡)';
          break;
        case '50s':
          base = 480000;
          sizeLabel = '50평형 이상 대형 평형';
          break;
      }
      if (!isExterior) {
        base = Math.round(base * 0.6); // 내창만 진행 시
      }
      if (includeScreenWash) {
        base += 20000; // 방충망 클리닝
      }
    } else if (propertyType === 'commercial') {
      switch (commercialWidth) {
        case 'small':
          base = 120000;
          sizeLabel = '쇼윈도 가로 10m 이하';
          break;
        case 'medium':
          base = 180000;
          sizeLabel = '쇼윈도 가로 10m~20m';
          break;
        case 'large':
          base = 280000;
          sizeLabel = '쇼윈도 가로 20m 이상 또는 2개층';
          break;
      }
    } else {
      // 주택
      base = 320000;
      sizeLabel = '단독주택·타운하우스 (2층 기준)';
    }

    return {
      price: base,
      sizeLabel,
      typeLabel: propertyType === 'apartment' ? '아파트' : propertyType === 'commercial' ? '상가' : '주택'
    };
  }, [propertyType, aptPyeong, commercialWidth, isExterior, includeScreenWash]);

  const handleApply = () => {
    onApplyEstimate({
      serviceType: propertyType,
      sizeInfo: calculated.sizeLabel,
      estimatedCost: calculated.price,
      isExteriorIncluded: isExterior
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-6 lg:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
          <Calculator className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-neutral-900">30초 실시간 예상 견적 계산기</h3>
          <p className="text-sm text-neutral-500">정찰제 기준 투명한 예상 비용을 즉시 확인하세요</p>
        </div>
      </div>

      {/* 1. Property Type Selector */}
      <div className="mb-6">
        <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-2">
          1. 거주 및 건물 형태 선택
        </label>
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => setPropertyType('apartment')}
            className={`py-3 px-4 rounded-xl text-sm font-semibold border transition-all text-center ${
              propertyType === 'apartment'
                ? 'border-sky-600 bg-sky-50/70 text-sky-900 shadow-xs'
                : 'border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50'
            }`}
          >
            아파트·주상복합
          </button>
          <button
            type="button"
            onClick={() => setPropertyType('commercial')}
            className={`py-3 px-4 rounded-xl text-sm font-semibold border transition-all text-center ${
              propertyType === 'commercial'
                ? 'border-sky-600 bg-sky-50/70 text-sky-900 shadow-xs'
                : 'border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50'
            }`}
          >
            상가·카페 쇼윈도
          </button>
          <button
            type="button"
            onClick={() => setPropertyType('house')}
            className={`py-3 px-4 rounded-xl text-sm font-semibold border transition-all text-center ${
              propertyType === 'house'
                ? 'border-sky-600 bg-sky-50/70 text-sky-900 shadow-xs'
                : 'border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50'
            }`}
          >
            단독·타운하우스
          </button>
        </div>
      </div>

      {/* 2. Size / Sub Options */}
      {propertyType === 'apartment' && (
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-2">
              2. 공급 평형대 선택
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { key: '20s', label: '20평형대', sub: '20~29평' },
                { key: '30s', label: '30평형대', sub: '30~39평 (인기)' },
                { key: '40s', label: '40평형대', sub: '40~49평' },
                { key: '50s', label: '50평형 이상', sub: '50평~대형' }
              ].map((item) => (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => setAptPyeong(item.key as any)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    aptPyeong === item.key
                      ? 'border-sky-600 bg-sky-50/60 text-sky-900 ring-1 ring-sky-500'
                      : 'border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50'
                  }`}
                >
                  <div className="font-semibold text-sm">{item.label}</div>
                  <div className="text-xs text-neutral-400 mt-0.5">{item.sub}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <label className="flex items-center gap-3 p-3 rounded-xl border border-neutral-200 bg-neutral-50/50 cursor-pointer hover:bg-neutral-50">
              <input
                type="checkbox"
                checked={isExterior}
                onChange={(e) => setIsExterior(e.target.checked)}
                className="h-4 w-4 rounded text-sky-600 focus:ring-sky-500"
              />
              <div className="text-xs">
                <span className="font-semibold text-neutral-800">외부창 청소 포함</span>
                <p className="text-neutral-500">외측 묵은 때·석회수 완전 제거 (강력추천)</p>
              </div>
            </label>
            <label className="flex items-center gap-3 p-3 rounded-xl border border-neutral-200 bg-neutral-50/50 cursor-pointer hover:bg-neutral-50">
              <input
                type="checkbox"
                checked={includeScreenWash}
                onChange={(e) => setIncludeScreenWash(e.target.checked)}
                className="h-4 w-4 rounded text-sky-600 focus:ring-sky-500"
              />
              <div className="text-xs">
                <span className="font-semibold text-neutral-800">방충망 먼지 세척 (+2만)</span>
                <p className="text-neutral-500">환기 시 실내 유입되는 미세먼지 차단</p>
              </div>
            </label>
          </div>
        </div>
      )}

      {propertyType === 'commercial' && (
        <div className="mb-6">
          <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-2">
            2. 매장 쇼윈도 전면 길이 선택
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { key: 'small', label: '10m 이하', sub: '일반 소형 매장' },
              { key: 'medium', label: '10~20m', sub: '중형 카페·쇼룸' },
              { key: 'large', label: '20m 이상/복층', sub: '대형 매장·플래그십' }
            ].map((item) => (
              <button
                key={item.key}
                type="button"
                onClick={() => setCommercialWidth(item.key as any)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  commercialWidth === item.key
                    ? 'border-sky-600 bg-sky-50/60 text-sky-900 ring-1 ring-sky-500'
                    : 'border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50'
                }`}
              >
                <div className="font-semibold text-sm">{item.label}</div>
                <div className="text-xs text-neutral-400 mt-0.5">{item.sub}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {propertyType === 'house' && (
        <div className="mb-6 p-4 rounded-xl bg-neutral-50 text-xs text-neutral-600 space-y-1">
          <p className="font-semibold text-neutral-800">단독주택 및 타운하우스 표준 시공 안내</p>
          <p>• 1~2층 전면 창호 및 테라스 난간창이 기본 포함된 기준 견적입니다.</p>
          <p>• 층고 5m 이상의 보이드창이나 특수 삼각창은 현장 사진 확인 후 맞춤 안내해 드립니다.</p>
        </div>
      )}

      {/* Free Included Perks */}
      <div className="p-3.5 rounded-xl bg-sky-50/60 border border-sky-100 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-sky-800 mb-6">
        <span className="flex items-center gap-1 font-semibold">
          <Sparkles className="h-3.5 w-3.5 text-sky-600" />
          이벤트 무상 혜택:
        </span>
        <span className="flex items-center gap-1">
          <CheckCircle2 className="h-3 w-3 text-emerald-600" />
          창틀 하부 레일 무상 살균
        </span>
        <span className="flex items-center gap-1">
          <CheckCircle2 className="h-3 w-3 text-emerald-600" />
          나노 실리카 발수코팅 (8만원 상당)
        </span>
        <span className="flex items-center gap-1">
          <CheckCircle2 className="h-3 w-3 text-emerald-600" />
          7일 A/S 책임보증
        </span>
      </div>

      {/* Result Display & CTA */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-4 border-t border-neutral-100">
        <div>
          <div className="text-xs text-neutral-400">예상 시공 비용 (부가세 별도)</div>
          <div className="text-3xl font-extrabold text-neutral-900 tracking-tight">
            약 {calculated.price.toLocaleString()}
            <span className="text-base font-normal text-neutral-600 ml-1">원</span>
          </div>
          <div className="text-xs text-emerald-700 mt-0.5 flex items-center gap-1">
            <ShieldCheck className="h-3.5 w-3.5" />
            현장 방문 시 일방적인 추가비용 없음
          </div>
        </div>

        <button
          type="button"
          onClick={handleApply}
          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-sm transition-all shadow-sm hover:shadow active:scale-98 whitespace-nowrap"
        >
          <span>이 조건으로 무료견적 예약</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
