import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipForward, SkipBack, CheckCircle2, RotateCcw, Sparkles, Info } from 'lucide-react';
import { STRETCH_EXERCISES } from '../data/stretches';
import { StretchIllustration } from './StretchIllustrations';
import { sounds } from '../utils/audio';
import confetti from 'canvas-confetti';

interface StretchTabProps {
  soundEnabled: boolean;
  onRecordStretchComplete: () => void;
}

export const StretchTab: React.FC<StretchTabProps> = ({
  soundEnabled,
  onRecordStretchComplete
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [secondsRemaining, setSecondsRemaining] = useState(30);
  const [isActive, setIsActive] = useState(false);
  const [completedStretches, setCompletedStretches] = useState<string[]>([]);
  const [showCelebration, setShowCelebration] = useState(false);

  const currentExercise = STRETCH_EXERCISES[currentIndex];
  const timerRef = useRef<number | null>(null);

  // Handle countdown interval
  useEffect(() => {
    if (isActive) {
      timerRef.current = window.setInterval(() => {
        setSecondsRemaining((prev) => {
          if (prev <= 1) {
            // Exercise completed
            if (soundEnabled) sounds.playAlarmChime();
            
            // Mark current exercise as completed
            setCompletedStretches((current) => 
              current.includes(currentExercise.id) ? current : [...current, currentExercise.id]
            );

            // Check if last exercise
            if (currentIndex < STRETCH_EXERCISES.length - 1) {
              setCurrentIndex((idx) => idx + 1);
              return 30; // reset for next
            } else {
              // Whole routine completed!
              setIsActive(false);
              onRecordStretchComplete();
              setShowCelebration(true);
              if (soundEnabled) sounds.playSuccessFanfare();
              try {
                confetti({
                  particleCount: 80,
                  spread: 60,
                  origin: { y: 0.6 }
                });
              } catch {
                // confetti fallback
              }
              return 0;
            }
          }

          if (soundEnabled && prev <= 4 && prev > 1) {
            sounds.playTick();
          }

          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, currentIndex, currentExercise.id, soundEnabled, onRecordStretchComplete]);

  const handleTogglePlay = () => {
    if (secondsRemaining === 0) {
      setSecondsRemaining(30);
    }
    setIsActive(!isActive);
    if (soundEnabled) sounds.playTick();
  };

  const handleNext = () => {
    setIsActive(false);
    setSecondsRemaining(30);
    setCurrentIndex((prev) => (prev + 1) % STRETCH_EXERCISES.length);
    if (soundEnabled) sounds.playTick();
  };

  const handlePrev = () => {
    setIsActive(false);
    setSecondsRemaining(30);
    setCurrentIndex((prev) => (prev - 1 + STRETCH_EXERCISES.length) % STRETCH_EXERCISES.length);
    if (soundEnabled) sounds.playTick();
  };

  const handleResetCurrent = () => {
    setIsActive(false);
    setSecondsRemaining(30);
    if (soundEnabled) sounds.playTick();
  };

  const handleSelectStretch = (index: number) => {
    setIsActive(false);
    setSecondsRemaining(30);
    setCurrentIndex(index);
    if (soundEnabled) sounds.playTick();
  };

  // Circular gauge for 30s timer
  const progressRatio = (30 - secondsRemaining) / 30;
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeOffset = circumference * (1 - progressRatio);

  return (
    <div className="space-y-3">
      {/* Celebration Banner if finished */}
      {showCelebration && (
        <div className="bg-emerald-500 rounded-3xl p-4 text-white shadow-md flex items-center justify-between animate-bounce">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center text-xl">
              🎉
            </div>
            <div>
              <h4 className="font-bold text-xs">Full Stretch Routine Finished!</h4>
              <p className="text-[10px] text-emerald-100">Logged to your healthy habit streak.</p>
            </div>
          </div>
          <button
            onClick={() => setShowCelebration(false)}
            className="text-[11px] bg-white text-emerald-800 font-bold px-3 py-1.5 rounded-xl active:scale-95 shadow-xs"
          >
            Done
          </button>
        </div>
      )}

      {/* 1. Main Bento Tile: Stretch Guide */}
      <div className="bg-amber-50 rounded-3xl p-5 border border-amber-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
        {/* Decorative soft shape */}
        <div className="absolute -right-6 -top-6 w-32 h-32 bg-amber-100/60 rounded-full pointer-events-none" />

        {/* Top Header & Category */}
        <div className="z-10 flex items-center justify-between mb-2">
          <span className="px-2.5 py-0.5 bg-white border border-amber-200 text-amber-900 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            {currentExercise.category}
          </span>
          <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider">
            {currentIndex + 1} of {STRETCH_EXERCISES.length} Routine
          </span>
        </div>

        {/* Title and target muscle */}
        <div className="text-center my-1 z-10">
          <h2 className="text-xl font-black text-slate-900 tracking-tight leading-tight">
            {currentExercise.name}
          </h2>
          <p className="text-[11px] font-bold text-amber-700 mt-0.5">
            Focus: {currentExercise.targetMuscle}
          </p>
        </div>

        {/* Graphic & 30s Countdown Ring */}
        <div className="bg-white rounded-3xl p-3 my-3 flex items-center justify-around border border-amber-100/80 shadow-2xs z-10 relative">
          {/* Animated Illustration */}
          <div className="relative">
            <StretchIllustration type={currentExercise.svgType} className="w-32 h-32 drop-shadow-xs" />
          </div>

          {/* 30s Circular Countdown */}
          <div className="relative w-24 h-24 flex items-center justify-center flex-shrink-0">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 90 90">
              <circle
                cx="45"
                cy="45"
                r={radius}
                className="stroke-amber-100"
                strokeWidth="6"
                fill="transparent"
              />
              <circle
                cx="45"
                cy="45"
                r={radius}
                className="stroke-amber-500 transition-all duration-300 ease-linear"
                strokeWidth="6"
                strokeDasharray={circumference}
                strokeDashoffset={strokeOffset}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-xl font-black text-slate-900 font-mono">
                {String(secondsRemaining).padStart(2, '0')}s
              </span>
              <span className="text-[9px] uppercase font-bold text-amber-600">
                {isActive ? 'Active' : 'Ready'}
              </span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-center gap-2 z-10">
          <button
            onClick={handlePrev}
            className="w-11 h-11 rounded-xl bg-white hover:bg-amber-100/50 border border-amber-200 text-amber-900 flex items-center justify-center transition-all active:scale-90 shadow-2xs cursor-pointer"
            title="Previous Exercise"
          >
            <SkipBack className="w-4 h-4" />
          </button>

          <button
            onClick={handleTogglePlay}
            className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 text-white shadow-md transition-all active:scale-95 cursor-pointer ${
              isActive
                ? 'bg-slate-800 hover:bg-slate-900 shadow-slate-400/20'
                : 'bg-amber-500 hover:bg-amber-600 shadow-amber-300/40'
            }`}
          >
            {isActive ? (
              <>
                <Pause className="w-4 h-4 fill-white" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-white ml-0.5" />
                <span>{secondsRemaining < 30 ? 'Resume (30s)' : 'Start 30s Move'}</span>
              </>
            )}
          </button>

          <button
            onClick={handleNext}
            className="w-11 h-11 rounded-xl bg-white hover:bg-amber-100/50 border border-amber-200 text-amber-900 flex items-center justify-center transition-all active:scale-90 shadow-2xs cursor-pointer"
            title="Next Exercise"
          >
            <SkipForward className="w-4 h-4" />
          </button>

          <button
            onClick={handleResetCurrent}
            className="w-10 h-11 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-800 flex items-center justify-center transition-all active:scale-90 cursor-pointer"
            title="Reset 30s"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Step-by-Step Instructions */}
        <div className="mt-3 pt-3 border-t border-amber-200/60 z-10">
          <h4 className="text-[10px] font-bold text-amber-900 uppercase tracking-wider mb-1.5 flex items-center gap-1">
            <Info className="w-3 h-3 text-amber-600" />
            <span>Instructions</span>
          </h4>
          <ol className="space-y-1 text-xs text-slate-700 list-decimal list-inside pl-1 leading-relaxed">
            {currentExercise.instructions.map((step, idx) => (
              <li key={idx} className="marker:font-bold marker:text-amber-600">
                {step}
              </li>
            ))}
          </ol>

          {/* Coach's tip */}
          <div className="mt-2.5 bg-white/90 border border-amber-200/80 rounded-2xl p-2.5 text-[11px] text-amber-950 flex items-start gap-2 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Desk Pro-Tip: </span>
              {currentExercise.tips}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Bento Tile: Routine Playlist */}
      <div className="bg-slate-50 rounded-3xl p-4 border border-slate-100 shadow-xs">
        <h4 className="text-[10px] font-bold text-slate-900 uppercase tracking-wider mb-2.5 flex items-center justify-between">
          <span>Desk Moves Playlist</span>
          <span className="text-slate-500 font-bold">
            {completedStretches.length} of {STRETCH_EXERCISES.length} done
          </span>
        </h4>
        <div className="grid grid-cols-2 gap-2">
          {STRETCH_EXERCISES.map((ex, i) => {
            const isSelected = i === currentIndex;
            const isDone = completedStretches.includes(ex.id);
            return (
              <button
                key={ex.id}
                onClick={() => handleSelectStretch(i)}
                className={`p-2.5 rounded-2xl border text-left flex items-start justify-between gap-1.5 transition-all active:scale-95 cursor-pointer ${
                  isSelected
                    ? 'bg-amber-50 border-amber-400 ring-1 ring-amber-400'
                    : isDone
                    ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950 hover:border-emerald-300'
                    : 'bg-white border-slate-200/80 text-slate-700 hover:bg-slate-100 hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="text-xs font-bold leading-tight line-clamp-1">
                    {ex.name}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    {ex.category}
                  </div>
                </div>
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                ) : (
                  <div className="w-3.5 h-3.5 rounded-full border border-slate-300 flex-shrink-0 mt-0.5" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

