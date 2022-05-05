import React, { useContext, useState, useEffect, useRef } from 'react'
import styles from './ScoreBoard.module.css'

import ProgressButton from './../ProgressButton/ProgressButton'
import SessionContext from '../../contexts/sessionContext'
import ActivePlayer from './../ActivePlayer/ActivePlayer'
import { STATUS_OPTIONS } from '../../data'
import { trackMatchOutcomes } from '../../helpers'

export default function ScoreBoard() {
  const [throwCountPlayerOne, setThrowCountPlayerOne] = useState(0)
  const [throwCountPlayerTwo, setThrowCountPlayerTwo] = useState(0)
  const rounds = [1, 2, 3, 4, 5]
  const playerIndex = useRef(0)
  const matches = useRef([])

  const [session, setSession] = useContext(SessionContext)


  const [currentPlayerOne, setCurrentPlayerOne] = useState(session.team_one.players[playerIndex.current])
  const [currentPlayerTwo, setCurrentPlayerTwo] = useState(session.team_two.players[playerIndex.current])


  const handleScore = (score, player) => {
    if (player.team_id === 1 && throwCountPlayerOne < 5) {

      setThrowCountPlayerOne(prevCount => prevCount + 1)
      const tempArray = [...currentPlayerOne.scores]
      tempArray[throwCountPlayerOne] = score
      setCurrentPlayerOne({ ...currentPlayerOne, scores: tempArray })

    } else if (player.team_id === 2 && throwCountPlayerTwo < 5) {
      setThrowCountPlayerTwo(prevCount => prevCount + 1)
      const tempArray = [...currentPlayerTwo.scores]
      tempArray[throwCountPlayerTwo] = score
      setCurrentPlayerTwo({ ...currentPlayerTwo, scores: tempArray })
      // need to find a way to update the session with scores for the current player after match ends
    }
  }
  const handleUndo = (score, player) => {
    if (throwCountPlayerOne === 0) {
      console.log('no undo possible')
    } else {
      if (player.team_id === 1) {
        setThrowCountPlayerOne(prevCount => prevCount - 1)
        const tempArr = [...player.scores]
        tempArr[throwCountPlayerOne] = 0

        console.log(tempArr)

      }
    }
  }





  const handleClick = (e, player) => {
    if (e.target.value !== "Undo") {
      handleScore(e.target.value, player)
      console.log('score')
    } else {
      handleUndo(e.target.value, player)
    }



  }

  useEffect(() => {
    if (throwCountPlayerOne === 5) {
      setSession(prevState => ({
        ...prevState, team_one: { ...prevState.team_one, status: STATUS_OPTIONS.slice(-1)[0] }
      }))
    }
    if (throwCountPlayerTwo === 5) {
      setSession(prevState => ({
        ...prevState, team_two: { ...prevState.team_two, status: STATUS_OPTIONS.slice(-1)[0] }
      }))
    }
    if (throwCountPlayerOne === 5 && throwCountPlayerTwo === 5) {
      trackMatchOutcomes(currentPlayerOne, currentPlayerTwo, matches)
    }
  }, [throwCountPlayerOne, throwCountPlayerTwo])


  useEffect(() => {
    if (session.team_one.status === STATUS_OPTIONS.slice(-1)[0] && session.team_two.status === STATUS_OPTIONS.slice(-1)[0])
      setSession((prevState) => ({
        ...prevState, status: STATUS_OPTIONS.slice(-1)[0]
      }))
  }, [session.team_one.status, session.team_two.status])

  useEffect(() => {

    setCurrentPlayerOne(session.team_one.players[playerIndex.current])
    setCurrentPlayerTwo(session.team_two.players[playerIndex.current])
  }, [playerIndex.current])






  return (
    <div className={styles.root}>
      {
        (currentPlayerOne && currentPlayerTwo) && (

          <div className={styles.scores_container}>
            <div className={styles.player_one_section}>
              <ActivePlayer player={currentPlayerOne} handleClick={handleClick} />
            </div>
            <div className={styles.metadata}>

              <div className={styles.meta_header}>{`M${playerIndex.current}`}</div>
              <div className={styles.meta_rounds}>
                {rounds.map(round => <div key={round} className={styles.round}>{round}</div>)}
              </div>
            </div>
            <div className={styles.player_two_section}>
              <ActivePlayer player={currentPlayerTwo} handleClick={handleClick} />
            </div>

          </div>

        )

      }

      <ProgressButton status={session.status} playerIndex={playerIndex} setThrowCountPlayerOne={setThrowCountPlayerOne} setThrowCountPlayerTwo={setThrowCountPlayerTwo} />

    </div>
    // </div>

  )
}