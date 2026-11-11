import React, { useState } from 'react';
import { Bell, Search, ChevronRight, X, ArrowLeft } from 'lucide-react';
import { NoticeItem } from '../types';
import { NOTICES } from '../data/mockData';

interface NoticesViewProps {
  onOpenQuote: () => void;
  onOpenKakao: () => void;
}

export const NoticesView: React.FC<NoticesViewProps> = ({ onOpenQuote, onOpenKakao }) => {
  const [selectedNotice, setSelectedNotice] = useState<NoticeItem | null>(null);
  const [search, setSearch] = useState('');

  const filtered = NOTICES.filter((n) =>
    n.title.toLowerCase().includes(search.toLowerCase()) ||
    n.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-12 lg:space-y-16 py-6 max-w-4xl mx-auto px-4 sm:px-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-800 bg-neutral-100 px-3 py-1 rounded-full border border-neutral-200">
          <Bell className="h-3.5 w-3.5 text-sky-600" />
          <span>공식 소식 및 프로모션 안내</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
          클리어웍스 공지사항
        </h1>
        <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
          이벤트 혜택, 신규 장비 도입 소식, 서울·수도권 서비스 지역 확장 공지를 안내합니다.
        </p>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="공지사항 검색"
          className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-neutral-300 focus:border-neutral-900 focus:outline-hidden bg-white shadow-2xs"
        />
      </div>

      {/* Notice List */}
      <div className="space-y-3">
        {filtered.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedNotice(item)}
            className="bg-white rounded-2xl p-5 border border-neutral-200 shadow-xs hover:border-neutral-300 transition-all cursor-pointer flex items-center justify-between gap-4"
          >
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-xs text-neutral-400">
                <span className="font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded">
                  {item.category}
                </span>
                <span>·</span>
                <span>{item.date}</span>
                <span>·</span>
                <span>조회수 {item.views}</span>
              </div>
              <h3 className="font-bold text-sm sm:text-base text-neutral-900 leading-snug">
                {item.title}
              </h3>
              <p className="text-xs text-neutral-500 line-clamp-1">
                {item.content}
              </p>
            </div>
            <ChevronRight className="h-5 w-5 text-neutral-400 shrink-0" />
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      {selectedNotice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="relative w-full max-w-xl bg-white rounded-3xl overflow-hidden shadow-2xl p-6 sm:p-8 space-y-5">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
              <span className="text-xs font-bold text-sky-700 bg-sky-50 px-2.5 py-1 rounded">
                {selectedNotice.category}
              </span>
              <button
                onClick={() => setSelectedNotice(null)}
                className="p-1.5 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-neutral-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-2">
              <h2 className="text-lg sm:text-xl font-bold text-neutral-900">{selectedNotice.title}</h2>
              <div className="text-xs text-neutral-400">
                등록일: {selectedNotice.date} · 조회: {selectedNotice.views}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-neutral-50 text-xs sm:text-sm text-neutral-700 leading-relaxed border border-neutral-100">
              {selectedNotice.content}
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                onClick={() => setSelectedNotice(null)}
                className="px-4 py-2 rounded-xl border border-neutral-200 text-xs font-semibold text-neutral-700 hover:bg-neutral-50"
              >
                닫기
              </button>
              <button
                onClick={() => {
                  setSelectedNotice(null);
                  onOpenQuote();
                }}
                className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold"
              >
                무료 견적신청하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
