/** Группа мышц для фильтрации упражнений */
export type MuscleGroup =
  | 'chest'
  | 'back'
  | 'legs'
  | 'shoulders'
  | 'arms'
  | 'abs'
  | 'fullbody';

/** Уровень подготовки, под который рассчитана готовая программа */
export type ProgramLevel = 'beginner' | 'intermediate' | 'advanced';

export interface Exercise {
  id: string;
  name: string;
  muscleGroup: MuscleGroup;
  /** Краткая техника выполнения */
  technique: string;
  /** Нужен ли инвентарь (зал) или можно дома */
  equipment: 'gym' | 'home' | 'both';
}

/** Один подход в плане тренировки */
export interface PlannedSet {
  reps: string; // строка, т.к. может быть "8-12" или "до отказа"
  /** Целевой вес в кг, null если без отягощения / на технику */
  weightKg: number | null;
}

/** Упражнение внутри конкретной тренировки программы */
export interface WorkoutExercise {
  exerciseId: string;
  exerciseName: string;
  sets: PlannedSet[];
  /** Отдых между подходами, секунд */
  restSeconds: number;
  note?: string;
}

/** Одна тренировка (день) внутри программы */
export interface WorkoutDay {
  id: string;
  title: string; // например "День 1 — Грудь и трицепс"
  exercises: WorkoutExercise[];
}

/** Готовая программа тренировок */
export interface WorkoutProgram {
  id: string;
  title: string;
  level: ProgramLevel;
  description: string;
  /** Сколько тренировок в неделю предполагает программа */
  daysPerWeek: number;
  days: WorkoutDay[];
}

/** Лог фактически выполненного подхода (для прогресса по весам) */
export interface CompletedSet {
  reps: number;
  weightKg: number;
}

export interface CompletedExerciseLog {
  exerciseId: string;
  exerciseName: string;
  sets: CompletedSet[];
}

/** Запись о завершённой тренировке пользователя */
export interface WorkoutLogEntry {
  id: string;
  /** ISO-дата без времени */
  date: string;
  programId: string | null;
  dayTitle: string;
  exercises: CompletedExerciseLog[];
  /** Длительность тренировки в минутах */
  durationMin: number;
  createdAt: string;
}
