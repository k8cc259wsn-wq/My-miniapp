import type { FoodLogEntry, MealType } from '@/types';
import { Card } from '@/components/ui/Card';

const MEAL_LABELS: Record<MealType, string> = {
  breakfast: 'Завтрак',
  lunch: 'Обед',
  dinner: 'Ужин',
  snack: 'Перекус',
};

const MEAL_ORDER: MealType[] = ['breakfast', 'lunch', 'dinner', 'snack'];

interface MealListProps {
  entries: FoodLogEntry[];
  onRemove: (id: string) => void;
}

export function MealList({ entries, onRemove }: MealListProps) {
  if (entries.length === 0) {
    return (
      <Card style={{ textAlign: 'center', padding: 28 }}>
        <div style={{ fontSize: 32, marginBottom: 8 }}>🍳</div>
        <div style={{ fontWeight: 700, marginBottom: 4 }}>Пока пусто</div>
        <div style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>
          Добавьте первый приём пищи кнопкой ниже
        </div>
      </Card>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {MEAL_ORDER.map((meal) => {
        const mealEntries = entries.filter((e) => e.meal === meal);
        if (mealEntries.length === 0) return null;
        const mealKcal = mealEntries.reduce((sum, e) => sum + e.kcal, 0);

        return (
          <div key={meal}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, padding: '0 4px' }}>
              <span style={{ fontWeight: 700, fontSize: 14 }}>{MEAL_LABELS[meal]}</span>
              <span style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>{Math.round(mealKcal)} ккал</span>
            </div>
            <Card style={{ padding: 0, overflow: 'hidden' }}>
              {mealEntries.map((entry, idx) => (
                <div
                  key={entry.id}
                  onClick={() => onRemove(entry.id)}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '12px 14px',
                    borderTop: idx === 0 ? 'none' : '1px solid var(--color-border)',
                    cursor: 'pointer',
                  }}
                >
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>{entry.foodName}</div>
                    <div style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>
                      {entry.grams} г · Б{Math.round(entry.proteinG)} Ж{Math.round(entry.fatG)} У{Math.round(entry.carbsG)}
                    </div>
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-ember)' }}>{Math.round(entry.kcal)}</div>
                </div>
              ))}
            </Card>
          </div>
        );
      })}
    </div>
  );
}
