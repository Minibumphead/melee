
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styles from './Halftime.module.css'
import Team from '../Team/Team'

export default function Halftime({ halftime, setHalftime }) {
  const location = useLocation()
  const navigate = useNavigate()

  const [teamOne, setTeamOne] = useState(location.state.team_one)
  const [teamTwo, setTeamTwo] = useState(location.state.team_two)
  const isReady = () => {
    for (let i = 0; i < teamOne.players.length; i++) {
      if (teamOne.players[i].name.length <= 0 ||
        teamTwo.players[i].name.length <= 0
      ) {
        return false
      }
    }
    return true
  }

  const resumeTournament = () => {
    navigate('/play_matches', {
      state: {
        status: "M6",
        half: 2,
        team_one: teamOne,
        team_two: teamTwo,
      }
    })
    setHalftime(false)
  }

  return (
    <div className={styles.form_container}>
      <h2>Select The Second Half Players</h2>

      <div className={styles.team__container}>

        {(teamOne) &&
          (<div className={styles.half}>
            <h1>{teamOne.name}</h1>
            <Team
              team={teamOne}
              setTeam={setTeamOne}
              half={location.state.half}
            />
          </div>)}

        {(teamTwo) &&
          (<div className={styles.half}>

            <h1>{teamTwo.name}</h1>
            <Team
              team={teamTwo}
              setTeam={setTeamTwo}
              half={location.state.half}
            />
          </div>)}
      </div>

      <button className={isReady() ? styles.start : styles.disabled} onClick={resumeTournament}>Resume Tournament</button>
    </div>)
}
