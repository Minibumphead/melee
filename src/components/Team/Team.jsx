import React, { useState, useEffect, useContext } from 'react'
import styles from './Team.module.css'
import { STATUS_OPTIONS } from '../../data'

import Player from '../Player/Player'
import ReadyIndicator from '../ReadyIndicator/ReadyIndicator'
import TeamLogo from '../TeamLogo/TeamLogo'
import MeleeContext from '../../contexts/meleeContext'

export default function Team({ team, dir }) {
  const [match, setMatch] = useContext(MeleeContext)

  const [players, setPlayers] = useState(team.players)
  const [status, setStatus] = useState(team.status)

  const handleChange = (e) => {
    var tempArray = [...players]
    let changed_player = tempArray[parseInt(e.target.id - 1)]
    changed_player.name = e.target.value
    players[e.target.id - 1] = changed_player
    setPlayers(tempArray)
  }


  const checkIfTeamIsReady = () => {
    const tempArray = []
    players.forEach(player => tempArray.push(player.name))
    for (let i = 0; i < tempArray.length; i++) {
      const last_player_in_temp_array = tempArray[tempArray.length - 1 - i]
      if (last_player_in_temp_array === "") {
        tempArray.pop()
      } else {
        tempArray[tempArray.length - 1 - i]
      }
    }
    if (tempArray.length === 8) {
      setStatus(STATUS_OPTIONS[1])
      return;
    } else {
      setStatus(STATUS_OPTIONS[0])
    }
  }

  useEffect(() => {
    checkIfTeamIsReady()
  }, [players[7].name])

  return (
    < div className={styles.root} >
      <TeamLogo />

      <div className={dir === "ltr" ? styles.top : styles.top_reverse}>

        <div className={styles.right}>
          <div className={styles.team_name}>{team.name}</div>
          <div className={styles.row}>
            <div className={styles.left}>R</div>
            <div className={styles.col_long}>Thrower</div>
            <div className={styles.col}>S</div>
            <div className={styles.col}>P</div>
          </div>
        </div>
      </div>
      {
        players.map(player => <Player key={player.id} dir={dir} player={player} handleChange={handleChange} status={status} />)
      }
      <ReadyIndicator status={status} />


    </div >)
}