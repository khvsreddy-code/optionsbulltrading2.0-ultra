import React from 'react';

interface SparklineProps {
  isPositive?: boolean;
}

const Sparkline: React.FC<SparklineProps> = ({ isPositive = true }) => {
  const data = [5, 10, 15, 12, 18, 10, 25, 22, 30, 28];
  const width = 100;
  const height = 40;

  const yMax = Math.max(...data);
  const xStep = width / (data.length - 1);

  const path = data
    .map((d, i) => {
      const x = i * xStep;
      const y = height - (d / yMax) * height;
      return `${i === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(' ');
  
  const color = isPositive ? '#16A34A' : '#EF4444'; // green-600 or red-500

  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
        <defs>
            <linearGradient id={`gradient-${isPositive}`} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.3" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
            </linearGradient>
        </defs>
        <path d={path} fill="none" stroke={color} strokeWidth="1.5" />
        <path d={`${path} L ${width} ${height} L 0 ${height} Z`} fill={`url(#gradient-${isPositive})`} />
    </svg>
  );
};

export default Sparkline;