import { Link, useNavigate } from 'react-router-dom';
import { PageContainer } from '@/components/layout/PageContainer';
import { PageHeader } from '@/components/layout/PageHeader';
import { ProgramCard } from '@/components/workout/ProgramCard';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { WORKOUT_PROGRAMS } from '@/data/programs';
import { useAppStore } from '@/store/appStore';

export function WorkoutsPage() {
  const { activeProgram, setActiveProgram } = useAppStore();
  const navigate = useNavigate();

  return (
    <PageContainer>
      <PageHeader title="Тренировки" subtitle="Выбери программу или собери свою" />

      {activeProgram && (
        <Card style={{ marginBottom: 16, background: 'var(--color-ember-soft)', border: '1px solid var(--color-ember)' }}>
          <div style={{ fontSize: 12, color: 'var(--color-ember)', fontWeight: 700, marginBottom: 6 }}>АКТИВНАЯ ПРОГРАММА</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, marginBottom: 10 }}>{activeProgram.title}</div>
          <Button fullWidth onClick={() => navigate(`/workouts/${activeProgram.id}`)}>
            Открыть тренировки
          </Button>
        </Card>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
        {WORKOUT_PROGRAMS.map((program) => (
          <ProgramCard
            key={program.id}
            program={program}
            isActive={activeProgram?.id === program.id}
            onSelect={() => setActiveProgram(program)}
          />
        ))}
      </div>

      <Link to="/workouts/builder" style={{ textDecoration: 'none' }}>
        <Button variant="secondary" fullWidth>
          🛠 Собрать свою программу
        </Button>
      </Link>

      <Link to="/workouts/history" style={{ textDecoration: 'none' }}>
        <div style={{ marginTop: 10 }}>
          <Button variant="ghost" fullWidth>
            История тренировок →
          </Button>
        </div>
      </Link>
    </PageContainer>
  );
}
