import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './TournamentSetup.module.css'
import { months, teams } from '../../data.js'
import { generatePlayers } from '../../helpers'
import Team from '../../components/Team/Team'


export default function TournamentSetup() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [teamOne, setTeamOne] = useState()
  const [teamTwo, setTeamTwo] = useState()
  const [openTeamOne, setOpenTeamOne] = useState(true)
  const [openTeamTwo, setOpenTeamTwo] = useState(true)

  const handleChange = (e) => {
    e.preventDefault()
    setName(e.target.value)
  }

  const t1 = teams[0]
  const handleSelect = (e) => {
    e.preventDefault()
    if (e.target.name === "teamOne" && e.target.value > 0) {
      const default_players = generatePlayers(1)
      const default_team = teams[e.target.value - 1]
      default_team.players = default_players
      default_team.starter = true
      setTeamOne(default_team)
    } else if (e.target.name === "teamTwo" && e.target.value > 0) {
      const default_players = generatePlayers(2)
      const default_team = teams[e.target.value - 1]
      default_team.players = default_players
      default_team.starter = false
      setTeamTwo(default_team)
    }
  }

  const isReady = () => {
    if (name.length > 2 && teamOne && teamTwo) {
      return true
    }
  }

  const startTournament = () => {
    localStorage.clear()

    if (teamOne && teamTwo) {
      navigate('/play_matches', {
        state: {
          status: "M1",
          half: 1,
          tournament_name: name,
          team_one: teamOne,
          team_two: teamTwo,
          date: new Date()
        }
      })
    } else {
      alert("Please select two teams before moving on")
    }

  }

  const getDate = () => {
    const time = new Date()
    const month = (time.getMonth() + 1).toString()
    const month_with_zero = month.length === 1 ? `0${month}` : month

    const day = time.getDate()
    const year = time.getFullYear()
    return `${month_with_zero}/${day}/${year}`
    const appenditures = ["st", "nd", "rd", "th"]
    // if (day === 1) {
    //   return `The ${day}${appenditures[0]} of ${month}`
    // } else if (day === 2) {
    //   return `The ${day}${appenditures[1]} of ${month}`
    // } else if (day === 3) {
    //   return `The ${day}${appenditures[2]} of ${month}`
    // }
    // else {
    //   return `The ${day}${appenditures[3]} of ${month}`
    // }
  }

  return (<div className={styles.root}>
    <div className={styles.form_container}>
      <div className={styles.meta}>
        <h2>Tournament Setup</h2>
        <h3>Date:  {getDate()}</h3>
        <label htmlFor="name">Name
          <input
            name="name"
            className={styles.name_input}
            type="text"
            placeholder='Enter the Tournament Name'
            onChange={handleChange}
            value={name}
          /></label>
      </div>
      <div>

        <div className={styles.select__container}>
          <div className={styles.half}>

            <label htmlFor="teamOne">
              <select
                name="teamOne"
                className={styles.select}
                type="select"
                onChange={handleSelect}
                value={teamOne ? teamOne.id : 0}
              >
                <option className={styles.disabled} value={0}>Select Team</option>
                {

                  teams.map((team, idx) => <option key={idx} value={team.id}>{team.name}</option>)
                }
              </select>
            </label>
            <div >
              {/* {teamOne && !openTeamOne ? <button onClick={() => setOpenTeamOne(true)}>Show {teamOne.name} Players</button> : null} */}
              {(teamOne && openTeamOne) ?
                <Team
                  team={teamOne}
                  setTeam={setTeamOne}
                  setOpenTeam={setOpenTeamOne}
                /> : null}
            </div>
          </div>

          <div className={styles.half}>

            <label htmlFor="teamTwo">
              <select
                name="teamTwo"
                className={styles.select}
                type="select"
                onChange={handleSelect}
                value={teamTwo ? teamTwo.id : 0}
              >
                <option className={styles.disabled} value={0}>Select Team</option>
                {
                  teams.map((team, idx) => <option key={idx} value={team.id}>{team.name}</option>)
                }
              </select>
            </label>

            {/* {teamTwo && !openTeamTwo ? <button onClick={() => setOpenTeamTwo(true)}>Show {teamTwo.name} Players</button> : null} */}
            <div>
              {(teamTwo && openTeamTwo) ?
                <Team
                  team={teamTwo}
                  setTeam={setTeamTwo}
                  setOpenTeam={setOpenTeamTwo}
                /> : null}
            </div>
          </div>
        </div>
        <button className={isReady() ? styles.start : styles.disabled} onClick={startTournament}>Start Tournament</button>
      </div>
    </div>
  </div>)
}
