import React from 'react';
import { Play, Pause, RotateCcw, Sliders, Activity, Sparkles, Coffee } from 'lucide-react';
import { ActiveTab } from '../types';

interface TimerTabProps {
  timeRemainingSeconds: number;
  totalDurationSeconds: number;
  isRunning: boolean;
  onToggleTimer: () => void;
  onResetTimer: () => void;
  onOpenSettings: () => void;
  onSelectPresetMinutes: (mins: number) => void;
  onSwitchTab: (tab: ActiveTab) => void;
  breaksCompleted: number;
  breakTarget: number;
}

export const TimerTab: React.FC<TimerTabProps> = ({
  timeRemainingSeconds,
  totalDurationSeconds,
  isRunning,
  onToggleTimer,
  onResetTimer,
  onOpenSettings,
  onSelectPresetMinutes,
  onSwitchTab,
  breaksCompleted,
  breakTarget
}) => {
  const minutes = Math.floor(timeRemainingSeconds / 60);
  const seconds = timeRemainingSeconds % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  // Calculate circular SVG progress
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const progressRatio = totalDurationSeconds > 0 ? (totalDurationSeconds - timeRemainingSeconds) / totalDurationSeconds : 0;
  const strokeDashoffset = circumference * (1 - progressRatio);

  const presets = [
    { label: '25m', mins: 25, desc: 'Pomodoro' },
    { label: '45m', mins: 45, desc: 'Ergo' },
    { label: '60m', mins: 60, desc: 'Deep' }
  ];

  const currentIntervalMins = Math.round(totalDurationSeconds / 60);

  return (
    <div className="space-y-3">
      {/* 1. Main Bento Tile: Sedentary Alarm */}
      <div className="bg-blue-50 rounded-3xl p-5 border border-blue-100 flex flex-col justify-between relative overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        {/* Background decorative blob from Bento design */}
        <div className="absolute -right-6 -top-6 w-32 h-32 bg-blue-100/70 rounded-full pointer-events-none" />

        <div className="z-10 flex items-center justify-between mb-2">
          <div>
            <h2 className="text-blue-900 text-xs font-bold uppercase tracking-wider">Sedentary Timer</h2>
            <p className="text-[10px] text-blue-500 font-bold uppercase mt-0.5">
              {isRunning ? 'Counting down to break' : 'Interval alarm ready'}
            </p>
          </div>
          <button
            onClick={onOpenSettings}
            className="p-2 rounded-xl bg-white/80 border border-blue-200 text-blue-700 hover:bg-white hover:border-blue-300 transition-all text-xs font-bold flex items-center gap-1 active:scale-95 shadow-2xs cursor-pointer"
            title="Configure Timer Settings"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Options</span>
          </button>
        </div>

        {/* Circular Dial & Center Number */}
        <div className="relative w-48 h-48 mx-auto my-2 flex items-center justify-center z-10">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 190 190">
            <circle
              cx="95"
              cy="95"
              r={radius}
              className="stroke-blue-100/90"
              strokeWidth="10"
              fill="transparent"
            />
            <circle
              cx="95"
              cy="95"
              r={radius}
              className="stroke-blue-600 transition-all duration-500 ease-out"
              strokeWidth="10"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <p className="text-4xl font-black text-blue-600 font-mono tracking-tight leading-none">
              {formattedTime}
            </p>
            <p className="text-[10px] text-blue-400 mt-1 uppercase font-bold tracking-wider">
              {isRunning ? 'Until Next Break' : `${currentIntervalMins}m Target`}
            </p>
            <span className="text-[10px] font-bold text-blue-700 bg-white/80 border border-blue-200/80 px-2 py-0.5 rounded-full mt-1.5 shadow-2xs">
              {Math.round(progressRatio * 100)}% Elapsed
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex gap-2 z-10 mt-2">
          <button
            onClick={onToggleTimer}
            className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer ${
              isRunning
                ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-amber-500/20'
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-300/40'
            }`}
          >
            {isRunning ? (
              <>
                <Pause className="w-4 h-4 fill-white" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-white ml-0.5" />
                <span>{timeRemainingSeconds < totalDurationSeconds ? 'Resume' : 'Start Focus'}</span>
              </>
            )}
          </button>

          <button
            onClick={onResetTimer}
            className="p-3 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-xl border border-blue-200 active:scale-95 transition-all flex items-center justify-center cursor-pointer"
            title="Reset timer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. Bento Subgrid: Quick Presets (Left) & Stretch Teaser (Right) */}
      <div className="grid grid-cols-2 gap-3">
        {/* Quick Presets Bento Tile */}
        <div className="bg-slate-50 rounded-3xl p-4 border border-slate-100 flex flex-col justify-between shadow-xs">
          <div>
            <h3 className="text-slate-900 text-[10px] font-bold uppercase tracking-wider mb-2 flex items-center gap-1">
              <Coffee className="w-3.5 h-3.5 text-slate-500" />
              <span>Intervals</span>
            </h3>
            <div className="space-y-1.5">
              {presets.map((preset) => {
                const isSelected = currentIntervalMins === preset.mins;
                return (
                  <button
                    key={preset.mins}
                    onClick={() => onSelectPresetMinutes(preset.mins)}
                    className={`w-full py-1.5 px-2 rounded-xl text-left flex items-center justify-between border transition-all active:scale-95 ${
                      isSelected
                        ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                        : 'bg-white text-slate-700 border-slate-200/80 hover:bg-slate-100'
                    }`}
                  >
                    <span className="text-[11px] font-bold">{preset.label}</span>
                    <span className={`text-[9px] ${isSelected ? 'text-blue-100' : 'text-slate-400'}`}>
                      {preset.desc}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Stretch Routine Bento Tile */}
        <div className="bg-amber-50 rounded-3xl p-4 border border-amber-100 flex flex-col justify-between shadow-xs">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-amber-900 text-[10px] font-bold uppercase tracking-wider">Stretch Guide</h3>
              <span className="text-[10px] bg-amber-200/80 text-amber-900 px-1.5 py-0.5 rounded-full font-bold">
                {breaksCompleted}/{breakTarget}
              </span>
            </div>
            
            <div className="flex flex-col items-center justify-center my-1">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center border-2 border-amber-200 mb-1.5 shadow-2xs">
                <Activity className="w-6 h-6 text-amber-500" />
              </div>
              <p className="text-[11px] font-bold text-amber-900 leading-tight text-center">
                Quick Decompress
              </p>
              <p className="text-[9px] text-amber-600 text-center mt-0.5">
                30s Desk Moves
              </p>
            </div>
          </div>

          <button
            onClick={() => onSwitchTab('stretches')}
            className="w-full py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-[10px] font-bold shadow-xs active:scale-95 transition-all text-center mt-2"
          >
            Launch Stretches
          </button>
        </div>
      </div>

      {/* 3. Healthy Movement Tip Bento Tile */}
      <div className="bg-emerald-50 rounded-3xl p-4 border border-emerald-100 flex items-center gap-3 shadow-xs">
        <div className="w-10 h-10 rounded-2xl bg-white text-emerald-600 flex items-center justify-center flex-shrink-0 shadow-2xs">
          <Sparkles className="w-5 h-5" />
        </div>
        <div className="text-xs">
          <span className="font-bold text-emerald-950">Ergonomic Rule: </span>
          <span className="text-emerald-800 text-[11px]">
            For every 45m seated, stand up for 2 minutes, stretch cervical spine, and drink water.
          </span>
        </div>
      </div>
    </div>
  );
};

