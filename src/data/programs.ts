import type { WorkoutProgram } from '@/types';

/**
 * Готовые программы тренировок для набора массы.
 * Каждая программа рассчитана на конкретный уровень и частоту тренировок в неделю.
 */
export const WORKOUT_PROGRAMS: WorkoutProgram[] = [
  {
    id: 'beginner-fullbody',
    title: 'Старт массы — фулбоди',
    level: 'beginner',
    description:
      'Программа для тех, кто только начинает. 3 тренировки в неделю на всё тело — лучший способ нарастить базовую силу и привыкнуть к технике.',
    daysPerWeek: 3,
    days: [
      {
        id: 'a',
        title: 'День А — Всё тело',
        exercises: [
          { exerciseId: 'bodyweight-squat', exerciseName: 'Приседания без веса', sets: [{ reps: '12-15', weightKg: null }, { reps: '12-15', weightKg: null }, { reps: '12-15', weightKg: null }], restSeconds: 90 },
          { exerciseId: 'push-ups', exerciseName: 'Отжимания от пола', sets: [{ reps: '10-12', weightKg: null }, { reps: '10-12', weightKg: null }, { reps: '10-12', weightKg: null }], restSeconds: 90 },
          { exerciseId: 'lat-pulldown', exerciseName: 'Тяга верхнего блока', sets: [{ reps: '10-12', weightKg: null }, { reps: '10-12', weightKg: null }, { reps: '10-12', weightKg: null }], restSeconds: 90 },
          { exerciseId: 'plank', exerciseName: 'Планка', sets: [{ reps: '30-45 сек', weightKg: null }, { reps: '30-45 сек', weightKg: null }], restSeconds: 60 },
        ],
      },
      {
        id: 'b',
        title: 'День Б — Всё тело',
        exercises: [
          { exerciseId: 'leg-press', exerciseName: 'Жим ногами в тренажёре', sets: [{ reps: '12-15', weightKg: null }, { reps: '12-15', weightKg: null }, { reps: '12-15', weightKg: null }], restSeconds: 90 },
          { exerciseId: 'seated-row', exerciseName: 'Тяга нижнего блока сидя', sets: [{ reps: '10-12', weightKg: null }, { reps: '10-12', weightKg: null }, { reps: '10-12', weightKg: null }], restSeconds: 90 },
          { exerciseId: 'lateral-raise', exerciseName: 'Махи гантелями в стороны', sets: [{ reps: '12-15', weightKg: null }, { reps: '12-15', weightKg: null }], restSeconds: 60 },
          { exerciseId: 'crunches', exerciseName: 'Скручивания', sets: [{ reps: '15-20', weightKg: null }, { reps: '15-20', weightKg: null }], restSeconds: 60 },
        ],
      },
      {
        id: 'c',
        title: 'День В — Всё тело',
        exercises: [
          { exerciseId: 'lunges', exerciseName: 'Выпады с гантелями', sets: [{ reps: '10-12', weightKg: null }, { reps: '10-12', weightKg: null }, { reps: '10-12', weightKg: null }], restSeconds: 90 },
          { exerciseId: 'dips-triceps', exerciseName: 'Отжимания от скамьи на трицепс', sets: [{ reps: '10-12', weightKg: null }, { reps: '10-12', weightKg: null }], restSeconds: 75 },
          { exerciseId: 'hammer-curl', exerciseName: 'Молотки с гантелями', sets: [{ reps: '10-12', weightKg: null }, { reps: '10-12', weightKg: null }], restSeconds: 75 },
          { exerciseId: 'calf-raise', exerciseName: 'Подъём на носки стоя', sets: [{ reps: '15-20', weightKg: null }, { reps: '15-20', weightKg: null }], restSeconds: 60 },
        ],
      },
    ],
  },
  {
    id: 'intermediate-upper-lower',
    title: 'Масса — верх/низ',
    level: 'intermediate',
    description:
      'Сплит верх/низ 4 раза в неделю. Подходит, если вы тренируетесь от 6 месяцев и готовы к большему объёму нагрузки.',
    daysPerWeek: 4,
    days: [
      {
        id: 'upper-a',
        title: 'День 1 — Верх (жимовой)',
        exercises: [
          { exerciseId: 'bench-press', exerciseName: 'Жим штанги лежа', sets: [{ reps: '6-8', weightKg: null }, { reps: '6-8', weightKg: null }, { reps: '6-8', weightKg: null }, { reps: '6-8', weightKg: null }], restSeconds: 120 },
          { exerciseId: 'ohp', exerciseName: 'Жим штанги стоя', sets: [{ reps: '8-10', weightKg: null }, { reps: '8-10', weightKg: null }, { reps: '8-10', weightKg: null }], restSeconds: 90 },
          { exerciseId: 'incline-db-press', exerciseName: 'Жим гантелей на наклонной скамье', sets: [{ reps: '10-12', weightKg: null }, { reps: '10-12', weightKg: null }, { reps: '10-12', weightKg: null }], restSeconds: 90 },
          { exerciseId: 'triceps-pushdown', exerciseName: 'Разгибание рук на блоке', sets: [{ reps: '12-15', weightKg: null }, { reps: '12-15', weightKg: null }, { reps: '12-15', weightKg: null }], restSeconds: 60 },
        ],
      },
      {
        id: 'lower-a',
        title: 'День 2 — Низ (силовой)',
        exercises: [
          { exerciseId: 'squat', exerciseName: 'Приседания со штангой', sets: [{ reps: '6-8', weightKg: null }, { reps: '6-8', weightKg: null }, { reps: '6-8', weightKg: null }, { reps: '6-8', weightKg: null }], restSeconds: 150 },
          { exerciseId: 'deadlift', exerciseName: 'Тяга штанги становая', sets: [{ reps: '5-6', weightKg: null }, { reps: '5-6', weightKg: null }, { reps: '5-6', weightKg: null }], restSeconds: 150 },
          { exerciseId: 'leg-curl', exerciseName: 'Сгибание ног в тренажёре', sets: [{ reps: '10-12', weightKg: null }, { reps: '10-12', weightKg: null }, { reps: '10-12', weightKg: null }], restSeconds: 75 },
          { exerciseId: 'calf-raise', exerciseName: 'Подъём на носки стоя', sets: [{ reps: '15-20', weightKg: null }, { reps: '15-20', weightKg: null }, { reps: '15-20', weightKg: null }], restSeconds: 60 },
        ],
      },
      {
        id: 'upper-b',
        title: 'День 3 — Верх (тяговый)',
        exercises: [
          { exerciseId: 'pull-ups', exerciseName: 'Подтягивания широким хватом', sets: [{ reps: '6-10', weightKg: null }, { reps: '6-10', weightKg: null }, { reps: '6-10', weightKg: null }, { reps: '6-10', weightKg: null }], restSeconds: 120 },
          { exerciseId: 'bent-row', exerciseName: 'Тяга штанги в наклоне', sets: [{ reps: '8-10', weightKg: null }, { reps: '8-10', weightKg: null }, { reps: '8-10', weightKg: null }], restSeconds: 90 },
          { exerciseId: 'rear-delt-fly', exerciseName: 'Махи в наклоне на заднюю дельту', sets: [{ reps: '12-15', weightKg: null }, { reps: '12-15', weightKg: null }, { reps: '12-15', weightKg: null }], restSeconds: 60 },
          { exerciseId: 'barbell-curl', exerciseName: 'Подъём штанги на бицепс', sets: [{ reps: '10-12', weightKg: null }, { reps: '10-12', weightKg: null }, { reps: '10-12', weightKg: null }], restSeconds: 60 },
        ],
      },
      {
        id: 'lower-b',
        title: 'День 4 — Низ (объёмный)',
        exercises: [
          { exerciseId: 'leg-press', exerciseName: 'Жим ногами в тренажёре', sets: [{ reps: '10-12', weightKg: null }, { reps: '10-12', weightKg: null }, { reps: '10-12', weightKg: null }, { reps: '10-12', weightKg: null }], restSeconds: 90 },
          { exerciseId: 'lunges', exerciseName: 'Выпады с гантелями', sets: [{ reps: '10-12', weightKg: null }, { reps: '10-12', weightKg: null }, { reps: '10-12', weightKg: null }], restSeconds: 75 },
          { exerciseId: 'leg-curl', exerciseName: 'Сгибание ног в тренажёре', sets: [{ reps: '12-15', weightKg: null }, { reps: '12-15', weightKg: null }, { reps: '12-15', weightKg: null }], restSeconds: 60 },
          { exerciseId: 'hanging-leg-raise', exerciseName: 'Подъём ног в висе', sets: [{ reps: '12-15', weightKg: null }, { reps: '12-15', weightKg: null }, { reps: '12-15', weightKg: null }], restSeconds: 60 },
        ],
      },
    ],
  },
  {
    id: 'advanced-ppl',
    title: 'Масса — Push/Pull/Legs',
    level: 'advanced',
    description:
      'Классический сплит push/pull/legs 6 раз в неделю для опытных атлетов, готовых к высокому тренировочному объёму.',
    daysPerWeek: 6,
    days: [
      {
        id: 'push',
        title: 'Push — Грудь, плечи, трицепс',
        exercises: [
          { exerciseId: 'bench-press', exerciseName: 'Жим штанги лежа', sets: [{ reps: '5-6', weightKg: null }, { reps: '5-6', weightKg: null }, { reps: '5-6', weightKg: null }, { reps: '5-6', weightKg: null }, { reps: '5-6', weightKg: null }], restSeconds: 150 },
          { exerciseId: 'ohp', exerciseName: 'Жим штанги стоя', sets: [{ reps: '8-10', weightKg: null }, { reps: '8-10', weightKg: null }, { reps: '8-10', weightKg: null }], restSeconds: 100 },
          { exerciseId: 'incline-db-press', exerciseName: 'Жим гантелей на наклонной скамье', sets: [{ reps: '8-10', weightKg: null }, { reps: '8-10', weightKg: null }, { reps: '8-10', weightKg: null }], restSeconds: 90 },
          { exerciseId: 'pec-deck', exerciseName: 'Сведения в тренажёре', sets: [{ reps: '12-15', weightKg: null }, { reps: '12-15', weightKg: null }, { reps: '12-15', weightKg: null }], restSeconds: 60 },
          { exerciseId: 'triceps-pushdown', exerciseName: 'Разгибание рук на блоке', sets: [{ reps: '10-12', weightKg: null }, { reps: '10-12', weightKg: null }, { reps: '10-12', weightKg: null }], restSeconds: 60 },
        ],
      },
      {
        id: 'pull',
        title: 'Pull — Спина, бицепс',
        exercises: [
          { exerciseId: 'deadlift', exerciseName: 'Тяга штанги становая', sets: [{ reps: '5-6', weightKg: null }, { reps: '5-6', weightKg: null }, { reps: '5-6', weightKg: null }, { reps: '5-6', weightKg: null }], restSeconds: 150 },
          { exerciseId: 'pull-ups', exerciseName: 'Подтягивания широким хватом', sets: [{ reps: '8-10', weightKg: null }, { reps: '8-10', weightKg: null }, { reps: '8-10', weightKg: null }, { reps: '8-10', weightKg: null }], restSeconds: 100 },
          { exerciseId: 'bent-row', exerciseName: 'Тяга штанги в наклоне', sets: [{ reps: '8-10', weightKg: null }, { reps: '8-10', weightKg: null }, { reps: '8-10', weightKg: null }], restSeconds: 90 },
          { exerciseId: 'rear-delt-fly', exerciseName: 'Махи в наклоне на заднюю дельту', sets: [{ reps: '12-15', weightKg: null }, { reps: '12-15', weightKg: null }, { reps: '12-15', weightKg: null }], restSeconds: 60 },
          { exerciseId: 'barbell-curl', exerciseName: 'Подъём штанги на бицепс', sets: [{ reps: '8-10', weightKg: null }, { reps: '8-10', weightKg: null }, { reps: '8-10', weightKg: null }], restSeconds: 60 },
        ],
      },
      {
        id: 'legs',
        title: 'Legs — Ноги',
        exercises: [
          { exerciseId: 'squat', exerciseName: 'Приседания со штангой', sets: [{ reps: '5-6', weightKg: null }, { reps: '5-6', weightKg: null }, { reps: '5-6', weightKg: null }, { reps: '5-6', weightKg: null }, { reps: '5-6', weightKg: null }], restSeconds: 150 },
          { exerciseId: 'leg-press', exerciseName: 'Жим ногами в тренажёре', sets: [{ reps: '10-12', weightKg: null }, { reps: '10-12', weightKg: null }, { reps: '10-12', weightKg: null }, { reps: '10-12', weightKg: null }], restSeconds: 90 },
          { exerciseId: 'lunges', exerciseName: 'Выпады с гантелями', sets: [{ reps: '10-12', weightKg: null }, { reps: '10-12', weightKg: null }, { reps: '10-12', weightKg: null }], restSeconds: 75 },
          { exerciseId: 'leg-curl', exerciseName: 'Сгибание ног в тренажёре', sets: [{ reps: '10-12', weightKg: null }, { reps: '10-12', weightKg: null }, { reps: '10-12', weightKg: null }], restSeconds: 75 },
          { exerciseId: 'calf-raise', exerciseName: 'Подъём на носки стоя', sets: [{ reps: '15-20', weightKg: null }, { reps: '15-20', weightKg: null }, { reps: '15-20', weightKg: null }], restSeconds: 60 },
        ],
      },
    ],
  },
];

export function getProgramById(id: string): WorkoutProgram | undefined {
  return WORKOUT_PROGRAMS.find((p) => p.id === id);
}

export function isCustomProgramId(id: string): boolean {
  return id.startsWith('custom-');
}
