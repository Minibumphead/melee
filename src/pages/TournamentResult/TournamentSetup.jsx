import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './TournamentSetup.module.css'
import { months, teams, generatePlayers } from './../../data.js'


export default function TournamentSetup() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [teamOne, setTeamOne] = useState()
  const [teamTwo, setTeamTwo] = useState()

  const handleChange = (e) => {
    e.preventDefault()
    setName(e.target.value)
  }

  const handleSelect = (e) => {
    e.preventDefault()
    if (e.target.name === "teamOne") {
      setTeamOne(parseInt(e.target.value))
    } else if (e.target.name === "teamTwo") {
      setTeamTwo(e.target.value)
    }
  }

  const isReady = () => {
    if (name.length > 2 && teamOne && teamTwo) {
      return true
    }
  }


  const startTournament = () => {

    localStorage.clear()
    const first_team = teams[teamOne - 1]
    const second_team = teams[teamTwo - 1]

    if (teamOne && teamTwo) {
      navigate('/play_matches', {
        state: {
          tournament_name: name,
          team_one: { ...first_team, id: 1, players: generatePlayers(1) },
          team_two: { ...second_team, id: 2, players: generatePlayers(2) }
        }
      })
    } else {
      alert("Please select two teams before moving on")
    }

  }

  const getDate = () => {
    const time = new Date()
    const month = months[time.getMonth()]
    const day = time.getDate()
    const appenditures = ["st", "nd", "rd", "th"]
    if (day === 1) {
      return `The ${day}${appenditures[0]} of ${month}`
    } else if (day === 2) {
      return `The ${day}${appenditures[1]} of ${month}`
    } else if (day === 3) {
      return `The ${day}${appenditures[2]} of ${month}`
    }
    else {
      return `The ${day}${appenditures[3]} of ${month}`
    }
  }


  return (<div className={styles.root}>
    <div className={styles.form_container}>
      <h2>Tournament Information</h2>
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
      <div>
        <label htmlFor="teamOne">Team One
          <select
            name="teamOne"
            className={styles.select}
            type="select"
            onChange={handleSelect}
            value={teamOne}
          >
            <option className={styles.disabled}>Select Team 1</option>
            {

              teams.map((team, idx) => <option key={idx} value={team.id}>{team.name}</option>)
            }
          </select>
        </label>
        <label htmlFor="teamTwo">Team Two
          <select
            name="teamTwo"
            className={styles.select}
            type="select"
            onChange={handleSelect}
            value={teamTwo}

          >

            <option className={styles.disabled}>Select Team 2</option>
            {
              teams.map((team, idx) => <option key={idx} value={team.id}>{team.name}</option>)
            }
          </select>

        </label>
        <button className={isReady() ? styles.start : styles.disabled} onClick={startTournament}>Start Tournament</button>
      </div>
    </div>
  </div>)
}
