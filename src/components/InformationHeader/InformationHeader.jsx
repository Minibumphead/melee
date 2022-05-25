import React, { useState, useEffect } from 'react'
import TeamLogo from '../TeamLogo/TeamLogo'
import TeamMeta from '../TeamMeta/TeamMeta'
import styles from './InformationHeader.module.css'
import { getDisciplineFromId } from '../../helpers'
import backgroundImage from './../../assets/images/logo.png'


export const calculateMatchNumber = (id) => {
  if (id < 4) {
    return id
  } else if (id > 4 && id < 9) {
    return id - 1
  } else if (id > 9) {
    return id - 2
  }

}

export default function InformationHeader({ session, matchId }) {
  const [toggleLineup, setToggleLineup] = useState(true)
  const handleToggle = () => {
    setToggleLineup(!toggleLineup)
  }

  const [count, setCount] = useState(0)
  const { team_one, team_two } = session
  const { points_sum: total_team_one } = team_one
  const { points_sum: total_team_two } = team_two
  const delta = Math.abs(total_team_one - total_team_two)

  // setInterval(() => setCount(count + 1), 1000)
  useEffect(() => {
    let interval = null
    // interval = setInterval(() => { setCount(prevCount => prevCount + 1000) }, 1000)

  }, [])



  console.log(matchId.current)


  return (
    <div className={toggleLineup ? styles.root : styles.hidden_lineup}>
      <div className={styles.outer_section}>
        <TeamLogo team={session.team_one} />
        <TeamMeta team={session.team_one} toggleLineup={toggleLineup} matchId={matchId} />


      </div>
      <div className={styles.center}>
        <h1>{session.tournament_name}</h1>
        {/* <h2>{formatDate(session.date)}</h2> */}
        <img src={backgroundImage} alt="melee_logo" className={styles.logo} />
        <button
          className={styles.toggle_button}
          onClick={handleToggle}

        >
          {toggleLineup ? "Hide Lineup" : "Show Lineup"}
        </button>
        <h2 className={styles.status_header}>Playing {matchId.current <= 5 ? "First" : "Second"} Half</h2>
        <h2>{`Match ${calculateMatchNumber(matchId.current)}`} - {getDisciplineFromId(matchId.current)}</h2>
        {/* <h1>Time elapsed:</h1> */}
        <h3>
          <span>{("0" + Math.floor(count / 3600000) % 60).slice(-2)}:</span>
          <span>{("0" + Math.floor(count / 60000) % 60).slice(-2)}:</span>
          <span>{("0" + Math.floor(count / 1000) % 60).slice(-2)}</span>
        </h3>
        {total_team_one === total_team_two ? <div>The match is currently tied</div> :

          <div>
            <h3>{total_team_one > total_team_two ?
              <div>{team_one.name} is up {delta} points</div>
              : <div>{team_two.name} is up {delta} points</div>}</h3>
          </div>}
      </div>
      <div className={styles.outer_section}>

        <TeamLogo team={session.team_two} />
        <TeamMeta team={session.team_two} toggleLineup={toggleLineup} dir="rtl" />

      </div>
    </div>
  )
}