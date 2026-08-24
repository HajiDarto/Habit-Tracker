import React, { useState } from 'react';
import { Check, Plus, Droplets, Activity, Flame, Sparkles, ChevronRight, Award, Trash2 } from 'lucide-react';
import { HabitItem, ActiveTab } from '../types';
import { sounds } from '../utils/audio';

interface DashboardTabProps {
  habits: HabitItem[];
  waterIntakeMl: number;
  waterGoalGlasses: number;
  breaksCompleted: number;
  breakTarget: number;
  stretchesCompleted: number;
  streak: number;
  soundEnabled: boolean;
  onToggleHabit: (id: string) => void;
  onAddHabit: (label: string) => void;
  onDeleteHabit: (id: string) => void;
  onAdjustBreaks: (delta: number) => void;
  onSwitchTab: (tab: ActiveTab) => void;
}

export const DashboardTab: React.FC<DashboardTabProps> = ({
  habits,
  waterIntakeMl,
  waterGoalGlasses,
  breaksCompleted,
  breakTarget,
  stretchesCompleted,
  streak,
  soundEnabled,
  onToggleHabit,
  onAddHabit,
  onDeleteHabit,
  onAdjustBreaks,
  onSwitchTab
}) => {
  const [newHabitText, setNewHabitText] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const targetWaterMl = waterGoalGlasses * 250;
  const waterPercentage = Math.min(100, Math.round((waterIntakeMl / targetWaterMl) * 100));
  const completedHabitsCount = habits.filter(h => h.completed).length;
  const habitCompletionRate = habits.length > 0 ? Math.round((completedHabitsCount / habits.length) * 100) : 0;

  const handleToggle = (id: string) => {
    onToggleHabit(id);
    if (soundEnabled) sounds.playTick();
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHabitText.trim()) return;
    onAddHabit(newHabitText.trim());
    setNewHabitText('');
    setIsAdding(false);
    if (soundEnabled) sounds.playTick();
  };

  return (
    <div className="space-y-3">
      {/* 1. Main Bento Tile: Daily Health Scorecard */}
      <div className="bg-emerald-50 rounded-3xl p-5 border border-emerald-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
        {/* Soft background shape */}
        <div className="absolute -right-6 -top-6 w-32 h-32 bg-emerald-100/60 rounded-full pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-emerald-900 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Daily Health Score</span>
            </span>
            <div className="flex items-center gap-1 text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-200 px-2 py-0.5 rounded-xl shadow-2xs">
              <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>{streak}d Streak</span>
            </div>
          </div>

          <div className="flex items-center justify-between my-2">
            <div>
              <div className="text-4xl font-black text-emerald-700 tracking-tight">{habitCompletionRate}%</div>
              <div className="text-[11px] text-emerald-800 font-semibold mt-0.5">
                {completedHabitsCount} of {habits.length} goals achieved today
              </div>
            </div>

            {/* Circular score gauge */}
            <div className="relative w-16 h-16 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 60 60">
                <circle cx="30" cy="30" r="24" className="stroke-emerald-200/80" strokeWidth="6" fill="transparent" />
                <circle
                  cx="30"
                  cy="30"
                  r="24"
                  className="stroke-emerald-600 transition-all duration-500"
                  strokeWidth="6"
                  strokeDasharray={150.8}
                  strokeDashoffset={150.8 * (1 - habitCompletionRate / 100)}
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>
              <span className="absolute text-xs font-black text-emerald-900">{habitCompletionRate}%</span>
            </div>
          </div>

          {/* Bento progress bar */}
          <div className="w-full bg-emerald-200/60 h-2 rounded-full mt-2 overflow-hidden">
            <div
              className="bg-emerald-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${habitCompletionRate}%` }}
            />
          </div>
        </div>
      </div>

      {/* 2. Bento Subgrid: Hydration (Left) & Movement Breaks (Right) */}
      <div className="grid grid-cols-2 gap-3">
        {/* Hydration Bento Card */}
        <div 
          onClick={() => onSwitchTab('hydration')}
          className="bg-blue-50 rounded-3xl p-4 border border-blue-100 shadow-xs hover:shadow-md hover:border-blue-200 cursor-pointer transition-all active:scale-95 flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="w-8 h-8 rounded-xl bg-white text-blue-600 flex items-center justify-center shadow-2xs">
              <Droplets className="w-4 h-4" />
            </div>
            <ChevronRight className="w-4 h-4 text-blue-400" />
          </div>
          <div>
            <div className="text-[10px] font-bold text-blue-900 uppercase tracking-wider">Hydration</div>
            <div className="text-xl font-black text-blue-600 mt-0.5">
              {waterPercentage}%
            </div>
            <div className="text-[10px] text-blue-500 font-medium">
              {waterIntakeMl} / {targetWaterMl} ml
            </div>
          </div>
          <div className="w-full bg-blue-200/60 h-1.5 rounded-full mt-2.5 overflow-hidden">
            <div className="bg-blue-600 h-full rounded-full" style={{ width: `${waterPercentage}%` }} />
          </div>
        </div>

        {/* Breaks Completed Bento Card */}
        <div className="bg-amber-50 rounded-3xl p-4 border border-amber-100 shadow-xs hover:shadow-md hover:border-amber-200 transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <div className="w-8 h-8 rounded-xl bg-white text-amber-600 flex items-center justify-center shadow-2xs">
              <Activity className="w-4 h-4" />
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={(e) => { e.stopPropagation(); onAdjustBreaks(-1); }}
                className="w-5 h-5 rounded-md bg-white border border-amber-200 text-amber-800 text-xs font-bold flex items-center justify-center active:scale-90 shadow-2xs hover:bg-amber-100 cursor-pointer transition-colors"
                title="Decrease"
              >
                -
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); onAdjustBreaks(1); }}
                className="w-5 h-5 rounded-md bg-amber-500 text-white text-xs font-bold flex items-center justify-center active:scale-90 shadow-2xs hover:bg-amber-600 cursor-pointer transition-colors"
                title="Add Break"
              >
                +
              </button>
            </div>
          </div>
          <div>
            <div className="text-[10px] font-bold text-amber-900 uppercase tracking-wider">Breaks Taken</div>
            <div className="text-xl font-black text-amber-700 mt-0.5">
              {breaksCompleted} <span className="text-[11px] font-normal text-amber-800">/ {breakTarget}</span>
            </div>
            <div className="text-[10px] text-amber-700">
              {stretchesCompleted} stretch routines
            </div>
          </div>
          <div className="w-full bg-amber-200/60 h-1.5 rounded-full mt-2.5 overflow-hidden">
            <div
              className="bg-amber-500 h-full rounded-full"
              style={{ width: `${Math.min(100, Math.round((breaksCompleted / breakTarget) * 100))}%` }}
            />
          </div>
        </div>
      </div>

      {/* 3. Bento Tile: Daily Health Checklist (Exact Bento Styling from Spec) */}
      <div className="bg-slate-50 rounded-3xl p-5 border border-slate-100 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-slate-900 text-xs font-bold uppercase tracking-wider">Daily Checklist</h2>
          <div className="flex items-center gap-2">
            <span className="text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded-full font-bold">
              {completedHabitsCount} of {habits.length}
            </span>
            <button
              onClick={() => setIsAdding(!isAdding)}
              className="text-[11px] font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 px-2 py-0.5 rounded-lg flex items-center gap-1 transition-all active:scale-95 border border-blue-200/70"
            >
              <Plus className="w-3 h-3" />
              <span>Add</span>
            </button>
          </div>
        </div>

        {/* Custom Habit Input Field */}
        {isAdding && (
          <form onSubmit={handleAddSubmit} className="mb-3 flex items-center gap-2">
            <input
              type="text"
              value={newHabitText}
              onChange={(e) => setNewHabitText(e.target.value)}
              placeholder="e.g. 10 deep belly breaths..."
              className="flex-1 text-xs px-3 py-2 bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
            <button
              type="submit"
              className="text-xs bg-blue-600 text-white font-bold px-3 py-2 rounded-xl hover:bg-blue-700 transition-all shadow-xs"
            >
              Save
            </button>
          </form>
        )}

        {/* Habits List in Bento White Cards */}
        <div className="space-y-2">
          {habits.map((habit) => {
            return (
              <div
                key={habit.id}
                onClick={() => handleToggle(habit.id)}
                className="flex items-center justify-between gap-3 bg-white p-2.5 rounded-2xl border border-slate-100 shadow-2xs cursor-pointer select-none active:scale-98 transition-all"
              >
                <div className="flex items-center gap-2.5 flex-1 min-w-0">
                  {/* Bento Square Box */}
                  <div
                    className={`w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 transition-colors ${
                      habit.completed
                        ? 'bg-emerald-500 text-white shadow-2xs'
                        : 'border-2 border-slate-200 bg-white'
                    }`}
                  >
                    {habit.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                  <span
                    className={`text-xs font-medium leading-tight ${
                      habit.completed ? 'line-through text-slate-400' : 'text-slate-700'
                    }`}
                  >
                    {habit.label}
                  </span>
                </div>

                {/* Auto link tag or delete */}
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  {habit.isAutoLinked && (
                    <span className="text-[9px] bg-slate-100 text-slate-500 border border-slate-200 px-1.5 py-0.5 rounded-md font-semibold uppercase tracking-wider">
                      Auto
                    </span>
                  )}
                  {!habit.isAutoLinked && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteHabit(habit.id);
                      }}
                      className="p-1 text-slate-400 hover:text-rose-500 transition-colors"
                      title="Delete habit"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Ergonomic Consistency Tip */}
      <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-xs flex items-center gap-3">
        <div className="w-9 h-9 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0 border border-amber-100 shadow-2xs">
          <Award className="w-4 h-4" />
        </div>
        <div className="text-xs">
          <div className="font-bold text-slate-900">Consistency is Key</div>
          <div className="text-slate-500 text-[11px] mt-0.5">
            Taking regular movement breaks decreases musculoskeletal fatigue by up to 60%.
          </div>
        </div>
      </div>
    </div>
  );
};

