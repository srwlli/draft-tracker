'use client';

import { useRouter } from 'next/navigation';
import { Home, Settings, ListOrdered, Users, Lock } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { BaseTabBar, TabItem } from '@/components/base-tab-bar';

interface BottomTabBarProps {
  isAdmin: boolean;
}

export function BottomTabBar({ isAdmin: _isAdmin }: BottomTabBarProps) {
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

  const handleLocks = () => {
    router.push('/locks');
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
      icon: <Users size={20} />,
      label: 'My Leagues',
      onClick: handleLeagues
    },
    {
      id: 'locks',
      icon: <Lock size={20} />,
      label: 'My Locks',
      onClick: handleLocks
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