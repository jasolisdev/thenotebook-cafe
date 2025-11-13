# Menu Category Icons

Place your 6 SVG files in this directory with these exact names:

## Required SVG Files:

1. **espresso.svg** - For Espresso category items
2. **latte.svg** - For Latte / Signature category items
3. **cold-brew.svg** - For Cold Brew category items
4. **tea.svg** - For Tea / Matcha category items
5. **food.svg** - For Pastry / Food category items
6. **seasonal.svg** - For Seasonal / Limited category items

## Recommended SVG Specifications:

- **Size**: Square (e.g., 24x24px, 32x32px, or 64x64px viewBox)
- **Format**: Clean SVG with single color
- **Color**: Use `currentColor` or a brown tone like `#5a4a38` to match the theme
- **Style**: Simple line art or filled icons that work at small sizes

## Display Size:

These icons will be displayed at **28x28px** (w-7 h-7) inside a 56x56px container with:
- Light beige background (#f4f0e9 with 10% opacity)
- Gold border (#c99a58 with 20% opacity)
- Centered with object-contain

## Fallback Behavior:

If a category is not set or an SVG file is missing:
- **Drinks section** → uses `espresso.svg`
- **Meals section** → uses `food.svg`
- **Desserts section** → uses `seasonal.svg`
