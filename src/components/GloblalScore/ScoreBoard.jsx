import React, { useContext } from 'react'
import styles from './ScoreBoard.module.css'

import ProgressButton from './../ProgressButton/ProgressButton'
import MeleeContext from '../../contexts/meleeContext'

export default function ScoreBoard() {


  const [match, setMatch] = useContext(MeleeContext)

  return (
    <div>
      <div className={styles.root}>
        <div className={styles.global_score}>

          <div className={styles.top}>
            <div className={styles.flex_large}>Team 1</div>
            <div className={styles.flex_small} ></div>
            <div className={styles.flex_large}>Team 2</div>

          </div>
          <div className={styles.bottom}>

            <div className={styles.flex_large}>0</div>
            <div className={styles.flex_small}>
              <div className={styles.stats}>
                <div className={styles.stat_item}>HALF</div>
                <div className={styles.stat_item}>1</div>
                <div className={styles.stat_item}>Hatchet</div>

              </div>

            </div>
            <div className={styles.flex_large}>1</div>

          </div>

        </div>

      </div>
      <div className={styles.match_score}>
        <div className={styles.large_row}>
          <div className={styles.flex_large}>Player 1 Score</div>
          <div className={styles.flex_small}>M 1</div>
          <div className={styles.flex_large}>Player 1 Score</div>
        </div>
        <div className={styles.small_row}>
          <div className={styles.flex_small}>0</div>
          <div className={styles.flex_small}> 1</div>
          <div className={styles.flex_small}>0</div>
        </div>
        <div className={styles.small_row}>
          <div className={styles.flex_small}>0</div>
          <div className={styles.flex_small}>2 </div>
          <div className={styles.flex_small}>0</div>
        </div>
        <div className={styles.small_row}>
          <div className={styles.flex_small}>0</div>
          <div className={styles.flex_small}> 3</div>
          <div className={styles.flex_small}>0</div>
        </div>
        <div className={styles.small_row}>
          <div className={styles.flex_small}>0</div>
          <div className={styles.flex_small}>4</div>
          <div className={styles.flex_small}>0</div>
        </div>
        <div className={styles.small_row}>
          <div className={styles.flex_small}>0</div>
          <div className={styles.flex_small}> 5</div>
          <div className={styles.flex_small}>0</div>
        </div>
      </div>
      <ProgressButton />
    </div>
  )
}