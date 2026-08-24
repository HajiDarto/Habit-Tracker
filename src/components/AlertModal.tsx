import React from 'react';
import { Activity, Bell, Coffee, Sparkles } from 'lucide-react';

interface AlertModalProps {
  isOpen: boolean;
  onStartStretch: () => void;
  onSnooze: (minutes: number) => void;
  onDismiss: () => void;
}

export const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  onStartStretch,
  onSnooze,
  onDismiss
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-slate-100 text-center animate-in fade-in zoom-in-95 duration-200">
        {/* Animated Bell Icon */}
        <div className="w-16 h-16 rounded-3xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto mb-4 animate-bounce">
          <Bell className="w-8 h-8 fill-amber-500 text-amber-600" />
        </div>

        <div className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Interval Complete</span>
        </div>

        <h3 className="text-xl font-extrabold text-slate-900">
          Time to Move & Stretch!
        </h3>
        <p className="text-xs text-slate-600 mt-2 leading-relaxed">
          You have been sitting for a full focus block. Decompress your spine and boost oxygen flow with a quick 30-second guided stretch.
        </p>

        {/* Action Buttons */}
        <div className="mt-5 space-y-2">
          <button
            onClick={onStartStretch}
            className="w-full min-h-[50px] bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-2xl flex items-center justify-center gap-2 shadow-md shadow-emerald-600/25 active:scale-95 transition-all"
          >
            <Activity className="w-4 h-4" />
            <span>Launch Guided Stretch (30s)</span>
          </button>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onSnooze(5)}
              className="py-3 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 active:scale-95 transition-all"
            >
              <Coffee className="w-3.5 h-3.5" />
              <span>Snooze (5 min)</span>
            </button>

            <button
              onClick={onDismiss}
              className="py-3 px-3 bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold text-xs rounded-xl active:scale-95 transition-all"
            >
              Dismiss
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
