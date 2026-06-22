import { useState } from 'react';
import { TextField } from '@/components/ui/TextField';
import { Button } from '@/components/ui/Button';
import type { WeightEntry } from '@/types';
import { generateId } from '@/utils/id';
import { todayKey } from '@/utils/date';

interface AddWeightFormProps {
  onSubmit: (entry: WeightEntry) => void;
}

export function AddWeightForm({ onSubmit }: AddWeightFormProps) {
  const [weight, setWeight] = useState('');
  const [chest, setChest] = useState('');
  const [waist, setWaist] = useState('');
  const [biceps, setBiceps] = useState('');
  const [showMeasurements, setShowMeasurements] = useState(false);

  function handleSubmit() {
    const weightKg = Number(weight);
    if (!weightKg || weightKg <= 0) return;

    const entry: WeightEntry = {
      id: generateId(),
      date: todayKey(),
      weightKg,
      measurements: {
        chest: chest ? Number(chest) : undefined,
        waist: waist ? Number(waist) : undefined,
        biceps: biceps ? Number(biceps) : undefined,
      },
      createdAt: new Date().toISOString(),
    };
    onSubmit(entry);
  }

  return (
    <div>
      <TextField
        label="Вес сегодня"
        unit="кг"
        type="number"
        inputMode="decimal"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
        autoFocus
        placeholder="Например, 72.5"
      />

      {!showMeasurements ? (
        <button
          onClick={() => setShowMeasurements(true)}
          style={{ background: 'none', border: 'none', color: 'var(--color-ember)', fontSize: 13, padding: 0, marginBottom: 16 }}
        >
          + Добавить замеры тела
        </button>
      ) : (
        <div style={{ marginBottom: 6 }}>
          <TextField label="Грудь" unit="см" type="number" inputMode="decimal" value={chest} onChange={(e) => setChest(e.target.value)} />
          <TextField label="Талия" unit="см" type="number" inputMode="decimal" value={waist} onChange={(e) => setWaist(e.target.value)} />
          <TextField label="Бицепс" unit="см" type="number" inputMode="decimal" value={biceps} onChange={(e) => setBiceps(e.target.value)} />
        </div>
      )}

      <Button fullWidth onClick={handleSubmit} disabled={!weight}>
        Сохранить
      </Button>
    </div>
  );
}
