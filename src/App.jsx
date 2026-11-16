import { useEffect, useMemo, useState } from 'react';
import { coffeeCatalog, formatPrice, getRoastTone, grindOptions, sizeOptions } from './data';
import Product from './components/Product';
import Drawer from './components/Drawer';
import Bag from './components/Bag';

function App() {
  const [selectedRoast, setSelectedRoast] = useState('Dark');
  const [bagOpen, setBagOpen] = useState(false);
  const [size, setSize] = useState('12 oz');
  const [grind, setGrind] = useState('Whole bean');
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem('tinwork-bag');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('tinwork-bag', JSON.stringify(items));
  }, [items]);

  const filteredCatalog = useMemo(() => {
    if (!selectedRoast || selectedRoast === 'All') return coffeeCatalog;
    return coffeeCatalog.filter((coffee) => coffee.roast === selectedRoast);
  }, [selectedRoast]);

  const totalItems = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  const addToBag = (coffee) => {
    setItems((current) => {
      const existing = current.find((item) => item.id === coffee.id && item.size === size && item.grind === grind);

      if (existing) {
        return current.map((item) =>
          item.id === coffee.id && item.size === size && item.grind === grind
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [
        ...current,
        {
          id: `${coffee.id}-${size}-${grind}`,
          coffeeId: coffee.id,
          name: coffee.name,
          size,
          grind,
          price: coffee.price,
          accent: coffee.accent,
          quantity: 1
        }
      ];
    });

    setBagOpen(true);
  };

  const updateQuantity = (id, nextQty) => {
    if (nextQty <= 0) {
      setItems((current) => current.filter((item) => item.id !== id));
      return;
    }

    setItems((current) =>
      current.map((item) => (item.id === id ? { ...item, quantity: nextQty } : item))
    );
  };

  const removeItem = (id) => {
    setItems((current) => current.filter((item) => item.id !== id));
  };

  const checkout = () => {
    alert('Simulated checkout complete — thanks for supporting Tinwork.');
    setItems([]);
    setBagOpen(false);
  };

  return (
    <div className="page-shell">
      <header className="topbar">
        <div className="brand-wrap">
          <div className="brand-mark">T</div>
          <div>
            <p className="eyebrow">Tinwork</p>
            <h1>Coffee Roasters</h1>
          </div>
        </div>

        <nav className="topnav" aria-label="Main navigation">
          <a href="#shop">Shop</a>
          <a href="#story">Story</a>
          <a href="#journal">Journal</a>
        </nav>

        <button className="bag-button" onClick={() => setBagOpen(true)}>
          Bag <span>{totalItems}</span>
        </button>
      </header>

      <main>
        <section className="hero">
          <div className="hero__copy">
            <p className="eyebrow">Small-batch roasting</p>
            <h2>Dial the roast. Keep the ritual.</h2>
            <p>
              Precision-roasted beans for bright mornings, slower brews, and better conversations.
            </p>
            <div className="hero__actions">
              <a href="#shop" className="primary-button">Shop coffees</a>
              <a href="#story" className="secondary-button">Our story</a>
            </div>
            <div className="stats">
              <div><strong>14k</strong><span>bags shipped</span></div>
              <div><strong>4.9</strong><span>community rating</span></div>
              <div><strong>48h</strong><span>roast-to-ship</span></div>
            </div>
          </div>

          <div className="hero__dial-panel">
            <div className="dial-wrap">
              <div className="dial-labels">
                <span>Light</span>
                <span>Dark</span>
              </div>
              <input
                type="range"
                min={0}
                max={2}
                value={['Light', 'Medium', 'Dark'].indexOf(selectedRoast)}
                onChange={(e) => setSelectedRoast(['Light', 'Medium', 'Dark'][Number(e.target.value)])}
                aria-label="Select roast profile"
              />
              <div className="dial-readout">
                <small>Roast profile</small>
                <strong>{selectedRoast}</strong>
              </div>
            </div>
          </div>
        </section>

        <section id="shop" className="catalog-section">
          <div className="section-head">
            <div>
              <p className="eyebrow">Shop coffees</p>
              <h3>Roasts tailored to your brew.</h3>
            </div>
            <div className="selector-row">
              <label>
                <span>Size</span>
                <select value={size} onChange={(e) => setSize(e.target.value)}>
                  {sizeOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </label>

              <label>
                <span>Grind</span>
                <select value={grind} onChange={(e) => setGrind(e.target.value)}>
                  {grindOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          <div className="catalog-grid">
            {filteredCatalog.map((coffee) => (
              <Product key={coffee.id} item={coffee} onAddToBag={() => addToBag(coffee)} />
            ))}
          </div>
        </section>

        <section id="story" className="story">
          <div className="story__panel story__panel--dark">
            <p className="eyebrow">Our philosophy</p>
            <h3>Roast for clarity. Brew for ritual.</h3>
          </div>
          <div className="story__panel story__panel--light">
            <p>
              We source traceable lots and roast in small batches to highlight sweetness, origin character, and balance — no shortcuts, just better coffee.
            </p>
          </div>
        </section>

        <section id="journal" className="journal">
          <div className="journal-card">
            <p className="eyebrow">Journal</p>
            <h3>How to dial in a brighter pour over.</h3>
            <p>Start at a 1:16 ratio, match your grind to the bloom, and let the first 30 seconds bloom fully before the final pour.</p>
          </div>
          <div className="journal-card muted">
            <p className="eyebrow">Subscriptions</p>
            <h3>Fresh weekly shipments, no friction.</h3>
            <p>Choose your roast, cadence, and grind. Skip or swap anytime.</p>
          </div>
        </section>
      </main>

      <Drawer
        isOpen={bagOpen}
        items={items}
        onClose={() => setBagOpen(false)}
        onRemove={removeItem}
        onChangeQty={updateQuantity}
        onCheckout={checkout}
      />

      <footer className="footer">
        <span>Tinwork Coffee Roasters</span>
        <span>Roasted weekly · Ship free over $40</span>
      </footer>
    </div>
  );
}

export default App;
