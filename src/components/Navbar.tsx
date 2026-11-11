import React, { useState } from 'react';
import { Menu, X, PhoneCall, Sparkles, MapPin } from 'lucide-react';
import { NavTab } from '../types';
import { useStudio } from '../context/StudioContext';

interface NavbarProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  onOpenQuote: () => void;
  onOpenKakao: () => void;
  quoteCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  onOpenQuote,
  onOpenKakao,
  quoteCount
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { content } = useStudio();

  const navLinks: { tab: NavTab; label: string; badge?: string }[] = [
    { tab: 'about', label: '회사소개' },
    { tab: 'services', label: '서비스 소개' },
    { tab: 'regions', label: '서비스지역', badge: '구단위' },
    { tab: 'pricing', label: '가격 안내' },
    { tab: 'cases', label: '시공사례' },
    { tab: 'reviews', label: '고객후기' },
    { tab: 'faq', label: '자주 묻는 질문' },
    { tab: 'blog', label: '청소칼럼' }
  ];

  const handleNavClick = (tab: NavTab) => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200">
      {/* Top micro bar for quick tel & region awareness */}
      <div className="hidden lg:block bg-neutral-900 text-neutral-300 text-xs py-1.5 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-white font-medium flex items-center gap-1">
              <MapPin className="h-3 w-3 text-sky-400" />
              서울·수도권 구단위 전지역 방문 출장
            </span>
            <span className="text-neutral-600">|</span>
            <span className="text-neutral-400">현대해상 영업배상책임보험 1억원 가입</span>
            <span className="text-neutral-600">|</span>
            <span className="text-sky-400 font-medium">이달 한정: 나노 발수코팅 무상 시공</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleNavClick('regions')}
              className="text-neutral-300 hover:text-white transition-colors flex items-center gap-1"
            >
              <span>출장 가능 지역 검색</span>
            </button>
            <span className="text-neutral-600">|</span>
            <a href={`tel:${content.contactPhone}`} className="font-bold text-white hover:text-sky-300 flex items-center gap-1.5">
              <PhoneCall className="h-3 w-3 text-sky-400" />
              {content.contactPhone}
            </a>
          </div>
        </div>
      </div>

      {/* Main Bar complying with Top Bar Contract */}
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-6 px-4 sm:px-6 py-3.5">
        {/* Zone 1: Brand wordmark (single text element) */}
        <button
          onClick={() => handleNavClick('home')}
          className="text-xl sm:text-2xl font-black tracking-tight text-neutral-900 whitespace-nowrap shrink-0 flex items-center gap-1.5"
        >
          <span className="text-sky-600">CLEAR</span>WORKS
          <span className="text-xs font-semibold text-neutral-500 hidden sm:inline ml-1 font-sans">
            {content.brandName}
          </span>
        </button>

        {/* Zone 2: Navigation Links (Now including '서비스지역' prominently) */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-7 text-sm font-medium text-neutral-600">
          {navLinks.map((link) => (
            <button
              key={link.tab}
              onClick={() => handleNavClick(link.tab)}
              className={`whitespace-nowrap shrink-0 transition-colors py-1 flex items-center gap-1.5 ${
                currentTab === link.tab
                  ? 'text-sky-600 font-bold border-b-2 border-sky-600'
                  : 'text-neutral-700 hover:text-neutral-950'
              }`}
            >
              <span>{link.label}</span>
              {link.badge && (
                <span className="text-[10px] bg-sky-100 text-sky-700 font-bold px-1.5 py-0.2 rounded-full">
                  {link.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Zone 3: Actions (Clean commercial conversion CTA, no intrusive edit mode button) */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onOpenKakao}
            className="hidden sm:inline-flex items-center justify-center px-3.5 py-2 text-xs font-semibold text-neutral-800 bg-[#FEE500] hover:bg-yellow-400 rounded-lg transition-colors whitespace-nowrap shrink-0"
          >
            카카오톡 상담
          </button>
          <button
            onClick={onOpenQuote}
            className="px-4 py-2 text-xs font-bold text-white bg-sky-600 hover:bg-sky-500 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-xs"
          >
            무료 견적신청
          </button>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-neutral-700 hover:bg-neutral-100 rounded-lg"
            aria-label="메뉴 열기"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-neutral-200 px-4 py-4 space-y-3 shadow-lg">
          <div className="grid grid-cols-2 gap-2 text-sm font-medium">
            <button
              onClick={() => handleNavClick('home')}
              className={`p-2.5 rounded-lg text-left ${currentTab === 'home' ? 'bg-sky-50 text-sky-800 font-bold' : 'text-neutral-700 hover:bg-neutral-50'}`}
            >
              메인 홈
            </button>
            <button
              onClick={() => handleNavClick('booking')}
              className={`p-2.5 rounded-lg text-left ${currentTab === 'booking' ? 'bg-sky-50 text-sky-800 font-bold' : 'text-neutral-700 hover:bg-neutral-50'}`}
            >
              견적·예약하기
            </button>
            {navLinks.map((link) => (
              <button
                key={link.tab}
                onClick={() => handleNavClick(link.tab)}
                className={`p-2.5 rounded-lg text-left flex items-center justify-between ${currentTab === link.tab ? 'bg-sky-50 text-sky-800 font-bold' : 'text-neutral-700 hover:bg-neutral-50'}`}
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className="text-[10px] bg-sky-100 text-sky-700 font-bold px-1.5 py-0.2 rounded-full">
                    {link.badge}
                  </span>
                )}
              </button>
            ))}
            <button
              onClick={() => handleNavClick('notices')}
              className={`p-2.5 rounded-lg text-left ${currentTab === 'notices' ? 'bg-sky-50 text-sky-800 font-bold' : 'text-neutral-700 hover:bg-neutral-50'}`}
            >
              공지사항
            </button>
          </div>

          <div className="pt-2 border-t border-neutral-100 flex gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenKakao();
              }}
              className="flex-1 py-2.5 rounded-xl bg-[#FEE500] text-[#191919] font-bold text-xs text-center"
            >
              카카오톡 상담하기
            </button>
            <a
              href={`tel:${content.contactPhone}`}
              className="flex-1 py-2.5 rounded-xl bg-neutral-900 text-white font-bold text-xs text-center flex items-center justify-center gap-1"
            >
              <PhoneCall className="h-3.5 w-3.5" />
              {content.contactPhone}
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
