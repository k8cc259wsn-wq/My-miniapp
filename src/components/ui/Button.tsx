import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from 'react';
import { hapticImpact } from '@/utils/telegram';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'style'> {
  children: ReactNode;
  variant?: Variant;
  fullWidth?: boolean;
  /** Внешние стили (margin и т.п.) — мержатся поверх внутренних стилей варианта */
  style?: CSSProperties;
}

const VARIANT_STYLES: Record<Variant, React.CSSProperties> = {
  primary: {
    background: 'var(--color-ember)',
    color: '#1a0f08',
    border: 'none',
  },
  secondary: {
    background: 'var(--color-bg-elevated)',
    color: 'var(--color-text-primary)',
    border: '1px solid var(--color-border)',
  },
  ghost: {
    background: 'transparent',
    color: 'var(--color-text-secondary)',
    border: 'none',
  },
  danger: {
    background: 'transparent',
    color: '#e5484d',
    border: '1px solid #e5484d40',
  },
};

export function Button({ children, variant = 'primary', fullWidth, onClick, style, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      onClick={(e) => {
        hapticImpact('light');
        onClick?.(e);
      }}
      style={{
        ...VARIANT_STYLES[variant],
        width: fullWidth ? '100%' : undefined,
        padding: '14px 20px',
        borderRadius: 'var(--radius-sm)',
        fontWeight: 700,
        fontSize: 15,
        transition: 'transform 0.15s ease, opacity 0.15s ease',
        opacity: rest.disabled ? 0.5 : 1,
        ...style,
      }}
      onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.97)')}
      onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
    >
      {children}
    </button>
  );
}
