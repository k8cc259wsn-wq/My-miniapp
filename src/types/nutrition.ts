/** Приём пищи в течение дня */
export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';

/** Продукт из базы данных (на 100 г) */
export interface FoodItem {
  id: string;
  name: string;
  /** ккал на 100 г */
  kcal: number;
  proteinG: number;
  fatG: number;
  carbsG: number;
  /** Категория для группировки в поиске */
  category: string;
}

/** Запись о приёме пищи в дневнике конкретного дня */
export interface FoodLogEntry {
  id: string;
  foodId: string;
  foodName: string;
  meal: MealType;
  /** Сколько грамм съедено */
  grams: number;
  /** Посчитанные нутриенты для этого количества грамм */
  kcal: number;
  proteinG: number;
  fatG: number;
  carbsG: number;
  /** ISO-дата (без времени), к которому относится запись, напр. "2026-06-21" */
  date: string;
  createdAt: string;
}

/** Агрегированные итоги за день */
export interface DayNutritionSummary {
  date: string;
  kcal: number;
  proteinG: number;
  fatG: number;
  carbsG: number;
}
