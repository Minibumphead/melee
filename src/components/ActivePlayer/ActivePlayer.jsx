import React from "react";
import ScorePanel from "../ScorePanel.jsx/ScorePanel";
import styles from './ActivePlayer.module.css';
import { cleanScores, totalScores } from "../../helpers";

export default function ActivePlayer({ player,
  handleClick,
  inputSelected,
  opponent,
  callKill, setCallKIll
}) {


  const isDoubleParticipant = [3, 4, 8, 9].includes(player.id)
  const cleaned_scores_array = cleanScores(player.scores, opponent.scores)
  const [total_player, total_opp] = totalScores(cleaned_scores_array)
  const delta = total_player - total_opp

  return (
    <div className={isDoubleParticipant ? styles.root_border : styles.root} >
      <div className={styles.table_header}>
        {player.name} ({delta > 0 ? `+${delta}` : delta})
      </div>
      <div className={styles.table_body}>
        {
          player.scores.slice(0, 5).map((score, idx) =>
            <input
              key={idx}
              id={idx}
              className={score.slice(0) > 7 ? styles.killshot_score : styles.score}
              value={score === "" ? "" : score.slice(0, 3)}
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
      <div className={styles.total}>{total_player}</div>
      <ScorePanel
        handleClick={handleClick}
        player={player}
        callKill={callKill}
        setCallKill={setCallKIll}
      />
    </div>)

}