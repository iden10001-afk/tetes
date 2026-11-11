import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, PhoneCall, Sparkles } from 'lucide-react';
import { QuoteRequest } from '../types';
import { METRO_REGIONS } from '../data/mockData';

interface QuickQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitQuote: (quote: QuoteRequest) => void;
  initialData?: {
    serviceType?: 'apartment' | 'commercial' | 'building' | 'house';
    regionDistrict?: string;
    sizeInfo?: string;
    estimatedCost?: number;
    isExteriorIncluded?: boolean;
  };
}

export const QuickQuoteModal: React.FC<QuickQuoteModalProps> = ({
  isOpen,
  onClose,
  onSubmitQuote,
  initialData
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [serviceType, setServiceType] = useState<'apartment' | 'commercial' | 'building' | 'house'>(
    initialData?.serviceType || 'apartment'
  );
  const [regionDistrict, setRegionDistrict] = useState(initialData?.regionDistrict || METRO_REGIONS[0]);
  const [detailAddress, setDetailAddress] = useState('');
  const [sizeInfo, setSizeInfo] = useState(initialData?.sizeInfo || '34평형');
  const [preferredDate, setPreferredDate] = useState('');
  const [isExteriorIncluded, setIsExteriorIncluded] = useState(initialData?.isExteriorIncluded ?? true);
  const [notes, setNotes] = useState('');
  const [agreePrivacy, setAgreePrivacy] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedId, setSubmittedId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  React.useEffect(() => {
    if (initialData?.regionDistrict) {
      setRegionDistrict(initialData.regionDistrict);
    }
    if (initialData?.serviceType) {
      setServiceType(initialData.serviceType);
    }
    if (initialData?.sizeInfo) {
      setSizeInfo(initialData.sizeInfo);
    }
    if (initialData?.isExteriorIncluded !== undefined) {
      setIsExteriorIncluded(initialData.isExteriorIncluded);
    }
    setErrorMessage('');
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setErrorMessage('이름과 연락처를 입력해 주세요.');
      return;
    }
    if (!agreePrivacy) {
      setErrorMessage('개인정보 수집 및 이용에 동의해 주세요.');
      return;
    }
    setErrorMessage('');

    const newId = `Q-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(10 + Math.random() * 90)}`;
    const cost = initialData?.estimatedCost || (serviceType === 'apartment' ? 280000 : 180000);

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
    setIsSuccess(true);
  };

  const handleReset = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="bg-sky-600 text-white px-6 py-4 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold">클리어웍스 무료 견적 및 상담 신청</h3>
            <p className="text-xs text-sky-100">10분 내로 전문 상담 팀장이 신속하게 연락드립니다</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-white/80 hover:bg-white/20 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {isSuccess ? (
            <div className="py-8 text-center space-y-4">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <CheckCircle2 className="h-10 w-10" />
              </div>
              <h4 className="text-xl font-bold text-neutral-900">무료 견적 신청이 완료되었습니다!</h4>
              <p className="text-sm text-neutral-600 max-w-sm mx-auto leading-relaxed">
                접수번호: <strong className="text-sky-700">{submittedId}</strong>
                <br />
                남겨주신 번호로 담당 마스터가 10분 내로 연락드려 맞춤 견적과 일정을 확정해 드립니다.
              </p>
              <div className="p-4 rounded-xl bg-neutral-50 text-xs text-neutral-500 max-w-md mx-auto">
                급한 문의나 당일 일정은 대표번호 <strong>1588-7241</strong>로 전화 주시면 즉시 연결됩니다.
              </div>
              <button
                type="button"
                onClick={handleReset}
                className="w-full py-3 rounded-xl bg-neutral-900 text-white font-semibold text-sm hover:bg-neutral-800 transition-colors"
              >
                확인
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMessage && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl font-medium">
                  {errorMessage}
                </div>
              )}
              {/* Service Type */}
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  신청 서비스 유형 <span className="text-rose-500">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'apartment', label: '아파트·빌라' },
                    { id: 'commercial', label: '상가·쇼윈도' },
                    { id: 'building', label: '오피스·빌딩' },
                    { id: 'house', label: '단독·타운' }
                  ].map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setServiceType(type.id as any)}
                      className={`py-2 px-3 text-xs font-medium rounded-lg border text-center transition-all ${
                        serviceType === type.id
                          ? 'border-sky-600 bg-sky-50 text-sky-900 font-semibold'
                          : 'border-neutral-200 text-neutral-600 hover:bg-neutral-50'
                      }`}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    신청자 성함 / 상호명 <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="예: 홍길동"
                    className="w-full rounded-xl border border-neutral-300 px-3.5 py-2.5 text-sm focus:border-sky-600 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    연락처 (휴대폰) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="예: 010-1234-5678"
                    className="w-full rounded-xl border border-neutral-300 px-3.5 py-2.5 text-sm focus:border-sky-600 focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Region & Detail Address */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    시·구 지역 선택 <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={regionDistrict}
                    onChange={(e) => setRegionDistrict(e.target.value)}
                    className="w-full rounded-xl border border-neutral-300 px-3 py-2.5 text-sm focus:border-sky-600 focus:outline-hidden bg-white"
                  >
                    {METRO_REGIONS.map((region) => (
                      <option key={region} value={region}>
                        {region}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    아파트명 / 세부 위치
                  </label>
                  <input
                    type="text"
                    value={detailAddress}
                    onChange={(e) => setDetailAddress(e.target.value)}
                    placeholder="예: 반포자이 103동"
                    className="w-full rounded-xl border border-neutral-300 px-3.5 py-2.5 text-sm focus:border-sky-600 focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Size & Preferred Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    평형대 또는 면적 <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={sizeInfo}
                    onChange={(e) => setSizeInfo(e.target.value)}
                    placeholder="예: 34평형, 전면 15m"
                    className="w-full rounded-xl border border-neutral-300 px-3.5 py-2.5 text-sm focus:border-sky-600 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    희망 시공 일자
                  </label>
                  <input
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full rounded-xl border border-neutral-300 px-3.5 py-2.5 text-sm focus:border-sky-600 focus:outline-hidden bg-white"
                  />
                </div>
              </div>

              {/* Exterior Option */}
              <div className="pt-1">
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isExteriorIncluded}
                    onChange={(e) => setIsExteriorIncluded(e.target.checked)}
                    className="h-4 w-4 rounded text-sky-600 focus:ring-sky-500"
                  />
                  <span className="text-xs font-medium text-neutral-800">
                    외부창 물때 및 유막제거 포함 (추천: 내창+외창 전면 케어)
                  </span>
                </label>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  문의 사항 및 창문 특이사항
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="예: 난간창 유막이 심합니다. 이사 전 청소 희망합니다."
                  className="w-full rounded-xl border border-neutral-300 px-3.5 py-2 text-sm focus:border-sky-600 focus:outline-hidden resize-none"
                />
              </div>

              {/* Promotion Banner */}
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-amber-600 shrink-0" />
                <span>
                  <strong>이달의 혜택:</strong> 신청 고객 전원 나노 발수코팅 & 창틀 레일 살균 무상 제공
                </span>
              </div>

              {/* Privacy consent (Mandatory) */}
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
                    <p className="text-[11px] text-neutral-500 mt-0.5">
                      수집 항목: 성함, 연락처, 주소 | 수집 목적: 견적 산출 및 방문 일정 상담 | 보유 기간: 상담 완료 후 3개월 (상담 목적 외에는 일체 사용되지 않습니다).
                    </p>
                  </div>
                </label>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm transition-all shadow-sm flex items-center justify-center gap-2 active:scale-98"
                >
                  <PhoneCall className="h-4 w-4" />
                  <span>100% 무료 견적신청 완료하기</span>
                </button>
              </div>

              <div className="flex items-center justify-center gap-4 text-[11px] text-neutral-400 pt-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="h-3 w-3 text-emerald-600" />
                  영업배상책임보험 1억원 가입
                </span>
                <span>·</span>
                <span>정찰제 투명 견적</span>
                <span>·</span>
                <span>무료 취소 가능</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
