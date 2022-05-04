import React, { useState } from 'react'
import styles from './MeleeGame.module.css'
import { team_one, team_two } from './../../data'

import Layout from "../../components/Layout/Layout"
import Team from '../../components/Team/Team'
import Match from '../../components/Match/Match'
import MeleeContext from '../../contexts/meleeContext'


export default function MeleeGame() {
  // need some global state for Teams, Current Match, status here
  // useContext
  const [match, setMatch] = useState({
    team_one: team_one,
    team_two: team_two,
  })


  return (
    <MeleeContext.Provider value={[match, setMatch]}>
      <Layout>
        <div className={styles.outer_section}>
          <Team dir="ltr" team={team_one} />
        </div>
        <div className={styles.inner_section}>
          <Match />
        </div>
        <div className={styles.outer_section}>
          <Team dir="rtl" team={team_two} />
        </div>
      </Layout >
    </MeleeContext.Provider>
  )


}