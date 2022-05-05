import React, { useContext, useState } from "react";
import ScorePanel from "../ScorePanel.jsx/ScorePanel";
import styles from './ActivePlayer.module.css';

export default function ActivePlayer({ player, handleClick }) {
  return (
    <div className={styles.root} >
      <div className={styles.table_header}>

        {player.name}
      </div>
      <div className={styles.table_body}>
        {
          player.scores.map((score, idx) => <div key={idx} className={styles.score}>{score}</div>)
        }
      </div>
      <ScorePanel handleClick={handleClick} player={player} />
    </div>)

}