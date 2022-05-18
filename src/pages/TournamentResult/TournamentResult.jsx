import React, { useEffect, useState, useContext } from 'react'
import styles from './TournamentResult.module.css'
import { ExportJsonCsv } from 'react-export-json-csv'
import winIcon from './../../assets/icons/win.svg'
import lostIcon from './../../assets/icons/lost.svg'


export default function TournamentResult() {
  const [matches, setMatches] = useState([])
  const [exportDataTeamOne, setExportDataTeamOne] = useState([])
  const [exportDataTeamTwo, setExportDataTeamTwo] = useState([])
  // const generateData = (matches, team_id) => {
  //   const export_data = []
  //   if (team_id === 1) {
  //     for (let i = 0; i < matches.length; i++) {
  //       export_data.push({

  //         id: matches[i].player_one.name,
  //         t1: matches[i].player_one.scores[0],
  //         t2: matches[i].player_one.scores[1],
  //         t3: matches[i].player_one.scores[2],
  //         t4: matches[i].player_one.scores[3],
  //         t5: matches[i].player_one.scores[4],
  //         sum: matches[i].player_one.total_score,
  //         points: matches[i].player_one.team_points,
  //         time: matches[i].date
  //       })

  //     }

  //     return export_data
  //   } else if (team_id === 2) {
  //     for (let i = 0; i < matches.length; i++) {
  //       export_data.push({

  //         id: matches[i].player_two.name,
  //         t1: matches[i].player_two.scores[0],
  //         t2: matches[i].player_two.scores[1],
  //         t3: matches[i].player_two.scores[2],
  //         t4: matches[i].player_two.scores[3],
  //         t5: matches[i].player_two.scores[4],
  //         sum: matches[i].player_two.total_score,
  //         points: matches[i].player_two.team_points,

  //         time: matches[i].date
  //       })

  //     }
  //     return export_data
  //   }

  // }
  useEffect(() => {
    const my_matches = localStorage.getItem("matches")
    const my_matches_json = JSON.parse(my_matches)
    setMatches(my_matches_json)
    // const export_data_team_one = generateData(my_matches_json, 1)

    // setExportDataTeamOne(export_data_team_one)

    // const export_data_team_two = generateData(my_matches_json, 2)
    // setExportDataTeamTwo(export_data_team_two)
  }, [])




  const CSVExport = ({ team_id }) => {
    const headers = [
      {
        key: 'id',
        name: 'Player',
      }, {
        key: 't1',
        name: 'Throw 1',
      }, {
        key: 't2',
        name: 'Throw 2',
      }, {
        key: 't3',
        name: 'Throw 3',
      }, {
        key: 't4',
        name: 'Throw 4',
      },
      {
        key: 't5',
        name: 'Throw 5',
      },
      {
        key: 'sum',
        name: 'TOTAL',
      },
      {
        key: 'points',
        name: 'Points',
      },
      {
        key: 'time',
        name: "time"
      }

    ]

    return (
      <div style={{ padding: "25px" }}>
        <ExportJsonCsv
          headers={headers}
          items={team_id === 1 ? exportDataTeamOne : exportDataTeamTwo}
        >Export Csv for Team {team_id}
        </ExportJsonCsv>
      </div>)

  }

  return (<div className={styles.root}>
    {
      matches.map((match) => {
        return (<div className={styles.match_container} key={match.id}>
          <div className={styles.header}>Match Number {match.id}</div>
          <div className={styles.row}>
            <div className={styles.row_item}>{match.player_one.name} ({match.player_one.team_points})</div>
            <div className={styles.row_item}>{match.player_two.name}({match.player_two.team_points})</div>
          </div>
          <div className={styles.row}>
          </div>
          <div className={styles.score_section}>
            <div className={styles.col}>
              {
                match.player_one.scores.map((score, idx) => <div key={idx} className={styles.col_item}>{score}</div>)
              }

              <div className={styles.col_item + " " + styles.bold}>Total: {match.player_one.total_score}</div>

              <div className={styles.col_item}>{match.player_one.win ?

                <div>
                  <img src={winIcon} alt="win" />{match.player_one.overtime ? "OT" : null}
                </div>

                : <img src={lostIcon} alt="lost" />}</div>
            </div>
            <div className={styles.col}>
              {

                match.player_two.scores.map((score, idx) => <div key={idx} className={styles.col_item}>{score}</div>)
              }
              <div className={styles.col_item + " " + styles.bold}>Total: {match.player_two.total_score}</div>
              <div className={styles.col_item}>{match.player_two.win ?
                <div >
                  <img src={winIcon} alt="win" />{match.player_two.overtime ? "OT" : null}
                </div>
                : <img src={lostIcon} alt="lost" />}</div>
            </div>
          </div>

        </div>

        )
      })
    }
    <div className={styles.csv_export_container}>
      {/* <CSVExport team_id={1} /> */}

      {/* <CSVExport team_id={2} /> */}


      <a href="/">Setup New Tournament</a>
    </div>
  </div>)
}