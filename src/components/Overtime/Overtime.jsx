import React, { useState } from 'react'
import styles from './Overtime.module.css'
import { saveOvertime, saveDualsOvertime, handleResetOvertime, handleResetDualsOvertime } from '../../helpers'

export function Overtime({ team_one, team_two, matchId, setSavedMatches, session, setSavedSession, setSession, setOvertime }) {
  const matchIndex = matchId.current - 1
  const [round, setRound] = useState({
    team_one: 0,
    team_two: 0
  })
  const [option, setOption] = useState(0)
  const p1 = team_one.players[matchIndex]
  const p2 = team_two.players[matchIndex]

  const handleOvertime = () => {
    console.log('ran')
    if (option === 1 || option === 2 || option === -1) {
      setRound({ ...round, team_one: round.team_one += 1 })
    } else if (option === 3 || option === 4 || option === -2) {

      setRound({ ...round, team_two: round.team_two += 1 })
    }
    saveOvertime(p1, p2, setSavedMatches, setSavedSession, setSession, session, option, setOvertime)
  }

  const resetOvertime = () => {
    handleResetOvertime(p1, p2, setSavedMatches, setSavedSession, setSession, session)
    setRound({ team_one: 0, team_two: 0 })
    alert("The overtime score has been reset!")
  }

  const countOvertimnePoints = (player) => {
    let count = 0
    for (let i = 0; i < player.overtime_scores.length; i++) {
      if (parseInt(player.overtime_scores[i]) === 8) {
        count += 1
      }
    }
    return count
  }


  console.log(p1)
  console.log(p2)

  return <div className={styles.overlay_content}>

    <h1>Overtime</h1>
    <h1>(attempts {round.team_one}) {team_one.name}  :  {team_two.name} ({round.team_two} attempts)</h1>
    <h1>Score:</h1>
    <h2> {team_one.name} {countOvertimnePoints(p1)} : {countOvertimnePoints(p2)} {team_two.name} </h2>
    <div className={styles.button_box}>
      <div className={styles.section}>
        {/* <button
          className={option === 5 ? styles.selected : null}
          onClick={() => setOption(5)}
        >Tied overtime (+1pt each)</button> */}
        {(round.team_one < 4) && (
          <>
            <button
              className={option === 1 ? styles.selected : null}
              onClick={() => setOption(1)}
            >
              <img src={team_one.graphic} className={styles.logo} />(Hit +1pt)
            </button>
            <button
              className={option === -1 ? styles.selected : null}
              onClick={() => setOption(-1)}
            >
              <img src={team_one.graphic} className={styles.logo} />(Miss)
            </button>

          </>)}

        {(round.team_two < 4) && (
          <>
            <button

              className={option === 3 ? styles.selected : null}
              onClick={() => setOption(3)}

            >

              <img src={team_two.graphic} className={styles.logo} />  (Hit +1pt)
            </button>
            <button
              className={option === -2 ? styles.selected : null}
              onClick={() => setOption(-2)}
            >
              <img src={team_two.graphic} className={styles.logo} />(Miss)
            </button>

          </>)}


        {
          round.team_one === 4 && round.team_two === 4 && (
            <>        <button
              className={option === 2 ? styles.selected : null}
              onClick={() => setOption(2)}
            >
              <img src={team_one.graphic} className={styles.logo} /> WSL Winner (Non-Hit)
            </button>
              <button
                onClick={() => setOption(4)}

                className={option === 4 ? styles.selected : null}
              >
                <img src={team_two.graphic} className={styles.logo} />WSL Winner (Non-Hit)
              </button>
            </>

          )}
      </div>
    </div>


    <button
      className={option !== 0 ? styles.confirm : styles.disabled}
      onClick={() => handleOvertime()}
      disabled={option === 0}
    >Confirm</button>

    <button onClick={resetOvertime}

      className={styles.dangerous}
    >reset overtime</button>


  </div >
}



