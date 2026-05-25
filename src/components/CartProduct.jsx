import QuantityButton from "./QuantityButton";
import {
  CONFIRM_DELETE_MESSAGE,
  MIN_QUANTITY,
  TAX_RATE,
} from "../utils/constants";

const CartProduct = ({ cart, setIsCart, setCart, dataShoes }) => {
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;

  const decrease = (id) => {
    setCart((prev) =>
      prev.map((product) =>
        product.id === id
          ? {
              ...product,
              quantity: Math.max(product.quantity - 1, MIN_QUANTITY),
            }
          : product,
      ),
    );
  };

  const increase = (id) => {
    const productInStore = dataShoes.find((item) => item.id === id);
    if (!productInStore) return;

    setCart((prev) =>
      prev.map((product) =>
        product.id === id
          ? {
              ...product,
              quantity: Math.min(product.quantity + 1, productInStore.quantity),
            }
          : product,
      ),
    );
  };

  const remove = (id) => {
    if (!confirm(CONFIRM_DELETE_MESSAGE)) return;
    setCart((prev) => prev.filter((product) => product.id !== id));
  };

  return (
    <aside className="cart-modal">
      <div className="cart-layout">
        <section className="cart-main">
          <div className="cart-head">
            <div>
              <p className="shoes-eyebrow">Your bag</p>
              <h2>Shopping cart</h2>
            </div>
            <button
              onClick={() => setIsCart(false)}
              className="icon-btn icon-btn-outline"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>

          <div className="cart-body">
            {cart.length === 0 ? (
              <div className="empty-cart">
                <div>
                  <i className="fa-solid fa-bag-shopping"></i>
                  <p>Your cart is empty</p>
                  <span>Pick a pair and it will show up here.</span>
                </div>
              </div>
            ) : (
              <div className="cart-list">
                {cart.map((product) => (
                  <article key={product.id} className="cart-item">
                    <div className="cart-item-media">
                      <img src={product.image} alt={product.name} />
                    </div>

                    <div className="cart-item-info">
                      <p>{product.name}</p>
                      <span>${product.price}</span>
                      <div className="cart-qty">
                        <QuantityButton
                          quantity={product.quantity}
                          onDecrease={() => decrease(product.id)}
                          onIncrease={() => increase(product.id)}
                        />
                      </div>
                    </div>

                    <div className="cart-item-total">
                      <p>${(product.price * product.quantity).toFixed(2)}</p>
                      <button
                        onClick={() => remove(product.id)}
                        className="icon-btn remove-btn"
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="cart-summary">
          <div className="total-card hidden md:block">
            <p>Order total</p>
            <strong>${total.toFixed(2)}</strong>
          </div>

          <div className="summary-lines">
            <div>
              <span>Subtotal</span>
              <strong>${subtotal.toFixed(2)}</strong>
            </div>
            <div>
              <span>Tax</span>
              <strong>${tax.toFixed(2)}</strong>
            </div>
            <div>
              <span>Shipping</span>
              <strong className="free-tag">Free</strong>
            </div>
          </div>

          <div className="summary-divider"></div>

          <input placeholder="Promo code" className="promo-input" />
          <button className="btn btn-soft btn-block">Apply code</button>
          <button className="btn btn-primary btn-block">Checkout</button>
        </section>
      </div>
    </aside>
  );
};

export default CartProduct;
