import React, { useState } from 'react';
import { Star, ShieldCheck, ThumbsUp, Camera, Plus, CheckCircle2, X } from 'lucide-react';
import { ReviewItem } from '../types';
import { REVIEWS } from '../data/mockData';

interface ReviewsViewProps {
  onOpenQuote: () => void;
  onOpenKakao: () => void;
}

export const ReviewsView: React.FC<ReviewsViewProps> = ({ onOpenQuote, onOpenKakao }) => {
  const [reviewsList, setReviewsList] = useState<ReviewItem[]>(REVIEWS);
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [ratingFilter, setRatingFilter] = useState<number | 'all'>('all');

  // New review form states
  const [newAuthor, setNewAuthor] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newServiceType, setNewServiceType] = useState('아파트 외창+내창 종합케어');
  const [newRating, setNewRating] = useState(5);
  const [newContent, setNewContent] = useState('');

  const filtered = ratingFilter === 'all'
    ? reviewsList
    : reviewsList.filter((r) => r.rating === ratingFilter);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newContent.trim()) {
      alert('성함과 후기 내용을 입력해주세요.');
      return;
    }

    const created: ReviewItem = {
      id: `rev-${Date.now()}`,
      author: `${newAuthor[0]}*${newAuthor.slice(2) || '님'}`,
      location: newLocation || '서울 강남구',
      serviceType: newServiceType,
      rating: newRating,
      date: new Date().toISOString().slice(0, 10).replace(/-/g, '.'),
      content: newContent,
      verified: true
    };

    setReviewsList([created, ...reviewsList]);
    setIsWriteModalOpen(false);
    setNewAuthor('');
    setNewLocation('');
    setNewContent('');
    alert('소중한 후기가 등록되었습니다! 검수 후 정식 노출됩니다.');
  };

  return (
    <div className="space-y-12 lg:space-y-16 py-6 max-w-7xl mx-auto px-4 sm:px-6">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
          <span>100% 실 시공 고객 인증 리얼 후기</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
          클리어웍스 고객후기
        </h1>
        <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
          실제 시공을 받아보신 서울·수도권 이웃 고객님들의 솔직한 평가와 비포애프터 감동을 만나보세요.
        </p>
      </div>

      {/* Rating Overview Summary Box */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-xs grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        <div className="text-center md:border-r md:border-neutral-200 space-y-2">
          <div className="text-5xl font-black text-neutral-900 font-mono tracking-tight">4.96</div>
          <div className="flex justify-center text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-current" />
            ))}
          </div>
          <p className="text-xs text-neutral-500">누적 시공 고객 3,500+ 중 99% 만족</p>
        </div>

        <div className="space-y-1.5 text-xs text-neutral-600">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-neutral-800">친절도 및 작업 매너</span>
            <span className="text-sky-600 font-bold font-mono">99.8%</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-semibold text-neutral-800">유리창 투명도 만족</span>
            <span className="text-sky-600 font-bold font-mono">99.4%</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-semibold text-neutral-800">견적 투명성 & 정찰제 준수</span>
            <span className="text-sky-600 font-bold font-mono">100%</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-semibold text-neutral-800">재이용 및 지인 추천 의향</span>
            <span className="text-sky-600 font-bold font-mono">96.2%</span>
          </div>
        </div>

        <div className="flex flex-col gap-2.5 sm:pl-4">
          <button
            type="button"
            onClick={() => setIsWriteModalOpen(true)}
            className="w-full py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 shadow-xs"
          >
            <Plus className="h-4 w-4" />
            <span>시공 후기 작성하기</span>
          </button>
          <button
            type="button"
            onClick={onOpenQuote}
            className="w-full py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs transition-colors text-center"
          >
            무료 견적신청 바로가기
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setRatingFilter('all')}
            className={`px-3 py-1 text-xs font-semibold rounded-lg ${
              ratingFilter === 'all' ? 'bg-neutral-900 text-white' : 'text-neutral-600 hover:bg-neutral-100'
            }`}
          >
            전체 후기 ({reviewsList.length})
          </button>
          <button
            onClick={() => setRatingFilter(5)}
            className={`px-3 py-1 text-xs font-semibold rounded-lg ${
              ratingFilter === 5 ? 'bg-neutral-900 text-white' : 'text-neutral-600 hover:bg-neutral-100'
            }`}
          >
            ★ 5점만 모아보기
          </button>
        </div>
        <span className="text-xs text-neutral-400">최신순 정렬</span>
      </div>

      {/* Reviews Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-3xl p-6 border border-neutral-200 shadow-xs flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex text-amber-400">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-neutral-800">{item.rating}.0</span>
                </div>
                <span className="text-xs text-neutral-400 font-mono">{item.date}</span>
              </div>

              {item.image && (
                <div className="h-40 rounded-xl overflow-hidden border border-neutral-100">
                  <img
                    src={item.image}
                    alt="고객 시공 인증 사진"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-normal">
                "{item.content}"
              </p>
            </div>

            <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs">
              <div>
                <div className="font-bold text-neutral-900 flex items-center gap-1.5">
                  {item.author}
                  {item.verified && (
                    <span className="text-[10px] bg-emerald-50 text-emerald-700 px-1.5 py-0.2 rounded font-semibold">
                      인증고객
                    </span>
                  )}
                </div>
                <div className="text-neutral-500 text-[11px] mt-0.5">{item.location} · {item.serviceType}</div>
              </div>
              <button
                type="button"
                onClick={onOpenQuote}
                className="text-xs font-semibold text-sky-600 hover:underline"
              >
                견적 문의 →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Write Review Modal */}
      {isWriteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="relative w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col">
            <div className="bg-neutral-900 text-white px-6 py-4 flex items-center justify-between">
              <h3 className="text-base font-bold">시공 후기 작성하기</h3>
              <button
                onClick={() => setIsWriteModalOpen(false)}
                className="rounded-full p-1 text-neutral-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleAddReview} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  만족도 별점
                </label>
                <div className="flex gap-2 text-amber-400 cursor-pointer">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewRating(star)}
                      className="p-1"
                    >
                      <Star
                        className={`h-6 w-6 ${star <= newRating ? 'fill-current' : 'text-neutral-300'}`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  성함 <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                  placeholder="예: 김민수"
                  className="w-full rounded-xl border border-neutral-300 px-3.5 py-2 text-xs focus:border-neutral-900 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  지역 및 거주단지
                </label>
                <input
                  type="text"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  placeholder="예: 서울 송파구 잠실엘스 34평"
                  className="w-full rounded-xl border border-neutral-300 px-3.5 py-2 text-xs focus:border-neutral-900 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  후기 내용 <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="시공 후 달라진 창문 뷰, 작업자의 친절도, 만족스러웠던 점을 솔직하게 남겨주세요."
                  className="w-full rounded-xl border border-neutral-300 px-3.5 py-2 text-xs focus:border-neutral-900 focus:outline-hidden resize-none"
                />
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsWriteModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl border border-neutral-200 text-xs font-semibold text-neutral-600 hover:bg-neutral-50"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold transition-colors"
                >
                  후기 등록하기
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
