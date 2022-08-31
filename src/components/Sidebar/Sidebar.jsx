import React from 'react'

import SidebarData from './SidebarData'

import styles from './Sidebar.module.scss'
import logo from '../../assets/icon/Logo.svg'

const Sidebar = () => {
  return <div className={styles.sidebar}>
      <div className={styles.sidebarLogo}>
          <img src={logo} alt="Logo" />
      </div>
      <ul className={styles.sidebarList}>
        {SidebarData.map((value, index) => (
            <li
                key={index}
                className={`${styles.sidebarItem} icon`}
                onClick={()=> {
                    window.location.pathname = value.link
                }}
            >
                <img src={value.icon} alt={value.link} />
            </li>
        ))}
      </ul>
    </div>
}

export default Sidebar