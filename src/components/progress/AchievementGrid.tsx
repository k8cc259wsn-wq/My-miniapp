import type { Achievement } from '@/types';

interface AchievementGridProps {
  achievements: Achievement[];
}

export function AchievementGrid({ achievements }: AchievementGridProps) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
      {achievements.map((a) => {
        const unlocked = !!a.unlockedAt;
        return (
          <div
            key={a.id}
            title={a.description}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 4,
              padding: '12px 4px',
              borderRadius: 'var(--radius-sm)',
              background: unlocked ? 'var(--color-ember-soft)' : 'var(--color-bg-card)',
              border: unlocked ? '1px solid var(--color-ember)' : '1px solid var(--color-border)',
              opacity: unlocked ? 1 : 0.45,
            }}
          >
            <span style={{ fontSize: 22 }}>{a.icon}</span>
            <span style={{ fontSize: 9.5, textAlign: 'center', lineHeight: 1.2, color: 'var(--color-text-secondary)' }}>
              {a.title}
            </span>
          </div>
        );
      })}
    </div>
  );
}
