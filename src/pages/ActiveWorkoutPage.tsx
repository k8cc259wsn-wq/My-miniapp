import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PageContainer } from '@/components/layout/PageContainer';
import { PageHeader } from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/Button';
import { ExerciseLogCard } from '@/components/workout/ExerciseLogCard';
import { RestTimer } from '@/components/workout/RestTimer';
import { getProgramById, isCustomProgramId } from '@/data/programs';
import { addWorkoutLog } from '@/store/workoutRepository';
import { unlockAchievement } from '@/store/achievementsRepository';
import { generateId } from '@/utils/id';
import { todayKey } from '@/utils/date';
import { hapticSuccess } from '@/utils/telegram';
import { useAppStore } from '@/store/appStore';
import type { CompletedExerciseLog, CompletedSet, WorkoutLogEntry } from '@/types';

export function ActiveWorkoutPage() {
  const { programId, dayId } = useParams<{ programId: string; dayId: string }>();
  const navigate = useNavigate();
  const storeActiveProgram = useAppStore((s) => s.activeProgram);

  const program =
    programId && isCustomProgramId(programId)
      ? storeActiveProgram?.id === programId
        ? storeActiveProgram
        : undefined
      : programId
        ? getProgramById(programId)
        : undefined;
  const day = program?.days.find((d) => d.id === dayId);

  const [startedAt] = useState(() => Date.now());
  const [restSeconds, setRestSeconds] = useState<number | null>(null);

  // logs[exerciseIndex][setIndex] = CompletedSet
  const [logs, setLogs] = useState<Record<number, CompletedSet[]>>({});
  const [saving, setSaving] = useState(false);

  const totalSets = useMemo(() => day?.exercises.reduce((sum, ex) => sum + ex.sets.length, 0) ?? 0, [day]);
  const completedSetsCount = useMemo(
    () => Object.values(logs).reduce((sum, sets) => sum + sets.filter(Boolean).length, 0),
    [logs]
  );

  if (!program || !day) {
    return (
      <PageContainer>
        <PageHeader title="Тренировка не найдена" />
      </PageContainer>
    );
  }

  const currentProgram = program;
  const currentDay = day;

  function handleSetComplete(exerciseIndex: number, setIndex: number, reps: number, weightKg: number) {
    setLogs((prev) => {
      const exerciseSets = [...(prev[exerciseIndex] ?? [])];
      exerciseSets[setIndex] = { reps, weightKg };
      return { ...prev, [exerciseIndex]: exerciseSets };
    });
  }

  async function finishWorkout() {
    setSaving(true);
    const exercises: CompletedExerciseLog[] = currentDay.exercises.map((ex, idx) => ({
      exerciseId: ex.exerciseId,
      exerciseName: ex.exerciseName,
      sets: (logs[idx] ?? []).filter(Boolean),
    }));

    const durationMin = Math.max(1, Math.round((Date.now() - startedAt) / 60000));

    const entry: WorkoutLogEntry = {
      id: generateId(),
      date: todayKey(),
      programId: currentProgram.id,
      dayTitle: currentDay.title,
      exercises,
      durationMin,
      createdAt: new Date().toISOString(),
    };

    await addWorkoutLog(entry);
    const unlockedFirst = await unlockAchievement('first-workout');
    hapticSuccess();
    setSaving(false);

    navigate('/workouts', { state: { justFinished: true, unlockedFirst } });
  }

  const hasAnyCompletedSet = completedSetsCount > 0;

  return (
    <PageContainer>
      <PageHeader title={currentDay.title} subtitle={`${completedSetsCount} из ${totalSets} подходов выполнено`} />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {currentDay.exercises.map((exercise, idx) => (
          <ExerciseLogCard
            key={idx}
            exercise={exercise}
            completedSets={logs[idx] ?? []}
            onSetComplete={(setIndex, reps, weightKg) => handleSetComplete(idx, setIndex, reps, weightKg)}
            onRestStart={() => setRestSeconds(exercise.restSeconds)}
          />
        ))}
      </div>

      <div style={{ marginTop: 20 }}>
        <Button fullWidth onClick={finishWorkout} disabled={!hasAnyCompletedSet || saving}>
          {saving ? 'Сохраняем…' : 'Завершить тренировку'}
        </Button>
      </div>

      {restSeconds !== null && <RestTimer seconds={restSeconds} onClose={() => setRestSeconds(null)} />}
    </PageContainer>
  );
}
