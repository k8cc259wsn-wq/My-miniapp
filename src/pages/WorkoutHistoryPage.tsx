import { useEffect, useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card } from '@/components/ui/Card';
import { getWorkoutsForMonths } from '@/store/workoutRepository';
import { lastNMonthKeys } from '@/store/weightRepository';
import { formatHumanDate, todayKey } from '@/utils/date';
import type { WorkoutLogEntry } from '@/types';

export function WorkoutHistoryPage() {
  const [logs, setLogs] = useState<WorkoutLogEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const monthKeys = lastNMonthKeys(3, todayKey());
    getWorkoutsForMonths(monthKeys).then((data) => {
      setLogs(data);
      setLoading(false);
    });
  }, []);

  return (
    <PageContainer>
      <PageHeader title="История" subtitle="Завершённые тренировки за 3 месяца" />

      {!loading && logs.length === 0 && (
        <Card style={{ textAlign: 'center', padding: 28 }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>🏋️</div>
          <div style={{ color: 'var(--color-text-secondary)', fontSize: 14 }}>Тренировок пока нет</div>
        </Card>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {logs.map((log) => {
          const totalSets = log.exercises.reduce((sum, e) => sum + e.sets.length, 0);
          const totalVolume = log.exercises.reduce(
            (sum, e) => sum + e.sets.reduce((s, set) => s + set.reps * set.weightKg, 0),
            0
          );
          return (
            <Card key={log.id}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontWeight: 700 }}>{log.dayTitle}</span>
                <span style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>{formatHumanDate(log.date)}</span>
              </div>
              <div style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>
                {log.exercises.length} упражнений · {totalSets} подходов · {log.durationMin} мин
                {totalVolume > 0 && ` · Объём ${Math.round(totalVolume)} кг`}
              </div>
            </Card>
          );
        })}
      </div>
    </PageContainer>
  );
}
