import React, { useState } from 'react';
import { X, Sliders, Volume2, VolumeX, Save, RotateCcw } from 'lucide-react';

interface TimerSettingsModalProps {
  isOpen: boolean;
  intervalMinutes: number;
  waterGoalGlasses: number;
  breakTarget: number;
  soundEnabled: boolean;
  onSave: (intervalMins: number, waterGoal: number, breakTarget: number, sound: boolean) => void;
  onResetAllData: () => void;
  onClose: () => void;
}

export const TimerSettingsModal: React.FC<TimerSettingsModalProps> = ({
  isOpen,
  intervalMinutes,
  waterGoalGlasses,
  breakTarget,
  soundEnabled,
  onSave,
  onResetAllData,
  onClose
}) => {
  const [mins, setMins] = useState(intervalMinutes);
  const [water, setWater] = useState(waterGoalGlasses);
  const [breaks, setBreaks] = useState(breakTarget);
  const [sound, setSound] = useState(soundEnabled);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(mins, water, breaks, sound);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <Sliders className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-slate-900">App Preferences</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Sitting Interval Duration */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Sitting Timer Duration (Minutes)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min="10"
                max="90"
                step="5"
                value={mins}
                onChange={(e) => setMins(Number(e.target.value))}
                className="flex-1 accent-emerald-600"
              />
              <span className="w-14 text-center font-mono font-bold text-xs bg-slate-100 px-2 py-1.5 rounded-lg text-slate-800">
                {mins} min
              </span>
            </div>
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>10m (Quick)</span>
              <span>45m (Ergo)</span>
              <span>90m (Max)</span>
            </div>
          </div>

          {/* Daily Water Target */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Daily Water Goal (Glasses / 250ml)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min="4"
                max="16"
                step="1"
                value={water}
                onChange={(e) => setWater(Number(e.target.value))}
                className="flex-1 accent-sky-500"
              />
              <span className="w-14 text-center font-mono font-bold text-xs bg-slate-100 px-2 py-1.5 rounded-lg text-slate-800">
                {water} gl ({water * 250}ml)
              </span>
            </div>
          </div>

          {/* Daily Break Target */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Daily Movement Breaks Target
            </label>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min="2"
                max="10"
                step="1"
                value={breaks}
                onChange={(e) => setBreaks(Number(e.target.value))}
                className="flex-1 accent-emerald-600"
              />
              <span className="w-14 text-center font-mono font-bold text-xs bg-slate-100 px-2 py-1.5 rounded-lg text-slate-800">
                {breaks} breaks
              </span>
            </div>
          </div>

          {/* Sound Synthesizer Switch */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            <div className="flex items-center gap-2">
              {sound ? <Volume2 className="w-4 h-4 text-emerald-600" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
              <span className="text-xs font-bold text-slate-700">Audio Chimes & Ticks</span>
            </div>
            <button
              type="button"
              onClick={() => setSound(!sound)}
              className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                sound ? 'bg-emerald-600' : 'bg-slate-300'
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  sound ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Buttons */}
          <div className="pt-3 border-t border-slate-100 space-y-2">
            <button
              type="submit"
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-sm active:scale-95 transition-all"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Changes</span>
            </button>

            <button
              type="button"
              onClick={() => {
                if (window.confirm('Reset all of today\'s counters and habits to zero?')) {
                  onResetAllData();
                  onClose();
                }
              }}
              className="w-full py-2.5 bg-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-500 font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Today\'s Progress</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
