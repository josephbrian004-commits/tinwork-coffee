import { useMemo } from 'react';

function Bag({ item, onRemove, onChangeQty }) {
  const subtotal = useMemo(() => item.quantity * item.price, [item]);

  return (
    <div className="bag-item">
      <div className="bag-item__meta">
        <div className="bag-item__dot" style={{ background: item.accent }} />
        <div>
          <h4>{item.name}</h4>
          <p>{item.size} · {item.grind}</p>
        </div>
      </div>

      <div className="bag-item__controls">
        <button onClick={() => onChangeQty(item.id, item.quantity - 1)} aria-label={`Decrease ${item.name}`}>
          −
        </button>
        <span>{item.quantity}</span>
        <button onClick={() => onChangeQty(item.id, item.quantity + 1)} aria-label={`Increase ${item.name}`}>
          +
        </button>
      </div>

      <div className="bag-item__price-wrap">
        <strong>{`$${subtotal.toFixed(2)}`}</strong>
        <button className="text-button" onClick={() => onRemove(item.id)}>Remove</button>
      </div>
    </div>
  );
}

export default Bag;
