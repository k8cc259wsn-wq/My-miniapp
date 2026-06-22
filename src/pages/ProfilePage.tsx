import { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { TextField } from '@/components/ui/TextField';
import { SegmentedControl } from '@/components/ui/SegmentedControl';
import { useAppStore } from '@/store/appStore';
import { ACTIVITY_LABELS } from '@/utils/calories';
import type { ActivityLevel } from '@/types';

export function ProfilePage() {
  const { profile, targets, setProfile } = useAppStore();
  const [editing, setEditing] = useState(false);

  const [weight, setWeight] = useState(String(profile?.weight ?? ''));
  const [targetWeight, setTargetWeight] = useState(String(profile?.targetWeight ?? ''));
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>(profile?.activityLevel ?? 'moderate');

  if (!profile || !targets) return null;

  const currentProfile = profile;

  async function handleSave() {
    await setProfile({
      ...currentProfile,
      weight: Number(weight) || currentProfile.weight,
      targetWeight: Number(targetWeight) || currentProfile.targetWeight,
      activityLevel,
    });
    setEditing(false);
  }

  return (
    <PageContainer>
      <PageHeader title="Профиль" subtitle={currentProfile.name} />

      <Card style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginBottom: 10 }}>Суточная норма для набора массы</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, textAlign: 'center' }}>
          <Stat label="Ккал" value={targets.calories} />
          <Stat label="Белки" value={`${targets.proteinG}г`} />
          <Stat label="Жиры" value={`${targets.fatG}г`} />
          <Stat label="Углеводы" value={`${targets.carbsG}г`} />
        </div>
      </Card>

      {!editing ? (
        <Card>
          <Row label="Пол" value={currentProfile.gender === 'male' ? 'Мужской' : 'Женский'} />
          <Row label="Возраст" value={`${currentProfile.age} лет`} />
          <Row label="Рост" value={`${currentProfile.height} см`} />
          <Row label="Текущий вес" value={`${currentProfile.weight} кг`} />
          <Row label="Целевой вес" value={`${currentProfile.targetWeight} кг`} />
          <Row label="Активность" value={ACTIVITY_LABELS[currentProfile.activityLevel]} last />
          <div style={{ marginTop: 14 }}>
            <Button variant="secondary" fullWidth onClick={() => setEditing(true)}>
              Изменить параметры
            </Button>
          </div>
        </Card>
      ) : (
        <Card>
          <TextField label="Текущий вес" unit="кг" type="number" inputMode="decimal" value={weight} onChange={(e) => setWeight(e.target.value)} />
          <TextField
            label="Целевой вес"
            unit="кг"
            type="number"
            inputMode="decimal"
            value={targetWeight}
            onChange={(e) => setTargetWeight(e.target.value)}
          />
          <div style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginBottom: 8 }}>Активность</div>
          <SegmentedControl
            options={[
              { value: 'sedentary' as ActivityLevel, label: 'Низкая' },
              { value: 'moderate' as ActivityLevel, label: 'Средняя' },
              { value: 'high' as ActivityLevel, label: 'Высокая' },
            ]}
            value={activityLevel}
            onChange={setActivityLevel}
          />
          <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
            <Button variant="secondary" fullWidth onClick={() => setEditing(false)}>
              Отмена
            </Button>
            <Button fullWidth onClick={handleSave}>
              Сохранить
            </Button>
          </div>
        </Card>
      )}

      <div style={{ textAlign: 'center', marginTop: 24, fontSize: 12, color: 'var(--color-text-muted)' }}>
        MassUp · данные хранятся в облаке Telegram
      </div>
    </PageContainer>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 20 }}>{value}</div>
      <div style={{ fontSize: 10, color: 'var(--color-text-muted)' }}>{label}</div>
    </div>
  );
}

function Row({ label, value, last }: { label: string; value: string; last?: boolean }) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '10px 0',
        borderBottom: last ? 'none' : '1px solid var(--color-border)',
      }}
    >
      <span style={{ color: 'var(--color-text-secondary)', fontSize: 14 }}>{label}</span>
      <span style={{ fontSize: 14, fontWeight: 600 }}>{value}</span>
    </div>
  );
}
