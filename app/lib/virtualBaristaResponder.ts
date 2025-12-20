type ChatMessage = {
  role: "user" | "model";
  text: string;
};

type KnowledgeEntry = {
  title: string;
  answer: string;
  keywords: string[];
};

// Comprehensive FAQ set
import { GENERAL_FAQ } from "./baristaFaqData";

const CAFE_INFO = {
  address: "3512 9th St, Riverside, CA 92501",
  phone: "(951) 823-0004",
  hours: [
    { day: "Mon - Thu", time: "6:30am – 4:00pm" },
    { day: "Fri - Sat", time: "6:30am – 6:00pm" },
    { day: "Sun", time: "Closed" },
  ],
};

const MENU_ITEMS = [
  { id: "d1", name: "Honey Lavender Latte", description: "Floral lavender and local honey with espresso and steamed milk.", price: "$5.75", category: "Drinks", tags: ["popular"] },
  { id: "d2", name: "Iced Brown Sugar Shaken Espresso", description: "Shaken espresso with brown sugar and oat milk over ice.", price: "$5.50", category: "Drinks", tags: ["popular"] },
  { id: "d3", name: "Espresso", price: "$3.50", category: "Drinks" },
  { id: "d4", name: "Cappuccino", price: "$4.50", category: "Drinks" },
  { id: "d5", name: "Vanilla Latte", price: "$5.00", category: "Drinks" },
  { id: "d6", name: "Caramel Macchiato", price: "$5.50", category: "Drinks" },
  { id: "d7", name: "Drip Coffee", price: "$3.00", category: "Drinks" },
  { id: "d8", name: "Americano", price: "$3.75", category: "Drinks" },
  { id: "d9", name: "Cold Brew", price: "$4.50", category: "Drinks" },
  { id: "d10", name: "Iced Coffee", price: "$3.50", category: "Drinks" },
  { id: "d11", name: "Matcha Latte", price: "$5.50", category: "Drinks" },
  { id: "d12", name: "Iced Matcha Latte", price: "$5.50", category: "Drinks" },
  { id: "d13", name: "Matcha Lemonade", price: "$5.75", category: "Drinks" },
  { id: "d14", name: "Vanilla Matcha", price: "$6.00", category: "Drinks" },
  { id: "d15", name: "Coconut Matcha", price: "$6.00", category: "Drinks" },
  { id: "d16", name: "Strawberry Matcha", price: "$6.25", category: "Drinks" },
  { id: "d17", name: "Earl Grey Tea", price: "$3.50", category: "Drinks" },
  { id: "d18", name: "Chamomile Tea", price: "$3.50", category: "Drinks" },
  { id: "d19", name: "Green Tea", price: "$3.50", category: "Drinks" },
  { id: "d20", name: "Chai Latte", price: "$5.00", category: "Drinks" },
  { id: "d21", name: "Hot Chocolate", price: "$4.50", category: "Drinks" },
  { id: "d22", name: "Steamed Milk (kids)", price: "$3.00", category: "Drinks" },
  { id: "d23", name: "Kids Hot Chocolate", price: "$3.50", category: "Drinks" },
  { id: "d24", name: "Apple Juice", price: "$2.50", category: "Drinks" },
  { id: "d25", name: "Chocolate Milk", price: "$3.00", category: "Drinks" },
  { id: "d26", name: "Pumpkin Spice Latte", price: "$6.00", category: "Drinks", tags: ["seasonal"] },
  { id: "d27", name: "Peppermint Mocha", price: "$6.00", category: "Drinks", tags: ["seasonal"] },
  { id: "m1", name: "Breakfast Sandwich", price: "$8.50", category: "Meals" },
  { id: "m2", name: "Avocado Toast", price: "$9.00", category: "Meals", tags: ["popular"] },
  { id: "m3", name: "Turkey & Swiss Panini", price: "$10.50", category: "Meals" },
  { id: "m4", name: "Grilled Cheese & Tomato Soup", price: "$9.50", category: "Meals" },
  { id: "m5", name: "Caesar Salad", price: "$9.00", category: "Meals" },
  { id: "m6", name: "Yogurt Parfait", price: "$7.00", category: "Meals" },
  { id: "de1", name: "New York Cheesecake", price: "$6.00", category: "Desserts" },
  { id: "de2", name: "Chocolate Brownie", price: "$5.00", category: "Desserts", tags: ["popular"] },
  { id: "de3", name: "Chocolate Chip Cookie", price: "$3.50", category: "Desserts" },
  { id: "de4", name: "Cinnamon Roll", price: "$5.50", category: "Desserts" },
];

