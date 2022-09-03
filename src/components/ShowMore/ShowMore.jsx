import React from 'react'

import styles from './ShowMore.module.scss'

import arrow from '../../assets/icon/Arrow.svg'

const ShowMore = props => {
  return (
    <a href='#'
        className={`${styles.showMore} ${props.className}`}
    >
        <span>
            {props.children}
        </span>
        <div className={styles.showMoreImg}>
            <img src={arrow} alt="arrow"/>
        </div>  
    </a>
  )
}

export default ShowMore