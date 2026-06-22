import { useEffect, useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card } from '@/components/ui/Card';
import { addDays, formatHumanDate, todayKey } from '@/utils/date';
import { getEntriesForDate, removeFoodEntry } from '@/store/nutritionRepository';
import type { FoodLogEntry } from '@/types';
import { useAppStore } from '@/store/appStore';

export function NutritionHistoryPage() {
  const today = todayKey();
  const [selectedDate, setSelectedDate] = useState(today);
  const [entries, setEntries] = useState<FoodLogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const refreshToday = useAppStore((s) => s.refreshToday);

  const days = Array.from({ length: 7 }, (_, i) => addDays(today, -i));

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getEntriesForDate(selectedDate).then((data) => {
      if (!cancelled) {
        setEntries(data);
        setLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [selectedDate]);

  async function handleRemove(id: string) {
    await removeFoodEntry(selectedDate, id);
    setEntries((prev) => prev.filter((e) => e.id !== id));
    if (selectedDate === today) refreshToday();
  }

  const totals = entries.reduce(
    (acc, e) => ({
      kcal: acc.kcal + e.kcal,
      proteinG: acc.proteinG + e.proteinG,
      fatG: acc.fatG + e.fatG,
      carbsG: acc.carbsG + e.carbsG,
    }),
    { kcal: 0, proteinG: 0, fatG: 0, carbsG: 0 }
  );

  return (
    <PageContainer>
      <PageHeader title="Питание" subtitle="История дневника за неделю" />

      <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 8, marginBottom: 16 }}>
        {days.map((day) => {
          const active = day === selectedDate;
          return (
            <button
              key={day}
              onClick={() => setSelectedDate(day)}
              style={{
                flexShrink: 0,
                padding: '10px 14px',
                borderRadius: 'var(--radius-sm)',
                border: active ? '1px solid var(--color-ember)' : '1px solid var(--color-border)',
                background: active ? 'var(--color-ember-soft)' : 'var(--color-bg-card)',
                color: active ? 'var(--color-ember)' : 'var(--color-text-secondary)',
                fontSize: 13,
                fontWeight: 600,
                whiteSpace: 'nowrap',
              }}
            >
              {day === today ? 'Сегодня' : formatHumanDate(day)}
            </button>
          );
        })}
      </div>

      {!loading && (
        <Card style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>Итого за день</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 28 }}>{Math.round(totals.kcal)} ккал</div>
            </div>
            <div style={{ textAlign: 'right', fontSize: 12, color: 'var(--color-text-secondary)' }}>
              <div>Белки: {Math.round(totals.proteinG)} г</div>
              <div>Жиры: {Math.round(totals.fatG)} г</div>
              <div>Углеводы: {Math.round(totals.carbsG)} г</div>
            </div>
          </div>
        </Card>
      )}

      {!loading && entries.length === 0 && (
        <Card style={{ textAlign: 'center', padding: 28 }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>📭</div>
          <div style={{ color: 'var(--color-text-secondary)', fontSize: 14 }}>В этот день записей нет</div>
        </Card>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {entries.map((entry) => (
          <Card
            key={entry.id}
            onClick={() => handleRemove(entry.id)}
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 14 }}
          >
            <div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>{entry.foodName}</div>
              <div style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>{entry.grams} г</div>
            </div>
            <div style={{ fontWeight: 700, color: 'var(--color-ember)' }}>{Math.round(entry.kcal)} ккал</div>
          </Card>
        ))}
      </div>
    </PageContainer>
  );
}
