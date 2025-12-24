/**
 * @fileoverview Menu and cart type definitions
 * @module types/menu
 *
 * @description
 * Type definitions for menu items, cart items, modifiers, and menu navigation.
 * Used throughout the menu and cart features.
 */

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  section: 'drinks' | 'meals' | 'desserts';
  subcategory?: string;
  tag?: 'popular' | 'seasonal' | 'new';
}

export interface SelectedModifier {
  groupId: string;
  groupName: string;
  optionLabel: string;
  priceDelta: number;
}

export interface CartItem extends MenuItem {
  cartId: string;
  modifiers: SelectedModifier[];
  notes: string;
  totalPrice: number;
  quantity: number;
}

export type ViewState = 'HOME' | 'MENU';

export interface ModifierOption {
  label: string;
  priceDelta: number;
}

export interface ModifierGroup {
  id: string;
  name: string;
  type: 'select' | 'radio' | 'checkbox';
  options: ModifierOption[];
  required?: boolean;
  maxSelections?: number; // For checkboxes
  description?: string; // e.g. "Choose up to 2"
}
