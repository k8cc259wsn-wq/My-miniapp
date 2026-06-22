import { create } from 'zustand';
import type { DailyTargets, FoodLogEntry, UserProfile, WorkoutProgram } from '@/types';
import { calculateBulkTargets } from '@/utils/calories';
import { todayKey } from '@/utils/date';
import { loadProfile, saveProfile } from './profileRepository';
import { addFoodEntry, getEntriesForDate, removeFoodEntry } from './nutritionRepository';
import { getProgramById, isCustomProgramId } from '@/data/programs';
import { readJson, writeJson, STORAGE_KEYS } from './storageKeys';
import { unlockAchievement } from './achievementsRepository';

interface AppState {
  /** Загружен ли начальный стейт из CloudStorage */
  isHydrated: boolean;
  profile: UserProfile | null;
  targets: DailyTargets | null;
  activeProgram: WorkoutProgram | null;

  todayEntries: FoodLogEntry[];
  todayDate: string;

  /** Достижение, которое только что разблокировалось — для тоста на экране */
  justUnlocked: string | null;
  clearJustUnlocked: () => void;

  hydrate: () => Promise<void>;
  setProfile: (profile: UserProfile) => Promise<void>;
  setActiveProgram: (program: WorkoutProgram) => Promise<void>;

  addFood: (entry: FoodLogEntry) => Promise<void>;
  removeFood: (entryId: string) => Promise<void>;
  refreshToday: () => Promise<void>;
}

export const useAppStore = create<AppState>((set, get) => ({
  isHydrated: false,
  profile: null,
  targets: null,
  activeProgram: null,
  todayEntries: [],
  todayDate: todayKey(),
  justUnlocked: null,
  clearJustUnlocked: () => set({ justUnlocked: null }),

  hydrate: async () => {
    const [profile, activeProgramId, todayEntries] = await Promise.all([
      loadProfile(),
      readJson<string | null>(STORAGE_KEYS.activeProgramId, null),
      getEntriesForDate(todayKey()),
    ]);

    const targets = profile
      ? calculateBulkTargets(profile.gender, profile.age, profile.height, profile.weight, profile.activityLevel)
      : null;

    let activeProgram: WorkoutProgram | null = null;
    if (activeProgramId) {
      if (isCustomProgramId(activeProgramId)) {
        activeProgram = await readJson<WorkoutProgram | null>(STORAGE_KEYS.customProgram, null);
      } else {
        activeProgram = getProgramById(activeProgramId) ?? null;
      }
    }

    set({
      isHydrated: true,
      profile,
      targets,
      activeProgram,
      todayEntries,
      todayDate: todayKey(),
    });
  },

  setProfile: async (profile) => {
    await saveProfile(profile);
    const targets = calculateBulkTargets(
      profile.gender,
      profile.age,
      profile.height,
      profile.weight,
      profile.activityLevel
    );
    set({ profile, targets });
  },

  setActiveProgram: async (program) => {
    await writeJson(STORAGE_KEYS.activeProgramId, program.id);
    if (isCustomProgramId(program.id)) {
      await writeJson(STORAGE_KEYS.customProgram, program);
    }
    set({ activeProgram: program });
  },

  addFood: async (entry) => {
    await addFoodEntry(entry);
    const wasFirst = get().todayEntries.length === 0;
    await get().refreshToday();
    if (wasFirst) {
      const unlocked = await unlockAchievement('first-log');
      if (unlocked) set({ justUnlocked: 'first-log' });
    }
  },

  removeFood: async (entryId) => {
    await removeFoodEntry(get().todayDate, entryId);
    await get().refreshToday();
  },

  refreshToday: async () => {
    const date = todayKey();
    const entries = await getEntriesForDate(date);
    set({ todayEntries: entries, todayDate: date });
  },
}));
