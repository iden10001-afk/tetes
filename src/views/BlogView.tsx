import React, { useState } from 'react';
import { BookOpen, Search, ArrowRight, X, Clock, Calendar, Sparkles } from 'lucide-react';
import { BlogItem } from '../types';
import { BLOG_POSTS } from '../data/mockData';

// Expand to 10 articles matching the prompt's 10 SEO topics
const ALL_BLOG_POSTS: BlogItem[] = [
  ...BLOG_POSTS,
  {
    id: 'post-6',
    title: '유리창청소 전문업체 선택 전 확인해야 할 6가지 포인트: 고소작업 안전과 보양',
    subtitle: '창틀 레일 손상 없이 안전하게 실내에서 닦아내는 특수 공법',
    category: '안전 가이드',
    date: '2026.10.15',
    readTime: '4분',
    seoKeyword: '유리창청소 전문업체',
    summary: '고층 아파트에서 사다리나 위험한 몸 빼내기 없이도 외창을 100% 닦아낼 수 있는 전문 스퀴지 장비와 3중 방수 보양의 중요성을 짚어봅니다.',
    contentParagraphs: [
      '아파트 외창 청소는 무엇보다 안전이 최우선입니다. 비전문가가 무리하게 창문을 탈거하려다 레일이 파손되거나 창문이 낙하하는 중대 사고가 일어날 수 있습니다.',
      '클리어웍스는 특수 각도 조절 스퀴지와 자석 브러시를 조합하여 실내에서 창문을 탈거하지 않고도 외측 유리를 티끌 하나 없이 닦아냅니다.',
      '또한 실내 마루에는 3중 방수포를 깔고 창틀 배수구에 물받이를 설치하여 오염수가 아랫집으로 흐르지 않도록 철저히 통제합니다.'
    ]
  },
  {
    id: 'post-7',
    title: '유리창청소 전문업체 상담 선택 전 확인해야 할 7가지 포인트: 실시간 사진 견적',
    subtitle: '카카오톡이나 문자로 사진 전송 시 10분 내 견적이 나오는 시스템',
    category: '상담 가이드',
    date: '2026.10.10',
    readTime: '3분',
    seoKeyword: '유리창청소 전문업체 상담',
    summary: '방문 견적을 핑계로 출장비를 요구하거나 현장에서 말을 바꾸는 업체를 피하고, 스마트폰 사진 한 장으로 명확한 확정 견적을 받는 법을 소개합니다.',
    contentParagraphs: [
      '스마트한 고객은 견적 상담 단계에서 업체의 전문성을 파악합니다. 창문 전체 뷰와 가장 오염이 심한 난간창 부위를 찍어 보내면, 노련한 업체는 단 10분 안에 정확한 소요 시간과 정찰가를 안내합니다.',
      '클리어웍스는 365일 실시간 카카오톡 상담 채널을 가동하여 바쁜 직장인이나 매장 점주님들이 언제든 간편하게 견적을 산출받으실 수 있습니다.'
    ]
  },
  {
    id: 'post-8',
    title: '유리창청소 전문업체 추천 선택 전 확인해야 할 8가지 포인트: 친환경 생분해 세제',
    subtitle: '호흡기 질환이나 반려동물, 아이가 있는 집에서도 안심할 수 있는 약품',
    category: '친환경 가이드',
    date: '2026.10.05',
    readTime: '4분',
    seoKeyword: '유리창청소 전문업체 추천',
    summary: '독한 락스 냄새나 염산 성분 화학 약품을 쓰면 유리 표면 코팅이 벗겨지고 실내 공기가 오염됩니다. 생분해성 프리미엄 케미컬의 가치를 알아봅니다.',
    contentParagraphs: [
      '일부 저가 청소업체는 빠른 때 불림을 위해 강산성 공업용 세척제를 남용합니다. 이는 유리 표면의 산화를 촉진하고 창호 고무 패킹을 삭게 만듭니다.',
      '클리어웍스는 유럽 환경 인증을 획득한 중성 생분해 세제와 유리 전용 미네랄 분해제만을 사용하므로 실내 냄새가 전혀 없고 인체에 무해합니다.'
    ]
  },
  {
    id: 'post-9',
    title: '유리창청소 전문업체 비용 선택 전 확인해야 할 9가지 포인트: 정기구독 혜택',
    subtitle: '카페, 쇼룸, 플래그십 매장 쇼윈도를 365일 맑게 유지하는 합리적 요율',
    category: '비용 분석',
    date: '2026.09.28',
    readTime: '3분',
    seoKeyword: '유리창청소 전문업체 비용',
    summary: '매달 혹은 격월로 관리받는 상가 정기 케어 플랜을 통해 1회성 청소 대비 30% 이상의 비용을 절감하는 노하우를 공개합니다.',
    contentParagraphs: [
      '매장 쇼윈도는 1회 청소 후 방치하기보다는 2주~1개월 주기로 가벼운 정기 터치를 해주는 것이 훨씬 경제적이고 매장 청결도를 높여줍니다.',
      '클리어웍스는 수도권 주요 상권(강남, 성수, 홍대, 판교 등)을 순회하는 정기 라우팅 시스템을 통해 상가 고객님들께 파격적인 정기구독 할인가를 제공합니다.'
    ]
  },
  {
    id: 'post-10',
    title: '유리창청소 전문업체 후기 선택 전 확인해야 할 10가지 포인트: 영수증 인증과 A/S',
    subtitle: '광고성 후기가 아닌 실제 결제 고객의 전후 사진과 7일 책임 보증',
    category: '고객 리뷰',
    date: '2026.09.20',
    readTime: '4분',
    seoKeyword: '유리창청소 전문업체 후기',
    summary: '인터넷에 넘쳐나는 거짓 광고 후기를 거르고 진짜 내돈내산 시공 후기를 판별하는 기준과 시공 후 A/S 보증서 발급 여부를 체크하세요.',
    contentParagraphs: [
      '진짜 믿을 수 있는 유리창청소 후기는 시공 전 얼룩덜룩했던 창문과 시공 후 먼 곳의 랜드마크까지 선명히 비치는 실제 촬영 원본 사진이 첨부되어 있습니다.',
      '클리어웍스 홈페이지에 등록된 모든 후기는 100% 현장 시공 완료 고객님의 검증된 피드백이며, 시공 후 7일간 무상 A/S를 약속드립니다.'
    ]
  }
];