const EVENTS = [
  {
    id: "e1",
    title: "Sunday Deep House Sessions",
    date: "Oct 12",
    time: "7:00 PM",
    description: "Resident DJ Marcus spinning vinyl only. Deep, soulful grooves.",
    type: "music",
  },
  {
    id: "e2",
    title: "Writers' Block: Open Mic",
    date: "Oct 15",
    time: "6:00 PM",
    description: "Poetry, short stories, and acoustic sets. Sign up at the door.",
    type: "community",
  },
  {
    id: "e3",
    title: "Latte Art Throwdown",
    date: "Oct 20",
    time: "10:00 AM",
    description: "Local baristas compete. Free entry for spectators.",
    type: "community",
  },
];

const STOP_WORDS = new Set([
  "the",
  "a",
  "an",
  "and",
  "or",
  "of",
  "for",
  "to",
  "is",
  "are",
  "do",
  "does",
  "in",
  "at",
  "on",
  "with",
  "tell",
]);

const FAQ_ENTRIES: KnowledgeEntry[] = GENERAL_FAQ.map((item) => ({
  title: item.question,
  answer: item.answer,
  keywords: item.keywords,
}));

const CONTENT_ENTRIES: KnowledgeEntry[] = buildContentEntries();

export async function getLocalBaristaReply(
  history: ChatMessage[],
  message: string,
): Promise<string> {
  const userMessage = message.trim();
  if (!userMessage) return "Hit me with your question and I'll pull it from our own notes.";

  const query = userMessage.toLowerCase();
  const queryTokens = tokenize(query);

  const menuAnswer = getMenuItemAnswer(query);
  if (menuAnswer) return withVoice(menuAnswer);

  const keywordFaqHit = keywordMatchFaq(query, FAQ_ENTRIES);
  if (keywordFaqHit) return withVoice(keywordFaqHit.answer);

  const faqHit = bestMatch(query, queryTokens, FAQ_ENTRIES);
  if (faqHit.score >= 1.5) return withVoice(faqHit.entry.answer);

  const contentHit = bestMatch(query, queryTokens, CONTENT_ENTRIES);
  if (contentHit.score >= 2) return withVoice(contentHit.entry.answer);

  return withVoice("I couldn't find that in our notes yet. Ask about hours, menu, events, WiFi, or anything in the cafe and I'll keep it tight.");
}

function tokenize(text: string): Set<string> {
  return new Set(
    text
      .replace(/[^a-z0-9\s]/g, " ")
      .split(/\s+/)
      .map((t) => t.trim())
      .filter((t) => t && !STOP_WORDS.has(t)),
  );
}

function similarityScore(query: string, queryTokens: Set<string>, entry: KnowledgeEntry): number {
  const combined = `${entry.title} ${entry.keywords.join(" ")}`.toLowerCase();
  const entryTokens = tokenize(combined);
  let overlap = 0;

  for (const token of entryTokens) {
    if (queryTokens.has(token)) overlap += 1;
  }

  const keywordBonus = entry.keywords.filter((kw) => queryTokens.has(kw.toLowerCase()) || (kw.includes(" ") && query.includes(kw.toLowerCase()))).length;
  const keywordIncludeBonus = entry.keywords.some((kw) => combined.includes(kw.toLowerCase())) ? 1 : 0;

  return overlap + keywordBonus * 1.5 + keywordIncludeBonus;
}

function bestMatch(query: string, queryTokens: Set<string>, entries: KnowledgeEntry[]) {
  return entries.reduce(
    (best, entry) => {
      const score = similarityScore(query, queryTokens, entry) + keywordPhraseBonus(query, entry.keywords);
      return score > best.score ? { entry, score } : best;
    },
    { entry: entries[0], score: 0 },
  );
}

function keywordPhraseBonus(query: string, keywords: string[]) {
  return keywords.some((kw) => kw.includes(" ") && query.includes(kw.toLowerCase())) ? 1 : 0;
}

function withVoice(answer: string) {
  // Lead-ins removed for now; respond directly.
  return answer;
}

function keywordMatchFaq(rawQuery: string, entries: KnowledgeEntry[]): KnowledgeEntry | null {
  const normalized = rawQuery.replace(/[^a-z0-9\s]/g, " ");
  const tokens = new Set(
    normalized
      .split(/\s+/)
      .map((t) => t.trim())
      .filter(Boolean),
  );

  if (normalized.includes("rec") || normalized.includes("recommend")) {
    return {
      title: "Quick recs",
      answer: getRandomRecommendation(),
      keywords: ["rec", "recommend", "suggest"],
    };
  }

  let best: { entry: KnowledgeEntry | null; hits: number } = { entry: null, hits: 0 };
  for (const entry of entries) {
    const hits = entry.keywords.reduce((count, kw) => {
      const key = kw.toLowerCase();
      if (normalized.includes(key) || tokens.has(key)) return count + 1;
      return count;
    }, 0);
    if (hits > best.hits) {
      best = { entry, hits };
    }
  }
  return best.entry;
}

