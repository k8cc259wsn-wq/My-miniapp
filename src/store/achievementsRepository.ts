import type { Achievement } from '@/types';
import { readJson, writeJson, STORAGE_KEYS } from './storageKeys';

export const ACHIEVEMENT_DEFINITIONS: Omit<Achievement, 'unlockedAt'>[] = [
  { id: 'first-log', title: 'Первый шаг', description: 'Добавили первую запись в дневник питания', icon: '🍽️' },
  { id: 'first-workout', title: 'Первая тренировка', description: 'Завершили первую тренировку', icon: '💪' },
  { id: 'streak-3', title: 'Разгон', description: '3 дня подряд с записями в дневнике', icon: '🔥' },
  { id: 'streak-7', title: 'Неделя дисциплины', description: '7 дней подряд с записями в дневнике', icon: '🏅' },
  { id: 'streak-30', title: 'Железная привычка', description: '30 дней подряд с записями в дневнике', icon: '🏆' },
  { id: 'weight-plus-1', title: 'Первый кг', description: 'Набрали первый килограмм веса с начала пути', icon: '📈' },
  { id: 'workouts-10', title: 'Десятка', description: 'Провели 10 тренировок', icon: '🎯' },
  { id: 'workouts-50', title: 'Завсегдатай зала', description: 'Провели 50 тренировок', icon: '🦾' },
];

export async function loadAchievements(): Promise<Achievement[]> {
  const stored = await readJson<Record<string, string | null>>(STORAGE_KEYS.achievements, {});
  return ACHIEVEMENT_DEFINITIONS.map((def) => ({
    ...def,
    unlockedAt: stored[def.id] ?? null,
  }));
}

export async function unlockAchievement(id: string): Promise<boolean> {
  const stored = await readJson<Record<string, string | null>>(STORAGE_KEYS.achievements, {});
  if (stored[id]) return false; // уже разблокировано
  stored[id] = new Date().toISOString();
  await writeJson(STORAGE_KEYS.achievements, stored);
  return true; // только что разблокировано — можно показать уведомление
}
