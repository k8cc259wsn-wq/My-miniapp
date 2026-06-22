import type { ActivityLevel, DailyTargets, Gender } from '@/types';

/** Множители активности для формулы Миффлина-Сан Жеора */
const ACTIVITY_MULTIPLIERS: Record<ActivityLevel, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  high: 1.725,
  athlete: 1.9,
};

export const ACTIVITY_LABELS: Record<ActivityLevel, string> = {
  sedentary: 'Минимальная активность',
  light: 'Лёгкие тренировки 1-3 раза в неделю',
  moderate: 'Тренировки 3-5 раз в неделю',
  high: 'Интенсивные тренировки 6-7 раз в неделю',
  athlete: 'Физический труд + тренировки 2 раза в день',
};

/**
 * Базовый метаболизм (BMR) по формуле Миффлина-Сан Жеора.
 * Считается одной из самых точных общедоступных формул.
 */
export function calculateBMR(gender: Gender, age: number, heightCm: number, weightKg: number): number {
  const base = 10 * weightKg + 6.25 * heightCm - 5 * age;
  return gender === 'male' ? base + 5 : base - 161;
}

/** Суточный расход энергии (TDEE) = BMR × коэффициент активности */
export function calculateTDEE(
  gender: Gender,
  age: number,
  heightCm: number,
  weightKg: number,
  activity: ActivityLevel
): number {
  return calculateBMR(gender, age, heightCm, weightKg) * ACTIVITY_MULTIPLIERS[activity];
}

/**
 * Целевые суточные нормы калорий и БЖУ для набора массы.
 * Добавляем профицит +350-500 ккал к TDEE и распределяем БЖУ:
 * белок 1.8г/кг (рост мышц), жиры 25% от калорий, остальное — углеводы (энергия для тренировок).
 */
export function calculateBulkTargets(
  gender: Gender,
  age: number,
  heightCm: number,
  weightKg: number,
  activity: ActivityLevel
): DailyTargets {
  const tdee = calculateTDEE(gender, age, heightCm, weightKg, activity);
  const calories = Math.round(tdee + 400); // умеренный профицит для чистого набора

  const proteinG = Math.round(weightKg * 1.8);
  const fatG = Math.round((calories * 0.25) / 9);
  const proteinKcal = proteinG * 4;
  const fatKcal = fatG * 9;
  const carbsG = Math.round((calories - proteinKcal - fatKcal) / 4);

  return { calories, proteinG, fatG, carbsG };
}
