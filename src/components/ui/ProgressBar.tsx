interface ProgressBarProps {
  progress: number; // 0..1+
  color: string;
  height?: number;
}

export function ProgressBar({ progress, color, height = 8 }: ProgressBarProps) {
  const clamped = Math.min(Math.max(progress, 0), 1);
  return (
    <div
      style={{
        width: '100%',
        height,
        background: 'var(--color-bg-elevated)',
        borderRadius: height,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: `${clamped * 100}%`,
          height: '100%',
          background: progress > 1 ? 'var(--color-success)' : color,
          borderRadius: height,
          transition: 'width 0.5s ease, background 0.3s ease',
        }}
      />
    </div>
  );
}
