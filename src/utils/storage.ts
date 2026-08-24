import { AppDailyData, HabitItem } from '../types';

const STORAGE_KEY = 'movement_break_tracker_data_v1';

export function getTodayDateString(): string {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getDefaultHabits(): HabitItem[] {
  return [
    {
      id: 'h1',
      label: 'Morning ergonomic posture check',
      category: 'ergonomics',
      completed: false
    },
    {
      id: 'h2',
      label: 'Complete at least 3 movement breaks',
      category: 'movement',
      completed: false,
      isAutoLinked: 'break'
    },
    {
      id: 'h3',
      label: 'Complete full 3-min stretch routine',
      category: 'movement',
      completed: false,
      isAutoLinked: 'stretch'
    },
    {
      id: 'h4',
      label: 'Reach daily hydration goal (8 glasses)',
      category: 'hydration',
      completed: false,
      isAutoLinked: 'hydration'
    },
    {
      id: 'h5',
      label: '20-20-20 eye rest rule practiced',
      category: 'wellness',
      completed: false
    },
    {
      id: 'h6',
      label: '5-minute brisk walk away from screen',
      category: 'movement',
      completed: false
    }
  ];
}

export function getDefaultDailyData(): AppDailyData {
  const today = getTodayDateString();
  return {
    date: today,
    waterIntakeMl: 0,
    waterGoalGlasses: 8, // 2000 ml
    breaksCompleted: 0,
    breakTarget: 4,
    stretchesCompleted: 0,
    habits: getDefaultHabits(),
    timerIntervalMinutes: 45,
    soundEnabled: true,
    currentStreak: 1,
    lastActiveDate: today
  };
}

export function loadDailyData(): AppDailyData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const today = getTodayDateString();
    if (!raw) {
      const initial = getDefaultDailyData();
      saveDailyData(initial);
      return initial;
    }

    const data: AppDailyData = JSON.parse(raw);

    // Handle day rollover
    if (data.date !== today) {
      // Calculate streak
      const lastDate = new Date(data.date);
      const currentDate = new Date(today);
      const diffTime = Math.abs(currentDate.getTime() - lastDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      let newStreak = data.currentStreak || 1;
      if (diffDays === 1) {
        // Logged in the very next day
        newStreak += 1;
      } else if (diffDays > 1) {
        // Streak reset after missed days
        newStreak = 1;
      }

      const rolledOverData: AppDailyData = {
        ...data,
        date: today,
        waterIntakeMl: 0,
        breaksCompleted: 0,
        stretchesCompleted: 0,
        habits: getDefaultHabits().map(h => ({
          ...h,
          completed: false
        })),
        currentStreak: newStreak,
        lastActiveDate: today
      };

      saveDailyData(rolledOverData);
      return rolledOverData;
    }

    // Return current day data, ensuring default fields exist
    return {
      ...getDefaultDailyData(),
      ...data,
      habits: data.habits && data.habits.length > 0 ? data.habits : getDefaultHabits()
    };
  } catch (err) {
    console.error('Failed to load local storage data:', err);
    return getDefaultDailyData();
  }
}

export function saveDailyData(data: AppDailyData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.error('Failed to save to local storage:', err);
  }
}
