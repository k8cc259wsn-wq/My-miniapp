interface ProgressRingProps {
  /** Значение от 0 до 1 (может быть больше 1, тогда отображаем переполнение другим цветом) */
  progress: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  trackColor?: string;
}

export function ProgressRing({
  progress,
  size = 120,
  strokeWidth = 10,
  color = 'var(--color-ember)',
  trackColor = 'var(--color-bg-elevated)',
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.min(progress, 1);
  const offset = circumference * (1 - clamped);
  const isOverflow = progress > 1;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: 'rotate(-90deg)' }}>
      <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={trackColor} strokeWidth={strokeWidth} />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={isOverflow ? 'var(--color-success)' : color}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: 'stroke-dashoffset 0.6s ease, stroke 0.3s ease' }}
      />
    </svg>
  );
}