export function DualsOvertime({ team_one, team_two, matchId, setSavedMatches, session, setSavedSession, setSession, setOvertime }) {
  const matchIndex = matchId.current - 1
  const [round, setRound] = useState(1)
  const [option, setOption] = useState(0)
  const p1 = team_one.players[matchIndex]
  const p1_partner = team_one.players[matchIndex + 1]
  const p2 = team_two.players[matchIndex]
  const p2_partner = team_two.players[matchIndex + 1]

  const handleOvertime = () => {
    saveDualsOvertime(p1, p2, p1_partner, p2_partner, setSavedMatches, setSavedSession, session, setSession, option, setOvertime)
    setRound(round => round + 1)
  }

  const resetOvertime = () => {
    handleResetDualsOvertime(p1, p2, p1_partner, p2_partner, setSavedMatches, setSavedSession, session, setSession)
    setRound(1)
  }



  return <div className={styles.overlay_content}>

    <h1>Duals Overtime! Round: {round}</h1>
    <h1> {team_one.name}&nbsp; {team_one.players[matchIndex].team_points} : {team_two.players[matchIndex].team_points} {team_two.name} </h1>
    <div className={styles.button_box}>
      <div className={styles.section_col}>
        <button
          className={option === 7 ? styles.large_button_selected : styles.large_button}
          onClick={() => setOption(7)}
        >Tied Overtime Round (+1pt each)</button>
        <button
          className={option === 8 ? styles.large_button_selected : styles.large_button}
          onClick={() => setOption(8)}
        >Tied Overtime Round (+2pt each)</button>
      </div>

      <div className={styles.section_col}>
        <button
          className={option === 1 ? styles.selected : null}
          onClick={() => setOption(1)}
        >
          <img src={team_one.graphic} className={styles.logo} />2: 0 (Hit +2pt) &nbsp;
          <img src={team_two.graphic} className={styles.logo} />
        </button>
        <button
          className={option === 9 ? styles.selected : null}
          onClick={() => setOption(9)}
        >
          <img src={team_one.graphic} className={styles.logo} />2: 1 (Hit +1pt) &nbsp;
          <img src={team_two.graphic} className={styles.logo} />
        </button>
        <button
          className={option === 2 ? styles.selected : null}
          onClick={() => setOption(2)}
        >
          <img src={team_one.graphic} className={styles.logo} />1: 0 (Hit +1pt) &nbsp;
          <img src={team_two.graphic} className={styles.logo} />
        </button>
        <button
          className={option === 3 ? styles.selected : null}
          onClick={() => setOption(3)}
        >
          <img src={team_one.graphic} className={styles.logo} /> WSL-Winner

        </button>
      </div>
      <div className={styles.section_col}>
        <button
          className={option === 4 ? styles.selected : null}
          onClick={() => setOption(4)}
        >
          <img src={team_one.graphic} className={styles.logo} />0 : 2 (Hit +2pt) &nbsp;
          <img src={team_two.graphic} className={styles.logo} />
        </button>
        <button
          className={option === 10 ? styles.selected : null}
          onClick={() => setOption(10)}
        >
          <img src={team_one.graphic} className={styles.logo} />1:2 (Hit +1pt) &nbsp;
          <img src={team_two.graphic} className={styles.logo} />
        </button>
        <button
          className={option === 5 ? styles.selected : null}
          onClick={() => setOption(5)}
        >
          <img src={team_one.graphic} className={styles.logo} /> 0:1 (Hit +1pt) &nbsp;
          <img src={team_two.graphic} className={styles.logo} />
        </button>
        <button
          className={option === 6 ? styles.selected : null}
          onClick={() => setOption(6)}
        >
          <img src={team_two.graphic} className={styles.logo} /> WSL-Winner
        </button>
      </div>
    </div>



    <button
      className={option !== 0 ? styles.confirm : styles.disabled}
      onClick={() => handleOvertime()}
      disabled={!(option > 0)}
    >Confirm</button>

    <button className={styles.dangerous} onClick={resetOvertime}>Reset overtime</button>


  </div>
}