/** Простой генератор ID, достаточный для локальных записей (не требует crypto-стойкости) */
export function generateId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
}
