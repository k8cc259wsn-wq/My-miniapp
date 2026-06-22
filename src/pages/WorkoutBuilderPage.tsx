import { useMemo, useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { TextField } from '@/components/ui/TextField';
import { EXERCISES } from '@/data/exercises';
import { useAppStore } from '@/store/appStore';
import { generateId } from '@/utils/id';
import type { MuscleGroup, WorkoutDay, WorkoutExercise, WorkoutProgram } from '@/types';
import { useNavigate } from 'react-router-dom';

const MUSCLE_OPTIONS: { value: MuscleGroup; label: string }[] = [
  { value: 'chest', label: 'Грудь' },
  { value: 'back', label: 'Спина' },
  { value: 'legs', label: 'Ноги' },
  { value: 'shoulders', label: 'Плечи' },
  { value: 'arms', label: 'Руки' },
  { value: 'abs', label: 'Пресс' },
  { value: 'fullbody', label: 'Всё тело' },
];

export function WorkoutBuilderPage() {
  const [muscleFilter, setMuscleFilter] = useState<MuscleGroup>('chest');
  const [dayTitle, setDayTitle] = useState('Моя тренировка');
  const [selected, setSelected] = useState<WorkoutExercise[]>([]);
  const setActiveProgram = useAppStore((s) => s.setActiveProgram);
  const navigate = useNavigate();

  const filteredExercises = useMemo(() => EXERCISES.filter((e) => e.muscleGroup === muscleFilter), [muscleFilter]);

  function addExercise(exerciseId: string, exerciseName: string) {
    if (selected.some((e) => e.exerciseId === exerciseId)) return;
    setSelected((prev) => [
      ...prev,
      {
        exerciseId,
        exerciseName,
        sets: [{ reps: '10-12', weightKg: null }, { reps: '10-12', weightKg: null }, { reps: '10-12', weightKg: null }],
        restSeconds: 90,
      },
    ]);
  }

  function removeExercise(exerciseId: string) {
    setSelected((prev) => prev.filter((e) => e.exerciseId !== exerciseId));
  }

  async function saveProgram() {
    if (selected.length === 0) return;
    const day: WorkoutDay = {
      id: generateId(),
      title: dayTitle.trim() || 'Моя тренировка',
      exercises: selected,
    };
    const program: WorkoutProgram = {
      id: `custom-${generateId()}`,
      title: dayTitle.trim() || 'Моя программа',
      level: 'intermediate',
      description: 'Собственная программа, составленная из библиотеки упражнений',
      daysPerWeek: 1,
      days: [day],
    };
    await setActiveProgram(program);
    navigate(`/workouts/${program.id}`);
  }

  return (
    <PageContainer>
      <PageHeader title="Конструктор" subtitle="Собери тренировку из упражнений" />

      <TextField label="Название тренировки" value={dayTitle} onChange={(e) => setDayTitle(e.target.value)} />

      {selected.length > 0 && (
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 8 }}>Выбрано ({selected.length})</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {selected.map((ex) => (
              <Card key={ex.exerciseId} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 12 }}>
                <span style={{ fontSize: 14 }}>{ex.exerciseName}</span>
                <button
                  onClick={() => removeExercise(ex.exerciseId)}
                  style={{ background: 'none', border: 'none', color: 'var(--color-text-muted)', fontSize: 18 }}
                  aria-label="Удалить"
                >
                  ✕
                </button>
              </Card>
            ))}
          </div>
        </div>
      )}

      <div style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginBottom: 8 }}>Группа мышц</div>
        <div style={{ overflowX: 'auto' }}>
          <div style={{ display: 'flex', gap: 8, paddingBottom: 4 }}>
            {MUSCLE_OPTIONS.map((opt) => {
              const active = opt.value === muscleFilter;
              return (
                <button
                  key={opt.value}
                  onClick={() => setMuscleFilter(opt.value)}
                  style={{
                    flexShrink: 0,
                    padding: '8px 14px',
                    borderRadius: 'var(--radius-sm)',
                    border: active ? '1px solid var(--color-ember)' : '1px solid var(--color-border)',
                    background: active ? 'var(--color-ember-soft)' : 'var(--color-bg-card)',
                    color: active ? 'var(--color-ember)' : 'var(--color-text-secondary)',
                    fontSize: 13,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
        {filteredExercises.map((ex) => {
          const isSelected = selected.some((s) => s.exerciseId === ex.id);
          return (
            <Card
              key={ex.id}
              onClick={() => addExercise(ex.id, ex.name)}
              style={{
                opacity: isSelected ? 0.5 : 1,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{ex.name}</div>
                <div style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>{ex.technique}</div>
              </div>
              <span style={{ fontSize: 18, color: isSelected ? 'var(--color-text-muted)' : 'var(--color-ember)' }}>
                {isSelected ? '✓' : '+'}
              </span>
            </Card>
          );
        })}
      </div>

      <Button fullWidth onClick={saveProgram} disabled={selected.length === 0}>
        Сохранить и начать
      </Button>
    </PageContainer>
  );
}
