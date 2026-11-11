import React, { useState } from 'react';
import { 
  Users, 
  FileText, 
  CheckCircle2, 
  Clock, 
  Search, 
  PhoneCall, 
  MapPin, 
  ShieldCheck, 
  TrendingUp, 
  Filter,
  Trash2
} from 'lucide-react';
import { QuoteRequest, SeoSettingsMap, NavTab } from '../types';
import { AdminSeoManager } from '../components/AdminSeoManager';
import { PageDensityProgressBar } from '../components/PageDensityProgressBar';
import { getAllPagesDensityAnalysis, calculateKeywordDensity } from '../utils/seoUtils';
import { Globe, BarChart3, Sparkles, ArrowRight } from 'lucide-react';

interface AdminViewProps {
  quotes: QuoteRequest[];
  onUpdateQuoteStatus: (id: string, newStatus: QuoteRequest['status']) => void;
  onDeleteQuote: (id: string) => void;
  seoSettings: SeoSettingsMap;
  onUpdateSeoSettings: (newSettings: SeoSettingsMap) => void;
  currentPageKey: NavTab;
}

export const AdminView: React.FC<AdminViewProps> = ({
  quotes,
  onUpdateQuoteStatus,
  onDeleteQuote,
  seoSettings,
  onUpdateSeoSettings,
  currentPageKey
}) => {
  const [adminSubTab, setAdminSubTab] = useState<'density' | 'seo' | 'quotes'>('density');
  const [filterStatus, setFilterStatus] = useState<string>('전체');
  const [search, setSearch] = useState('');
  const [pageSearch, setPageSearch] = useState('');
  const [selectedSeoPage, setSelectedSeoPage] = useState<NavTab>('home');

  // Calculate keyword density for each page using the new calculateKeywordDensity utility
  const allPagesAnalysis = getAllPagesDensityAnalysis(seoSettings);

  const filteredPages = allPagesAnalysis.filter((p) =>
    p.pageName.toLowerCase().includes(pageSearch.toLowerCase()) ||
    p.pageKey.toLowerCase().includes(pageSearch.toLowerCase()) ||
    p.primaryKeyword.toLowerCase().includes(pageSearch.toLowerCase())
  );

  const optimalPagesCount = allPagesAnalysis.filter((p) => p.primaryStatus === 'optimal').length;

  const handleJumpToPageSeo = (pageKey: NavTab) => {
    setSelectedSeoPage(pageKey);
    setAdminSubTab('seo');
  };

  const filteredQuotes = quotes.filter((q) => {
    const matchStatus = filterStatus === '전체' || q.status === filterStatus;
    const matchSearch =
      q.name.toLowerCase().includes(search.toLowerCase()) ||
      q.phone.includes(search) ||
      q.regionDistrict.toLowerCase().includes(search.toLowerCase()) ||
      (q.detailAddress && q.detailAddress.toLowerCase().includes(search.toLowerCase()));
    return matchStatus && matchSearch;
  });

  const totalEstimatedRevenue = quotes.reduce((acc, q) => acc + q.estimatedCost, 0);

  return (
    <div className="space-y-8 py-6 max-w-7xl mx-auto px-4 sm:px-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 pb-5">
        <div>
          <div className="text-xs font-bold text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded-md w-fit mb-1">
            클리어웍스 본사 관리자 콘솔
          </div>
          <h1 className="text-2xl font-black text-neutral-900 tracking-tight">
            운영 관리 & 페이지별 SEO 키워드 밀도 시스템
          </h1>
          <p className="text-xs text-neutral-500 mt-0.5">
            각 페이지의 텍스트 본문과 타깃 키워드 간의 출현 빈도 및 밀도를 진행 바(Progress Bar)로 모니터링합니다.
          </p>
        </div>

        {/* Sub-tab switcher */}
        <div className="flex items-center gap-1.5 p-1 bg-neutral-100 rounded-xl overflow-x-auto no-scrollbar">
          <button
            type="button"
            onClick={() => setAdminSubTab('density')}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
              adminSubTab === 'density'
                ? 'bg-white text-neutral-900 shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <BarChart3 className="h-3.5 w-3.5 text-emerald-600" />
            <span>페이지별 키워드 밀도 ({allPagesAnalysis.length})</span>
          </button>
          <button
            type="button"
            onClick={() => setAdminSubTab('seo')}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
              adminSubTab === 'seo'
                ? 'bg-white text-neutral-900 shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <Globe className="h-3.5 w-3.5 text-sky-600" />
            <span>SEO 메타태그 & 캐노니컬</span>
          </button>
          <button
            type="button"
            onClick={() => setAdminSubTab('quotes')}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
              adminSubTab === 'quotes'
                ? 'bg-white text-neutral-900 shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <FileText className="h-3.5 w-3.5 text-neutral-500" />
            <span>견적 접수 관리 ({quotes.length})</span>
          </button>
        </div>
      </div>

      {/* 1. KEYWORD DENSITY PROGRESS BAR VIEW FOR EACH PAGE */}
      {adminSubTab === 'density' && (
        <div className="space-y-6">
          {/* Top KPI Strip for Keyword Density */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-xs space-y-1">
              <div className="text-xs text-neutral-500 flex items-center justify-between">
                <span>총 분석 대상 페이지</span>
                <Globe className="h-4 w-4 text-sky-600" />
              </div>
              <div className="text-2xl font-black text-neutral-900 font-mono">
                {allPagesAnalysis.length}개 페이지
              </div>
              <div className="text-[11px] text-neutral-400">모든 서브페이지 실시간 텍스트 추출</div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-xs space-y-1">
              <div className="text-xs text-neutral-500 flex items-center justify-between">
                <span>최적 밀도 달성 페이지 (1.0~3.0%)</span>
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              </div>
              <div className="text-2xl font-black text-emerald-600 font-mono">
                {optimalPagesCount} / {allPagesAnalysis.length}개 달성
              </div>
              <div className="text-[11px] text-emerald-600 font-medium">검색엔진 최적 권장 비율 충족</div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-xs space-y-1">
              <div className="text-xs text-neutral-500 flex items-center justify-between">
                <span>평균 키워드 최적화 점수</span>
                <Sparkles className="h-4 w-4 text-amber-500" />
              </div>
              <div className="text-2xl font-black text-neutral-900 font-mono">
                {Math.round(allPagesAnalysis.reduce((acc, p) => acc + p.overallScore, 0) / allPagesAnalysis.length)}점
              </div>
              <div className="text-[11px] text-neutral-500">100점 만점 기준 환산</div>
            </div>
          </div>

          {/* Guide Legend */}
          <div className="p-4 rounded-2xl bg-neutral-100/80 border border-neutral-200 flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex flex-wrap items-center gap-4">
              <span className="font-bold text-neutral-800">진행 바(Progress Bar) 색상 판독 기준:</span>
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                <span className="text-neutral-700 font-medium">최적 (1.0% ~ 3.0%)</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
                <span className="text-neutral-700 font-medium">밀도 부족 (&lt;1.0%)</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-500" />
                <span className="text-neutral-700 font-medium">과다 주의 (&gt;3.2%)</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-neutral-300" />
                <span className="text-neutral-700 font-medium">본문 미등장 (0회)</span>
              </span>
            </div>

            <div className="relative min-w-[220px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-400" />
              <input
                type="text"
                value={pageSearch}
                onChange={(e) => setPageSearch(e.target.value)}
                placeholder="페이지명 또는 키워드 검색"
                className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-neutral-300 focus:border-neutral-900 focus:outline-hidden bg-white"
              />
            </div>
          </div>

          {/* List of Progress Bar Components for Each Page */}
          <div className="space-y-4">
            {filteredPages.map((pageAnalysis) => (
              <PageDensityProgressBar
                key={pageAnalysis.pageKey}
                analysis={pageAnalysis}
                onSelectPage={() => handleJumpToPageSeo(pageAnalysis.pageKey)}
                showAllKeywords={true}
              />
            ))}

            {filteredPages.length === 0 && (
              <div className="py-12 text-center text-xs text-neutral-400 bg-white rounded-2xl border border-neutral-200">
                검색 조건과 일치하는 페이지가 없습니다.
              </div>
            )}
          </div>
        </div>
      )}

      {/* 2. SEO MANAGER WITH DENSITY DETAILS */}
      {adminSubTab === 'seo' && (
        <AdminSeoManager
          seoSettings={seoSettings}
          onUpdateSeoSettings={onUpdateSeoSettings}
          currentPageKey={selectedSeoPage || currentPageKey}
        />
      )}

      {adminSubTab === 'quotes' && (
        <div className="space-y-8">
          {/* KPI Stats Strip */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-xs space-y-1">
          <div className="text-xs text-neutral-500 flex items-center justify-between">
            <span>총 접수 견적</span>
            <FileText className="h-4 w-4 text-neutral-400" />
          </div>
          <div className="text-2xl font-black text-neutral-900 font-mono tabular-nums">
            {quotes.length}건
          </div>
          <div className="text-[11px] text-emerald-600 font-medium">전환율 18.4% 달성</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-xs space-y-1">
          <div className="text-xs text-neutral-500 flex items-center justify-between">
            <span>상담 대기 / 진행중</span>
            <Clock className="h-4 w-4 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-amber-600 font-mono tabular-nums">
            {quotes.filter((q) => q.status === '접수완료' || q.status === '상담중').length}건
          </div>
          <div className="text-[11px] text-neutral-500">10분 내 응대 목표</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-xs space-y-1">
          <div className="text-xs text-neutral-500 flex items-center justify-between">
            <span>방문 확정 / 완료</span>
            <CheckCircle2 className="h-4 w-4 text-sky-600" />
          </div>
          <div className="text-2xl font-black text-sky-700 font-mono tabular-nums">
            {quotes.filter((q) => q.status === '방문확정' || q.status === '시공완료').length}건
          </div>
          <div className="text-[11px] text-neutral-500">직영 2인 1조 마스터 배정</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-xs space-y-1">
          <div className="text-xs text-neutral-500 flex items-center justify-between">
            <span>예상 총 시공 매출</span>
            <TrendingUp className="h-4 w-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-neutral-900 font-mono tabular-nums">
            {(totalEstimatedRevenue / 10000).toFixed(0)}만원
          </div>
          <div className="text-[11px] text-neutral-500">정찰제 기준 합산</div>
        </div>
      </div>

      {/* Control bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-neutral-200">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {['전체', '접수완료', '상담중', '방문확정', '시공완료'].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                filterStatus === st
                  ? 'bg-neutral-900 text-white font-bold'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        <div className="relative min-w-[240px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="고객명, 연락처, 지역 검색"
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-neutral-300 focus:border-neutral-900 focus:outline-hidden"
          />
        </div>
      </div>

      {/* Quote Table */}
      <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-neutral-600">
            <thead className="bg-neutral-50 text-[11px] font-bold text-neutral-700 uppercase border-b border-neutral-200">
              <tr>
                <th className="px-4 py-3">접수번호 / 일시</th>
                <th className="px-4 py-3">고객명 / 연락처</th>
                <th className="px-4 py-3">유형 / 지역 / 주소</th>
                <th className="px-4 py-3">면적 / 희망일</th>
                <th className="px-4 py-3">예상견적</th>
                <th className="px-4 py-3">상태 변경</th>
                <th className="px-4 py-3 text-right">관리</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {filteredQuotes.map((q) => (
                <tr key={q.id} className="hover:bg-neutral-50/80 transition-colors">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="font-bold text-neutral-900 font-mono">{q.id}</div>
                    <div className="text-[11px] text-neutral-400">{q.createdAt}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="font-bold text-neutral-900">{q.name}</div>
                    <div className="text-sky-700 flex items-center gap-1">
                      <PhoneCall className="h-3 w-3" />
                      {q.phone}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-semibold text-neutral-800">
                      {q.serviceType === 'apartment' ? '아파트' : q.serviceType === 'commercial' ? '상가' : '주택'} · {q.regionDistrict}
                    </div>
                    <div className="text-neutral-500 text-[11px] truncate max-w-[200px]">
                      {q.detailAddress || '상세주소 미입력'}
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-neutral-800 font-medium">{q.sizeInfo}</div>
                    <div className="text-neutral-400 text-[11px]">
                      희망: {q.preferredDate} {q.isExteriorIncluded && '(외창포함)'}
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="font-mono font-bold text-neutral-900">
                      {q.estimatedCost.toLocaleString()}원
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <select
                      value={q.status}
                      onChange={(e) => onUpdateQuoteStatus(q.id, e.target.value as any)}
                      className={`text-xs font-semibold px-2 py-1 rounded-lg border focus:outline-hidden ${
                        q.status === '접수완료'
                          ? 'border-neutral-300 bg-neutral-100 text-neutral-800'
                          : q.status === '상담중'
                          ? 'border-amber-300 bg-amber-50 text-amber-800'
                          : q.status === '방문확정'
                          ? 'border-sky-300 bg-sky-50 text-sky-800'
                          : 'border-emerald-300 bg-emerald-50 text-emerald-800'
                      }`}
                    >
                      <option value="접수완료">접수완료</option>
                      <option value="상담중">상담중</option>
                      <option value="방문확정">방문확정</option>
                      <option value="시공완료">시공완료</option>
                    </select>
                  </td>
                  <td className="px-4 py-3 text-right whitespace-nowrap">
                    <button
                      type="button"
                      onClick={() => onDeleteQuote(q.id)}
                      className="p-1 rounded text-neutral-400 hover:text-rose-600 transition-colors"
                      title="문의 삭제"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredQuotes.length === 0 && (
          <div className="py-12 text-center text-xs text-neutral-400">
            조건에 일치하는 견적문의 내역이 없습니다.
          </div>
        )}
      </div>
    </div>
  )}
</div>
  );
};
