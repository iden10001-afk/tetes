import React from 'react';
import { PageDensityAnalysis, KeywordDensityResult } from '../utils/seoUtils';
import { CheckCircle2, AlertTriangle, AlertCircle, XCircle, ArrowUpRight } from 'lucide-react';

interface PageDensityProgressBarProps {
  analysis: PageDensityAnalysis;
  onSelectPage?: () => void;
  showAllKeywords?: boolean;
}

export const PageDensityProgressBar: React.FC<PageDensityProgressBarProps> = ({
  analysis,
  onSelectPage,
  showAllKeywords = false
}) => {
  const { pageName, pageKey, primaryKeyword, primaryDensity, primaryCount, primaryStatus, keywords, overallScore } = analysis;

  // Max reference scale for the progress bar (e.g. 4.0% density = 100% bar width)
  const MAX_SCALE = 4.0;
  const progressPercent = Math.min(100, Math.max(4, (primaryDensity / MAX_SCALE) * 100));

  // Determine bar fill color
  const getBarColor = (status: KeywordDensityResult['status']) => {
    switch (status) {
      case 'optimal':
        return 'bg-emerald-500';
      case 'low':
        return 'bg-amber-500';
      case 'high':
        return 'bg-rose-500';
      case 'missing':
      default:
        return 'bg-neutral-300';
    }
  };

  const getStatusBadge = (status: KeywordDensityResult['status']) => {
    switch (status) {
      case 'optimal':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
            <CheckCircle2 className="h-3 w-3 text-emerald-600" />
            최적 (1.0~3.0%)
          </span>
        );
      case 'low':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md">
            <AlertTriangle className="h-3 w-3 text-amber-600" />
            밀도 부족 (&lt;1.0%)
          </span>
        );
      case 'high':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-md">
            <AlertCircle className="h-3 w-3 text-rose-600" />
            과다 주의 (&gt;3.2%)
          </span>
        );
      case 'missing':
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-neutral-500 bg-neutral-100 border border-neutral-200 px-2 py-0.5 rounded-md">
            <XCircle className="h-3 w-3 text-neutral-400" />
            본문 미등장 (0회)
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-2xl p-5 border border-neutral-200 shadow-xs hover:border-neutral-300 transition-all space-y-3.5">
      {/* Top Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <span className="font-bold text-sm text-neutral-900">{pageName}</span>
          <span className="text-[11px] font-mono text-neutral-400 bg-neutral-100 px-2 py-0.5 rounded">
            /{pageKey === 'home' ? '' : pageKey}
          </span>
          <span className="text-[11px] text-neutral-500 hidden sm:inline">
            · {analysis.totalWords}단어 ({analysis.totalChars}자)
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-neutral-500">
            SEO 최적화: <strong className="text-neutral-900 font-mono">{overallScore}점</strong>
          </span>
          {onSelectPage && (
            <button
              type="button"
              onClick={onSelectPage}
              className="text-xs font-semibold text-sky-600 hover:text-sky-700 flex items-center gap-0.5"
            >
              <span>상세 편집</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Primary Keyword Progress Bar Section */}
      <div className="space-y-1.5 bg-neutral-50 p-3.5 rounded-xl border border-neutral-100">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 font-bold text-neutral-800">
            <span>대표 키워드:</span>
            <span className="text-sky-700 font-semibold underline underline-offset-2">
              "{primaryKeyword}"
            </span>
            <span className="text-[11px] text-neutral-500 font-normal">
              ({primaryCount}회 출현)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-mono font-black text-sm text-neutral-900">
              {primaryDensity}%
            </span>
            {getStatusBadge(primaryStatus)}
          </div>
        </div>

        {/* Visual Progress Bar Component */}
        <div className="relative pt-1">
          <div className="w-full bg-neutral-200 h-2.5 rounded-full overflow-hidden relative shadow-inner">
            {/* Optimal zone guide background (25% to 75% represents 1.0% to 3.0%) */}
            <div
              className="absolute top-0 bottom-0 bg-emerald-100/60 pointer-events-none"
              style={{ left: '25%', width: '50%' }}
              title="권장 최적 밀도 구간 (1.0% ~ 3.0%)"
            />
            {/* The Active Density Fill Bar */}
            <div
              className={`h-full rounded-full transition-all duration-500 ${getBarColor(primaryStatus)}`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Scale labels */}
          <div className="flex justify-between text-[10px] text-neutral-400 font-mono mt-1 px-0.5">
            <span>0%</span>
            <span className="text-emerald-700 font-semibold">1.0% (최적 시작)</span>
            <span className="text-emerald-700 font-semibold">3.0% (최적 상한)</span>
            <span>4.0%+</span>
          </div>
        </div>
      </div>

      {/* Sub-keywords list preview */}
      {keywords.length > 1 && (
        <div className="space-y-1.5 pt-1">
          <div className="text-[11px] font-bold text-neutral-500">서브 타깃 키워드 밀도:</div>
          <div className="flex flex-wrap gap-2">
            {keywords.slice(1, showAllKeywords ? undefined : 4).map((kw, idx) => (
              <div
                key={idx}
                className="flex items-center gap-1.5 text-xs bg-white border border-neutral-200 px-2.5 py-1 rounded-lg"
              >
                <span className="font-medium text-neutral-800">{kw.keyword}</span>
                <span className="text-[11px] text-neutral-400 font-mono">{kw.count}회</span>
                <span className={`text-[11px] font-mono font-bold ${
                  kw.status === 'optimal'
                    ? 'text-emerald-600'
                    : kw.status === 'low'
                    ? 'text-amber-600'
                    : kw.status === 'high'
                    ? 'text-rose-600'
                    : 'text-neutral-400'
                }`}>
                  {kw.density}%
                </span>
              </div>
            ))}
            {keywords.length > 4 && !showAllKeywords && (
              <span className="text-[11px] text-neutral-400 self-center">
                +{keywords.length - 4}개 더보기
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
