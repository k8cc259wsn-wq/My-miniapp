import type { InputHTMLAttributes } from 'react';

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  unit?: string;
}

export function TextField({ label, unit, style, ...rest }: TextFieldProps) {
  return (
    <label style={{ display: 'block', marginBottom: 14 }}>
      <div style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginBottom: 6 }}>{label}</div>
      <div style={{ position: 'relative' }}>
        <input
          {...rest}
          style={{
            width: '100%',
            background: 'var(--color-bg-card)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-sm)',
            padding: '12px 14px',
            color: 'var(--color-text-primary)',
            fontSize: 15,
            ...style,
          }}
        />
        {unit && (
          <span
            style={{
              position: 'absolute',
              right: 14,
              top: '50%',
              transform: 'translateY(-50%)',
              fontSize: 13,
              color: 'var(--color-text-muted)',
            }}
          >
            {unit}
          </span>
        )}
      </div>
    </label>
  );
}
