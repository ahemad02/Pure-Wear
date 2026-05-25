import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import SliderOneImg from "../../assets/images/banner-1.jpg";
import SliderTwoImg from "../../assets/images/banner-2.jpg";

const Hero = () => {
  return (
    <section className="hero-section">
      <div className="hero-grid">
        {/* Left editorial panel */}
        <div className="hero-editorial">
          {/* .hero-eyebrow is defined in SCSS */}
          <span className="hero-eyebrow">New Collection — SS 2026</span>

          {/* .hero-title is defined in SCSS */}
          <h1 className="hero-title">
            Dressed
            <br />
            for Every
            <br />
            <em>Chapter</em>
          </h1>

          {/* .hero-subtitle is defined in SCSS */}
          <p className="hero-subtitle">
            Curated fashion for women, men &amp; kids. Timeless pieces,
            contemporary spirit.
          </p>

          {/* .hero-ctas is defined in SCSS */}
          <div className="hero-ctas">
            {/* .btn.btn-primary is defined in SCSS */}
            <a href="/shop" className="btn btn-primary">
              Shop Now
            </a>
            {/* .btn.btn-secondary is defined in SCSS */}
            <a href="/collections" className="btn btn-secondary">
              Explore Lookbook
            </a>
          </div>

          {/* .hero-stats is defined in SCSS */}
          <div className="hero-stats">
            <div className="h-stat">
              <span className="num">2K+</span>
              <span className="lbl">Products</span>
            </div>
            <div className="h-stat">
              <span className="num">50K+</span>
              <span className="lbl">Happy Customers</span>
            </div>
            <div className="h-stat">
              <span className="num">4.9★</span>
              <span className="lbl">Rated</span>
            </div>
          </div>
        </div>

        {/* Right swiper — .hero-visual is defined in SCSS */}
        <div className="hero-visual">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={0}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            className="hero-swiper"
          >
            <SwiperSlide>
              {/* inline style drives background; .slide-tag / .slide-tag-label / .slide-tag-price are in SCSS */}
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundImage: `url(${SliderOneImg})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  position: "relative",
                }}
              >
                <div className="slide-tag">
                  <span className="slide-tag-label">Starting from</span>
                  <span className="slide-tag-price">$29.99</span>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundImage: `url(${SliderTwoImg})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  position: "relative",
                }}
              >
                <div className="slide-tag">
                  <span className="slide-tag-label">Shop the look</span>
                  <span className="slide-tag-price">New In</span>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Hero;
