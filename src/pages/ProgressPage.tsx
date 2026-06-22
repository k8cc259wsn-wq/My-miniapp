import { useEffect, useRef, useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { BottomSheet } from '@/components/ui/BottomSheet';
import { WeightChart } from '@/components/charts/WeightChart';
import { AddWeightForm } from '@/components/progress/AddWeightForm';
import { AchievementGrid } from '@/components/progress/AchievementGrid';
import { addWeightEntry, getWeightEntriesForMonths, lastNMonthKeys } from '@/store/weightRepository';
import { loadAchievements, unlockAchievement } from '@/store/achievementsRepository';
import { useAppStore } from '@/store/appStore';
import { todayKey } from '@/utils/date';
import type { Achievement, WeightEntry } from '@/types';

export function ProgressPage() {
  const profile = useAppStore((s) => s.profile);
  const [entries, setEntries] = useState<WeightEntry[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const monthKeys = lastNMonthKeys(6, todayKey());
    const [weightEntries, achievementsList] = await Promise.all([
      getWeightEntriesForMonths(monthKeys),
      loadAchievements(),
    ]);
    setEntries(weightEntries);
    setAchievements(achievementsList);
    setLoading(false);
  }

  async function handleAddWeight(entry: WeightEntry) {
    const finalEntry = photoPreview ? { ...entry, photoDataUrl: photoPreview } : entry;
    await addWeightEntry(finalEntry);

    if (profile && entries.length > 0) {
      const firstWeight = entries[0].weightKg;
      if (entry.weightKg > firstWeight) {
        await unlockAchievement('weight-plus-1');
      }
    }

    setPhotoPreview(null);
    setSheetOpen(false);
    await load();
  }

  function handlePhotoSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPhotoPreview(reader.result as string);
    reader.readAsDataURL(file);
  }

  if (!profile) return null;

  const latestWeight = entries.length > 0 ? entries[entries.length - 1].weightKg : profile.weight;
  const startWeight = entries[0]?.weightKg ?? profile.weight;
  const diff = latestWeight - startWeight;
  const photosEntries = entries.filter(
    (e): e is WeightEntry & { photoDataUrl: string } => !!e.photoDataUrl
  );

  return (
    <PageContainer>
      <PageHeader title="Прогресс" subtitle="Вес, замеры и достижения" />

      <Card style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
          <div>
            <div style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>Текущий вес</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 32 }}>{latestWeight} кг</div>
          </div>
          {entries.length > 0 && (
            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: diff >= 0 ? 'var(--color-success)' : 'var(--color-steel)',
                background: diff >= 0 ? 'rgba(76,183,130,0.1)' : 'var(--color-steel-soft)',
                padding: '6px 10px',
                borderRadius: 8,
              }}
            >
              {diff >= 0 ? '+' : ''}
              {diff.toFixed(1)} кг
            </div>
          )}
        </div>
        {!loading && <WeightChart entries={entries} />}
        <Button fullWidth onClick={() => setSheetOpen(true)} style={{ marginTop: 8 }}>
          + Записать вес
        </Button>
      </Card>

      {photosEntries.length > 0 && (
        <div style={{ marginBottom: 16 }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 18, margin: '0 0 8px 4px' }}>Фото-прогресс</h2>
          <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
            {photosEntries.map((e) => (
              <div key={e.id} style={{ flexShrink: 0, textAlign: 'center' }}>
                <img
                  src={e.photoDataUrl}
                  alt="Фото прогресса"
                  style={{ width: 90, height: 120, objectFit: 'cover', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}
                />
                <div style={{ fontSize: 11, color: 'var(--color-text-muted)', marginTop: 4 }}>{e.weightKg} кг</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 18, margin: '0 0 8px 4px' }}>Достижения</h2>
        <Card>
          <AchievementGrid achievements={achievements} />
        </Card>
      </div>

      <BottomSheet open={sheetOpen} onClose={() => setSheetOpen(false)} title="Новая запись">
        <div style={{ marginBottom: 16 }}>
          {photoPreview ? (
            <div style={{ position: 'relative', marginBottom: 12 }}>
              <img src={photoPreview} alt="Превью" style={{ width: '100%', maxHeight: 200, objectFit: 'cover', borderRadius: 'var(--radius-sm)' }} />
              <button
                onClick={() => setPhotoPreview(null)}
                style={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  background: 'rgba(0,0,0,0.6)',
                  border: 'none',
                  borderRadius: '50%',
                  width: 28,
                  height: 28,
                  color: '#fff',
                }}
              >
                ✕
              </button>
            </div>
          ) : (
            <button
              onClick={() => fileInputRef.current?.click()}
              style={{
                width: '100%',
                padding: 14,
                marginBottom: 12,
                borderRadius: 'var(--radius-sm)',
                border: '1px dashed var(--color-border)',
                background: 'var(--color-bg-card)',
                color: 'var(--color-text-secondary)',
                fontSize: 13,
              }}
            >
              📷 Добавить фото прогресса (опционально)
            </button>
          )}
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handlePhotoSelect} style={{ display: 'none' }} />
        </div>
        <AddWeightForm onSubmit={handleAddWeight} />
      </BottomSheet>
    </PageContainer>
  );
}
