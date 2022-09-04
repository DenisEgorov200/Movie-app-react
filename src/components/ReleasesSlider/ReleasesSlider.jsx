import React from 'react'
import { useState, useEffect } from 'react'

import tmdbApi, { category, movieType } from '../../api/tmdbApi'
import apiConfig from '../../api/apiConfig'

import ReleasesSliderData from './ReleasesSliderData'

import styles from './ReleasesSlider.module.scss'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// import Swiper core and required modules
import { Navigation, Pagination, Autoplay } from 'swiper'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/autoplay'

const ReleasesSlider = () => {
    const [movieItems, setMovieItems] = useState([]);

    useEffect(() => {
        const getMovies = async () => {
            const params = {page: 1}
            try {
                const response = await tmdbApi.getMoviesList(movieType.popular, {params});
                setMovieItems(response.results.slice(0, 9));
                console.log(response);
            } catch {
                console.log('error');
            }
        }
        getMovies();
    }, [])

    return (
        <div className={styles.releasesSlider}>
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                grabCursor={true}
                slidesPerView={5}
                // loop={true}
                spaceBetween={16}
                className={styles.releasesSliderSwiper}
                autoplay={{delay: 3000}}
            >
                {movieItems.map((item) => (
                    <SwiperSlide key={item.id}>
                        <ReleasesSliderItem item={item}/>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

const ReleasesSliderItem = props => {
    const item = props.item;

    const background = apiConfig.w500Image(item.backdrop_path ? item.backdrop_path : item.poster_path);

    const [genres, setGenres] = useState([]);

    useEffect(() => {
        const getGenres = async () => {
            try {
                const response = await tmdbApi.genres(category.movie, item.id);
                setGenres(response.genres);
                console.log(response);
            } catch {
                console.log('error');
            }
        }
        getGenres();
    }, [category])
    
    return (
        <div
            className={`${styles.releasesSliderSlide}`}
            style={{backgroundImage: `url(${background})`}}
        >
            <div className={styles.releasesSliderContainer}>
                <div className={styles.releasesSliderGenre}>
                    {genres.slice(0, 1).map((genre) => (
                        <span key={genre.id}>{genre.name}</span>
                    ))}
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