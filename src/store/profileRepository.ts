import type { UserProfile } from '@/types';
import { readJson, writeJson, STORAGE_KEYS } from './storageKeys';

export async function loadProfile(): Promise<UserProfile | null> {
  return readJson<UserProfile | null>(STORAGE_KEYS.profile, null);
}

export async function saveProfile(profile: UserProfile): Promise<void> {
  await writeJson(STORAGE_KEYS.profile, profile);
}
