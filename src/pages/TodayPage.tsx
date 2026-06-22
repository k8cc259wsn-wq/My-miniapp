import { useState } from 'react';
import type { FoodItem, FoodLogEntry, MealType } from '@/types';
import { PageContainer } from '@/components/layout/PageContainer';
import { PageHeader } from '@/components/layout/PageHeader';
import { DailySummaryCard } from '@/components/nutrition/DailySummaryCard';
import { StreakCard } from '@/components/progress/StreakCard';
import { MealList } from '@/components/nutrition/MealList';
import { BottomSheet } from '@/components/ui/BottomSheet';
import { AddFoodForm } from '@/components/nutrition/AddFoodForm';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { useAppStore } from '@/store/appStore';
import { generateId } from '@/utils/id';
import { todayKey, formatHumanDate } from '@/utils/date';
import { Link } from 'react-router-dom';

export function TodayPage() {
  const { profile, targets, todayEntries, todayDate, addFood, removeFood, activeProgram } = useAppStore();
  const [sheetOpen, setSheetOpen] = useState(false);

  if (!profile || !targets) return null;

  function handleAddFood(food: FoodItem, grams: number, meal: MealType) {
    const factor = grams / 100;
    const entry: FoodLogEntry = {
      id: generateId(),
      foodId: food.id,
      foodName: food.name,
      meal,
      grams,
      kcal: food.kcal * factor,
      proteinG: food.proteinG * factor,
      fatG: food.fatG * factor,
      carbsG: food.carbsG * factor,
      date: todayDate,
      createdAt: new Date().toISOString(),
    };
    addFood(entry);
    setSheetOpen(false);
  }

  return (
    <PageContainer>
      <PageHeader title={`Привет, ${profile.name}`} subtitle={formatHumanDate(todayKey())} />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <DailySummaryCard targets={targets} entries={todayEntries} />
        <StreakCard />

        {activeProgram ? (
          <Card>
            <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginBottom: 4 }}>Текущая программа</div>
            <div style={{ fontWeight: 700, marginBottom: 8 }}>{activeProgram.title}</div>
            <Link to="/workouts" style={{ textDecoration: 'none' }}>
              <Button variant="secondary" fullWidth>
                Перейти к тренировкам
              </Button>
            </Link>
          </Card>
        ) : (
          <Card>
            <div style={{ fontWeight: 700, marginBottom: 4 }}>Программа тренировок не выбрана</div>
            <div style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginBottom: 12 }}>
              Выбери готовую программу или собери свою
            </div>
            <Link to="/workouts" style={{ textDecoration: 'none' }}>
              <Button fullWidth>Выбрать программу</Button>
            </Link>
          </Card>
        )}

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '8px 4px' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 20, margin: 0 }}>Дневник питания</h2>
          </div>
          <MealList entries={todayEntries} onRemove={removeFood} />
        </div>

        <Button onClick={() => setSheetOpen(true)} fullWidth>
          + Добавить приём пищи
        </Button>
      </div>

      <BottomSheet open={sheetOpen} onClose={() => setSheetOpen(false)} title="Добавить продукт">
        <AddFoodForm defaultMeal="breakfast" onSubmit={handleAddFood} />
      </BottomSheet>
    </PageContainer>
  );
}
