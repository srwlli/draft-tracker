'use client';

import { useState } from 'react';
import { Home, Share, Settings } from 'lucide-react';
import { toast } from 'sonner';
import { copyToClipboard } from '@/lib/clipboard';
import { useAuth } from '@/contexts/AuthContext';

interface BottomTabBarProps {
  isAdmin: boolean;
}

export function BottomTabBar({ isAdmin }: BottomTabBarProps) {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const { user } = useAuth();

  const handleShare = async () => {
    if (isAdmin) {
      // Admin gets both links - show menu
      setActiveTab(activeTab === 'share' ? null : 'share');
    } else {
      // Viewer gets viewer link only
      const viewerUrl = `${window.location.origin}/draft/${window.location.pathname.split('/')[2]}`;
      const success = await copyToClipboard(viewerUrl);
      if (success) {
        toast.success('Viewer link copied to clipboard');
      } else {
        toast.error('Failed to copy link');
      }
    }
  };

  const handleCopyAdminLink = async () => {
    const success = await copyToClipboard(window.location.href);
    if (success) {
      toast.success('Admin link copied to clipboard');
      setActiveTab(null);
    } else {
      toast.error('Failed to copy link');
    }
  };

  const handleCopyViewerLink = async () => {
    const viewerUrl = `${window.location.origin}/draft/${window.location.pathname.split('/')[2]}`;
    const success = await copyToClipboard(viewerUrl);
    if (success) {
      toast.success('Viewer link copied to clipboard');
      setActiveTab(null);
    } else {
      toast.error('Failed to copy link');
    }
  };

  const handleHome = () => {
    if (user) {
      window.location.href = '/dashboard';
    } else {
      window.location.href = '/';
    }
  };

  const handlePlaceholder = () => {
    // Future functionality
  };

  const handleSettings = () => {
    // Future functionality
  };

  return (
    <>
      {/* Share Menu Overlay for Admin */}
      {isAdmin && activeTab === 'share' && (
        <div className="fixed bottom-16 left-0 right-0 z-40 bg-background border-t shadow-lg">
          <div className="container mx-auto px-4 py-3 flex justify-center space-x-4">
            <button
              onClick={handleCopyViewerLink}
              className="px-4 py-2 text-sm bg-secondary rounded-md hover:bg-secondary/80 transition-colors"
            >
              Copy Viewer Link
            </button>
            <button
              onClick={handleCopyAdminLink}
              className="px-4 py-2 text-sm bg-secondary rounded-md hover:bg-secondary/80 transition-colors"
            >
              Copy Admin Link
            </button>
          </div>
        </div>
      )}

      {/* Bottom Tab Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-5 h-16">
            <button
              onClick={handleHome}
              className="flex flex-col items-center justify-center space-y-1 py-2 text-xs font-medium transition-colors hover:bg-secondary/50"
            >
              <Home size={20} />
              <span>Home</span>
            </button>
            
            <button
              onClick={handleShare}
              className={`flex flex-col items-center justify-center space-y-1 py-2 text-xs font-medium transition-colors hover:bg-secondary/50 ${
                activeTab === 'share' ? 'bg-secondary' : ''
              }`}
            >
              <Share size={20} />
              <span>Share</span>
            </button>
            
            <button
              onClick={handlePlaceholder}
              className="flex flex-col items-center justify-center space-y-1 py-2 text-xs font-medium transition-colors hover:bg-secondary/50 opacity-50 cursor-not-allowed"
            >
              <div className="w-5 h-5 rounded bg-muted" />
              <span>Soon</span>
            </button>
            
            <button
              onClick={handlePlaceholder}
              className="flex flex-col items-center justify-center space-y-1 py-2 text-xs font-medium transition-colors hover:bg-secondary/50 opacity-50 cursor-not-allowed"
            >
              <div className="w-5 h-5 rounded bg-muted" />
              <span>Soon</span>
            </button>
            
            <button
              onClick={handleSettings}
              className="flex flex-col items-center justify-center space-y-1 py-2 text-xs font-medium transition-colors hover:bg-secondary/50 opacity-50 cursor-not-allowed"
            >
              <Settings size={20} />
              <span>Settings</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}