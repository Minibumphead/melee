import React from "react";
import ScorePanel from "../ScorePanel.jsx/ScorePanel";
import styles from './ActivePlayer.module.css';

export default function ActivePlayer({ player,
  handleClick,
  inputSelected,
}) {



  return (
    <div className={styles.root} >
      <div className={styles.table_header}>
        {player.name}
      </div>
      <div className={styles.table_body}>
        {
          player.scores.map((score, idx) =>
            <input
              key={idx}
              id={idx}
              className={styles.score}
              value={score === "" ? "" : score[0]}
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
      <ScorePanel
        handleClick={handleClick}
        player={player}
      />
    </div>)

}