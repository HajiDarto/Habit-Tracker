import React from 'react';

interface StretchIllustrationProps {
  type: 'neck' | 'shoulder' | 'wrist' | 'spine' | 'chest' | 'quad';
  className?: string;
}

export const StretchIllustration: React.FC<StretchIllustrationProps> = ({ type, className = "w-32 h-32" }) => {
  switch (type) {
    case 'neck':
      return (
        <svg viewBox="0 0 160 160" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="80" cy="80" r="72" fill="#ECFDF5" />
          {/* Torso */}
          <path d="M50 135 C50 115, 60 105, 80 105 C100 105, 110 115, 110 135" fill="#059669" />
          {/* Neck */}
          <path d="M74 88 L74 106 L86 106 L86 88 Z" fill="#FCD34D" />
          {/* Tilted Head */}
          <g transform="rotate(18 80 65)">
            <ellipse cx="80" cy="62" rx="20" ry="24" fill="#FDE68A" />
            <circle cx="74" cy="60" r="2.5" fill="#1E293B" />
            <circle cx="86" cy="60" r="2.5" fill="#1E293B" />
            <path d="M76 72 Q80 76 84 72" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
            {/* Hair */}
            <path d="M60 58 C60 42, 100 42, 100 58 C96 48, 64 48, 60 58" fill="#475569" />
          </g>
          {/* Stretch Arrows */}
          <path d="M96 74 C106 72, 114 80, 112 90" stroke="#0284C7" strokeWidth="3" strokeLinecap="round" strokeDasharray="3 3" />
          <polygon points="115,92 108,87 114,83" fill="#0284C7" />
          {/* Highlight aura */}
          <path d="M66 94 Q72 102 70 110" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );

    case 'shoulder':
      return (
        <svg viewBox="0 0 160 160" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="80" cy="80" r="72" fill="#ECFDF5" />
          {/* Head */}
          <ellipse cx="80" cy="50" rx="18" ry="22" fill="#FDE68A" />
          <path d="M64 46 C64 32, 96 32, 96 46" fill="#475569" />
          {/* Raised & Rolled Shoulders */}
          <path d="M42 125 C42 88, 60 82, 80 82 C100 82, 118 88, 118 125" fill="#059669" />
          {/* Muscle tension points */}
          <circle cx="56" cy="88" r="6" fill="#10B981" />
          <circle cx="104" cy="88" r="6" fill="#10B981" />
          {/* Rotation Arrows */}
          <path d="M46 76 C40 82, 40 94, 48 98" stroke="#0284C7" strokeWidth="3" strokeLinecap="round" />
          <polygon points="46,72 40,78 48,80" fill="#0284C7" />
          <path d="M114 76 C120 82, 120 94, 112 98" stroke="#0284C7" strokeWidth="3" strokeLinecap="round" />
          <polygon points="114,72 120,78 112,80" fill="#0284C7" />
        </svg>
      );

    case 'wrist':
      return (
        <svg viewBox="0 0 160 160" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="80" cy="80" r="72" fill="#E0F2FE" />
          {/* Forearm */}
          <path d="M25 88 L75 88 C82 88, 86 82, 86 76" stroke="#FDE68A" strokeWidth="18" strokeLinecap="round" />
          {/* Bent Hand Palm Up */}
          <path d="M86 76 L86 42" stroke="#FDE68A" strokeWidth="18" strokeLinecap="round" />
          {/* Opposite Hand Pulling */}
          <path d="M115 54 L92 54" stroke="#FCD34D" strokeWidth="12" strokeLinecap="round" />
          {/* Stretch Tension Indicator */}
          <path d="M68 96 Q80 96 92 84" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" strokeDasharray="3 2" />
          {/* Arrow */}
          <path d="M118 42 L100 42" stroke="#0284C7" strokeWidth="3" strokeLinecap="round" />
          <polygon points="98,42 105,37 105,47" fill="#0284C7" />
        </svg>
      );

    case 'spine':
      return (
        <svg viewBox="0 0 160 160" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="80" cy="80" r="72" fill="#ECFDF5" />
          {/* Chair */}
          <rect x="52" y="95" width="56" height="8" rx="3" fill="#64748B" />
          <rect x="50" y="55" width="8" height="48" rx="2" fill="#64748B" />
          <line x1="60" y1="103" x2="60" y2="135" stroke="#64748B" strokeWidth="4" strokeLinecap="round" />
          <line x1="100" y1="103" x2="100" y2="135" stroke="#64748B" strokeWidth="4" strokeLinecap="round" />
          {/* Seated Person Twisting */}
          <ellipse cx="82" cy="48" rx="14" ry="16" fill="#FDE68A" />
          {/* Torso */}
          <path d="M72 64 C72 64, 94 66, 92 95 L72 95 Z" fill="#059669" />
          {/* Twisted Arm across */}
          <path d="M90 74 L60 88" stroke="#FDE68A" strokeWidth="8" strokeLinecap="round" />
          {/* Spiral Arrow */}
          <path d="M98 62 C112 68, 112 85, 96 90" stroke="#0284C7" strokeWidth="3" strokeLinecap="round" fill="none" />
          <polygon points="96,94 92,86 100,88" fill="#0284C7" />
        </svg>
      );

    case 'chest':
      return (
        <svg viewBox="0 0 160 160" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="80" cy="80" r="72" fill="#ECFDF5" />
          {/* Head looking slightly up */}
          <ellipse cx="78" cy="45" rx="15" ry="18" fill="#FDE68A" />
          {/* Open Proud Torso */}
          <path d="M58 130 C58 85, 68 70, 88 70 C102 70, 108 85, 108 130" fill="#059669" />
          {/* Clasped Arms behind */}
          <path d="M60 82 L46 105 L60 115" stroke="#FDE68A" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <path d="M102 82 L112 105 L62 115" stroke="#FDE68A" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          {/* Expansion arrows from chest */}
          <path d="M85 75 L105 75" stroke="#0284C7" strokeWidth="3" strokeLinecap="round" />
          <polygon points="108,75 101,70 101,80" fill="#0284C7" />
          <circle cx="88" cy="82" r="5" fill="#EF4444" opacity="0.8" />
        </svg>
      );

    case 'quad':
      return (
        <svg viewBox="0 0 160 160" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="80" cy="80" r="72" fill="#E0F2FE" />
          {/* Head & Torso */}
          <ellipse cx="75" cy="40" rx="14" ry="16" fill="#FDE68A" />
          <path d="M65 58 L85 58 L82 100 L68 100 Z" fill="#059669" />
          {/* Standing Left Leg */}
          <line x1="72" y1="100" x2="72" y2="140" stroke="#047857" strokeWidth="8" strokeLinecap="round" />
          {/* Bent Right Leg & Foot pulled back */}
          <path d="M80 100 L88 122 L98 102" stroke="#047857" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          {/* Arm holding foot */}
          <path d="M80 65 L98 102" stroke="#FDE68A" strokeWidth="7" strokeLinecap="round" />
          {/* Quad Stretch Highlight */}
          <path d="M82 104 L87 118" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );

    default:
      return null;
  }
};
