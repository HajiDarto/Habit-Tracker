import React from 'react';
import { Flame, Settings, Volume2, VolumeX, Code2, LayoutGrid, Clock, Activity, Droplets, CheckSquare } from 'lucide-react';
import { ActiveTab } from '../types';

interface NavbarProps {
  streak: number;
  soundEnabled: boolean;
  activeTab?: ActiveTab;
  onSelectTab?: (tab: ActiveTab) => void;
  onToggleSound: () => void;
  onOpenSettings: () => void;
  onOpenExport: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  streak,
  soundEnabled,
  activeTab = 'timer',
  onSelectTab,
  onToggleSound,
  onOpenSettings,
  onOpenExport
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md px-4 sm:px-6 py-3.5 border-b border-slate-100/90 shadow-2xs">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        {/* Brand identity & Status */}
        <div className="flex items-center justify-between sm:justify-start gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-black text-base shadow-sm shadow-emerald-600/20">
              V
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight leading-none">
                  VitalFlow
                </h1>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                  Dashboard
                </span>
              </div>
              <p className="text-[11px] font-medium text-slate-500 mt-0.5">
                Movement, Sedentary Alarm & Habit Tracker
              </p>
            </div>
          </div>

          {/* Mobile Streak badge */}
          <div className="sm:hidden flex items-center gap-1 bg-amber-50 border border-amber-200/90 text-amber-800 px-2.5 py-1 rounded-xl text-[11px] font-bold">
            <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>{streak}d</span>
          </div>
        </div>

        {/* Desktop View Selector Tabs (lg:flex) */}
        {onSelectTab && (
          <nav className="hidden lg:flex items-center p-1 bg-slate-100/80 rounded-2xl border border-slate-200/70 shadow-inner">
            <button
              onClick={() => onSelectTab('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-white text-emerald-800 shadow-xs ring-1 ring-slate-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5 text-emerald-600" />
              <span>3-Col Grid</span>
            </button>

            <button
              onClick={() => onSelectTab('timer')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'timer'
                  ? 'bg-white text-blue-800 shadow-xs ring-1 ring-slate-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <Clock className="w-3.5 h-3.5 text-blue-600" />
              <span>Timer</span>
            </button>

            <button
              onClick={() => onSelectTab('dashboard')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'dashboard'
                  ? 'bg-white text-emerald-800 shadow-xs ring-1 ring-slate-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <CheckSquare className="w-3.5 h-3.5 text-emerald-600" />
              <span>Habits</span>
            </button>

            <button
              onClick={() => onSelectTab('hydration')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'hydration'
                  ? 'bg-white text-sky-800 shadow-xs ring-1 ring-slate-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <Droplets className="w-3.5 h-3.5 text-sky-600" />
              <span>Hydration</span>
            </button>

            <button
              onClick={() => onSelectTab('stretches')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'stretches'
                  ? 'bg-white text-amber-800 shadow-xs ring-1 ring-slate-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <Activity className="w-3.5 h-3.5 text-amber-600" />
              <span>Stretches</span>
            </button>
          </nav>
        )}

        {/* Action icons */}
        <div className="flex items-center justify-end gap-1.5">
          {/* Desktop Streak pill */}
          <div 
            className="hidden sm:flex items-center gap-1 bg-amber-50 border border-amber-200/90 text-amber-800 px-3 py-1.5 rounded-xl text-xs font-bold shadow-2xs"
            title={`${streak} day streak`}
          >
            <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span>{streak} Day Streak</span>
          </div>

          {/* Sound toggle */}
          <button
            onClick={onToggleSound}
            className={`p-2 sm:px-3 sm:py-2 rounded-xl border transition-all cursor-pointer active:scale-95 flex items-center gap-1.5 text-xs font-semibold ${
              soundEnabled
                ? 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300'
                : 'bg-rose-50 border-rose-200 text-rose-500 hover:bg-rose-100'
            }`}
            title={soundEnabled ? 'Mute Audio Chimes' : 'Unmute Audio Chimes'}
            aria-label="Sound Toggle"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-slate-600" /> : <VolumeX className="w-4 h-4" />}
            <span className="hidden md:inline">{soundEnabled ? 'Sound On' : 'Muted'}</span>
          </button>

          {/* Export Standalone HTML (Vanilla JS) */}
          <button
            onClick={onOpenExport}
            className="p-2 sm:px-3 sm:py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 hover:bg-emerald-100 hover:border-emerald-300 transition-all cursor-pointer active:scale-95 flex items-center gap-1.5 text-xs font-semibold shadow-2xs"
            title="Export Standalone HTML / Single-File Code"
            aria-label="Export Code"
          >
            <Code2 className="w-4 h-4 text-emerald-600" />
            <span className="hidden md:inline">Export Code</span>
          </button>

          {/* Settings */}
          <button
            onClick={onOpenSettings}
            className="p-2 sm:px-3 sm:py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300 transition-all cursor-pointer active:scale-95 flex items-center gap-1.5 text-xs font-semibold shadow-2xs"
            title="Timer & Goal Settings"
            aria-label="Settings"
          >
            <Settings className="w-4 h-4 text-slate-600" />
            <span className="hidden md:inline">Settings</span>
          </button>
        </div>
      </div>
    </header>
  );
};


