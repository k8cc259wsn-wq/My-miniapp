import type { CSSProperties, ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  style?: CSSProperties;
  onClick?: () => void;
  className?: string;
}

export function Card({ children, style, onClick, className }: CardProps) {
  return (
    <div
      className={className}
      onClick={onClick}
      style={{
        background: 'var(--color-bg-card)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-md)',
        padding: 16,
        boxShadow: 'var(--shadow-card)',
        cursor: onClick ? 'pointer' : undefined,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
