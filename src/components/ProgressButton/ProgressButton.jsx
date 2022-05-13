import React, { useContext } from "react";
import { useNavigate } from 'react-router-dom'
import styles from './ProgressButton.module.css'
import SessionContext from "../../contexts/sessionContext";

export default function ProgressButton({
  matchId,
  setMatchId,
  throwCountPlayerOne,
  throwCountPlayerTwo
}) {

  const navigate = useNavigate()
  const [session, setSession] = useContext(SessionContext)


  const startMatch = () => {
  }

  const endSession = () => {
    navigate('/view_result')
  }

  const saveAndPrev = () => {

  }

  const saveAndNext = () => {
  }

  const handleNext = () => {
    if (matchId.current < 8) {
      setMatchId(prevId => {
        return { current: prevId.current + 1 }
      })
    }
    throwCountPlayerOne.current = 0
    throwCountPlayerTwo.current = 0
  }
  const handlePrev = () => {
    if (matchId.current > 1) {
      setMatchId(prevId => {
        return { current: prevId.current - 1 }
      })
    }
    throwCountPlayerOne.current = 5
    throwCountPlayerTwo.current = 5
  }



  return (
    <>
      <button className={styles.next} onClick={() => console.log(matchId.current)}>print matchID</button>
      <button className={styles.next} onClick={() => handleNext()}>Next</button>
      <button className={styles.next} onClick={() => handlePrev()}>Back</button>
      <button className={styles.next} onClick={() => console.log(throwCountPlayerOne)}>TC</button>


      <button className={styles.root} onClick={() => {
        console.log(localStorage.clear())
      }}>clear local storage</button>
    </>)
}