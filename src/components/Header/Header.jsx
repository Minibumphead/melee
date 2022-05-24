import React from 'react'
import styles from './Header.module.css'
import meleeLogo from './../../assets/images/melee_banner.png'

export default function Header() {

  return (
    <div className={styles.root}>
      <img src={meleeLogo} alt="melee logo large" className={styles.logo} />
    </div>
  )

}