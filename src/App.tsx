/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
import { TimerTab } from './components/TimerTab';
import { StretchTab } from './components/StretchTab';
import { HydrationTab } from './components/HydrationTab';
import { DashboardTab } from './components/DashboardTab';
import { AlertModal } from './components/AlertModal';
import { TimerSettingsModal } from './components/TimerSettingsModal';
import { ExportModal } from './components/ExportModal';
import { ActiveTab, AppDailyData } from './types';
import { loadDailyData, saveDailyData } from './utils/storage';
import { sounds } from './utils/audio';

export default function App() {
  // Master application state loaded from localStorage
  const [data, setData] = useState<AppDailyData>(() => loadDailyData());
  const [activeTab, setActiveTab] = useState<ActiveTab>(() => {
    if (typeof window !== 'undefined' && window.innerWidth >= 1024) {
      return 'all';
    }
    return 'timer';
  });

  // Sedentary Interval Timer State
  const [totalTimerSeconds, setTotalTimerSeconds] = useState(
    () => (loadDailyData().timerIntervalMinutes || 45) * 60
  );
  const [timerRemainingSeconds, setTimerRemainingSeconds] = useState(
    () => (loadDailyData().timerIntervalMinutes || 45) * 60
  );
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Modals state
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  const timerIntervalRef = useRef<number | null>(null);

  // Save changes to localStorage whenever data updates
  useEffect(() => {
    saveDailyData(data);
  }, [data]);

  // Update timer total when interval minutes preference changes
  useEffect(() => {
    const newTotal = data.timerIntervalMinutes * 60;
    setTotalTimerSeconds(newTotal);
    if (!isTimerRunning) {
      setTimerRemainingSeconds(newTotal);
    }
  }, [data.timerIntervalMinutes, isTimerRunning]);

  // Auto-sync habits based on real-time metrics
  const checkAutoLinkedHabits = useCallback((currentData: AppDailyData): AppDailyData => {
    const waterTargetMl = currentData.waterGoalGlasses * 250;
    const isWaterGoalMet = currentData.waterIntakeMl >= waterTargetMl;
    const isBreaksGoalMet = currentData.breaksCompleted >= 3;
    const isStretchGoalMet = currentData.stretchesCompleted >= 1;

    const updatedHabits = currentData.habits.map((h) => {
      if (h.isAutoLinked === 'hydration') {
        return { ...h, completed: isWaterGoalMet };
      }
      if (h.isAutoLinked === 'break') {
        return { ...h, completed: isBreaksGoalMet };
      }
      if (h.isAutoLinked === 'stretch') {
        return { ...h, completed: isStretchGoalMet };
      }
      return h;
    });

    return {
      ...currentData,
      habits: updatedHabits
    };
  }, []);

  // Handle countdown interval
  useEffect(() => {
    if (isTimerRunning) {
      timerIntervalRef.current = window.setInterval(() => {
        setTimerRemainingSeconds((prev) => {
          if (prev <= 1) {
            // Alarm triggered!
            setIsTimerRunning(false);
            if (data.soundEnabled) sounds.playAlarmChime();

            // Increment completed breaks count
            setData((old) => {
              const updated = {
                ...old,
                breaksCompleted: old.breaksCompleted + 1
              };
              return checkAutoLinkedHabits(updated);
            });

            setShowAlertModal(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    }

    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [isTimerRunning, data.soundEnabled, checkAutoLinkedHabits]);

  // Timer Handlers
  const handleToggleTimer = () => {
    if (timerRemainingSeconds === 0) {
      setTimerRemainingSeconds(totalTimerSeconds);
    }
    setIsTimerRunning(!isTimerRunning);
    if (data.soundEnabled) sounds.playTick();
  };

  const handleResetTimer = () => {
    setIsTimerRunning(false);
    setTimerRemainingSeconds(totalTimerSeconds);
    if (data.soundEnabled) sounds.playTick();
  };

  const handleSelectPresetMinutes = (mins: number) => {
    setIsTimerRunning(false);
    setData((prev) => ({ ...prev, timerIntervalMinutes: mins }));
    const newSecs = mins * 60;
    setTotalTimerSeconds(newSecs);
    setTimerRemainingSeconds(newSecs);
    if (data.soundEnabled) sounds.playTick();
  };

  // Stretch Handlers
  const handleRecordStretchComplete = () => {
    setData((prev) => {
      const updated = {
        ...prev,
        stretchesCompleted: prev.stretchesCompleted + 1
      };
      return checkAutoLinkedHabits(updated);
    });
  };

  // Hydration Handlers
  const handleAddWater = (amountMl: number) => {
    setData((prev) => {
      const updated = {
        ...prev,
        waterIntakeMl: prev.waterIntakeMl + amountMl
      };
      return checkAutoLinkedHabits(updated);
    });
  };

  const handleUndoWater = () => {
    setData((prev) => {
      const updated = {
        ...prev,
        waterIntakeMl: Math.max(0, prev.waterIntakeMl - 250)
      };
      return checkAutoLinkedHabits(updated);
    });
  };

  const handleUpdateGoalGlasses = (glasses: number) => {
    setData((prev) => {
      const updated = {
        ...prev,
        waterGoalGlasses: glasses
      };
      return checkAutoLinkedHabits(updated);
    });
  };

  // Habits Handlers
  const handleToggleHabit = (id: string) => {
    setData((prev) => ({
      ...prev,
      habits: prev.habits.map((h) => (h.id === id ? { ...h, completed: !h.completed } : h))
    }));
  };

  const handleAddHabit = (label: string) => {
    const newId = `custom_${Date.now()}`;
    setData((prev) => ({
      ...prev,
      habits: [
        ...prev.habits,
        {
          id: newId,
          label,
          category: 'wellness',
          completed: false
        }
      ]
    }));
  };

  const handleDeleteHabit = (id: string) => {
    setData((prev) => ({
      ...prev,
      habits: prev.habits.filter((h) => h.id !== id)
    }));
  };

  const handleAdjustBreaks = (delta: number) => {
    setData((prev) => {
      const updated = {
        ...prev,
        breaksCompleted: Math.max(0, prev.breaksCompleted + delta)
      };
      return checkAutoLinkedHabits(updated);
    });
    if (data.soundEnabled) sounds.playTick();
  };

  // Settings Handlers
  const handleSaveSettings = (intervalMins: number, waterGoal: number, breakTarget: number, sound: boolean) => {
    setData((prev) => {
      const updated = {
        ...prev,
        timerIntervalMinutes: intervalMins,
        waterGoalGlasses: waterGoal,
        breakTarget,
        soundEnabled: sound
      };
      return checkAutoLinkedHabits(updated);
    });
    const newSecs = intervalMins * 60;
    setTotalTimerSeconds(newSecs);
    setTimerRemainingSeconds(newSecs);
    setIsTimerRunning(false);
  };

  const handleResetAllData = () => {
    setIsTimerRunning(false);
    const reset = {
      ...data,
      waterIntakeMl: 0,
      breaksCompleted: 0,
      stretchesCompleted: 0,
      habits: data.habits.map((h) => ({ ...h, completed: false }))
    };
    setData(reset);
    setTimerRemainingSeconds(totalTimerSeconds);
  };

  const isWaterGoalReached = data.waterIntakeMl >= data.waterGoalGlasses * 250;
  const isDesktopViewMode = activeTab === 'all';

  return (
    <div className="min-h-screen bg-slate-900/5 lg:bg-emerald-50/50 flex flex-col justify-start items-center selection:bg-emerald-500 selection:text-white font-sans antialiased text-slate-800">
      {/* Responsive Shell: Full-width on mobile with max-w-md, expanded to max-w-7xl on desktop */}
      <div className="w-full max-w-md lg:max-w-7xl min-h-screen lg:min-h-0 lg:my-6 lg:rounded-[2rem] lg:border border-slate-200/80 bg-white shadow-xl lg:shadow-2xl flex flex-col relative overflow-hidden">
        
        {/* Responsive Navbar with Desktop Tabs */}
        <Navbar
          streak={data.currentStreak}
          soundEnabled={data.soundEnabled}
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          onToggleSound={() => {
            setData((prev) => ({ ...prev, soundEnabled: !prev.soundEnabled }));
          }}
          onOpenSettings={() => setShowSettingsModal(true)}
          onOpenExport={() => setShowExportModal(true)}
        />

        {/* Tab Viewport - Responsive Dashboard Grid or Focused View */}
        <main className="flex-1 p-4 sm:p-5 lg:p-6 pb-24 lg:pb-8 overflow-y-auto">
          {/* DESKTOP 3-COLUMN BENTO GRID VIEW (Active when 'all' is selected) */}
          {activeTab === 'all' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-start animate-in fade-in duration-200">
              
              {/* Left Column (Timer & Quick Interval Controls) - 4 Cols */}
              <div className="lg:col-span-4 space-y-4">
                <div className="flex items-center justify-between px-1">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Focus & Sedentary Alarm
                  </h3>
                  <span className="text-[10px] font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                    Timer
                  </span>
                </div>
                <TimerTab
                  timeRemainingSeconds={timerRemainingSeconds}
                  totalDurationSeconds={totalTimerSeconds}
                  isRunning={isTimerRunning}
                  onToggleTimer={handleToggleTimer}
                  onResetTimer={handleResetTimer}
                  onOpenSettings={() => setShowSettingsModal(true)}
                  onSelectPresetMinutes={handleSelectPresetMinutes}
                  onSwitchTab={setActiveTab}
                  breaksCompleted={data.breaksCompleted}
                  breakTarget={data.breakTarget}
                />
              </div>

              {/* Center Column (Dashboard Scorecard, Habits & Hydration) - 4 Cols */}
              <div className="lg:col-span-4 space-y-4">
                <div className="flex items-center justify-between px-1">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Habits & Hydration
                  </h3>
                  <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                    Score & Goals
                  </span>
                </div>
                <DashboardTab
                  habits={data.habits}
                  waterIntakeMl={data.waterIntakeMl}
                  waterGoalGlasses={data.waterGoalGlasses}
                  breaksCompleted={data.breaksCompleted}
                  breakTarget={data.breakTarget}
                  stretchesCompleted={data.stretchesCompleted}
                  streak={data.currentStreak}
                  soundEnabled={data.soundEnabled}
                  onToggleHabit={handleToggleHabit}
                  onAddHabit={handleAddHabit}
                  onDeleteHabit={handleDeleteHabit}
                  onAdjustBreaks={handleAdjustBreaks}
                  onSwitchTab={setActiveTab}
                />
                <HydrationTab
                  waterIntakeMl={data.waterIntakeMl}
                  waterGoalGlasses={data.waterGoalGlasses}
                  soundEnabled={data.soundEnabled}
                  onAddWater={handleAddWater}
                  onUndoWater={handleUndoWater}
                  onUpdateGoalGlasses={handleUpdateGoalGlasses}
                />
              </div>

              {/* Right Column (Stretch Guide & Desk Routines) - 4 Cols */}
              <div className="lg:col-span-4 space-y-4">
                <div className="flex items-center justify-between px-1">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Guided Stretch Moves
                  </h3>
                  <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                    Movement Guide
                  </span>
                </div>
                <StretchTab
                  soundEnabled={data.soundEnabled}
                  onRecordStretchComplete={handleRecordStretchComplete}
                />
              </div>
            </div>
          )}

          {/* INDIVIDUAL / FOCUSED TAB VIEWS (Active on mobile or when focused on desktop) */}
          {activeTab !== 'all' && (
            <div className="max-w-md lg:max-w-xl mx-auto animate-in fade-in duration-150">
              {activeTab === 'timer' && (
                <TimerTab
                  timeRemainingSeconds={timerRemainingSeconds}
                  totalDurationSeconds={totalTimerSeconds}
                  isRunning={isTimerRunning}
                  onToggleTimer={handleToggleTimer}
                  onResetTimer={handleResetTimer}
                  onOpenSettings={() => setShowSettingsModal(true)}
                  onSelectPresetMinutes={handleSelectPresetMinutes}
                  onSwitchTab={setActiveTab}
                  breaksCompleted={data.breaksCompleted}
                  breakTarget={data.breakTarget}
                />
              )}

              {activeTab === 'stretches' && (
                <StretchTab
                  soundEnabled={data.soundEnabled}
                  onRecordStretchComplete={handleRecordStretchComplete}
                />
              )}

              {activeTab === 'hydration' && (
                <HydrationTab
                  waterIntakeMl={data.waterIntakeMl}
                  waterGoalGlasses={data.waterGoalGlasses}
                  soundEnabled={data.soundEnabled}
                  onAddWater={handleAddWater}
                  onUndoWater={handleUndoWater}
                  onUpdateGoalGlasses={handleUpdateGoalGlasses}
                />
              )}

              {activeTab === 'dashboard' && (
                <DashboardTab
                  habits={data.habits}
                  waterIntakeMl={data.waterIntakeMl}
                  waterGoalGlasses={data.waterGoalGlasses}
                  breaksCompleted={data.breaksCompleted}
                  breakTarget={data.breakTarget}
                  stretchesCompleted={data.stretchesCompleted}
                  streak={data.currentStreak}
                  soundEnabled={data.soundEnabled}
                  onToggleHabit={handleToggleHabit}
                  onAddHabit={handleAddHabit}
                  onDeleteHabit={handleDeleteHabit}
                  onAdjustBreaks={handleAdjustBreaks}
                  onSwitchTab={setActiveTab}
                />
              )}
            </div>
          )}
        </main>

        {/* Bottom Navigation Dock (Mobile-only thumb bar) */}
        <div className="lg:hidden">
          <BottomNav
            activeTab={activeTab === 'all' ? 'dashboard' : activeTab}
            onTabChange={setActiveTab}
            isTimerRunning={isTimerRunning}
            waterGoalReached={isWaterGoalReached}
          />
        </div>

        {/* Sedentary Alarm Alert Modal */}
        <AlertModal
          isOpen={showAlertModal}
          onStartStretch={() => {
            setShowAlertModal(false);
            setActiveTab('stretches');
          }}
          onSnooze={(mins) => {
            setShowAlertModal(false);
            setTimerRemainingSeconds(mins * 60);
            setIsTimerRunning(true);
          }}
          onDismiss={() => {
            setShowAlertModal(false);
            setTimerRemainingSeconds(totalTimerSeconds);
          }}
        />

        {/* Settings Modal */}
        <TimerSettingsModal
          isOpen={showSettingsModal}
          intervalMinutes={data.timerIntervalMinutes}
          waterGoalGlasses={data.waterGoalGlasses}
          breakTarget={data.breakTarget}
          soundEnabled={data.soundEnabled}
          onSave={handleSaveSettings}
          onResetAllData={handleResetAllData}
          onClose={() => setShowSettingsModal(false)}
        />

        {/* Standalone Single-File HTML Export Modal */}
        <ExportModal
          isOpen={showExportModal}
          onClose={() => setShowExportModal(false)}
        />
      </div>
    </div>
  );
}

