import React, { useState } from 'react'
import styles from './MeleeGame.module.css'
import { team_one, team_two } from './../../data'

import Layout from "../../components/Layout/Layout"
import Team from '../../components/Team/Team'
import Match from '../../components/Match/Match'
import SessionContext from '../../contexts/sessionContext'
import ScorePanel from '../../components/ScorePanel.jsx/ScorePanel'
import { STATUS_OPTIONS } from './../../data'
import MatchContext from '../../contexts/matchContext'


export default function MeleeGame() {
  // need some global state for Teams, Current Match, status here
  // useContext
  const [session, setSession] = useState({
    team_one: team_one,
    team_two: team_two,
    status: STATUS_OPTIONS[0]
  })




  const [match, setMatch] = useState({

  })

  const handleClick = (e) => {
    console.log(e.target.value)
  }


  return (
    <SessionContext.Provider value={[session, setSession]}>
      <MatchContext.Provider value={[match, setMatch]}>
        <Layout>
          <div className={styles.root}>
            <div className={styles.main}>
              <div className={styles.outer_section}>
                <Team dir="ltr" team={session.team_one} />
              </div>
              <div className={styles.inner_section}>
                <Match />
              </div>
              <div className={styles.outer_section}>
                <Team dir="rtl" team={session.team_two} />
              </div>
            </div>
            {/* <div className={styles.score_panel_section}>

              <div className={styles.panel}>

                <ScorePanel handleClick={handleClick} team={team_one} />
              </div>

              <div className={styles.panel}>

                <ScorePanel handleClick={handleClick} team={team_two} />
              </div>
            </div> */}
          </div>
        </Layout >
      </MatchContext.Provider>
    </SessionContext.Provider>
  )


}