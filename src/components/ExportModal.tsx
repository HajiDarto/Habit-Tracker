import React, { useState } from 'react';
import { X, Copy, Check, Download, FileCode, Sparkles } from 'lucide-react';
import { generateStandaloneHTML } from '../utils/standaloneExport';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const standaloneCode = generateStandaloneHTML();

  if (!isOpen) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(standaloneCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback
    }
  };

  const handleDownload = () => {
    const blob = new Blob([standaloneCode], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'index.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full max-h-[88vh] flex flex-col shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <FileCode className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 leading-tight">
                Standalone Vanilla HTML Export
              </h3>
              <p className="text-xs text-slate-500">
                Single-file HTML with embedded CSS & Vanilla JS (No frameworks)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-700"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content & Description */}
        <div className="p-5 overflow-y-auto space-y-3 flex-1 text-xs text-slate-600">
          <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-3.5 flex items-start gap-2.5 text-emerald-950">
            <Sparkles className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-emerald-900">100% Standalone for GitHub Pages</div>
              <p className="text-[11px] text-emerald-800 mt-0.5 leading-relaxed">
                Save this as <code className="bg-white px-1 py-0.5 rounded font-mono font-bold text-emerald-900">index.html</code>. It runs immediately in any browser with zero dependencies, handles localStorage data persistence, and features all 4 mobile-first modules.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 mb-1">
              <span>Source Preview (index.html):</span>
              <span>{Math.round(standaloneCode.length / 1024)} KB</span>
            </div>
            <pre className="p-3 bg-slate-900 text-emerald-400 font-mono text-[11px] rounded-2xl overflow-x-auto max-h-56 select-all border border-slate-800 leading-tight">
              {standaloneCode.slice(0, 1500)}...
              {"\n"}/* (and full responsive CSS + Vanilla JS logic) */
            </pre>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50 rounded-b-3xl flex items-center justify-end gap-2">
          <button
            onClick={handleCopy}
            className="px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 font-bold text-xs flex items-center gap-1.5 active:scale-95 shadow-2xs transition-all"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied to Clipboard!' : 'Copy Entire Code'}</span>
          </button>

          <button
            onClick={handleDownload}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Download index.html</span>
          </button>
        </div>
      </div>
    </div>
  );
};
