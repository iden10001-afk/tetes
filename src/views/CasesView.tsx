import React, { useState, useMemo } from 'react';
import { Search, Filter, Calendar, MapPin, Sparkles, ArrowRight, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { CaseStudy } from '../types';
import { CASE_STUDIES } from '../data/mockData';
import { BeforeAfterSlider } from '../components/BeforeAfterSlider';

interface CasesViewProps {
  onOpenQuote: () => void;
  onOpenKakao: () => void;
}

export const CasesView: React.FC<CasesViewProps> = ({ onOpenQuote, onOpenKakao }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCaseModal, setActiveCaseModal] = useState<CaseStudy | null>(null);

  const categories = ['전체', '아파트', '상가·카페', '단독·타운하우스'];

  const filteredCases = useMemo(() => {
    return CASE_STUDIES.filter((item) => {
      const matchCat = selectedCategory === '전체' || item.category === selectedCategory;
      const matchQuery =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchQuery;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="space-y-12 lg:space-y-16 py-6 max-w-7xl mx-auto px-4 sm:px-6">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-700 bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
          <span>100% 실제 현장 시공 갤러리</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
          클리어웍스 시공사례 포트폴리오
        </h1>
        <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
          서울 및 수도권 전지역 아파트, 상가, 오피스 등 다양한 현장의 생생한 비포 & 애프터 시공 기록을 확인하세요.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-neutral-200 shadow-xs">
        {/* Categories (Functional buttons adhering to §1.A) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                selectedCategory === cat
                  ? 'bg-neutral-900 text-white font-semibold'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative min-w-[260px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="지역(서초, 판교 등) 또는 건물명 검색"
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-neutral-300 focus:border-neutral-900 focus:outline-hidden"
          />
        </div>
      </div>

      {/* Cases Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredCases.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-3xl overflow-hidden border border-neutral-200 shadow-xs hover:shadow-md transition-shadow flex flex-col group"
          >
            {/* Interactive Before/After Comparison */}
            <div className="p-3 bg-neutral-900">
              <BeforeAfterSlider
                beforeImage={item.beforeImage}
                afterImage={item.afterImage}
                aspectRatioClass="aspect-[16/10]"
              />
            </div>

            {/* Case Details */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-neutral-500">
                  <span className="font-semibold text-sky-700">{item.category}</span>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {item.region}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{item.date}</span>
                </div>

                <h3 className="text-lg font-bold text-neutral-900 group-hover:text-sky-600 transition-colors leading-snug">
                  {item.title}
                </h3>

                <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Highlights */}
              <div className="space-y-3 pt-3 border-t border-neutral-100">
                <div className="flex flex-wrap gap-1.5">
                  {item.highlights.map((hl, hIdx) => (
                    <span
                      key={hIdx}
                      className="text-[11px] bg-neutral-100 text-neutral-700 px-2.5 py-1 rounded-md font-medium"
                    >
                      {hl}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveCaseModal(item)}
                    className="text-xs font-bold text-neutral-900 hover:text-sky-600 flex items-center gap-1"
                  >
                    <span>상세 시공기 읽기</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={onOpenQuote}
                    className="px-3.5 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold transition-colors shadow-2xs"
                  >
                    비슷한 공간 견적신청
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredCases.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl border border-neutral-200">
          <p className="text-sm text-neutral-500">검색 조건에 일치하는 시공사례가 없습니다.</p>
        </div>
      )}

      {/* Case Detail Modal */}
      {activeCaseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col">
            <div className="bg-neutral-900 text-white px-6 py-4 flex items-center justify-between">
              <div>
                <span className="text-xs text-sky-400 font-semibold">{activeCaseModal.category} 시공 리포트</span>
                <h3 className="text-base font-bold truncate max-w-md">{activeCaseModal.title}</h3>
              </div>
              <button
                onClick={() => setActiveCaseModal(null)}
                className="rounded-full p-1.5 text-neutral-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6">
              <BeforeAfterSlider
                beforeImage={activeCaseModal.beforeImage}
                afterImage={activeCaseModal.afterImage}
                aspectRatioClass="aspect-[16/9]"
              />

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-xs text-neutral-500">
                  <span>지역: {activeCaseModal.region}</span>
                  <span>·</span>
                  <span>시공일자: {activeCaseModal.date}</span>
                  <span>·</span>
                  <span>의뢰인: {activeCaseModal.clientType}</span>
                </div>
                <h4 className="text-lg font-bold text-neutral-900">시공 상세 내역</h4>
                <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
                  {activeCaseModal.description}
                </p>
              </div>

              <div className="bg-sky-50 rounded-2xl p-4 border border-sky-100 space-y-2">
                <div className="text-xs font-bold text-sky-900">시공 핵심 포인트</div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-sky-800">
                  {activeCaseModal.highlights.map((hl, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <Sparkles className="h-3 w-3 text-sky-600" />
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setActiveCaseModal(null);
                    onOpenQuote();
                  }}
                  className="flex-1 py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs sm:text-sm font-bold transition-colors text-center"
                >
                  이 사례처럼 시공 견적받기
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveCaseModal(null);
                    onOpenKakao();
                  }}
                  className="px-5 py-3 rounded-xl bg-[#FEE500] hover:bg-yellow-400 text-neutral-900 text-xs sm:text-sm font-bold transition-colors"
                >
                  카카오톡 문의
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
