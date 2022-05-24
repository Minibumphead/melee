import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './TournamentResult.module.css'
import { ExportJsonCsv } from 'react-export-json-csv'
import winIcon from './../../assets/icons/win.svg'
import lostIcon from './../../assets/icons/lost.svg'
import { getDisciplineFromId } from '../../helpers'
import { useLocation } from 'react-router-dom'
import { calculateMatchNumber } from '../../components/InformationHeader/InformationHeader'


export default function Result() {

  const location = useLocation()
  const navigate = useNavigate()
  const [matchView, setMatchView] = useState(true)

  const [sessionData, setSessionData] = useState([])
  const [exportDataTeamOne, setExportDataTeamOne] = useState([])
  const [exportDataTeamTwo, setExportDataTeamTwo] = useState([])



  useEffect(() => {
    console.log('ran')
    const data = JSON.parse(localStorage.getItem('session'))
    setSessionData(data)

  }, [location.pathname])



  const toggleMatchView = () => {
    setMatchView(!matchView)
  }

  const Player = ({ player }) => {
    const darkTheme = [3, 4, 8, 9].includes(player.id)
    return (
      <div className={darkTheme ? styles.col_player_dark_theme : styles.col_player}>
        <div className={styles.header}>{player.name}</div>
        <div className={styles.flex}>
          <div className={styles.row_item}>Round</div>
          <div className={styles.row_item}>Score</div>
        </div>
        {player.scores.map((score, idx) => {
          return (
            <div key={idx} className={styles.flex}>
              <div className={styles.row_item}>{idx + 1}</div>
              <div className={styles.row_item}>{score.slice(0, 3)}</div>
            </div>)
        })}
        <div className={styles.flex}>
          <div className={styles.bold}>T</div>
          <div className={styles.bold}>{player.total_score}</div>
        </div>
        <div className={styles.flex}>
          <div className={styles.bold}>P</div>
          <div className={styles.bold}>{player.team_points}</div>
        </div>

      </div>)
  }
  const Match = ({ player, opponent }) => {


    return (
      <div className={styles.col}>
        <div className={styles.flex}>
          <div className={styles.bold} >{player.name} <img src={player.win ? winIcon : lostIcon} className={styles.icon} alt="result_icon" /></div>
          <div className={styles.bold} >vs</div>
          <div className={styles.bold} > <img src={opponent.win ? winIcon : lostIcon} className={styles.icon} alt="result_icon" /> {opponent.name}</div>
        </div>
        <div className={styles.flex}>

          <div className={styles.bold}>{`Match ${calculateMatchNumber(player.id)} `}</div>
          <div className={styles.bold}>
            {getDisciplineFromId(player.id)}
          </div>
        </div>


        <div className={styles.flex}>
          <div className={styles.row_item}>Round</div>
          <div className={styles.row_item}>Score</div>
          <div className={styles.row_item}>Score</div>
          <div className={styles.row_item}>Round</div>
        </div>
        {player.scores.map((score, idx) => {
          return (
            <div key={idx} className={styles.flex}>
              <div className={styles.row_item}>{idx + 1}</div>
              <div className={styles.row_item}>{score.slice(0, 3)}</div>
              <div className={styles.row_item}>{opponent.scores[idx].slice(0, 3)}</div>
              <div className={styles.row_item}>{idx + 1}</div>
            </div>
          )
        })}
        <div className={styles.flex}>
          <div className={styles.bold}>Total</div>
          <div className={styles.bold}>{player.total_score}</div>
          <div className={styles.bold}>{opponent.total_score}</div>
          <div className={styles.bold}>Total</div>
        </div>
        <div className={styles.flex}>
          <div className={styles.bold}>Pts</div>
          <div className={styles.bold}>{player.team_points}</div>
          <div className={styles.bold}>{opponent.team_points}</div>
          <div className={styles.bold}>Pts</div>
        </div>
      </div>)
  }
  return <div>

    {sessionData.team_one ? (
      <div className={styles.test}>
        {matchView ?
          <div className={styles.root}>
            {sessionData.team_one.players.map((player, idx) => ![2, 3, 7, 8].includes(idx) ? <Match key={player.id} player={player} opponent={sessionData.team_two.players[parseInt(player.id) - 1]} /> : null)}
          </div> :
          <div >
            <div className={styles.root}>

              <img src={sessionData.team_one.graphic} className={styles.team_logo} />
              {
                sessionData.team_one.players.map((player, idx) => {
                  return (
                    <Player key={player.id} player={player} icon={sessionData.team_one.graphic} />
                  )
                })
              }
            </div>
            <div className={styles.root}>
              <img src={sessionData.team_two.graphic} className={styles.team_logo} />
              {
                sessionData.team_two.players.map((player, idx) => {
                  return (
                    <Player key={player.id} player={player} icon={sessionData.team_two.graphic} />
                  )
                })
              }
            </div>
          </div>


        }

      </div>
    ) : null}


    <button onClick={toggleMatchView}>{matchView ? "Switch to Team View" : "Switch to Match View"} </button>
    <button onClick={() => {
      navigate('/play_matches', { state: { ...sessionData, half: 3 } })
    }}>Back to Matchplay</button>
  </div>
}