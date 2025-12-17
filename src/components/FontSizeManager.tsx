'use client';

import { Type, Minus, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';

type FontSize = 'small' | 'medium' | 'large';

const fontSizeMultipliers = {
  small: 0.875,   // 87.5%
  medium: 1,      // 100%
  large: 1.125,   // 112.5%
};

export function FontSizeManager() {
  const [fontSize, setFontSize] = useState<FontSize>('medium');
  const [mounted, setMounted] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    setMounted(true);
    const storedSize = localStorage.getItem('fontSize') as FontSize | null;
    const initialSize = storedSize || 'medium';
    setFontSize(initialSize);
    applyFontSize(initialSize);
  }, []);

  const applyFontSize = (size: FontSize) => {
    const root = document.documentElement;
    const multiplier = fontSizeMultipliers[size];
    root.style.fontSize = `${multiplier * 16}px`;
    localStorage.setItem('fontSize', size);
  };

  const changeFontSize = (newSize: FontSize) => {
    setFontSize(newSize);
    applyFontSize(newSize);
    setShowOptions(false);
  };

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-lg" style={{ backgroundColor: 'rgb(var(--secondary))' }} />
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowOptions(!showOptions)}
        className="p-2.5 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95"
        style={{
          backgroundColor: 'rgb(var(--secondary))',
        }}
        aria-label="Adjust font size"
        title="Adjust font size"
      >
        <Type className="w-5 h-5 transition-colors" style={{ color: 'rgb(var(--text-secondary))' }} />
      </button>

      {showOptions && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowOptions(false)}
          />
          
          {/* Dropdown */}
          <div
            className="absolute right-0 mt-2 rounded-lg shadow-lg border z-50 overflow-hidden"
            style={{
              backgroundColor: 'rgb(var(--card))',
              borderColor: 'rgb(var(--border))',
              minWidth: '180px',
            }}
          >
            <div
              className="px-3 py-2 text-xs font-semibold border-b"
              style={{
                color: 'rgb(var(--text-secondary))',
                borderColor: 'rgb(var(--border))',
              }}
            >
              Font Size
            </div>
            
            <button
              onClick={() => changeFontSize('small')}
              className="w-full px-4 py-2.5 text-left text-sm font-medium transition-colors flex items-center justify-between gap-2"
              style={{
                backgroundColor: fontSize === 'small' ? 'rgb(var(--secondary))' : 'transparent',
                color: 'rgb(var(--text-primary))',
              }}
            >
              <span className="flex items-center gap-2">
                <Minus className="w-4 h-4" />
                Small
              </span>
              {fontSize === 'small' && (
                <span className="text-xs" style={{ color: 'rgb(var(--primary))' }}>✓</span>
              )}
            </button>

            <button
              onClick={() => changeFontSize('medium')}
              className="w-full px-4 py-2.5 text-left text-sm font-medium transition-colors flex items-center justify-between gap-2"
              style={{
                backgroundColor: fontSize === 'medium' ? 'rgb(var(--secondary))' : 'transparent',
                color: 'rgb(var(--text-primary))',
              }}
            >
              <span className="flex items-center gap-2">
                <Type className="w-4 h-4" />
                Medium
              </span>
              {fontSize === 'medium' && (
                <span className="text-xs" style={{ color: 'rgb(var(--primary))' }}>✓</span>
              )}
            </button>

            <button
              onClick={() => changeFontSize('large')}
              className="w-full px-4 py-2.5 text-left text-sm font-medium transition-colors flex items-center justify-between gap-2"
              style={{
                backgroundColor: fontSize === 'large' ? 'rgb(var(--secondary))' : 'transparent',
                color: 'rgb(var(--text-primary))',
              }}
            >
              <span className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Large
              </span>
              {fontSize === 'large' && (
                <span className="text-xs" style={{ color: 'rgb(var(--primary))' }}>✓</span>
              )}
            </button>
          </div>
        </>
      )}
    </div>
  );
}