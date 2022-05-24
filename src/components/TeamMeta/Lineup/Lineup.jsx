import React, { useEffect, useContext } from "react";
import styles from './Lineup.module.css'
import { getDisciplineFromId } from "../../../helpers";
import SessionContext from "../../../contexts/sessionContext";


export default function Lineup({ players, dir, matchId }) {
  const [session, setSession] = useContext(SessionContext)
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


  const goToMatch = (id) => {
    matchId.current = id
    setSession((prevSession) => ({ ...prevSession, status: `M${id}` }))
  }

  useEffect(() => {
    setSession(prevSession => prevSession)

  }, [matchId.current])



  return (
    <div className={dir === "rtl" ? styles.root_reverse
      : styles.root} >
      <div className={dir === "rtl" ? styles["header_row--right"] : styles["header_row--left"]}>
        <div className={styles.row_item}>Discipline</div>
        <div className={styles.row_item}>Name</div>
        <div className={styles.row_item}>SCR</div>
        <div className={styles.row_item}>PTS</div>
        {/* <div className={styles.row_item}>Win</div> */}
      </div>
      {players.map((player, index) => (
        <div key={index}>
          {!isDoublePartner(player) && (
            <div key={player.id} className={dir === "rtl" ? styles["data_row--left"] : styles["data_row--right"]}>
              <div className={`${styles.row_item} ${styles.discipline}`} onClick={() => goToMatch(player.id)}>{getDisciplineFromId(player.id)}</div>
              <div className={styles.row_item_col}><p>{player.name}</p>{!isDoublePartner(player) && (<p>{getPartnerName(player)}</p>)}</div>
              <div className={styles.row_item}>{player.total_score}</div>
              <div className={styles.row_item}>{player.team_points}</div>
              {/* <div className={styles.row_item}>{JSON.stringify(player.win)}</div> */}
            </div>
          )
          }


        </div>
      ))
      }
    </div>)
}