export default function Product({ item, onAddToBag }) {
  return (
    <article className="product-card">
      <div className="product-card__top">
        <span className="badge">{item.badge}</span>
        <span className="price">${item.price}</span>
      </div>

      <div className="product-card__visual" style={{ background: item.accent }}>
        <div className="coffee-bag">
          <span>{item.name}</span>
        </div>
      </div>

      <div className="product-card__body">
        <p className="origin">{item.origin}</p>
        <h3>{item.name}</h3>
        <p className="profile">{item.profile}</p>
        <ul>
          {item.notes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      </div>

      <button className="primary-button" onClick={() => onAddToBag(item)}>
        Add to bag
      </button>
    </article>
  );
}
