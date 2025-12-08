import { MenuItem, ModifierGroup } from './types';

export const MENU_ITEMS: MenuItem[] = [
  // Drinks - Featured
  { id: "1", name: "Honey Lavender Latte", description: "Floral lavender and local honey with espresso and steamed milk. Light and aromatic.", price: "$5.75", section: "drinks", subcategory: "Featured Drinks", tag: "popular" },
  { id: "2", name: "Iced Brown Sugar Shaken Espresso", description: "Shaken espresso with brown sugar and oat milk over ice. Smooth and lightly sweet.", price: "$5.50", section: "drinks", subcategory: "Featured Drinks", tag: "popular" },

  // Drinks - Espresso
  { id: "3", name: "Espresso", description: "Rich, concentrated shot of pure coffee excellence. Bold flavor with a smooth crema finish.", price: "$3.50", section: "drinks", subcategory: "Espresso Drinks" },
  { id: "4", name: "Cappuccino", description: "Espresso with velvety steamed milk and thick foam. Perfectly balanced.", price: "$4.50", section: "drinks", subcategory: "Espresso Drinks" },
  { id: "5", name: "Vanilla Latte", description: "House-made vanilla syrup, espresso, and steamed milk. Sweet and creamy.", price: "$5.00", section: "drinks", subcategory: "Espresso Drinks" },
  { id: "6", name: "Caramel Macchiato", description: "Vanilla-infused milk, espresso, and caramel drizzle. Layered and sweet.", price: "$5.50", section: "drinks", subcategory: "Espresso Drinks" },

  // Drinks - Classic
  { id: "7", name: "Drip Coffee", description: "Freshly brewed classic coffee. Available in light, medium, or dark roast.", price: "$3.00", section: "drinks", subcategory: "Classic Coffee" },
  { id: "8", name: "Americano", description: "Espresso shots diluted with hot water. Bold yet smooth.", price: "$3.75", section: "drinks", subcategory: "Classic Coffee" },
  { id: "9", name: "Cold Brew", description: "Smooth cold brew steeped for 16 hours. Served over ice, naturally sweet.", price: "$4.50", section: "drinks", subcategory: "Classic Coffee" },
  { id: "10", name: "Iced Coffee", description: "Chilled brewed coffee over ice. Simple and refreshing.", price: "$3.50", section: "drinks", subcategory: "Classic Coffee" },

  // Drinks - Matcha
  { id: "11", name: "Matcha Latte", description: "Premium Japanese matcha whisked with steamed milk. Earthy and smooth.", price: "$5.50", section: "drinks", subcategory: "Matcha" },
  { id: "12", name: "Iced Matcha Latte", description: "Creamy iced matcha with your choice of milk. Refreshing green goodness.", price: "$5.50", section: "drinks", subcategory: "Matcha" },
  { id: "13", name: "Matcha Lemonade", description: "Vibrant matcha shaken with fresh lemonade. Sweet, tart, and energizing.", price: "$5.75", section: "drinks", subcategory: "Matcha" },
  { id: "14", name: "Vanilla Matcha", description: "Matcha with house-made vanilla syrup and steamed milk. Sweet and balanced.", price: "$6.00", section: "drinks", subcategory: "Matcha" },
  { id: "15", name: "Coconut Matcha", description: "Matcha with coconut milk and a hint of coconut syrup. Tropical twist.", price: "$6.00", section: "drinks", subcategory: "Matcha" },
  { id: "16", name: "Strawberry Matcha", description: "Matcha layered with strawberry puree and milk. Instagram-worthy favorite.", price: "$6.25", section: "drinks", subcategory: "Matcha" },

  // Drinks - Teas & Other
  { id: "17", name: "Earl Grey Tea", description: "Classic black tea with bergamot. Aromatic and refined.", price: "$3.50", section: "drinks", subcategory: "Teas & Other" },
  { id: "18", name: "Chamomile Tea", description: "Soothing herbal tea. Naturally caffeine-free and calming.", price: "$3.50", section: "drinks", subcategory: "Teas & Other" },
  { id: "19", name: "Green Tea", description: "Light and refreshing Japanese green tea. Delicate and pure.", price: "$3.50", section: "drinks", subcategory: "Teas & Other" },
  { id: "20", name: "Chai Latte", description: "Spiced black tea with steamed milk. Warm and comforting.", price: "$5.00", section: "drinks", subcategory: "Teas & Other" },
  { id: "21", name: "Hot Chocolate", description: "Rich dark chocolate with steamed milk and whipped cream. Kid and adult approved.", price: "$4.50", section: "drinks", subcategory: "Teas & Other" },

  // Drinks - Kids
  { id: "22", name: "Steamed Milk", description: "Warm steamed milk with a choice of vanilla, chocolate, or caramel flavor.", price: "$3.00", section: "drinks", subcategory: "Kids Drinks" },
  { id: "23", name: "Kids Hot Chocolate", description: "Smaller portion of our rich hot chocolate. Topped with whipped cream and sprinkles.", price: "$3.50", section: "drinks", subcategory: "Kids Drinks" },
  { id: "24", name: "Apple Juice", description: "Fresh pressed apple juice. No added sugar.", price: "$2.50", section: "drinks", subcategory: "Kids Drinks" },
  { id: "25", name: "Chocolate Milk", description: "Cold whole milk with premium chocolate syrup. Classic favorite.", price: "$3.00", section: "drinks", subcategory: "Kids Drinks" },

  // Drinks - Seasonal
  { id: "26", name: "Pumpkin Spice Latte", description: "Fall classic with pumpkin, cinnamon, and nutmeg. Topped with whipped cream.", price: "$6.00", section: "drinks", subcategory: "Seasonal Drinks", tag: "seasonal" },
  { id: "27", name: "Peppermint Mocha", description: "Rich chocolate, espresso, and cool peppermint. Holiday favorite, hot or iced.", price: "$6.00", section: "drinks", subcategory: "Seasonal Drinks", tag: "seasonal" },

  // Meals - Açaí Bowls
  { id: "28", name: "Build Your Own Bowl", description: "Create your perfect bowl with fresh fruits, toppings, and drizzles.", price: "$12.00", section: "meals", subcategory: "Açaí Bowls", tag: "popular" },
  { id: "29", name: "The Classic Chapter", description: "Açaí base · Granola · Banana · Strawberry · Blueberry · Peanut Butter · Honey Drizzle · Coconut", price: "$13.50", section: "meals", subcategory: "Açaí Bowls" },

  // Meals - Bagels
  { id: "30", name: "Plain Bagel", description: "Classic plain bagel. Choose from Plain Cream Cheese, Strawberry Honey Cream Cheese, or Garlic & Herb Cream Cheese.", price: "$4.50", section: "meals", subcategory: "Bagels" },
  { id: "31", name: "Jalapeño Cheddar Bagel", description: "Spicy jalapeño cheddar bagel. Choose from Plain Cream Cheese, Strawberry Honey Cream Cheese, or Garlic & Herb Cream Cheese.", price: "$5.00", section: "meals", subcategory: "Bagels" },
  { id: "32", name: "Everything Bagel", description: "Classic everything bagel with seeds and spices. Choose from Plain Cream Cheese, Strawberry Honey Cream Cheese, or Garlic & Herb Cream Cheese.", price: "$5.00", section: "meals", subcategory: "Bagels" },

  // Meals - Panini Press
  { id: "33", name: "The Notebook Classic", description: "Turkey · Cheddar · Avocado · Choice of Multigrain Wheat or Ciabatta", price: "$10.50", section: "meals", subcategory: "Panini Press", tag: "popular" },
  { id: "34", name: "The Rustic Reader", description: "Turkey · Provolone · Tomato · Basil Pesto · Pressed on Sourdough", price: "$10.50", section: "meals", subcategory: "Panini Press" },
  { id: "35", name: "The Cozy Chapter Melt", description: "Cheddar · Mozzarella · Provolone · Served on Rustic Sourdough or Country White", price: "$9.00", section: "meals", subcategory: "Panini Press" },

  // Desserts - Croffles
  { id: "36", name: "Matcha Croffle", description: "Crispy croissant-waffle hybrid with earthy matcha flavor. Sweet and delicate.", price: "$6.50", section: "desserts", subcategory: "Croffles" },
  { id: "37", name: "Chocolate Croffle", description: "Rich chocolate croffle, perfectly crispy outside and soft inside. Decadent treat.", price: "$6.50", section: "desserts", subcategory: "Croffles" },
  { id: "38", name: "Biscoff Croffle", description: "Buttery Biscoff-flavored croffle with hints of caramel and spice. Irresistible.", price: "$6.50", section: "desserts", subcategory: "Croffles" },
  { id: "39", name: "The Trilogy Croffle", description: "A flight sampler of all three croffle flavors. Perfect for sharing or indulging.", price: "$15.00", section: "desserts", subcategory: "Croffles", tag: "popular" },

  // Desserts - Cheesecake
  { id: "40", name: "Classic Cheesecake", description: "Smooth, creamy New York-style cheesecake on a buttery graham cracker crust.", price: "$6.50", section: "desserts", subcategory: "Cheesecake" },
  { id: "41", name: "Oreo Cheesecake", description: "Creamy cheesecake loaded with Oreo cookies. Chocolate lovers' dream.", price: "$7.00", section: "desserts", subcategory: "Cheesecake", tag: "popular" },
  { id: "42", name: "Lemon Cheesecake", description: "Light and tangy lemon cheesecake with a bright citrus finish. Refreshingly sweet.", price: "$7.00", section: "desserts", subcategory: "Cheesecake" }
];

