import { useNavigate, useParams } from 'react-router-dom';
import { PageContainer } from '@/components/layout/PageContainer';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card } from '@/components/ui/Card';
import { getProgramById, isCustomProgramId } from '@/data/programs';
import { useAppStore } from '@/store/appStore';

export function ProgramDetailPage() {
  const { programId } = useParams<{ programId: string }>();
  const navigate = useNavigate();
  const activeProgram = useAppStore((s) => s.activeProgram);

  const program =
    programId && isCustomProgramId(programId)
      ? activeProgram?.id === programId
        ? activeProgram
        : undefined
      : programId
        ? getProgramById(programId)
        : undefined;

  if (!program) {
    return (
      <PageContainer>
        <PageHeader title="Программа не найдена" />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageHeader title={program.title} subtitle={`${program.daysPerWeek} тренировки в неделю`} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {program.days.map((day) => (
          <Card key={day.id} onClick={() => navigate(`/workouts/${program.id}/${day.id}`)}>
            <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>{day.title}</div>
            <div style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>
              {day.exercises.length} упражнений
            </div>
          </Card>
        ))}
      </div>
    </PageContainer>
  );
}
