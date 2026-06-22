import { useEffect, useState } from 'react';
import { getEntriesForLastDays } from '@/store/nutritionRepository';
import { addDays, todayKey } from '@/utils/date';
import { unlockAchievement } from '@/store/achievementsRepository';

/**
 * Считает streak — сколько дней подряд (включая сегодня, если уже есть запись)
 * пользователь вёл дневник питания. Разблокирует ачивки streak-3/7/30.
 */
export function useStreak() {
  const [streak, setStreak] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function compute() {
      const today = todayKey();
      // Смотрим максимум 60 дней назад — более чем достаточно для разумного streak
      const days = Array.from({ length: 60 }, (_, i) => addDays(today, -i));
      const entriesByDay = await getEntriesForLastDays(days);

      let count = 0;
      for (const day of days) {
        if (entriesByDay[day]?.length > 0) {
          count += 1;
        } else {
          break;
        }
      }

      if (cancelled) return;
      setStreak(count);
      setLoading(false);

      if (count >= 3) await unlockAchievement('streak-3');
      if (count >= 7) await unlockAchievement('streak-7');
      if (count >= 30) await unlockAchievement('streak-30');
    }

    compute();
    return () => {
      cancelled = true;
    };
  }, []);

  return { streak, loading };
}