// Drink Modifiers
const DRINK_SIZE: ModifierGroup = {
  id: "size",
  name: "Size",
  type: "radio",
  required: true,
  options: [
    { label: "12oz", priceDelta: 0 },
    { label: "16oz", priceDelta: 0.75 },
  ]
};

const DRINK_TEMP: ModifierGroup = {
  id: "temp",
  name: "Preparation",
  type: "radio",
  required: true,
  options: [
    { label: "Hot", priceDelta: 0 },
    { label: "Iced", priceDelta: 0.25 },
  ]
};

const DRINK_ICE: ModifierGroup = {
  id: "ice",
  name: "Ice Level",
  type: "radio",
  required: false,
  description: "Customize your ice amount",
  options: [
    { label: "Regular Ice", priceDelta: 0 },
    { label: "Light Ice", priceDelta: 0 },
    { label: "No Ice", priceDelta: 0 },
    { label: "Extra Ice", priceDelta: 0 },
  ]
};

const DRINK_MILK: ModifierGroup = {
  id: "milk",
  name: "Milk Choice",
  type: "radio",
  required: true,
  options: [
    { label: "Whole Milk", priceDelta: 0 },
    { label: "Non-fat Milk", priceDelta: 0 },
    { label: "Oat Milk", priceDelta: 1.00 },
    { label: "Almond Milk", priceDelta: 1.00 },
    { label: "Breve (Half & Half)", priceDelta: 1.25 },
  ]
};

