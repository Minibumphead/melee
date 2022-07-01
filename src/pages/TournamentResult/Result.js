import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './TournamentResult.module.css'
import { ExportJsonCsv } from 'react-export-json-csv'
import winIcon from './../../assets/icons/win.svg'
import lostIcon from './../../assets/icons/lost.svg'
import { getDisciplineFromId, sumScoresArray } from '../../helpers'
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
          <div className={styles.bold}>{sumScoresArray(player.scores)}</div>
        </div>
        <div className={styles.flex}>
          <div className={styles.bold}>P</div>
          <div className={styles.bold}>{player.team_points}</div>
        </div>

      </div>)
  }
  const ReversePlayer = ({ player }) => {
    const darkTheme = [3, 4, 8, 9].includes(player.id)
    return (
      <div className={darkTheme ? styles.col_player_dark_theme : styles.col_player}>
        <div className={styles.header}>{player.name}</div>
        <div className={styles.flex}>

          <div className={styles.row_item}>Score</div>
          <div className={styles.row_item}>Round</div>
        </div>
        {player.scores.map((score, idx) => {
          return (
            <div key={idx} className={styles.flex}>
              <div className={styles.row_item}>{score.slice(0, 3)}</div>
              <div className={styles.row_item}>{idx + 1}</div>
            </div>)
        })}
        <div className={styles.flex}>
          <div className={styles.bold}>{sumScoresArray(player.scores)}</div>
          <div className={styles.bold}>T</div>
        </div>
        <div className={styles.flex}>
          <div className={styles.bold}>{player.team_points}</div>
          <div className={styles.bold}>P</div>
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

  const DualMatch = ({ p1, p1_partner, p2, p2_partner }) => {
    let duals_team_one_scores = []
    let duals_team_two_scores = []
    p1.scores.forEach((score, idx) => {
      duals_team_one_scores.push(parseInt(score) + parseInt(p1_partner.scores[idx]))
    })
    p2.scores.forEach((score, idx) => {
      duals_team_two_scores.push(parseInt(score) + parseInt(p1_partner.scores[idx]))
    })

    const duals_team_one = {
      id: p1.id,
      finished_match: p1.finished_match,
      name: `${p1.name} + ${p1_partner.name}`,
      scores: duals_team_one_scores,
      team_id: p1.team_id,
      team_points: p1.team_points,
      total_score: p1.total_score,
      win: p1.win
    }
    const duals_team_two = {
      id: p2.id,
      finished_match: p2.finished_match,
      name: `${p2.name} + ${p2_partner.name}`,
      scores: duals_team_two_scores,
      team_id: p2.team_id,
      team_points: p2.team_points,
      total_score: p2.total_score,
      win: p2.win
    }
    return (
      <div className={styles.col_duals}>
        <div className={styles.flex}>
          <div className={styles.bold} >{duals_team_one.name} <img src={duals_team_one.win ? winIcon : lostIcon} className={styles.icon} alt="result_icon" /></div>
          <div className={styles.bold} >vs</div>
          <div className={styles.bold} > <img src={duals_team_two.win ? winIcon : lostIcon} className={styles.icon} alt="result_icon" /> {duals_team_two.name}</div>
        </div>
        <div className={styles.flex}>

          <div className={styles.bold}>{`Match ${calculateMatchNumber(duals_team_one.id)} `}</div>
          <div className={styles.bold}>
            {getDisciplineFromId(duals_team_one.id)}
          </div>
        </div>


        <div className={styles.flex}>
          <div className={styles.row_item}>Round</div>
          <div className={styles.row_item}>Score</div>
          <div className={styles.row_item}>Score</div>
          <div className={styles.row_item}>Round</div>
        </div>
        {duals_team_one.scores.map((score, idx) => {
          return (
            <div key={idx} className={styles.flex}>
              <div className={styles.row_item}>{idx + 1}</div>
              <div className={styles.row_item}>{score}</div>
              <div className={styles.row_item}>{duals_team_two.scores[idx]}</div>
              <div className={styles.row_item}>{idx + 1}</div>
            </div>
          )
        })}
        <div className={styles.flex}>
          <div className={styles.bold}>Total</div>
          <div className={styles.bold}>{duals_team_one.total_score}</div>
          <div className={styles.bold}>{duals_team_two.total_score}</div>
          <div className={styles.bold}>Total</div>
        </div>
        <div className={styles.flex}>
          <div className={styles.bold}>Pts</div>
          <div className={styles.bold}>{duals_team_one.team_points}</div>
          <div className={styles.bold}>{duals_team_two.team_points}</div>
          <div className={styles.bold}>Pts</div>
        </div>
      </div>
    )

  }
  return <div>

    {sessionData.team_one ? (
      <div className={styles.test}>
        {matchView ?
          <div className={styles.root}>
            {sessionData.team_one.players.slice(0, 2).map((player, idx) => <Match key={player.id} player={player} opponent={sessionData.team_two.players[parseInt(player.id) - 1]} />)}

            <DualMatch p1={sessionData.team_one.players[2]} p1_partner={sessionData.team_one.players[3]} p2={sessionData.team_two.players[2]} p2_partner={sessionData.team_two.players[3]} />

            {sessionData.team_one.players.slice(4, 6).map((player, idx) => <Match key={player.id} player={player} opponent={sessionData.team_two.players[parseInt(player.id) - 1]} />)}
            <DualMatch p1={sessionData.team_one.players[7]} p1_partner={sessionData.team_one.players[8]} p2={sessionData.team_two.players[7]} p2_partner={sessionData.team_two.players[8]} />
            {sessionData.team_one.players.slice(8, 10).map((player, idx) => <Match key={player.id} player={player} opponent={sessionData.team_two.players[parseInt(player.id) - 1]} />)}


          </div> :
          <div >
            <div className={styles.root}>

              <img src={sessionData.team_one.graphic} className={styles.team_logo} />
              {
                sessionData.team_one.players.map((player, idx) => {
                  if ([0, 1, 2, 4, 5, 6, 7, 9].includes(idx)) {
                    return <Player key={player.id} player={player} icon={sessionData.team_one.graphic} />
                  } else if ([3, 8].includes(idx)) {

                    return <ReversePlayer key={player.id} player={player} icon={sessionData.team_one.graphic} />
                  }
                })
              }
            </div>
            <div className={styles.root}>
              <img src={sessionData.team_two.graphic} className={styles.team_logo} />
              {
                sessionData.team_two.players.map((player, idx) => {
                  if ([0, 1, 2, 4, 5, 6, 7, 9].includes(idx)) {
                    return <Player key={player.id} player={player} icon={sessionData.team_two.graphic} />
                  } else if ([3, 8].includes(idx)) {

                    return <ReversePlayer key={player.id} player={player} icon={sessionData.team_two.graphic} />
                  }
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