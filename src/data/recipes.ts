// FridgeChef - Recipe Database with 50+ recipes
// Each recipe includes nutritional info (КБЖУ) and portions

export interface Recipe {
  id: number;
  title: { ru: string; en: string };
  emoji: string;
  category: string;
  time_min: number;
  servings: number;
  ingredients: string[];
  grams: Record<string, number>; // ingredient -> grams
  steps: { ru: string[]; en: string[] };
  nutrition: {
    calories: number; // per serving
    protein: number;
    fat: number;
    carbs: number;
  };
  url?: string;
}

export const BASICS = ["вода", "масло", "перец", "сахар", "соль", "специи"];

export const SYNONYMS: Record<string, string[]> = {
  "яйца": ["яйцо", "яйца", "яиц", "яйки"],
  "молоко": ["молоко", "молока"],
  "мука": ["мука", "муки"],
  "картофель": ["картофель", "картошка", "картошки", "картофеля"],
  "лук": ["лук", "луковица", "репчатый лук", "лука"],
  "морковь": ["морковь", "морковка", "моркови"],
  "курица": ["курица", "куриное филе", "куриная грудка", "филе курицы", "курятина", "куриные бедра", "куриные ножки", "окорочка"],
  "рис": ["рис", "риса"],
  "макароны": ["макароны", "паста", "спагетти", "вермишель", "лапша"],
  "сыр": ["сыр", "сыра", "твердый сыр", "твёрдый сыр", "плавленый сыр"],
  "помидоры": ["помидор", "помидоры", "томат", "томаты", "помидоров"],
  "огурцы": ["огурец", "огурцы", "огурцов"],
  "сметана": ["сметана", "сметаны"],
  "творог": ["творог", "творога"],
  "гречка": ["гречка", "гречневая крупа", "греча", "гречки"],
  "фарш": ["фарш", "фарша", "мясной фарш", "говяжий фарш", "свиной фарш"],
  "капуста": ["капуста", "капусты", "белокочанная капуста"],
  "чеснок": ["чеснок", "чеснока"],
  "колбаса": ["колбаса", "колбасы", "сосиски", "сардельки"],
  "хлеб": ["хлеб", "хлеба", "батон", "тост", "тосты"],
  "тунец": ["тунец", "тунца", "консервированный тунец"],
  "кабачок": ["кабачок", "кабачки", "цукини"],
  "банан": ["банан", "бананы", "бананов"],
  "овсянка": ["овсянка", "овсяные хлопья", "геркулес", "овсянки"],
  "грибы": ["грибы", "шампиньоны", "грибов"],
  "масло сливочное": ["сливочное масло", "масло сливочное"],
  "майонез": ["майонез", "майонеза"],
  "фасоль": ["фасоль", "фасоли", "консервированная фасоль"],
  "кукуруза": ["кукуруза", "кукурузы", "консервированная кукуруза"],
  "зелень": ["зелень", "укроп", "петрушка", "кинза"],
  "свинина": ["свинина", "свиное мясо"],
  "говядина": ["говядина", "говяжье мясо"],
  "рыба": ["рыба", "филе рыбы", "рыбное филе"],
  "креветки": ["креветки", "креветок", "тигровые креветки"],
  "бекон": ["бекон", "бекона"],
  "яблоко": ["яблоко", "яблоки", "яблок"],
  "лимон": ["лимон", "лимона", "лимоны"],
  "мед": ["мед", "мёд", "меда"],
  "орехи": ["орехи", "грецкие орехи", "миндаль"],
  "шоколад": ["шоколад", "шоколада"],
  "ягоды": ["ягоды", "клубника", "малина", "черника"],
  "свёкла": ["свёкла", "свекла", "свеклы", "свёклы"],
  "перец болгарский": ["перец болгарский", "болгарский перец", "сладкий перец"],
  "баклажан": ["баклажан", "баклажаны"],
  "тыква": ["тыква", "тыквы"],
  "шпинат": ["шпинат", "шпината"],
  "авокадо": ["авокадо", "авокады"],
  "имбирь": ["имбирь", "имбиря"],
  "соевый соус": ["соевый соус", "соевого соуса"],
  "кефир": ["кефир", "кефира"],
  "дрожжевое тесто": ["тесто", "дрожжевое тесто", "слоёное тесто"],
  "лаващ": ["лаващ", "лаваш", "тортилья"],
  "круассаны": ["круассаны", "круассан"],
};

export const POPULAR_PRODUCTS = [
  "яйца", "молоко", "сыр", "курица", "картофель", "лук", "морковь",
  "помидоры", "огурцы", "рис", "макароны", "гречка", "фарш", "творог",
  "сметана", "хлеб", "капуста", "тунец", "грибы", "свинина",
  "банан", "яблоко", "кабачок", "свёкла", "перец болгарский",
  "авокадо", "кефир", "лаващ", "креветки", "бекон"
];

