import React, { useEffect, useContext, useState } from "react";
import SessionContext from "../../contexts/sessionContext";
import ScorePanel from "../ScorePanel.jsx/ScorePanel";
import styles from './ActivePlayer.module.css';

export default function ActivePlayer({ player,
  setCurrentPlayerOne,
  setCurrentPlayerTwo,
  handleClick,
  inputSelected,
  matchId,
  currentPlayerOne,
  currentPlayerTwo

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
              value={score[0]}
              onChange={() => { }}
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
      <ScorePanel
        handleClick={handleClick}
        player={player}
        matchId={matchId}
        currentPlayerOne={currentPlayerOne}
        currentPlayerTwo={currentPlayerTwo}
        setCurrentPlayerOne={setCurrentPlayerOne}
        setCurrentPlayerTwo={setCurrentPlayerTwo}
      />
    </div>)

}