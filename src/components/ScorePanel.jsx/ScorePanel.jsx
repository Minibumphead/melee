import React, { useState, useEffect, useContext } from "react";
import styles from './ScorePanel.module.css'
import ScoringButton from "./ScoringButton";
import { saveMatch } from "../../helpers";
import SessionContext from "../../contexts/sessionContext";


export default function ScorePanel({ handleClick, player, matchId, currentPlayerOne, currentPlayerTwo, setCurrentPlayerOne, setCurrentPlayerTwo }) {
  const [session, setSession] = useContext(SessionContext)
  const [callKill, setCallKill] = useState(false)
  const [overtime, setOvertime] = useState(false)



  useEffect(() => {
    if (currentPlayerOne.total_score === currentPlayerTwo.total_score) {
      setOvertime(true)
    } else {
      setOvertime(false)
      setCurrentPlayerOne({ ...currentPlayerOne, overtimeWin: false })
      setCurrentPlayerTwo({ ...currentPlayerTwo, overtimeWin: false })
    }
  }, [currentPlayerOne.win, currentPlayerTwo.win, currentPlayerTwo.scores, currentPlayerOne.scores, currentPlayerOne.status])


  const handleOvertime = () => {
    if (player.team_id === 1) {
      setCurrentPlayerOne(prevPlayer => ({ ...prevPlayer, overtimeWin: !prevPlayer.overtimeWin }))
    } else if (player.team_id === 2) {

      setCurrentPlayerTwo(prevPlayer => ({ ...prevPlayer, overtimeWin: !prevPlayer.overtimeWin }))
    }

  }


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

      {overtime ? <button className={player.overtimeWin ? styles.win : styles.lost} onClick={() => handleOvertime()}>Overtime Win</button> : null
      }
    </div >)

}