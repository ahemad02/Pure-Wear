import React, { useEffect, useState } from "react";
import { apiUrl } from "../common/http";
import { Link } from "react-router-dom";

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${apiUrl}/get-featured-products`, {
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

  if (loading) {
    return (
      // .section-featured defined in SCSS
      <section className="section-featured">
        <div className="container">
          {/* .section-hdr / .section-eyebrow / .section-heading defined in SCSS */}
          <div className="section-hdr">
            <div>
              <p className="section-eyebrow">Editor's Pick</p>
              <h2 className="section-heading">Featured Products</h2>
            </div>
          </div>
          <div className="row mt-4">
            {[...Array(4)].map((_, i) => (
              <div className="col-md-3 col-6" key={i}>
                {/* .skeleton-img / .skeleton-line / .short defined in SCSS */}
                <div className="skeleton-img" />
                <div className="skeleton-line mt-3" />
                <div className="skeleton-line short mt-2" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // First product is the big hero card, rest go in the 2×2 grid
  const [hero, ...rest] = products || [];

  return (
    // .section-featured defined in SCSS
    <section className="section-featured">
      <div className="container">
        {/* .section-hdr / .section-eyebrow / .section-heading / .section-see-all defined in SCSS */}
        <div className="section-hdr">
          <div>
            <p className="section-eyebrow">Editor's Pick</p>
            <h2 className="section-heading">Featured Products</h2>
          </div>
          <Link to="/shop" className="section-see-all">
            View All →
          </Link>
        </div>

        {/* .featured-layout defined in SCSS */}
        <div className="featured-layout">
          {/* Big hero card — .feat-card .feat-card--big defined in SCSS */}
          {hero && (
            <Link
              to={`/product/${hero.id}`}
              className="feat-card feat-card--big"
            >
              {/* .feat-card__img defined in SCSS */}
              <div className="feat-card__img">
                <img src={hero.image_url} alt={hero.title} />
              </div>
              {/* .feat-card__body / __cat / __name / __price defined in SCSS */}
              <div className="feat-card__body">
                <span className="feat-card__cat">{hero.category?.name}</span>
                <h3 className="feat-card__name">{hero.title}</h3>
                <div className="feat-card__price">
                  {/* .price-cur / .price-old defined in SCSS */}
                  <span className="price-cur">${hero.price}</span>
                  {hero.compare_price && (
                    <span className="price-old">${hero.compare_price}</span>
                  )}
                </div>
              </div>
            </Link>
          )}

          {/* Right 2×2 grid — .feat-grid defined in SCSS */}
          <div className="feat-grid">
            {rest.slice(0, 4).map((product) => (
              // Small card variant — .feat-card .feat-card--sm defined in SCSS
              <Link
                to={`/product/${product.id}`}
                className="feat-card feat-card--sm"
                key={product.id}
              >
                <div className="feat-card__img">
                  <img src={product.image_url} alt={product.title} />
                </div>
                <div className="feat-card__body">
                  <span className="feat-card__cat">
                    {product.category?.name}
                  </span>
                  <h4 className="feat-card__name">{product.title}</h4>
                  <div className="feat-card__price">
                    <span className="price-cur">${product.price}</span>
                    {product.compare_price && (
                      <span className="price-old">
                        ${product.compare_price}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
