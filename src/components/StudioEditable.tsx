import React, { useState } from 'react';
import { Edit2, Check, X } from 'lucide-react';
import { useStudio, StudioContent } from '../context/StudioContext';

interface StudioEditableProps {
  contentKey: keyof StudioContent;
  children?: React.ReactNode;
  className?: string;
  as?: 'span' | 'div' | 'p' | 'h1' | 'h2' | 'h3';
  multiline?: boolean;
}

export const StudioEditable: React.FC<StudioEditableProps> = ({
  contentKey,
  children,
  className = '',
  as: Component = 'span',
  multiline = false
}) => {
  const { content, isLiveEditing, updateContent, setIsStudioOpen } = useStudio();
  const [isEditingInline, setIsEditingInline] = useState(false);
  const [draftValue, setDraftValue] = useState(content[contentKey]);

  const currentValue = content[contentKey];

  const handleStartEdit = (e: React.MouseEvent) => {
    if (!isLiveEditing) return;
    e.stopPropagation();
    e.preventDefault();
    setDraftValue(currentValue);
    setIsEditingInline(true);
  };

  const handleSave = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    updateContent(contentKey, draftValue);
    setIsEditingInline(false);
  };

  const handleCancel = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setDraftValue(currentValue);
    setIsEditingInline(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !multiline) {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  if (!isLiveEditing) {
    return <Component className={className}>{children || currentValue}</Component>;
  }

  if (isEditingInline) {
    return (
      <span className="relative inline-flex items-center gap-1.5 p-1 bg-neutral-900 border-2 border-sky-400 rounded-lg shadow-xl z-30">
        {multiline ? (
          <textarea
            autoFocus
            rows={3}
            value={draftValue}
            onChange={(e) => setDraftValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full text-xs text-white bg-neutral-950 p-2 rounded border border-neutral-700 focus:outline-hidden leading-relaxed"
          />
        ) : (
          <input
            autoFocus
            type="text"
            value={draftValue}
            onChange={(e) => setDraftValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="text-xs text-white bg-neutral-950 px-2 py-1 rounded border border-neutral-700 focus:outline-hidden min-w-[200px]"
          />
        )}
        <button
          type="button"
          onClick={handleSave}
          className="p-1 rounded bg-sky-500 hover:bg-sky-400 text-neutral-950 transition-colors"
          title="저장 (Enter)"
        >
          <Check className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="p-1 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition-colors"
          title="취소 (Esc)"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </span>
    );
  }

  return (
    <Component
      onClick={handleStartEdit}
      className={`group relative cursor-pointer outline-dashed outline-1 outline-sky-400/50 hover:outline-2 hover:outline-sky-400 rounded px-1 -mx-1 transition-all ${className}`}
      title="클릭하여 즉시 실시간 수정 (Google Studio)"
    >
      {children || currentValue}
      <span className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-3.5 right-0 bg-sky-600 text-white text-[9px] font-black px-1.5 py-0.2 rounded-full shadow-md flex items-center gap-0.5 pointer-events-none z-20">
        <Edit2 className="h-2 w-2" />
        수정
      </span>
    </Component>
  );
};
