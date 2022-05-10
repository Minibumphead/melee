import React, { useContext } from "react";
import { useNavigate } from 'react-router-dom'
import styles from './ProgressButton.module.css'
import { saveMatch } from "../../helpers";
import SessionContext from "../../contexts/sessionContext";

export default function ProgressButton({
  setCurrentPlayerOne,
  setCurrentPlayerTwo,
  currentPlayerOne,
  currentPlayerTwo,
  matches,
  setMatches,
  matchId,
}) {

  const navigate = useNavigate()
  const [session, setSession] = useContext(SessionContext)


  const startMatch = () => {
    if (session.status === "READY") {

      setSession({ ...session, status: "M1" })
      matchId.current = 1
    } else {
      alert("Please Enter 8 Players for each team.")
    }
  }

  const endSession = () => {
    saveAndNext()
    navigate('/view_result')

  }

  const saveAndPrev = () => {
    const calledBy = "prev"
    saveMatch(
      session, setSession,
      currentPlayerOne,
      setCurrentPlayerOne,

      currentPlayerTwo,

      setCurrentPlayerTwo,
      matches,
      setMatches,
      matchId,
      calledBy
    )

  }

  const saveAndNext = () => {
    const calledBy = "next"

    saveMatch(

      session, setSession,
      currentPlayerOne,

      setCurrentPlayerOne,
      currentPlayerTwo,
      setCurrentPlayerTwo,
      matches,
      setMatches,
      matchId,
      calledBy
    )
  }
  return (
    <>

      {(matchId.current < 8 && session.status !== "READY" && session.status !== "SETUP") && <button
        className={styles.next}
        onClick={() => saveAndNext()
        }
      >
        Next Match
      </button>}

      {matchId.current === 0 && (
        <button className={session.status === "READY" ? styles.root : styles.disabled} onClick={() => startMatch()}>
          Start
        </button>)

      }

      {matchId.current > 1 && (<button
        className={
          styles.root}
        onClick={() => saveAndPrev()}
      >
        View Previous Match
      </button>)}
      {
        matchId.current === 8 && (
          <button className={styles.root} onClick={endSession}>End Session</button>
        )
      }
      <a className={styles.standings} href="/view_result">View Standings</a>
      {/* <button className={styles.root} onClick={() => {
        console.log(JSON.parse(localStorage.getItem("matches")))
      }}>show local sotrage</button>
      <button className={styles.root} onClick={() => {
        console.log(localStorage.clear())
      }}>clear local sotrage</button> */}
    </>)
}