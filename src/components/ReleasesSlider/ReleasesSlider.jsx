import React from 'react'
import { useRef } from 'react'

import ReleasesSliderData from './ReleasesSliderData';

import styles from './ReleasesSlider.module.scss'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// import Swiper core and required modules
import { Navigation, Pagination, Autoplay } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination'
import 'swiper/css/autoplay';

const ReleasesSlider = () => {
    const sliderNavPrevRef = useRef(null);
    const sliderNavNextRef = useRef(null);

    return (
        <div className={styles.releasesSlider}>
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                navigation={{
                    prevEl: sliderNavPrevRef.current,
                    nextEl: sliderNavNextRef.current
                }}
                // onInit={(slider) => {
                //     slider.params.navigation.prevEl = sliderNavPrevRef.current;
                //     slider.params.navigation.nextEl = sliderNavNextRef.current;
                //     slider.navigation.init();
                //     slider.navigation.update();
                // }}
                grabCursor={true}
                slidesPerView={5}
                loop={true}
                spaceBetween={16}
                className={styles.releasesSliderSwiper}
                // autoplay={{delay: 3000}}
            >
                {ReleasesSliderData.map((item, index) => (
                    <SwiperSlide key={index}>
                        <ReleasesSliderItem item={item}/>
                    </SwiperSlide>
                ))};
            </Swiper>
        </div>
    )
}

const ReleasesSliderItem = props => {
    const item = props.item;
    
    return (
        <div
            className={`${styles.releasesSliderSlide} ${props.className}`}
            style={{backgroundImage: `url(${item.background})`}}
        >
            <div className={styles.releasesSliderContainer}>
                <div className={styles.releasesSliderGenre}>
                    {item.genre}
                </div>
                <div className={styles.releasesSliderRating}>
                    {item.rating}
                </div>
                <div className={styles.releasesSliderTitle}>
                    {item.title}
                </div>
            </div>
        </div>
    )
}

export default ReleasesSlider