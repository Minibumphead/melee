import React, { useContext, useState, useEffect, useRef } from 'react'
import styles from './ScoreBoard.module.css'

import ProgressButton from '../ProgressButton/ProgressButton'
import SessionContext from '../../contexts/sessionContext'
import ActivePlayer from '../ActivePlayer/ActivePlayer'
import { useLocalStorage, saveSession, checkOvertime } from '../../helpers'


export default function ScoreBoard({ matchId, setMatchId }) {
  const inputSelected = useRef(-1)
  const throwCountPlayerOne = useRef(0)
  const throwCountPlayerTwo = useRef(0)
  const [overtime, setOvertime] = useState(false)
  const [overtimeWinner, setOvertimeWinner] = useState(0)
  const [savedMatches, setSavedMatches] = useLocalStorage("matches", [], useState)
  const [savedSession, setSavedSession] = useLocalStorage("session", [], useState)

  const [session, setSession] = useContext(SessionContext)
  const { team_one, team_two } = session
  const matchIndex = matchId.current - 1
  const p1 = team_one.players[matchIndex]
  const p2 = team_two.players[matchIndex]

  useEffect(() => {

  }, [matchId.current])


  const handleScore = (e, player) => {

    if (player.team_id === 1) {
      if (throwCountPlayerOne.current < 5 && inputSelected.current < 0) {
        const tempArray = team_one.players
        player.scores[throwCountPlayerOne.current] = e.target.name
        tempArray[matchIndex] = player
        setSession(prevSession => ({
          ...prevSession, team_one: { ...prevSession.team_one, players: tempArray }
        }))
        throwCountPlayerOne.current += 1
      } else if (inputSelected.current >= 0) {
        const tempArray = team_one.players
        player.scores[inputSelected.current] = e.target.name
        tempArray[matchIndex] = player
        setSession(prevSession => ({
          ...prevSession, team_one: { ...prevSession.team_one, players: tempArray }
        }))
      } else if (inputSelected.current < 0 && throwCountPlayerOne.current === 5) {
        alert(`${player.name} has already completed 5 throws. To edit existing throws, please select a score and update it with the button panel. Or use the Undo button to remove the last score.`)

      } else {
        console.log('unhandled event for team one')
      }
    }

    if (player.team_id === 2) {
      if (throwCountPlayerTwo.current < 5 && inputSelected.current < 0) {
        const tempArray = team_two.players
        player.scores[throwCountPlayerTwo.current] = e.target.name
        tempArray[matchIndex] = player
        setSession(prevSession => ({
          ...prevSession, team_two: { ...prevSession.team_two, players: tempArray }
        }))
        throwCountPlayerTwo.current += 1
      }
      else if (inputSelected.current >= 0) {
        const tempArray = team_two.players
        player.scores[inputSelected.current] = e.target.name
        tempArray[matchIndex] = player
        setSession(prevSession => ({
          ...prevSession, team_two: { ...prevSession.team_two, players: tempArray }
        }))
      } else if (inputSelected.current < 0 && throwCountPlayerTwo.current === 5) {
        alert(`${player.name} has already completed 5 throws. 
      To edit existing throws, please select a score and update
       it with the button panel. Or use the Undo button to remove
        the last score.`)

      } else {
        console.log('unhandled event for team 2')
      }
    }

    if (throwCountPlayerOne.current === 5 && throwCountPlayerTwo.current === 5) {
      const overtime = checkOvertime(p1, p2)
      if (overtime) {
        setOvertime(overtime)
      } else {
        saveSession(p1, p2, setSavedMatches, setSavedSession, session, setSession)
      }
    }
  }
  const handleUndo = (e, player) => {

    if (player.team_id === 1 && throwCountPlayerOne.current > 0) {

      const tempArray = team_one.players
      player.scores[throwCountPlayerOne.current - 1] = ""
      tempArray[matchIndex] = player
      setSession(prevSession => ({
        ...prevSession, team_one: { ...prevSession.team_one, players: tempArray }
      }))
      throwCountPlayerOne.current -= 1
    } else if (player.team_id === 2 && throwCountPlayerTwo.current > 0) {

      const tempArray = team_two.players
      player.scores[throwCountPlayerTwo.current - 1] = ""
      tempArray[matchIndex] = player
      setSession(prevSession => ({
        ...prevSession, team_two: { ...prevSession.team_two, players: tempArray }
      }))
      throwCountPlayerTwo.current -= 1
    }

  }
  const handleClick = (e, player) => {
    if (e.target.value !== "Undo") {
      handleScore(e, player)

    } else {
      handleUndo(e.target, player)
    }
  }


  const handleOvertimeWin = (clickedPlayer) => {
    const opponent = clickedPlayer.team_id === 1 ?
      team_two.players[matchIndex] : team_one.players[matchIndex]
    if (!clickedPlayer.overtime_win && !opponent.overtime_win) {
      clickedPlayer.overtime_win = true
    } else {
      clickedPlayer.overtime_win = !clickedPlayer.overtime_win
      opponent.overtime_win = !opponent.overtime_win
    }
    const winner_team_id = clickedPlayer.overtime_win ?
      clickedPlayer.team_id : opponent.team_id
    setOvertimeWinner(winner_team_id)
  }

  const confirmOvertimeWin = () => {
    saveSession(p1, p2, setSavedMatches, setSavedSession, session, setSession)
    setOvertime(false)
  }

  const onClickOutside = (e) => {
    if (e.target.id === "overlay") {
      setOvertime(false)
    }
  }

  return (
    <div className={styles.root}>
      <div>
        {overtime && (<div id="overlay" className={styles.overlay} onClick={(e) => onClickOutside(e)}>
          <div className={styles.overlay_content}>

            <h1>Overtime!</h1>
            <h2>Please Select the Overtime Winner</h2>
            <button className={overtimeWinner === 1 ? styles.overtime_winner : styles.overtime_loser}
              onClick={() => handleOvertimeWin(team_one.players[matchIndex])}
            >
              {team_one.players[matchIndex].name}
            </button>
            <button className={overtimeWinner === 2 ? styles.overtime_winner : styles.overtime_loser}
              onClick={() => handleOvertimeWin(team_two.players[matchIndex])}
            >
              {team_two.players[matchIndex].name}
            </button>
            <button onClick={confirmOvertimeWin}>Confirm</button>

          </div>

        </div>)}
        {session ?
          <div className={styles.flex}>
            <ActivePlayer
              matchId={matchId}
              player={team_one.players[matchIndex]}
              handleClick={handleClick}
              inputSelected={inputSelected}
            />
            <div className={styles.metadata}>

              <div className={styles.meta_header}>{`M${matchId.current}`}</div>
              <div className={styles.meta_rounds}>
                {[1, 2, 3, 4, 5].map(round => <div key={round} className={styles.round}>{round}</div>)}
              </div>
            </div>
            <ActivePlayer
              matchId={matchId}
              player={team_two.players[matchIndex]}
              handleClick={handleClick}
              inputSelected={inputSelected}
            />
          </div >
          : 'loading'
        }

        <ProgressButton
          matchId={matchId}
          setMatchId={setMatchId}
          throwCountPlayerOne={throwCountPlayerOne}
          throwCountPlayerTwo={throwCountPlayerTwo}
        />

      </div>
    // </div>

  )
}