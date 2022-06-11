
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styles from './PlayerSelect.module.css'
import Team from '../Team/Team'

export default function PlayerSelect() {
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
    if (!isReady()) {
      alert("please select all players for overtime before continuing!")
      return
    }
    navigate('/play_matches', {
      state: {
        status: "overtime",
        half: 2,
        team_one: teamOne,
        team_two: teamTwo,
      }
    })
    setHalftime(false)
  }


  const TeamSelect = ({ team, setTeam }) => {

    const handleSelect = () => {
      console.log('test')
    }
    return <div style={{ display: "flex", flexDirection: "column" }}>
      {[1, 2, 3, 4, 5].map(id => {
        return <select key={id} onChange={handleSelect}>
          {team.players.map(player => {
            return <option key={player.id} value={player.id}>{player.name}</option>

          })}
        </select>
      })}

    </div>
  }

  return (
    <div className={styles.form_container}>
      <h2>Select your Overtime Players</h2>


      <div className={styles.team__container}>

        {(teamOne) &&
          (<div className={styles.half}>
            <h1>{teamOne.name}</h1>
            <TeamSelect
              team={teamOne}
              setTeam={setTeamOne}
              half={location.state.half}
            />
          </div>)}

        {(teamTwo) &&
          (<div className={styles.half}>

            <h1>{teamTwo.name}</h1>
            <TeamSelect
              team={teamTwo}
              setTeam={setTeamTwo}
              half={location.state.half}
            />
          </div>)}
      </div>

      <button className={isReady() ? styles.start : styles.disabled} onClick={resumeTournament}>Resume Tournament</button>
    </div>)
}