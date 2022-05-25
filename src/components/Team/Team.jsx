import React, { useContext } from 'react'
import SessionContext from '../../contexts/sessionContext'
import { getDisciplineFromId } from '../../helpers'
import styles from './Team.module.css'


export default function Team({ team, setTeam, half, setOpenTeam }) {
  // const [session, setSession] = useContext(SessionContext)


  const handleChange = (e) => {
    e.preventDefault()
    const tempArray = [...team.players]
    tempArray[e.target.id - 1].name = e.target.value
    setTeam(prevTeam => ({
      ...prevTeam, players: tempArray
    }))

  }


  const col1 = []
  const col2 = []

  team.players.forEach(player => {
    player.id <= 5 ? col1.push(player) : col2.push(player)
  })

  return (
    <div className={styles.root} >
      {/* <h2 style={{ marginTop: "15px" }}>Select the first half lineup</h2> */}
      {/* <button className={styles.hide_players} onClick={() => setOpenTeam(false)}>Hide {team.name} Players</button> */}

      <div className={styles.flex}>
        {!(half === 2) ?
          <div className={styles.col}>
            {
              col1.map(player =>
                <div key={player.id}>
                  <label className={styles.player_label} htmlFor={player.name}>{getDisciplineFromId(player.id)}
                    <input type="text" onChange={handleChange} name={player.name} value={player.name} id={player.id} />
                  </label>
                </div>
              )
            }

          </div>
          : <div className={styles.col}>
            {
              col2.map(player =>
                <div key={player.id}>
                  <label className={styles.player_label} htmlFor={player.name}>{getDisciplineFromId(player.id)}
                    <input type="text" onChange={handleChange} value={player.name} id={player.id} name={player.name} />
                  </label>
                </div>
              )
            }

          </div>}
      </div>
    </div >)
}