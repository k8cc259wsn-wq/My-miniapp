import { useState } from 'react';
import type { ActivityLevel, Gender, UserProfile } from '@/types';
import { PageContainer } from '@/components/layout/PageContainer';
import { TextField } from '@/components/ui/TextField';
import { SegmentedControl } from '@/components/ui/SegmentedControl';
import { Button } from '@/components/ui/Button';
import { ACTIVITY_LABELS } from '@/utils/calories';
import { useAppStore } from '@/store/appStore';
import { getTelegramUser } from '@/utils/telegram';

const STEPS = ['Кто ты', 'Параметры тела', 'Цель и активность'] as const;

const ACTIVITY_OPTIONS: { value: ActivityLevel; label: string }[] = (
  Object.keys(ACTIVITY_LABELS) as ActivityLevel[]
).map((key) => ({ value: key, label: ACTIVITY_LABELS[key] }));

export function OnboardingPage() {
  const setProfile = useAppStore((s) => s.setProfile);
  const [step, setStep] = useState(0);

  const tgUser = getTelegramUser();
  const [name, setName] = useState(tgUser?.first_name ?? '');
  const [gender, setGender] = useState<Gender>('male');
  const [age, setAge] = useState('25');
  const [height, setHeight] = useState('175');
  const [weight, setWeight] = useState('65');
  const [targetWeight, setTargetWeight] = useState('75');
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>('moderate');

  const canProceedStep0 = name.trim().length > 0;
  const canProceedStep1 = Number(age) > 0 && Number(height) > 0 && Number(weight) > 0;

  async function finish() {
    const profile: UserProfile = {
      telegramId: tgUser?.id ?? 0,
      name: name.trim(),
      gender,
      age: Number(age),
      height: Number(height),
      weight: Number(weight),
      targetWeight: Number(targetWeight),
      activityLevel,
      createdAt: new Date().toISOString(),
      onboardingDone: true,
    };
    await setProfile(profile);
  }

  return (
    <PageContainer>
      <div style={{ paddingTop: 'calc(var(--safe-top) + 40px)' }}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>💪</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 34, margin: 0 }}>MassUp</h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: 14, margin: '6px 0 0' }}>
            Настроим план набора массы под тебя
          </p>
        </div>

        <div style={{ display: 'flex', gap: 6, marginBottom: 24 }}>
          {STEPS.map((_, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                height: 4,
                borderRadius: 4,
                background: i <= step ? 'var(--color-ember)' : 'var(--color-border)',
                transition: 'background 0.3s ease',
              }}
            />
          ))}
        </div>

        {step === 0 && (
          <div>
            <TextField label="Как тебя зовут?" value={name} onChange={(e) => setName(e.target.value)} placeholder="Имя" />
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginBottom: 6 }}>Пол</div>
              <SegmentedControl
                options={[
                  { value: 'male' as Gender, label: 'Мужской' },
                  { value: 'female' as Gender, label: 'Женский' },
                ]}
                value={gender}
                onChange={setGender}
              />
            </div>
            <Button fullWidth disabled={!canProceedStep0} onClick={() => setStep(1)}>
              Далее
            </Button>
          </div>
        )}

        {step === 1 && (
          <div>
            <TextField label="Возраст" unit="лет" type="number" inputMode="numeric" value={age} onChange={(e) => setAge(e.target.value)} />
            <TextField label="Рост" unit="см" type="number" inputMode="numeric" value={height} onChange={(e) => setHeight(e.target.value)} />
            <TextField label="Текущий вес" unit="кг" type="number" inputMode="decimal" value={weight} onChange={(e) => setWeight(e.target.value)} />
            <div style={{ display: 'flex', gap: 10, marginTop: 6 }}>
              <Button variant="secondary" fullWidth onClick={() => setStep(0)}>
                Назад
              </Button>
              <Button fullWidth disabled={!canProceedStep1} onClick={() => setStep(2)}>
                Далее
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <TextField
              label="Целевой вес"
              unit="кг"
              type="number"
              inputMode="decimal"
              value={targetWeight}
              onChange={(e) => setTargetWeight(e.target.value)}
            />
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginBottom: 6 }}>Уровень активности</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {ACTIVITY_OPTIONS.map((opt) => {
                  const active = opt.value === activityLevel;
                  return (
                    <button
                      key={opt.value}
                      onClick={() => setActivityLevel(opt.value)}
                      style={{
                        textAlign: 'left',
                        padding: '12px 14px',
                        borderRadius: 'var(--radius-sm)',
                        border: active ? '1px solid var(--color-ember)' : '1px solid var(--color-border)',
                        background: active ? 'var(--color-ember-soft)' : 'var(--color-bg-card)',
                        color: active ? 'var(--color-ember)' : 'var(--color-text-secondary)',
                        fontSize: 13,
                      }}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <Button variant="secondary" fullWidth onClick={() => setStep(1)}>
                Назад
              </Button>
              <Button fullWidth onClick={finish}>
                Начать
              </Button>
            </div>
          </div>
        )}
      </div>
    </PageContainer>
  );
}
