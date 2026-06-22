import type { FoodItem } from '@/types';

/**
 * Базовая база продуктов (БЖУ на 100 г).
 * Подобрана с упором на продукты для набора массы: крупы, мясо, молочка, орехи.
 * Пользователь может пополнять её через "Свой продукт".
 */
export const FOOD_DATABASE: FoodItem[] = [
  // Крупы и гарниры
  { id: 'rice-white', name: 'Рис белый, отварной', kcal: 130, proteinG: 2.7, fatG: 0.3, carbsG: 28, category: 'Крупы' },
  { id: 'rice-brown', name: 'Рис бурый, отварной', kcal: 111, proteinG: 2.6, fatG: 0.9, carbsG: 23, category: 'Крупы' },
  { id: 'buckwheat', name: 'Гречка, отварная', kcal: 110, proteinG: 4.2, fatG: 1.1, carbsG: 21.3, category: 'Крупы' },
  { id: 'oats', name: 'Овсянка на воде', kcal: 88, proteinG: 3, fatG: 1.7, carbsG: 15, category: 'Крупы' },
  { id: 'pasta', name: 'Макароны, отварные', kcal: 131, proteinG: 5.0, fatG: 1.1, carbsG: 25, category: 'Крупы' },
  { id: 'potato', name: 'Картофель отварной', kcal: 82, proteinG: 2.0, fatG: 0.4, carbsG: 16.7, category: 'Крупы' },
  { id: 'bread-white', name: 'Хлеб белый', kcal: 265, proteinG: 8.1, fatG: 3.2, carbsG: 49, category: 'Крупы' },
  { id: 'bread-whole', name: 'Хлеб цельнозерновой', kcal: 224, proteinG: 9.0, fatG: 3.3, carbsG: 41, category: 'Крупы' },

  // Мясо и птица
  { id: 'chicken-breast', name: 'Куриная грудка, отварная', kcal: 165, proteinG: 31, fatG: 3.6, carbsG: 0, category: 'Мясо' },
  { id: 'chicken-thigh', name: 'Куриное бедро, без кожи', kcal: 185, proteinG: 24, fatG: 9.6, carbsG: 0, category: 'Мясо' },
  { id: 'beef', name: 'Говядина, постная', kcal: 187, proteinG: 26, fatG: 9, carbsG: 0, category: 'Мясо' },
  { id: 'beef-mince', name: 'Фарш говяжий 15%', kcal: 218, proteinG: 18, fatG: 15, carbsG: 0, category: 'Мясо' },
  { id: 'pork', name: 'Свинина, постная', kcal: 242, proteinG: 19.4, fatG: 18, carbsG: 0, category: 'Мясо' },
  { id: 'turkey', name: 'Индейка, грудка', kcal: 149, proteinG: 29, fatG: 2, carbsG: 0, category: 'Мясо' },

  // Рыба
  { id: 'salmon', name: 'Лосось', kcal: 208, proteinG: 20, fatG: 13, carbsG: 0, category: 'Рыба' },
  { id: 'tuna', name: 'Тунец, консервы в собств. соку', kcal: 96, proteinG: 23, fatG: 1, carbsG: 0, category: 'Рыба' },
  { id: 'cod', name: 'Треска', kcal: 78, proteinG: 17.7, fatG: 0.7, carbsG: 0, category: 'Рыба' },

  // Молочные продукты
  { id: 'milk', name: 'Молоко 3.2%', kcal: 60, proteinG: 3.0, fatG: 3.2, carbsG: 4.7, category: 'Молочка' },
  { id: 'cottage-cheese', name: 'Творог 5%', kcal: 121, proteinG: 17, fatG: 5, carbsG: 1.8, category: 'Молочка' },
  { id: 'yogurt-greek', name: 'Йогурт греческий', kcal: 97, proteinG: 9, fatG: 5, carbsG: 3.6, category: 'Молочка' },
  { id: 'cheese-hard', name: 'Сыр твёрдый', kcal: 350, proteinG: 25, fatG: 27, carbsG: 0, category: 'Молочка' },
  { id: 'kefir', name: 'Кефир 2.5%', kcal: 53, proteinG: 3.0, fatG: 2.5, carbsG: 4.0, category: 'Молочка' },

  // Яйца
  { id: 'egg-whole', name: 'Яйцо куриное (1 шт ≈ 50г)', kcal: 157, proteinG: 12.7, fatG: 11.5, carbsG: 0.7, category: 'Яйца' },
  { id: 'egg-white', name: 'Яичный белок', kcal: 52, proteinG: 11, fatG: 0.2, carbsG: 0.7, category: 'Яйца' },

  // Орехи и масла
  { id: 'peanut-butter', name: 'Арахисовая паста', kcal: 588, proteinG: 25, fatG: 50, carbsG: 20, category: 'Орехи и масла' },
  { id: 'almonds', name: 'Миндаль', kcal: 579, proteinG: 21, fatG: 49, carbsG: 22, category: 'Орехи и масла' },
  { id: 'olive-oil', name: 'Оливковое масло', kcal: 884, proteinG: 0, fatG: 100, carbsG: 0, category: 'Орехи и масла' },
  { id: 'avocado', name: 'Авокадо', kcal: 160, proteinG: 2, fatG: 14.7, carbsG: 8.5, category: 'Орехи и масла' },

  // Фрукты и овощи
  { id: 'banana', name: 'Банан', kcal: 89, proteinG: 1.1, fatG: 0.3, carbsG: 23, category: 'Фрукты и овощи' },
  { id: 'apple', name: 'Яблоко', kcal: 52, proteinG: 0.3, fatG: 0.2, carbsG: 14, category: 'Фрукты и овощи' },
  { id: 'broccoli', name: 'Брокколи', kcal: 34, proteinG: 2.8, fatG: 0.4, carbsG: 7, category: 'Фрукты и овощи' },
  { id: 'cucumber', name: 'Огурец', kcal: 15, proteinG: 0.7, fatG: 0.1, carbsG: 3.6, category: 'Фрукты и овощи' },
  { id: 'tomato', name: 'Помидор', kcal: 18, proteinG: 0.9, fatG: 0.2, carbsG: 3.9, category: 'Фрукты и овощи' },

  // Спортивное питание
  { id: 'whey-protein', name: 'Сывороточный протеин (1 порция 30г)', kcal: 120, proteinG: 24, fatG: 1.5, carbsG: 3, category: 'Спортпит' },
  { id: 'mass-gainer', name: 'Гейнер (1 порция 100г)', kcal: 380, proteinG: 20, fatG: 4, carbsG: 65, category: 'Спортпит' },
  { id: 'creatine', name: 'Креатин (5г, без калорий)', kcal: 0, proteinG: 0, fatG: 0, carbsG: 0, category: 'Спортпит' },
];

export function searchFood(query: string): FoodItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return FOOD_DATABASE;
  return FOOD_DATABASE.filter((f) => f.name.toLowerCase().includes(q));
}

export function groupFoodByCategory(items: FoodItem[]): Record<string, FoodItem[]> {
  return items.reduce<Record<string, FoodItem[]>>((acc, item) => {
    (acc[item.category] ??= []).push(item);
    return acc;
  }, {});
}
