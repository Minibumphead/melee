import React from "react";
import ScorePanel from "../ScorePanel.jsx/ScorePanel";
import styles from './ActivePlayer.module.css';

export default function ActivePlayer({ player,
  handleClick,
  inputSelected,
}) {


  const isDoubleParticipant = [3, 4, 8, 9].includes(player.id)

  const scores = player.scores.map(
    (score) => {
      if (isNaN(parseInt(score))) {
        return 0
      } else return parseInt(score)

    }
  )
  const sumPoints = scores.reduce((prev, curr) => prev + curr, 0)

  return (
    <div className={isDoubleParticipant ? styles.root_border : styles.root} >
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
      <div className={styles.total}>{sumPoints}</div>
      <ScorePanel
        handleClick={handleClick}
        player={player}
      />
    </div>)

}