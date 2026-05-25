import React, { useEffect, useState } from "react";
import { apiUrl } from "../common/http";
import { Link } from "react-router-dom";

// Uses .prod-card and children — all defined in SCSS
const ProductCard = ({ product }) => (
  <Link to={`/product/${product.id}`} className="prod-card">
    <div className="prod-img-wrap">
      {/* .prod-badge .badge-new / .badge-sale defined in SCSS */}
      {product.is_new && <span className="prod-badge badge-new">New</span>}
      {product.compare_price && !product.is_new && (
        <span className="prod-badge badge-sale">Sale</span>
      )}

      <img src={product.image_url} alt={product.title} />

      {/* .prod-hover-bar defined in SCSS — shown on card hover via CSS */}
      <div className="prod-hover-bar">Quick View</div>
    </div>

    {/* .prod-info defined in SCSS */}
    <div className="prod-info">
      {/* .prod-cat defined in SCSS */}
      <div className="prod-cat">{product.category?.name}</div>

      {/* .prod-name defined in SCSS */}
      <div className="prod-name">{product.title}</div>

      {/* .prod-price / .p-cur / .p-old / .p-pct defined in SCSS */}
      <div className="prod-price">
        <span className="p-cur">${product.price}</span>
        {product.compare_price && (
          <>
            <span className="p-old">${product.compare_price}</span>
            <span className="p-pct">
              -
              {Math.round(
                ((product.compare_price - product.price) /
                  product.compare_price) *
                  100,
              )}
              %
            </span>
          </>
        )}
      </div>
    </div>
  </Link>
);

const LatestProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${apiUrl}/get-latest-products`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setProducts(result.data);
        setLoading(false);
      });
  }, []);

  return (
    <section className="py-5">
      <div className="container">
        {/* .section-hdr / .section-eyebrow / .section-heading / .section-see-all defined in SCSS */}
        <div className="section-hdr">
          <div>
            <p className="section-eyebrow">Just Dropped</p>
            <h2 className="section-heading">New Arrivals</h2>
          </div>
          <Link to="/shop" className="section-see-all">
            View All →
          </Link>
        </div>

        {/* .products-grid defined in SCSS */}
        <div className="products-grid mt-5">
          {loading
            ? [...Array(4)].map((_, i) => (
                <div key={i} className="prod-card">
                  {/* .skeleton-img / .skeleton-line / .short defined in SCSS */}
                  <div className="skeleton-img" />
                  <div className="prod-info">
                    <div className="skeleton-line mt-3" />
                    <div className="skeleton-line short mt-2" />
                  </div>
                </div>
              ))
            : products &&
              products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
        </div>
      </div>
    </section>
  );
};

export default LatestProducts;
