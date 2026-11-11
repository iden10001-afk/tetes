import React from 'react';
import { 
  CheckCircle2, 
  HelpCircle, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight,
  PhoneCall,
  MessageCircle,
  FileText
} from 'lucide-react';
import { PRICING_PLANS } from '../data/mockData';
import { InstantEstimator } from '../components/InstantEstimator';

interface PricingViewProps {
  onOpenQuote: () => void;
  onOpenKakao: () => void;
  onApplyEstimate: (data: any) => void;
}

export const PricingView: React.FC<PricingViewProps> = ({
  onOpenQuote,
  onOpenKakao,
  onApplyEstimate
}) => {
  return (
    <div className="space-y-16 lg:space-y-24 py-6">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-700 bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
            <span>100% 정찰제 · 투명 견적 보장</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
            클리어웍스 표준 가격 및 비용 안내
          </h1>
          <p className="text-base sm:text-lg text-neutral-600 leading-relaxed">
            현장 방문 후 일방적인 추가비용을 요구하지 않습니다.<br />
            정직한 평형별 표준 정찰가로 프리미엄 유리창청소 서비스를 경험하세요.
          </p>
        </div>
      </section>

      {/* Pricing Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRICING_PLANS.map((plan, idx) => (
            <div
              key={idx}
              className={`rounded-2xl p-6 border flex flex-col justify-between relative transition-all ${
                plan.isPopular
                  ? 'border-sky-600 bg-white shadow-md ring-2 ring-sky-500/20'
                  : 'border-neutral-200 bg-white shadow-xs hover:border-neutral-300'
              }`}
            >
              {plan.isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-sky-600 text-white text-[11px] font-bold px-3 py-0.5 rounded-full shadow-xs">
                  가장 많이 선택
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <div className="text-xs font-bold text-neutral-500 uppercase">{plan.type}</div>
                  <h3 className="text-lg font-bold text-neutral-900 mt-1">{plan.target}</h3>
                </div>

                <div className="pt-2 pb-1 border-y border-neutral-100">
                  <div className="text-xs text-neutral-400">표준 시공가 (외창+내창)</div>
                  <div className="text-2xl font-black text-neutral-900 font-mono tracking-tight mt-0.5">
                    {plan.price}
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <div className="text-xs font-bold text-neutral-700">기본 포함 항목:</div>
                  <ul className="space-y-2 text-xs text-neutral-600">
                    {plan.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-1.5">
                        <CheckCircle2 className="h-3.5 w-3.5 text-sky-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={onOpenQuote}
                  className={`w-full py-2.5 rounded-xl font-bold text-xs transition-colors text-center ${
                    plan.isPopular
                      ? 'bg-sky-600 hover:bg-sky-500 text-white shadow-xs'
                      : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-800'
                  }`}
                >
                  이 평형 견적신청
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Estimator Calculator */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
          <div className="text-xs font-bold text-sky-600 tracking-wider uppercase">실시간 맞춤 산출</div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900">
            30초 실시간 견적 계산기
          </h2>
          <p className="text-sm text-neutral-600">
            옵션을 클릭하여 예상 비용을 확인하고 바로 상담을 예약해 보세요.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <InstantEstimator onApplyEstimate={onApplyEstimate} />
        </div>
      </section>

      {/* Transparency Guarantee & FAQs on pricing */}
      <section className="bg-neutral-100 py-16 border-y border-neutral-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-neutral-900">비용 관련 투명성 보장 수칙</h2>
            <p className="text-xs sm:text-sm text-neutral-600">고객 신뢰를 최우선으로 생각합니다.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-neutral-200 space-y-2">
              <div className="flex items-center gap-2 font-bold text-sm text-neutral-900">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                현장 추가금 요구 일체 금지
              </div>
              <p className="text-xs text-neutral-600 leading-relaxed">
                사전 안내된 기준 금액 외에 작업자가 현장에서 임의로 추가 비용을 청구하는 행위를 엄격히 금지합니다.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-neutral-200 space-y-2">
              <div className="flex items-center gap-2 font-bold text-sm text-neutral-900">
                <Sparkles className="h-4 w-4 text-sky-600" />
                발수코팅 무상 업그레이드
              </div>
              <p className="text-xs text-neutral-600 leading-relaxed">
                타사에서 8~10만원가량 별도 옵션으로 받는 나노 실리카 발수코팅을 기본 무료 제공합니다.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-neutral-200 space-y-2">
              <div className="flex items-center gap-2 font-bold text-sm text-neutral-900">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                창틀 레일 세척 기본 포함
              </div>
              <p className="text-xs text-neutral-600 leading-relaxed">
                유리창뿐만 아니라 창틀 하부에 쌓인 흙먼지와 물때까지 전용 고압 스팀 및 브러시로 무상 청소합니다.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-neutral-200 space-y-2">
              <div className="flex items-center gap-2 font-bold text-sm text-neutral-900">
                <HelpCircle className="h-4 w-4 text-sky-600" />
                정기 구독 시 최대 25% 할인
              </div>
              <p className="text-xs text-neutral-600 leading-relaxed">
                카페, 베이커리, 플래그십 매장 등 정기 케어를 원하시는 상가 고객님께 정기구독 할인율을 적용합니다.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
