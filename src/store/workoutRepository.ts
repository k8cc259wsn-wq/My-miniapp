import type { WorkoutLogEntry } from '@/types';
import { readJson, writeJson, STORAGE_KEYS, monthKeyFromDate } from './storageKeys';

async function loadMonth(monthKey: string): Promise<WorkoutLogEntry[]> {
  return readJson<WorkoutLogEntry[]>(STORAGE_KEYS.workoutMonth(monthKey), []);
}

async function saveMonth(monthKey: string, entries: WorkoutLogEntry[]): Promise<void> {
  await writeJson(STORAGE_KEYS.workoutMonth(monthKey), entries);
}

export async function addWorkoutLog(entry: WorkoutLogEntry): Promise<void> {
  const monthKey = monthKeyFromDate(entry.date);
  const entries = await loadMonth(monthKey);
  entries.push(entry);
  await saveMonth(monthKey, entries);
}

export async function getWorkoutsForMonth(monthKey: string): Promise<WorkoutLogEntry[]> {
  return loadMonth(monthKey);
}

export async function getWorkoutsForMonths(monthKeys: string[]): Promise<WorkoutLogEntry[]> {
  const unique = Array.from(new Set(monthKeys));
  const months = await Promise.all(unique.map(loadMonth));
  return months.flat().sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function removeWorkoutLog(dateKey: string, entryId: string): Promise<void> {
  const monthKey = monthKeyFromDate(dateKey);
  const entries = await loadMonth(monthKey);
  await saveMonth(monthKey, entries.filter((e) => e.id !== entryId));
}

/** Последние N тренировок для конкретного упражнения (для прогресса по весам) */
export async function getExerciseHistory(
  exerciseId: string,
  monthKeys: string[]
): Promise<{ date: string; bestSet: { reps: number; weightKg: number } }[]> {
  const workouts = await getWorkoutsForMonths(monthKeys);
  const history: { date: string; bestSet: { reps: number; weightKg: number } }[] = [];

  for (const w of workouts) {
    const ex = w.exercises.find((e) => e.exerciseId === exerciseId);
    if (!ex || ex.sets.length === 0) continue;
    const best = ex.sets.reduce((a, b) => (b.weightKg > a.weightKg ? b : a));
    history.push({ date: w.date, bestSet: best });
  }

  return history.sort((a, b) => (a.date > b.date ? 1 : -1));
}
