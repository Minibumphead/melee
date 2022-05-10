import React, { useState } from 'react'
import styles from './Player.module.css'
import { STATUS_OPTIONS } from '../../data'

export default function Player({ player, dir, handleChange, status }) {


  return <div className={dir === "ltr" ? styles.root : styles.root_reverse}  >
    <div className={styles.col}>{player.id}</div>
    <input className={styles.col}
      value={player.name}
      id={player.id}
      onChange={(e) => handleChange(e)}
      disabled={(status !== STATUS_OPTIONS[0]) && (status !== STATUS_OPTIONS[1]) ? true : false}
      onClick={(e) => e.target.select()}
    />
    <div className={styles.col + " " + styles.large}>{player.total_score}</div>
    <div className={styles.col}>{player.team_points}</div>
  </div>
}