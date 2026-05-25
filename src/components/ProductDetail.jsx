const ProductDetail = ({
  data,
  isDetail,
  handleDetail,
  setIsDetail,
  productId,
  setCart,
  addProduct,
}) => {
  const product = productId(data, isDetail);

  if (!product) return null;

  return (
    <section className="detail-modal">
      <div className="detail-media">
        <button
          onClick={() => handleDetail(0, setIsDetail)}
          className="icon-btn detail-close"
        >
          <i className="fa-solid fa-xmark"></i>
        </button>
        <span className="detail-stock">In stock</span>
        <img src={product.image} alt={product.name} className="detail-img" />
      </div>

      <div className="detail-content">
        <p className="shoes-eyebrow">{product.alias}</p>
        <h2>{product.name}</h2>
        <p className="detail-desc">{product.description}</p>

        <div className="detail-info-grid">
          <div className="info-box">
            <p>Price</p>
            <strong>${product.price}</strong>
          </div>
          <div className="info-box">
            <p>Quantity</p>
            <strong>{product.quantity}</strong>
          </div>
        </div>

        <div className="detail-actions">
          <button
            onClick={() => handleDetail(0, setIsDetail)}
            className="btn btn-soft"
          >
            Close
          </button>
          <button
            className="btn btn-primary"
            onClick={() => {
              addProduct(setCart, product);
              setIsDetail(0);
            }}
          >
            Add to cart
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
