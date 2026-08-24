export interface StretchExercise {
  id: string;
  name: string;
  category: 'Neck & Shoulders' | 'Back & Spine' | 'Wrists & Hands' | 'Legs & Hips';
  targetMuscle: string;
  durationSeconds: number;
  instructions: string[];
  tips: string;
  svgType: 'neck' | 'shoulder' | 'wrist' | 'spine' | 'chest' | 'quad';
}

export interface HabitItem {
  id: string;
  label: string;
  category: 'movement' | 'hydration' | 'ergonomics' | 'wellness';
  completed: boolean;
  isAutoLinked?: 'hydration' | 'break' | 'stretch';
}

export interface AppDailyData {
  date: string; // YYYY-MM-DD
  waterIntakeMl: number;
  waterGoalGlasses: number; // 1 glass = 250ml
  breaksCompleted: number;
  breakTarget: number;
  stretchesCompleted: number;
  habits: HabitItem[];
  timerIntervalMinutes: number;
  soundEnabled: boolean;
  currentStreak: number;
  lastActiveDate: string;
}

export type ActiveTab = 'timer' | 'stretches' | 'hydration' | 'dashboard' | 'all';
