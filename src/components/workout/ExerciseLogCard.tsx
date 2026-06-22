import type { CompletedSet, WorkoutExercise } from '@/types';
import { Card } from '@/components/ui/Card';

interface ExerciseLogCardProps {
  exercise: WorkoutExercise;
  completedSets: CompletedSet[];
  onSetComplete: (setIndex: number, reps: number, weightKg: number) => void;
  onRestStart: () => void;
}

export function ExerciseLogCard({ exercise, completedSets, onSetComplete, onRestStart }: ExerciseLogCardProps) {
  return (
    <Card>
      <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 2 }}>{exercise.exerciseName}</div>
      <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginBottom: 12 }}>
        Отдых {exercise.restSeconds} сек
        {exercise.note && ` · ${exercise.note}`}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {exercise.sets.map((set, idx) => {
          const completed = completedSets[idx];
          return (
            <SetRow
              key={idx}
              setNumber={idx + 1}
              targetReps={set.reps}
              targetWeight={set.weightKg}
              completed={completed}
              onComplete={(reps, weightKg) => {
                onSetComplete(idx, reps, weightKg);
                onRestStart();
              }}
            />
          );
        })}
      </div>
    </Card>
  );
}

function SetRow({
  setNumber,
  targetReps,
  targetWeight,
  completed,
  onComplete,
}: {
  setNumber: number;
  targetReps: string;
  targetWeight: number | null;
  completed?: CompletedSet;
  onComplete: (reps: number, weightKg: number) => void;
}) {
  function handleClick() {
    if (completed) return;
    const repsStr = window.prompt(`Подход ${setNumber} — сколько повторений выполнено?`, targetReps.replace(/\D/g, '') || '10');
    if (repsStr === null) return;
    const reps = Number(repsStr) || 0;
    const weightStr = window.prompt('Рабочий вес, кг (0 если без веса)', String(targetWeight ?? 0));
    if (weightStr === null) return;
    const weightKg = Number(weightStr) || 0;
    onComplete(reps, weightKg);
  }

  return (
    <button
      onClick={handleClick}
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 12px',
        borderRadius: 'var(--radius-sm)',
        border: completed ? '1px solid var(--color-success)' : '1px solid var(--color-border)',
        background: completed ? 'rgba(76, 183, 130, 0.1)' : 'var(--color-bg-card)',
        color: 'var(--color-text-primary)',
      }}
    >
      <span style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>Подход {setNumber}</span>
      {completed ? (
        <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-success)' }}>
          {completed.reps} × {completed.weightKg} кг ✓
        </span>
      ) : (
        <span style={{ fontSize: 14 }}>
          Цель: {targetReps} {targetWeight ? `× ${targetWeight} кг` : ''}
        </span>
      )}
    </button>
  );
}
