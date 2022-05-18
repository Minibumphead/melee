import React, { useState, useEffect } from 'react'
import TeamLogo from '../TeamLogo/TeamLogo'
import TeamMeta from '../TeamMeta/TeamMeta'
import styles from './InformationHeader.module.css'
import { formatDate, getDisciplineFromId } from '../../helpers'
import backgroundImage from './../../assets/images/logo.png'

export default function InformationHeader({ session, matchId }) {
  const [toggleLineup, setToggleLineup] = useState(true)
  const handleToggle = () => {
    setToggleLineup(!toggleLineup)
  }

  const [count, setCount] = useState(0)

  // setInterval(() => setCount(count + 1), 1000)
  useEffect(() => {
    let interval = null
    interval = setInterval(() => { setCount(prevCount => prevCount + 1000) }, 1000)

  }, [])


  return (
    <div className={styles.root}>
      <div className={styles.outer_section}>
        <TeamLogo team={session.team_one} />
        <TeamMeta team={session.team_one} toggleLineup={toggleLineup} />


      </div>
      <div className={styles.center}>
        <h1>{session.tournament_name}</h1>
        {/* <h2>{formatDate(session.date)}</h2> */}
        <img src={backgroundImage} alt="melee_logo" className={styles.logo} />
        <button
          className={styles.toggle_button}
          onClick={handleToggle}

        >
          {toggleLineup ? "Hide Lineup" : "Show Lineuip"}
        </button>
        <h1 className={styles.status_header}>Match in Prgoress</h1>
        <h1>{getDisciplineFromId(matchId.current)}</h1>
        {/* <h1>Time elapsed:</h1> */}
        <h1>
          <span>{("0" + Math.floor(count / 3600000) % 60).slice(-2)}:</span>
          <span>{("0" + Math.floor(count / 60000) % 60).slice(-2)}:</span>
          <span>{("0" + Math.floor(count / 1000) % 60).slice(-2)}</span>
        </h1>
      </div>
      <div className={styles.outer_section}>

        <TeamLogo team={session.team_two} />
        <TeamMeta team={session.team_two} toggleLineup={toggleLineup} dir="rtl" />

      </div>
    </div>
  )
}