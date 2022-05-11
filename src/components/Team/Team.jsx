import React, { useState, useEffect, useContext } from 'react'
import styles from './Team.module.css'
import { STATUS_OPTIONS } from '../../data'

import Player from '../Player/Player'
import ReadyIndicator from '../ReadyIndicator/ReadyIndicator'
import TeamLogo from '../TeamLogo/TeamLogo'
import SessionContext from '../../contexts/sessionContext'

export default function Team({ team, dir, matchId }) {
  const [session, setSession] = useContext(SessionContext)
  console.log(team)


  const handleChange = (e) => {
    var tempArray = [...team.players]
    let changed_player = tempArray[parseInt(e.target.id - 1)]
    changed_player.name = e.target.value
    team.players[e.target.id - 1] = changed_player
    if (team.id === 1) {
      setSession(prevState => ({
        ...prevState, team_one: {
          ...prevState.team_one, players: tempArray
        }
      }))
    } else {
      setSession(prevState => ({
        ...prevState, team_two: {
          ...prevState.team_two, players: tempArray
        }
      }))
    }
  }


  const checkIfTeamIsReady = (team) => {
    const tempArray = []
    team.players.forEach(player => tempArray.push(player.name))
    for (let i = 0; i < tempArray.length; i++) {
      const last_player_in_temp_array = tempArray[tempArray.length - 1 - i]
      if (last_player_in_temp_array === "") {
        tempArray.pop()
      }
    }
    if (tempArray.length === 8) {
      if (team.id === 1) {
        setSession(prevState => ({
          ...prevState, team_one: {
            ...prevState.team_one, status: STATUS_OPTIONS[1]
          }
        }))

      } else if (team.id === 2) {
        setSession(prevState => ({
          ...prevState, team_two: {
            ...prevState.team_two, status: STATUS_OPTIONS[1]
          }
        }))
      }

    } else {
      if (team.id === 1) {
        setSession(prevState => ({
          ...prevState, team_one: {
            ...prevState.team_one, status: STATUS_OPTIONS[0]
          }
        }))
      } else if (team.id === 2) {
        setSession(prevState => ({
          ...prevState, team_two: {
            ...prevState.team_two, status: STATUS_OPTIONS[0]
          }
        }))
      }
    }
  }
  const checkForSessionStart = () => {
    if (session.team_one.status === STATUS_OPTIONS[1] && session.team_two.status === STATUS_OPTIONS[1]) {
      setSession(prevState => ({
        ...prevState, status: "READY"
      }))
    } else {
      setSession(prevState => ({
        ...prevState, status: "SETUP"
      }))
    }
  }

  useEffect(() => {
    checkIfTeamIsReady(team)
  }, [team.players])

  useEffect(() => {
    checkForSessionStart()
  }, [team.status])





  return (
    <div className={styles.root} >
      <TeamLogo team={team} />

      {
        team.players.map(player =>


          <Player key={player.id} dir={dir} player={player} handleChange={handleChange} status={session.status} />)
      }
      <ReadyIndicator status={team.status} />


    </div >)
}