import type { DailyTargets, FoodLogEntry } from '@/types';
import { ProgressRing } from '@/components/ui/ProgressRing';
import { ProgressBar } from '@/components/ui/ProgressBar';

interface DailySummaryCardProps {
  targets: DailyTargets;
  entries: FoodLogEntry[];
}

const MACROS = [
  { key: 'proteinG' as const, label: 'Белки', color: 'var(--color-ember)' },
  { key: 'fatG' as const, label: 'Жиры', color: 'var(--color-steel)' },
  { key: 'carbsG' as const, label: 'Углеводы', color: 'var(--color-success)' },
];

export function DailySummaryCard({ targets, entries }: DailySummaryCardProps) {
  const consumed = entries.reduce(
    (acc, e) => ({
      kcal: acc.kcal + e.kcal,
      proteinG: acc.proteinG + e.proteinG,
      fatG: acc.fatG + e.fatG,
      carbsG: acc.carbsG + e.carbsG,
    }),
    { kcal: 0, proteinG: 0, fatG: 0, carbsG: 0 }
  );

  const kcalProgress = consumed.kcal / targets.calories;
  const remaining = Math.max(targets.calories - consumed.kcal, 0);

  return (
    <div
      style={{
        background: 'linear-gradient(155deg, var(--color-bg-card) 0%, var(--color-bg-elevated) 100%)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-lg)',
        padding: 20,
        boxShadow: 'var(--shadow-card)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <div style={{ position: 'relative', flexShrink: 0 }}>
          <ProgressRing progress={kcalProgress} size={108} strokeWidth={10} />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 30, lineHeight: 1 }}>
              {Math.round(remaining)}
            </span>
            <span style={{ fontSize: 11, color: 'var(--color-text-secondary)' }}>ккал осталось</span>
          </div>
        </div>

        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginBottom: 2 }}>Съедено сегодня</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 26 }}>
            {Math.round(consumed.kcal)} <span style={{ fontSize: 14, color: 'var(--color-text-secondary)' }}>/ {targets.calories} ккал</span>
          </div>
          {kcalProgress > 1 && (
            <div style={{ fontSize: 12, color: 'var(--color-success)', marginTop: 2 }}>Цель по калориям выполнена ✓</div>
          )}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 18 }}>
        {MACROS.map((macro) => {
          const value = consumed[macro.key];
          const target = targets[macro.key];
          return (
            <div key={macro.key}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
                <span style={{ color: 'var(--color-text-secondary)' }}>{macro.label}</span>
                <span>
                  {Math.round(value)} / {target} г
                </span>
              </div>
              <ProgressBar progress={value / target} color={macro.color} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
