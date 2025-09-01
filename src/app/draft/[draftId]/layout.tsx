'use client';

import { DraftLayoutProvider, useDraftLayout } from '@/contexts/DraftLayoutContext';
import { BottomTabBar } from '@/components/bottom-tab-bar';

function DraftLayoutContent({ children }: { children: React.ReactNode }) {
  const { selectedPosition, setSelectedPosition, activeView, setActiveView, isClient, draft, isAdmin } = useDraftLayout();


  if (!isClient) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="h-screen flex flex-col">
      {/* Main Content */}
      <main className="h-full container mx-auto p-4 flex flex-col">
        {/* Position Tabs - Fixed */}
        <div className="flex-shrink-0 pb-2">
          <div className="w-full px-2 grid grid-cols-6 bg-muted rounded-lg p-1">
            <button 
              className={`py-1.5 px-2 rounded-md text-sm font-medium transition-colors ${
                selectedPosition === 'QB' ? 'bg-background shadow-sm' : 'hover:bg-background/50'
              }`}
              onClick={() => setSelectedPosition('QB')}
            >
              QB
            </button>
            <button 
              className={`py-1.5 px-2 rounded-md text-sm font-medium transition-colors ${
                selectedPosition === 'RB' ? 'bg-background shadow-sm' : 'hover:bg-background/50'
              }`}
              onClick={() => setSelectedPosition('RB')}
            >
              RB
            </button>
            <button 
              className={`py-1.5 px-2 rounded-md text-sm font-medium transition-colors ${
                selectedPosition === 'WR' ? 'bg-background shadow-sm' : 'hover:bg-background/50'
              }`}
              onClick={() => setSelectedPosition('WR')}
            >
              WR
            </button>
            <button 
              className={`py-1.5 px-2 rounded-md text-sm font-medium transition-colors ${
                selectedPosition === 'TE' ? 'bg-background shadow-sm' : 'hover:bg-background/50'
              }`}
              onClick={() => setSelectedPosition('TE')}
            >
              TE
            </button>
            <button 
              className={`py-1.5 px-2 rounded-md text-sm font-medium transition-colors ${
                selectedPosition === 'K' ? 'bg-background shadow-sm' : 'hover:bg-background/50'
              }`}
              onClick={() => setSelectedPosition('K')}
            >
              K
            </button>
            <button 
              className={`py-1.5 px-2 rounded-md text-sm font-medium transition-colors ${
                selectedPosition === 'DEF' ? 'bg-background shadow-sm' : 'hover:bg-background/50'
              }`}
              onClick={() => setSelectedPosition('DEF')}
            >
              DEF
            </button>
          </div>
        </div>

        {/* View Tabs - Fixed */}
        <div className="flex-shrink-0 pb-2">
          <div className="w-full grid grid-cols-3 bg-muted rounded-lg p-1">
            <button 
              className={`py-1.5 px-2 rounded-md text-sm font-medium transition-colors ${
                activeView === 'available' ? 'bg-background shadow-sm' : 'hover:bg-background/50'
              }`}
              onClick={() => setActiveView('available')}
            >
              Available
            </button>
            <button 
              className={`py-1.5 px-2 rounded-md text-sm font-medium transition-colors ${
                activeView === 'drafted' ? 'bg-background shadow-sm' : 'hover:bg-background/50'
              }`}
              onClick={() => setActiveView('drafted')}
            >
              Drafted
            </button>
            <button 
              className={`py-1.5 px-2 rounded-md text-sm font-medium transition-colors ${
                activeView === 'stats' ? 'bg-background shadow-sm' : 'hover:bg-background/50'
              }`}
              onClick={() => setActiveView('stats')}
            >
              Stats
            </button>
          </div>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-auto">
          {children}
          
          {/* Footer */}
          <footer className="border-t py-3 text-center text-sm text-muted-foreground mt-8 mb-16">
            BBFL Draft Tracker 2025
          </footer>
        </div>
      </main>

      {/* Bottom Tab Bar */}
      <BottomTabBar isAdmin={isAdmin} />
    </div>
  );
}

export default function DraftLayout({ children }: { children: React.ReactNode }) {
  return (
    <DraftLayoutProvider>
      <DraftLayoutContent>{children}</DraftLayoutContent>
    </DraftLayoutProvider>
  );
}