'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Position, Draft } from '@/types';

interface DraftLayoutContextType {
  selectedPosition: Position | 'ALL';
  setSelectedPosition: (position: Position | 'ALL') => void;
  activeView: 'available' | 'drafted' | 'stats' | 'share';
  setActiveView: (view: 'available' | 'drafted' | 'stats' | 'share') => void;
  isClient: boolean;
  draft: Draft | null;
  setDraft: (draft: Draft | null) => void;
  isAdmin: boolean;
  setIsAdmin: (isAdmin: boolean) => void;
}

const DraftLayoutContext = createContext<DraftLayoutContextType | undefined>(undefined);

export function DraftLayoutProvider({ children }: { children: ReactNode }) {
  const [selectedPosition, setSelectedPosition] = useState<Position | 'ALL'>('QB');
  const [activeView, setActiveView] = useState<'available' | 'drafted' | 'stats' | 'share'>('available');
  const [isClient, setIsClient] = useState(false);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <DraftLayoutContext.Provider value={{
      selectedPosition,
      setSelectedPosition,
      activeView,
      setActiveView,
      isClient,
      draft,
      setDraft,
      isAdmin,
      setIsAdmin
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