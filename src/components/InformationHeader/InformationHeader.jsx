import React, { useState } from 'react'
import TeamLogo from '../TeamLogo/TeamLogo'
import TeamMeta from '../TeamMeta/TeamMeta'
import styles from './InformationHeader.module.css'
import { formatDate } from '../../helpers'
import backgroundImage from './../../assets/images/logo.png'

export default function InformationHeader({ session, matchId }) {
  const [toggleLineup, setToggleLineup] = useState(true)
  const handleToggle = () => {
    setToggleLineup(!toggleLineup)
  }


  return (
    <div className={styles.root}>
      <div className={styles.outer_section}>
        <TeamLogo team={session.team_one} />
        <TeamMeta team={session.team_one} toggleLineup={toggleLineup} />


      </div>
      <div className={styles.center}>
        <h1>{session.tournament_name}</h1>
        <h2>{formatDate(session.date)}</h2>
        <img src={backgroundImage} alt="melee_logo" className={styles.logo} />
        <button
          className={styles.toggle_button}
          onClick={handleToggle}

        >
          {toggleLineup ? "Hide Lineup" : "Show Lineuip"}
        </button>
        <h1>Status</h1>
        <h1>{`M${matchId.current}`}</h1>
      </div>
      <div className={styles.outer_section}>

        <TeamLogo team={session.team_two} />
        <TeamMeta team={session.team_two} toggleLineup={toggleLineup} dir="rtl" />

      </div>
    </div>
  )
}