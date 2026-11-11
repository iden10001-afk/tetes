import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Calendar, 
  MapPin, 
  PhoneCall, 
  Clock, 
  CheckCircle2, 
  Sparkles,
  FileText,
  MessageCircle,
  HelpCircle
} from 'lucide-react';
import { QuoteRequest } from '../types';
import { METRO_REGIONS } from '../data/mockData';

interface BookingViewProps {
  onSubmitQuote: (quote: QuoteRequest) => void;
  onOpenKakao: () => void;
  prefillData?: {
    serviceType?: 'apartment' | 'commercial' | 'building' | 'house';
    sizeInfo?: string;
    estimatedCost?: number;
    isExteriorIncluded?: boolean;
  };
}

export const BookingView: React.FC<BookingViewProps> = ({
  onSubmitQuote,
  onOpenKakao,
  prefillData
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [serviceType, setServiceType] = useState<'apartment' | 'commercial' | 'building' | 'house'>(
    prefillData?.serviceType || 'apartment'
  );
  const [regionDistrict, setRegionDistrict] = useState(METRO_REGIONS[0]);
  const [detailAddress, setDetailAddress] = useState('');
  const [sizeInfo, setSizeInfo] = useState(prefillData?.sizeInfo || '34평형');
  const [preferredDate, setPreferredDate] = useState('');
  const [isExteriorIncluded, setIsExteriorIncluded] = useState(prefillData?.isExteriorIncluded ?? true);
  const [notes, setNotes] = useState('');
  const [agreePrivacy, setAgreePrivacy] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedId, setSubmittedId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      alert('성함과 연락처를 입력해 주세요.');
      return;
    }
    if (!agreePrivacy) {
      alert('개인정보 수집 및 이용에 동의해 주세요.');
      return;
    }

    const newId = `Q-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(100 + Math.random() * 900)}`;
    const cost = prefillData?.estimatedCost || (serviceType === 'apartment' ? 280000 : 180000);

    const newQuote: QuoteRequest = {
      id: newId,
      createdAt: new Date().toLocaleString('ko-KR', { hour12: false }),
      name,
      phone,
      serviceType,
      regionDistrict,
      detailAddress,
      sizeInfo,
      preferredDate: preferredDate || '상담 시 협의',
      isExteriorIncluded,
      notes,
      status: '접수완료',
      estimatedCost: cost
    };

    onSubmitQuote(newQuote);
    setSubmittedId(newId);
    setIsSubmitted(true);
  };

  return (
    <div className="space-y-16 lg:space-y-20 py-6 max-w-7xl mx-auto px-4 sm:px-6">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-700 bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
          <span>서울·수도권 전지역 무료 출장 견적</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
          클리어웍스 예약 및 견적문의
        </h1>
        <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
          간단한 정보 입력으로 10분 내에 전담 팀장의 100% 확정 견적과 방문 일정을 안내해 드립니다.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Side: Guarantees & Step Guidance */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-neutral-900 text-white rounded-3xl p-6 sm:p-8 space-y-5 border border-neutral-800">
            <h2 className="text-xl font-bold">클리어웍스 3대 안심 예약 보증</h2>
            
            <div className="space-y-4 text-xs text-neutral-300">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-4 w-4 text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white text-sm">1. 현장 추가금 0원 보증</div>
                  <p className="mt-0.5 text-neutral-400">사전 확정 견적 외에 현장 방문 후 부당한 추가금을 청구하지 않습니다.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-4 w-4 text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white text-sm">2. 현대해상 1억원 배상보험</div>
                  <p className="mt-0.5 text-neutral-400">시공 중 만약의 창호 기물 훼손에 대해 100% 신속 보상 체계를 운영합니다.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-4 w-4 text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white text-sm">3. 시공 후 7일 A/S 무상 보증</div>
                  <p className="mt-0.5 text-neutral-400">시공 후 미흡한 점이 발견되면 7일 내 무상 방문 리터치를 보장합니다.</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-800">
              <div className="text-xs text-neutral-400">전화로 바로 예약하시겠어요?</div>
              <a
                href="tel:1588-7241"
                className="mt-1 flex items-center gap-2 text-xl font-black text-white hover:text-sky-300 transition-colors"
              >
                <PhoneCall className="h-5 w-5 text-sky-400" />
                1588-7241
              </a>
              <p className="text-[11px] text-neutral-500 mt-0.5">평일·주말 08:00 - 20:00 (연중무휴)</p>
            </div>
          </div>

          <div className="bg-sky-50 rounded-2xl p-6 border border-sky-100 space-y-3">
            <div className="flex items-center gap-2 font-bold text-sm text-sky-900">
              <Sparkles className="h-4 w-4 text-sky-600" />
              이달의 온라인 예약 무상 특전
            </div>
            <ul className="text-xs text-sky-800 space-y-1.5">
              <li>• 프리미엄 나노 실리카 발수코팅 (소비자가 8만원) 무상 시공</li>
              <li>• 창틀 하부 레일 먼지 세척 및 살균 소독 무료</li>
              <li>• 방충망 프레임 외부 미세먼지 브러싱 케어 무료</li>
            </ul>
          </div>
        </div>

        {/* Right Side: Quote Form */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-sm">
            {isSubmitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <CheckCircle2 className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-bold text-neutral-900">견적 신청이 완료되었습니다!</h3>
                <p className="text-sm text-neutral-600 max-w-md mx-auto leading-relaxed">
                  접수번호: <strong className="text-sky-700">{submittedId}</strong><br />
                  남겨주신 번호로 전문 마스터 팀장이 10분 내로 연락드려 맞춤 견적과 일정을 최종 확정해 드립니다.
                </p>
                <div className="pt-4 flex justify-center gap-3">
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="px-6 py-2.5 rounded-xl bg-neutral-900 text-white text-xs font-bold hover:bg-neutral-800 transition-colors"
                  >
                    새 견적 추가 신청
                  </button>
                  <button
                    onClick={onOpenKakao}
                    className="px-5 py-2.5 rounded-xl bg-[#FEE500] text-neutral-900 text-xs font-bold hover:bg-yellow-400 transition-colors"
                  >
                    카카오톡으로 대화하기
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h2 className="text-xl font-bold text-neutral-900">견적 신청 정보 입력</h2>

                {/* Service Type Selection */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-2">
                    1. 서비스 유형 선택 <span className="text-rose-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'apartment', label: '아파트·빌라' },
                      { id: 'commercial', label: '상가·쇼윈도' },
                      { id: 'building', label: '오피스·빌딩' },
                      { id: 'house', label: '단독·타운하우스' }
                    ].map((type) => (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => setServiceType(type.id as any)}
                        className={`py-2.5 px-3 rounded-xl border text-xs font-semibold transition-all ${
                          serviceType === type.id
                            ? 'border-sky-600 bg-sky-50 text-sky-900 shadow-2xs ring-1 ring-sky-500'
                            : 'border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50'
                        }`}
                      >
                        {type.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                      신청자 성함 / 상호명 <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="예: 홍길동"
                      className="w-full rounded-xl border border-neutral-300 px-3.5 py-2.5 text-sm focus:border-neutral-900 focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                      연락처 (휴대폰) <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="예: 010-1234-5678"
                      className="w-full rounded-xl border border-neutral-300 px-3.5 py-2.5 text-sm focus:border-neutral-900 focus:outline-hidden"
                    />
                  </div>
                </div>

                {/* Region & Detail Address */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                      시·구 지역 <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={regionDistrict}
                      onChange={(e) => setRegionDistrict(e.target.value)}
                      className="w-full rounded-xl border border-neutral-300 px-3 py-2.5 text-sm focus:border-neutral-900 focus:outline-hidden bg-white"
                    >
                      {METRO_REGIONS.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                      아파트명 / 상세 위치
                    </label>
                    <input
                      type="text"
                      value={detailAddress}
                      onChange={(e) => setDetailAddress(e.target.value)}
                      placeholder="예: 래미안 원베일리 108동"
                      className="w-full rounded-xl border border-neutral-300 px-3.5 py-2.5 text-sm focus:border-neutral-900 focus:outline-hidden"
                    />
                  </div>
                </div>

                {/* Size & Preferred Date */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                      평형대 또는 면적 <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={sizeInfo}
                      onChange={(e) => setSizeInfo(e.target.value)}
                      placeholder="예: 34평형, 전면 15m"
                      className="w-full rounded-xl border border-neutral-300 px-3.5 py-2.5 text-sm focus:border-neutral-900 focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                      희망 시공 일자
                    </label>
                    <input
                      type="date"
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="w-full rounded-xl border border-neutral-300 px-3.5 py-2.5 text-sm focus:border-neutral-900 focus:outline-hidden bg-white"
                    />
                  </div>
                </div>

                {/* Exterior Option */}
                <div>
                  <label className="flex items-center gap-2.5 cursor-pointer p-3 rounded-xl bg-neutral-50 border border-neutral-200">
                    <input
                      type="checkbox"
                      checked={isExteriorIncluded}
                      onChange={(e) => setIsExteriorIncluded(e.target.checked)}
                      className="h-4 w-4 rounded text-sky-600 focus:ring-sky-500"
                    />
                    <span className="text-xs font-medium text-neutral-800">
                      외부창 전면 세정 포함 (비 온 뒤 흙먼지·석회 자국 완전 제거 권장)
                    </span>
                  </label>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                    문의 내용 및 특이사항
                  </label>
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="오염 상태나 시공 시 특별히 신경 써주셨으면 하는 점(예: 입주 전 청소, 난간대 물때 심함 등)을 적어주세요."
                    className="w-full rounded-xl border border-neutral-300 px-3.5 py-2.5 text-sm focus:border-neutral-900 focus:outline-hidden resize-none"
                  />
                </div>

                {/* Privacy Agreement (Explicitly required by prompt) */}
                <div className="pt-2 border-t border-neutral-200">
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={agreePrivacy}
                      onChange={(e) => setAgreePrivacy(e.target.checked)}
                      className="mt-0.5 h-4 w-4 rounded text-sky-600 focus:ring-sky-500"
                    />
                    <div className="text-xs text-neutral-600">
                      <span className="font-semibold text-neutral-800">[필수] 개인정보 수집 및 이용 동의</span>
                      <p className="text-[11px] text-neutral-500 mt-0.5 leading-relaxed">
                        수집 항목: 성함/상호명, 연락처, 주소, 평형 정보 | 수집 목적: 맞춤 견적 산출 및 방문 일정 안내 | 보유 기간: 상담 및 시공 완료 후 3개월.<br />
                        <strong>* 수집된 개인정보는 상담 목적 외에는 일체 사용되지 않으며 암호화되어 안전하게 보관됩니다.</strong>
                      </p>
                    </div>
                  </label>
                </div>

                {/* Submit CTA */}
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2 active:scale-98"
                >
                  <FileText className="h-4 w-4" />
                  <span>100% 무료 견적신청 완료</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
