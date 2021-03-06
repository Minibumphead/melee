import React, { useState, useEffect, useContext } from "react";
import styles from './ScorePanel.module.css'
import ScoringButton from "./ScoringButton";
import SessionContext from "../../contexts/sessionContext";


export default function ScorePanel({ handleClick, player, callKill }) {
  const [session, setSession] = useContext(SessionContext)

  const isDualMatch = (player.id === 3 || player.id === 4 || player.id === 8 || player.id === 9) && !(session.half === "pk")



  return (
    <div className={styles.root} >
      {!callKill ? <div>
        <div className={styles.row}>
          <ScoringButton name="0" value={0} handleClick={handleClick} player={player} />
          <ScoringButton name="1" value={1} handleClick={handleClick} player={player} />
          <ScoringButton name="2" value={2} handleClick={handleClick} player={player} />
        </div><div className={styles.row}>

          <ScoringButton name="3" value={3} handleClick={handleClick} player={player} />
          <ScoringButton name="4" value={4} handleClick={handleClick} player={player} />
          <ScoringButton name="5" value={5} handleClick={handleClick} player={player} />

        </div><div className={styles.row}>
          <ScoringButton name="6 T" value={6} handleClick={handleClick} player={player} />
          <ScoringButton name="6 M" value={6} handleClick={handleClick} player={player} />
          <ScoringButton name="6 B" value={6} handleClick={handleClick} player={player} />

        </div>
        <div className={styles.row}>
          <ScoringButton name="Drop" value={"Drop"} handleClick={handleClick} player={player} />
          <ScoringButton name="Fault" value={"Fault"} handleClick={handleClick} player={player} />
          <ScoringButton name="Undo" value={"Undo"} handleClick={handleClick} player={player} />
        </div>
      </div> :
        <div>
          <div className={styles.row}>
            <ScoringButton name="8 TL" value={8} handleClick={handleClick} player={player} />
            <ScoringButton name="8 TR" value={8} handleClick={handleClick} player={player} />
            <ScoringButton name="8 BL" value={8} handleClick={handleClick} player={player} />
            <ScoringButton name="8 BR" value={8} handleClick={handleClick} player={player} />
          </div>
          {isDualMatch && (
            <div className={styles.row}>
              <ScoringButton name="9 TL" value={9} handleClick={handleClick} player={player} />
              <ScoringButton name="9 TR" value={9} handleClick={handleClick} player={player} />
              <ScoringButton name="9 BL" value={9} handleClick={handleClick} player={player} />
              <ScoringButton name="9 BR" value={9} handleClick={handleClick} player={player} />
            </div>
          )}
          <div className={styles.row}>
            <ScoringButton name="0 K" value={0} handleClick={handleClick} player={player} />
            <ScoringButton name="Drop K" value={"Drop"} handleClick={handleClick} player={player} />
            <ScoringButton name="Fault K" value={"Fault"} handleClick={handleClick} player={player} />
            <ScoringButton name="Undo" value={"Undo"} handleClick={handleClick} player={player} />
          </div>
        </div>
      }
    </div >)

}