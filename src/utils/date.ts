/** Возвращает дату в формате YYYY-MM-DD (без времени), используется как универсальный ключ дня */
export function toDateKey(date: Date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function todayKey(): string {
  return toDateKey(new Date());
}

/** Человекочитаемая дата, например "21 июня" */
export function formatHumanDate(dateKey: string): string {
  const [y, m, d] = dateKey.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' });
}

/** Короткая дата, например "21.06" — для подписей на графиках */
export function formatShortDate(dateKey: string): string {
  const [, m, d] = dateKey.split('-');
  return `${d}.${m}`;
}

export function addDays(dateKey: string, days: number): string {
  const [y, m, d] = dateKey.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  date.setDate(date.getDate() + days);
  return toDateKey(date);
}

/** Разница в днях между двумя ISO-датами (a - b) */
export function diffDays(a: string, b: string): number {
  const [ay, am, ad] = a.split('-').map(Number);
  const [by, bm, bd] = b.split('-').map(Number);
  const dateA = new Date(ay, am - 1, ad);
  const dateB = new Date(by, bm - 1, bd);
  return Math.round((dateA.getTime() - dateB.getTime()) / (1000 * 60 * 60 * 24));
}

/** Название дня недели, например "Пн" */
export function weekdayShort(dateKey: string): string {
  const [y, m, d] = dateKey.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString('ru-RU', { weekday: 'short' });
}
