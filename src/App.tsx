import { useState, useEffect, useMemo } from "react";
import { RECIPES, BASICS, SYNONYMS, POPULAR_PRODUCTS, CATEGORIES, type Recipe } from "./data/recipes";
import { translations, getProductName, getProductEmoji, type Lang } from "./i18n/translations";
import { motion, AnimatePresence } from "framer-motion";

// --- Matching engine ---
const ENDINGS = ["ами", "ями", "ов", "ев", "ей", "ой", "ая", "ое", "ые", "ий", "ы", "и", "а", "я", "у", "ю", "е"]
  .sort((a, b) => b.length - a.length);

function clean(s: string) {
  return s.toLowerCase().replace(/ё/g, "е").trim().split(/\s+/).filter(Boolean).join(" ");
}

function stem(t: string) {
  return clean(t).split(" ").filter(Boolean).map(w => {
    for (const e of ENDINGS) {
      if (w.endsWith(e) && w.length - e.length >= 3) return w.slice(0, -e.length);
    }
    return w;
  }).join(" ");
}

const EXACT = new Map<string, string>();
const STEMMED = new Map<string, string>();

for (const [canon, aliases] of Object.entries(SYNONYMS)) {
  for (const a of [canon, ...aliases]) {
    EXACT.set(clean(a), canon);
    const st = stem(a);
    if (!STEMMED.has(st)) STEMMED.set(st, canon);
  }
}

function normalize(raw: string): string {
  const s = clean(raw);
  if (EXACT.has(s)) return EXACT.get(s)!;
  const st = stem(s);
  if (STEMMED.has(st)) return STEMMED.get(st)!;
  return s;
}

function parseProducts(text: string): string[] {
  const seen = new Set<string>();
  for (const p of text.split(/[,;\n]+|\s+и\s+/)) {
    if (p.trim()) seen.add(normalize(p.trim()));
  }
  return [...seen];
}

interface MatchResult {
  recipe: Recipe;
  have: string[];
  missing: string[];
}

function findRecipes(products: string[], noShopping: boolean = false): MatchResult[] {
  const haveSet = new Set([...products.map(normalize), ...BASICS]);
  const out: MatchResult[] = [];

  for (const r of RECIPES) {
    const needed = new Set(r.ingredients.map(normalize));
    for (const b of BASICS) needed.delete(b);
    if (needed.size === 0) continue;

    const have = [...needed].filter(x => haveSet.has(x)).sort();
    const missing = [...needed].filter(x => !haveSet.has(x)).sort();

    if (have.length === 0) continue;
    if (noShopping && missing.length) continue;

    out.push({ recipe: r, have, missing });
  }

  out.sort((a, b) =>
    (a.missing.length - b.missing.length) ||
    (b.have.length - a.have.length) ||
    ((a.recipe.time_min ?? 999) - (b.recipe.time_min ?? 999))
  );

  return out;
}

// --- Components ---
function NutritionBadge({ label, value, unit, color }: { label: string; value: number; unit: string; color: string }) {
  return (
    <div className={`flex flex-col items-center px-2 py-1 rounded-lg ${color}`}>
      <span className="text-xs font-medium opacity-80">{label}</span>
      <span className="text-sm font-bold">{value}{unit}</span>
    </div>
  );
}

