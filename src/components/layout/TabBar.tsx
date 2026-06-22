import { NavLink } from 'react-router-dom';

const TABS = [
  { to: '/', label: 'Сегодня', icon: '🏠' },
  { to: '/nutrition', label: 'Питание', icon: '🍽️' },
  { to: '/workouts', label: 'Тренировки', icon: '💪' },
  { to: '/progress', label: 'Прогресс', icon: '📈' },
  { to: '/profile', label: 'Профиль', icon: '⚙️' },
];

export function TabBar() {
  return (
    <nav
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'space-around',
        background: 'var(--color-bg-elevated)',
        borderTop: '1px solid var(--color-border)',
        paddingBottom: 'calc(var(--safe-bottom) + 8px)',
        paddingTop: 8,
        zIndex: 100,
      }}
    >
      {TABS.map((tab) => (
        <NavLink
          key={tab.to}
          to={tab.to}
          style={({ isActive }) => ({
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
            textDecoration: 'none',
            color: isActive ? 'var(--color-ember)' : 'var(--color-text-muted)',
            fontSize: 11,
            fontWeight: 600,
            padding: '4px 10px',
            transition: 'color 0.2s ease',
          })}
        >
          <span style={{ fontSize: 20 }}>{tab.icon}</span>
          {tab.label}
        </NavLink>
      ))}
    </nav>
  );
}
