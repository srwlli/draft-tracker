'use client';

import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { DraftLayoutProvider, useDraftLayout } from '@/contexts/DraftLayoutContext';
import { copyToClipboard } from '@/lib/clipboard';

function DraftLayoutContent({ children }: { children: React.ReactNode }) {
  const { selectedPosition, setSelectedPosition, activeView, setActiveView, isClient, draft, isAdmin, headerVisible, contentRef, sentinelRef } = useDraftLayout();

  const handleCopyLink = async (text: string, successMessage: string) => {
    const success = await copyToClipboard(text);
    if (success) {
      toast.success(successMessage);
    } else {
      toast.error('Failed to copy link');
    }
  };

  if (!isClient) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Auto-hide Header */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-transform duration-300 ease-in-out ${
          headerVisible ? 'transform-none' : '-translate-y-full'
        }`}
      >
        <div className="container flex h-14 items-center justify-between">
          <h1 className="text-lg font-semibold truncate">{draft?.name || 'Fantasy Draft'}</h1>
          {isAdmin && (
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleCopyLink(`${window.location.origin}/draft/${window.location.pathname.split('/')[2]}`, 'Viewer link copied to clipboard')}
              >
                Viewer Link
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleCopyLink(window.location.href, 'Admin link copied to clipboard')}
              >
                Admin Link
              </Button>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className={`h-screen container mx-auto p-4 flex flex-col ${headerVisible ? 'pt-14' : ''}`}>
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
        <div ref={contentRef} className="flex-1 overflow-auto">
          {/* Intersection Observer Sentinel */}
          <div ref={sentinelRef} className="h-px" data-header-sentinel />
          {children}
          
          {/* Footer */}
          <footer className="border-t py-3 text-center text-sm text-muted-foreground mt-8">
            BBFL Draft Tracker 2025
          </footer>
        </div>
      </main>
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