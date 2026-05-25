const QuantityButton = ({ quantity, onDecrease, onIncrease }) => {
  return (
    <div className="quantity-control">
      <button onClick={onDecrease} className="qty-btn qty-btn-light">
        -
      </button>

      <span>{quantity}</span>

      <button onClick={onIncrease} className="qty-btn qty-btn-dark">
        +
      </button>
    </div>
  );
};

export default QuantityButton;
