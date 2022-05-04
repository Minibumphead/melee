import React, { useContext } from 'react'
import styles from './Match.module.css'
import ScoreBoard from '../GloblalScore/ScoreBoard'
import MeleeContext from '../../contexts/meleeContext'

export default function Match() {
  const [match, setMatch] = useContext(MeleeContext)

  return (
    <div className={styles.root}>
      <div className={styles.tournament_name}>[Tournament name]</div>

      <ScoreBoard />

    </div>
  )
}