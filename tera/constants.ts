import { MenuItem, NavItem } from './types';

export const APP_NAME = "Terra & Bean";

export const NAVIGATION_ITEMS: NavItem[] = [
  { label: 'Home', view: 'home' },
  { label: 'Our Story', view: 'story' },
  { label: 'Menu', view: 'menu' },
  { label: 'Careers', view: 'careers' },
  { label: 'Contact', view: 'contact' },
  { label: 'Style Guide', view: 'styleguide' },
];

export const MENU_ITEMS: MenuItem[] = [
  {
    id: '1',
    name: 'Honey Lavender Latte',
    description: 'Espresso with steamed oat milk, infused with house-made lavender syrup and local wildflower honey.',
    price: '$6.50',
    category: 'seasonal',
    image: 'https://picsum.photos/400/300?random=101'
  },
  {
    id: '2',
    name: 'Maple Pecan Cold Brew',
    description: 'Slow-steeped cold brew topped with maple-sweetened pecan cream foam.',
    price: '$5.75',
    category: 'coffee',
    image: 'https://picsum.photos/400/300?random=102'
  },
  {
    id: '3',
    name: 'Golden Turmeric Latte',
    description: 'A healing blend of turmeric, ginger, cinnamon, and black pepper whisked with coconut milk.',
    price: '$5.50',
    category: 'tea',
    image: 'https://picsum.photos/400/300?random=103'
  },
  {
    id: '4',
    name: 'Rosemary Sourdough Toast',
    description: 'Thick slice of toasted sourdough topped with smashed avocado, radish, and microgreens.',
    price: '$8.00',
    category: 'bakery',
    image: 'https://picsum.photos/400/300?random=104'
  },
  {
    id: '5',
    name: 'Cortado',
    description: 'Equal parts espresso and warm milk. Smooth, strong, and simple.',
    price: '$4.25',
    category: 'coffee',
    image: 'https://picsum.photos/400/300?random=105'
  },
  {
    id: '6',
    name: 'Cardamom Bun',
    description: 'Swedish-style twisted bun with fresh cardamom sugar glaze.',
    price: '$4.50',
    category: 'bakery',
    image: 'https://picsum.photos/400/300?random=106'
  }
];