import React, { useEffect, useContext } from "react";
import SessionContext from "../../contexts/sessionContext";
import ScorePanel from "../ScorePanel.jsx/ScorePanel";
import styles from './ActivePlayer.module.css';

export default function ActivePlayer({ player,
  handleClick,
  inputSelected,
}) {
  const [session, setSession] = useContext(SessionContext)
  const handleScoreChange = (e) => {
    // alert("Please use the scoring Panel to enter scores")
  }


  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Enter") {
        e.target.blur()
      }
    }
    window.addEventListener('keypress', handleKeyPress)
    return () => window.removeEventListener('keypress', handleKeyPress)
  })



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
              value={score[0]}
              onChange={handleScoreChange}
              disabled={score === "-"}
              onClick={(e) => {
                inputSelected.current = parseInt(e.target.id)
                e.target.select()
              }}
              onBlur={() => {
                setTimeout(() => {
                  inputSelected.current = -1
                }, 100)
              }}
            />)
        }
      </div>
      <ScorePanel handleClick={handleClick} player={player} />
    </div>)

}