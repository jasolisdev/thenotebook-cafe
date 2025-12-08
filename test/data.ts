import { MenuItem, ModifierGroup, EventItem } from './types';

export const MODIFIERS: Record<string, ModifierGroup[]> = {
  coffee: [
    {
      id: 'size',
      name: 'Size',
      type: 'radio',
      required: true,
      options: [
        { id: 'reg', name: 'Regular (12oz)', price: 0 },
        { id: 'lrg', name: 'Large (16oz)', price: 0.75 },
      ]
    },
    {
      id: 'milk',
      name: 'Milk Choice',
      type: 'select',
      required: true,
      options: [
        { id: 'whole', name: 'Whole Milk', price: 0 },
        { id: 'oat', name: 'Oat Milk', price: 0.75 },
        { id: 'almond', name: 'Almond Milk', price: 0.75 },
        { id: 'skim', name: 'Skim Milk', price: 0 },
      ]
    },
    {
      id: 'extras',
      name: 'Add-ons',
      type: 'checkbox',
      required: false,
      maxSelections: 3,
      options: [
        { id: 'espresso', name: 'Extra Shot', price: 1.00 },
        { id: 'vanilla', name: 'Vanilla Syrup', price: 0.50 },
        { id: 'caramel', name: 'Caramel Drizzle', price: 0.50 },
      ]
    }
  ],
  food: [
    {
      id: 'utensils',
      name: 'Utensils',
      type: 'checkbox',
      required: false,
      options: [
        { id: 'yes', name: 'Include Utensils', price: 0 }
      ]
    }
  ]
};

export const MENU_ITEMS: MenuItem[] = [
  // Drinks
  {
    id: 'd1',
    name: 'Espresso Tonic',
    description: 'Double shot espresso, tonic water, rosemary sprig, orange peel.',
    price: 5.50,
    category: 'drinks',
    subcategory: 'Signature',
    image: 'https://picsum.photos/400/400?random=1',
    tags: ['popular', 'seasonal'],
    modifierGroups: MODIFIERS.coffee
  },
  {
    id: 'd2',
    name: 'Oat Flat White',
    description: 'Silky microfoam over a rich double ristretto shot.',
    price: 4.75,
    category: 'drinks',
    subcategory: 'Espresso',
    image: 'https://picsum.photos/400/400?random=2',
    tags: ['popular'],
    modifierGroups: MODIFIERS.coffee
  },
  {
    id: 'd3',
    name: 'Pour Over - Ethiopia',
    description: 'Floral notes with hints of blueberry and jasmine.',
    price: 6.00,
    category: 'drinks',
    subcategory: 'Filter',
    image: 'https://picsum.photos/400/400?random=3',
    modifierGroups: []
  },
  {
    id: 'd4',
    name: 'Kyoto Cold Brew',
    description: 'Slow-drip cold brew, aged for 12 hours. Smooth and chocolatey.',
    price: 5.00,
    category: 'drinks',
    subcategory: 'Cold',
    image: 'https://picsum.photos/400/400?random=4',
    tags: ['seasonal'],
    modifierGroups: MODIFIERS.coffee
  },
  // Meals
  {
    id: 'm1',
    name: 'Avocado Toast',
    description: 'Sourdough, smashed avo, radish, chili flakes, microgreens.',
    price: 11.00,
    category: 'meals',
    subcategory: 'Toast',
    image: 'https://picsum.photos/400/400?random=5',
    tags: ['popular'],
    modifierGroups: MODIFIERS.food
  },
  {
    id: 'm2',
    name: 'Grain Bowl',
    description: 'Quinoa, kale, roasted sweet potato, tahini dressing.',
    price: 13.50,
    category: 'meals',
    subcategory: 'Bowls',
    image: 'https://picsum.photos/400/400?random=6',
    modifierGroups: MODIFIERS.food
  },
  // Desserts
  {
    id: 's1',
    name: 'Dark Chocolate Tart',
    description: '70% cacao ganache, sea salt, almond crust.',
    price: 6.50,
    category: 'desserts',
    subcategory: 'Pastry',
    image: 'https://picsum.photos/400/400?random=7',
    tags: ['new'],
    modifierGroups: []
  }
];

export const EVENTS: EventItem[] = [
  {
    id: 'e1',
    title: 'Sunday Jazz & Journals',
    date: 'OCT 15',
    time: '10:00 AM - 1:00 PM',
    type: 'Music',
    description: 'Live jazz trio accompanying a silent writing session. Bring your notebook.'
  },
  {
    id: 'e2',
    title: 'Latte Art Workshop',
    date: 'OCT 22',
    time: '6:00 PM - 8:00 PM',
    type: 'Workshop',
    description: 'Learn the basics of steaming milk and pouring hearts with our head barista.'
  },
  {
    id: 'e3',
    title: 'Poetry Slam Night',
    date: 'NOV 02',
    time: '7:00 PM - Late',
    type: 'Community',
    description: 'Open mic night for local poets and storytellers.'
  }
];

export const VIBE_IMAGES = [
  'https://picsum.photos/600/400?random=10',
  'https://picsum.photos/600/400?random=11',
  'https://picsum.photos/600/400?random=12',
  'https://picsum.photos/600/400?random=13',
];
