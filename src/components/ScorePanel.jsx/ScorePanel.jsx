import React, { useContext, useState } from "react";
import SessionContext from "../../contexts/sessionContext";
import styles from './ScorePanel.module.css'
import ScoringButton from "./ScoringButton";


export default function ScorePanel({ handleClick, player }) {
  const [callKill, setCallKill] = useState(false)


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
          <ScoringButton name="6 Top" value={6} handleClick={handleClick} player={player} />
          <ScoringButton name="6 Middle" value={6} handleClick={handleClick} player={player} />
          <ScoringButton name="6 Bottom" value={6} handleClick={handleClick} player={player} />

        </div>
        <div className={styles.row}>
          <ScoringButton name="Drop" value={"Drop"} handleClick={handleClick} player={player} />
          <ScoringButton name="Fault" value={"Fault"} handleClick={handleClick} player={player} />
          <ScoringButton name="Undo" value={"Undo"} handleClick={handleClick} player={player} />
        </div>
      </div> :
        <div>
          <div className={styles.row}>
            <ScoringButton name="8 UL" value={8} handleClick={handleClick} player={player} />
            <ScoringButton name="8 UR" value={8} handleClick={handleClick} player={player} />
            <ScoringButton name="8 BL" value={8} handleClick={handleClick} player={player} />
            <ScoringButton name="8 BR" value={8} handleClick={handleClick} player={player} />

          </div>
          <div className={styles.row}>
            <ScoringButton name="0" value={0} handleClick={handleClick} player={player} />
            <ScoringButton name="Drop" value={"Drop"} handleClick={handleClick} player={player} />
            <ScoringButton name="Fault" value={"Fault"} handleClick={handleClick} player={player} />
            <ScoringButton name="Undo" value={"Undo"} handleClick={handleClick} player={player} />
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
    </div>)

}