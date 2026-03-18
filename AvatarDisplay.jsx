import React from 'react';

const skinColors = {
  light: '#FFDAB9',
  tan: '#DEB887',
  brown: '#8B4513',
  dark: '#5C4033',
  blue: '#87CEEB',
  green: '#90EE90',
};

const faceStyles = {
  happy: '😊',
  cool: '😎',
  silly: '🤪',
  determined: '😤',
  sleepy: '😴',
};

const hairStyles = {
  short: (color) => (
    <>
      <ellipse cx="40" cy="20" rx="32" ry="18" fill={color} />
      <path d="M10 22 Q10 15, 15 12 L20 20" fill={color} />
      <path d="M70 22 Q70 15, 65 12 L60 20" fill={color} />
    </>
  ),
  long: (color) => (
    <>
      <ellipse cx="40" cy="20" rx="32" ry="18" fill={color} />
      <path d="M8 25 L8 55 Q8 60, 13 60 L18 60 L18 25" fill={color} />
      <path d="M72 25 L72 55 Q72 60, 67 60 L62 60 L62 25" fill={color} />
      <rect x="15" y="18" width="50" height="8" fill={color} rx="4" />
    </>
  ),
  curly: (color) => (
    <>
      <circle cx="15" cy="18" r="10" fill={color} />
      <circle cx="28" cy="12" r="10" fill={color} />
      <circle cx="40" cy="10" r="11" fill={color} />
      <circle cx="52" cy="12" r="10" fill={color} />
      <circle cx="65" cy="18" r="10" fill={color} />
    </>
  ),
  spiky: (color) => (
    <>
      <path d="M12 20 L15 5 L18 20" fill={color} />
      <path d="M22 20 L25 3 L28 20" fill={color} />
      <path d="M32 20 L35 2 L38 20" fill={color} />
      <path d="M42 20 L45 2 L48 20" fill={color} />
      <path d="M52 20 L55 3 L58 20" fill={color} />
      <path d="M62 20 L65 5 L68 20" fill={color} />
      <ellipse cx="40" cy="22" rx="28" ry="8" fill={color} />
    </>
  ),
  bald: () => null,
};

const eyeStyles = {
  normal: (x) => <circle cx={x} cy="35" r="3" fill="#000" />,
  round: (x) => <circle cx={x} cy="35" r="5" fill="#000" />,
  squint: (x) => <line x1={x - 4} y1="35" x2={x + 4} y2="35" stroke="#000" strokeWidth="2" />,
  wink: (x) => (x === 25 ? <line x1={x - 4} y1="35" x2={x + 4} y2="35" stroke="#000" strokeWidth="2" /> : <circle cx={x} cy="35" r="3" fill="#000" />),
  star: (x) => <text x={x - 5} y="40" fontSize="10">⭐</text>,
};

export default function AvatarDisplay({ avatar = {}, size = 'medium' }) {
  const dimensions = {
    small: 40,
    medium: 60,
    large: 80,
  };

  const dim = dimensions[size] || dimensions.medium;
  const skinColor = skinColors[avatar.skin] || skinColors.light;
  const hairColor = '#4A2C2A';

  return (
    <svg width={dim} height={dim} viewBox="0 0 80 80" className="rounded-full bg-gradient-to-br from-slate-100 to-slate-50">
      {/* Background circle */}
      <circle cx="40" cy="40" r="40" fill="url(#gradient)" />
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#f8fafc', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#e2e8f0', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      
      {/* Neck */}
      <rect x="32" y="65" width="16" height="10" fill={skinColor} opacity="0.8" />
      
      {/* Head */}
      <ellipse cx="40" cy="42" rx="28" ry="32" fill={skinColor} />
      
      {/* Ears */}
      <ellipse cx="12" cy="40" rx="5" ry="8" fill={skinColor} />
      <ellipse cx="68" cy="40" rx="5" ry="8" fill={skinColor} />
      
      {/* Hair */}
      <g>
        {hairStyles[avatar.hair] ? hairStyles[avatar.hair](hairColor) : null}
      </g>
      
      {/* Eyebrows */}
      <path d="M 20 30 Q 25 28, 30 30" stroke="#4A2C2A" fill="none" strokeWidth="2" strokeLinecap="round" />
      <path d="M 50 30 Q 55 28, 60 30" stroke="#4A2C2A" fill="none" strokeWidth="2" strokeLinecap="round" />
      
      {/* Eyes */}
      <g>
        {eyeStyles[avatar.eyes] ? eyeStyles[avatar.eyes](25) : eyeStyles.normal(25)}
        {eyeStyles[avatar.eyes] && avatar.eyes !== 'wink' ? eyeStyles[avatar.eyes](55) : eyeStyles.normal(55)}
      </g>
      
      {/* Nose */}
      <ellipse cx="40" cy="45" rx="3" ry="5" fill="#00000020" />
      
      {/* Mouth based on face */}
      <g>
        {avatar.face === 'happy' && <path d="M 28 52 Q 40 58, 52 52" stroke="#4A2C2A" fill="none" strokeWidth="2.5" strokeLinecap="round" />}
        {avatar.face === 'cool' && <line x1="28" y1="52" x2="52" y2="52" stroke="#4A2C2A" strokeWidth="2.5" strokeLinecap="round" />}
        {avatar.face === 'silly' && (
          <>
            <path d="M 28 52 Q 34 48, 40 52 Q 46 56, 52 52" stroke="#4A2C2A" fill="none" strokeWidth="2.5" strokeLinecap="round" />
            <ellipse cx="40" cy="54" rx="3" ry="4" fill="#FF69B4" />
          </>
        )}
        {avatar.face === 'determined' && <line x1="28" y1="54" x2="52" y2="50" stroke="#4A2C2A" strokeWidth="2.5" strokeLinecap="round" />}
        {avatar.face === 'sleepy' && <path d="M 28 54 Q 40 52, 52 54" stroke="#4A2C2A" fill="none" strokeWidth="2" strokeLinecap="round" />}
      </g>
      
      {/* Blush for happy/silly */}
      {(avatar.face === 'happy' || avatar.face === 'silly') && (
        <>
          <ellipse cx="20" cy="48" rx="5" ry="3" fill="#FF69B4" opacity="0.3" />
          <ellipse cx="60" cy="48" rx="5" ry="3" fill="#FF69B4" opacity="0.3" />
        </>
      )}
    </svg>
  );
}
