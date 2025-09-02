'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Home, Share, Settings, ListOrdered } from 'lucide-react';
import { toast } from 'sonner';
import { copyToClipboard } from '@/lib/clipboard';
import { useAuth } from '@/contexts/AuthContext';
import { BaseTabBar, TabItem } from '@/components/base-tab-bar';

interface BottomTabBarProps {
  isAdmin: boolean;
}

export function BottomTabBar({ isAdmin }: BottomTabBarProps) {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const { user } = useAuth();
  const router = useRouter();

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
      router.push('/dashboard');
    } else {
      router.push('/');
    }
  };

  const handleRanks = () => {
    router.push('/ranks');
  };

  const handleSoon = () => {
    router.push('/soon');
  };

  const handleSettings = () => {
    router.push('/settings');
  };

  const tabItems: TabItem[] = [
    {
      id: 'home',
      icon: <Home size={20} />,
      label: 'Home',
      onClick: handleHome
    },
    {
      id: 'share',
      icon: <Share size={20} />,
      label: 'Share',
      onClick: handleShare,
      isActive: activeTab === 'share'
    },
    {
      id: 'ranks',
      icon: <ListOrdered size={20} />,
      label: 'My Ranks',
      onClick: handleRanks
    },
    {
      id: 'soon2',
      icon: <div className="w-5 h-5 rounded bg-muted" />,
      label: 'Soon',
      onClick: handleSoon
    },
    {
      id: 'settings',
      icon: <Settings size={20} />,
      label: 'Settings',
      onClick: handleSettings
    }
  ];

  const shareOverlay = isAdmin && activeTab === 'share' && (
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
  );

  return <BaseTabBar items={tabItems} overlay={shareOverlay} />;
}