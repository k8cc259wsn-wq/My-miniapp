import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import type { WeightEntry } from '@/types';
import { formatShortDate } from '@/utils/date';

interface WeightChartProps {
  entries: WeightEntry[];
}

export function WeightChart({ entries }: WeightChartProps) {
  const data = entries.map((e) => ({ date: formatShortDate(e.date), weight: e.weightKg }));

  if (data.length < 2) {
    return (
      <div
        style={{
          height: 160,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--color-text-muted)',
          fontSize: 13,
        }}
      >
        Добавь хотя бы 2 замера веса, чтобы увидеть график
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={180}>
      <LineChart data={data} margin={{ top: 8, right: 8, left: -24, bottom: 0 }}>
        <XAxis
          dataKey="date"
          tick={{ fill: 'var(--color-text-muted)', fontSize: 11 }}
          axisLine={{ stroke: 'var(--color-border)' }}
          tickLine={false}
        />
        <YAxis
          tick={{ fill: 'var(--color-text-muted)', fontSize: 11 }}
          axisLine={false}
          tickLine={false}
          domain={['dataMin - 2', 'dataMax + 2']}
        />
        <Tooltip
          contentStyle={{
            background: 'var(--color-bg-elevated)',
            border: '1px solid var(--color-border)',
            borderRadius: 8,
            fontSize: 12,
          }}
          labelStyle={{ color: 'var(--color-text-secondary)' }}
          itemStyle={{ color: 'var(--color-ember)' }}
          formatter={(value: number) => [`${value} кг`, 'Вес']}
        />
        <Line
          type="monotone"
          dataKey="weight"
          stroke="var(--color-ember)"
          strokeWidth={2.5}
          dot={{ r: 3, fill: 'var(--color-ember)' }}
          activeDot={{ r: 5 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
