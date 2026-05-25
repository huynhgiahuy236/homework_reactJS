const ProductItem = ({
  item,
  handleDetail,
  setIsDetail,
  setCart,
  addProduct,
}) => {
  return (
    <article className="product-card">
      <div className="product-media">
        <span className="product-badge">In stock</span>
        <span className="product-price">${item.price}</span>
        <img src={item.image} alt={item.name} className="product-img" />
      </div>

      <div className="product-body">
        <p className="product-alias">{item.alias}</p>
        <h3>{item.name}</h3>
        <p className="product-desc">{item.shortDescription}</p>

        <div className="product-actions">
          <button
            onClick={() => handleDetail(item.id, setIsDetail)}
            className="btn btn-soft"
          >
            View detail
          </button>
          <button
            className="icon-btn icon-btn-primary"
            onClick={() => addProduct(setCart, item)}
            title="Add to cart"
          >
            <i className="fa-solid fa-cart-plus"></i>
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductItem;
