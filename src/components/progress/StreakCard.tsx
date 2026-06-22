import { useStreak } from '@/hooks/useStreak';
import { Card } from '@/components/ui/Card';

export function StreakCard() {
  const { streak, loading } = useStreak();

  if (loading) return null;

  return (
    <Card
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        background: streak > 0 ? 'var(--color-ember-soft)' : 'var(--color-bg-card)',
        border: streak > 0 ? '1px solid var(--color-ember)' : '1px solid var(--color-border)',
      }}
    >
      <span style={{ fontSize: 28 }}>🔥</span>
      <div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, lineHeight: 1 }}>
          {streak} {streak === 1 ? 'день' : 'дней'} подряд
        </div>
        <div style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>
          {streak === 0 ? 'Добавь приём пищи, чтобы начать серию' : 'Веди дневник каждый день — не теряй серию'}
        </div>
      </div>
    </Card>
  );
}
