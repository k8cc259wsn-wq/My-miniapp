import { useEffect, useState } from 'react';
import { ACHIEVEMENT_DEFINITIONS } from '@/store/achievementsRepository';
import { hapticSuccess } from '@/utils/telegram';

interface AchievementToastProps {
  achievementId: string | null;
  onDismiss: () => void;
}

export function AchievementToast({ achievementId, onDismiss }: AchievementToastProps) {
  const [visible, setVisible] = useState(false);
  const def = ACHIEVEMENT_DEFINITIONS.find((a) => a.id === achievementId);

  useEffect(() => {
    if (!achievementId) return;
    hapticSuccess();
    setVisible(true);
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onDismiss, 300);
    }, 3200);
    return () => clearTimeout(timer);
  }, [achievementId, onDismiss]);

  if (!def) return null;

  return (
    <div
      role="status"
      style={{
        position: 'fixed',
        top: 'calc(var(--safe-top) + 12px)',
        left: 16,
        right: 16,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        background: 'var(--color-bg-elevated)',
        border: '1px solid var(--color-ember)',
        borderRadius: 'var(--radius-md)',
        padding: '14px 16px',
        boxShadow: 'var(--shadow-card)',
        transform: visible ? 'translateY(0)' : 'translateY(-120%)',
        opacity: visible ? 1 : 0,
        transition: 'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease',
      }}
    >
      <div style={{ fontSize: 28 }}>{def.icon}</div>
      <div>
        <div style={{ fontSize: 12, color: 'var(--color-ember)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5 }}>
          Достижение разблокировано
        </div>
        <div style={{ fontSize: 15, fontWeight: 700 }}>{def.title}</div>
      </div>
    </div>
  );
}
