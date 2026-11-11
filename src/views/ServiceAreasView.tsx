import React, { useState, useMemo } from 'react';
import { 
  MapPin, 
  Search, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  PhoneCall, 
  MessageCircle, 
  Sparkles, 
  Layers, 
  Truck, 
  Building, 
  Compass,
  Star,
  ChevronRight,
  Filter,
  Check,
  HelpCircle,
  ExternalLink
} from 'lucide-react';
import { NavTab } from '../types';
import { useStudio } from '../context/StudioContext';
import { StudioEditable } from '../components/StudioEditable';

export interface DetailedDistrict {
  id: string;
  name: string;
  regionCategory: 'seoul' | 'gyeonggi' | 'incheon';
  regionCategoryLabel: string;
  cluster: string;
  clusterBadgeColor: string;
  majorDongs: string[];
  landmarkComplexes: string[];
  careSpecialty: string;
  specialtyTag: string;
  dispatchTime: string;
  isPopular?: boolean;
}

export const DETAILED_DISTRICTS: DetailedDistrict[] = [
  // ==========================================
  // 1. 서울특별시 (25개 자치구 전체)
  // ==========================================
  // [서울 강남 4구]
  {
    id: 'seoul-gangnam',
    name: '서울 강남구',
    regionCategory: 'seoul',
    regionCategoryLabel: '서울특별시',
    cluster: '강남 4구',
    clusterBadgeColor: 'bg-sky-100 text-sky-800 border-sky-200',
    majorDongs: ['압구정동', '청담동', '대치동', '역삼동', '도곡동', '개포동', '일원동', '수서동', '삼성동', '논현동'],
    landmarkComplexes: ['디에이치아너힐즈', '래미안대치팰리스', '압구정현대', '타워팰리스', '개포자이프레지던스'],
    careSpecialty: '하이엔드 대단지 아파트 및 테라스·루프탑 통유리 조망 광학 복원, 9H 실리카 나노코팅',
    specialtyTag: '초고층 파노라마뷰 · 나노발수코팅 특화',
    dispatchTime: '30분 내 배차',
    isPopular: true
  },
  {
    id: 'seoul-seocho',
    name: '서울 서초구',
    regionCategory: 'seoul',
    regionCategoryLabel: '서울특별시',
    cluster: '강남 4구',
    clusterBadgeColor: 'bg-sky-100 text-sky-800 border-sky-200',
    majorDongs: ['반포동', '서초동', '잠원동', '방배동', '양재동', '우면동', '내곡동'],
    landmarkComplexes: ['아크로리버파크', '래미안원베일리', '반포자이', '래미안퍼스티지', '래미안리더스원'],
    careSpecialty: '한강 조망창 묵은 석회수 물때 정밀 화학 박리, 하부 3중 방수 보양 아랫집 물튐 방지',
    specialtyTag: '한강뷰 복원 · 무수분 스퀴지 공법',
    dispatchTime: '30분 내 배차',
    isPopular: true
  },
  {
    id: 'seoul-songpa',
    name: '서울 송파구',
    regionCategory: 'seoul',
    regionCategoryLabel: '서울특별시',
    cluster: '강남 4구',
    clusterBadgeColor: 'bg-sky-100 text-sky-800 border-sky-200',
    majorDongs: ['잠실동', '가락동', '문정동', '방이동', '신천동', '장지동', '오금동', '송파동', '풍납동'],
    landmarkComplexes: ['잠실엘스', '리센츠', '트리지움', '헬리오시티', '파크리오', '시그니엘'],
    careSpecialty: '롯데타워 조망 파노라마 거실창 및 9,500세대급 대단지 아파트 외창 올인원 케어',
    specialtyTag: '대단지 집중케어 · 시야 투과율 99%',
    dispatchTime: '30분 내 배차',
    isPopular: true
  },
  {
    id: 'seoul-gangdong',
    name: '서울 강동구',
    regionCategory: 'seoul',
    regionCategoryLabel: '서울특별시',
    cluster: '강남 4구',
    clusterBadgeColor: 'bg-sky-100 text-sky-800 border-sky-200',
    majorDongs: ['고덕동', '둔촌동', '상일동', '명일동', '천호동', '암사동', '강일동', '성내동'],
    landmarkComplexes: ['올림픽파크포레온', '고덕그라시움', '고덕아르테온', '고덕센트럴아이파크'],
    careSpecialty: '신축 1만 2천 세대 입주 단지 시멘트 가루 및 공사 분진 무스크래치 글라스 복원',
    specialtyTag: '신축 입주창 분진 제거 특화',
    dispatchTime: '35분 내 배차',
    isPopular: true
  },

  // [서울 도심·용산·성동권]
  {
    id: 'seoul-yongsan',
    name: '서울 용산구',
    regionCategory: 'seoul',
    regionCategoryLabel: '서울특별시',
    cluster: '도심·용산권',
    clusterBadgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    majorDongs: ['한남동', '이촌동', '원효로동', '한강로동', '이태원동', '서빙고동', '후암동', '청파동'],
    landmarkComplexes: ['한남더힐', '나인원한남', '래미안첼리투스', '용산센트럴파크해링턴스퀘어'],
    careSpecialty: '최고급 테라스 주택 및 한강변 초고층 첼리투스 0 TDS 초순수 정수 세정',
    specialtyTag: '최고급 주거단지 · 0 TDS 순수 정수',
    dispatchTime: '30분 내 배차',
    isPopular: true
  },
  {
    id: 'seoul-mapo',
    name: '서울 마포구',
    regionCategory: 'seoul',
    regionCategoryLabel: '서울특별시',
    cluster: '도심·용산권',
    clusterBadgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    majorDongs: ['상암동', '공덕동', '아현동', '연남동', '망원동', '합정동', '성산동', '도화동'],
    landmarkComplexes: ['마포래미안푸르지오(마프)', '마포프레스티지자이', '상암DMC단지', '공덕자이'],
    careSpecialty: '강바람 유막 제거 및 연남/합정/홍대 1층 카페 쇼윈도 손지문 관리',
    specialtyTag: '한강변 유막 박리 · 상가 쇼윈도',
    dispatchTime: '30분 내 배차',
    isPopular: true
  },
  {
    id: 'seoul-seongdong',
    name: '서울 성동구',
    regionCategory: 'seoul',
    regionCategoryLabel: '서울특별시',
    cluster: '도심·용산권',
    clusterBadgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    majorDongs: ['성수동1·2가', '옥수동', '금호동', '왕십리동', '행당동', '응봉동', '마장동'],
    landmarkComplexes: ['아크로서울포레스트', '트리마제', '갤러리아포레', '옥수파크힐스', '서울숲리버뷰자이'],
    careSpecialty: '성수 파노라마 서울숲 뷰 통유리창 및 갤러리/스튜디오 대형 글라스 광택 복원',
    specialtyTag: '서울숲 뷰 통유리 · 실리카 발수코팅',
    dispatchTime: '30분 내 배차',
    isPopular: true
  },
  {
    id: 'seoul-gwangjin',
    name: '서울 광진구',
    regionCategory: 'seoul',
    regionCategoryLabel: '서울특별시',
    cluster: '도심·용산권',
    clusterBadgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    majorDongs: ['자양동', '구의동', '광장동', '화양동', '능동', '중곡동', '군자동'],
    landmarkComplexes: ['더샵스타시티', '광장힐스테이트', '자양우성', '래미안프리미어팰리스'],
    careSpecialty: '뚝섬 한강공원 앞 주상복합 및 광장동 학군 아파트 외창 난간대 먼지 세척',
    specialtyTag: '한강 조망권 복원 · 주상복합',
    dispatchTime: '35분 내 배차'
  },
  {
    id: 'seoul-jongno',
    name: '서울 종로구',
    regionCategory: 'seoul',
    regionCategoryLabel: '서울특별시',
    cluster: '도심·용산권',
    clusterBadgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    majorDongs: ['평창동', '구기동', '인사동', '혜화동', '가회동', '삼청동', '숭인동', '무악동'],
    landmarkComplexes: ['평창동 단독주택단지', '경희궁자이', '인왕산아이파크', '무악현대'],
    careSpecialty: '평창동·구기동 고급 단독주택 광폭 정원창 및 경희궁자이 대단지 외창',
    specialtyTag: '단독 타운하우스 & 도심 아파트',
    dispatchTime: '35분 내 배차'
  },
  {
    id: 'seoul-junggu',
    name: '서울 중구',
    regionCategory: 'seoul',
    regionCategoryLabel: '서울특별시',
    cluster: '도심·용산권',
    clusterBadgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    majorDongs: ['명동', '을지로', '신당동', '회현동', '황학동', '중림동', '장충동'],
    landmarkComplexes: ['남산롯데캐슬아이리스', '남산센트럴자이', '신당청구e편한세상'],
    careSpecialty: '도심 대형 오피스 빌딩 로비 쇼윈도 정기관련 및 남산 뷰 아파트 외창 케어',
    specialtyTag: '빌딩 오피스 · 남산뷰 아파트',
    dispatchTime: '35분 내 배차'
  },

  // [서울 서남권]
  {
    id: 'seoul-yeongdeungpo',
    name: '서울 영등포구',
    regionCategory: 'seoul',
    regionCategoryLabel: '서울특별시',
    cluster: '서남권',
    clusterBadgeColor: 'bg-teal-100 text-teal-800 border-teal-200',
    majorDongs: ['여의도동', '문래동', '당산동', '신길동', '영등포동', '양평동', '대림동'],
    landmarkComplexes: ['브라이튼여의도', '여의도더샵아일랜드', '아크로타워스퀘어', '보라매SK뷰'],
    careSpecialty: '여의도 초고층 주상복합 외창 특수 장비 케어 및 당산/문래 신축 아파트',
    specialtyTag: '여의도 고층 주상복합 특화',
    dispatchTime: '30분 내 배차',
    isPopular: true
  },
  {
    id: 'seoul-yangcheon',
    name: '서울 양천구',
    regionCategory: 'seoul',
    regionCategoryLabel: '서울특별시',
    cluster: '서남권',
    clusterBadgeColor: 'bg-teal-100 text-teal-800 border-teal-200',
    majorDongs: ['목동', '신정동', '신월동'],
    landmarkComplexes: ['목동신시가지 1~14단지', '목동하이페리온', '목동트라팰리스', '목동힐스테이트'],
    careSpecialty: '목동 신시가지 대단지 아파트 15년 이상 고착된 알칼리성 백화 물때 화학 연화 박리',
    specialtyTag: '목동 대단지 묵은물때 완전박리',
    dispatchTime: '35분 내 배차',
    isPopular: true
  },
  {
    id: 'seoul-dongjak',
    name: '서울 동작구',
    regionCategory: 'seoul',
    regionCategoryLabel: '서울특별시',
    cluster: '서남권',
    clusterBadgeColor: 'bg-teal-100 text-teal-800 border-teal-200',
    majorDongs: ['흑석동', '노량진동', '상도동', '사당동', '대방동', '신대방동'],
    landmarkComplexes: ['아크로리버하임', '흑석자이', '상도역롯데캐슬파크엘', '이수푸르지오'],
    careSpecialty: '흑석 아크로 등 한강변 아파트 조망창 및 이중창 난간 틈새 먼지 완벽 세척',
    specialtyTag: '한강 조망창 & 난간창 케어',
    dispatchTime: '35분 내 배차'
  },
  {
    id: 'seoul-gangseo',
    name: '서울 강서구',
    regionCategory: 'seoul',
    regionCategoryLabel: '서울특별시',
    cluster: '서남권',
    clusterBadgeColor: 'bg-teal-100 text-teal-800 border-teal-200',
    majorDongs: ['마곡동', '화곡동', '등촌동', '염창동', '가양동', '방화동', '공항동'],
    landmarkComplexes: ['마곡엠밸리 1~15단지', '마곡힐스테이트', '강서한강자이', '염창e편한세상'],
    careSpecialty: '마곡 신도시 R&D 센터 및 엠밸리 대단지 통유리창 물때 제거',
    specialtyTag: '마곡 신도시 대단지 특화',
    dispatchTime: '35분 내 배차'
  },
  {
    id: 'seoul-guro',
    name: '서울 구로구',
    regionCategory: 'seoul',
    regionCategoryLabel: '서울특별시',
    cluster: '서남권',
    clusterBadgeColor: 'bg-teal-100 text-teal-800 border-teal-200',
    majorDongs: ['신도림동', '구로동', '고척동', '오류동', '개봉동', '천왕동', '항동'],
    landmarkComplexes: ['디큐브시티', '신도림대림e편한세상', '고척아이파크', '항동하버라인'],
    careSpecialty: '신도림 디큐브시티 등 51층 고층 주상복합 및 고척 신축 아파트 외창',
    specialtyTag: '역세권 고층 주상복합',
    dispatchTime: '40분 내 배차'
  },
  {
    id: 'seoul-geumcheon',
    name: '서울 금천구',
    regionCategory: 'seoul',
    regionCategoryLabel: '서울특별시',
    cluster: '서남권',
    clusterBadgeColor: 'bg-teal-100 text-teal-800 border-teal-200',
    majorDongs: ['가산동', '독산동', '시흥동'],
    landmarkComplexes: ['롯데캐슬골드파크 1~4차', '남서울힐스테이트', '금천현대'],
    careSpecialty: 'G밸리 지식산업센터 사옥 통유리 및 독산 롯데캐슬 4,400세대 올인원 케어',
    specialtyTag: '지식산업센터 & 대단지',
    dispatchTime: '40분 내 배차'
  },
  {
    id: 'seoul-gwanak',
    name: '서울 관악구',
    regionCategory: 'seoul',
    regionCategoryLabel: '서울특별시',
    cluster: '서남권',
    clusterBadgeColor: 'bg-teal-100 text-teal-800 border-teal-200',
    majorDongs: ['봉천동', '신림동', '남현동', '보라매동'],
    landmarkComplexes: ['e편한세상서울대입구', '관악푸르지오', '신림현대', '보라매삼성쉐르빌'],
    careSpecialty: '관악산 숲세권 아파트 송화가루 및 빌라 발코니창 외창 복원',
    specialtyTag: '숲세권 분진 복원',
    dispatchTime: '40분 내 배차'
  },

  // [서울 동북·서북권]
  {
    id: 'seoul-seodaemun',
    name: '서울 서대문구',
    regionCategory: 'seoul',
    regionCategoryLabel: '서울특별시',
    cluster: '동북·서북권',
    clusterBadgeColor: 'bg-purple-100 text-purple-800 border-purple-200',
    majorDongs: ['남가좌동', '북가좌동', '연희동', '신촌동', '홍제동', '홍은동', '충정로'],
    landmarkComplexes: ['DMC파크뷰자이', 'DMC래미안e편한세상', '홍제원아이파크', 'e편한세상신촌'],
    careSpecialty: '가재울 뉴타운 1만여 세대 대단지 아파트 및 연희동 단독주택 통유리창',
    specialtyTag: '가재울 뉴타운 대단지',
    dispatchTime: '40분 내 배차'
  },
  {
    id: 'seoul-eunpyeong',
    name: '서울 은평구',
    regionCategory: 'seoul',
    regionCategoryLabel: '서울특별시',
    cluster: '동북·서북권',
    clusterBadgeColor: 'bg-purple-100 text-purple-800 border-purple-200',
    majorDongs: ['진관동(은평뉴타운)', '불광동', '녹번동', '응암동', '수색동', '역촌동', '갈현동'],
    landmarkComplexes: ['은평뉴타운 박석고개/제각말', '녹번역e편한세상캐슬', 'DMC롯데캐슬더퍼스트', '백련산파크자이'],
    careSpecialty: '북한산 뷰 파노라마 은평뉴타운 테라스하우스 및 수색증산 뉴타운 신축 외창',
    specialtyTag: '북한산 뷰 파노라마창',
    dispatchTime: '40분 내 배차'
  },
  {
    id: 'seoul-dongdaemun',
    name: '서울 동대문구',
    regionCategory: 'seoul',
    regionCategoryLabel: '서울특별시',
    cluster: '동북·서북권',
    clusterBadgeColor: 'bg-purple-100 text-purple-800 border-purple-200',
    majorDongs: ['전농동', '답십리동', '청량리동', '이문동', '휘경동', '장안동', '제기동'],
    landmarkComplexes: ['청량리역롯데캐슬SKY-L65', '래미안크레시티', '답십리래미안위브', '이문아이파크자이'],
    careSpecialty: '청량리 65층 랜드마크 초고층 주상복합 및 답십리/전농 뉴타운 아파트',
    specialtyTag: '초고층 랜드마크 · 뉴타운',
    dispatchTime: '40분 내 배차'
  },
  {
    id: 'seoul-seongbuk',
    name: '서울 성북구',
    regionCategory: 'seoul',
    regionCategoryLabel: '서울특별시',
    cluster: '동북·서북권',
    clusterBadgeColor: 'bg-purple-100 text-purple-800 border-purple-200',
    majorDongs: ['성북동', '길음동', '종암동', '돈암동', '정릉동', '석관동', '보문동'],
    landmarkComplexes: ['성북동 고급주택가', '래미안길음센터피스', '길음뉴타운 1~9단지', '래미안아트리치'],
    careSpecialty: '성북동 대저택 정원 조망창 및 길음뉴타운 30~50평형대 집중 시공',
    specialtyTag: '고급단독주택 & 길음뉴타운',
    dispatchTime: '40분 내 배차'
  },
  {
    id: 'seoul-nowon',
    name: '서울 노원구',
    regionCategory: 'seoul',
    regionCategoryLabel: '서울특별시',
    cluster: '동북·서북권',
    clusterBadgeColor: 'bg-purple-100 text-purple-800 border-purple-200',
    majorDongs: ['상계동', '중계동', '하계동', '공릉동', '월계동'],
    landmarkComplexes: ['노원포레나', '중계주공5단지', '상계주공 1~16단지', '꿈의숲아이파크'],
    careSpecialty: '노원 대단지 아파트 15~20년 묵은 고착 매연 유막을 전용 산성/중성 2단계 박리',
    specialtyTag: '구축 대단지 묵은때 박리 전문',
    dispatchTime: '40분 내 배차',
    isPopular: true
  },
  {
    id: 'seoul-dobong',
    name: '서울 도봉구',
    regionCategory: 'seoul',
    regionCategoryLabel: '서울특별시',
    cluster: '동북·서북권',
    clusterBadgeColor: 'bg-purple-100 text-purple-800 border-purple-200',
    majorDongs: ['창동', '쌍문동', '방학동', '도봉동'],
    landmarkComplexes: ['창동주공 1~19단지', '북한산아이파크', '쌍문삼성래미안'],
    careSpecialty: '도봉산 조망 아파트 및 창동 역세권 신축 아파트 발코니창 세정',
    specialtyTag: '도봉산 조망권 복원',
    dispatchTime: '45분 내 배차'
  },
  {
    id: 'seoul-gangbuk',
    name: '서울 강북구',
    regionCategory: 'seoul',
    regionCategoryLabel: '서울특별시',
    cluster: '동북·서북권',
    clusterBadgeColor: 'bg-purple-100 text-purple-800 border-purple-200',
    majorDongs: ['미아동', '번동', '수유동', '우이동'],
    landmarkComplexes: ['꿈의숲효성해링턴', '미아래미안트리베라', 'SK북한산시티'],
    careSpecialty: '미아뉴타운 대단지 및 5,000세대 SK북한산시티 아파트 외창 정밀 클리닝',
    specialtyTag: '미아뉴타운 대단지',
    dispatchTime: '45분 내 배차'
  },
  {
    id: 'seoul-jungnang',
    name: '서울 중랑구',
    regionCategory: 'seoul',
    regionCategoryLabel: '서울특별시',
    cluster: '동북·서북권',
    clusterBadgeColor: 'bg-purple-100 text-purple-800 border-purple-200',
    majorDongs: ['상봉동', '묵동', '면목동', '신내동', '망우동', '중화동'],
    landmarkComplexes: ['상봉프레미어스엠코', '신내우디안', '사가정센트럴아이파크'],
    careSpecialty: '상봉 초고층 주상복합 통유리 및 신내 택지지구 아파트 발수코팅',
    specialtyTag: '상봉 주상복합 & 아파트',
    dispatchTime: '45분 내 배차'
  },

  // ==========================================
  // 2. 경기도 (구·시 단위 19개 핵심 지역)
  // ==========================================
  // [경기 남부 신도시·테크노 거점]
  {
    id: 'gyeonggi-bundang',
    name: '경기 성남시 분당구',
    regionCategory: 'gyeonggi',
    regionCategoryLabel: '경기도',
    cluster: '경기 남부 테크노 거점',
    clusterBadgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    majorDongs: ['판교(백현동, 삼평동, 운중동, 판교동)', '정자동', '수내동', '서현동', '이매동', '야탑동', '구미동', '금곡동'],
    landmarkComplexes: ['판교알파리움', '백현마을 1~9단지', '정자파크뷰', '정자아이파크', '분당파크타운'],
    careSpecialty: '판교 알파리움·정자 파크뷰 등 50평형 이상 대형 평형 및 판교테크노밸리 사옥 통유리',
    specialtyTag: '판교·정자 대형평형 & 사옥 통유리',
    dispatchTime: '30분 내 배차',
    isPopular: true
  },
  {
    id: 'gyeonggi-seongnam-other',
    name: '경기 성남시 수정·중원구',
    regionCategory: 'gyeonggi',
    regionCategoryLabel: '경기도',
    cluster: '경기 남부 테크노 거점',
    clusterBadgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    majorDongs: ['위례신도시(창곡동)', '신흥동', '산성동', '태평동', '여수동', '도촌동', '금광동', '은행동'],
    landmarkComplexes: ['위례자연앤자이', '산성역포레스티아', '산성역자이푸르지오', '중원e편한세상금광'],
    careSpecialty: '위례신도시 대단지 아파트 및 산성역 대규모 재개발 신축 단지 외창 클리닝',
    specialtyTag: '위례신도시 전문 출동',
    dispatchTime: '35분 내 배차'
  },
  {
    id: 'gyeonggi-suwon-yeongtong',
    name: '경기 수원시 영통구 (광교신도시)',
    regionCategory: 'gyeonggi',
    regionCategoryLabel: '경기도',
    cluster: '경기 남부 테크노 거점',
    clusterBadgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    majorDongs: ['이의동(광교)', '하동(광교호수공원)', '원천동', '매탄동', '영통동', '망포동', '신동'],
    landmarkComplexes: ['광교중흥S클래스', '광교자연앤힐스테이트', '광교아이파크', '힐스테이트광교', '영통아이파크캐슬'],
    careSpecialty: '광교호수공원 파노라마 전망창 묵은 때 복원 및 광교 갤러리아 주변 상가 쇼윈도',
    specialtyTag: '광교호수공원 전망창 특화',
    dispatchTime: '35분 내 배차',
    isPopular: true
  },
  {
    id: 'gyeonggi-suwon-other',
    name: '경기 수원시 팔달·권선·장안구',
    regionCategory: 'gyeonggi',
    regionCategoryLabel: '경기도',
    cluster: '경기 남부 테크노 거점',
    clusterBadgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    majorDongs: ['화서동', '인계동', '매교동', '호매실동', '금곡동', '권선동', '정자동', '조원동', '천천동'],
    landmarkComplexes: ['화서역파크푸르지오', '매교역푸르지오SK뷰', '수원SK스카이뷰', '호매실GS자이'],
    careSpecialty: '화서역 신축 대단지 스타필드 인근 및 수원 전지역 출장비 0원 정찰 시공',
    specialtyTag: '수원 전지역 출장비 0원',
    dispatchTime: '40분 내 배차'
  },
  {
    id: 'gyeonggi-yongin-suji',
    name: '경기 용인시 수지구',
    regionCategory: 'gyeonggi',
    regionCategoryLabel: '경기도',
    cluster: '경기 남부 테크노 거점',
    clusterBadgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    majorDongs: ['성복동', '신봉동', '동천동', '풍덕천동', '상현동', '죽전동', '고기동'],
    landmarkComplexes: ['성복힐스테이트 1~3차', '성복자이 1~2차', '수지푸르지오월드마크', '동천자이', '죽전힐스테이트'],
    careSpecialty: '수지 성복동 50~70평형 대형 평형, 고기동 단독 타운하우스 고소작업 안전 시공',
    specialtyTag: '수지 대형평형 & 타운하우스',
    dispatchTime: '30분 내 배차',
    isPopular: true
  },
  {
    id: 'gyeonggi-yongin-other',
    name: '경기 용인시 기흥·처인구',
    regionCategory: 'gyeonggi',
    regionCategoryLabel: '경기도',
    cluster: '경기 남부 테크노 거점',
    clusterBadgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    majorDongs: ['보정동(카페거리)', '동백동', '마북동', '흥덕동', '서천동', '역북동', '고림동', '남사읍'],
    landmarkComplexes: ['보정e편한세상', '기흥역센트럴푸르지오', '흥덕호반베르디움', '역북골드클래스'],
    careSpecialty: '보정동 카페거리 쇼윈도 정기구독 및 기흥역세권 초고층 주상복합 외창 세정',
    specialtyTag: '기흥역세권 & 카페거리 쇼윈도',
    dispatchTime: '35분 내 배차'
  },
  {
    id: 'gyeonggi-dongtan',
    name: '경기 화성시 (동탄1·2신도시)',
    regionCategory: 'gyeonggi',
    regionCategoryLabel: '경기도',
    cluster: '경기 남부 테크노 거점',
    clusterBadgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    majorDongs: ['오산동(동탄역)', '청계동', '영천동', '목동', '산척동(동탄호수공원)', '송동', '반송동', '봉담읍', '향남읍'],
    landmarkComplexes: ['동탄역유림노르웨이숲', '동탄역롯데캐슬', '동탄린스트라우스더레이크', '동탄역센트럴상록'],
    careSpecialty: '동탄호수공원 조망창 물때 세정 및 동탄역세권 49층 초고층 주상복합 실내 안전공법',
    specialtyTag: '동탄호수공원 뷰 & 동탄역세권',
    dispatchTime: '35분 내 배차',
    isPopular: true
  },
  {
    id: 'gyeonggi-pyeongtaek',
    name: '경기 평택시 · 오산시',
    regionCategory: 'gyeonggi',
    regionCategoryLabel: '경기도',
    cluster: '경기 남부 테크노 거점',
    clusterBadgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    majorDongs: ['고덕동(고덕국제신도시)', '지제동', '동삭동', '비전동', '오산 세교신도시', '수청동'],
    landmarkComplexes: ['고덕국제자이', '힐스테이트지제역', '평택센트럴자이', '오산세교센트럴'],
    careSpecialty: '삼성전자 고덕캠퍼스 배후 신축 아파트 단지 입주 먼지 및 오산 세교 대단지',
    specialtyTag: '고덕국제신도시 신축 외창',
    dispatchTime: '45분 내 배차'
  },

  // [경기 중서부·안양권]
  {
    id: 'gyeonggi-anyang',
    name: '경기 안양시 동안·만안구',
    regionCategory: 'gyeonggi',
    regionCategoryLabel: '경기도',
    cluster: '경기 중서부·안양권',
    clusterBadgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
    majorDongs: ['평촌동', '범계동', '관양동', '비산동', '호계동', '안양동', '석수동', '박달동'],
    landmarkComplexes: ['평촌더샵아이파크', '평촌어바인퍼스트', '목련마을단지', '래미안안양메가트리아'],
    careSpecialty: '평촌 신도시 아파트 및 4,200세대 메가트리아 대단지 투명 정찰가 시공',
    specialtyTag: '평촌 대단지 정찰제',
    dispatchTime: '35분 내 배차',
    isPopular: true
  },
  {
    id: 'gyeonggi-bucheon',
    name: '경기 부천시 원미·소사·오정구',
    regionCategory: 'gyeonggi',
    regionCategoryLabel: '경기도',
    cluster: '경기 중서부·안양권',
    clusterBadgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
    majorDongs: ['중동', '상동', '옥길동(옥길신도시)', '소사본동', '송내동', '원종동', '고강동'],
    landmarkComplexes: ['중동리첸시아(66층)', '팰리스카운티', '중동센트럴파크푸르지오', '옥길자이'],
    careSpecialty: '중동 리첸시아 66층 초고층 통유리창 무탈거 안전 공법 및 옥길지구 아파트',
    specialtyTag: '중동 66층 리첸시아 & 옥길지구',
    dispatchTime: '35분 내 배차',
    isPopular: true
  },
  {
    id: 'gyeonggi-gwangmyeong',
    name: '경기 광명시',
    regionCategory: 'gyeonggi',
    regionCategoryLabel: '경기도',
    cluster: '경기 중서부·안양권',
    clusterBadgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
    majorDongs: ['일직동(KTX광명역세권)', '철산동', '하안동', '소하동', '광명동'],
    landmarkComplexes: ['유플래닛데시앙', '광명역써밋플레이스', '철산래미안자이', '철산자이더헤리티지'],
    careSpecialty: '광명역세권 고층 주상복합 통유리 및 철산 대단지 재건축 아파트 외창',
    specialtyTag: 'KTX광명역세권 주상복합',
    dispatchTime: '35분 내 배차'
  },
  {
    id: 'gyeonggi-siheung-ansan',
    name: '경기 시흥시 · 안산시',
    regionCategory: 'gyeonggi',
    regionCategoryLabel: '경기도',
    cluster: '경기 중서부·안양권',
    clusterBadgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
    majorDongs: ['배곧동(배곧신도시)', '은계동', '목감동', '장현동', '안산 고잔동', '초지동(그랑시티자이)', '사동'],
    landmarkComplexes: ['배곧C1·C2호반써밋', '그랑시티자이 1·2차(7,600세대)', '시흥은계브리즈힐', '안산센트럴푸르지오'],
    careSpecialty: '배곧 서해바다 염분 자국 및 안산 그랑시티자이 7,600세대 집중 시공팀 운용',
    specialtyTag: '서해안 염분 제거 특화',
    dispatchTime: '40분 내 배차',
    isPopular: true
  },
  {
    id: 'gyeonggi-gwacheon-uiwang',
    name: '경기 과천시 · 의왕시 · 군포시',
    regionCategory: 'gyeonggi',
    regionCategoryLabel: '경기도',
    cluster: '경기 중서부·안양권',
    clusterBadgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
    majorDongs: ['과천동', '원문동', '별양동', '갈현동(지정타)', '의왕 포일동', '내손동', '학의동(백운밸리)', '군포 산본동'],
    landmarkComplexes: ['과천위버필드', '과천자이', '과천푸르지오써밋', '의왕백운밸리효성해링턴', '포일엘센트로'],
    careSpecialty: '과천 하이엔드 써밋 숲세권 아파트 및 의왕 백운호수 전망창 조망 복원',
    specialtyTag: '과천 하이엔드 & 백운호수 뷰',
    dispatchTime: '30분 내 배차'
  },

  // [경기 북서부 한강·호수권]
  {
    id: 'gyeonggi-ilsan-east',
    name: '경기 고양시 일산동구',
    regionCategory: 'gyeonggi',
    regionCategoryLabel: '경기도',
    cluster: '경기 북서부 한강·호수권',
    clusterBadgeColor: 'bg-cyan-100 text-cyan-800 border-cyan-200',
    majorDongs: ['식사동(위시티)', '백석동(요진와이시티)', '마두동', '장항동(일산호수공원)', '풍동', '중산동', '정발산동'],
    landmarkComplexes: ['일산요진와이시티', '위시티일산자이 1~4단지', '마두강촌마을', '백석흰돌마을'],
    careSpecialty: '식사동 자이 대형 평형 및 일산 호수공원 뷰 파노라마 전망창 백화 박리',
    specialtyTag: '일산호수공원 뷰 & 위시티 대형평형',
    dispatchTime: '35분 내 배차',
    isPopular: true
  },
  {
    id: 'gyeonggi-ilsan-west',
    name: '경기 고양시 일산서구',
    regionCategory: 'gyeonggi',
    regionCategoryLabel: '경기도',
    cluster: '경기 북서부 한강·호수권',
    clusterBadgeColor: 'bg-cyan-100 text-cyan-800 border-cyan-200',
    majorDongs: ['킨텍스(대화동)', '주엽동', '탄현동(제니스)', '일산동', '가좌동', '덕이동'],
    landmarkComplexes: ['킨텍스원시티(49층)', '일산두산위브더제니스(59층)', '힐스테이트일산', '킨텍스꿈에그린'],
    careSpecialty: '킨텍스원시티 49층, 제니스 59층 초고층 주상복합 특수 자석 클리너 & 카본 폴 운용',
    specialtyTag: '킨텍스 초고층 주상복합 특화',
    dispatchTime: '35분 내 배차',
    isPopular: true
  },
  {
    id: 'gyeonggi-deogyang',
    name: '경기 고양시 덕양구',
    regionCategory: 'gyeonggi',
    regionCategoryLabel: '경기도',
    cluster: '경기 북서부 한강·호수권',
    clusterBadgeColor: 'bg-cyan-100 text-cyan-800 border-cyan-200',
    majorDongs: ['삼송동', '원흥동', '지축동', '향동동', '덕은동(한강뷰)', '행신동', '화정동', '도내동'],
    landmarkComplexes: ['DMC한강자이더헤리티지', '지축역중흥S클래스', '삼송스타클래스', '원흥호반베르디움'],
    careSpecialty: '덕은지구 한강 파노라마뷰 신축 아파트 및 지축/삼송 대단지 발수코팅',
    specialtyTag: '덕은 한강뷰 & 삼송·지축지구',
    dispatchTime: '35분 내 배차'
  },
  {
    id: 'gyeonggi-gimpo',
    name: '경기 김포시',
    regionCategory: 'gyeonggi',
    regionCategoryLabel: '경기도',
    cluster: '경기 북서부 한강·호수권',
    clusterBadgeColor: 'bg-cyan-100 text-cyan-800 border-cyan-200',
    majorDongs: ['운양동(한강신도시)', '장기동', '구래동', '마산동', '풍무동', '고촌동(한강뷰)', '걸포동'],
    landmarkComplexes: ['한강센트럴자이 1·2차', '풍무푸르지오', '운양라피아노(타운하우스)', '고촌힐스테이트리버시티'],
    careSpecialty: '한강신도시 테라스하우스 및 고촌 한강 조망 아파트 외창 올인원 케어',
    specialtyTag: '김포한강신도시 & 테라스하우스',
    dispatchTime: '40분 내 배차'
  },
  {
    id: 'gyeonggi-paju',
    name: '경기 파주시',
    regionCategory: 'gyeonggi',
    regionCategoryLabel: '경기도',
    cluster: '경기 북서부 한강·호수권',
    clusterBadgeColor: 'bg-cyan-100 text-cyan-800 border-cyan-200',
    majorDongs: ['동패동(운정신도시)', '목동동', '야당동', '와동동', '교하동', '문산읍', '금촌동'],
    landmarkComplexes: ['운정신도시센트럴푸르지오', '운정아이파크', '힐스테이트운정', '야당롯데캐슬파크타운'],
    careSpecialty: '운정 호수공원 전망창 및 GTX 운정역세권 대단지 아파트 외창 케어',
    specialtyTag: '운정호수공원 전망창 특화',
    dispatchTime: '45분 내 배차'
  },

  // [경기 동부 한강뷰 거점]
  {
    id: 'gyeonggi-hanam',
    name: '경기 하남시',
    regionCategory: 'gyeonggi',
    regionCategoryLabel: '경기도',
    cluster: '경기 동부 한강뷰 거점',
    clusterBadgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
    majorDongs: ['망월동(미사강변도시)', '선동', '감일동(감일지구)', '학암동(위례하남)', '신장동', '덕풍동'],
    landmarkComplexes: ['미사강변루나리움', '미사강변센트럴자이', '하남감일스윗시티', '위례포레자이', '미사강변푸르지오'],
    careSpecialty: '미사강변 한강 파노라마창 및 스타필드 주변 아파트 올인원 나노코팅',
    specialtyTag: '미사강변 한강뷰 & 감일지구',
    dispatchTime: '30분 내 배차',
    isPopular: true
  },
  {
    id: 'gyeonggi-namyangju-guri',
    name: '경기 남양주시 · 구리시',
    regionCategory: 'gyeonggi',
    regionCategoryLabel: '경기도',
    cluster: '경기 동부 한강뷰 거점',
    clusterBadgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
    majorDongs: ['다산동(다산신도시)', '별내동(별내신도시)', '와부읍(덕소한강변)', '호평동', '평내동', '구리 갈매동', '토평동(한강뷰)', '인창동'],
    landmarkComplexes: ['다산자이아이비플레이스', '다산e편한세상자이', '별내아이파크', '구리토평한일아파트', '갈매역아이파크'],
    careSpecialty: '다산 신도시 대단지 아파트 및 덕소·토평 한강변 아파트 조망권 복원',
    specialtyTag: '다산신도시 & 한강변 아파트',
    dispatchTime: '35분 내 배차',
    isPopular: true
  },

  // ==========================================
  // 3. 인천광역시 (경제자유구역 및 6대 거점)
  // ==========================================
  {
    id: 'incheon-songdo',
    name: '인천 연수구 (송도국제도시)',
    regionCategory: 'incheon',
    regionCategoryLabel: '인천광역시',
    cluster: '인천 경제자유구역 (IFEZ)',
    clusterBadgeColor: 'bg-rose-100 text-rose-800 border-rose-200',
    majorDongs: ['송도동 (송도 1~11공구 전역)', '센트럴파크', '아트센터대로', '옥련동', '동춘동', '청학동'],
    landmarkComplexes: ['송도더샵퍼스트월드', '송도센트럴파크푸르지오', '송도더샵센트럴파크 1~3차', '송도자이크리스탈오션', '송도마리나베이'],
    careSpecialty: '서해 바닷바람 염분 고착 물때 완전 박리 + 9H 경도 나노 실리카 발수코팅 필수 시공',
    specialtyTag: '해풍 염분막 박리 & 나노코팅 필수',
    dispatchTime: '35분 내 배차',
    isPopular: true
  },
  {
    id: 'incheon-cheongna-geomdan',
    name: '인천 서구 (청라·검단·루원)',
    regionCategory: 'incheon',
    regionCategoryLabel: '인천광역시',
    cluster: '인천 경제자유구역 (IFEZ)',
    clusterBadgeColor: 'bg-rose-100 text-rose-800 border-rose-200',
    majorDongs: ['청라동(청라국제도시)', '원당동(검단신도시)', '아라동', '가정동(루원시티)', '당하동', '마전동', '검암동'],
    landmarkComplexes: ['청라호수공원한양수자인', '청라더샵레이크파크', '검단신도시호반써밋 1차', '루원시티SK리더스뷰'],
    careSpecialty: '청라 호수공원 뷰 커낼웨이 상가 쇼윈도 및 검단 입주 아파트 백화 분진 박리',
    specialtyTag: '청라 호수공원뷰 & 검단 입주창',
    dispatchTime: '35분 내 배차',
    isPopular: true
  },
  {
    id: 'incheon-yeongjong',
    name: '인천 중구 (영종국제도시)',
    regionCategory: 'incheon',
    regionCategoryLabel: '인천광역시',
    cluster: '인천 경제자유구역 (IFEZ)',
    clusterBadgeColor: 'bg-rose-100 text-rose-800 border-rose-200',
    majorDongs: ['중산동(영종하늘도시)', '운서동', '운남동', '신포동', '북성동'],
    landmarkComplexes: ['영종하늘도시e편한세상', '스카이시티자이', '영종KCC스위첸', '운서역반도유보라'],
    careSpecialty: '영종 서해 오션뷰 파노라마창 염분 제거 및 영종 단독 전원주택 외창 케어',
    specialtyTag: '영종 서해 오션뷰 파노라마창',
    dispatchTime: '45분 내 배차'
  },
  {
    id: 'incheon-namdong',
    name: '인천 남동구',
    regionCategory: 'incheon',
    regionCategoryLabel: '인천광역시',
    cluster: '인천 도심 거점',
    clusterBadgeColor: 'bg-rose-100 text-rose-800 border-rose-200',
    majorDongs: ['구월동', '논현동(소래포구 오션뷰)', '서창동(서창신도시)', '간석동', '만수동'],
    landmarkComplexes: ['구월아시아드선수촌', '논현에코메트로 1~12단지', '서창센트럴푸르지오', '구월힐스테이트'],
    careSpecialty: '소래포구 해안가 1만 2천 세대 에코메트로 염분 케어 및 구월 아시아드 대단지',
    specialtyTag: '소래 해안가 에코메트로 염분케어',
    dispatchTime: '40분 내 배차'
  },
  {
    id: 'incheon-bupyeong',
    name: '인천 부평구',
    regionCategory: 'incheon',
    regionCategoryLabel: '인천광역시',
    cluster: '인천 도심 거점',
    clusterBadgeColor: 'bg-rose-100 text-rose-800 border-rose-200',
    majorDongs: ['부평동', '삼산동', '부개동', '산곡동', '청천동', '갈산동'],
    landmarkComplexes: ['부평SKVIEW해모로', '삼산타운 1~7단지', '부평그랑메종', 'e편한세상부평그랑힐스'],
    careSpecialty: '삼산타운 및 청천/산곡 신축 5천 세대 대단지 아파트 외창 정밀 세정',
    specialtyTag: '부평·삼산 대단지 케어',
    dispatchTime: '40분 내 배차'
  },
  {
    id: 'incheon-gyeyang-michuhol',
    name: '인천 계양구 · 미추홀구',
    regionCategory: 'incheon',
    regionCategoryLabel: '인천광역시',
    cluster: '인천 도심 거점',
    clusterBadgeColor: 'bg-rose-100 text-rose-800 border-rose-200',
    majorDongs: ['작전동', '계산동', '효성동', '박촌동', '주안동', '용현동', '도화동', '학익동'],
    landmarkComplexes: ['힐스테이트자이계양', '인천용현SKVIEW', '더샵인천스카이타워', '주안파크자이'],
    careSpecialty: '계양산 조망권 아파트 및 주안/도화 신축 역세권 아파트 단지',
    specialtyTag: '계양·미추홀 표준 정찰제',
    dispatchTime: '40분 내 배차'
  }
];

