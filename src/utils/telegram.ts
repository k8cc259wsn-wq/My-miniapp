/**
 * Обёртка над Telegram Mini Apps SDK.
 *
 * CloudStorage — встроенное в Telegram облачное хранилище ключ-значение,
 * привязанное к паре (пользователь + бот). Данные синхронизируются между
 * всеми устройствами пользователя автоматически, без своего сервера.
 *
 * Ограничения Telegram CloudStorage (официальные, на момент написания):
 * - до 1024 ключей на пользователя
 * - значение каждого ключа до 4096 байт
 * - ключ до 128 символов
 *
 * Поэтому крупные коллекции (записи дневника, тренировки) храним
 * чанками по дате/месяцу, а не одним большим JSON-блобом.
 */

type TelegramWebApp = {
  ready: () => void;
  expand: () => void;
  enableClosingConfirmation: () => void;
  setHeaderColor: (color: string) => void;
  setBackgroundColor: (color: string) => void;
  colorScheme: 'light' | 'dark';
  themeParams: Record<string, string>;
  initDataUnsafe?: {
    user?: {
      id: number;
      first_name: string;
      last_name?: string;
      username?: string;
      language_code?: string;
    };
  };
  HapticFeedback?: {
    impactOccurred: (style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft') => void;
    notificationOccurred: (type: 'error' | 'success' | 'warning') => void;
  };
  CloudStorage: {
    setItem: (key: string, value: string, cb?: (err: unknown, success?: boolean) => void) => void;
    getItem: (key: string, cb: (err: unknown, value?: string) => void) => void;
    getItems: (keys: string[], cb: (err: unknown, values?: Record<string, string>) => void) => void;
    removeItem: (key: string, cb?: (err: unknown, success?: boolean) => void) => void;
    removeItems: (keys: string[], cb?: (err: unknown, success?: boolean) => void) => void;
    getKeys: (cb: (err: unknown, keys?: string[]) => void) => void;
  };
};

declare global {
  interface Window {
    Telegram?: {
      WebApp: TelegramWebApp;
    };
  }
}

function getWebApp(): TelegramWebApp | null {
  return window.Telegram?.WebApp ?? null;
}

/** true, если приложение реально открыто внутри Telegram (а не в обычном браузере при разработке) */
export function isInsideTelegram(): boolean {
  return !!window.Telegram?.WebApp?.CloudStorage;
}

export function initTelegramApp(): void {
  const tg = getWebApp();
  if (!tg) return;
  tg.ready();
  tg.expand();
  try {
    tg.enableClosingConfirmation();
  } catch {
    // метод может быть недоступен в старых версиях клиента — не критично
  }
}

export function getTelegramUser() {
  return getWebApp()?.initDataUnsafe?.user ?? null;
}

export function getColorScheme(): 'light' | 'dark' {
  return getWebApp()?.colorScheme ?? 'dark';
}

export function hapticImpact(style: 'light' | 'medium' | 'heavy' = 'light'): void {
  getWebApp()?.HapticFeedback?.impactOccurred(style);
}

export function hapticSuccess(): void {
  getWebApp()?.HapticFeedback?.notificationOccurred('success');
}

export function hapticError(): void {
  getWebApp()?.HapticFeedback?.notificationOccurred('error');
}

/* ----------------------------------------------------------------------- */
/* CloudStorage: промисифицированный API с фолбэком на localStorage        */
/* ----------------------------------------------------------------------- */

/**
 * Фолбэк на localStorage — позволяет разрабатывать и тестировать приложение
 * в обычном браузере, без открытия внутри Telegram. В реальном Telegram-клиенте
 * всегда используется CloudStorage.
 */
const localFallback = {
  setItem(key: string, value: string): Promise<void> {
    window.localStorage.setItem(key, value);
    return Promise.resolve();
  },
  getItem(key: string): Promise<string | null> {
    return Promise.resolve(window.localStorage.getItem(key));
  },
  getItems(keys: string[]): Promise<Record<string, string>> {
    const result: Record<string, string> = {};
    for (const k of keys) {
      const v = window.localStorage.getItem(k);
      if (v !== null) result[k] = v;
    }
    return Promise.resolve(result);
  },
  removeItem(key: string): Promise<void> {
    window.localStorage.removeItem(key);
    return Promise.resolve();
  },
  removeItems(keys: string[]): Promise<void> {
    for (const k of keys) window.localStorage.removeItem(k);
    return Promise.resolve();
  },
  getKeys(): Promise<string[]> {
    return Promise.resolve(Object.keys(window.localStorage));
  },
};

export const cloudStorage = {
  setItem(key: string, value: string): Promise<void> {
    const tg = getWebApp();
    if (!tg) return localFallback.setItem(key, value);
    return new Promise((resolve, reject) => {
      tg.CloudStorage.setItem(key, value, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  },

  getItem(key: string): Promise<string | null> {
    const tg = getWebApp();
    if (!tg) return localFallback.getItem(key);
    return new Promise((resolve, reject) => {
      tg.CloudStorage.getItem(key, (err, value) => {
        if (err) reject(err);
        else resolve(value ?? null);
      });
    });
  },

  getItems(keys: string[]): Promise<Record<string, string>> {
    if (keys.length === 0) return Promise.resolve({});
    const tg = getWebApp();
    if (!tg) return localFallback.getItems(keys);
    return new Promise((resolve, reject) => {
      tg.CloudStorage.getItems(keys, (err, values) => {
        if (err) reject(err);
        else resolve(values ?? {});
      });
    });
  },

  removeItem(key: string): Promise<void> {
    const tg = getWebApp();
    if (!tg) return localFallback.removeItem(key);
    return new Promise((resolve, reject) => {
      tg.CloudStorage.removeItem(key, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  },

  removeItems(keys: string[]): Promise<void> {
    if (keys.length === 0) return Promise.resolve();
    const tg = getWebApp();
    if (!tg) return localFallback.removeItems(keys);
    return new Promise((resolve, reject) => {
      tg.CloudStorage.removeItems(keys, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  },

  getKeys(): Promise<string[]> {
    const tg = getWebApp();
    if (!tg) return localFallback.getKeys();
    return new Promise((resolve, reject) => {
      tg.CloudStorage.getKeys((err, keys) => {
        if (err) reject(err);
        else resolve(keys ?? []);
      });
    });
  },
};
