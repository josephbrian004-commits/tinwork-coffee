# Tinwork Coffee Roasters

React + Vite storefront. Roast dial in the hero re-sorts the menu; bag drawer with subscriptions and a simulated checkout.

## Run
```bash
npm install
npm run dev
```

## Structure
- `src/data.js`: coffees, sizes, grinds, helpers
- `src/App.jsx`: page layout, roast dial, cart state (persisted in localStorage)
- `src/components/`: `Bag.jsx`, `Product.jsx`, `Drawer.jsx`
- `src/styles.css`: design tokens (light/dark) and all styles

## Prompts to give Copilot
1. "Convert every `React.createElement` call in `src/` to JSX and keep behavior identical."
2. "Add React Router with a product detail page at `/coffee/:id`."
3. "Add Stripe Checkout: create a small Express server with `POST /api/checkout`, and call it from `Drawer.jsx` instead of the simulated order."
4. "Replace the SVG bags with product photos in `public/images`."
