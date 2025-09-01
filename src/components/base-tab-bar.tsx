'use client';

import { ReactNode } from 'react';

export interface TabItem {
  id: string;
  icon: ReactNode;
  label: string;
  onClick: () => void;
  isActive?: boolean;
  isDisabled?: boolean;
}

interface BaseTabBarProps {
  items: TabItem[];
  overlay?: ReactNode;
}

export function BaseTabBar({ items, overlay }: BaseTabBarProps) {
  return (
    <>
      {overlay}

      <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-5 h-16">
            {items.map((item) => (
              <button
                key={item.id}
                onClick={item.onClick}
                className={`flex flex-col items-center justify-center space-y-1 py-2 text-xs font-medium transition-colors ${
                  item.isDisabled 
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'hover:bg-secondary/50'
                } ${
                  item.isActive ? 'bg-secondary' : ''
                }`}
                disabled={item.isDisabled}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}