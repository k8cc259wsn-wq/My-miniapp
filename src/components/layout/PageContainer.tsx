import type { ReactNode } from 'react';

export function PageContainer({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        padding: '0 16px',
        paddingBottom: 'calc(var(--safe-bottom) + 88px)',
        maxWidth: 480,
        margin: '0 auto',
      }}
    >
      {children}
    </div>
  );
}
