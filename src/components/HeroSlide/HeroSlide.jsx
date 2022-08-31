import React from 'react'

import HeroSliderData from './HeroSlideData';

import styles from './HeroSlide.module.scss'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';

const HeroSlide = () => {
  return <>
        <Swiper
            slidesPerView={1}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
            className={styles.slider}
        >
            {HeroSliderData.map((value, index) => (
                <SwiperSlide key={index} className={styles.sliderSlide} style={{backgroundImage: `url(${value.background})`}}>
                    <div className={styles.sliderContainer}>
                        <div className={styles.sliderGenre}>
                            {value.genre}
                        </div>
                        <div className={styles.sliderRating}>
                            {value.rating}
                        </div>
                        <div className={styles.sliderTitle}>
                            {value.title}
                        </div>
                        <div className={styles.sliderDesc}>
                            {value.desc}
                        </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
  </>
}

export default HeroSlide