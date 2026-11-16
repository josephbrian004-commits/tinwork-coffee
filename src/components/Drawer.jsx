export default function Drawer({ isOpen, items, onClose, onRemove, onChangeQty, onCheckout }) {
  const total = items.reduce((sum, item) => sum + item.quantity * item.price, 0);

  return (
    <>
      <div
        className={`drawer-overlay ${isOpen ? 'drawer-overlay--open' : ''}`}
        onClick={onClose}
        aria-hidden={!isOpen}
      />

      <aside className={`drawer ${isOpen ? 'drawer--open' : ''}`} aria-label="Shopping bag drawer">
        <div className="drawer__header">
          <div>
            <p className="eyebrow">Bag</p>
            <h3>Your order</h3>
          </div>
          <button className="close-button" onClick={onClose} aria-label="Close bag">×</button>
        </div>

        <div className="drawer__items">
          {items.length === 0 ? (
            <div className="empty-state">
              <p>Your bag is empty.</p>
              <span>Pick a roast and build your next ritual.</span>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="drawer-item">
                <div className="drawer-item__name">
                  <span className="dot" style={{ background: item.accent }} />
                  <div>
                    <strong>{item.name}</strong>
                    <small>{item.size} · {item.grind}</small>
                  </div>
                </div>

                <div className="drawer-item__qty">
                  <button onClick={() => onChangeQty(item.id, item.quantity - 1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => onChangeQty(item.id, item.quantity + 1)}>+</button>
                </div>

                <div className="drawer-item__meta">
                  <strong>${(item.quantity * item.price).toFixed(2)}</strong>
                  <button className="text-button" onClick={() => onRemove(item.id)}>Remove</button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="drawer__summary">
          <div>
            <span>Subtotal</span>
            <strong>${total.toFixed(2)}</strong>
          </div>
          <button className="primary-button" onClick={onCheckout}>
            Checkout · ${total.toFixed(2)}
          </button>
        </div>
      </aside>
    </>
  );
}
