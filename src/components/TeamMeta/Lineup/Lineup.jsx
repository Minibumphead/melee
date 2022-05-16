import React from "react";
import styles from './Lineup.module.css'
import { getDisciplineFromId } from "../../../helpers";

export default function Lineup({ players, dir }) {
  const isDoublePartner = (player) => {
    const isDoublePartner =
      player.id === 4 || player.id === 9 ? true : false
    return isDoublePartner
  }
  const doublePartnerOne = players[3]
  const doublePartnerTwo = players[8]
  const getPartnerName = (player) => {
    if (player.id === 3) {
      return doublePartnerOne.name
    } else if (player.id === 8) {
      return doublePartnerTwo.name
    }
  }

  return (
    <div className={dir === "rtl" ? styles.root_reverse
      : styles.root} >
      <div className={styles.header_row}>
        <div className={styles.row_item}>Discipline</div>
        <div className={styles.row_item}>Name</div>
        <div className={styles.row_item}>Score</div>
        <div className={styles.row_item}>Points</div>
        <div className={styles.row_item}>Win</div>
      </div>
      {players.map((player, index) => (
        <div key={index}>
          {!isDoublePartner(player) && (
            <div key={player.id} className={styles.data_row}>
              <div className={styles.row_item}>{getDisciplineFromId(player.id)}</div>
              <div className={styles.row_item_col}><p>{player.name}</p>{!isDoublePartner(player) && (<p>{getPartnerName(player)}</p>)}</div>
              <div className={styles.row_item}>{player.total_score}</div>
              <div className={styles.row_item}>{player.team_points}</div>
              <div className={styles.row_item}>{JSON.stringify(player.win)}</div>
            </div>
          )
          }


        </div>
      ))
      }
    </div>)
}