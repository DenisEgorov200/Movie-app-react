import React from 'react'
import { useState, useEffect } from 'react'

import tmdbApi, { category, tvType } from '../../api/tmdbApi'
import apiConfig from '../../api/apiConfig'

import styles from './ShowSlider.module.scss'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// import Swiper core and required modules
import { Navigation, Pagination, Autoplay } from 'swiper'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/autoplay'

const ShowSlider = () => {
    const [tvItems, setTvItems] = useState([]);

    useEffect(() => {
        const getTv = async () => {
            const params = {page: 1}
            try {
                const response = await tmdbApi.getTvList(tvType.popular, {params});
                setTvItems(response.results.slice(0, 9));
                console.log(response);
            } catch {
                console.log('error');
            }
        }
        getTv();
    }, [])

    return (
        <div className={styles.showSlider}>
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                grabCursor={true}
                slidesPerView={3}
                // loop={true}
                className={styles.showSliderSwiper}
                // autoplay={{delay: 3000}}
            >
                {tvItems.map((item) => (
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

    const background = apiConfig.originalImage(item.backdrop_path ? item.backdrop_path : item.poster_path);

    const [genres, setGenres] = useState([]);

    useEffect(() => {
        const getGenres = async () => {
            try {
                const response = await tmdbApi.genres(category.tv, item.id);
                setGenres(response.genres);
            } catch {
                console.log('error');
            }
        }
        getGenres();
    }, [category])
    
    return (
        <div
            className={`${styles.showSliderSlide}`}
            style={{backgroundImage: `url(${background})`}}
        >
            <div className={styles.showSliderContainer}>
                <div className={styles.showSliderGenre}>
                    {genres.slice(0, 1).map((genre) => (
                        <span key={genre.id}>{genre.name}</span>
                    ))}
                </div>
                <div className={styles.showSliderRating}>
                    {item.vote_average}
                </div>
                <div className={styles.showSliderTitle}>
                    {item.name}
                </div>
            </div>
        </div>
    )
}

export default ShowSlider