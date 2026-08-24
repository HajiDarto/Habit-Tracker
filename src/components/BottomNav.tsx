import React from 'react';
import { Timer, Activity, Droplets, CheckSquare } from 'lucide-react';
import { ActiveTab } from '../types';

interface BottomNavProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  isTimerRunning: boolean;
  waterGoalReached: boolean;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onTabChange,
  isTimerRunning,
  waterGoalReached
}) => {
  const tabs: { id: ActiveTab; label: string; icon: React.ReactNode; badge?: React.ReactNode }[] = [
    {
      id: 'timer',
      label: 'Timer',
      icon: <Timer className="w-5 h-5" />,
      badge: isTimerRunning ? (
        <span className="absolute top-1.5 right-4 w-2 h-2 bg-blue-500 rounded-full animate-ping" />
      ) : null
    },
    {
      id: 'stretches',
      label: 'Stretches',
      icon: <Activity className="w-5 h-5" />
    },
    {
      id: 'hydration',
      label: 'Hydration',
      icon: <Droplets className="w-5 h-5" />,
      badge: waterGoalReached ? (
        <span className="absolute top-1 right-3 text-[10px] bg-emerald-500 text-white rounded-full px-1 font-bold">
          ✓
        </span>
      ) : null
    },
    {
      id: 'dashboard',
      label: 'Habits',
      icon: <CheckSquare className="w-5 h-5" />
    }
  ];

  return (
    <nav className="sticky bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-100 px-3 py-2 pb-safe shadow-md">
      <div className="grid grid-cols-4 gap-1">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`relative flex flex-col items-center justify-center py-2 px-1 rounded-2xl transition-all duration-150 select-none active:scale-90 ${
                isActive
                  ? 'bg-slate-50 text-blue-600 font-bold'
                  : 'text-slate-400 hover:text-slate-700 font-medium'
              }`}
            >
              {tab.badge}
              <div
                className={`p-1 rounded-xl transition-colors ${
                  isActive ? 'text-blue-600' : 'text-slate-400'
                }`}
              >
                {tab.icon}
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight font-bold">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

