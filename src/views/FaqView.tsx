import React, { useState } from 'react';
import { HelpCircle, Search, MessageCircle, PhoneCall, ArrowRight } from 'lucide-react';
import { FAQS } from '../data/mockData';

interface FaqViewProps {
  onOpenQuote: () => void;
  onOpenKakao: () => void;
}

export const FaqView: React.FC<FaqViewProps> = ({ onOpenQuote, onOpenKakao }) => {
  const [selectedCat, setSelectedCat] = useState<string>('전체');
  const [search, setSearch] = useState('');
  const [openIds, setOpenIds] = useState<string[]>(['faq-1', 'faq-2']);

  const categories = ['전체', '상담/예약', '비용/견적', '시공/소요시간', '사후관리/A/S'];

  const filtered = FAQS.filter((f) => {
    const matchCat = selectedCat === '전체' || f.category === selectedCat;
    const matchSearch =
      f.question.toLowerCase().includes(search.toLowerCase()) ||
      f.answer.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const toggleAccordion = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-12 lg:space-y-16 py-6 max-w-4xl mx-auto px-4 sm:px-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-700 bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
          <span>궁금증 100% 즉시 해결</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
          자주 묻는 질문 (FAQ)
        </h1>
        <p className="text-sm sm:text-base text-neutral-600 leading-relaxed max-w-2xl mx-auto">
          유리창청소 전문업체 상담 방법부터 정찰제 비용, 서울·수도권 출장 여부, 사후관리 A/S까지 가장 궁금해하시는 점을 정리했습니다.
        </p>
      </div>

      {/* Filter and Search */}
      <div className="space-y-3">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                selectedCat === cat
                  ? 'bg-neutral-900 text-white font-semibold'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="궁금하신 키워드(비용, 비 올 때, 출장비, 소요시간 등)를 검색하세요"
            className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-neutral-300 focus:border-neutral-900 focus:outline-hidden bg-white"
          />
        </div>
      </div>

      {/* Accordion List */}
      <div className="space-y-3">
        {filtered.map((item) => {
          const isOpen = openIds.includes(item.id);
          return (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-xs transition-all"
            >
              <button
                type="button"
                onClick={() => toggleAccordion(item.id)}
                className="w-full p-4 sm:p-5 text-left flex items-start justify-between gap-4 font-bold text-sm sm:text-base text-neutral-900 hover:bg-neutral-50"
              >
                <div className="flex items-start gap-3">
                  <span className="text-sky-600 font-mono font-black text-lg">Q.</span>
                  <div>
                    <div className="text-[11px] font-semibold text-sky-700 uppercase mb-0.5">
                      {item.category}
                    </div>
                    <span>{item.question}</span>
                  </div>
                </div>
                <span className="text-neutral-400 text-lg font-light shrink-0 mt-1">
                  {isOpen ? '−' : '+'}
                </span>
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-neutral-600 leading-relaxed border-t border-neutral-100 bg-neutral-50/40">
                  <p className="leading-relaxed whitespace-pre-line">{item.answer}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {item.keywords.map((kw, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded"
                      >
                        #{kw}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-neutral-200 text-sm text-neutral-500">
            검색 결과가 없습니다. 카카오톡 상담을 통해 직접 질문해 주세요!
          </div>
        )}
      </div>

      {/* Support Banner */}
      <div className="rounded-2xl bg-neutral-900 text-white p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1">
          <h3 className="text-lg font-bold">원하시는 답변을 찾지 못하셨나요?</h3>
          <p className="text-xs text-neutral-400">
            실시간 카카오톡 상담이나 전화(1588-7241)로 5분 내로 빠르고 친절하게 안내해 드립니다.
          </p>
        </div>
        <div className="flex gap-2.5 shrink-0">
          <button
            onClick={onOpenKakao}
            className="px-4 py-2.5 rounded-xl bg-[#FEE500] hover:bg-yellow-400 text-neutral-900 font-bold text-xs transition-colors flex items-center gap-1.5"
          >
            <MessageCircle className="h-4 w-4 fill-current" />
            <span>카카오톡 문의</span>
          </button>
          <button
            onClick={onOpenQuote}
            className="px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs transition-colors flex items-center gap-1.5"
          >
            <span>무료 견적신청</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
