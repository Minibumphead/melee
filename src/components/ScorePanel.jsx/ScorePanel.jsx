import React, { useState, useEffect, useContext } from "react";
import styles from './ScorePanel.module.css'
import ScoringButton from "./ScoringButton";
import SessionContext from "../../contexts/sessionContext";


export default function ScorePanel({ handleClick, player }) {
  const [session, setSession] = useContext(SessionContext)
  const [callKill, setCallKill] = useState(false)

  const isDualMatch = player.id === 3 || player.id === 4


  return (
    <div className={styles.root} >
      {!callKill ? <div>
        <div className={styles.row}>
          <ScoringButton name="0" value={0} handleClick={handleClick} player={player} status={session.status} />
          <ScoringButton name="1" value={1} handleClick={handleClick} player={player} status={session.status} />
          <ScoringButton name="2" value={2} handleClick={handleClick} player={player} status={session.status} />
        </div><div className={styles.row}>

          <ScoringButton name="3" value={3} handleClick={handleClick} player={player} status={session.status} />
          <ScoringButton name="4" value={4} handleClick={handleClick} player={player} status={session.status} />
          <ScoringButton name="5" value={5} handleClick={handleClick} player={player} status={session.status} />

        </div><div className={styles.row}>
          <ScoringButton name="6 Top" value={6} handleClick={handleClick} player={player} status={session.status} />
          <ScoringButton name="6 Middle" value={6} handleClick={handleClick} player={player} status={session.status} />
          <ScoringButton name="6 Bottom" value={6} handleClick={handleClick} player={player} status={session.status} />

        </div>
        <div className={styles.row}>
          <ScoringButton name="Drop" value={"Drop"} handleClick={handleClick} player={player} status={session.status} />
          <ScoringButton name="Fault" value={"Fault"} handleClick={handleClick} player={player} status={session.status} />
          <ScoringButton name="Undo" value={"Undo"} handleClick={handleClick} player={player} status={session.status} />
        </div>
      </div> :
        <div>
          <div className={styles.row}>
            <ScoringButton name="8 UL" value={8} handleClick={handleClick} player={player} status={session.status} />
            <ScoringButton name="8 UR" value={8} handleClick={handleClick} player={player} status={session.status} />
            <ScoringButton name="8 BL" value={8} handleClick={handleClick} player={player} status={session.status} />
            <ScoringButton name="8 BR" value={8} handleClick={handleClick} player={player} status={session.status} />


          </div>
          {isDualMatch && (
            <div className={styles.row}>
              <ScoringButton name="9 UL" value={9} handleClick={handleClick} player={player} status={session.status} />
              <ScoringButton name="9 UR" value={9} handleClick={handleClick} player={player} status={session.status} />
              <ScoringButton name="9 BL" value={9} handleClick={handleClick} player={player} status={session.status} />
              <ScoringButton name="9 BR" value={9} handleClick={handleClick} player={player} status={session.status} />
            </div>
          )}
          <div className={styles.row}>
            <ScoringButton name="0" value={0} handleClick={handleClick} player={player} status={session.status} />
            <ScoringButton name="Drop" value={"Drop"} handleClick={handleClick} player={player} status={session.status} />
            <ScoringButton name="Fault" value={"Fault"} handleClick={handleClick} player={player} status={session.status} />
            <ScoringButton name="Undo" value={"Undo"} handleClick={handleClick} player={player} status={session.status} />
          </div>
        </div>
      }
      <div className={styles.row}>
        <div
          className={styles.col + " " + styles.kill}
          onClick={() => setCallKill(!callKill)}

        > {
            callKill ? "Cancel" : "Call Kill Shot"
          }</div>
      </div>

    </div >)

}