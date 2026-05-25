import { useCallback, useState } from "react";
import CartProduct from "./CartProduct";
import ProductDetail from "./ProductDetail";
import ProductList from "./ProductList";
import dataShoes from "../data/productShoes.json";
import { useScrollLock } from "../utils/hooks";

const ShoesStore = () => {
  const [isDetail, setIsDetail] = useState(0);
  const [isCart, setIsCart] = useState(false);
  const [cart, setCart] = useState([]);

  useScrollLock(isCart);

  const findProductById = useCallback((data, id) => {
    return data.find((item) => item.id === id);
  }, []);

  const handleDetail = useCallback((productId, setState) => {
    setState(productId);
  }, []);

  const addProduct = useCallback((setState, item) => {
    setState((prev) => {
      const existed = prev.find((product) => product.id === item.id);

      if (existed) {
        return prev.map((product) =>
          product.id === item.id
            ? { ...product, quantity: product.quantity + 1 }
            : product,
        );
      }

      return [...prev, { ...item, quantity: 1 }];
    });
  }, []);

  const sumProduct = useCallback(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  return (
    <div className="shoes-app">
      <header className="shoes-header">
        <div className="shoes-container shoes-nav">
          <div>
            <p className="shoes-eyebrow">Sneaker Studio</p>
            <h1 className="shoes-logo">BT Shoes</h1>
          </div>

          <button className="cart-open-btn" onClick={() => setIsCart(!isCart)}>
            <span className="cart-count">{sumProduct()}</span>
            <i className="fa-solid fa-bag-shopping"></i>
            Cart
          </button>
        </div>
      </header>

      <section className="shoes-container hero-wrap">
        <div className="hero-panel">
          <div>
            <p className="hero-eyebrow">New collection</p>
            <h2 className="hero-title">Chọn đôi giày hợp vibe của bạn.</h2>
            <p className="hero-desc">
              Danh sách các mẫu giày thể thao mới nhất, đa dạng về kiểu dáng và màu sắc, phù hợp với mọi phong cách và sở thích của bạn. Hãy khám phá ngay để tìm ra đôi giày hoàn hảo cho bạn!
            </p>
          </div>

          <div className="hero-stat-wrap">
            <div className="hero-stat">
              <p>Số lượng mẫu lên đến</p>
              <strong >{dataShoes.length}</strong>
            </div>
          </div>
        </div>
      </section>

      {isCart && (
        <div>
          <div
            className="modal-overlay modal-overlay-cart"
            onClick={() => setIsCart(false)}
          ></div>
          <CartProduct
            cart={cart}
            setIsCart={setIsCart}
            setCart={setCart}
            dataShoes={dataShoes}
          />
        </div>
      )}

      <ProductList
        data={dataShoes}
        setCart={setCart}
        isDetail={isDetail}
        setIsDetail={setIsDetail}
        handleDetail={handleDetail}
        addProduct={addProduct}
      />

      {isDetail !== 0 && (
        <>
          <div
            className="modal-overlay modal-overlay-detail"
            onClick={() => setIsDetail(0)}
          ></div>
          <div className="detail-modal-shell">
            <ProductDetail
              addProduct={addProduct}
              data={dataShoes}
              isDetail={isDetail}
              productId={findProductById}
              setIsDetail={setIsDetail}
              handleDetail={handleDetail}
              setCart={setCart}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ShoesStore;
