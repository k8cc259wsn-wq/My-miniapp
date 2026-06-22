import { useMemo, useState } from 'react';
import type { FoodItem, MealType } from '@/types';
import { searchFood, groupFoodByCategory } from '@/data/foods';
import { TextField } from '@/components/ui/TextField';
import { SegmentedControl } from '@/components/ui/SegmentedControl';
import { Button } from '@/components/ui/Button';

interface AddFoodFormProps {
  defaultMeal: MealType;
  onSubmit: (food: FoodItem, grams: number, meal: MealType) => void;
}

const MEAL_OPTIONS: { value: MealType; label: string }[] = [
  { value: 'breakfast', label: 'Завтрак' },
  { value: 'lunch', label: 'Обед' },
  { value: 'dinner', label: 'Ужин' },
  { value: 'snack', label: 'Перекус' },
];

export function AddFoodForm({ defaultMeal, onSubmit }: AddFoodFormProps) {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<FoodItem | null>(null);
  const [grams, setGrams] = useState('100');
  const [meal, setMeal] = useState<MealType>(defaultMeal);

  const results = useMemo(() => searchFood(query), [query]);
  const grouped = useMemo(() => groupFoodByCategory(results), [results]);

  if (selected) {
    const g = Number(grams) || 0;
    const factor = g / 100;
    return (
      <div>
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 16, fontWeight: 700 }}>{selected.name}</div>
          <div style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>
            {Math.round(selected.kcal * factor)} ккал · Б{Math.round(selected.proteinG * factor)} Ж
            {Math.round(selected.fatG * factor)} У{Math.round(selected.carbsG * factor)}
          </div>
        </div>

        <TextField
          label="Количество"
          unit="г"
          type="number"
          inputMode="numeric"
          value={grams}
          onChange={(e) => setGrams(e.target.value)}
          autoFocus
        />

        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginBottom: 6 }}>Приём пищи</div>
          <SegmentedControl options={MEAL_OPTIONS} value={meal} onChange={setMeal} columns={2} />
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <Button variant="secondary" onClick={() => setSelected(null)} fullWidth>
            Назад
          </Button>
          <Button onClick={() => g > 0 && onSubmit(selected, g, meal)} fullWidth disabled={g <= 0}>
            Добавить
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <TextField
        label="Поиск продукта"
        placeholder="Например, куриная грудка"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        autoFocus
      />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginTop: 4 }}>
        {Object.entries(grouped).map(([category, items]) => (
          <div key={category}>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-text-muted)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5 }}>
              {category}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelected(item)}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '12px 14px',
                    background: 'var(--color-bg-card)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-sm)',
                    color: 'var(--color-text-primary)',
                    textAlign: 'left',
                  }}
                >
                  <span style={{ fontSize: 14 }}>{item.name}</span>
                  <span style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>{item.kcal} ккал/100г</span>
                </button>
              ))}
            </div>
          </div>
        ))}
        {results.length === 0 && (
          <div style={{ textAlign: 'center', color: 'var(--color-text-muted)', padding: 24, fontSize: 14 }}>
            Ничего не найдено
          </div>
        )}
      </div>
    </div>
  );
}
