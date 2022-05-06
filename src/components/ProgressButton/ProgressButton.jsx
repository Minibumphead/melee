import React, { useContext, useEffect, useRef, useState } from "react";
import styles from './ProgressButton.module.css'
import { STATUS_OPTIONS } from "../../data";
import SessionContext from "../../contexts/sessionContext";
import { trackMatchOutcomes } from "../../helpers";

export default function ProgressButton({ throwCountPlayerOne, throwCountPlayerTwo, currentPlayerOne, currentPlayerTwo, matches, setMatches, playerIndex }) {
  const [session, setSession] = useContext(SessionContext)
  const matchId = useRef(1)



  const startMatch = () => {
    setSession((prevState) => ({
      ...prevState, status: STATUS_OPTIONS[2]
    }))
  }


  const handlePrevMatch = () => {
    const currMatchId = matchId.current - 1
    if (currMatchId > 0) {
      setSession((prevState) => ({
        ...prevState, status: `M${currMatchId}`,
        team_one: { ...prevState.team_one, status: `M${currMatchId}` },
        team_two: { ...prevState.team_two, status: `M${currMatchId}` }
      }))

      matchId.current -= 1

      playerIndex.current -= 1
    }


  }

  const handleNextMatch = () => {
    const currMatchId = matchId.current + 1
    if (throwCountPlayerOne.current === 5 && throwCountPlayerTwo.current === 5) {
      trackMatchOutcomes(currentPlayerOne, currentPlayerTwo, matches, setMatches)
    }
    if (currMatchId <= 8) {
      // setSession((prevState) => ({
      //   ...prevState, status: `M${currMatchId}`,
      //   team_one: { ...prevState.team_one, status: `M${currMatchId}` },
      //   team_two: { ...prevState.team_two, status: `M${currMatchId}` }
      // }))
      matchId.current += 1
      playerIndex.current += 1
      throwCountPlayerOne.current = 0
      throwCountPlayerTwo.current = 0

    } else if (currMatchId === 9) {
      // setSession((prevState) => ({
      //   ...prevState, status: STATUS_OPTIONS.slice(-2)[0],
      //   team_one: { ...prevState.team_one, status: STATUS_OPTIONS.slice(-2)[0] },
      //   team_two: { ...prevState.team_two, status: STATUS_OPTIONS.slice(-2)[0] }
      // }))
    }

  }
  return (
    <>

      <button className={styles.next} onClick={() => handleNextMatch()}>Next Match</button>
      <button className={styles.root} onClick={() => startMatch()}>
        Start Match
      </button>

      <button className={styles.root} onClick={() => handlePrevMatch()}>
        View Previous Match
      </button>
      <button className={styles.root} onClick={() => {
        console.log(JSON.parse(localStorage.getItem("matches")))
      }}>show local sotrage</button>
    </>)
}