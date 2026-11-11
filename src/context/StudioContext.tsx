import React, { createContext, useContext, useState, useEffect } from 'react';

export interface StudioContent {
  brandName: string;
  brandSlogan: string;
  contactPhone: string;
  businessHours: string;
  topNotice: string;
  heroBadge: string;
  heroTitlePrefix: string;
  heroTitleHighlight: string;
  heroDescription: string;
  heroCtaPrimary: string;
  heroCtaSecondary: string;
  heroCtaPhone: string;
  stat1Value: string;
  stat1Label: string;
  stat2Value: string;
  stat2Label: string;
  stat3Value: string;
  stat3Label: string;
  stat4Value: string;
  stat4Label: string;
  pricingAptStart: string;
  pricingStoreStart: string;
  pricingPromoBadge: string;
  regionGuarantee: string;
}

export const DEFAULT_STUDIO_CONTENT: StudioContent = {
  brandName: '클리어웍스',
  brandSlogan: '서울·수도권 1등 유리창청소 전문업체',
  contactPhone: '1588-7241',
  businessHours: '연중무휴 08:00 ~ 20:00 (실시간 배차)',
  topNotice: '서울·수도권 구단위 전지역 방문 출장 | 현대해상 1억원 배상보험 | 나노 발수코팅 무상 시공',
  heroBadge: '서울 25개 구 및 수도권 전지역 방문 출장 · 직영팀 상주',
  heroTitlePrefix: '서울·수도권에서 찾는',
  heroTitleHighlight: '유리창청소 전문업체, 클리어웍스',
  heroDescription: '뿌옇게 낀 묵은 물때와 매연 유막을 단 한 번의 시공으로 완벽 복원합니다. 초순수 정수 필터 공법과 나노 발수코팅으로 창문 없는 듯 맑고 투명한 도심 조망권을 되찾으세요.',
  heroCtaPrimary: '무료 견적신청 (10분 확정)',
  heroCtaSecondary: '카카오톡 문의',
  heroCtaPhone: '1588-7241 전화문의',
  stat1Value: '3,500+ 세대',
  stat1Label: '누적 시공 실적',
  stat2Value: '4.96점',
  stat2Label: '고객 만족도 (5점 만점)',
  stat3Value: '1억원',
  stat3Label: '현대해상 배상책임보험',
  stat4Value: '0원',
  stat4Label: '현장 추가금 보증',
  pricingAptStart: '22만원~',
  pricingStoreStart: '15만원~',
  pricingPromoBadge: '이달 한정: 나노 실리카 발수코팅(8만원 상당) 무상 시공',
  regionGuarantee: '서울 25개 자치구 및 경기·인천 전지역 출장비 0원 무료'
};

const STORAGE_KEY = 'clearworks_google_studio_content_v1';

interface StudioContextType {
  content: StudioContent;
  isStudioOpen: boolean;
  setIsStudioOpen: (open: boolean) => void;
  isLiveEditing: boolean;
  setIsLiveEditing: (editing: boolean) => void;
  previewDevice: 'desktop' | 'tablet' | 'mobile';
  setPreviewDevice: (device: 'desktop' | 'tablet' | 'mobile') => void;
  updateContent: <K extends keyof StudioContent>(key: K, value: StudioContent[K]) => void;
  updateMultipleContent: (partial: Partial<StudioContent>) => void;
  resetToDefaults: () => void;
  lastSavedAt: string;
}

const StudioContext = createContext<StudioContextType | undefined>(undefined);

export const StudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<StudioContent>(() => {
    if (typeof window === 'undefined') return DEFAULT_STUDIO_CONTENT;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...DEFAULT_STUDIO_CONTENT, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.warn('Failed to parse studio content from localStorage', e);
    }
    return DEFAULT_STUDIO_CONTENT;
  });

  const [isStudioOpen, setIsStudioOpen] = useState(false);
  const [isLiveEditing, setIsLiveEditing] = useState(false);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [lastSavedAt, setLastSavedAt] = useState<string>('방금 저장됨');

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
      const now = new Date();
      setLastSavedAt(`${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`);
    } catch (e) {
      console.warn('Failed to save studio content to localStorage', e);
    }
  }, [content]);

  const updateContent = <K extends keyof StudioContent>(key: K, value: StudioContent[K]) => {
    setContent((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  const updateMultipleContent = (partial: Partial<StudioContent>) => {
    setContent((prev) => ({
      ...prev,
      ...partial
    }));
  };

  const resetToDefaults = () => {
    setContent(DEFAULT_STUDIO_CONTENT);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      // ignore
    }
  };

  return (
    <StudioContext.Provider
      value={{
        content,
        isStudioOpen,
        setIsStudioOpen,
        isLiveEditing,
        setIsLiveEditing,
        previewDevice,
        setPreviewDevice,
        updateContent,
        updateMultipleContent,
        resetToDefaults,
        lastSavedAt
      }}
    >
      {children}
    </StudioContext.Provider>
  );
};

export const useStudio = () => {
  const context = useContext(StudioContext);
  if (!context) {
    throw new Error('useStudio must be used within a StudioProvider');
  }
  return context;
};
