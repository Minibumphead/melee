import React, { useEffect } from "react";
import ScorePanel from "../ScorePanel.jsx/ScorePanel";
import styles from './ActivePenaltyKillsPlayer.module.css';

export default function ActivePenaltyKillsPlayer({ player,
  handleClick,
  inputSelected,
  opponent,
  callKill,
  pkIndex
}) {




  return (
    <div className={styles.root} >
      <div className={styles.table_header}>
        {player.name}       </div>
      <div className={styles.table_body}>
        {
          player.penalty_scores.map((score, idx) =>
            <input
              key={idx}
              id={idx}
              className={styles.score}
              value={score.score}
              onChange={() => { alert("Please use Number Pad") }}
              onClick={(e) => {
                inputSelected.current = parseInt(e.target.id)
                e.target.select()
              }}
              onBlur={() => {
                setTimeout(() => {
                  inputSelected.current = -1
                }, 100)
              }}
            />
          )
        }
      </div>
      {/* <div className={styles.total}>{player.penalty_scores[pkIndex]}</div> */}
      <ScorePanel
        handleClick={handleClick}
        player={player}
        callKill={callKill}
      />
    </div>)

}