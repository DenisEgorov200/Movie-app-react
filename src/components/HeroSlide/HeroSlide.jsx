import React from 'react'
import { useRef, useState, useEffect } from 'react'

import axios from 'axios'

import apiConfig from '../../api/apiConfig'

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

const headers = {
    'Content-Type': 'application/json',
    'X-API-KEY': apiConfig.apiKey,
}

const MoviesList = () => {
    const [movieItems, setMovieItems] = useState([]);

    const sliderNavPrevRef = useRef(null);
    const sliderNavNextRef = useRef(null);

    useEffect(() => {
        axios.get(`${apiConfig.baseUrl}`, {
            headers
        })
        .then(res => {
            console.log(res);
            setMovieItems(res.data.films.splice(1, 3))
        })
        .catch(err => {
            console.log(err);
        })
    }, [])

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
                {movieItems.map((movie) => (
                    <SwiperSlide key={movie.filmId}>
                        {({ isActive=true }) => (
                            <HeroSlideItem item={movie} className={`${isActive ? `${styles.active}` : ''}`}/>
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

const HeroSlideItem = props => {
    const item = props.item;

    return (
        <div
            className={`${styles.sliderSlide} ${props.className}`}
            style={{backgroundImage: `url(${item.posterUrl})`}}
        >
            <div className={styles.sliderContainer}>
                <div className={styles.sliderGenre}>
                    {item.genre}
                </div>
                <div className={styles.sliderRating}>
                    {item.rating}
                </div>
                <div className={styles.sliderTitle}>
                    {item.nameEn}
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

export default MoviesList;