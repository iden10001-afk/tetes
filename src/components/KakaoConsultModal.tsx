import React, { useState } from 'react';
import { X, Send, Phone, CheckCircle2, MessageCircle, Clock } from 'lucide-react';

interface KakaoConsultModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenQuickQuote: () => void;
}

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  time: string;
}

export const KakaoConsultModal: React.FC<KakaoConsultModalProps> = ({
  isOpen,
  onClose,
  onOpenQuickQuote
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm1',
      sender: 'bot',
      text: '안녕하세요! 서울·수도권 1등 유리창청소 전문업체 [클리어웍스]입니다. ✨\n\n거주 평형이나 상가 위치를 말씀해주시면 10분 내로 친절하고 정확한 견적을 안내해 드리겠습니다.',
      time: '방금 전'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  if (!isOpen) return null;

  const quickQuestions = [
    '아파트 34평형 외창+내창 견적 궁금해요',
    '이번 주말에 방문 가능한 일정 있나요?',
    '서울 마포구인데 출장비가 따로 있나요?',
    '상가 쇼윈도 정기관리 할인 얼마인가요?'
  ];

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text,
      time: '방금 전'
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      let botResponse = '문의 접수되었습니다. 고객님의 창문 상태에 딱 맞는 최적의 견적과 작업 일정을 확인하여 전담 담당자가 신속히 안내해 드리겠습니다. 보다 빠른 예약을 원하시면 아래 [무료 견적신청 폼]을 함께 이용해 주세요!';
      
      if (text.includes('견적')) {
        botResponse = '30평형대 기준 약 28만원 선(외창+내창+나노발수코팅 포함)이며, 창문 사진을 보내주시면 100% 정찰 확정 견적을 즉시 발급해 드립니다.';
      } else if (text.includes('일정') || text.includes('주말')) {
        botResponse = '주말 시공은 인기가 많아 3~5일 전 조기 마감될 수 있습니다. 현재 이번 주말 및 다음 주 평일 오전/오후 슬롯 예약 접수 중입니다!';
      } else if (text.includes('출장비') || text.includes('마포') || text.includes('서울')) {
        botResponse = '클리어웍스는 서울 25개 구 및 수도권 전지역에 직영팀이 상주하여 별도의 원거리 출장비가 발생하지 않습니다!';
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `b-${Date.now()}`,
          sender: 'bot',
          text: botResponse,
          time: '방금 전'
        }
      ]);
      setIsTyping(false);
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-[#BACEE0] shadow-2xl flex flex-col h-[600px] max-h-[90vh]">
        {/* Header */}
        <div className="bg-[#3A1D1D] text-white px-4 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FEE500] text-[#191919] font-bold text-lg shadow-xs">
              <MessageCircle className="h-5 w-5 fill-current" />
            </div>
            <div>
              <div className="font-bold text-sm text-white flex items-center gap-1.5">
                클리어웍스 카카오톡 상담
                <span className="text-[10px] bg-yellow-400 text-black px-1.5 py-0.2 rounded font-semibold">공식채널</span>
              </div>
              <div className="text-[11px] text-white/70 flex items-center gap-1">
                <Clock className="h-3 w-3" />
                평균 응답시간 5분 이내 (08:00~20:00)
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-white/80 hover:bg-white/10 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Notice Bar */}
        <div className="bg-amber-100/90 border-b border-amber-200 px-3 py-1.5 text-[11px] text-amber-900 flex items-center justify-between">
          <span className="flex items-center gap-1 truncate">
            <CheckCircle2 className="h-3.5 w-3.5 text-amber-700 shrink-0" />
            카카오톡 상담으로 사진을 보내주시면 즉시 확정 견적 안내
          </span>
          <a
            href="tel:1588-7241"
            className="flex items-center gap-1 font-bold text-sky-800 hover:underline shrink-0 ml-2"
          >
            <Phone className="h-3 w-3" />
            1588-7241
          </a>
        </div>

        {/* Message Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm leading-relaxed shadow-xs ${
                  m.sender === 'user'
                    ? 'bg-[#FEE500] text-[#191919] rounded-tr-none font-medium'
                    : 'bg-white text-neutral-800 rounded-tl-none'
                }`}
                style={{ whiteSpace: 'pre-line' }}
              >
                {m.text}
              </div>
              <span className="text-[10px] text-neutral-600 mt-1 px-1">{m.time}</span>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-1 bg-white/80 rounded-full px-3 py-1.5 w-fit text-xs text-neutral-500">
              <span className="animate-bounce">●</span>
              <span className="animate-bounce [animation-delay:0.2s]">●</span>
              <span className="animate-bounce [animation-delay:0.4s]">●</span>
              <span className="ml-1 text-[11px]">상담원 답변 작성 중...</span>
            </div>
          )}
        </div>

        {/* Quick Question Chips */}
        <div className="bg-white/90 border-t border-neutral-200 p-2.5">
          <div className="text-[10px] font-semibold text-neutral-500 mb-1.5">자주 묻는 질문 바로 누르기</div>
          <div className="flex gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSend(q)}
                className="whitespace-nowrap rounded-full bg-neutral-100 hover:bg-neutral-200 px-3 py-1 text-[11px] text-neutral-700 transition-colors shrink-0"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <div className="bg-white p-3 flex items-center gap-2 border-t border-neutral-200">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend(inputText)}
            placeholder="궁금하신 점이나 거주 평형을 입력해주세요"
            className="flex-1 rounded-xl border border-neutral-200 px-3 py-2 text-xs focus:border-neutral-900 focus:outline-hidden"
          />
          <button
            onClick={() => handleSend(inputText)}
            disabled={!inputText.trim()}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FEE500] text-[#191919] hover:bg-yellow-400 disabled:opacity-40 transition-colors"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>

        {/* Bottom Banner */}
        <div className="bg-neutral-900 text-white px-4 py-2 flex items-center justify-between text-xs">
          <span>상세 견적서 발송 및 예약이 필요하신가요?</span>
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenQuickQuote();
            }}
            className="font-semibold text-yellow-400 hover:underline"
          >
            무료 견적신청 →
          </button>
        </div>
      </div>
    </div>
  );
};
