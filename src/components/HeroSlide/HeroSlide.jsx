import React from 'react'
import { useRef, useState, useEffect } from 'react'

import tmdbApi, { category, movieType } from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';

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

const MoviesList = () => {
    const [movieItems, setMovieItems] = useState([]);

    const sliderNavPrevRef = useRef(null);
    const sliderNavNextRef = useRef(null);

    useEffect(() => {
        const getMovies = async () => {
            const params = {page: 1}
            try {
                const response = await tmdbApi.getMoviesList(movieType.popular, {params});
                setMovieItems(response.results.slice(0, 3));
                console.log(response);
            } catch {
                console.log('error');
            }
        }
        getMovies();
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
                // autoplay={{delay: 3000}}
            >
                {movieItems.map((movie) => (
                    <SwiperSlide key={movie.id}>
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

    const background = apiConfig.originalImage(item.backdrop_path ? item.backdrop_path : item.poster_path);

    const [genres, setGenres] = useState([]);

    useEffect(() => {
        const getGenres = async () => {
            try {
                const response = await tmdbApi.genres(category.movie, item.id);
                setGenres(response.genres);
            } catch {
                console.log('error');
            }
        }
        getGenres();
    }, [category])

    return (
        <div
            className={`${styles.sliderSlide} ${props.className}`}
            style={{backgroundImage: `url(${background})`}}
        >
            <div className={styles.sliderContainer}>
                <div className={styles.sliderGenre}>
                    {genres.slice(0, 3).map((genre) => (
                        <span key={genre.id}>{genre.name}</span>
                    ))}
                </div>
                <div className={styles.sliderRating}>
                    {item.vote_average}
                </div>
                <div className={styles.sliderTitle}>
                    {item.title}
                </div>
                <div className={styles.sliderDesc}>
                    {item.overview}
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