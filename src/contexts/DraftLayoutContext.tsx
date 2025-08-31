'use client';

import { createContext, useContext, useState, useEffect, ReactNode, useRef } from 'react';
import { Position, Draft } from '@/types';

interface DraftLayoutContextType {
  selectedPosition: Position | 'ALL';
  setSelectedPosition: (position: Position | 'ALL') => void;
  activeView: 'available' | 'drafted' | 'stats';
  setActiveView: (view: 'available' | 'drafted' | 'stats') => void;
  isClient: boolean;
  draft: Draft | null;
  setDraft: (draft: Draft | null) => void;
  isAdmin: boolean;
  setIsAdmin: (isAdmin: boolean) => void;
  headerVisible: boolean;
  contentRef: React.RefObject<HTMLDivElement>;
}

const DraftLayoutContext = createContext<DraftLayoutContextType | undefined>(undefined);

export function DraftLayoutProvider({ children }: { children: ReactNode }) {
  const [selectedPosition, setSelectedPosition] = useState<Position | 'ALL'>('QB');
  const [activeView, setActiveView] = useState<'available' | 'drafted' | 'stats'>('available');
  const [isClient, setIsClient] = useState(false);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true);
  const [isTabChanging, setIsTabChanging] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Auto-hide header using Intersection Observer
  useEffect(() => {
    if (!isClient) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setHeaderVisible(entry.isIntersecting);
      },
      { 
        root: contentRef.current,
        threshold: 0,
        rootMargin: '0px'
      }
    );

    // Create sentinel element at top of content
    const sentinel = document.createElement('div');
    sentinel.style.height = '1px';
    sentinel.style.position = 'absolute';
    sentinel.style.top = '0';
    sentinel.style.width = '100%';
    sentinel.setAttribute('data-header-sentinel', '');

    const container = contentRef.current;
    if (container) {
      container.prepend(sentinel);
      observer.observe(sentinel);
      
      return () => {
        observer.disconnect();
        if (sentinel.parentNode) {
          sentinel.parentNode.removeChild(sentinel);
        }
      };
    }
  }, [isClient]);

  const handleViewChange = (view: 'available' | 'drafted' | 'stats') => {
    setActiveView(view);
  };

  return (
    <DraftLayoutContext.Provider value={{
      selectedPosition,
      setSelectedPosition,
      activeView,
      setActiveView: handleViewChange,
      isClient,
      draft,
      setDraft,
      isAdmin,
      setIsAdmin,
      headerVisible,
      contentRef
    }}>
      {children}
    </DraftLayoutContext.Provider>
  );
}

export function useDraftLayout() {
  const context = useContext(DraftLayoutContext);
  if (context === undefined) {
    throw new Error('useDraftLayout must be used within a DraftLayoutProvider');
  }
  return context;
}