import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper/modules";
import style from "./my.module.css";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import Interest from "./interest";
import Job from "./job";
import Intro from "./intro";

export default function My() {
  return (
    <>
      <Swiper
        effect="coverflow"
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
        }}
        modules={[EffectCoverflow, Pagination]}
        className={style.mySwiper}
      >
        <SwiperSlide className={style.swiperSlide}>
          <Interest></Interest>
        </SwiperSlide>
        <SwiperSlide className={style.swiperSlide}>
          <Job></Job>
        </SwiperSlide>
        <SwiperSlide className={style.swiperSlide}>
          <Intro></Intro>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