interface ServiceAreasViewProps {
  onSelectTab: (tab: NavTab) => void;
  onOpenQuote: (prefill?: any) => void;
  onOpenKakao: () => void;
}

export const ServiceAreasView: React.FC<ServiceAreasViewProps> = ({
  onSelectTab,
  onOpenQuote,
  onOpenKakao
}) => {
  const { content } = useStudio();
  const [activeCategory, setActiveCategory] = useState<'all' | 'seoul' | 'gyeonggi' | 'incheon'>('all');
  const [selectedCluster, setSelectedCluster] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'categorized' | 'grid'>('categorized');

  // Quick checker state
  const [quickCheckQuery, setQuickCheckQuery] = useState('');
  const [quickCheckResult, setQuickCheckResult] = useState<DetailedDistrict | null>(null);
  const [hasChecked, setHasChecked] = useState(false);

  // Available clusters for sub-filtering
  const availableClusters = useMemo(() => {
    let districts = DETAILED_DISTRICTS;
    if (activeCategory !== 'all') {
      districts = districts.filter(d => d.regionCategory === activeCategory);
    }
    const set = new Set<string>();
    districts.forEach(d => set.add(d.cluster));
    return Array.from(set);
  }, [activeCategory]);

  // Filtered districts
  const filteredDistricts = useMemo(() => {
    return DETAILED_DISTRICTS.filter((item) => {
      const matchCategory = activeCategory === 'all' || item.regionCategory === activeCategory;
      const matchCluster = selectedCluster === 'all' || item.cluster === selectedCluster;
      
      const query = searchTerm.trim().toLowerCase();
      if (!query) {
        return matchCategory && matchCluster;
      }

      const matchName = item.name.toLowerCase().includes(query);
      const matchClusterName = item.cluster.toLowerCase().includes(query);
      const matchSpecialty = item.specialtyTag.toLowerCase().includes(query) || item.careSpecialty.toLowerCase().includes(query);
      const matchDongs = item.majorDongs.some(dong => dong.toLowerCase().includes(query));
      const matchLandmarks = item.landmarkComplexes.some(apt => apt.toLowerCase().includes(query));

      return matchCategory && (matchName || matchClusterName || matchSpecialty || matchDongs || matchLandmarks);
    });
  }, [activeCategory, selectedCluster, searchTerm]);

  // Counts
  const seoulCount = DETAILED_DISTRICTS.filter(d => d.regionCategory === 'seoul').length;
  const gyeonggiCount = DETAILED_DISTRICTS.filter(d => d.regionCategory === 'gyeonggi').length;
  const incheonCount = DETAILED_DISTRICTS.filter(d => d.regionCategory === 'incheon').length;

  // Handle instant checker
  const handleQuickCheck = (e?: React.FormEvent) => {
    e?.preventDefault();
    const q = quickCheckQuery.trim().toLowerCase();
    if (!q) {
      setQuickCheckResult(null);
      setHasChecked(false);
      return;
    }
    const found = DETAILED_DISTRICTS.find(d => 
      d.name.toLowerCase().includes(q) ||
      d.majorDongs.some(dong => dong.toLowerCase().includes(q)) ||
      d.landmarkComplexes.some(apt => apt.toLowerCase().includes(q))
    );
    setQuickCheckResult(found || null);
    setHasChecked(true);
  };

  const handleSelectDistrictForQuote = (districtName: string) => {
    onOpenQuote({
      regionDistrict: districtName,
      serviceType: 'apartment',
      isExteriorIncluded: true
    });
  };

  // Group districts by cluster for categorized view
  const categorizedGroups = useMemo(() => {
    const groups: { cluster: string; category: string; categoryLabel: string; items: DetailedDistrict[] }[] = [];
    const map = new Map<string, DetailedDistrict[]>();

    filteredDistricts.forEach(d => {
      if (!map.has(d.cluster)) {
        map.set(d.cluster, []);
      }
      map.get(d.cluster)!.push(d);
    });

    map.forEach((items, cluster) => {
      groups.push({
        cluster,
        category: items[0].regionCategory,
        categoryLabel: items[0].regionCategoryLabel,
        items
      });
    });

    return groups;
  }, [filteredDistricts]);

  return (
    <div className="space-y-12 lg:space-y-16 pb-16">
      {/* 1. HERO BANNER */}
      <section className="bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 text-white py-14 lg:py-20 px-4 sm:px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-sky-400 bg-sky-950/80 border border-sky-800/60 rounded-full px-3.5 py-1.5 backdrop-blur-xs">
            <MapPin className="h-3.5 w-3.5 text-sky-400" />
            <span>서울·경기·인천 50여 개 구·시 단위 100% 직영 출동망</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
            서울·수도권 구 단위 전지역<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-sky-200 to-emerald-300">
              출장비 0원 무료 방문 서비스 지역
            </span>
          </h1>

          <p className="text-sm sm:text-base text-neutral-300 max-w-3xl leading-relaxed">
            <StudioEditable contentKey="regionGuarantee">
              {content.regionGuarantee}
            </StudioEditable>
            <br />
            서울 25개 자치구 전체와 경기도(성남 분당, 수원 광교, 용인 수지, 고양 일산, 화성 동탄 등), 인천(송도, 청라 등) 전역에 
            본사 직영 마스터 2인 1조가 추가 출장비 없이 신속 방문합니다.
          </p>

          {/* 3 Core Guarantees Banner */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            <div className="bg-neutral-900/90 border border-neutral-800 p-4 rounded-xl flex items-center gap-3.5">
              <div className="h-10 w-10 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0">
                <Truck className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs text-neutral-400">전지역 출장비</div>
                <div className="text-base font-bold text-white">0원 전액 무료 (정찰가)</div>
              </div>
            </div>

            <div className="bg-neutral-900/90 border border-neutral-800 p-4 rounded-xl flex items-center gap-3.5">
              <div className="h-10 w-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs text-neutral-400">신속 견적 & 배차</div>
                <div className="text-base font-bold text-white">10분 내 확정 견적 안내</div>
              </div>
            </div>

            <div className="bg-neutral-900/90 border border-neutral-800 p-4 rounded-xl flex items-center gap-3.5">
              <div className="h-10 w-10 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs text-neutral-400">안심 책임 시공</div>
                <div className="text-base font-bold text-white">현대해상 1억원 배상보험</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. INSTANT POSTAL/DISTRICT COVERAGE CHECKER (내 주소 출장 가능 여부 1초 확인) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-r from-sky-900/90 via-neutral-900 to-neutral-900 text-white rounded-3xl p-6 sm:p-8 border border-sky-700/40 shadow-xl space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="text-xs font-bold text-sky-400 flex items-center gap-1.5">
                <Sparkles className="h-4 w-4" />
                <span>1초 출장 가능 조회기</span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold tracking-tight">
                우리 집 / 매장 주소로 출장 가능 여부를 즉시 확인해 보세요
              </h2>
              <p className="text-xs text-neutral-300">
                구 명칭(예: 분당구, 서초구), 동 명칭(예: 반포동, 정자동, 식사동, 송도동) 또는 아파트 단지명을 입력하세요.
              </p>
            </div>

            {/* Quick search input */}
            <form onSubmit={handleQuickCheck} className="flex items-center gap-2 w-full md:w-auto">
              <div className="relative flex-1 md:w-80">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                <input
                  type="text"
                  value={quickCheckQuery}
                  onChange={(e) => {
                    setQuickCheckQuery(e.target.value);
                    if (!e.target.value) {
                      setHasChecked(false);
                      setQuickCheckResult(null);
                    }
                  }}
                  placeholder="예: 반포동, 분당구, 송도, 동탄, 킨텍스"
                  className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-neutral-950/90 border border-neutral-700 text-white placeholder-neutral-500 focus:border-sky-400 focus:outline-hidden"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2.5 bg-sky-500 hover:bg-sky-400 text-neutral-950 font-bold text-xs rounded-xl transition-colors whitespace-nowrap shadow-xs"
              >
                조회하기
              </button>
            </form>
          </div>

          {/* Quick test badges */}
          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-neutral-400">
            <span className="text-[11px] text-neutral-300">자주 찾는 지역:</span>
            {['강남구 반포동', '성남시 분당구', '고양시 일산', '수원시 영통구(광교)', '화성시 동탄', '인천 송도국제도시'].map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => {
                  setQuickCheckQuery(tag);
                  const found = DETAILED_DISTRICTS.find(d => 
                    d.name.includes(tag.slice(0, 3)) || 
                    d.majorDongs.some(dong => tag.includes(dong.slice(0, 2)))
                  );
                  setQuickCheckResult(found || null);
                  setHasChecked(true);
                }}
                className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-neutral-200 text-[11px] transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Check result feedback */}
          {hasChecked && (
            <div className="pt-3 border-t border-white/10 animate-in fade-in duration-200">
              {quickCheckResult ? (
                <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start sm:items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-emerald-500 text-neutral-950 flex items-center justify-center shrink-0">
                      <Check className="h-5 w-5 stroke-[3]" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                        <span>출장 가능 100% 확정</span>
                        <span className="text-white/60">·</span>
                        <span>출장비 0원 전액 무료</span>
                      </div>
                      <div className="text-sm font-black text-white mt-0.5">
                        [{quickCheckResult.name}] 일대는 클리어웍스 직영 마스터 2인 1조 상주 출동 구역입니다!
                      </div>
                      <div className="text-xs text-neutral-300 mt-0.5">
                        주요 관할: {quickCheckResult.majorDongs.slice(0, 5).join(', ')} 외 전역 (배차 소요: {quickCheckResult.dispatchTime})
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleSelectDistrictForQuote(quickCheckResult.name)}
                    className="px-4 py-2 bg-emerald-400 hover:bg-emerald-300 text-neutral-950 text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-md whitespace-nowrap self-end sm:self-center"
                  >
                    <span>이 주소로 무료 견적 신청</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-sky-950/60 border border-sky-600/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                  <div>
                    <div className="font-bold text-sky-300">
                      &ldquo;{quickCheckQuery}&rdquo; 검색 구역도 서울·수도권 전지역 출장 방문 가능합니다!
                    </div>
                    <div className="text-neutral-300 mt-0.5">
                      클리어웍스는 서울 25개 구 및 수도권 전역 직영 네트워크를 보유하고 있습니다. 전화 또는 카카오톡으로 주소를 알려주시면 즉시 배차 일정을 확인해 드립니다.
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onOpenQuote({ regionDistrict: quickCheckQuery })}
                      className="px-3.5 py-2 bg-sky-500 hover:bg-sky-400 text-neutral-950 text-xs font-bold rounded-xl transition-colors whitespace-nowrap"
                    >
                      견적 문의하기
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* 3. REGION FILTER & SEARCH CONTROLS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-xs space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Main Category Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
              <button
                type="button"
                onClick={() => {
                  setActiveCategory('all');
                  setSelectedCluster('all');
                }}
                className={`px-4 py-2.5 text-xs font-bold rounded-xl whitespace-nowrap transition-all ${
                  activeCategory === 'all'
                    ? 'bg-neutral-950 text-white shadow-xs'
                    : 'bg-neutral-100 text-neutral-600 hover:text-neutral-950'
                }`}
              >
                전체 구 단위 ({DETAILED_DISTRICTS.length})
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveCategory('seoul');
                  setSelectedCluster('all');
                }}
                className={`px-4 py-2.5 text-xs font-bold rounded-xl whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  activeCategory === 'seoul'
                    ? 'bg-sky-600 text-white shadow-xs'
                    : 'bg-sky-50 text-sky-800 hover:bg-sky-100'
                }`}
              >
                <span>서울특별시 ({seoulCount}개 구 전체)</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveCategory('gyeonggi');
                  setSelectedCluster('all');
                }}
                className={`px-4 py-2.5 text-xs font-bold rounded-xl whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  activeCategory === 'gyeonggi'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                }`}
              >
                <span>경기도 ({gyeonggiCount}개 핵심 구·시)</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveCategory('incheon');
                  setSelectedCluster('all');
                }}
                className={`px-4 py-2.5 text-xs font-bold rounded-xl whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  activeCategory === 'incheon'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-amber-50 text-amber-800 hover:bg-amber-100'
                }`}
              >
                <span>인천광역시 ({incheonCount}개 구)</span>
              </button>
            </div>

            {/* View Mode & Search Input */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 bg-neutral-100 p-1 rounded-xl text-xs">
                <button
                  type="button"
                  onClick={() => setViewMode('categorized')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
                    viewMode === 'categorized' ? 'bg-white text-neutral-900 shadow-2xs' : 'text-neutral-500 hover:text-neutral-900'
                  }`}
                >
                  권역별 그룹 뷰
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
                    viewMode === 'grid' ? 'bg-white text-neutral-900 shadow-2xs' : 'text-neutral-500 hover:text-neutral-900'
                  }`}
                >
                  전체 카드 뷰
                </button>
              </div>

              <div className="relative min-w-[240px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="구, 동, 단지명 검색 (예: 분당, 반포, 광교, 송도)"
                  className="w-full pl-9 pr-8 py-2 text-xs rounded-xl border border-neutral-300 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 focus:outline-hidden bg-white"
                />
                {searchTerm && (
                  <button
                    type="button"
                    onClick={() => setSearchTerm('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 text-xs font-bold"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Sub Cluster Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1 border-t border-neutral-100 text-xs">
            <span className="text-neutral-400 text-[11px] font-semibold shrink-0 mr-1 flex items-center gap-1">
              <Filter className="h-3 w-3" />
              권역별 필터:
            </span>
            <button
              type="button"
              onClick={() => setSelectedCluster('all')}
              className={`px-2.5 py-1 rounded-lg text-xs whitespace-nowrap transition-colors ${
                selectedCluster === 'all'
                  ? 'bg-neutral-900 text-white font-bold'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              전체 세부권역
            </button>
            {availableClusters.map((cluster) => (
              <button
                key={cluster}
                type="button"
                onClick={() => setSelectedCluster(cluster)}
                className={`px-2.5 py-1 rounded-lg text-xs whitespace-nowrap transition-colors ${
                  selectedCluster === cluster
                    ? 'bg-sky-600 text-white font-bold'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                {cluster}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-between text-xs text-neutral-500 pt-1 border-t border-neutral-100 gap-2">
            <div>
              검색 일치 지역: <strong className="text-neutral-900 font-mono">{filteredDistricts.length}</strong>개 구·시 단위
            </div>
            <div className="flex items-center gap-3 text-[11px] text-neutral-400">
              <span className="flex items-center gap-1 text-emerald-600 font-medium">
                <CheckCircle2 className="h-3.5 w-3.5" />
                전지역 출장비 0원 무료
              </span>
              <span>·</span>
              <span>본사 직영 2인 1조 마스터팀 상주</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. MAIN DISTRICTS LIST (Grouped or Grid) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
        {/* VIEW 1: CATEGORIZED HIERARCHY GROUPS */}
        {viewMode === 'categorized' && (
          <div className="space-y-10">
            {categorizedGroups.map((group) => (
              <div key={group.cluster} className="space-y-4">
                {/* Cluster Title Banner */}
                <div className="flex items-center justify-between border-b-2 border-neutral-200 pb-2.5">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-black px-2.5 py-1 rounded-md border ${
                      group.category === 'seoul' 
                        ? 'bg-sky-50 text-sky-800 border-sky-300' 
                        : group.category === 'gyeonggi'
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                        : 'bg-amber-50 text-amber-800 border-amber-300'
                    }`}>
                      {group.categoryLabel}
                    </span>
                    <h3 className="text-lg font-black text-neutral-900 tracking-tight">
                      {group.cluster}
                    </h3>
                    <span className="text-xs text-neutral-400 font-medium">
                      ({group.items.length}개 자치구·시)
                    </span>
                  </div>

                  <span className="text-xs font-bold text-emerald-600 hidden sm:inline flex items-center gap-1">
                    <Truck className="h-3.5 w-3.5" />
                    추가 출장비 0원
                  </span>
                </div>

                {/* Grid of Cards in this cluster */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {group.items.map((item) => (
                    <DistrictCard
                      key={item.id}
                      item={item}
                      onSelectQuote={() => handleSelectDistrictForQuote(item.name)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 2: ALL DISTRICTS FLAT GRID */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredDistricts.map((item) => (
              <DistrictCard
                key={item.id}
                item={item}
                onSelectQuote={() => handleSelectDistrictForQuote(item.name)}
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {filteredDistricts.length === 0 && (
          <div className="py-20 text-center bg-white rounded-3xl border border-neutral-200 space-y-4 shadow-xs">
            <div className="h-12 w-12 rounded-full bg-neutral-100 text-neutral-400 mx-auto flex items-center justify-center">
              <Search className="h-6 w-6" />
            </div>
            <div className="text-base font-bold text-neutral-800">
              &ldquo;{searchTerm}&rdquo; 검색 조건과 일치하는 구 단위 목록이 없습니다.
            </div>
            <p className="text-xs text-neutral-500 max-w-md mx-auto leading-relaxed">
              클리어웍스는 서울 25개 구 및 수도권 전역에 직영팀이 상주하고 있습니다. 
              단독 주택이나 신도시 외곽 지역도 무료 출장 견적이 가능하니 문의해 주세요.
            </p>
            <div className="flex items-center justify-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCluster('all');
                  setActiveCategory('all');
                }}
                className="px-4 py-2 bg-neutral-900 text-white text-xs font-bold rounded-xl transition-colors"
              >
                전체 서비스 지역 다시보기
              </button>
            </div>
          </div>
        )}
      </section>

      {/* 5. COVERAGE COMPARISON & REGIONAL SPECIALTY FAQ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-br from-sky-950 via-neutral-900 to-neutral-950 rounded-3xl p-6 sm:p-10 text-white space-y-8">
          <div>
            <span className="text-xs font-bold text-sky-400 uppercase tracking-widest">
              ClearWorks Quality Guarantee
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1">
              서울·수도권 구 단위 청소 서비스 자주 묻는 질문
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 mt-2">
              지역별 추가 출장비 및 시공 프로세스에 관한 궁금증을 확인하세요.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/5 border border-white/10 p-5 rounded-2xl space-y-2.5 backdrop-blur-xs">
              <h4 className="text-sm font-bold text-sky-300 flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                <span>서울 외곽이나 경기 신도시도 추가 출장비가 없나요?</span>
              </h4>
              <p className="text-xs text-neutral-300 leading-relaxed">
                네, 전혀 없습니다. 클리어웍스는 서울 25개 구 전체 및 분당, 일산, 광교, 송도, 다산, 미사, 동탄 등 수도권 전역에 권역별 직영 차량이 상주하여 추가 요금 없이 동일한 표준 정찰제로 방문합니다.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 p-5 rounded-2xl space-y-2.5 backdrop-blur-xs">
              <h4 className="text-sm font-bold text-sky-300 flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                <span>송도·청라 등 해안가 염분막도 복원이 가능한가요?</span>
              </h4>
              <p className="text-xs text-neutral-300 leading-relaxed">
                인천 송도, 영종, 청라, 시흥 배곧 등 바닷바람이 부는 지역은 소금기 염분과 자외선이 결합해 유리가 하얗게 백화됩니다. 클리어웍스 특허 순수 정수 세정과 나노 실리카 발수코팅으로 신축 수준의 투명도를 복원합니다.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 p-5 rounded-2xl space-y-2.5 backdrop-blur-xs">
              <h4 className="text-sm font-bold text-sky-300 flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                <span>같은 아파트 단지 단체 예약 시 할인 혜택이 있나요?</span>
              </h4>
              <p className="text-xs text-neutral-300 leading-relaxed">
                같은 동이나 단지 내 2세대 이상 동시 신청 시 10%, 5세대 이상 공동구매 시 최대 20%의 할인 혜택과 함께 전 세대 나노 발수코팅을 무상 업그레이드해 드립니다.
              </p>
            </div>
          </div>

          {/* Bottom Conversion Action */}
          <div className="pt-6 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <div className="text-sm font-bold text-white">
                지금 내 거주지 구단위 맞춤 견적 확인하기
              </div>
              <div className="text-xs text-neutral-400">
                창문 사진 1장이면 10분 내 100% 확정 견적을 안내해 드립니다.
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => onOpenQuote()}
                className="flex-1 sm:flex-initial px-5 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-neutral-950 font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-lg shadow-sky-900/30"
              >
                <span>무료 견적신청 (출장비 0원)</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={onOpenKakao}
                className="flex-1 sm:flex-initial px-4 py-3 rounded-xl bg-[#FEE500] hover:bg-yellow-400 text-neutral-900 font-bold text-xs transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle className="h-3.5 w-3.5 fill-current" />
                <span>카카오톡 실시간 상담</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Sub-component for individual District Card
interface DistrictCardProps {
  item: DetailedDistrict;
  onSelectQuote: () => void;
}

const DistrictCard: React.FC<DistrictCardProps> = ({ item, onSelectQuote }) => {
  return (
    <div
      className={`bg-white rounded-2xl border p-5 transition-all duration-200 hover:shadow-lg hover:-translate-y-1 flex flex-col justify-between ${
        item.isPopular ? 'border-sky-300 ring-1 ring-sky-100 shadow-2xs' : 'border-neutral-200'
      }`}
    >
      <div className="space-y-3.5">
        {/* Header tags */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className={`text-[10px] font-black px-2 py-0.5 rounded-md border ${item.clusterBadgeColor}`}>
              {item.cluster}
            </span>
            {item.isPopular && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 border border-rose-200">
                인기 시공지역
              </span>
            )}
          </div>
          <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
            <CheckCircle2 className="h-3.5 w-3.5" />
            출장비 0원
          </span>
        </div>

        {/* District Name */}
        <div>
          <h3 className="text-lg font-black text-neutral-900 tracking-tight flex items-center gap-1.5">
            <MapPin className="h-4 w-4 text-sky-600 shrink-0" />
            <span>{item.name}</span>
          </h3>

          {/* Major Dongs Chips */}
          <div className="mt-1.5 flex flex-wrap gap-1">
            {item.majorDongs.map((dong) => (
              <span key={dong} className="text-[11px] text-neutral-600 bg-neutral-100 px-1.5 py-0.5 rounded">
                {dong}
              </span>
            ))}
          </div>
        </div>

        {/* Representative Landmark Complexes */}
        <div className="text-[11px] text-neutral-500 pt-1 border-t border-neutral-100">
          <span className="font-semibold text-neutral-700">시공 사례 아파트: </span>
          <span>{item.landmarkComplexes.slice(0, 3).join(', ')}</span>
        </div>

        {/* Characteristics / Specialty Tag */}
        <div className="bg-neutral-50 rounded-xl p-3 border border-neutral-100 space-y-1">
          <div className="text-[11px] font-bold text-sky-700 flex items-center gap-1">
            <Sparkles className="h-3 w-3 text-sky-500 shrink-0" />
            <span>{item.specialtyTag}</span>
          </div>
          <p className="text-xs text-neutral-600 leading-relaxed">
            {item.careSpecialty}
          </p>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="pt-4 mt-4 border-t border-neutral-100 flex items-center justify-between gap-2">
        <div className="text-[11px] text-neutral-400">
          배차: <span className="font-bold text-neutral-700">{item.dispatchTime}</span>
        </div>

        <button
          type="button"
          onClick={onSelectQuote}
          className="px-3.5 py-2 bg-neutral-900 hover:bg-sky-600 text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 shadow-xs"
        >
          <span>이 지역 견적신청</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
};
