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
  contentRef: React.RefObject<HTMLDivElement | null>;
  sentinelRef: React.RefObject<HTMLDivElement | null>;
}

const DraftLayoutContext = createContext<DraftLayoutContextType | undefined>(undefined);

export function DraftLayoutProvider({ children }: { children: ReactNode }) {
  const [selectedPosition, setSelectedPosition] = useState<Position | 'ALL'>('QB');
  const [activeView, setActiveView] = useState<'available' | 'drafted' | 'stats'>('available');
  const [isClient, setIsClient] = useState(false);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true);
  const contentRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

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

    const sentinel = sentinelRef.current;
    if (sentinel) {
      observer.observe(sentinel);
      return () => observer.disconnect();
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
      contentRef,
      sentinelRef
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