function RecipeCard({ match, lang, t }: { match: MatchResult; lang: Lang; t: typeof translations.ru }) {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const r = match.recipe;

  const handleCopy = async () => {
    const text = `${r.title[lang]}: ${r.ingredients.map(i => getProductName(i, lang)).join(", ")}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* ignore */ }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-pink-100 dark:border-gray-700 overflow-hidden"
    >
      <div className="p-4 sm:p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{r.emoji}</span>
            <div>
              <h3 className="font-bold text-gray-800 dark:text-white text-base sm:text-lg leading-tight">
                {r.title[lang]}
              </h3>
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                <span>⏱️ {r.time_min} {t.time}</span>
                <span>•</span>
                <span>👤 {r.servings} {t.servings}</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-pink-400 hover:text-pink-500 transition-colors p-1"
          >
            {expanded ? "▲" : "▼"}
          </button>
        </div>

        {/* Match status */}
        <div className="mb-3">
          {match.missing.length > 0 ? (
            <p className="text-sm text-orange-600 dark:text-orange-400">
              🛒 {t.buyExtra} <span className="font-medium">{match.missing.map(m => getProductName(m, lang)).join(", ")}</span>
            </p>
          ) : (
            <p className="text-sm text-green-600 dark:text-green-400 font-medium">
              ✅ {t.allHave}
            </p>
          )}
        </div>

        {/* Nutrition */}
        <div className="grid grid-cols-4 gap-1.5 mb-3">
          <NutritionBadge label={t.calories} value={r.nutrition.calories} unit=" ккал" color="bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300" />
          <NutritionBadge label={t.protein} value={r.nutrition.protein} unit="г" color="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300" />
          <NutritionBadge label={t.fat} value={r.nutrition.fat} unit="г" color="bg-yellow-50 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300" />
          <NutritionBadge label={t.carbs} value={r.nutrition.carbs} unit="г" color="bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300" />
        </div>

        {/* Ingredients preview */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {r.ingredients.map((ing, i) => {
            const isHave = match.have.includes(normalize(ing)) || BASICS.includes(normalize(ing));
            return (
              <span
                key={i}
                className={`text-xs px-2 py-0.5 rounded-full ${
                  isHave
                    ? "bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300"
                    : "bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300"
                }`}
              >
                {getProductEmoji(ing)} {getProductName(ing, lang)} {r.grams[ing] ? `${r.grams[ing]}${t.grams}` : ""}
              </span>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            className="text-xs px-3 py-1.5 rounded-lg bg-pink-100 dark:bg-pink-900/40 text-pink-700 dark:text-pink-300 hover:bg-pink-200 dark:hover:bg-pink-900/60 transition-colors font-medium"
          >
            {copied ? t.copied : `📋 ${t.copy}`}
          </button>
        </div>

        {/* Expanded steps */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="mt-4 pt-4 border-t border-pink-100 dark:border-gray-700">
                <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2 text-sm">
                  📝 {t.steps}
                </h4>
                <ol className="space-y-1.5">
                  {r.steps[lang].map((step, i) => (
                    <li key={i} className="text-sm text-gray-600 dark:text-gray-400 flex gap-2">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-pink-200 dark:bg-pink-800 text-pink-700 dark:text-pink-300 flex items-center justify-center text-xs font-bold">
                        {i + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function App() {
  const [lang, setLang] = useState<Lang>("ru");
  const [dark, setDark] = useState(false);
  const [products, setProducts] = useState<string[]>([]);
  const [noShopping, setNoShopping] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [category, setCategory] = useState<string>("all");

  const t = translations[lang];

  // Load state
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("fridgechef_v2") || "null");
      if (saved) {
        if (Array.isArray(saved.products)) setProducts(saved.products);
        if (typeof saved.noShopping === "boolean") setNoShopping(saved.noShopping);
        if (saved.lang) setLang(saved.lang);
        if (saved.dark) setDark(saved.dark);
      }
    } catch { /* ignore */ }
  }, []);

  // Save state
  useEffect(() => {
    try {
      localStorage.setItem("fridgechef_v2", JSON.stringify({ products, noShopping, lang, dark }));
    } catch { /* ignore */ }
  }, [products, noShopping, lang, dark]);

  // Dark mode
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const toggleProduct = (name: string) => {
    setProducts(prev =>
      prev.includes(name) ? prev.filter(p => p !== name) : [...prev, name]
    );
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const added = parseProducts(inputValue);
    setProducts(prev => {
      const newProducts = [...prev];
      for (const p of added) {
        if (!newProducts.includes(p)) newProducts.push(p);
      }
      return newProducts;
    });
    setInputValue("");
  };

  const resetAll = () => {
    setProducts([]);
    setCategory("all");
  };

  // Find recipes
  const matches = useMemo(() => {
    if (!products.length) return [];
    let results = findRecipes(products, noShopping);

    // Filter by category
    if (category !== "all") {
      results = results.filter(m => m.recipe.category === category);
    }

    return results;
  }, [products, noShopping, category]);

  const fallbackMatches = useMemo(() => {
    if (!products.length || matches.length > 0) return [];
    let results = findRecipes(products, false);
    if (category !== "all") {
      results = results.filter(m => m.recipe.category === category);
    }
    return results;
  }, [products, category, matches.length]);

  const displayMatches = matches.length > 0 ? matches : fallbackMatches;
  const showFallbackNote = matches.length === 0 && fallbackMatches.length > 0 && noShopping;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 transition-colors duration-300">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border-b border-pink-100 dark:border-gray-800">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🍳</span>
            <h1 className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              FridgeChef
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setLang(lang === "ru" ? "en" : "ru")}
              className="px-3 py-1.5 rounded-full text-sm font-medium bg-pink-100 dark:bg-pink-900/40 text-pink-700 dark:text-pink-300 hover:bg-pink-200 dark:hover:bg-pink-900/60 transition-colors"
            >
              {t.lang}
            </button>
            <button
              onClick={() => setDark(!dark)}
              className="p-2 rounded-full bg-pink-100 dark:bg-pink-900/40 text-pink-700 dark:text-pink-300 hover:bg-pink-200 dark:hover:bg-pink-900/60 transition-colors"
            >
              {dark ? "☀️" : "🌙"}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-4"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white mb-2">
            {t.heroTitle}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">
            {t.heroSubtitle}
          </p>
        </motion.div>

        {/* Product chips */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="space-y-3"
        >
          <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
            {t.popular}
          </p>
          <div className="flex flex-wrap gap-2">
            {POPULAR_PRODUCTS.map(name => {
              const isActive = products.includes(name);
              return (
                <motion.button
                  key={name}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggleProduct(name)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-gradient-to-r from-pink-400 to-purple-400 text-white shadow-md shadow-pink-200 dark:shadow-pink-900/50"
                      : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-pink-200 dark:border-gray-700 hover:border-pink-300 dark:hover:border-pink-600 hover:shadow-sm"
                  }`}
                >
                  {getProductEmoji(name)} {getProductName(name, lang)}
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Add custom product */}
        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleAddProduct}
          className="flex gap-2"
        >
          <input
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            placeholder={t.addPlaceholder}
            className="flex-1 px-4 py-2.5 rounded-xl bg-white dark:bg-gray-800 border border-pink-200 dark:border-gray-700 text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-300 dark:focus:ring-pink-600 text-sm"
          />
          <button
            type="submit"
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-pink-400 to-purple-400 text-white font-medium text-sm hover:shadow-lg hover:shadow-pink-200 dark:hover:shadow-pink-900/50 transition-all"
          >
            +
          </button>
        </motion.form>

        {/* Selected products */}
        {products.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="space-y-3"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                {t.yourProducts} ({products.length})
              </p>
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={noShopping}
                    onChange={e => setNoShopping(e.target.checked)}
                    className="w-4 h-4 rounded border-pink-300 text-pink-500 focus:ring-pink-300"
                  />
                  <span className="text-xs text-gray-600 dark:text-gray-400">{t.noShopping}</span>
                </label>
                <button
                  onClick={resetAll}
                  className="text-xs px-3 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  ✕ {t.reset}
                </button>
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {products.map(name => (
                <motion.button
                  key={name}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  onClick={() => toggleProduct(name)}
                  className="px-2.5 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-pink-400 to-purple-400 text-white shadow-sm hover:shadow-md transition-shadow flex items-center gap-1"
                >
                  {getProductEmoji(name)} {getProductName(name, lang)}
                  <span className="opacity-70">×</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Category filter */}
        {products.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide"
          >
            <button
              onClick={() => setCategory("all")}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                category === "all"
                  ? "bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300"
                  : "bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700"
              }`}
            >
              ✨ {t.allCategories}
            </button>
            {Object.entries(CATEGORIES).map(([key, cat]) => (
              <button
                key={key}
                onClick={() => setCategory(key)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                  category === key
                    ? "bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300"
                    : "bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700"
                }`}
              >
                {cat.emoji} {cat[lang]}
              </button>
            ))}
          </motion.div>
        )}

        {/* Results */}
        <div className="space-y-4">
          {!products.length && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <span className="text-5xl mb-4 block">🥺</span>
              <p className="text-gray-500 dark:text-gray-400">{t.noProducts}</p>
            </motion.div>
          )}

          {products.length > 0 && displayMatches.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <span className="text-5xl mb-4 block">🔍</span>
              <p className="text-gray-500 dark:text-gray-400">{t.nothingFound}</p>
            </motion.div>
          )}

          {showFallbackNote && (
            <p className="text-sm text-gray-500 dark:text-gray-400 italic">
              💡 {t.noShoppingFallback}
            </p>
          )}

          {displayMatches.length > 0 && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {t.recipesFound} <span className="font-bold text-pink-500">{displayMatches.length}</span>
            </p>
          )}

          <AnimatePresence>
            {displayMatches.map((m, i) => (
              <RecipeCard key={m.recipe.id} match={m} lang={lang} t={t} />
            ))}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <footer className="text-center py-8 text-xs text-gray-400 dark:text-gray-600">
          <p>Made with 💖 by FridgeChef</p>
          <p className="mt-1">{RECIPES.length} recipes • {lang === "ru" ? "Русский" : "English"}</p>
        </footer>
      </main>
    </div>
  );
}
