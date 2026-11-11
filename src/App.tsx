import React, { useState, useEffect } from 'react';
import { NavTab, QuoteRequest, SeoSettingsMap } from './types';
import { INITIAL_QUOTES } from './data/mockData';
import { loadStoredSeoSettings, saveStoredSeoSettings, applySeoToDom } from './utils/seoUtils';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { MobileStickyCTA } from './components/MobileStickyCTA';
import { QuickQuoteModal } from './components/QuickQuoteModal';
import { KakaoConsultModal } from './components/KakaoConsultModal';
import { StudioProvider, useStudio } from './context/StudioContext';
import { GoogleStudioEditor } from './components/GoogleStudioEditor';

import { HomeView } from './views/HomeView';
import { AboutView } from './views/AboutView';
import { ServicesView } from './views/ServicesView';
import { ServiceAreasView } from './views/ServiceAreasView';
import { PricingView } from './views/PricingView';
import { CasesView } from './views/CasesView';
import { ReviewsView } from './views/ReviewsView';
import { FaqView } from './views/FaqView';
import { BookingView } from './views/BookingView';
import { BlogView } from './views/BlogView';
import { NoticesView } from './views/NoticesView';
import { AdminView } from './views/AdminView';

function AppContent() {
  const [currentTab, setCurrentTab] = useState<NavTab>('home');
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isKakaoModalOpen, setIsKakaoModalOpen] = useState(false);
  const [quotes, setQuotes] = useState<QuoteRequest[]>(INITIAL_QUOTES);
  const [seoSettings, setSeoSettings] = useState<SeoSettingsMap>(loadStoredSeoSettings);
  const [quotePrefill, setQuotePrefill] = useState<{
    serviceType?: 'apartment' | 'commercial' | 'building' | 'house';
    regionDistrict?: string;
    sizeInfo?: string;
    estimatedCost?: number;
    isExteriorIncluded?: boolean;
  }>({});

  const { previewDevice, isLiveEditing } = useStudio();

  // Dynamically update document title, meta description, and canonical URL on tab switch or SEO config changes
  useEffect(() => {
    if (seoSettings[currentTab]) {
      applySeoToDom(seoSettings[currentTab]);
    }
  }, [currentTab, seoSettings]);

  const handleUpdateSeoSettings = (newSettings: SeoSettingsMap) => {
    setSeoSettings(newSettings);
    saveStoredSeoSettings(newSettings);
  };

  // Sync scroll on tab switch
  const handleSelectTab = (tab: NavTab) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenQuoteWithPrefill = (data?: any) => {
    if (data) {
      setQuotePrefill(data);
    }
    setIsQuoteModalOpen(true);
  };

  const handleAddQuote = (newQuote: QuoteRequest) => {
    setQuotes((prev) => [newQuote, ...prev]);
  };

  const handleUpdateQuoteStatus = (id: string, newStatus: QuoteRequest['status']) => {
    setQuotes((prev) =>
      prev.map((q) => (q.id === id ? { ...q, status: newStatus } : q))
    );
  };

  const handleDeleteQuote = (id: string) => {
    setQuotes((prev) => prev.filter((q) => q.id !== id));
  };

  const handleApplyEstimate = (data: {
    serviceType: 'apartment' | 'commercial' | 'building' | 'house';
    sizeInfo: string;
    estimatedCost: number;
    isExteriorIncluded: boolean;
  }) => {
    setQuotePrefill(data);
    setIsQuoteModalOpen(true);
  };

  const isSimulatedView = isLiveEditing && previewDevice !== 'desktop';

  return (
    <div className={`min-h-screen flex flex-col bg-neutral-50 text-neutral-900 selection:bg-sky-500/20 selection:text-sky-900 ${
      isSimulatedView ? 'bg-neutral-800 py-6 px-2 sm:px-4' : ''
    }`}>
      <div className={`flex-1 flex flex-col transition-all duration-300 ${
        isSimulatedView
          ? previewDevice === 'mobile'
            ? 'max-w-[420px] mx-auto shadow-2xl border-4 border-neutral-700 rounded-3xl overflow-hidden bg-white w-full'
            : 'max-w-[768px] mx-auto shadow-2xl border-4 border-neutral-700 rounded-2xl overflow-hidden bg-white w-full'
          : 'w-full'
      }`}>
        {/* Top Navbar complying with Top Bar Contract */}
        <Navbar
          currentTab={currentTab}
          onSelectTab={handleSelectTab}
          onOpenQuote={() => setIsQuoteModalOpen(true)}
          onOpenKakao={() => setIsKakaoModalOpen(true)}
          quoteCount={quotes.length}
        />

        {/* Main Content Area */}
        <main className="flex-1">
          {currentTab === 'home' && (
            <HomeView
              onSelectTab={handleSelectTab}
              onOpenQuote={() => setIsQuoteModalOpen(true)}
              onOpenKakao={() => setIsKakaoModalOpen(true)}
              onApplyEstimate={handleApplyEstimate}
            />
          )}

          {currentTab === 'about' && (
            <AboutView
              onOpenQuote={() => setIsQuoteModalOpen(true)}
              onOpenKakao={() => setIsKakaoModalOpen(true)}
            />
          )}

          {currentTab === 'services' && (
            <ServicesView
              onOpenQuote={() => setIsQuoteModalOpen(true)}
              onOpenKakao={() => setIsKakaoModalOpen(true)}
            />
          )}

          {currentTab === 'regions' && (
            <ServiceAreasView
              onSelectTab={handleSelectTab}
              onOpenQuote={handleOpenQuoteWithPrefill}
              onOpenKakao={() => setIsKakaoModalOpen(true)}
            />
          )}

          {currentTab === 'pricing' && (
            <PricingView
              onOpenQuote={() => setIsQuoteModalOpen(true)}
              onOpenKakao={() => setIsKakaoModalOpen(true)}
              onApplyEstimate={handleApplyEstimate}
            />
          )}

          {currentTab === 'cases' && (
            <CasesView
              onOpenQuote={() => setIsQuoteModalOpen(true)}
              onOpenKakao={() => setIsKakaoModalOpen(true)}
            />
          )}

          {currentTab === 'reviews' && (
            <ReviewsView
              onOpenQuote={() => setIsQuoteModalOpen(true)}
              onOpenKakao={() => setIsKakaoModalOpen(true)}
            />
          )}

          {currentTab === 'faq' && (
            <FaqView
              onOpenQuote={() => setIsQuoteModalOpen(true)}
              onOpenKakao={() => setIsKakaoModalOpen(true)}
            />
          )}

          {currentTab === 'booking' && (
            <BookingView
              onSubmitQuote={handleAddQuote}
              onOpenKakao={() => setIsKakaoModalOpen(true)}
              prefillData={quotePrefill}
            />
          )}

          {currentTab === 'blog' && (
            <BlogView
              onOpenQuote={() => setIsQuoteModalOpen(true)}
              onOpenKakao={() => setIsKakaoModalOpen(true)}
            />
          )}

          {currentTab === 'notices' && (
            <NoticesView
              onOpenQuote={() => setIsQuoteModalOpen(true)}
              onOpenKakao={() => setIsKakaoModalOpen(true)}
            />
          )}

          {currentTab === 'admin' && (
            <AdminView
              quotes={quotes}
              onUpdateQuoteStatus={handleUpdateQuoteStatus}
              onDeleteQuote={handleDeleteQuote}
              seoSettings={seoSettings}
              onUpdateSeoSettings={handleUpdateSeoSettings}
              currentPageKey={currentTab}
            />
          )}
        </main>

        {/* Footer */}
        <Footer
          onSelectTab={handleSelectTab}
          onOpenQuote={() => setIsQuoteModalOpen(true)}
          onOpenKakao={() => setIsKakaoModalOpen(true)}
        />
      </div>

      {/* Mobile Sticky CTA Bar (Height capped < 15% mobile viewport) */}
      <MobileStickyCTA
        onOpenKakao={() => setIsKakaoModalOpen(true)}
        onOpenQuote={() => setIsQuoteModalOpen(true)}
      />

      {/* Google Studio Real-time Live Editor Tool */}
      <GoogleStudioEditor />

      {/* Quick Quote Modal */}
      <QuickQuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        onSubmitQuote={handleAddQuote}
        initialData={quotePrefill}
      />

      {/* KakaoTalk 1:1 Consultation Interactive Simulator Modal */}
      <KakaoConsultModal
        isOpen={isKakaoModalOpen}
        onClose={() => setIsKakaoModalOpen(false)}
        onOpenQuickQuote={() => {
          setIsKakaoModalOpen(false);
          setIsQuoteModalOpen(true);
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <StudioProvider>
      <AppContent />
    </StudioProvider>
  );
}
