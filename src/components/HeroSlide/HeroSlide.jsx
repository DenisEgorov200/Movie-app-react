import React from 'react'
import { useRef } from 'react'

import getMovies from '../../api/apiClient'

import Button from '../Button/Button'
import HeroSliderData from './HeroSlideData'

import styles from './HeroSlide.module.scss'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// import Swiper core and required modules
import { Navigation, Pagination, Autoplay } from 'swiper'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination'
import 'swiper/css/autoplay';

const HeroSlide = () => {
    const sliderNavPrevRef = useRef(null);
    const sliderNavNextRef = useRef(null);

    return (
        <div className={styles.slider}>
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                navigation={{
                    prevEl: sliderNavPrevRef.current,
                    nextEl: sliderNavNextRef.current
                }}
                onInit={(slider) => {
                    slider.params.navigation.prevEl = sliderNavPrevRef.current;
                    slider.params.navigation.nextEl = sliderNavNextRef.current;
                    slider.navigation.init();
                    slider.navigation.update();
                }}
                grabCursor={true}
                slidesPerView={1}
                loop={true}
                className={styles.sliderSwiper}
                pagination={{ 
                    clickable: true,
                    el: `.${styles.sliderPagination}`,
                    bulletClass: `${styles.sliderPaginationBullet}`,
                    bulletActiveClass: `${styles.sliderPaginationBulletActive}`,
                    type: 'bullets',
                }}
                autoplay={{delay: 3000}}
            >
                {HeroSliderData.map((value, index) => (
                    <SwiperSlide key={index}>
                        {({ isActive=true }) => (
                            <HeroSlideItem item={value} className={`${isActive ? `${styles.active}` : ''}`}/>
                        )}
                    </SwiperSlide>
                ))}
                
                <div className={styles.sliderNavPrev} ref={sliderNavPrevRef}></div>
                <div className={styles.sliderNavNext} ref={sliderNavNextRef}></div>
                <div className={styles.sliderPagination}>
                </div>
            </Swiper>
        </div>
    )
}

export const HeroSlideItem = props => {
    const item = props.item;

    return (
        <div
            className={`${styles.sliderSlide} ${props.className}`}
            style={{backgroundImage: `url(${item.background})`}}
        >
            <div className={styles.sliderContainer}>
                <div className={styles.sliderGenre}>
                    {item.genre}
                </div>
                <div className={styles.sliderRating}>
                    {item.rating}
                </div>
                <div className={styles.sliderTitle}>
                    {item.title}
                </div>
                <div className={styles.sliderDesc}>
                    {item.desc}
                </div>
                <Button
                    className={styles.sliderButton} 
                    onClick={() => console.log('click')}>
                    Watch Now
                </Button>
            </div>
        </div>
    )  
}

export default HeroSlide;