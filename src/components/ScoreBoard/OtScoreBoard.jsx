
import React, { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import styles from './OtScoreBoard.module.css'
import ActivePenaltyKillsPlayer from '../ActivePenaltyKillsPlayer/ActivePenaltyKillsPlayer'
import { useLocalStorage } from './../../helpers'


function OtScoreBoard({
  session,
  setSession,

}) {

  const location = useLocation()


  const navigate = useNavigate()
  const [pkIndex, setPkIndex] = useLocalStorage('pkIndex', 0, useState)
  const [throwCounts, setThrowCounts] = useState({ t1: 0, t2: 0 })









  useEffect(() => {
    const extendedOvertimeIndex = parseInt(localStorage.getItem('overtimeIndex'))
    if (extendedOvertimeIndex >= 0) {
      setPkIndex(session.team_one.otPlayers.length)
    }
  }, [])



  useEffect(() => {
    const currOvertimeScores = getTotalOvewrtimeScores(session.team_one.players, session.team_two.players)
    const teamsAreTied = currOvertimeScores[0] === currOvertimeScores[1]
    const haveEqualThrowCounts = throwCounts.t1 === throwCounts.t2
    const extendedOvertimeIndex = parseInt(localStorage.getItem('overtimeIndex'))
    const haveExtendedOvertime = extendedOvertimeIndex >= 0 && extendedOvertimeIndex !== null

    if (pkIndex >= 5) {
      if (
        (teamsAreTied)) {

        if (session.status === 'overtime') {
          navigate('/overtime', {
            state: {
              ...session
            }
          })
        }
        if (throwCounts.t1 > 0 && throwCounts.t2 > 0 && haveExtendedOvertime)
          navigate('/overtime', {
            state: {
              ...session
            }
          })
      }
    } else if (session.status === 'extended_overtime' && !teamsAreTied) {

      const currOvertimeScores = getTotalOvewrtimeScores(session.team_one.players, session.team_two.players)
      const teamsAreTied = currOvertimeScores[0] === currOvertimeScores[1]
      if (!teamsAreTied) {
        if (currOvertimeScores[0] > currOvertimeScores[1]) {
          alert(session.team_one.name + 'wins in Overtime')
          navigate('/view_result')
          return;
        } else {
          alert(session.team_two.name + 'wins in Overtime')
          navigate('/view_result')
        }
      }
    }

  }, [pkIndex])


  const advancePenaltyKills = () => {
    if (pkIndex < 5 && session.status === 'overtime') {
      setPkIndex(prevIndex => prevIndex + 1)
    } else if (session.status === 'extended_overtime') {
      setPkIndex(prevIndex => prevIndex + 1)
    }
  }
  const { team_one, team_two } = session
  const p1 = team_one.players.filter(player => player.id.toString() === session.team_one.otPlayers[pkIndex > 5 ? pkIndex - 1 : pkIndex])[0]
  // const p1_partner = team_one.players[matchIndex + 1]
  const p2 = team_two.players.filter(player => player.id.toString() === team_two.otPlayers[pkIndex > 5 ? pkIndex - 1 : pkIndex])[0]
  // const p2_partner = team_two.players[matchIndex + 1]


  const handleClick = (e, player) => {
    if (e.target.value === "Undo") {
      player.penalty_scores.pop()
      if (player.team_id === 1) {
        team_one.players[playerIndex] = player
        setSession({ ...session, team_one: { ...team_one, players: team_one.players } })
        return
      }
      if (player.team_id === 2) {
        team_two.players[playerIndex] = player
        setSession({ ...session, team_two: { ...team_two, players: team_two.players } })
        return
      }
    }
    console.log(team_one.otPlayers)
    console.log(team_one.otPlayers.penalty_scores)
    player.penalty_scores.push(e.target.value)
    const playerIndex = player.id - 1
    if (player.team_id === 1) {
      setThrowCounts(prevCounts => {
        return {
          ...prevCounts, t1: prevCounts.t1 + 1
        }
      })
      team_one.players[playerIndex] = player
      setSession({ ...session, team_one: { ...team_one, players: team_one.players } })
      return
    }
    if (player.team_id === 2) {
      setThrowCounts(prevCounts => {
        return {
          ...prevCounts, t2: prevCounts.t2 + 1
        }
      })
      team_two.players[playerIndex] = player
      setSession({ ...session, team_two: { ...team_two, players: team_two.players } })
      return
    }
  }

  const disciplines = ["H1", "H2", "D1", "D2", "BA"]
  const getDisciplineFromIndex = (idx) => {
    if (idx < 5) {
      return disciplines[idx]
    } else {
      const index = idx % 5
      return disciplines[index]
    }
  }

  const getTotalOvewrtimeScores = (team_one_players, team_two_players) => {
    let totalOtScoreTeamOne = 0
    let totalOtScoreTeamTwo = 0
    team_one_players.forEach(player => {
      if (player.penalty_scores) {
        player.penalty_scores.forEach(score => {
          if (parseInt(score) === 8) {
            totalOtScoreTeamOne += 1
          }
        })
      }

    })
    team_two_players.forEach(player => {
      if (player.penalty_scores) {
        player.penalty_scores.forEach(score => {
          if (parseInt(score) === 8) {
            totalOtScoreTeamTwo += 1
          }
        })
      }

    })
    return [totalOtScoreTeamOne, totalOtScoreTeamTwo]
  }

  console.log(team_one.otPlayers)
  console.log(pkIndex)


  return (
    <div className={styles.root}>
      <h1>
        {getDisciplineFromIndex(pkIndex - 1)}
      </h1>

      <div className={styles.flex}>
        {p1 &&
          <ActivePenaltyKillsPlayer
            callKill={true}
            player={p1}
            opponent={p2}
            handleClick={handleClick}
            pkIndex={pkIndex}
          />}
      </div>
      <div className={styles.middle__section}>
        <div className={styles.sidepanel__container}>
          {session.team_one.otPlayers.map((playerId, idx) => {
            const currentPlayer = team_one.players.filter(player => player.id.toString() === playerId)[0]
            return (<div className={styles.sidepanel} key={idx}>
              <div className={styles.discipline}>
                {getDisciplineFromIndex(idx)}
              </div>
              <div className={styles.name}>
                {currentPlayer.name}
              </div>
              <div className={styles['scores--left']}>
                {currentPlayer.penalty_scores.map((score, idx) => {
                  return (<p key={idx}>{score.slice(0, 1)}</p>)
                })}
              </div>
            </div>)
          }
          )}
        </div>

        <button onClick={advancePenaltyKills} className={styles.button}>Advance Penalty kills</button>
        <div className={styles['sidepanel__container--right']}>
          {session.team_two.otPlayers.map((playerId, idx) => {
            const currentPlayer = team_two.players.filter(player => player.id.toString() === playerId)[0]
            return (<div className={styles.sidepanel} key={idx}>
              <div className={styles['discipline--right']}>
                {getDisciplineFromIndex(idx)}
              </div>
              <div className={styles['name--right']}>
                {currentPlayer.name}
              </div>
              <div className={styles['scores--right']}>
                {currentPlayer.penalty_scores.map((score, idx) => {
                  return (<p key={idx}>{score.slice(0, 1)}</p>)
                })}
              </div>
            </div>)
          }
          )}
        </div>
      </div>
      {p2 && <div className={styles.flex}>
        <ActivePenaltyKillsPlayer
          callKill={true}
          player={p2}
          opponent={p1}
          handleClick={handleClick}
          pkIndex={pkIndex}
        />
      </div>}
    </div>
  )



}


export default OtScoreBoard