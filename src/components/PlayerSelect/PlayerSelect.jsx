
import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styles from './PlayerSelect.module.css'


export default function PlayerSelect() {
  const disciplines = ["H1", "H2", "D1-P1", "D1-P2", "BA", "H3", "H4", "D2-P1", "D2-P2", "BA2"]
  const location = useLocation()
  const navigate = useNavigate()

  const otPlayersTeamOne = location.state.team_one.otPlayers
  const otPlayersTeamTwo = location.state.team_two.otPlayers
  const [teamOne, setTeamOne] = useState({ ...location.state.team_one, otPlayers: otPlayersTeamOne !== undefined ? otPlayersTeamOne : [] })
  const [teamTwo, setTeamTwo] = useState({ ...location.state.team_two, otPlayers: otPlayersTeamTwo !== undefined ? otPlayersTeamTwo : [] })
  const [otRound, setOtRound] = useState(0)
  const [extendedDisciplineIndex, setExtendedDisciplineIndex] = useState(
    location.state.half !== 'pk' ? undefined :
      otPlayersTeamOne.length <= 5 ? otPlayersTeamOne.length % 5 : otPlayersTeamOne.length % 10)
  const [unavailablePlayersTeamOne, setUnavailablePlayersTeamOne] = useState([])
  const [unavailablePlayersTeamTwo, setUnavailablePlayersTeamTwo] = useState([])


  const prepareOvertimePlayers = () => {
    const t1Players = teamOne.players.filter(player => teamOne.otPlayers.includes(player.id.toString()))
    const t2Players = teamTwo.players.filter(player => teamTwo.otPlayers.includes(player.id.toString()))
    t1Players.forEach(player => player['penalty_scores'] === undefined ? player['penalty_scores'] = [] : player['penalty_scores'])
    t2Players.forEach(player => player['penalty_scores'] === undefined ? player['penalty_scores'] = [] : player['penalty_scores'])
  }


  const resumeTournament = () => {

    prepareOvertimePlayers()
    if (teamOne.otPlayers.length > 5) {
      localStorage.setItem('overtimeIndex', (parseInt(extendedDisciplineIndex) + 1).toString())
    }

    navigate('/play_matches', {
      state: {
        status: teamOne.otPlayers.length > 5 ? "extended_overtime" : "overtime",
        overtimeIndex: extendedDisciplineIndex,
        half: 'pk',
        team_one: teamOne,
        team_two: teamTwo,
      }
    })
  }

  const handleChangeTeamOne = (e, idx) => {
    e.preventDefault()
    const tempArray = teamOne.otPlayers
    const newPlayerIndex = parseInt(localStorage.getItem('overtimeIndex')) + 5

    teamOne.otPlayers.length >= 5 ?
      tempArray[newPlayerIndex] = e.target.value :
      tempArray[idx] = e.target.value
    setTeamOne({ ...teamOne, otPlayers: tempArray })
  }

  console.log(teamOne.otPlayers)
  const handleChangeTeamTwo = (e, idx) => {
    e.preventDefault()
    const tempArray = teamTwo.otPlayers
    teamTwo.players.length >= 5 ? tempArray[tempArray.length] =
      e.target.value :
      tempArray[idx] = e.target.value
    setTeamTwo({ ...teamTwo, otPlayers: tempArray })
  }

  const checkForPlayerInOtArray = (player) => {
    if (player.team_id === 1) {
      const idString = player.id.toString()
      const isSelected = teamOne.otPlayers.includes(idString)
      return isSelected
    } else if (player.team_id === 2) {

      const idString = player.id.toString()
      const isSelected = teamTwo.otPlayers.includes(idString)
      return isSelected
    }

  }

  useEffect(() => {
    const currentOvertimeIndex = localStorage.getItem("overtimeIndex")
    if (location.state.status === 'overtime') {
      localStorage.setItem("overtimeIndex", "0")
      setExtendedDisciplineIndex(0)
    } else if (parseInt(currentOvertimeIndex) >= 1) {
      setExtendedDisciplineIndex(parseInt(currentOvertimeIndex))
    }

  }, [])

  useEffect(() => {
    const chunkSize = 5
    const chunkedArrayTeamOne = []
    for (let i = 0; i < teamOne.otPlayers.length; i += chunkSize) {
      const res = teamOne.otPlayers.slice(i, i + chunkSize)
      chunkedArrayTeamOne[chunkedArrayTeamOne.length] = res
    }

    const chunkedArrayTeamTwo = []
    for (let i = 0; i < teamTwo.otPlayers.length; i += chunkSize) {
      const res = teamTwo.otPlayers.slice(i, i + chunkSize)
      chunkedArrayTeamTwo[chunkedArrayTeamTwo.length] = res
    }


    if (teamOne.otPlayers.length > 5) {
      const lenOfChunkedArray = chunkedArrayTeamOne.length
      const tempOtRound = lenOfChunkedArray % 5 === 0 ? lenOfChunkedArray + 1 : lenOfChunkedArray
      setOtRound(tempOtRound)
      if (location.state.status === 'extended_overtime') {
        console.log(tempOtRound)
        if (tempOtRound % 2 !== 0) {
          setUnavailablePlayersTeamOne(chunkedArrayTeamOne[tempOtRound - 1])
          setUnavailablePlayersTeamTwo(chunkedArrayTeamTwo[tempOtRound - 1])
        }

      }

    }

    console.log(chunkedArrayTeamOne.length)
    console.log(unavailablePlayersTeamOne)

    console.log(chunkedArrayTeamOne)
    console.log(chunkedArrayTeamTwo)
  }, [otRound])

  return (
    <div className={styles.form_container}>
      <h2>Select your Overtime Players</h2>


      <div className={styles.team__container}>

        {(teamOne) &&
          (<div className={styles.half}>
            <h1>{teamOne.name}</h1>
            {teamOne.otPlayers.length <= 5 && location.state.status === 'initial_select'
              ?
              <div>
                {["H1", "H2", "D1", "D2", "BA"].map((discipline, idx) => {
                  return (<label key={discipline} className={styles.row}>{discipline}
                    <select onChange={e => handleChangeTeamOne(e, idx)}>
                      <option>Select a Player for {discipline}</option>
                      {
                        teamOne.players.map(player => {
                          return <option key={player.id} value={player.id} disabled={player ? checkForPlayerInOtArray(player) : false}>{player.name}</option>
                        })
                      }

                    </select>

                  </label>)
                })}
              </div> :
              <div>
                <label className={styles.row}>{disciplines[extendedDisciplineIndex]}
                  <select onChange={e => handleChangeTeamOne(e, extendedDisciplineIndex)}>
                    <option>Select a Player for {disciplines[extendedDisciplineIndex]}</option>
                    {
                      teamOne.players.map(player => {
                        return <option key={player.id} value={player.id} disabled={player ? unavailablePlayersTeamOne.includes(player.id.toString()) : false}>{player.name}</option>
                      })
                    }

                  </select>

                </label>

              </div>

            }

          </div>)}

        {(teamTwo) &&
          (<div className={styles.half}>
            <h1>{teamTwo.name}</h1>

            {teamOne.otPlayers.length <= 5 && location.state.status === 'initial_select' ?
              <div>
                {["H1", "H2", "D1", "D2", "BA"].map((discipline, idx) => {
                  return (<label key={discipline} className={styles.row}>{discipline}
                    <select onChange={e => handleChangeTeamTwo(e, idx)}>
                      <option>Select a Player for {discipline}</option>
                      {
                        teamTwo.players.map(player => {
                          return <option key={player.id} value={player.id} disabled={player ? checkForPlayerInOtArray(player) : false}>{player.name}</option>
                        })
                      }

                    </select>

                  </label>)
                })}
              </div> : <div>
                <label className={styles.row}>{disciplines[extendedDisciplineIndex]}
                  <select onChange={e => handleChangeTeamTwo(e, extendedDisciplineIndex)}>
                    <option>Select a Player for {disciplines[extendedDisciplineIndex]}</option>
                    {
                      teamTwo.players.map(player => {
                        return <option key={player.id} value={player.id} disabled={player ? unavailablePlayersTeamTwo.includes(player.id.toString()) : false}>{player.name}</option>
                      })
                    }

                  </select>

                </label>
              </div>}
          </div>)}
      </div>

      <button className={styles.start} onClick={resumeTournament}>Resume Tournament</button>
    </div>)
}



 // const isReady = () => {
  //   const playerCountTeamOne = teamOne.otPlayers.length
  //   const playerCountTeamTwo = teamTwo.otPlayers.length
  //   if (playerCountTeamOne === 5 && playerCountTeamTwo === 5) {
  //     return true
  //   } else {
  //     alert('please select 5 unique players for each team')
  //     return false
  //   }
  // }