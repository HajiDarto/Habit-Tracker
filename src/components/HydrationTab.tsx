import React, { useState } from 'react';
import { Droplets, Plus, RotateCcw, Award, Sparkles, CheckCircle2, Sliders } from 'lucide-react';
import { sounds } from '../utils/audio';
import confetti from 'canvas-confetti';

interface HydrationTabProps {
  waterIntakeMl: number;
  waterGoalGlasses: number;
  soundEnabled: boolean;
  onAddWater: (amountMl: number) => void;
  onUndoWater: () => void;
  onUpdateGoalGlasses: (glasses: number) => void;
}

export const HydrationTab: React.FC<HydrationTabProps> = ({
  waterIntakeMl,
  waterGoalGlasses,
  soundEnabled,
  onAddWater,
  onUndoWater,
  onUpdateGoalGlasses
}) => {
  const [showGoalSelector, setShowGoalSelector] = useState(false);

  const targetMl = waterGoalGlasses * 250;
  const currentGlasses = (waterIntakeMl / 250);
  const percentage = Math.min(100, Math.round((waterIntakeMl / targetMl) * 100));
  const isGoalAchieved = waterIntakeMl >= targetMl;

  const handleAdd = (amountMl: number) => {
    onAddWater(amountMl);
    if (soundEnabled) sounds.playWaterDrop();

    // If this entry hits or surpasses goal, celebrate
    if (waterIntakeMl + amountMl >= targetMl && waterIntakeMl < targetMl) {
      if (soundEnabled) sounds.playSuccessFanfare();
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.7 }
        });
      } catch {
        // fallback
      }
    }
  };

  const handleUndo = () => {
    onUndoWater();
    if (soundEnabled) sounds.playTick();
  };

  return (
    <div className="space-y-3">
      {/* 1. Main Bento Tile: Hydration Dashboard */}
      <div className="bg-emerald-50 rounded-3xl p-5 border border-emerald-100 flex flex-col justify-between relative overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        {/* Decorative soft bubble */}
        <div className="absolute -right-6 -top-6 w-32 h-32 bg-emerald-100/60 rounded-full pointer-events-none" />

        <div className="z-10 flex items-center justify-between mb-2">
          <div>
            <h2 className="text-emerald-900 text-xs font-bold uppercase tracking-wider">Hydration Monitor</h2>
            <p className="text-[10px] text-emerald-600 font-bold uppercase mt-0.5">
              {isGoalAchieved ? 'Daily Goal Achieved' : `${(targetMl - waterIntakeMl).toLocaleString()} ml to reach goal`}
            </p>
          </div>
          <button
            onClick={() => setShowGoalSelector(!showGoalSelector)}
            className="p-2 rounded-xl bg-white/80 border border-emerald-200 text-emerald-800 hover:bg-white hover:border-emerald-300 transition-all text-xs font-bold flex items-center gap-1 active:scale-95 shadow-2xs cursor-pointer"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>{showGoalSelector ? 'Close' : 'Target'}</span>
          </button>
        </div>

        {/* Goal Achieved Ribbon */}
        {isGoalAchieved && (
          <div className="z-10 inline-flex items-center justify-center gap-1.5 bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm mb-2 self-center animate-bounce">
            <Award className="w-3.5 h-3.5" />
            <span>🎉 Daily Hydration Target Reached!</span>
          </div>
        )}

        {/* Center Droplet Level Indicator */}
        <div className="relative w-44 h-44 mx-auto my-2 flex items-center justify-center z-10">
          <div className="w-full h-full rounded-full border-4 border-emerald-200/90 bg-white/80 backdrop-blur-xs flex items-center justify-center p-3 shadow-inner relative overflow-hidden">
            {/* Water Fill Layer */}
            <div
              className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-emerald-500 to-teal-400 transition-all duration-700 ease-out"
              style={{ height: `${percentage}%` }}
            >
              <div className="absolute top-0 left-0 right-0 h-2 bg-emerald-200/50" />
            </div>

            {/* Inner Content overlay */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center">
              <div className="w-8 h-8 rounded-xl bg-white/90 shadow-2xs flex items-center justify-center mb-1">
                <Droplets className="w-5 h-5 text-emerald-600" />
              </div>
              <p className={`text-3xl font-black tracking-tight leading-none ${percentage > 50 ? 'text-white' : 'text-slate-900'}`}>
                {currentGlasses % 1 === 0 ? currentGlasses : currentGlasses.toFixed(1)}
                <span className="text-sm font-semibold opacity-80"> / {waterGoalGlasses}</span>
              </p>
              <p className={`text-[10px] uppercase font-bold tracking-wider mt-1 ${percentage > 50 ? 'text-emerald-100' : 'text-emerald-700'}`}>
                Glasses Today
              </p>
              <span className={`text-[10px] font-bold mt-1 px-2 py-0.5 rounded-full ${percentage > 50 ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-800'}`}>
                {percentage}% Done
              </span>
            </div>
          </div>
        </div>

        {/* Milliliters tally */}
        <div className="text-center z-10 mt-1">
          <div className="text-lg font-black text-slate-800 font-mono">
            {waterIntakeMl.toLocaleString()} <span className="text-xs font-semibold text-slate-500">/ {targetMl.toLocaleString()} ml</span>
          </div>
        </div>
      </div>

      {/* Target selector drawer */}
      {showGoalSelector && (
        <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-3xl animate-in fade-in duration-150">
          <div className="text-[11px] font-bold text-slate-800 uppercase tracking-wider mb-2">Select Daily Target:</div>
          <div className="grid grid-cols-4 gap-1.5">
            {[6, 8, 10, 12].map((g) => (
              <button
                key={g}
                onClick={() => {
                  onUpdateGoalGlasses(g);
                  if (soundEnabled) sounds.playTick();
                }}
                className={`py-2 rounded-xl text-xs font-bold border transition-all active:scale-95 ${
                  waterGoalGlasses === g
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {g} gl
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 2. Bento Action Card: Quick Add Buttons */}
      <div className="bg-slate-50 rounded-3xl p-4 border border-slate-100 shadow-xs">
        <h3 className="text-[10px] font-bold text-slate-900 uppercase tracking-wider mb-2.5">
          Quick Log
        </h3>

        <div className="grid grid-cols-2 gap-2.5">
          {/* +1 Glass (250ml) */}
          <button
            onClick={() => handleAdd(250)}
            className="py-3 px-3 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs flex flex-col items-center justify-center gap-0.5 shadow-md shadow-emerald-200 active:scale-95 transition-all cursor-pointer"
          >
            <div className="flex items-center gap-1">
              <Plus className="w-4 h-4" />
              <span>1 Glass</span>
            </div>
            <span className="text-[10px] font-normal opacity-90">+250 ml</span>
          </button>

          {/* +1 Bottle (500ml) */}
          <button
            onClick={() => handleAdd(500)}
            className="py-3 px-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex flex-col items-center justify-center gap-0.5 shadow-md shadow-blue-200 active:scale-95 transition-all cursor-pointer"
          >
            <div className="flex items-center gap-1">
              <Plus className="w-4 h-4" />
              <span>1 Bottle</span>
            </div>
            <span className="text-[10px] font-normal opacity-90">+500 ml</span>
          </button>
        </div>

        {/* Undo button */}
        <div className="mt-2.5 flex items-center justify-center">
          <button
            onClick={handleUndo}
            disabled={waterIntakeMl === 0}
            className={`text-xs font-semibold py-1.5 px-3 rounded-xl flex items-center gap-1.5 transition-all ${
              waterIntakeMl === 0
                ? 'text-slate-300 cursor-not-allowed'
                : 'text-slate-500 hover:text-slate-800 hover:bg-white active:scale-95'
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Undo last entry (-250ml)</span>
          </button>
        </div>
      </div>

      {/* 3. Hydration Benefits Bento Tile */}
      <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-xs">
        <h4 className="text-xs font-bold text-slate-900 mb-2 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>Desk Focus Benefits</span>
        </h4>
        <ul className="space-y-1.5 text-xs text-slate-600">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
            <span>Flushes lactic build-up and prevents afternoon fatigue.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
            <span>Lubricates spinal discs compressed by seated posture.</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

