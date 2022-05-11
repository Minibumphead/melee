import React from "react";
import styles from './Lineup.module.css'
import { getDisciplineFromId } from "../../../helpers";

export default function Lineup({ players, dir }) {
  console.log(players[0])

  return (
    <div className={dir === "rtl" ? styles.root_reverse : styles.root} >
      <div className={styles.header_row}>
        <div className={styles.row_item}>Round</div>
        <div className={styles.row_item}>Name</div>
        <div className={styles.row_item}>Score</div>
        <div className={styles.row_item}>Points</div>
        <div className={styles.row_item}>Win</div>
      </div>
      {players.map(player => (
        <div key={player.id} className={styles.data_row}>
          <div className={styles.row_item}>{getDisciplineFromId(player.id)}</div>
          <div className={styles.row_item}>{player.name}</div>
          <div className={styles.row_item}>{player.total_score}</div>
          <div className={styles.row_item}>{player.team_points}</div>
          <div className={styles.row_item}>{JSON.stringify(player.win)}</div>
        </div>))
      }
    </div>)
}