const DRINK_SWEETNESS: ModifierGroup = {
  id: "sugar",
  name: "Sweetness",
  type: "radio",
  required: true,
  options: [
    { label: "0% (None)", priceDelta: 0 },
    { label: "50% (Half Sweet)", priceDelta: 0 },
    { label: "100% (Standard)", priceDelta: 0 },
    { label: "125% (Extra Sweet)", priceDelta: 0.25 },
  ]
};

const DRINK_ESPRESSO: ModifierGroup = {
  id: "shots",
  name: "Espresso Shots",
  type: "checkbox",
  required: false,
  maxSelections: 4,
  options: [
    { label: "Extra Shot", priceDelta: 1.00 },
    { label: "Decaf", priceDelta: 0 },
  ]
};

const DRINK_COLD_FOAM: ModifierGroup = {
  id: "foam",
  name: "Cold Foam",
  type: "radio",
  required: false,
  options: [
    { label: "No Cold Foam", priceDelta: 0 },
    { label: "Vanilla Sweet Cream", priceDelta: 1.25 },
    { label: "Salted Caramel Foam", priceDelta: 1.25 },
    { label: "Matcha Foam", priceDelta: 1.50 },
  ]
};

const DRINK_TOPPINGS: ModifierGroup = {
  id: "toppings",
  name: "Toppings",
  type: "checkbox",
  required: false,
  options: [
    { label: "Cinnamon Powder", priceDelta: 0 },
    { label: "Cocoa Powder", priceDelta: 0 },
    { label: "Whipped Cream", priceDelta: 0.50 },
    { label: "Caramel Drizzle", priceDelta: 0.50 },
    { label: "Mocha Drizzle", priceDelta: 0.50 },
  ]
};

