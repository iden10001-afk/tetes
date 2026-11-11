import React from 'react';
import { 
  Building2, 
  Store, 
  Home, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Droplets,
  Layers
} from 'lucide-react';
import { 
  HERO_IMAGE, 
  CRAFTSMAN_IMAGE, 
  STOREFRONT_IMAGE, 
  APARTMENT_IMAGE 
} from '../data/mockData';

interface ServicesViewProps {
  onOpenQuote: () => void;
  onOpenKakao: () => void;
}

export const ServicesView: React.FC<ServicesViewProps> = ({ onOpenQuote, onOpenKakao }) => {
  const services = [
    {
      id: 'apt',
      title: '아파트 외창 + 내창 올인원 프리미엄 케어',
      subtitle: '입주·이사 전후 및 거주 중 도심 조망권 완전 복원',
      image: APARTMENT_IMAGE,
      tag: '가장 많이 찾는 서비스',
      description: '손이 닿지 않아 수년간 방치되었던 고층 아파트 외부창의 석회수 물때와 찌든 매연 유막을 창틀 탈거 없이 실내에서 안전하게 100% 제거합니다. 거실창, 안방창, 작은방창은 물론 난간창과 방충망 먼지 세척까지 한 번에 완료됩니다.',
      specs: [
        '소요 시간: 30평형 기준 약 3~4시간 (2인 1조 직영)',
        '적용 공법: 독일 Unger 초순수 스퀴지 + 유리 전용 산성/중성 2단계 박리',
        '기본 포함: 창틀 하부 레일 먼지 세척, 실내 바닥 3중 방수 보양',
        '무상 혜택: 9H 경도 나노 실리카 발수코팅 (8만원 상당) 기본 적용'
      ]
    },
    {
      id: 'store',
      title: '상가 · 매장 · 카페 쇼윈도 정기 관리',
      subtitle: '매장의 첫인상을 바꾸는 맑고 투명한 유리 쇼룸',
      image: STOREFRONT_IMAGE,
      tag: '소상공인 & 프랜차이즈',
      description: '고객이 매장 안을 들여다보는 쇼윈도는 브랜드의 첫인상입니다. 통행인 손지문, 빗물 얼룩, 테이프 끈적이, 도로 분진을 말끔히 세정하고 물방울이 맺히지 않는 초발수 코팅을 시공합니다.',
      specs: [
        '정기 구독: 월 1회 / 2회 / 4회 맞춤 플랜 (최대 25% 할인)',
        '영업 시간 배려: 오픈 전 새벽 시간대(06:00~) 시공 가능',
        '식품 안전: 식음료 매장용 무취·생분해 친환경 세제 사용',
        '출입문 손잡이 및 도어 힌지 살균 소독 서비스 무상 포함'
      ]
    },
    {
      id: 'building',
      title: '주상복합 · 오피스 · 사옥 대형 통유리 케어',
      subtitle: '개폐 불가능한 시스템 창호 및 대형 보이드 유리 전문',
      image: HERO_IMAGE,
      tag: '고난도 특수 시공',
      description: '창문이 전혀 열리지 않거나 층고가 4m 이상인 고급 주상복합, 테라스 하우스, 기업 사옥 로비 유리창을 특수 카본 텔레스코픽 폴 시스템과 자석 양면 마그네틱 클리너로 안전하고 완벽하게 시공합니다.',
      specs: [
        '최대 작업 높이: 지상 15m까지 사다리차 없이 실내/지상 작업 가능',
        '안전 인증: 로프 및 고소작업 전문 자격 보유 마스터 배정',
        '보험 가입: 현대해상 1억원 영업배상책임보험 100% 적용',
        '시공 확인서 및 세금계산서 정식 발행'
      ]
    },
    {
      id: 'coating',
      title: '프리미엄 나노 실리카 발수코팅 & 유막 박리',
      subtitle: '비가 와도 깨끗함이 유지되는 6개월 시야 보증',
      image: CRAFTSMAN_IMAGE,
      tag: '특허 코팅 기술',
      description: '깨끗하게 닦은 유리 표면에 나노 입자 실리카 코팅제를 도포하여 초친수-발수 보호막을 형성합니다. 비가 내리면 빗물이 먼지를 머금고 굴러떨어져 스스로 정화되는 셀프 클리닝 효과를 냅니다.',
      specs: [
        '보호 효과: 미세먼지 점착 방지, 결로 현상 완화, 산성비 보호',
        '지속 기간: 시공 후 평균 6개월~1년 이상 효과 지속',
        '스크래치 방지: 연필경도 9H급 표면 미세 보호막 형성',
        '모든 전체 시공 고객 대상 무상 프로모션 진행 중'
      ]
    }
  ];

  return (
    <div className="space-y-16 lg:space-y-24 py-6">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-700 bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
            <span>클리어웍스 전문 케어 서비스</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
            공간의 품격을 높이는 유리창청소 서비스 안내
          </h1>
          <p className="text-base sm:text-lg text-neutral-600 leading-relaxed">
            아파트 거실창부터 매장 쇼윈도, 주상복합 시스템창호까지—현장 환경에 최적화된 전문 장비와 기술력으로 완벽한 시야를 완성합니다.
          </p>
        </div>
      </section>

      {/* Services List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        {services.map((svc, idx) => (
          <div
            key={svc.id}
            className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-xs ${
              idx % 2 === 1 ? 'lg:flex-row-reverse' : ''
            }`}
          >
            {/* Visual */}
            <div className={`lg:col-span-5 ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
              <div className="rounded-2xl overflow-hidden border border-neutral-200 shadow-md relative group">
                <img
                  src={svc.image}
                  alt={svc.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-[320px] object-cover group-hover:scale-103 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 bg-neutral-900/80 text-white text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-xs">
                  {svc.tag}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className={`lg:col-span-7 space-y-4 ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
              <div className="space-y-1">
                <div className="text-xs font-bold text-sky-600 uppercase tracking-wider">{svc.subtitle}</div>
                <h2 className="text-2xl font-extrabold text-neutral-900">{svc.title}</h2>
              </div>

              <p className="text-sm text-neutral-600 leading-relaxed">
                {svc.description}
              </p>

              <div className="bg-neutral-50 rounded-xl p-4 border border-neutral-200 space-y-2">
                <div className="text-xs font-bold text-neutral-800">핵심 시공 스펙 & 특장점</div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-600">
                  {svc.specs.map((spec, sIdx) => (
                    <li key={sIdx} className="flex items-start gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-sky-600 shrink-0 mt-0.5" />
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={onOpenQuote}
                  className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
                >
                  <span>이 서비스 무료 견적받기</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={onOpenKakao}
                  className="px-4 py-2.5 rounded-xl bg-[#FEE500] hover:bg-yellow-400 text-neutral-900 text-xs font-bold transition-colors"
                >
                  카카오톡 문의
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Equipment Showcase */}
      <section className="bg-neutral-900 text-white py-16 border-y border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <div className="text-xs font-bold text-sky-400 tracking-wider uppercase">전문 장비 시스템</div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              유리창 전용 독일 최고급 하이테크 장비
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400">
              유리의 투명도를 좌우하는 것은 작업자의 기술과 정밀 장비의 조화입니다.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-neutral-800 border border-neutral-700 space-y-2">
              <div className="font-bold text-base text-white">0 TDS 순수 정수 필터 (RO/DI)</div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                수돗물에 녹아 있는 칼슘, 마그네슘, 철분 등 광물질을 100% 여과하여 건조 시 물자국(워터스팟)이 절대 생기지 않습니다.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-neutral-800 border border-neutral-700 space-y-2">
              <div className="font-bold text-base text-white">독일 Unger 에르고텍 스퀴지</div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                천연 라텍스 고무 블레이드로 유리 표면에 흠집을 주지 않으면서 미세 수분과 오염물을 100% 압축 흡착하여 닦아냅니다.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-neutral-800 border border-neutral-700 space-y-2">
              <div className="font-bold text-base text-white">초경량 카본 텔레스코픽 폴</div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                최고 등급 카본 소재로 제작되어 15m 고소 작업 시에도 흔들림 없이 균일한 압력으로 안전하게 유리창을 세정합니다.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
