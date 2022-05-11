import React, { useContext } from 'react'
import SessionContext from '../../contexts/sessionContext'
import styles from './Team.module.css'


export default function Team({ team }) {
  // const [session, setSession] = useContext(SessionContext)


  const handleChange = (e) => {
    e.preventDefault()
    console.log(e.target.value)
    var tempArray = [...team.players]
    let changed_player = tempArray[parseInt(e.target.id - 1)]
    changed_player.name = e.target.value
    team.players[e.target.id - 1] = changed_player
    if (team.id === 1) {
      setSession(prevState => ({
        ...prevState, team_one: {
          ...prevState.team_one, players: tempArray
        }
      }))
    } else {
      setSession(prevState => ({
        ...prevState, team_two: {
          ...prevState.team_two, players: tempArray
        }
      }))
    }
  }


  const col1 = []
  const col2 = []

  team.players.forEach(player => {
    player.id % 2 === 0 ? col2.push(player) : col1.push(player)
  })

  return (
    <div className={styles.root} >
      <div className={styles.col}>
        {
          col1.map(player =>
            <div key={player.id}>
              <label className={styles.player_label} htmlFor={`Player${player.id}`}>{`Player ${player.id}`}
                <input type="text" onChange={handleChange} value={player.name} id={player.id} />
              </label>
            </div>
          )
        }

      </div>
      <div className={styles.col}>
        {
          col2.map(player =>
            <div key={player.id}>
              <label className={styles.player_label} htmlFor={`Player${player.id}`}>{`Player ${player.id}`}
                <input type="text" onChange={handleChange} value={player.name} />
              </label>
            </div>
          )
        }

      </div>
    </div >)
}