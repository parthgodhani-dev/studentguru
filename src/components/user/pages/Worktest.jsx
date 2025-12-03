import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

const Worktest = () => {
  return (
    <>
      <Swiper
        className='py-5'
        modules={[Navigation, Autoplay, Pagination]}
        loop={true}
        speed={500}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        slidesPerView={4}
        navigation={true}
        pagination={{ clickable: true }}
        breakpoints={{
          1024: {
            slidesPerView: 2,
          },
          767: {
            slidesPerView: 2,
          },
          479: {
            slidesPerView: 1,
          }
        }}
        spaceBetween={20}
      >
        <SwiperSlide>
          <div className="box">Slide 1</div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="box">Slide 2</div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="box">Slide 3</div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="box">Slide 4</div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="box">Slide 5</div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="box">Slide 6</div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="box">Slide 7</div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="box">Slide 8</div>
        </SwiperSlide>
      </Swiper>
    </>
  )
}

export default Worktest