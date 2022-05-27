
import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './ScoreBoard.module.css'

import ProgressButton from '../ProgressButton/ProgressButton'
import SessionContext from '../../contexts/sessionContext'
import ActivePlayer from '../ActivePlayer/ActivePlayer'
import { Overtime, DualsOvertime } from '../Overtime/Overtime'
import { useLocalStorage, saveSession, saveSessionAfterDual, checkOvertime, checkDualsOvertime, getDisciplineFromId } from '../../helpers'


function ScoreBoard({
  session,
  setSession,
  matchId,
  setMatchId,
  throwCountPlayerOne,
  throwCountPlayerTwo,
  throwCountPartnerOne,
  throwCountPartnerTwo,
  savedSession,
  setSavedSession,
  halftime,
  setHalftime

}) {

  const navigate = useNavigate()
  const halftimeCount = useRef(0)
  const inputSelected = useRef(-1)


  const [overtime, setOvertime] = useState(false)
  const [savedMatches, setSavedMatches] = useLocalStorage("matches", [], useState)
  const [duals, setDuals] = useState(false)
  const [callKill, setCallKill] = useState(false)

  const { team_one, team_two } = session
  const matchIndex = matchId.current - 1
  const p1 = team_one.players[matchIndex]
  const p1_partner = team_one.players[matchIndex + 1]
  const p2 = team_two.players[matchIndex]
  const p2_partner = team_two.players[matchIndex + 1]



  useEffect(() => {
    const half = (matchId.current <= 5 && halftimeCount.current === 0) ? 1 : 2
    if (matchId.current === 3 || matchId.current === 8) {
      setDuals(true)
    } else {
      setDuals(false)
    }
    // handle fetching from LS //
    if (JSON.parse(localStorage.getItem("session")) !== null) {
      setSession(prevSession => ({ ...savedSession, half: half }))
      if (session.team_one.players[matchId.current - 1].finished_match ||
        savedSession.team_one.players[matchId.current - 1].finished_match) {
        throwCountPlayerOne.current = 5
        throwCountPlayerTwo.current = 5
        throwCountPartnerOne.current = 5
        throwCountPartnerTwo.current = 5
      } else {
        throwCountPlayerOne.current = 0
        throwCountPlayerTwo.current = 0
        throwCountPartnerOne.current = 0
        throwCountPartnerTwo.current = 0
      }

    } else {

      if (session.team_one.players[matchId.current - 1].finished_match) {
        throwCountPlayerOne.current = 5
        throwCountPlayerTwo.current = 5
        throwCountPartnerOne.current = 5
        throwCountPartnerTwo.current = 5
      }
    }


    setCallKill(false)

  }, [matchId.current])



  useEffect(() => {

    halftimeCount.current = 1
    if (session.half === 2) {
      halftimeCount.current += 1
      setMatchId({ current: 6 })
    }


  }, [halftime])




  const handleScore = (e, player) => {
    setCallKill(false)
    const isPartner = (player.id === 4 || player.id === 9)
    const noInputSelected = inputSelected.current < 0
    if (player.team_id === 1) {
      if (isPartner) {
        if (throwCountPartnerOne.current < 5 && noInputSelected) {
          const tempArray = team_one.players
          player.scores[throwCountPartnerOne.current] = e.target.name
          tempArray[matchIndex + 1] = player
          setSession(prevSession => ({
            ...prevSession, team_one: { ...prevSession.team_one, players: tempArray }
          }))
          throwCountPartnerOne.current += 1
        } else if (!noInputSelected) {

          const tempArray = team_one.players
          player.scores[inputSelected.current] = e.target.name
          tempArray[matchIndex + 1] = player
          setSession(prevSession => ({
            ...prevSession, team_one: { ...prevSession.team_one, players: tempArray }
          }))
        } else if (inputSelected.current < 0 && throwCountPartnerOne.current === 5) {

          alert(`${player.name} has already completed 5 throws. To edit existing throws, please select a score and update it with the button panel. Or use the Undo button to remove the last score.`)

        }
      }
      if (!isPartner) {
        if (throwCountPlayerOne.current < 5 && noInputSelected) {
          const tempArray = team_one.players
          player.scores[throwCountPlayerOne.current] = e.target.name
          tempArray[matchIndex] = player
          setSession(prevSession => ({
            ...prevSession, team_one: { ...prevSession.team_one, players: tempArray }
          }))

          throwCountPlayerOne.current += 1
        } else if (!noInputSelected) {
          const tempArray = team_one.players
          player.scores[inputSelected.current] = e.target.name
          tempArray[matchIndex] = player
          setSession(prevSession => ({
            ...prevSession, team_one: { ...prevSession.team_one, players: tempArray }
          }))
        } else if (inputSelected.current < 0 && throwCountPlayerOne.current === 5) {
          alert(`${player.name} has already completed 5 throws. To edit existing throws, please select a score and update it with the button panel. Or use the Undo button to remove the last score.`)

        }
      }
    }


    if (player.team_id === 2) {
      if (isPartner) {
        if (throwCountPartnerTwo.current < 5 && noInputSelected) {
          const tempArray = team_two.players
          player.scores[throwCountPartnerTwo.current] = e.target.name
          tempArray[matchIndex + 1] = player
          setSession(prevSession => ({
            ...prevSession, team_two: { ...prevSession.team_two, players: tempArray }
          }))
          throwCountPartnerTwo.current += 1
        } else if (!noInputSelected) {

          const tempArray = team_two.players
          player.scores[inputSelected.current] = e.target.name
          tempArray[matchIndex + 1] = player
          setSession(prevSession => ({
            ...prevSession, team_two: { ...prevSession.team_two, players: tempArray }
          }))
        } else if (noInputSelected && throwCountPartnerTwo.current === 5) {

          alert(`${player.name} has already completed 5 throws. To edit existing throws, please select a score and update it with the button panel. Or use the Undo button to remove the last score.`)

        }
      }
      if (!isPartner) {
        if (throwCountPlayerTwo.current < 5 && noInputSelected) {
          const tempArray = team_two.players
          player.scores[throwCountPlayerTwo.current] = e.target.name
          tempArray[matchIndex] = player
          setSession(prevSession => ({
            ...prevSession, team_two: { ...prevSession.team_two, players: tempArray }

          }))

          throwCountPlayerTwo.current += 1
        } else if (!noInputSelected) {
          const tempArray = team_two.players
          player.scores[inputSelected.current] = e.target.name
          tempArray[matchIndex] = player
          setSession(prevSession => ({
            ...prevSession, team_two: { ...prevSession.team_two, players: tempArray }
          }))
        } else if (inputSelected.current < 0 && throwCountPlayerTwo.current === 5) {
          alert(`${player.name} has already completed 5 throws. To edit existing throws, please select a score and update it with the button panel. Or use the Undo button to remove the last score.`)

        }
      }
    }






    const finishedSingle = throwCountPlayerOne.current === 5 && throwCountPlayerTwo.current === 5
    const finishedDual = throwCountPlayerOne.current === 5 && throwCountPlayerTwo.current === 5 && throwCountPartnerOne.current === 5 && throwCountPartnerTwo.current === 5
    if (!duals) {
      if (finishedSingle) {
        const overtime = checkOvertime(p1, p2) // checks if scores are equal
        if (overtime) {
          saveSession(p1, p2, setSavedMatches, setSavedSession, session, setSession)
          setOvertime(overtime)
        } else {
          saveSession(p1, p2, setSavedMatches, setSavedSession, session, setSession)
        }
      }
    }
    if (duals) {
      if (finishedDual) {
        const overtime = checkDualsOvertime(p1, p2, p1_partner, p2_partner) // checks if scores are equal
        if (overtime) {
          saveSessionAfterDual(p1, p2, p1_partner, p2_partner, setSavedMatches, setSavedSession, session, setSession)
          setOvertime(overtime)
        } else {
          saveSessionAfterDual(p1, p2, p1_partner, p2_partner, setSavedMatches, setSavedSession, session, setSession)
        }
      }
    }
  }


  const handleUndo = (e, player) => {
    const isPartner = player.id === 4 || player.id === 9
    if (!isPartner) {
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
    if (isPartner) {
      if (player.team_id === 1 && throwCountPartnerOne.current > 0) {

        const tempArray = team_one.players
        player.scores[throwCountPartnerOne.current - 1] = ""
        tempArray[matchIndex + 1] = player
        setSession(prevSession => ({
          ...prevSession, team_one: { ...prevSession.team_one, players: tempArray }
        }))
        throwCountPartnerOne.current -= 1
      } else if (player.team_id === 2 && throwCountPartnerTwo.current > 0) {

        const tempArray = team_two.players
        player.scores[throwCountPartnerTwo.current - 1] = ""
        tempArray[matchIndex + 1] = player
        setSession(prevSession => ({
          ...prevSession, team_two: { ...prevSession.team_two, players: tempArray }
        }))
        throwCountPartnerTwo.current -= 1
      }
    }
  }


  const handleClick = (e, player) => {
    if (e.target.value !== "Undo") {
      handleScore(e, player)

    } else {
      handleUndo(e.target, player)
    }
  }





  const onClickOutside = (e) => {
    if (e.target.id === "overlay") {
      setOvertime(false)
    }
  }

  const handleNewPlayers = () => {
    navigate('/halftime', {
      state: {
        status: "HALFTIME",
        half: 2,
        team_one: session.team_one,
        team_two: session.team_two,
      }
    })

  }

  return (
    <div className={styles.root}>
      <ProgressButton
        setHalftime={setHalftime}
        matchId={matchId}
        setMatchId={setMatchId}
      />
      {
        (halftime) ? <div className={styles.overlay} id="halftime">
          <div className={styles.overlay_content}>
            <h1>HALFTIME</h1>
            <button
              onClick={() => handleNewPlayers()}
              className={styles.resume}
            >{"Select Second Half Players >"} </button>
          </div>
        </div> : null
      }
      <div>
        {(overtime && !duals) && (
          <div id="overlay" className={styles.overlay} onClick={(e) => onClickOutside(e)}>
            <div className={styles.overlay_content}>
              <Overtime
                matchId={matchId}
                session={session}
                team_one={team_one}
                team_two={team_two}
                setSavedMatches={setSavedMatches}
                setSavedSession={setSavedSession}
                setSession={setSession}
                setOvertime={setOvertime}
              />
            </div>

          </div>)}
        {(overtime && duals) && (
          <div id="overlay" className={styles.overlay} onClick={(e) => onClickOutside(e)}>
            <div className={styles.overlay_content}>
              <DualsOvertime
                matchId={matchId}
                session={session}
                team_one={team_one}
                team_two={team_two}
                setSavedMatches={setSavedMatches}
                setSavedSession={setSavedSession}
                setSession={setSession}
                setOvertime={setOvertime}
              />
            </div>

          </div>)}
        {session ?
          <div className={styles.flex}>

            <ActivePlayer
              callKill={callKill}
              setCallKIll={setCallKill}
              player={p1}
              opponent={p2}
              handleClick={handleClick}
              inputSelected={inputSelected}
            />
            {
              (matchId.current === 3 || matchId.current === 8) &&
              (<ActivePlayer
                callKill={callKill}
                setCallKIll={setCallKill}
                player={p1_partner}
                opponent={p2}
                handleClick={handleClick}
                inputSelected={inputSelected}
              />)
            }
            <div className={styles.metadata}>

              <div className={styles.meta_header}>{getDisciplineFromId(p1.id)}</div>
              <div className={styles.meta_rounds}>
                {[1, 2, 3, 4, 5, "T"].map(round => <div key={round} className={styles.round}>{round}</div>)}
              </div>
            </div>
            <ActivePlayer
              callKill={callKill}
              setCallKIll={setCallKill}
              player={p2}
              opponent={p1}
              handleClick={handleClick}
              inputSelected={inputSelected}
            />
            {
              (matchId.current === 3 || matchId.current === 8) &&
              (<ActivePlayer matchId={matchId}
                callKill={callKill}
                setCallKIll={setCallKill}
                player={p2_partner}
                opponent={p1}
                handleClick={handleClick}
                inputSelected={inputSelected}
              />)
            }
          </div >
          : 'loading'
        }



      </div>
    </div>

  )
}


export default ScoreBoard