interface BlogViewProps {
  onOpenQuote: () => void;
  onOpenKakao: () => void;
}

export const BlogView: React.FC<BlogViewProps> = ({ onOpenQuote, onOpenKakao }) => {
  const [search, setSearch] = useState('');
  const [selectedPost, setSelectedPost] = useState<BlogItem | null>(null);

  const filtered = ALL_BLOG_POSTS.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.summary.toLowerCase().includes(search.toLowerCase()) ||
      p.seoKeyword.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-12 lg:space-y-16 py-6 max-w-7xl mx-auto px-4 sm:px-6">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-700 bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
          <span>유리창 케어 전문 정보 & SEO 가이드</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
          클리어웍스 유리창청소 칼럼 & 꿀팁
        </h1>
        <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
          유리창청소 전문업체 선택 기준부터 비용 아끼는 법, 석회수 물때 제거 노하우까지 유용한 정보 10편을 만나보세요.
        </p>
      </div>

      {/* Search Input */}
      <div className="max-w-md mx-auto relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="칼럼 검색 (비용, 상담, 추천, 후기 등)"
          className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-neutral-300 focus:border-neutral-900 focus:outline-hidden bg-white shadow-2xs"
        />
      </div>

      {/* Blog Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((post) => (
          <div
            key={post.id}
            onClick={() => setSelectedPost(post)}
            className="bg-white rounded-3xl p-6 border border-neutral-200 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between space-y-4 group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-neutral-400">
                <span className="font-semibold text-sky-700">{post.category}</span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {post.readTime}
                </span>
              </div>

              <h2 className="text-base font-bold text-neutral-900 group-hover:text-sky-600 transition-colors leading-snug line-clamp-2">
                {post.title}
              </h2>

              <p className="text-xs text-neutral-500 leading-relaxed line-clamp-3">
                {post.summary}
              </p>
            </div>

            <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs">
              <span className="text-[11px] text-neutral-400">#{post.seoKeyword}</span>
              <span className="font-bold text-sky-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                칼럼 읽기 <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Article Detail Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col">
            <div className="bg-neutral-900 text-white px-6 py-4 flex items-center justify-between">
              <div>
                <span className="text-xs text-sky-400 font-semibold">{selectedPost.category}</span>
                <h3 className="text-base font-bold truncate max-w-md">{selectedPost.title}</h3>
              </div>
              <button
                onClick={() => setSelectedPost(null)}
                className="rounded-full p-1.5 text-neutral-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
              <div>
                <h2 className="text-xl font-bold text-neutral-900 leading-snug">{selectedPost.title}</h2>
                <div className="text-xs text-neutral-400 mt-2 flex items-center gap-3">
                  <span>작성일: {selectedPost.date}</span>
                  <span>·</span>
                  <span>읽는 시간: {selectedPost.readTime}</span>
                  <span>·</span>
                  <span className="text-sky-600 font-medium">#{selectedPost.seoKeyword}</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-neutral-50 text-xs sm:text-sm text-neutral-700 italic border-l-2 border-sky-600">
                "{selectedPost.summary}"
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-neutral-700 leading-relaxed">
                {selectedPost.contentParagraphs.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              <div className="rounded-2xl bg-sky-50 p-5 border border-sky-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <div className="font-bold text-xs sm:text-sm text-sky-950">전문 유리창청소가 필요하신가요?</div>
                  <p className="text-xs text-sky-700 mt-0.5">클리어웍스는 서울·수도권 전지역 무료 출장 견적을 제공합니다.</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedPost(null);
                    onOpenQuote();
                  }}
                  className="px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs whitespace-nowrap"
                >
                  무료 견적신청 →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
