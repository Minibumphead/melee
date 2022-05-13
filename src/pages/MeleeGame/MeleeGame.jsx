import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import styles from './MeleeGame.module.css'

import ScoreBoard from '../../components/ScoreBoard/ScoreBoard'
import SessionContext from '../../contexts/sessionContext'
import MatchContext from '../../contexts/matchContext'
import InformationHeader from '../../components/InformationHeader/InformationHeader'
import { Team } from '../../data'


export default function MeleeGame() {
  const { state } = useLocation()
  const { team_one, team_two } = state


  // need some global state for Teams, Current Match, status here
  // useContext
  const [session, setSession] = useState({
    lane: 1,
    status: state.status,
    team_one: team_one,
    team_two: team_two,
    tournament_name: state.tournament_name,
    date: state.date
  })



  const [matchId, setMatchId] = useState({ current: 1 })

  const [match, setMatch] = useState({

  })



  return (
    <SessionContext.Provider value={[session, setSession]}>
      <MatchContext.Provider value={[match, setMatch]}>
        <div className={styles.root}>

          <InformationHeader session={session} matchId={matchId} />
          {matchId !== undefined ?
            <ScoreBoard
              matchId={matchId}
              setMatchId={setMatchId}
            /> : <div>loading</div>
          }

        </div>
      </MatchContext.Provider>
    </SessionContext.Provider>
  )


}