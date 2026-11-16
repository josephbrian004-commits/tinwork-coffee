export const coffeeCatalog = [
  {
    id: 'midnight-roast',
    name: 'Midnight Roast',
    origin: 'Colombia · Huila',
    profile: 'Dark chocolate, fig, cinnamon',
    price: 28,
    roast: 'Dark',
    notes: ['Espresso', 'French press', 'Cold brew'],
    accent: '#1e1b1b',
    badge: 'Best seller'
  },
  {
    id: 'sunrise-blend',
    name: 'Sunrise Blend',
    origin: 'Ethiopia · Yirgacheffe',
    profile: 'Citrus bloom, mango, honey',
    price: 24,
    roast: 'Light',
    notes: ['Pour over', 'AeroPress', 'Bloom'],
    accent: '#d58a46',
    badge: 'Seasonal'
  },
  {
    id: 'cinder-house',
    name: 'Cinder House',
    origin: 'Guatemala · Antigua',
    profile: 'Toffee, cocoa nib, orange zest',
    price: 26,
    roast: 'Medium',
    notes: ['Drip', 'Cappuccino', 'Latte'],
    accent: '#9d4f3a',
    badge: 'New'
  },
  {
    id: 'wild-bloom',
    name: 'Wild Bloom',
    origin: 'Kenya · Nyeri',
    profile: 'Berry, plum, jasmine',
    price: 30,
    roast: 'Light',
    notes: ['Filter', 'Pour over', 'Tea-like'],
    accent: '#587f69',
    badge: 'Limited'
  }
];

export const grindOptions = ['Whole bean', 'Espresso', 'Pour over', 'French press'];
export const sizeOptions = ['12 oz', '16 oz', '20 oz'];

export const formatPrice = (value) => `$${value.toFixed(2)}`;

export const getRoastTone = (roast) => {
  const tones = {
    Light: '#d6813d',
    Medium: '#a5673d',
    Dark: '#29211d'
  };

  return tones[roast] || '#1b1b1b';
};
