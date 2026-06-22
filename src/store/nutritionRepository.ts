import type { FoodLogEntry } from '@/types';
import { readJson, writeJson, STORAGE_KEYS, monthKeyFromDate } from './storageKeys';

async function loadMonth(monthKey: string): Promise<FoodLogEntry[]> {
  return readJson<FoodLogEntry[]>(STORAGE_KEYS.nutritionMonth(monthKey), []);
}

async function saveMonth(monthKey: string, entries: FoodLogEntry[]): Promise<void> {
  await writeJson(STORAGE_KEYS.nutritionMonth(monthKey), entries);
}

export async function getEntriesForDate(dateKey: string): Promise<FoodLogEntry[]> {
  const month = await loadMonth(monthKeyFromDate(dateKey));
  return month.filter((e) => e.date === dateKey);
}

export async function addFoodEntry(entry: FoodLogEntry): Promise<void> {
  const monthKey = monthKeyFromDate(entry.date);
  const entries = await loadMonth(monthKey);
  entries.push(entry);
  await saveMonth(monthKey, entries);
}

export async function removeFoodEntry(dateKey: string, entryId: string): Promise<void> {
  const monthKey = monthKeyFromDate(dateKey);
  const entries = await loadMonth(monthKey);
  await saveMonth(monthKey, entries.filter((e) => e.id !== entryId));
}

/** Возвращает записи за последние N дней (для графиков и расчёта streak) */
export async function getEntriesForLastDays(dateKeys: string[]): Promise<Record<string, FoodLogEntry[]>> {
  const monthKeys = Array.from(new Set(dateKeys.map(monthKeyFromDate)));
  const months = await Promise.all(monthKeys.map(loadMonth));
  const allEntries = months.flat();

  const result: Record<string, FoodLogEntry[]> = {};
  for (const date of dateKeys) {
    result[date] = allEntries.filter((e) => e.date === date);
  }
  return result;
}
