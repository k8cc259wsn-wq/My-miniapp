import type { WeightEntry } from '@/types';
import { readJson, writeJson, STORAGE_KEYS, monthKeyFromDate } from './storageKeys';

async function loadMonth(monthKey: string): Promise<WeightEntry[]> {
  return readJson<WeightEntry[]>(STORAGE_KEYS.weightMonth(monthKey), []);
}

async function saveMonth(monthKey: string, entries: WeightEntry[]): Promise<void> {
  await writeJson(STORAGE_KEYS.weightMonth(monthKey), entries);
}

export async function addWeightEntry(entry: WeightEntry): Promise<void> {
  const monthKey = monthKeyFromDate(entry.date);
  const entries = await loadMonth(monthKey);
  // Если запись на эту дату уже есть — заменяем (одна запись веса в день)
  const filtered = entries.filter((e) => e.date !== entry.date);
  filtered.push(entry);
  await saveMonth(monthKey, filtered);
}

export async function removeWeightEntry(dateKey: string, entryId: string): Promise<void> {
  const monthKey = monthKeyFromDate(dateKey);
  const entries = await loadMonth(monthKey);
  await saveMonth(monthKey, entries.filter((e) => e.id !== entryId));
}

export async function getWeightEntriesForMonths(monthKeys: string[]): Promise<WeightEntry[]> {
  const unique = Array.from(new Set(monthKeys));
  const months = await Promise.all(unique.map(loadMonth));
  return months.flat().sort((a, b) => (a.date > b.date ? 1 : -1));
}

/** Генерирует список последних N месяцев в формате YYYY-MM, включая текущий */
export function lastNMonthKeys(n: number, fromDateKey: string): string[] {
  const [y, m] = fromDateKey.split('-').map(Number);
  const keys: string[] = [];
  for (let i = 0; i < n; i++) {
    const date = new Date(y, m - 1 - i, 1);
    keys.push(`${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`);
  }
  return keys;
}