// Acai Bowl Modifiers - Build Your Own
const BOWL_BASE: ModifierGroup = {
  id: "base",
  name: "Base",
  type: "radio",
  required: true,
  options: [
    { label: "Acai Base", priceDelta: 0 },
  ]
};

const BOWL_FRUIT: ModifierGroup = {
  id: "fruit",
  name: "Fruits",
  type: "checkbox",
  required: true,
  description: "Select your fruits",
  options: [
    { label: "Banana", priceDelta: 0 },
    { label: "Strawberry", priceDelta: 0 },
    { label: "Blueberry", priceDelta: 0 },
    { label: "Mango", priceDelta: 0 },
  ]
};

const BOWL_EXTRA_FRUIT: ModifierGroup = {
  id: "extraFruit",
  name: "Extra Fruits",
  type: "checkbox",
  required: false,
  description: "Add extra fruit portions for $0.50 each",
  options: [
    { label: "Extra Banana", priceDelta: 0.50 },
    { label: "Extra Strawberry", priceDelta: 0.50 },
    { label: "Extra Blueberry", priceDelta: 0.50 },
    { label: "Extra Mango", priceDelta: 0.50 },
  ]
};

const BOWL_DRIZZLE: ModifierGroup = {
  id: "drizzle",
  name: "Drizzles",
  type: "checkbox",
  required: false,
  options: [
    { label: "Honey", priceDelta: 0 },
    { label: "Peanut Butter", priceDelta: 0 },
    { label: "Coconut", priceDelta: 0 },
  ]
};

const BOWL_EXTRA_TOPPINGS: ModifierGroup = {
  id: "extraToppings",
  name: "Extra Toppings",
  type: "checkbox",
  required: false,
  options: [
    { label: "Granola", priceDelta: 0.50 },
  ]
};

// Bagel Modifiers
const BAGEL_SPREAD: ModifierGroup = {
  id: "spread",
  name: "Cream Cheese Spread",
  type: "radio",
  required: true,
  options: [
    { label: "Plain Cream Cheese", priceDelta: 0 },
    { label: "Strawberry Honey Cream Cheese", priceDelta: 0.50 },
    { label: "Garlic & Herb Cream Cheese", priceDelta: 0.50 },
  ]
};

// Panini Modifiers
const PANINI_BREAD: ModifierGroup = {
  id: "bread",
  name: "Bread Choice",
  type: "radio",
  required: true,
  options: [
    { label: "Multigrain Wheat", priceDelta: 0 },
    { label: "Ciabatta", priceDelta: 0 },
    { label: "Sourdough", priceDelta: 0 },
    { label: "Country White", priceDelta: 0 },
  ]
};

export const MODIFIERS: { [key: string]: ModifierGroup[] } = {
  drinks: [
    DRINK_SIZE,
    DRINK_TEMP,
    DRINK_ICE,
    DRINK_MILK,
    DRINK_SWEETNESS,
    DRINK_ESPRESSO,
    DRINK_COLD_FOAM,
    DRINK_TOPPINGS
  ],
  bowls: [
    BOWL_BASE,
    BOWL_FRUIT,
    BOWL_EXTRA_FRUIT,
    BOWL_DRIZZLE,
    BOWL_EXTRA_TOPPINGS
  ],
  classicBowl: [
    BOWL_EXTRA_TOPPINGS
  ],
  bagels: [
    BAGEL_SPREAD
  ],
  paninis: [
    PANINI_BREAD
  ],
  food: []
};
