/** Замеры тела в см */
export interface BodyMeasurements {
  chest?: number;
  waist?: number;
  hips?: number;
  biceps?: number;
  thigh?: number;
}

/** Одна запись веса/замеров на конкретную дату */
export interface WeightEntry {
  id: string;
  date: string; // ISO без времени
  weightKg: number;
  measurements?: BodyMeasurements;
  /** base64 или URL фото прогресса, опционально */
  photoDataUrl?: string;
  note?: string;
  createdAt: string;
}

/** Достижение, которое пользователь может получить */
export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string; // эмодзи для простоты и нулевых зависимостей
  /** Дата получения, null если ещё не получено */
  unlockedAt: string | null;
}
