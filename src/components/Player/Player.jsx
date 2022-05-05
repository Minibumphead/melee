import React, { useState } from 'react'
import styles from './Player.module.css'
import { STATUS_OPTIONS } from '../../data'

export default function Player({ player, dir, handleChange, status }) {

  return <div className={dir === "ltr" ? styles.root : styles.root_reverse}  >
    <div className={styles.col_short}>{player.id}</div>
    <input className={styles.col_long}
      value={player.name}
      id={player.id}
      onChange={(e) => handleChange(e)}
    // disabled={(status !== STATUS_OPTIONS[0]) && (status !== STATUS_OPTIONS[1]) ? true : false} 
    />
    <div className={styles.col}>{player.scores.reduce((prev, curr) => prev + curr, 0)}</div>
    <div className={styles.col}>{Math.floor(Math.random() * 10)}</div>
  </div>
}