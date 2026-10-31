import React from 'react';

/**
 * Modern Abstract Fintech Logo Component
 * Represents capital liquidity, growth, security, and digital banking innovation.
 * Pure geometric design without explicit text/monograms.
 * 
 * @param {Object} props
 * @param {string} [props.className] - CSS classes for width, height, transitions, etc.
 * @param {number|string} [props.size] - Explicit dimension in px (default 40)
 * @param {boolean} [props.showSquircle] - Whether to render with the deep rounded gradient frame
 */
const FintechLogo = ({
  className = 'w-10 h-10',
  size = 40,
  showSquircle = true,
  ...props
}) => {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width={size}
      height={size}
      aria-label="Fintech Banking Logo"
      {...props}
    >
      <defs>
        {/* Background Gradient: Deep Midnight Slate to Indigo */}
        <linearGradient id="fintech-logo-bg" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1e1b4b" />
          <stop offset="50%" stopColor="#111827" />
          <stop offset="100%" stopColor="#090d16" />
        </linearGradient>

        {/* Primary Ascending Ribbon: Electric Cyan into Vivid Indigo */}
        <linearGradient id="fintech-logo-cyan-indigo" x1="10" y1="14" x2="54" y2="50" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="45%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#4338ca" />
        </linearGradient>

        {/* Foundation Interlocking Ribbon: Electric Violet into Radiant Teal */}
        <linearGradient id="fintech-logo-violet-teal" x1="54" y1="14" x2="10" y2="50" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#c084fc" />
          <stop offset="50%" stopColor="#818cf8" />
          <stop offset="100%" stopColor="#2dd4bf" />
        </linearGradient>

        {/* Core Radiant Nexus Highlight */}
        <linearGradient id="fintech-logo-core-grad" x1="28" y1="28" x2="36" y2="36" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#a5b4fc" />
        </linearGradient>

        {/* Soft Drop Shadow Filter for Mark Depth */}
        <filter id="fintech-logo-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2.5" stdDeviation="3" floodColor="#4f46e5" floodOpacity="0.45" />
        </filter>
      </defs>

      {/* Optional Squircle Frame with Subtle Luminous Border */}
      {showSquircle && (
        <>
          <rect width="64" height="64" rx="16" fill="url(#fintech-logo-bg)" />
          <rect
            x="0.75"
            y="0.75"
            width="62.5"
            height="62.5"
            rx="15.25"
            stroke="#6366f1"
            strokeOpacity="0.35"
            strokeWidth="1.5"
          />
          {/* Ambient Core Light Glow */}
          <circle cx="32" cy="32" r="16" fill="#6366f1" fillOpacity="0.25" filter="blur(8px)" />
        </>
      )}

      {/* Interlocking Fintech Nexus Symbol */}
      <g filter="url(#fintech-logo-shadow)">
        {/* Ascending Primary Wing (Growth / Capital Liquidity) */}
        <path
          d="M18 43L32 17L46 43"
          stroke="url(#fintech-logo-cyan-indigo)"
          strokeWidth="5.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Foundation Interlocking Wing (Security & Capital Preservation) */}
        <path
          d="M21 31L32 47L43 31"
          stroke="url(#fintech-logo-violet-teal)"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Central Precision Nexus Diamond */}
        <path
          d="M32 26.5L36 32L32 37.5L28 32Z"
          fill="url(#fintech-logo-core-grad)"
        />
      </g>
    </svg>
  );
};

export default FintechLogo;
