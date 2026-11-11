import React from 'react';
import { ShieldCheck, Award, Droplets, CheckCircle2, ArrowRight, MapPin, Users, HeartHandshake } from 'lucide-react';
import { CRAFTSMAN_IMAGE, HERO_IMAGE, STOREFRONT_IMAGE } from '../data/mockData';

interface AboutViewProps {
  onOpenQuote: () => void;
  onOpenKakao: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onOpenQuote, onOpenKakao }) => {
  return (
    <div className="space-y-16 lg:space-y-24 py-6">
      {/* Visual Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-700 bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
            <span>서울·수도권 1등 유리창청소 전문업체</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
            클리어웍스 회사소개
          </h1>
          <p className="text-base sm:text-lg text-neutral-600 leading-relaxed">
            "창문은 바깥 세상을 바라보는 집의 눈입니다."<br />
            클리어웍스는 첨단 순수 정수 기술과 정직한 장인 정신으로 고객님의 소중한 조망권을 맑고 투명하게 지켜드립니다.
          </p>
        </div>
      </section>

      {/* Brand Story & Philosophy */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-5">
            <div className="text-xs font-bold text-sky-600 tracking-wider uppercase">우리의 철학</div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 leading-tight">
              걸레질이 아닌 ‘광학 복원’<br />
              클리어웍스의 기준은 다릅니다
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
              수많은 청소업체가 있지만, 유리창만을 깊이 있게 연구하고 전용 장비를 운용하는 전문업체는 드뭅니다.
              단순히 세제 거품을 내고 닦아내면 몇 주 지나지 않아 백화 얼룩이 번지기 마련입니다.
            </p>
            <p className="text-sm text-neutral-600 leading-relaxed">
              클리어웍스는 유리에 단 0.1mm의 스크래치도 허용하지 않는 독일 전문 스퀴지와 0 TDS 순수 정수 필터링 시스템을 도입하여, 시공 직후뿐만 아니라 수개월 동안 맑고 깨끗한 시야가 유지되도록 과학적으로 접근합니다.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-neutral-100 border border-neutral-200 space-y-1">
                <div className="text-2xl font-black text-sky-600 font-mono">3,500+</div>
                <div className="text-xs font-bold text-neutral-800">누적 시공 세대</div>
                <div className="text-[11px] text-neutral-500">아파트·상가·오피스</div>
              </div>
              <div className="p-4 rounded-xl bg-neutral-100 border border-neutral-200 space-y-1">
                <div className="text-2xl font-black text-emerald-600 font-mono">94.8%</div>
                <div className="text-xs font-bold text-neutral-800">지인 추천 및 재이용율</div>
                <div className="text-[11px] text-neutral-500">수도권 기준 최상위</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-2xl overflow-hidden border border-neutral-200 shadow-lg">
              <img
                src={CRAFTSMAN_IMAGE}
                alt="클리어웍스 전문 작업자 시공 모습"
                referrerPolicy="no-referrer"
                className="w-full h-[400px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4 Core Pillars of Trust */}
      <section className="bg-neutral-100 py-16 border-y border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <div className="text-xs font-bold text-sky-600 tracking-wider uppercase">고객과의 4가지 약속</div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900">
              클리어웍스가 신뢰받는 이유
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-xs space-y-3">
              <div className="h-10 w-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-base text-neutral-900">현대해상 1억원 배상보험</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                작업 중 만에 하나 일어날 수 있는 창호 및 내부 기물 손상에 대비하여 업계 최고 수준의 배상보험에 가입되어 있습니다.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-xs space-y-3">
              <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Droplets className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-base text-neutral-900">독일 Unger 정수 시스템</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                미네랄과 불순물을 0%로 걸러낸 초순수를 사용해 건조 후 물자국이 일절 남지 않으며 친환경 생분해 세제를 고집합니다.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-xs space-y-3">
              <div className="h-10 w-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Users className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-base text-neutral-900">100% 직영 마스터 팀</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                하도급 없이 본사 전문 교육을 정식 수료한 2인 1조 마스터가 방문하여 시작부터 끝까지 책임 시공합니다.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-xs space-y-3">
              <div className="h-10 w-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <HeartHandshake className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-base text-neutral-900">시공 후 7일 안심 A/S</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                시공 완료 후 미흡한 부분이 발견되면 7일 이내 무상 방문 리터치를 약속드리는 철저한 사후관리를 보증합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Regional Network Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="rounded-2xl border border-neutral-200 bg-white p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-neutral-900">서울·수도권 구단위 전지역 방문 출장 안내</h3>
              <p className="text-xs text-neutral-500">추가 출장비 없이 본사 직영팀이 신속히 찾아갑니다</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-neutral-600 pt-2 border-t border-neutral-100">
            <div className="space-y-1.5">
              <div className="font-bold text-neutral-900 text-sm">서울특별시 (25개 구 전역)</div>
              <p className="leading-relaxed">
                강남구, 서초구, 송파구, 강동구, 마포구, 용산구, 성동구, 광진구, 영등포구, 양천구, 동작구, 관악구, 서대문구, 종로구, 중구, 동대문구, 노원구, 도봉구, 강북구, 성북구, 중랑구, 은평구, 강서구, 구로구, 금천구
              </p>
            </div>
            <div className="space-y-1.5">
              <div className="font-bold text-neutral-900 text-sm">경기도 주요 시·구</div>
              <p className="leading-relaxed">
                성남시 분당·수정·중원, 용인시 수지·기흥, 수원시 영통·팔달·장안, 고양시 일산동·서구, 하남시 미사·위례, 과천시, 광명시, 안양시 동안·만안, 부천시, 화성시 동탄 등
              </p>
            </div>
            <div className="space-y-1.5">
              <div className="font-bold text-neutral-900 text-sm">인천광역시 전역</div>
              <p className="leading-relaxed">
                연수구 (송도국제도시), 서구 (청라·검단), 남동구, 부평구, 미추홀구, 중구 영종국제도시 등
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="rounded-2xl bg-sky-600 text-white p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold">유리창청소 전문업체 상담이 필요하신가요?</h3>
            <p className="text-xs sm:text-sm text-sky-100 mt-1">
              창문 사진 1장으로 10분 내 100% 확정 견적을 받아보세요.
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <button
              onClick={onOpenQuote}
              className="px-5 py-3 rounded-xl bg-white text-sky-900 font-bold text-xs sm:text-sm hover:bg-neutral-100 transition-colors shadow-xs"
            >
              무료 견적신청
            </button>
            <button
              onClick={onOpenKakao}
              className="px-4 py-3 rounded-xl bg-[#FEE500] text-[#191919] font-bold text-xs sm:text-sm hover:bg-yellow-400 transition-colors"
            >
              카카오톡 문의
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
