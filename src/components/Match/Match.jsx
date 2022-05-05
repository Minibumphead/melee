import React, { useContext } from 'react'
import styles from './Match.module.css'
import ScoreBoard from '../GloblalScore/ScoreBoard'

export default function Match() {

  return (
    <div className={styles.root}>
      <div className={styles.tournament_name}>[Tournament name]</div>
      <ScoreBoard />
    </div>
  )
}