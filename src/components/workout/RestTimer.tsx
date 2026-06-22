import { useEffect } from 'react';
import { useRestTimer } from '@/hooks/useRestTimer';
import { Button } from '@/components/ui/Button';

interface RestTimerProps {
  seconds: number;
  onClose: () => void;
}

export function RestTimer({ seconds, onClose }: RestTimerProps) {
  const { secondsLeft, isRunning, start } = useRestTimer(seconds);

  useEffect(() => {
    start(seconds);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seconds]);

  const progress = 1 - secondsLeft / seconds;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1200,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(10, 8, 6, 0.92)',
        backdropFilter: 'blur(6px)',
      }}
    >
      <div style={{ fontSize: 14, color: 'var(--color-text-secondary)', marginBottom: 16, textTransform: 'uppercase', letterSpacing: 1 }}>
        Отдых между подходами
      </div>
      <div style={{ position: 'relative', width: 220, height: 220 }}>
        <svg width="220" height="220" viewBox="0 0 220 220" style={{ transform: 'rotate(-90deg)' }}>
          <circle cx="110" cy="110" r="98" fill="none" stroke="var(--color-bg-elevated)" strokeWidth="12" />
          <circle
            cx="110"
            cy="110"
            r="98"
            fill="none"
            stroke="var(--color-ember)"
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={2 * Math.PI * 98}
            strokeDashoffset={2 * Math.PI * 98 * (1 - progress)}
            style={{ transition: 'stroke-dashoffset 1s linear' }}
          />
        </svg>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'var(--font-display)',
            fontSize: 56,
          }}
        >
          {secondsLeft}
        </div>
      </div>

      <div style={{ display: 'flex', gap: 10, marginTop: 32, width: '80%' }}>
        <Button variant="secondary" fullWidth onClick={() => start(seconds + 15)}>
          +15 сек
        </Button>
        <Button fullWidth onClick={onClose}>
          {isRunning && secondsLeft > 0 ? 'Пропустить' : 'Продолжить'}
        </Button>
      </div>
    </div>
  );
}
