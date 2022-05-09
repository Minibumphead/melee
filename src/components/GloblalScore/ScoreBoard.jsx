import React, { useContext, useState, useEffect, useRef } from 'react'
import styles from './ScoreBoard.module.css'

import ProgressButton from './../ProgressButton/ProgressButton'
import SessionContext from '../../contexts/sessionContext'
import ActivePlayer from './../ActivePlayer/ActivePlayer'
import { useLocalStorage } from '../../helpers'

export default function ScoreBoard() {
  const matchId = useRef(0)
  const throwCountPlayerOne = useRef(0)
  const throwCountPlayerTwo = useRef(0)
  const rounds = [1, 2, 3, 4, 5]
  const [matches, setMatches] = useLocalStorage("matches", [], useState)
  const [session, setSession] = useContext(SessionContext)
  const inputSelected = useRef(-1)
  const [currentPlayerOne, setCurrentPlayerOne] = useState(session.team_one.players[matchId.current - 1])
  const [currentPlayerTwo, setCurrentPlayerTwo] = useState(session.team_two.players[matchId.current - 1])

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
      } else {
        tempArray[throwCountPlayerOne.current] = score
        throwCountPlayerOne.current += 1

        setCurrentPlayerOne({ ...currentPlayerOne, scores: tempArray })
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
    }
  }

  const handleUndo = (input, player) => {

    const undoPlayerOne = () => {
      if (player.team_id === 1) {

        if (throwCountPlayerOne.current === 0) {
          console.log('undo for p1 not possible')
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
          console.log('undo for p2 not possible')
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
    try {

      const matchData = JSON.parse(localStorage.getItem("matches")) !== null ?
        JSON.parse(localStorage.getItem("matches"))[matchId.current - 1] :
        false
      console.log(matchData)
      if (matchData) {
        console.log('fetched')
        console.log(matchData.id)
        setCurrentPlayerOne(matchData.player_one)
        setCurrentPlayerTwo(matchData.player_two)

      } else {
        console.log('no prev match data from localstorage')
        setCurrentPlayerOne(session.team_one.players[matchId.current - 1])
        setCurrentPlayerTwo(session.team_two.players[matchId.current - 1])
        throwCountPlayerOne.current = 0
        throwCountPlayerTwo.current = 0
      }

    } catch (error) {
      console.log(error)
      console.log("match not found")

    }

  }, [matchId.current])






  return (
    <div className={styles.root}>
      {
        (currentPlayerOne && currentPlayerTwo) && (

          <div className={styles.scores_container}>
            <div className={styles.player_one_section}>
              <ActivePlayer
                player={currentPlayerOne}
                handleClick={handleClick}
                currentPlayerOne={currentPlayerOne}
                setCurrentPlayerOne={setCurrentPlayerOne}
                inputSelected={inputSelected}
              />
            </div>
            <div className={styles.metadata}>

              <div className={styles.meta_header}>{`M${matchId.current + 1}`}</div>
              <div className={styles.meta_rounds}>
                {rounds.map(round => <div key={round} className={styles.round}>{round}</div>)}
              </div>
            </div>
            <div className={styles.player_two_section}>
              <ActivePlayer
                player={currentPlayerTwo}
                handleClick={handleClick}
                currentPlayerTwo={currentPlayerTwo}
                setCurrentPlayerTwo={setCurrentPlayerTwo}
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
        currentPlayerTwo={currentPlayerTwo}
        matches={matches}
        setMatches={setMatches}
        matchId={matchId}
      />

    </div>
    // </div>

  )
}