import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import SliderOneImg from "../../assets/images/banner-1.jpg";
import SliderTwoImg from "../../assets/images/banner-2.jpg";

const Hero = () => {
  return (
    <section className="section-1">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          1024: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
        }}
      >
        <SwiperSlide>
          <div
            className="content"
            style={{ backgroundImage: `url(${SliderOneImg})` }}
          ></div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="content"
            style={{ backgroundImage: `url(${SliderTwoImg})` }}
          ></div>
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default Hero;
