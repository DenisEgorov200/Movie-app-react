import React from 'react'

import styles from './Header.module.scss'

import account from '../../assets/icon/Account.svg'
import setting from '../../assets/icon/Settings.svg'

const Header = () => {
  return <div className={styles.header}>
    <div className={styles.headerSettings}>
        <div className={`${styles.headerLogin} icon`}>
            <img src={account} alt="account" />
        </div>
        <div className={`${styles.headerSetting} icon`}>
            <img src={setting} alt="setting" />
        </div>
    </div>
  </div>
}

export default Header