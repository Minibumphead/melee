import React, { useState } from 'react'
import TeamLogo from '../TeamLogo/TeamLogo'
import TeamMeta from '../TeamMeta/TeamMeta'
import styles from './InformationHeader.module.css'
import { formatDate } from '../../helpers'

export default function InformationHeader({ session }) {

  const [toggleLineup, setToggleLineup] = useState(true)

  return (
    <div className={styles.root}>
      <div className={styles.outer_section}>
        <TeamLogo team={session.team_one} />
        <TeamMeta team={session.team_one} toggleLineup={toggleLineup} />
        {!toggleLineup ? <button onClick={() => setToggleLineup(true)}> View Lineup</button> :
          <button onClick={() => setToggleLineup(false)}>Hide Lineup</button>}

      </div>
      <div className={styles.center}>
        <h1>{session.tournament_name}</h1>
        <h2>{formatDate(session.date)}</h2>
        <h2>
          Status: {session.status}
        </h2>

      </div>
      <div className={styles.outer_section}>

        <TeamLogo team={session.team_two} />
        <TeamMeta team={session.team_two} toggleLineup={toggleLineup} dir="rtl" />
        {!toggleLineup ? <button onClick={() => setToggleLineup(true)}> View Lineup</button> :
          <button onClick={() => setToggleLineup(false)}>Hide Lineup</button>}
      </div>
    </div>
  )
}