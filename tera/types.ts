export type PageView = 'home' | 'story' | 'menu' | 'contact' | 'careers' | 'styleguide';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  category: 'coffee' | 'tea' | 'bakery' | 'seasonal';
  image?: string;
}

export interface NavItem {
  label: string;
  view: PageView;
}

export interface ColorSwatch {
  name: string;
  hex: string;
  variable: string;
}