export const RECIPES: Recipe[] = [
  // === ЗАВТРАКИ ===
  {
    id: 1,
    title: { ru: "Омлет классический", en: "Classic Omelette" },
    emoji: "🍳",
    category: "breakfast",
    time_min: 10,
    servings: 1,
    ingredients: ["яйца", "молоко", "соль", "масло"],
    grams: { "яйца": 120, "молоко": 50, "соль": 2, "масло": 10 },
    steps: {
      ru: ["Взбейте яйца с молоком и солью.", "Вылейте на разогретую сковороду с маслом.", "Жарьте под крышкой на слабом огне 5 минут."],
      en: ["Beat eggs with milk and salt.", "Pour onto a heated oiled pan.", "Cook covered on low heat for 5 minutes."]
    },
    nutrition: { calories: 220, protein: 15, fat: 16, carbs: 4 }
  },
  {
    id: 2,
    title: { ru: "Омлет с сыром", en: "Cheese Omelette" },
    emoji: "🧀",
    category: "breakfast",
    time_min: 12,
    servings: 1,
    ingredients: ["яйца", "молоко", "сыр", "соль", "масло"],
    grams: { "яйца": 120, "молоко": 50, "сыр": 40, "соль": 2, "масло": 10 },
    steps: {
      ru: ["Взбейте яйца с молоком.", "Влейте на сковороду, посыпьте тёртым сыром.", "Готовьте под крышкой 5–6 минут."],
      en: ["Beat eggs with milk.", "Pour into pan, sprinkle with grated cheese.", "Cook covered for 5-6 minutes."]
    },
    nutrition: { calories: 320, protein: 22, fat: 24, carbs: 4 }
  },
  {
    id: 3,
    title: { ru: "Яичница с помидорами", en: "Tomato Scrambled Eggs" },
    emoji: "🍅",
    category: "breakfast",
    time_min: 10,
    servings: 1,
    ingredients: ["яйца", "помидоры", "лук", "соль", "масло"],
    grams: { "яйца": 120, "помидоры": 100, "лук": 30, "соль": 2, "масло": 10 },
    steps: {
      ru: ["Обжарьте нарезанный лук.", "Добавьте помидоры, тушите 3 минуты.", "Влейте яйца и жарьте до готовности."],
      en: ["Sauté chopped onion.", "Add tomatoes, cook 3 minutes.", "Pour in eggs and fry until done."]
    },
    nutrition: { calories: 200, protein: 13, fat: 14, carbs: 7 }
  },
  {
    id: 4,
    title: { ru: "Блины тонкие", en: "Thin Pancakes" },
    emoji: "🥞",
    category: "breakfast",
    time_min: 30,
    servings: 4,
    ingredients: ["молоко", "яйца", "мука", "сахар", "соль", "масло"],
    grams: { "молоко": 500, "яйца": 100, "мука": 200, "сахар": 30, "соль": 3, "масло": 30 },
    steps: {
      ru: ["Смешайте молоко, яйца, муку, сахар и соль в жидкое тесто.", "Жарьте тонкие блины с двух сторон."],
      en: ["Mix milk, eggs, flour, sugar and salt into thin batter.", "Fry thin pancakes on both sides."]
    },
    nutrition: { calories: 180, protein: 6, fat: 5, carbs: 28 }
  },
  {
    id: 5,
    title: { ru: "Сырники", en: "Cottage Cheese Pancakes" },
    emoji: "🧁",
    category: "breakfast",
    time_min: 25,
    servings: 3,
    ingredients: ["творог", "яйца", "мука", "сахар", "масло"],
    grams: { "творог": 400, "яйца": 50, "мука": 60, "сахар": 40, "масло": 30 },
    steps: {
      ru: ["Смешайте творог, яйцо, сахар и немного муки.", "Сформируйте лепёшки, обваляйте в муке.", "Обжарьте с двух сторон до золотистой корочки."],
      en: ["Mix cottage cheese, egg, sugar and some flour.", "Form patties, coat in flour.", "Fry on both sides until golden."]
    },
    nutrition: { calories: 210, protein: 16, fat: 9, carbs: 18 }
  },
  {
    id: 6,
    title: { ru: "Овсянка с бананом", en: "Oatmeal with Banana" },
    emoji: "🍌",
    category: "breakfast",
    time_min: 10,
    servings: 1,
    ingredients: ["овсянка", "молоко", "банан", "сахар"],
    grams: { "овсянка": 60, "молоко": 200, "банан": 100, "сахар": 10 },
    steps: {
      ru: ["Сварите овсянку на молоке.", "Добавьте нарезанный банан."],
      en: ["Cook oatmeal in milk.", "Add sliced banana."]
    },
    nutrition: { calories: 290, protein: 9, fat: 6, carbs: 52 }
  },
  {
    id: 7,
    title: { ru: "Французские тосты", en: "French Toast" },
    emoji: "🍞",
    category: "breakfast",
    time_min: 15,
    servings: 2,
    ingredients: ["хлеб", "яйца", "молоко", "сахар", "масло"],
    grams: { "хлеб": 120, "яйца": 60, "молоко": 60, "сахар": 15, "масло": 15 },
    steps: {
      ru: ["Взбейте яйца с молоком и сахаром.", "Обмакните хлеб и обжарьте с двух сторон."],
      en: ["Beat eggs with milk and sugar.", "Dip bread and fry on both sides."]
    },
    nutrition: { calories: 280, protein: 10, fat: 12, carbs: 32 }
  },
  {
    id: 8,
    title: { ru: "Яичница с беконом", en: "Bacon & Eggs" },
    emoji: "🥓",
    category: "breakfast",
    time_min: 12,
    servings: 1,
    ingredients: ["яйца", "бекон", "соль"],
    grams: { "яйца": 120, "бекон": 60, "соль": 1 },
    steps: {
      ru: ["Обжарьте бекон до хрустящей корочки.", "На том же жиру приготовьте яичницу.", "Посолите по вкусу."],
      en: ["Fry bacon until crispy.", "Cook eggs in the same fat.", "Season with salt."]
    },
    nutrition: { calories: 350, protein: 18, fat: 28, carbs: 2 }
  },

  // === СУПЫ ===
  {
    id: 9,
    title: { ru: "Куриный суп с лапшой", en: "Chicken Noodle Soup" },
    emoji: "🍜",
    category: "soup",
    time_min: 40,
    servings: 4,
    ingredients: ["курица", "макароны", "картофель", "морковь", "лук", "соль", "вода"],
    grams: { "курица": 400, "макароны": 100, "картофель": 200, "морковь": 80, "лук": 60, "соль": 8, "вода": 1500 },
    steps: {
      ru: ["Сварите бульон из курицы.", "Добавьте картофель, морковь, лук.", "За 5 минут до конца добавьте лапшу."],
      en: ["Cook chicken broth.", "Add potatoes, carrots, onion.", "Add noodles 5 minutes before done."]
    },
    nutrition: { calories: 180, protein: 18, fat: 5, carbs: 18 }
  },
  {
    id: 10,
    title: { ru: "Простые щи", en: "Simple Cabbage Soup" },
    emoji: "🥬",
    category: "soup",
    time_min: 45,
    servings: 4,
    ingredients: ["капуста", "картофель", "морковь", "лук", "соль", "вода", "масло"],
    grams: { "капуста": 300, "картофель": 200, "морковь": 80, "лук": 60, "соль": 8, "вода": 1500, "масло": 20 },
    steps: {
      ru: ["Доведите воду до кипения, добавьте картофель.", "Обжарьте лук и морковь, добавьте с капустой в кастрюлю.", "Варите до готовности капусты."],
      en: ["Bring water to boil, add potatoes.", "Sauté onion and carrots, add with cabbage to pot.", "Cook until cabbage is tender."]
    },
    nutrition: { calories: 90, protein: 3, fat: 3, carbs: 14 }
  },
  {
    id: 11,
    title: { ru: "Грибной суп-пюре", en: "Mushroom Cream Soup" },
    emoji: "🍄",
    category: "soup",
    time_min: 35,
    servings: 3,
    ingredients: ["грибы", "картофель", "лук", "морковь", "сливки", "масло", "соль", "вода"],
    grams: { "грибы": 300, "картофель": 200, "лук": 60, "морковь": 60, "масло": 20, "соль": 5, "вода": 800 },
    steps: {
      ru: ["Обжарьте лук и грибы.", "Добавьте картофель и воду, варите до мягкости.", "Пюрируйте блендером, посолите."],
      en: ["Sauté onion and mushrooms.", "Add potatoes and water, cook until tender.", "Blend until smooth, season."]
    },
    nutrition: { calories: 120, protein: 4, fat: 6, carbs: 14 }
  },
  {
    id: 12,
    title: { ru: "Борщ свекольный", en: "Beetroot Borscht" },
    emoji: "🫕",
    category: "soup",
    time_min: 60,
    servings: 4,
    ingredients: ["свёкла", "капуста", "картофель", "морковь", "лук", "помидоры", "масло", "соль", "вода"],
    grams: { "свёкла": 200, "капуста": 200, "картофель": 200, "морковь": 80, "лук": 60, "помидоры": 100, "масло": 20, "соль": 8, "вода": 1500 },
    steps: {
      ru: ["Натрите свёклу и обжарьте с томатом.", "Сварите бульон с картофелем и капустой.", "Добавьте зажарку, варите 15 минут."],
      en: ["Grate beets and sauté with tomato.", "Cook broth with potatoes and cabbage.", "Add sautéed mix, cook 15 minutes."]
    },
    nutrition: { calories: 100, protein: 3, fat: 3, carbs: 16 }
  },

  // === ОСНОВНЫЕ БЛЮДА ===
  {
    id: 13,
    title: { ru: "Жареный рис с яйцом", en: "Fried Rice with Egg" },
    emoji: "🍚",
    category: "main",
    time_min: 20,
    servings: 2,
    ingredients: ["рис", "яйца", "морковь", "лук", "соль", "масло", "специи"],
    grams: { "рис": 200, "яйца": 100, "морковь": 80, "лук": 60, "соль": 4, "масло": 20, "специи": 3 },
    steps: {
      ru: ["Отварите рис.", "Обжарьте лук и морковь, добавьте рис.", "Вмешайте яйца и прогрейте до готовности."],
      en: ["Cook rice.", "Sauté onion and carrots, add rice.", "Mix in eggs and heat through."]
    },
    nutrition: { calories: 310, protein: 10, fat: 9, carbs: 48 }
  },
  {
    id: 14,
    title: { ru: "Макароны с сыром", en: "Mac & Cheese" },
    emoji: "🧀",
    category: "main",
    time_min: 15,
    servings: 2,
    ingredients: ["макароны", "сыр", "соль", "вода"],
    grams: { "макароны": 200, "сыр": 80, "соль": 4, "вода": 1000 },
    steps: {
      ru: ["Отварите макароны.", "Смешайте с тёртым сыром, пока горячие."],
      en: ["Cook pasta.", "Mix with grated cheese while hot."]
    },
    nutrition: { calories: 380, protein: 16, fat: 12, carbs: 52 }
  },
  {
    id: 15,
    title: { ru: "Паста с тунцом и помидорами", en: "Tuna Tomato Pasta" },
    emoji: "🍝",
    category: "main",
    time_min: 20,
    servings: 2,
    ingredients: ["макароны", "тунец", "помидоры", "чеснок", "соль", "масло"],
    grams: { "макароны": 200, "тунец": 150, "помидоры": 200, "чеснок": 10, "соль": 4, "масло": 20 },
    steps: {
      ru: ["Отварите пасту.", "Обжарьте чеснок, добавьте помидоры и тунец.", "Смешайте с пастой."],
      en: ["Cook pasta.", "Sauté garlic, add tomatoes and tuna.", "Mix with pasta."]
    },
    nutrition: { calories: 350, protein: 24, fat: 8, carbs: 44 }
  },
  {
    id: 16,
    title: { ru: "Курица с рисом", en: "Chicken with Rice" },
    emoji: "🍗",
    category: "main",
    time_min: 40,
    servings: 3,
    ingredients: ["курица", "рис", "лук", "морковь", "соль", "масло", "специи", "вода"],
    grams: { "курица": 500, "рис": 200, "лук": 80, "морковь": 80, "соль": 6, "масло": 20, "специи": 5, "вода": 400 },
    steps: {
      ru: ["Обжарьте кусочки курицы с луком и морковью.", "Добавьте рис и воду (в 2 раза больше риса).", "Тушите под крышкой до готовности риса."],
      en: ["Sauté chicken pieces with onion and carrots.", "Add rice and water (2x rice amount).", "Simmer covered until rice is done."]
    },
    nutrition: { calories: 320, protein: 26, fat: 10, carbs: 32 }
  },
  {
    id: 17,
    title: { ru: "Драники", en: "Potato Pancakes" },
    emoji: "🥔",
    category: "main",
    time_min: 30,
    servings: 3,
    ingredients: ["картофель", "яйца", "лук", "мука", "соль", "масло"],
    grams: { "картофель": 500, "яйца": 50, "лук": 60, "мука": 40, "соль": 5, "масло": 40 },
    steps: {
      ru: ["Натрите картофель и лук, слейте лишнюю жидкость.", "Добавьте яйцо, муку, соль.", "Жарьте оладьи с двух сторон."],
      en: ["Grate potatoes and onion, drain excess liquid.", "Add egg, flour, salt.", "Fry patties on both sides."]
    },
    nutrition: { calories: 220, protein: 5, fat: 10, carbs: 28 }
  },
  {
    id: 18,
    title: { ru: "Жареная картошка с луком", en: "Fried Potatoes" },
    emoji: "🍟",
    category: "main",
    time_min: 25,
    servings: 2,
    ingredients: ["картофель", "лук", "соль", "масло"],
    grams: { "картофель": 500, "лук": 100, "соль": 5, "масло": 30 },
    steps: {
      ru: ["Нарежьте картофель брусочками, лук полукольцами.", "Жарьте на среднем огне до румяности, добавив лук в конце."],
      en: ["Cut potatoes into sticks, onion into half-rings.", "Fry on medium heat until golden, adding onion at the end."]
    },
    nutrition: { calories: 250, protein: 4, fat: 10, carbs: 36 }
  },
  {
    id: 19,
    title: { ru: "Гречка с грибами", en: "Buckwheat with Mushrooms" },
    emoji: "🫘",
    category: "main",
    time_min: 30,
    servings: 2,
    ingredients: ["гречка", "грибы", "лук", "соль", "масло", "вода"],
    grams: { "гречка": 150, "грибы": 200, "лук": 60, "соль": 4, "масло": 20, "вода": 300 },
    steps: {
      ru: ["Отварите гречку.", "Обжарьте лук с грибами.", "Смешайте с гречкой."],
      en: ["Cook buckwheat.", "Sauté onion with mushrooms.", "Mix with buckwheat."]
    },
    nutrition: { calories: 200, protein: 8, fat: 7, carbs: 28 }
  },
  {
    id: 20,
    title: { ru: "Гречка по-флотски", en: "Buckwheat with Minced Meat" },
    emoji: "🥘",
    category: "main",
    time_min: 35,
    servings: 3,
    ingredients: ["гречка", "фарш", "лук", "морковь", "соль", "масло", "вода"],
    grams: { "гречка": 200, "фарш": 300, "лук": 80, "морковь": 80, "соль": 6, "масло": 20, "вода": 400 },
    steps: {
      ru: ["Обжарьте лук, морковь и фарш.", "Добавьте промытую гречку и воду.", "Тушите под крышкой до готовности."],
      en: ["Sauté onion, carrots and minced meat.", "Add washed buckwheat and water.", "Simmer covered until done."]
    },
    nutrition: { calories: 280, protein: 18, fat: 12, carbs: 26 }
  },
  {
    id: 21,
    title: { ru: "Овощное рагу", en: "Vegetable Stew" },
    emoji: "🥗",
    category: "main",
    time_min: 40,
    servings: 4,
    ingredients: ["кабачок", "картофель", "морковь", "лук", "помидоры", "соль", "масло", "специи"],
    grams: { "кабачок": 300, "картофель": 300, "морковь": 100, "лук": 80, "помидоры": 200, "соль": 6, "масло": 20, "специи": 5 },
    steps: {
      ru: ["Обжарьте лук и морковь.", "Добавьте картофель, кабачок, помидоры.", "Тушите под крышкой до мягкости овощей."],
      en: ["Sauté onion and carrots.", "Add potatoes, zucchini, tomatoes.", "Simmer covered until vegetables are tender."]
    },
    nutrition: { calories: 120, protein: 3, fat: 4, carbs: 20 }
  },
  {
    id: 22,
    title: { ru: "Курица с картошкой в духовке", en: "Baked Chicken & Potatoes" },
    emoji: "🍖",
    category: "main",
    time_min: 60,
    servings: 4,
    ingredients: ["курица", "картофель", "чеснок", "соль", "специи", "масло"],
    grams: { "курица": 800, "картофель": 600, "чеснок": 15, "соль": 8, "специи": 5, "масло": 30 },
    steps: {
      ru: ["Смешайте курицу и картофель с чесноком, специями и маслом.", "Запекайте при 190°C около 45 минут."],
      en: ["Mix chicken and potatoes with garlic, spices and oil.", "Bake at 190°C for about 45 minutes."]
    },
    nutrition: { calories: 340, protein: 28, fat: 14, carbs: 26 }
  },
  {
    id: 23,
    title: { ru: "Пельмени жареные", en: "Fried Dumplings" },
    emoji: "🥟",
    category: "main",
    time_min: 20,
    servings: 2,
    ingredients: ["пельмени", "масло", "лук", "соль", "сметана"],
    grams: { "пельмени": 400, "масло": 30, "лук": 80, "соль": 3, "сметана": 60 },
    steps: {
      ru: ["Обжарьте лук до золотистости.", "Добавьте пельмени, жарьте до румяной корочки.", "Подавайте со сметаной."],
      en: ["Sauté onion until golden.", "Add dumplings, fry until crispy.", "Serve with sour cream."]
    },
    nutrition: { calories: 350, protein: 14, fat: 18, carbs: 34 }
  },
  {
    id: 24,
    title: { ru: "Паста Карбонара", en: "Pasta Carbonara" },
    emoji: "🍝",
    category: "main",
    time_min: 25,
    servings: 2,
    ingredients: ["макароны", "бекон", "яйца", "сыр", "чеснок", "соль", "перец"],
    grams: { "макароны": 200, "бекон": 100, "яйца": 80, "сыр": 50, "чеснок": 5, "соль": 3, "перец": 2 },
    steps: {
      ru: ["Отварите пасту аль денте.", "Обжарьте бекон с чесноком.", "Смешайте яйца с тёртым сыром, добавьте к пасте с беконом."],
      en: ["Cook pasta al dente.", "Fry bacon with garlic.", "Mix eggs with grated cheese, add to pasta with bacon."]
    },
    nutrition: { calories: 420, protein: 20, fat: 18, carbs: 44 }
  },
  {
    id: 25,
    title: { ru: "Куриные котлеты", en: "Chicken Cutlets" },
    emoji: "🍗",
    category: "main",
    time_min: 35,
    servings: 4,
    ingredients: ["курица", "лук", "яйца", "хлеб", "молоко", "соль", "масло", "специи"],
    grams: { "курица": 500, "лук": 80, "яйца": 50, "хлеб": 60, "молоко": 50, "соль": 5, "масло": 30, "специи": 3 },
    steps: {
      ru: ["Пропустите курицу и лук через мясорубку.", "Добавьте размоченный хлеб, яйцо, специи.", "Сформируйте котлеты и обжарьте с двух сторон."],
      en: ["Mince chicken and onion.", "Add soaked bread, egg, spices.", "Form cutlets and fry on both sides."]
    },
    nutrition: { calories: 220, protein: 24, fat: 10, carbs: 8 }
  },
  {
    id: 26,
    title: { ru: "Тефтели в томатном соусе", en: "Meatballs in Tomato Sauce" },
    emoji: "🧆",
    category: "main",
    time_min: 45,
    servings: 4,
    ingredients: ["фарш", "рис", "лук", "яйца", "помидоры", "морковь", "соль", "масло", "специи"],
    grams: { "фарш": 400, "рис": 60, "лук": 80, "яйца": 50, "помидоры": 300, "морковь": 80, "соль": 6, "масло": 20, "специи": 5 },
    steps: {
      ru: ["Смешайте фарш с варёным рисом, луком и яйцом.", "Сформируйте тефтели.", "Обжарьте, залейте томатным соусом и тушите 25 минут."],
      en: ["Mix minced meat with cooked rice, onion and egg.", "Form meatballs.", "Sear, pour tomato sauce and simmer 25 minutes."]
    },
    nutrition: { calories: 260, protein: 20, fat: 12, carbs: 18 }
  },
  {
    id: 27,
    title: { ru: "Шашлык из курицы", en: "Chicken Skewers" },
    emoji: "🍢",
    category: "main",
    time_min: 40,
    servings: 3,
    ingredients: ["курица", "лук", "помидоры", "соль", "специи", "масло"],
    grams: { "курица": 600, "лук": 150, "помидоры": 200, "соль": 6, "специи": 5, "масло": 20 },
    steps: {
      ru: ["Нарежьте курицу кусочками, замаринуйте с луком и специями.", "Нанижите на шампуры с овощами.", "Жарьте на гриле или в духовке 20 минут."],
      en: ["Cut chicken into pieces, marinate with onion and spices.", "Thread onto skewers with vegetables.", "Grill or bake for 20 minutes."]
    },
    nutrition: { calories: 200, protein: 26, fat: 8, carbs: 6 }
  },

  // === САЛАТЫ ===
  {
    id: 28,
    title: { ru: "Огурцы со сметаной", en: "Cucumber & Sour Cream Salad" },
    emoji: "🥒",
    category: "salad",
    time_min: 5,
    servings: 2,
    ingredients: ["огурцы", "сметана", "соль", "зелень"],
    grams: { "огурцы": 300, "сметана": 60, "соль": 3, "зелень": 10 },
    steps: {
      ru: ["Нарежьте огурцы, добавьте зелень.", "Заправьте сметаной и посолите."],
      en: ["Slice cucumbers, add herbs.", "Dress with sour cream and salt."]
    },
    nutrition: { calories: 60, protein: 2, fat: 4, carbs: 5 }
  },
  {
    id: 29,
    title: { ru: "Капустный салат с морковью", en: "Cabbage & Carrot Salad" },
    emoji: "🥕",
    category: "salad",
    time_min: 10,
    servings: 3,
    ingredients: ["капуста", "морковь", "соль", "масло", "сахар"],
    grams: { "капуста": 300, "морковь": 100, "соль": 4, "масло": 20, "сахар": 5 },
    steps: {
      ru: ["Нашинкуйте капусту, посолите и разомните.", "Добавьте тёртую морковь и масло."],
      en: ["Shred cabbage, salt and knead.", "Add grated carrot and oil."]
    },
    nutrition: { calories: 80, protein: 2, fat: 5, carbs: 8 }
  },
  {
    id: 30,
    title: { ru: "Салат Цезарь упрощённый", en: "Simple Caesar Salad" },
    emoji: "🥗",
    category: "salad",
    time_min: 15,
    servings: 2,
    ingredients: ["курица", "салат", "хлеб", "сыр", "майонез", "чеснок", "масло"],
    grams: { "курица": 200, "салат": 150, "хлеб": 60, "сыр": 30, "майонез": 30, "чеснок": 5, "масло": 15 },
    steps: {
      ru: ["Обжарьте курицу кусочками.", "Нарежьте хлеб кубиками и подсушите.", "Смешайте салат, курицу, сухарики, сыр и заправку."],
      en: ["Fry chicken pieces.", "Cut bread into cubes and toast.", "Mix lettuce, chicken, croutons, cheese and dressing."]
    },
    nutrition: { calories: 320, protein: 24, fat: 18, carbs: 14 }
  },
  {
    id: 31,
    title: { ru: "Салат с тунцом", en: "Tuna Salad" },
    emoji: "🐟",
    category: "salad",
    time_min: 10,
    servings: 2,
    ingredients: ["тунец", "яйца", "огурцы", "лук", "майонез", "соль"],
    grams: { "тунец": 150, "яйца": 100, "огурцы": 100, "лук": 30, "майонез": 30, "соль": 3 },
    steps: {
      ru: ["Отварите яйца.", "Нарежьте все ингредиенты.", "Смешайте с майонезом."],
      en: ["Boil eggs.", "Chop all ingredients.", "Mix with mayonnaise."]
    },
    nutrition: { calories: 220, protein: 20, fat: 14, carbs: 4 }
  },
  {
    id: 32,
    title: { ru: "Греческий салат", en: "Greek Salad" },
    emoji: "🫒",
    category: "salad",
    time_min: 10,
    servings: 2,
    ingredients: ["помидоры", "огурцы", "перец болгарский", "лук", "сыр", "масло", "соль"],
    grams: { "помидоры": 200, "огурцы": 150, "перец болгарский": 100, "лук": 40, "сыр": 80, "масло": 20, "соль": 3 },
    steps: {
      ru: ["Нарежьте овощи крупными кусками.", "Добавьте кубики сыра.", "Заправьте маслом и посолите."],
      en: ["Cut vegetables into large pieces.", "Add cheese cubes.", "Dress with oil and salt."]
    },
    nutrition: { calories: 180, protein: 8, fat: 12, carbs: 12 }
  },

  // === БУТЕРБРОДЫ И СНЕКИ ===
  {
    id: 33,
    title: { ru: "Горячие бутерброды с сыром", en: "Hot Cheese Sandwiches" },
    emoji: "🥪",
    category: "snack",
    time_min: 10,
    servings: 2,
    ingredients: ["хлеб", "сыр", "колбаса"],
    grams: { "хлеб": 120, "сыр": 60, "колбаса": 60 },
    steps: {
      ru: ["Выложите на хлеб колбасу и сыр.", "Запеките в духовке или микроволновке до расплавления сыра."],
      en: ["Place sausage and cheese on bread.", "Bake in oven or microwave until cheese melts."]
    },
    nutrition: { calories: 280, protein: 14, fat: 14, carbs: 24 }
  },
  {
    id: 34,
    title: { ru: "Бутерброды с тунцом", en: "Tuna Sandwiches" },
    emoji: "🥖",
    category: "snack",
    time_min: 10,
    servings: 2,
    ingredients: ["хлеб", "тунец", "майонез", "огурцы"],
    grams: { "хлеб": 120, "тунец": 120, "майонез": 20, "огурцы": 60 },
    steps: {
      ru: ["Разомните тунец с майонезом.", "Намажьте на хлеб, добавьте ломтики огурца."],
      en: ["Mash tuna with mayonnaise.", "Spread on bread, add cucumber slices."]
    },
    nutrition: { calories: 240, protein: 16, fat: 10, carbs: 20 }
  },
  {
    id: 35,
    title: { ru: "Шаурма домашняя", en: "Homemade Shawarma" },
    emoji: "🌯",
    category: "snack",
    time_min: 20,
    servings: 2,
    ingredients: ["лаващ", "курица", "помидоры", "огурцы", "капуста", "майонез", "соль", "специи", "масло"],
    grams: { "лаващ": 200, "курица": 300, "помидоры": 100, "огурцы": 100, "капуста": 80, "майонез": 40, "соль": 3, "специи": 5, "масло": 15 },
    steps: {
      ru: ["Обжарьте курицу со специями.", "Нарежьте овощи.", "Выложите начинку на лаваш, сверните и обжарьте."],
      en: ["Fry chicken with spices.", "Chop vegetables.", "Place filling on lavash, roll and grill."]
    },
    nutrition: { calories: 380, protein: 26, fat: 16, carbs: 32 }
  },
  {
    id: 36,
    title: { ru: "Круассаны с ветчиной и сыром", en: "Ham & Cheese Croissants" },
    emoji: "🥐",
    category: "snack",
    time_min: 15,
    servings: 2,
    ingredients: ["круассаны", "колбаса", "сыр"],
    grams: { "круассаны": 120, "колбаса": 60, "сыр": 40 },
    steps: {
      ru: ["Разрежьте круассаны пополам.", "Выложите ветчину и сыр.", "Запекайте 5-7 минут при 180°C."],
      en: ["Cut croissants in half.", "Add ham and cheese.", "Bake 5-7 minutes at 180°C."]
    },
    nutrition: { calories: 340, protein: 14, fat: 20, carbs: 26 }
  },

  // === ДЕСЕРТЫ ===
  {
    id: 37,
    title: { ru: "Банановый смузи", en: "Banana Smoothie" },
    emoji: "🥤",
    category: "dessert",
    time_min: 5,
    servings: 1,
    ingredients: ["банан", "молоко", "мед", "овсянка"],
    grams: { "банан": 120, "молоко": 200, "мед": 15, "овсянка": 20 },
    steps: {
      ru: ["Поместите все ингредиенты в блендер.", "Взбейте до однородности."],
      en: ["Place all ingredients in blender.", "Blend until smooth."]
    },
    nutrition: { calories: 250, protein: 8, fat: 5, carbs: 46 }
  },
  {
    id: 38,
    title: { ru: "Яблоко в меду с орехами", en: "Honey Baked Apple" },
    emoji: "🍎",
    category: "dessert",
    time_min: 25,
    servings: 1,
    ingredients: ["яблоко", "мед", "орехи", "сахар"],
    grams: { "яблоко": 200, "мед": 20, "орехи": 20, "сахар": 10 },
    steps: {
      ru: ["Вырежьте сердцевину яблока.", "Наполните мёдом и орехами.", "Запекайте 20 минут при 180°C."],
      en: ["Core the apple.", "Fill with honey and nuts.", "Bake 20 minutes at 180°C."]
    },
    nutrition: { calories: 200, protein: 3, fat: 8, carbs: 32 }
  },
  {
    id: 39,
    title: { ru: "Творожный мусс", en: "Cottage Cheese Mousse" },
    emoji: "🍮",
    category: "dessert",
    time_min: 10,
    servings: 2,
    ingredients: ["творог", "сметана", "сахар", "банан"],
    grams: { "творог": 200, "сметана": 60, "сахар": 30, "банан": 100 },
    steps: {
      ru: ["Взбейте творог со сметаной и сахаром.", "Добавьте нарезанный банан.", "Перемешайте и охладите."],
      en: ["Whip cottage cheese with sour cream and sugar.", "Add sliced banana.", "Mix and chill."]
    },
    nutrition: { calories: 180, protein: 12, fat: 8, carbs: 18 }
  },
  {
    id: 40,
    title: { ru: "Шоколадный фондю", en: "Chocolate Fondue" },
    emoji: "🍫",
    category: "dessert",
    time_min: 15,
    servings: 3,
    ingredients: ["шоколад", "молоко", "банан", "яблоко"],
    grams: { "шоколад": 150, "молоко": 60, "банан": 100, "яблоко": 150 },
    steps: {
      ru: ["Растопите шоколад с молоком.", "Нарежьте фрукты.", "Макайте фрукты в шоколад."],
      en: ["Melt chocolate with milk.", "Cut fruits.", "Dip fruits in chocolate."]
    },
    nutrition: { calories: 280, protein: 5, fat: 14, carbs: 36 }
  },

  // === ДОПОЛНИТЕЛЬНЫЕ БЛЮДА ===
  {
    id: 41,
    title: { ru: "Фасолевый салат", en: "Bean Salad" },
    emoji: "🫘",
    category: "salad",
    time_min: 10,
    servings: 3,
    ingredients: ["фасоль", "кукуруза", "лук", "майонез"],
    grams: { "фасоль": 200, "кукуруза": 150, "лук": 40, "майонез": 30 },
    steps: {
      ru: ["Слейте жидкость с фасоли и кукурузы.", "Смешайте с нарезанным луком и заправьте майонезом."],
      en: ["Drain beans and corn.", "Mix with chopped onion and dress with mayo."]
    },
    nutrition: { calories: 160, protein: 8, fat: 6, carbs: 20 }
  },
  {
    id: 42,
    title: { ru: "Ленивые голубцы", en: "Lazy Cabbage Rolls" },
    emoji: "🥬",
    category: "main",
    time_min: 50,
    servings: 4,
    ingredients: ["капуста", "фарш", "рис", "морковь", "лук", "помидоры", "сметана", "соль", "масло"],
    grams: { "капуста": 400, "фарш": 300, "рис": 80, "морковь": 80, "лук": 60, "помидоры": 200, "сметана": 100, "соль": 6, "масло": 20 },
    steps: {
      ru: ["Смешайте фарш, рис, нашинкованную капусту и лук.", "Сформируйте котлеты, выложите в форму.", "Залейте сметанно-томатным соусом, запекайте 40 минут."],
      en: ["Mix minced meat, rice, shredded cabbage and onion.", "Form patties in baking dish.", "Pour sour cream-tomato sauce, bake 40 minutes."]
    },
    nutrition: { calories: 240, protein: 16, fat: 12, carbs: 18 }
  },
  {
    id: 43,
    title: { ru: "Картофельная запеканка", en: "Potato Casserole" },
    emoji: "🥧",
    category: "main",
    time_min: 50,
    servings: 4,
    ingredients: ["картофель", "фарш", "лук", "яйца", "сыр", "молоко", "соль", "масло"],
    grams: { "картофель": 600, "фарш": 300, "лук": 80, "яйца": 50, "сыр": 60, "молоко": 80, "соль": 6, "масло": 20 },
    steps: {
      ru: ["Сварите и разомните картофель с молоком.", "Обжарьте фарш с луком.", "Выложите слоями: картофель, фарш, сыр. Запекайте 25 минут."],
      en: ["Boil and mash potatoes with milk.", "Sauté minced meat with onion.", "Layer: potatoes, meat, cheese. Bake 25 minutes."]
    },
    nutrition: { calories: 300, protein: 18, fat: 14, carbs: 28 }
  },
  {
    id: 44,
    title: { ru: "Оладьи на кефире", en: "Kefir Pancakes" },
    emoji: "🥞",
    category: "breakfast",
    time_min: 25,
    servings: 4,
    ingredients: ["кефир", "яйца", "мука", "сахар", "соль", "масло"],
    grams: { "кефир": 300, "яйца": 50, "мука": 200, "сахар": 30, "соль": 3, "масло": 20 },
    steps: {
      ru: ["Смешайте кефир с яйцом, сахаром и солью.", "Добавьте муку до консистенции густой сметаны.", "Жарьте оладьи с двух сторон."],
      en: ["Mix kefir with egg, sugar and salt.", "Add flour to thick cream consistency.", "Fry pancakes on both sides."]
    },
    nutrition: { calories: 200, protein: 7, fat: 5, carbs: 32 }
  },
  {
    id: 45,
    title: { ru: "Ризотто с грибами", en: "Mushroom Risotto" },
    emoji: "🍚",
    category: "main",
    time_min: 40,
    servings: 3,
    ingredients: ["рис", "грибы", "лук", "сыр", "масло", "масло сливочное", "соль", "вода"],
    grams: { "рис": 200, "грибы": 250, "лук": 80, "сыр": 50, "масло": 20, "масло сливочное": 30, "соль": 5, "вода": 600 },
    steps: {
      ru: ["Обжарьте лук, добавьте грибы и рис.", "Постепенно добавляйте воду, помешивая.", "В конце добавьте масло и тёртый сыр."],
      en: ["Sauté onion, add mushrooms and rice.", "Gradually add water, stirring.", "Finish with butter and grated cheese."]
    },
    nutrition: { calories: 280, protein: 10, fat: 12, carbs: 34 }
  },
  {
    id: 46,
    title: { ru: "Свинина с овощами", en: "Pork with Vegetables" },
    emoji: "🥩",
    category: "main",
    time_min: 45,
    servings: 3,
    ingredients: ["свинина", "картофель", "морковь", "лук", "чеснок", "соль", "специи", "масло"],
    grams: { "свинина": 400, "картофель": 300, "морковь": 100, "лук": 80, "чеснок": 10, "соль": 6, "специи": 5, "масло": 20 },
    steps: {
      ru: ["Нарежьте свинину и обжарьте.", "Добавьте овощи и чеснок.", "Тушите под крышкой 30 минут."],
      en: ["Cut and sear pork.", "Add vegetables and garlic.", "Simmer covered for 30 minutes."]
    },
    nutrition: { calories: 320, protein: 24, fat: 18, carbs: 16 }
  },
  {
    id: 47,
    title: { ru: "Паста с грибами в сливках", en: "Creamy Mushroom Pasta" },
    emoji: "🍝",
    category: "main",
    time_min: 25,
    servings: 2,
    ingredients: ["макароны", "грибы", "лук", "чеснок", "сметана", "сыр", "соль", "масло"],
    grams: { "макароны": 200, "грибы": 200, "лук": 60, "чеснок": 5, "сметана": 100, "сыр": 40, "соль": 4, "масло": 15 },
    steps: {
      ru: ["Отварите пасту.", "Обжарьте грибы с луком и чесноком.", "Добавьте сметану, сыр и пасту, перемешайте."],
      en: ["Cook pasta.", "Sauté mushrooms with onion and garlic.", "Add sour cream, cheese and pasta, stir."]
    },
    nutrition: { calories: 360, protein: 14, fat: 14, carbs: 44 }
  },
  {
    id: 48,
    title: { ru: "Куриный салат с авокадо", en: "Chicken Avocado Salad" },
    emoji: "🥑",
    category: "salad",
    time_min: 20,
    servings: 2,
    ingredients: ["курица", "авокадо", "помидоры", "лук", "масло", "соль", "лимон"],
    grams: { "курица": 200, "авокадо": 150, "помидоры": 100, "лук": 30, "масло": 15, "соль": 3, "лимон": 20 },
    steps: {
      ru: ["Обжарьте или отварите курицу, нарежьте.", "Нарежьте авокадо и помидоры.", "Смешайте, заправьте маслом и лимонным соком."],
      en: ["Cook chicken and slice.", "Cut avocado and tomatoes.", "Mix, dress with oil and lemon juice."]
    },
    nutrition: { calories: 280, protein: 22, fat: 18, carbs: 8 }
  },
  {
    id: 49,
    title: { ru: "Суп с фрикадельками", en: "Meatball Soup" },
    emoji: "🍲",
    category: "soup",
    time_min: 35,
    servings: 4,
    ingredients: ["фарш", "картофель", "морковь", "лук", "рис", "соль", "специи", "вода", "масло"],
    grams: { "фарш": 300, "картофель": 200, "морковь": 80, "лук": 60, "рис": 40, "соль": 6, "специи": 4, "вода": 1200, "масло": 15 },
    steps: {
      ru: ["Сформируйте маленькие фрикадельки из фарша.", "Доведите воду до кипения, добавьте фрикадельки и картофель.", "Добавьте зажарку из лука и моркови, рис. Варите 15 минут."],
      en: ["Form small meatballs from minced meat.", "Boil water, add meatballs and potatoes.", "Add sautéed onion and carrots, rice. Cook 15 minutes."]
    },
    nutrition: { calories: 160, protein: 14, fat: 7, carbs: 12 }
  },
  {
    id: 50,
    title: { ru: "Баклажаны с помидорами", en: "Eggplant with Tomatoes" },
    emoji: "🍆",
    category: "main",
    time_min: 35,
    servings: 3,
    ingredients: ["баклажан", "помидоры", "чеснок", "лук", "сыр", "масло", "соль", "специи"],
    grams: { "баклажан": 400, "помидоры": 200, "чеснок": 10, "лук": 60, "сыр": 60, "масло": 25, "соль": 5, "специи": 4 },
    steps: {
      ru: ["Нарежьте баклажаны кружочками, обжарьте.", "Выложите слоями с помидорами и чесноком.", "Посыпьте сыром, запекайте 15 минут при 180°C."],
      en: ["Slice eggplants, fry.", "Layer with tomatoes and garlic.", "Top with cheese, bake 15 min at 180°C."]
    },
    nutrition: { calories: 160, protein: 6, fat: 10, carbs: 14 }
  },
  {
    id: 51,
    title: { ru: "Тыквенный суп-пюре", en: "Pumpkin Cream Soup" },
    emoji: "🎃",
    category: "soup",
    time_min: 40,
    servings: 4,
    ingredients: ["тыква", "картофель", "морковь", "лук", "масло", "соль", "специи", "вода"],
    grams: { "тыква": 500, "картофель": 150, "морковь": 80, "лук": 60, "масло": 20, "соль": 5, "специи": 4, "вода": 800 },
    steps: {
      ru: ["Нарежьте тыкву и овощи кубиками.", "Обжарьте лук, добавьте все овощи и воду.", "Варите до мягкости, пюрируйте блендером."],
      en: ["Dice pumpkin and vegetables.", "Sauté onion, add all vegetables and water.", "Cook until tender, blend until smooth."]
    },
    nutrition: { calories: 100, protein: 2, fat: 4, carbs: 16 }
  },
  {
    id: 52,
    title: { ru: "Креветки с чесноком", en: "Garlic Shrimp" },
    emoji: "🦐",
    category: "main",
    time_min: 15,
    servings: 2,
    ingredients: ["креветки", "чеснок", "масло", "лимон", "соль", "перец"],
    grams: { "креветки": 300, "чеснок": 15, "масло": 20, "лимон": 20, "соль": 3, "перец": 2 },
    steps: {
      ru: ["Обжарьте чеснок в масле.", "Добавьте креветки, жарьте 3-4 минуты.", "Полейте лимонным соком."],
      en: ["Sauté garlic in oil.", "Add shrimp, cook 3-4 minutes.", "Squeeze lemon juice on top."]
    },
    nutrition: { calories: 180, protein: 24, fat: 8, carbs: 2 }
  },
  {
    id: 53,
    title: { ru: "Шпинатный омлет", en: "Spinach Omelette" },
    emoji: "🥬",
    category: "breakfast",
    time_min: 12,
    servings: 1,
    ingredients: ["яйца", "шпинат", "сыр", "молоко", "соль", "масло"],
    grams: { "яйца": 120, "шпинат": 60, "сыр": 30, "молоко": 30, "соль": 2, "масло": 10 },
    steps: {
      ru: ["Обжарьте шпинат 2 минуты.", "Влейте взбитые с молоком яйца.", "Посыпьте сыром, готовьте под крышкой 4 минуты."],
      en: ["Sauté spinach for 2 minutes.", "Pour in beaten eggs with milk.", "Sprinkle with cheese, cook covered 4 minutes."]
    },
    nutrition: { calories: 260, protein: 18, fat: 18, carbs: 5 }
  },
  {
    id: 54,
    title: { ru: "Куриные крылышки", en: "Chicken Wings" },
    emoji: "🍗",
    category: "main",
    time_min: 50,
    servings: 3,
    ingredients: ["курица", "мёд", "соевый соус", "чеснок", "специи", "масло"],
    grams: { "курица": 600, "мёд": 30, "соевый соус": 30, "чеснок": 10, "специи": 5, "масло": 10 },
    steps: {
      ru: ["Смешайте мёд, соевый соус, чеснок и специи.", "Замаринуйте крылышки на 15 минут.", "Запекайте при 200°C 35 минут."],
      en: ["Mix honey, soy sauce, garlic and spices.", "Marinate wings for 15 minutes.", "Bake at 200°C for 35 minutes."]
    },
    nutrition: { calories: 280, protein: 24, fat: 16, carbs: 10 }
  },
  {
    id: 55,
    title: { ru: "Овощи-гриль", en: "Grilled Vegetables" },
    emoji: "🫑",
    category: "main",
    time_min: 25,
    servings: 2,
    ingredients: ["перец болгарский", "кабачок", "помидоры", "баклажан", "масло", "соль", "специи"],
    grams: { "перец болгарский": 150, "кабачок": 150, "помидоры": 100, "баклажан": 150, "масло": 20, "соль": 4, "специи": 4 },
    steps: {
      ru: ["Нарежьте овощи крупными кусками.", "Сбрызните маслом, посолите.", "Запекайте при 200°C 20 минут."],
      en: ["Cut vegetables into large pieces.", "Drizzle with oil, season.", "Bake at 200°C for 20 minutes."]
    },
    nutrition: { calories: 100, protein: 3, fat: 6, carbs: 10 }
  },
];

export const CATEGORIES = {
  breakfast: { ru: "Завтраки", en: "Breakfast", emoji: "🌅" },
  soup: { ru: "Супы", en: "Soups", emoji: "🍲" },
  main: { ru: "Основные", en: "Main", emoji: "🍽️" },
  salad: { ru: "Салаты", en: "Salads", emoji: "🥗" },
  snack: { ru: "Перекусы", en: "Snacks", emoji: "🥪" },
  dessert: { ru: "Десерты", en: "Desserts", emoji: "🍰" },
};
