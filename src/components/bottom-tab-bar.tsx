'use client';

import { useRouter } from 'next/navigation';
import { Home, Settings, ListOrdered, Trophy } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { BaseTabBar, TabItem } from '@/components/base-tab-bar';

interface BottomTabBarProps {
  isAdmin: boolean;
}

export function BottomTabBar({ isAdmin }: BottomTabBarProps) {
  const { user } = useAuth();
  const router = useRouter();

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

  const handleLeagues = () => {
    router.push('/leagues');
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
      id: 'ranks',
      icon: <ListOrdered size={20} />,
      label: 'My Ranks',
      onClick: handleRanks
    },
    {
      id: 'leagues',
      icon: <Trophy size={20} />,
      label: 'My Leagues',
      onClick: handleLeagues
    },
    {
      id: 'soon',
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