import { cloudStorage } from '@/utils/telegram';

/**
 * Схема ключей CloudStorage.
 *
 * Дневник питания и тренировок бьём на чанки по месяцам (YYYY-MM),
 * чтобы не упереться в лимит 4096 байт на ключ — каждый месяц активного
 * использования это конечный, предсказуемый объём данных.
 */
export const STORAGE_KEYS = {
  profile: 'massup_profile',
  achievements: 'massup_achievements',
  customFoods: 'massup_custom_foods',
  activeProgramId: 'massup_active_program',
  /** Полный объект кастомной программы, собранной в конструкторе (готовые программы хранятся только по id, т.к. они статичны) */
  customProgram: 'massup_custom_program',
  /** Чанк дневника питания за месяц, напр. "massup_nutrition_2026-06" */
  nutritionMonth: (yyyyMm: string) => `massup_nutrition_${yyyyMm}`,
  /** Чанк лога тренировок за месяц */
  workoutMonth: (yyyyMm: string) => `massup_workouts_${yyyyMm}`,
  /** Чанк записей веса/замеров за месяц */
  weightMonth: (yyyyMm: string) => `massup_weight_${yyyyMm}`,
} as const;

export function monthKeyFromDate(dateKey: string): string {
  return dateKey.slice(0, 7); // "2026-06-21" -> "2026-06"
}

export async function readJson<T>(key: string, fallback: T): Promise<T> {
  const raw = await cloudStorage.getItem(key);
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export async function writeJson(key: string, value: unknown): Promise<void> {
  await cloudStorage.setItem(key, JSON.stringify(value));
}
