import { useCallback, useEffect, useRef, useState } from 'react';
import { hapticSuccess } from '@/utils/telegram';

/** Таймер отдыха между подходами: запуск, пауза, сброс, обратный отсчёт */
export function useRestTimer(defaultSeconds: number) {
  const [secondsLeft, setSecondsLeft] = useState(defaultSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<number | null>(null);

  const clear = useCallback(() => {
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => clear, [clear]);

  const start = useCallback(
    (seconds?: number) => {
      clear();
      const initial = seconds ?? defaultSeconds;
      setSecondsLeft(initial);
      setIsRunning(true);
      intervalRef.current = window.setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            clear();
            setIsRunning(false);
            hapticSuccess();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    },
    [clear, defaultSeconds]
  );

  const pause = useCallback(() => {
    clear();
    setIsRunning(false);
  }, [clear]);

  const reset = useCallback(() => {
    clear();
    setIsRunning(false);
    setSecondsLeft(defaultSeconds);
  }, [clear, defaultSeconds]);

  return { secondsLeft, isRunning, start, pause, reset };
}
