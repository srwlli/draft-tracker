'use client';

import { useRouter } from 'next/navigation';
import { Home, Settings } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { BaseTabBar, TabItem } from '@/components/base-tab-bar';

export function DashboardTabBar() {
  const { user } = useAuth();
  const router = useRouter();

  const handleHome = () => {
    if (user) {
      router.push('/dashboard');
    } else {
      router.push('/');
    }
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
      id: 'soon1',
      icon: <div className="w-5 h-5 rounded bg-muted" />,
      label: 'Soon',
      onClick: handleSoon
    },
    {
      id: 'soon2',
      icon: <div className="w-5 h-5 rounded bg-muted" />,
      label: 'Soon',
      onClick: handleSoon
    },
    {
      id: 'soon3',
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

  return <BaseTabBar items={tabItems} />;
}