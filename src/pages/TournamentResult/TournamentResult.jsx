import React, { useEffect, useState } from 'react'
import styles from './TournamentResult.module.css'


export default function TournamentResult() {
  const [matches, setMatches] = useState([])

  useEffect(() => {
    const my_matches = localStorage.getItem("matches")
    const my_matches_json = JSON.parse(my_matches)
    setMatches(my_matches_json)
  }, [])

  console.log(matches)
  return (<div className={styles.root}>
    {
      matches.map((match) => {
        return (<div className={styles.match_container} key={match.id}>
          <div className={styles.header}>Match Number {match.id}</div>
          <div className={styles.row}>
            <div className={styles.row_item}>Player One</div>
            <div className={styles.row_item}>Player Two</div>
          </div>
          <div className={styles.row}>
            <div className={styles.row_item}>{match.player_one.name}</div>
            <div className={styles.row_item}>{match.player_two.name}</div>
          </div>
          <div className={styles.score_section}>
            <div className={styles.col}>
              {
                match.player_one.scores.map((score, idx) => <div key={idx} className={styles.col_item}>{score}</div>)
              }
            </div>
            <div className={styles.col}>
              {

                match.player_two.scores.map((score, idx) => <div key={idx} className={styles.col_item}>{score}</div>)
              }
            </div>
          </div>
        </div>)
      })
    }
  </div>)
}