import React from 'react';
import { Phone, MapPin, ShieldCheck, Clock, ExternalLink } from 'lucide-react';
import { NavTab } from '../types';

interface FooterProps {
  onSelectTab: (tab: NavTab) => void;
  onOpenQuote: () => void;
  onOpenKakao: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectTab,
  onOpenQuote,
  onOpenKakao
}) => {
  return (
    <footer className="bg-neutral-900 text-neutral-400 border-t border-neutral-800 pb-20 md:pb-12 pt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-neutral-800">
          {/* Col 1: Brand & Promise */}
          <div className="md:col-span-2 space-y-4">
            <div className="text-xl font-black text-white tracking-tight flex items-center gap-1.5">
              <span className="text-sky-400">CLEAR</span>WORKS
              <span className="text-xs text-neutral-400 font-normal">클리어웍스 유리창청소 전문업체</span>
            </div>
            <p className="text-sm text-neutral-400 max-w-md leading-relaxed">
              클리어웍스는 서울 25개 구 및 경기·인천 수도권 전지역을 아우르는 프리미엄 유리창청소 전문업체입니다. 
              초순수 정수 필터 공법과 나노 실리카 발수코팅으로 탁 트인 파노라마 전망을 복원해 드립니다.
            </p>
            <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-300">
              <span className="flex items-center gap-1">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                현대해상 영업배상책임보험 1억원 가입
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4 text-sky-400" />
                연중무휴 상담 (08:00 ~ 20:00)
              </span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">바로가기</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => onSelectTab('about')} className="hover:text-white transition-colors">
                  회사소개
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('services')} className="hover:text-white transition-colors">
                  서비스 소개
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('regions')} className="hover:text-white transition-colors text-sky-400 font-medium">
                  서비스지역 (구단위 안내)
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('pricing')} className="hover:text-white transition-colors">
                  가격 안내 & 견적계산
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('cases')} className="hover:text-white transition-colors">
                  시공사례 (Before & After)
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('reviews')} className="hover:text-white transition-colors">
                  고객후기
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('faq')} className="hover:text-white transition-colors">
                  자주 묻는 질문
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact & Map Actions */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">고객센터 & 상담</h4>
            <div className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
              <Phone className="h-5 w-5 text-sky-400" />
              1588-7241
            </div>
            <p className="text-xs text-neutral-400">
              상담 가능 시간: 평일·주말 08:00 - 20:00<br />
              (점심시간 없이 실시간 상담 가능)
            </p>
            <div className="flex flex-col gap-2 pt-1">
              <button
                type="button"
                onClick={onOpenQuote}
                className="w-full py-2 px-3 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold transition-colors text-center"
              >
                온라인 무료 견적신청
              </button>
              <button
                type="button"
                onClick={onOpenKakao}
                className="w-full py-2 px-3 rounded-lg bg-[#FEE500] hover:bg-yellow-400 text-neutral-900 text-xs font-bold transition-colors text-center"
              >
                카카오톡 상담하기
              </button>
            </div>
          </div>
        </div>

        {/* Business Details & SEO Keywords */}
        <div className="py-6 text-xs text-neutral-400 space-y-2 border-b border-neutral-800">
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            <span>상호명: (주)클리어웍스</span>
            <span>대표자: 이정훈</span>
            <span>사업자등록번호: 214-88-91024</span>
            <span>통신판매업신고: 제2024-서울강남-1892호</span>
            <span>본사: 서울특별시 강남구 테헤란로 152 강남파이낸스센터 18층</span>
          </div>
          <p>
            출장 시공 가능 구역: 서울특별시 25개 구 전역(강남구, 서초구, 송파구, 마포구, 용산구, 성동구, 영등포구 등) 및 
            경기도(성남시 분당구, 고양시 일산동구, 용인시 수지구, 수원시 영통구, 하남시, 과천시 등), 인천광역시(연수구 송도, 남동구 등) 수도권 구단위 전지역.
          </p>
          <div className="flex items-center gap-4 pt-1 text-neutral-400">
            <span className="hover:text-neutral-200 cursor-pointer">개인정보처리방침</span>
            <span>·</span>
            <span className="hover:text-neutral-200 cursor-pointer">이용약관</span>
            <span>·</span>
            <span className="hover:text-neutral-200 cursor-pointer">배상책임보험 증권 확인</span>
            <span>·</span>
            <button
              onClick={() => onSelectTab('admin')}
              className="text-neutral-400 hover:text-white underline underline-offset-2"
            >
              관리자 로그인
            </button>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-400 gap-3">
          <div>© {new Date().getFullYear()} CLEARWORKS Co., Ltd. All rights reserved.</div>
          <div className="text-[11px] text-neutral-400">
            유리창청소 전문업체 상담 · 추천 · 비용 견적 · 고객후기 만족도 1위 클리어웍스
          </div>
        </div>
      </div>
    </footer>
  );
};
