import React, { useContext, useState, useEffect, useRef } from 'react'
import styles from './ScoreBoard.module.css'

import ProgressButton from './../ProgressButton/ProgressButton'
import SessionContext from '../../contexts/sessionContext'
import ActivePlayer from './../ActivePlayer/ActivePlayer'
import { useLocalStorage, saveMatch } from '../../helpers'


export default function ScoreBoard({
  currentPlayerOne,
  setCurrentPlayerOne,
  currentPlayerTwo,
  setCurrentPlayerTwo,
  matchId
}) {
  const throwCountPlayerOne = useRef(0)
  const throwCountPlayerTwo = useRef(0)
  const rounds = [1, 2, 3, 4, 5]
  const [matches, setMatches] = useLocalStorage("matches", [], useState)
  const [session, setSession] = useContext(SessionContext)
  const inputSelected = useRef(-1)
  const didMount = useRef(false)
  // const [currentPlayerOne, setCurrentPlayerOne] = useState(session.team_one.players[matchId.current - 1])
  // const [currentPlayerTwo, setCurrentPlayerTwo] = useState(session.team_two.players[matchId.current - 1])

  const handleScore = (score, player) => {

    // handle clicking buttons other than undo if players already have throwCount of 5
    if (throwCountPlayerOne.current === 5 && player.team_id === 1 && inputSelected.current === -1) {
      throwCountPlayerOne.current = 0
    }
    if (throwCountPlayerTwo.current === 5 && player.team_id === 2 && inputSelected.current === -1) {
      throwCountPlayerTwo.current = 0
    }

    // handle throw of team one 
    if (player.team_id === 1 && throwCountPlayerOne.current < 5 || (inputSelected.current >= 0 && player.team_id === 1)) {
      const tempArray = [...currentPlayerOne.scores]
      if (inputSelected.current >= 0 && inputSelected.current !== false) {
        tempArray[inputSelected.current] = score

        setCurrentPlayerOne({ ...currentPlayerOne, scores: tempArray })
        var temp_players = session.team_one.players
        temp_players[matchId.current - 1] = { ...currentPlayerOne, scores: tempArray }
        setSession(prevState => ({
          ...prevState, team_one: { ...prevState.team_one, players: temp_players }
        }))
      } else {
        tempArray[throwCountPlayerOne.current] = score
        throwCountPlayerOne.current += 1

        setCurrentPlayerOne({ ...currentPlayerOne, scores: tempArray })
        var temp_players = session.team_one.players
        temp_players[matchId.current - 1] = { ...currentPlayerOne, scores: tempArray }
        setSession(prevState => ({
          ...prevState, team_one: { ...prevState.team_one, players: temp_players }
        }))
      }



      // handle throw of team two
    } else if (player.team_id === 2 && throwCountPlayerTwo.current < 5 || (inputSelected.current >= 0 && player.team_id === 2)) {
      const tempArray = [...currentPlayerTwo.scores]
      if (inputSelected.current >= 0 && inputSelected.current !== false) {
        tempArray[inputSelected.current] = score
      } else {
        tempArray[throwCountPlayerTwo.current] = score
        throwCountPlayerTwo.current += 1
      }
      setCurrentPlayerTwo({ ...currentPlayerTwo, scores: tempArray })
      var temp_players = session.team_two.players
      temp_players[matchId.current - 1] = { ...currentPlayerTwo, scores: tempArray }
      setSession(prevState => ({
        ...prevState, team_two: { ...prevState.team_two, players: temp_players }
      }))
    }
  }

  const handleUndo = (input, player) => {

    const undoPlayerOne = () => {
      if (player.team_id === 1) {

        if (throwCountPlayerOne.current === 0) {

          alert("To UNDO a score please select the score and click the Undo button")
        } else {
          throwCountPlayerOne.current -= 1
          var tempArr = [...player.scores]
          if (inputSelected.current >= 0) {
            tempArr[inputSelected.current] = "/"
          } else {
            tempArr[throwCountPlayerOne.current] = "/"
          }
          setCurrentPlayerOne(prevState => ({
            ...prevState, scores: tempArr
          }))
        }
      }
    }
    const undoPlayerTwo = () => {
      if (player.team_id === 2) {

        if (throwCountPlayerTwo.current === 0) {
          alert("To UNDO a score please select the score and click the Undo button")
        } else {

          throwCountPlayerTwo.current -= 1
          var tempArr = [...player.scores]
          if (inputSelected.current >= 0) {
            tempArr[inputSelected.current] = "/"
          } else {
            tempArr[throwCountPlayerTwo.current] = "/"
          }
          setCurrentPlayerTwo(prevState => ({
            ...prevState, scores: tempArr
          }))
        }

      }
    }
    undoPlayerOne()
    undoPlayerTwo()
  }



  const handleClick = (e, player) => {
    if (e.target.value !== "Undo") {
      handleScore(e.target.name, player)

    } else {
      handleUndo(e.target, player)
    }
  }

  useEffect(() => {
    const calledBy = 'useEffect'
    console.log('ran')
    if (didMount.current) {
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
    } else {
      didMount.current = true
    }
  }, [throwCountPlayerOne.current, throwCountPlayerTwo.current, inputSelected.current])






  useEffect(() => {
    console.log('updated id')
    try {
      const matchData = JSON.parse(localStorage.getItem("matches")) !== null ?
        matchId.current === 0 ? JSON.parse(localStorage.getItem("matches"))[matchId.current] :
          JSON.parse(localStorage.getItem("matches"))[matchId.current - 1] :
        false
      if (matchData) {
        const calledBy = "useEffect #2"
        saveMatch(
          session, setSession,
          matchData.player_one,
          setCurrentPlayerOne,
          matchData.player_two,
          setCurrentPlayerTwo,
          matches,
          setMatches,
          matchId,
          calledBy)
        // setCurrentPlayerOne(matchData.player_one)
        // setCurrentPlayerTwo(matchData.player_two)

        // const temp_players_one = [...session.team_one.players]
        // const temp_players_two = [...session.team_two.players]
        // temp_players_one[matchId.current] = matchData.player_one
        // temp_players_two[matchId.current] = matchData.player_two


        // setSession(prevState => ({
        //   ...prevState,
        //   team_one: { ...prevState.team_one, players: temp_players_one },
        //   team_two: { ...prevState.team_two, players: temp_players_two }
        // }))

      } else {
        console.log('no prev match data from localstorage')
        setCurrentPlayerOne(session.team_one.players[matchId.current - 1])
        setCurrentPlayerTwo(session.team_two.players[matchId.current - 1])
        throwCountPlayerOne.current = 0
        throwCountPlayerTwo.current = 0
      }

    } catch (error) {
      console.log(error)

    }

  }, [matchId.current])







  return (
    <div className={styles.root}>
      {
        (currentPlayerOne && currentPlayerTwo) && (

          <div className={styles.scores_container}>
            <div className={styles.player_one_section}>
              <ActivePlayer
                matchId={matchId}
                player={currentPlayerOne}
                handleClick={handleClick}
                currentPlayerOne={currentPlayerOne}
                currentPlayerTwo={currentPlayerTwo}
                setCurrentPlayerOne={setCurrentPlayerOne}
                setCurrentPlayerTwo={setCurrentPlayerTwo}
                inputSelected={inputSelected}
              />
            </div>
            <div className={styles.metadata}>

              <div className={styles.meta_header}>{`M${matchId.current}`}</div>
              <div className={styles.meta_rounds}>
                {rounds.map(round => <div key={round} className={styles.round}>{round}</div>)}
              </div>
            </div>
            <div className={styles.player_two_section}>
              <ActivePlayer

                matchId={matchId}
                player={currentPlayerTwo}
                currentPlayerOne={currentPlayerOne}
                currentPlayerTwo={currentPlayerTwo}
                setCurrentPlayerOne={setCurrentPlayerOne}
                setCurrentPlayerTwo={setCurrentPlayerTwo}
                handleClick={handleClick}
                inputSelected={inputSelected}
              />
            </div>

          </div>

        )

      }

      <ProgressButton
        status={session.status}
        throwCountPlayerOne={throwCountPlayerOne}
        throwCountPlayerTwo={throwCountPlayerTwo}
        currentPlayerOne={currentPlayerOne}
        setCurrentPlayerOne={setCurrentPlayerOne}
        currentPlayerTwo={currentPlayerTwo}
        setCurrentPlayerTwo={setCurrentPlayerTwo}
        matches={matches}
        setMatches={setMatches}
        matchId={matchId}
      />

    </div>
    // </div>

  )
}