interface SegmentOption<T extends string> {
  value: T;
  label: string;
}

interface SegmentedControlProps<T extends string> {
  options: SegmentOption<T>[];
  value: T;
  onChange: (value: T) => void;
  columns?: number;
}

export function SegmentedControl<T extends string>({ options, value, onChange, columns = options.length }: SegmentedControlProps<T>) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: 8,
      }}
    >
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            style={{
              padding: '10px 8px',
              borderRadius: 'var(--radius-sm)',
              border: active ? '1px solid var(--color-ember)' : '1px solid var(--color-border)',
              background: active ? 'var(--color-ember-soft)' : 'var(--color-bg-card)',
              color: active ? 'var(--color-ember)' : 'var(--color-text-secondary)',
              fontSize: 13,
              fontWeight: 600,
              transition: 'all 0.15s ease',
            }}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
