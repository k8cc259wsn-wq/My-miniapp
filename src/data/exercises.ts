import type { Exercise } from '@/types';

export const EXERCISES: Exercise[] = [
  // Грудь
  { id: 'bench-press', name: 'Жим штанги лежа', muscleGroup: 'chest', equipment: 'gym', technique: 'Лопатки сведены, штангу опускать к низу груди, локти под 45° к корпусу.' },
  { id: 'incline-db-press', name: 'Жим гантелей на наклонной скамье', muscleGroup: 'chest', equipment: 'gym', technique: 'Угол скамьи 30-45°, гантели опускать до уровня груди.' },
  { id: 'push-ups', name: 'Отжимания от пола', muscleGroup: 'chest', equipment: 'home', technique: 'Корпус прямой, локти вдоль корпуса, опускаться до угла 90° в локтях.' },
  { id: 'pec-deck', name: 'Сведения в тренажёре (Peck-Deck)', muscleGroup: 'chest', equipment: 'gym', technique: 'Лёгкая амплитуда без рывков, пик сокращения в конце движения.' },
  { id: 'dips', name: 'Отжимания на брусьях', muscleGroup: 'chest', equipment: 'gym', technique: 'Наклон корпуса вперёд для акцента на грудь, опускание до растяжения плеч.' },

  // Спина
  { id: 'deadlift', name: 'Тяга штанги становая', muscleGroup: 'back', equipment: 'gym', technique: 'Спина прямая, штанга близко к голеням, тянуть ногами и спиной одновременно.' },
  { id: 'pull-ups', name: 'Подтягивания широким хватом', muscleGroup: 'back', equipment: 'both', technique: 'Подбородок выше перекладины, контролируемое опускание без рывков.' },
  { id: 'bent-row', name: 'Тяга штанги в наклоне', muscleGroup: 'back', equipment: 'gym', technique: 'Корпус параллельно полу, тянуть к низу живота, лопатки сводить в конце.' },
  { id: 'lat-pulldown', name: 'Тяга верхнего блока', muscleGroup: 'back', equipment: 'gym', technique: 'Тянуть к верху груди, без раскачивания корпусом.' },
  { id: 'seated-row', name: 'Тяга нижнего блока сидя', muscleGroup: 'back', equipment: 'gym', technique: 'Спина прямая, тянуть к животу, локти прижаты к корпусу.' },

  // Ноги
  { id: 'squat', name: 'Приседания со штангой', muscleGroup: 'legs', equipment: 'gym', technique: 'Колени по направлению стоп, таз отводить назад, глубина — до параллели бедра с полом.' },
  { id: 'leg-press', name: 'Жим ногами в тренажёре', muscleGroup: 'legs', equipment: 'gym', technique: 'Стопы на ширине плеч, не разгибать колени полностью в верхней точке.' },
  { id: 'lunges', name: 'Выпады с гантелями', muscleGroup: 'legs', equipment: 'both', technique: 'Шаг вперёд, колено задней ноги почти касается пола, корпус вертикально.' },
  { id: 'leg-curl', name: 'Сгибание ног в тренажёре', muscleGroup: 'legs', equipment: 'gym', technique: 'Контролируемое движение, без отрыва таза от скамьи.' },
  { id: 'calf-raise', name: 'Подъём на носки стоя', muscleGroup: 'legs', equipment: 'both', technique: 'Полная амплитуда, пауза в верхней точке на 1 секунду.' },
  { id: 'bodyweight-squat', name: 'Приседания без веса', muscleGroup: 'legs', equipment: 'home', technique: 'Глубокий присед, пятки не отрываются от пола.' },

  // Плечи
  { id: 'ohp', name: 'Жим штанги стоя (армейский жим)', muscleGroup: 'shoulders', equipment: 'gym', technique: 'Штанга от уровня плеч строго вверх, без прогиба в пояснице.' },
  { id: 'lateral-raise', name: 'Махи гантелями в стороны', muscleGroup: 'shoulders', equipment: 'both', technique: 'Лёгкий вес, поднимать до уровня плеч, без рывков трапецией.' },
  { id: 'rear-delt-fly', name: 'Махи в наклоне на заднюю дельту', muscleGroup: 'shoulders', equipment: 'both', technique: 'Корпус параллельно полу, локти слегка согнуты, сведение лопаток.' },

  // Руки
  { id: 'barbell-curl', name: 'Подъём штанги на бицепс', muscleGroup: 'arms', equipment: 'gym', technique: 'Локти прижаты к корпусу, без раскачивания, полная амплитуда.' },
  { id: 'triceps-pushdown', name: 'Разгибание рук на блоке', muscleGroup: 'arms', equipment: 'gym', technique: 'Локти прижаты к корпусу, разгибание до конца без рывков.' },
  { id: 'hammer-curl', name: 'Молотки с гантелями', muscleGroup: 'arms', equipment: 'both', technique: 'Хват нейтральный, локти зафиксированы.' },
  { id: 'dips-triceps', name: 'Отжимания от скамьи на трицепс', muscleGroup: 'arms', equipment: 'home', technique: 'Корпус близко к скамье, локти направлены назад.' },

  // Пресс
  { id: 'plank', name: 'Планка', muscleGroup: 'abs', equipment: 'home', technique: 'Тело прямой линией от головы до пяток, не прогибать поясницу.' },
  { id: 'hanging-leg-raise', name: 'Подъём ног в висе', muscleGroup: 'abs', equipment: 'gym', technique: 'Подъём за счёт пресса, минимум раскачивания корпуса.' },
  { id: 'crunches', name: 'Скручивания', muscleGroup: 'abs', equipment: 'home', technique: 'Отрыв лопаток от пола за счёт пресса, без рывков шеей.' },

  // Фулбоди
  { id: 'burpee', name: 'Берпи', muscleGroup: 'fullbody', equipment: 'home', technique: 'Присед — упор лёжа — отжимание — прыжок вверх, в непрерывном темпе.' },
];

export function getExercisesByMuscle(group: Exercise['muscleGroup']): Exercise[] {
  return EXERCISES.filter((e) => e.muscleGroup === group);
}