function getMenuItemAnswer(query: string): string | null {
  const item = MENU_ITEMS.find((i) => query.includes(i.name.toLowerCase()));
  if (!item) return null;

  const detail = item.description ? `${item.description} ` : "";
  return `${item.name} is ${item.price}. ${detail}Want another rec to pair with it?`;
}

function getRandomRecommendation(): string {
  const picks = [
    "Try the Honey Lavender Latte if you want floral and smooth, or the Iced Brown Sugar Shaken Espresso for something sweet and punchy.",
    "If you like classic coffee, go Cold Brew. If you want cozy, grab a Cappuccino or Chai Latte.",
    "Matcha fan? Go Iced Matcha Latte or Matcha Lemonade. Need a treat? Avocado Toast or a Chocolate Brownie pairs great.",
    "Morning start: Drip Coffee and a Breakfast Sandwich. Afternoon chill: Vanilla Matcha and Avocado Toast.",
  ];
  return picks[Math.floor(Math.random() * picks.length)];
}

function formatPopularDrinks() {
  const popular = MENU_ITEMS.filter((i) => i.tags?.includes("popular"));
  if (!popular.length) return "Popular picks rotate—ask for a house favorite.";
  return `Crowd faves: ${popular.map((i) => `${i.name} (${i.price})`).join(", ")}.`;
}

function formatSeasonalSpecials() {
  const seasonal = MENU_ITEMS.filter((i) => i.tags?.includes("seasonal"));
  if (!seasonal.length) return "Seasonal drinks are off-menu right now, but we keep a rotating special.";
  return `Seasonal right now: ${seasonal.map((i) => `${i.name} (${i.price})`).join(", ")}.`;
}

function formatEvents() {
  if (!EVENTS.length) return "No events on the board this week, but we rotate music and community nights.";
  return `Events coming up: ${EVENTS.map((e) => `${e.title} on ${e.date} at ${e.time}`).join("; ")}.`;
}

function buildContentEntries(): KnowledgeEntry[] {
  const menuByCategory = ["Drinks", "Meals", "Desserts"].map((category) => {
    const items = MENU_ITEMS.filter((i) => i.category === category);
    return {
      title: `${category} menu`,
      answer: `${category}: ${items.map((i) => `${i.name}${i.price ? ` (${i.price})` : ""}`).join(", ")}.`,
      keywords: [category.toLowerCase(), "menu", "list", category === "Drinks" ? "coffee" : category.toLowerCase()],
    };
  });

  return [
    {
      title: "Cafe basics",
      answer: `The Notebook Café, Riverside. Address: ${CAFE_INFO.address}. Hours: ${CAFE_INFO.hours.map((h) => `${h.day} ${h.time}`).join(", ")}. Phone: ${CAFE_INFO.phone}.`,
      keywords: ["address", "hours", "phone", "call", "open", "close", "location", "parking", "riverside"],
    },
    {
      title: "Vibe and sound",
      answer: "Low light, deep house, neo-soul, and lo-fi. Good for writing, reading, and hanging out.",
      keywords: ["vibe", "music", "sound", "quiet", "study", "work", "lofi"],
    },
    {
      title: "WiFi and power",
      answer: "WiFi is free; outlets are along the walls. No strict stay limit—just share space during peak hours.",
      keywords: ["wifi", "wi-fi", "internet", "outlet", "plug", "charge", "seating", "work"],
    },
    {
      title: "Sustainability",
      answer: "We use sustainable, direct-trade roasters and keep ingredients clean and balanced.",
      keywords: ["sustainable", "direct trade", "beans", "roaster", "ethics"],
    },
    ...menuByCategory,
    {
      title: "Popular drinks (content)",
      answer: formatPopularDrinks(),
      keywords: ["popular", "signature", "best", "top", "favorite"],
    },
    {
      title: "Seasonal specials (content)",
      answer: formatSeasonalSpecials(),
      keywords: ["seasonal", "limited", "special"],
    },
    {
      title: "Kids and non-coffee",
      answer: "Non-coffee and kid-friendly: steamed milk, hot chocolate, chocolate milk, apple juice, teas, matcha drinks.",
      keywords: ["kids", "non coffee", "tea", "matcha", "juice", "hot chocolate"],
    },
    {
      title: "Events (content)",
      answer: formatEvents(),
      keywords: ["event", "events", "music", "community", "dj", "open mic"],
    },
  ];
}
