import React, { useState, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import styles from './MeleeGame.module.css'

import Layout from "../../components/Layout/Layout"
import Team from '../../components/Team/Team'
import Match from '../../components/Match/Match'
import SessionContext from '../../contexts/sessionContext'
import { STATUS_OPTIONS } from './../../data'
import MatchContext from '../../contexts/matchContext'


export default function MeleeGame() {
  const { state } = useLocation()
  // need some global state for Teams, Current Match, status here
  // useContext
  const [session, setSession] = useState({
    team_one: state.team_one,
    team_two: state.team_two,
    status: STATUS_OPTIONS[0]
  })


  const matchId = useRef(0)
  const [currentPlayerOne, setCurrentPlayerOne] = useState(session.team_one.players[matchId.current - 1])
  const [currentPlayerTwo, setCurrentPlayerTwo] = useState(session.team_two.players[matchId.current - 1])



  const [match, setMatch] = useState({

  })



  return (
    <SessionContext.Provider value={[session, setSession]}>
      <MatchContext.Provider value={[match, setMatch]}>
        <Layout>
          <div className={styles.root}>
            <div className={styles.main}>
              <div className={styles.outer_section}>
                <Team dir="ltr" team={session.team_one}
                  matchId={matchId}
                  currentPlayerOne={currentPlayerOne}
                  currentPlayerTwo={currentPlayerTwo}
                  setCurrentPlayerOne={setCurrentPlayerOne}
                  setCurrentPlayerTwo={setCurrentPlayerTwo}
                />
              </div>
              <div className={styles.inner_section}>
                <Match
                  matchId={matchId}
                  currentPlayerOne={currentPlayerOne}
                  currentPlayerTwo={currentPlayerTwo}
                  setCurrentPlayerOne={setCurrentPlayerOne}
                  setCurrentPlayerTwo={setCurrentPlayerTwo}
                  tournament_name={state.tournament_name} />
              </div>
              <div className={styles.outer_section}>
                <Team dir="rtl" team={session.team_two}
                  matchId={matchId}
                  currentPlayerOne={currentPlayerOne}
                  currentPlayerTwo={currentPlayerTwo}
                  setCurrentPlayerOne={setCurrentPlayerOne}
                  setCurrentPlayerTwo={setCurrentPlayerTwo}
                />
              </div>
            </div>
          </div>
        </Layout >
      </MatchContext.Provider>
    </SessionContext.Provider>
  )


}