import React, { useState, useRef, useCallback } from 'react';
import { ArrowLeftRight } from 'lucide-react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  aspectRatioClass?: string;
  className?: string;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImage,
  afterImage,
  beforeLabel = '시공 전 (묵은 물때·유막)',
  afterLabel = '클리어웍스 시공 후 (크리스탈 뷰)',
  aspectRatioClass = 'aspect-[16/10]',
  className = ''
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(position);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative select-none overflow-hidden rounded-xl border border-neutral-200 bg-neutral-900 shadow-sm cursor-ew-resize ${aspectRatioClass} ${className}`}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
    >
      {/* After image (Underneath / Background) */}
      <img
        src={afterImage}
        alt="클리어웍스 시공 후 깨끗한 유리창"
        referrerPolicy="no-referrer"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute top-4 right-4 z-10 rounded bg-emerald-600/90 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-xs">
        {afterLabel}
      </div>

      {/* Before image (Clipped with width percentage) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${sliderPosition}%` }}
      >
        <img
          src={beforeImage}
          alt="시공 전 오염된 유리창"
          referrerPolicy="no-referrer"
          className="absolute inset-0 h-full w-full object-cover max-w-none filter contrast-90 brightness-95"
          style={{
            width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%',
            height: '100%'
          }}
        />
        {/* Subtle cloudy haze overlay simulating heavy calcified water stains & dust */}
        <div className="absolute inset-0 bg-neutral-800/35 backdrop-blur-[2px]" />
        <div className="absolute top-4 left-4 z-10 rounded bg-neutral-900/80 px-2.5 py-1 text-xs font-medium text-neutral-200 backdrop-blur-xs">
          {beforeLabel}
        </div>
      </div>

      {/* Divider Line */}
      <div
        className="absolute top-0 bottom-0 z-20 w-0.5 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)]"
        style={{ left: `${sliderPosition}%` }}
      >
        {/* Centered Drag Handle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-white text-neutral-800 shadow-lg border border-neutral-200 transition-transform hover:scale-110 active:scale-95">
          <ArrowLeftRight className="h-4 w-4" />
        </div>
      </div>

      {/* Helper text tooltip at bottom */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 rounded-full bg-neutral-900/70 px-3 py-1 text-[11px] text-white/90 backdrop-blur-xs pointer-events-none">
        좌우로 드래그하여 투명도 차이를 확인하세요
      </div>
    </div>
  );
};
