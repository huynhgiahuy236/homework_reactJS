import ProductItem from "./ProductItem";

const ProductList = ({
  data,
  handleDetail,
  setIsDetail,
  setCart,
  addProduct,
}) => {
  return (
    <main className="shoes-container product-section">
      <div className="section-heading">
        <div>
          <p className="shoes-eyebrow">Featured</p>
          <h2>Popular sneakers</h2>
        </div>
        <p>{data.length} products ready to ship</p>
      </div>

      <div className="product-grid">
        {data.map((item) => (
          <ProductItem
            key={item.id}
            item={item}
            handleDetail={handleDetail}
            setIsDetail={setIsDetail}
            setCart={setCart}
            addProduct={addProduct}
          />
        ))}
      </div>
    </main>
  );
};

export default ProductList;
