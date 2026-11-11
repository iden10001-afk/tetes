import React from 'react';
import { Phone, MessageCircle, FileText } from 'lucide-react';

interface MobileStickyCTAProps {
  onOpenKakao: () => void;
  onOpenQuote: () => void;
}

export const MobileStickyCTA: React.FC<MobileStickyCTAProps> = ({
  onOpenKakao,
  onOpenQuote
}) => {
  return (
    <div className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-white/95 backdrop-blur-md border-t border-neutral-200 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] px-3 py-2">
      <div className="grid grid-cols-3 gap-2 max-w-md mx-auto h-12">
        {/* 1. Phone inquiry */}
        <a
          href="tel:1588-7241"
          className="flex flex-col items-center justify-center rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 transition-colors"
        >
          <Phone className="h-4 w-4 text-neutral-700" />
          <span className="text-[11px] font-semibold mt-0.5 whitespace-nowrap">전화문의</span>
        </a>

        {/* 2. KakaoTalk consultation */}
        <button
          type="button"
          onClick={onOpenKakao}
          className="flex flex-col items-center justify-center rounded-xl bg-[#FEE500] hover:bg-yellow-400 text-[#191919] transition-colors"
        >
          <MessageCircle className="h-4 w-4 fill-current" />
          <span className="text-[11px] font-bold mt-0.5 whitespace-nowrap">카카오톡 문의</span>
        </button>

        {/* 3. Free quote request */}
        <button
          type="button"
          onClick={onOpenQuote}
          className="flex flex-col items-center justify-center rounded-xl bg-sky-600 hover:bg-sky-500 text-white transition-colors shadow-xs"
        >
          <FileText className="h-4 w-4" />
          <span className="text-[11px] font-bold mt-0.5 whitespace-nowrap">무료견적</span>
        </button>
      </div>
    </div>
  );
};
