/** Пол пользователя — нужен для формулы расчёта базового метаболизма */
export type Gender = 'male' | 'female';

/** Уровень физической активности — множитель для расчёта суточной нормы калорий */
export type ActivityLevel =
  | 'sedentary' // минимальная активность, сидячая работа
  | 'light' // лёгкие тренировки 1-3 раза в неделю
  | 'moderate' // тренировки 3-5 раз в неделю
  | 'high' // интенсивные тренировки 6-7 раз в неделю
  | 'athlete'; // физический труд + тренировки 2 раза в день

export interface UserProfile {
  /** ID пользователя Telegram, используется как ключ хранения */
  telegramId: number;
  name: string;
  gender: Gender;
  age: number;
  /** см */
  height: number;
  /** кг, текущий вес */
  weight: number;
  /** кг, целевой вес */
  targetWeight: number;
  activityLevel: ActivityLevel;
  /** Дата создания профиля, ISO-строка */
  createdAt: string;
  /** Завершён ли онбординг */
  onboardingDone: boolean;
}

export interface DailyTargets {
  calories: number;
  proteinG: number;
  fatG: number;
  carbsG: number;
}
