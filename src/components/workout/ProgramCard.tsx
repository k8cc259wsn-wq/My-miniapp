import type { ProgramLevel, WorkoutProgram } from '@/types';
import { Card } from '@/components/ui/Card';

const LEVEL_LABELS: Record<ProgramLevel, string> = {
  beginner: 'Новичок',
  intermediate: 'Средний',
  advanced: 'Продвинутый',
};

const LEVEL_COLORS: Record<ProgramLevel, string> = {
  beginner: 'var(--color-success)',
  intermediate: 'var(--color-steel)',
  advanced: 'var(--color-ember)',
};

interface ProgramCardProps {
  program: WorkoutProgram;
  isActive: boolean;
  onSelect: () => void;
}

export function ProgramCard({ program, isActive, onSelect }: ProgramCardProps) {
  return (
    <Card
      onClick={onSelect}
      style={{
        border: isActive ? '1px solid var(--color-ember)' : '1px solid var(--color-border)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
        <span
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: LEVEL_COLORS[program.level],
            background: `${LEVEL_COLORS[program.level]}1a`,
            padding: '3px 8px',
            borderRadius: 6,
            textTransform: 'uppercase',
            letterSpacing: 0.5,
          }}
        >
          {LEVEL_LABELS[program.level]}
        </span>
        {isActive && <span style={{ fontSize: 11, color: 'var(--color-ember)', fontWeight: 700 }}>✓ Активна</span>}
      </div>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, marginBottom: 4 }}>{program.title}</div>
      <div style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginBottom: 8 }}>{program.description}</div>
      <div style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>
        {program.daysPerWeek} тренировки в неделю · {program.days.length} дней программы
      </div>
    </Card>
  );
}
