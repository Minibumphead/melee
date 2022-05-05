import React, { useContext, useRef } from "react";
import styles from './ProgressButton.module.css'
import { STATUS_OPTIONS } from "../../data";
import SessionContext from "../../contexts/sessionContext";

export default function ProgressButton({ setThrowCountPlayerOne, setThrowCountPlayerTwo, playerIndex }) {
  const [session, setSession] = useContext(SessionContext)
  const matchId = useRef(1)

  const startMatch = () => {
    console.log(playerIndex.current)
    setSession((prevState) => ({
      ...prevState, status: STATUS_OPTIONS[2]
    }))
  }


  const handleNextMatch = () => {
    const currMatchId = matchId.current + 1
    if (currMatchId <= 8) {
      setSession((prevState) => ({
        ...prevState, status: `M${currMatchId}`,
        team_one: { ...prevState.team_one, status: `M${currMatchId}` },
        team_two: { ...prevState.team_two, status: `M${currMatchId}` }
      }))
      matchId.current += 1
      playerIndex.current += 1
      setThrowCountPlayerOne(0)
      setThrowCountPlayerTwo(0)
    } else if (currMatchId === 9) {
      setSession((prevState) => ({
        ...prevState, status: STATUS_OPTIONS.slice(-2)[0],
        team_one: { ...prevState.team_one, status: STATUS_OPTIONS.slice(-2)[0] },
        team_two: { ...prevState.team_two, status: STATUS_OPTIONS.slice(-2)[0] }
      }))
    }

  }
  return (
    <>
      {session.status === STATUS_OPTIONS[1] && (
        <button className={styles.root} onClick={() => startMatch()}>
          Start Match
        </button>)
      }
      {
        (session.status === STATUS_OPTIONS.slice(-1)[0] && matchId.current < 8) && (
          <button className={styles.next} onClick={() => handleNextMatch()}>Next Match</button>
        )
      }
      {
        (matchId.current === 8) && (
          <div>The Session has ended</div>
        )
      }
    </>)
}