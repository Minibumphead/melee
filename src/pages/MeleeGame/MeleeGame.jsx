import React, { useState, useRef, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import styles from './MeleeGame.module.css'
import { useLocalStorage } from '../../helpers'

import ScoreBoard from '../../components/ScoreBoard/ScoreBoard'
import SessionContext from '../../contexts/sessionContext'
import MatchContext from '../../contexts/matchContext'
import InformationHeader from '../../components/InformationHeader/InformationHeader'
import { useNavigate } from 'react-router-dom'
import OtScoreBoard from '../../components/ScoreBoard/OtScoreBoard'


function MeleeGame({ halftime, setHalftime }) {


  const [savedSession, setSavedSession] = useLocalStorage("session", [], useState)
  const { state } = useLocation()
  const navigate = useNavigate()
  const { team_one, team_two } = state
  const throwCountPlayerOne = useRef(0)
  const throwCountPartnerOne = useRef(0)
  const throwCountPlayerTwo = useRef(0)
  const throwCountPartnerTwo = useRef(0)

  const [session, setSession] = useState({
    lane: 1,
    half: state.half,
    status: state.status,
    team_one: team_one,
    team_two: team_two,
    tournament_name: state.tournament_name,
    date: state.date
  })

  const startOvertime = () => {
    localStorage.setItem("overtimeIndex", undefined)
    navigate('/overtime', {
      state: { ...session, status: 'initial_select' }
    })
  }

  useEffect(() => {

    setSavedSession(prevSession => ({
      ...prevSession,
      team_one: { ...prevSession.team_one, players: team_one.players },
      team_two: { ...prevSession.team_two, players: team_two.players }
    }))

    setSession({
      half: state.half,
      status: state.status,
      team_one: team_one,
      team_two: team_two,
    })
    if (state.half === "pk") {
      setMatchId({ current: 11 })
    }
  }, [state])



  const [matchId, setMatchId] = useState({ current: 1 })
  const [match, setMatch] = useState({})


  return (
    <SessionContext.Provider value={[session, setSession]}>
      <MatchContext.Provider value={[match, setMatch]}>
        {session.half === "pk" ? <div className={styles.root}>
          <OtScoreBoard
            session={session}
            setSession={setSession}
            savedSession={savedSession}
            setSavedSession={setSavedSession}
            throwCountPlayerOne={throwCountPlayerOne}
            throwCountPlayerTwo={throwCountPlayerTwo}
            throwCountPartnerOne={throwCountPartnerOne}
            throwCountPartnerTwo={throwCountPartnerTwo}
            matchId={matchId}
            setMatchId={setMatchId}
            halftime={halftime}
            setHalftime={setHalftime}
          />

          <button onClick={() => startOvertime()} style={{ minHeight: "80px", marginTop: "25px" }}>Start Overtime</button>
        </div> :
          <div className={styles.root}>

            <InformationHeader session={savedSession.points_sum ? savedSession : session} matchId={matchId} />
            {matchId !== undefined ?
              <ScoreBoard
                session={session}
                setSession={setSession}
                savedSession={savedSession}
                setSavedSession={setSavedSession}
                throwCountPlayerOne={throwCountPlayerOne}
                throwCountPlayerTwo={throwCountPlayerTwo}
                throwCountPartnerOne={throwCountPartnerOne}
                throwCountPartnerTwo={throwCountPartnerTwo}
                matchId={matchId}
                setMatchId={setMatchId}
                halftime={halftime}
                setHalftime={setHalftime}
              /> : <div>loading</div>
            }

            <button onClick={() => startOvertime()} style={{ minHeight: "80px", marginTop: "25px", marginBottom: "155px", fontWeight: 700, fontSize: "35px" }}>Start Overtime</button>
          </div>
        }
      </MatchContext.Provider>
    </SessionContext.Provider>
  )
}

const withRouter = (Component) => {
  const Wrapper = (props) => {
    const history = useNavigate()
    return (<Component
      history={history}
      {...props} pm
    />)
  }
  return Wrapper
}

export default withRouter(MeleeGame)