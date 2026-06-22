import type { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  right?: ReactNode;
}

export function PageHeader({ title, subtitle, right }: PageHeaderProps) {
  return (
    <header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingTop: 'calc(var(--safe-top) + 20px)',
        paddingBottom: 8,
      }}
    >
      <div>
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 32,
            letterSpacing: 0.5,
            margin: 0,
            lineHeight: 1,
          }}
        >
          {title}
        </h1>
        {subtitle && (
          <p style={{ margin: '4px 0 0', color: 'var(--color-text-secondary)', fontSize: 14 }}>{subtitle}</p>
        )}
      </div>
      {right}
    </header>
  );
}
