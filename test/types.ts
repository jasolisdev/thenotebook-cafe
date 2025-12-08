export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'drinks' | 'meals' | 'desserts';
  subcategory: string;
  image: string;
  tags?: ('popular' | 'seasonal' | 'new')[];
  modifierGroups?: ModifierGroup[];
}

export interface ModifierGroup {
  id: string;
  name: string;
  type: 'select' | 'radio' | 'checkbox';
  required: boolean;
  maxSelections?: number;
  options: ModifierOption[];
}

export interface ModifierOption {
  id: string;
  name: string;
  price?: number;
}

export interface CartItem {
  cartId: string; // unique id for the cart entry
  item: MenuItem;
  quantity: number;
  modifiers: Record<string, string[]>; // groupId -> optionIds
  notes: string;
  totalPrice: number;
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  time: string;
  type: string; // e.g., "Music", "Workshop"
  description: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}