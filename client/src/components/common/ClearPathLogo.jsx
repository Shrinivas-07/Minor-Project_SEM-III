import React from 'react';

/**
 * ClearPathIcon - Monoline geometric brand icon
 * Combining:
 * 1. Stylized letter 'C' (clarity, discovery horizon)
 * 2. Unfolding forward pathway (ascending road toward future goals)
 * 3. Directional compass arrow (North-East trajectory)
 * 4. Milestone stepping guide (structured roadmapping)
 */
export function ClearPathIcon({ className = 'w-5 h-5', strokeWidth = 2 }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* Stylized 'C' Crescent Arc */}
      <path d="M 17.5 4.8 C 14.8 3.2 11.2 2.8 8 4 C 4.5 5.5 2 9 2 13 C 2 17.5 5.2 21.2 9.5 21.8 C 13.5 22.3 17 20.5 19 17.5" />
      {/* Unfolding Forward Road / Trajectory */}
      <path d="M 6.5 17.5 C 9.5 14.5 13 10.5 19.5 4.5" />
      {/* Forward Compass Arrowhead (North-East) */}
      <path d="M 14.5 4.5 H 19.5 V 9.5" />
      {/* Milestone Perspective Road Lane */}
      <path d="M 10.5 19.5 C 13 16.5 16 12.8 19.5 9.5" strokeWidth={strokeWidth * 0.8} strokeDasharray="2 2" />
    </svg>
  );
}

/**
 * ClearPathLogo - Complete brand mark + wordmark
 */
export default function ClearPathLogo({
  size = 'md',
  showText = true,
  subtitle = null,
  variant = 'light', // 'light' (for white bg) | 'dark' (for dark bg)
  badge = true,
  className = '',
  iconClassName = '',
  textClassName = '',
}) {
  const sizeMap = {
    sm: { badge: 'w-7 h-7 rounded-md', icon: 'w-4 h-4', text: 'text-base', sub: 'text-[10px]' },
    md: { badge: 'w-9 h-9 rounded-lg', icon: 'w-5 h-5', text: 'text-lg', sub: 'text-[11px]' },
    lg: { badge: 'w-11 h-11 rounded-xl', icon: 'w-6 h-6', text: 'text-xl', sub: 'text-xs' },
    xl: { badge: 'w-14 h-14 rounded-2xl', icon: 'w-8 h-8', text: 'text-2xl', sub: 'text-sm' },
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  const badgeBg = variant === 'dark' 
    ? 'bg-white text-slate-950 group-hover:bg-brand-400 group-hover:text-slate-950' 
    : 'bg-slate-900 text-white group-hover:bg-brand-600';

  const textPrimary = variant === 'dark' ? 'text-white' : 'text-slate-900';
  const textAccent = variant === 'dark' ? 'text-brand-400' : 'text-brand-600';
  const textMuted = variant === 'dark' ? 'text-slate-400' : 'text-slate-500';

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {badge ? (
        <div className={`${currentSize.badge} ${badgeBg} flex items-center justify-center transition-colors shrink-0 shadow-xs`}>
          <ClearPathIcon className={`${currentSize.icon} ${iconClassName}`} />
        </div>
      ) : (
        <ClearPathIcon className={`${currentSize.icon} ${textAccent} ${iconClassName}`} />
      )}

      {showText && (
        <div className={`flex flex-col ${textClassName}`}>
          <span className={`font-bold ${currentSize.text} tracking-tight ${textPrimary} leading-none`}>
            Clear<span className={textAccent}>Path</span>
          </span>
          {subtitle && (
            <span className={`${currentSize.sub} font-medium ${textMuted} mt-0.5 leading-none`}>
              {subtitle}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
