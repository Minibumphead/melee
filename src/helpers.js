import { months, Player } from "./data"

export const saveMatch = (
  session,
  setSession,
  currentPlayerOne,
  setCurrentPlayerOne,
  currentPlayerTwo,
  setCurrentPlayerTwo,
  matches,
  setMatches,
  matchId,
  calledBy,
  overtimeWin = false) => {

  const cleanScores = (scoreArray) => {
    const tempArr = []
    scoreArray.forEach(score => {
      if (isNaN(parseInt(score))) {
        tempArr.push(0)
      } else {
        tempArr.push(parseInt(score))
      }
    })
    return tempArr
  }

  const getAllEights = (scores, val) => {
    var indexes = []
    for (let i = 0; i < scores.length; i++) {
      if (scores[i] === val) {
        indexes.push(i)
      }
    }
    return indexes

  }


  const cleaned_scores_team_one = cleanScores(currentPlayerOne.scores)
  const cleaned_scores_team_two = cleanScores(currentPlayerTwo.scores)


  const score_team_one = cleaned_scores_team_one.reduce((prev, curr) => parseInt(prev) + parseInt(curr), 0)
  const score_team_two = cleaned_scores_team_two.reduce((prev, curr) => parseInt(prev) + parseInt(curr), 0)


  console.log(score_team_one)

  const calcTeamPoints = () => {
    var temp_points_team_one = 0
    var temp_points_team_two = 0
    const eights_player_one = getAllEights(cleaned_scores_team_one, 8)
    const eights_player_two = getAllEights(cleaned_scores_team_two, 8)


    if (score_team_one > score_team_two || currentPlayerOne.overtimeWin) {
      temp_points_team_one += 4
    } else if (score_team_two > score_team_one || currentPlayerTwo.overtimeWin) {
      temp_points_team_two += 4
    }
    if (eights_player_one.length === 1) {
      temp_points_team_one += 1
    } else if (eights_player_one.length === 2) {
      temp_points_team_one += 2
    }
    if (eights_player_two.length === 1) {
      temp_points_team_two += 1
    } else if (eights_player_two.length === 2) {
      temp_points_team_two += 2

    }
    if (score_team_one === 34) {

      temp_points_team_one += 2
    }
    if (score_team_two === 34) {
      temp_points_team_two += 2
    }

    return [temp_points_team_one, temp_points_team_two]
  }

  const team_points = calcTeamPoints()


  const match = {
    id: currentPlayerOne.id,
    player_one: {
      ...currentPlayerOne,
      total_score: score_team_one,
      team_points: team_points[0],
      win: (score_team_one > score_team_two) || currentPlayerOne.overtimeWin,
      overtime: score_team_one === score_team_two
    },
    player_two: {
      ...currentPlayerTwo,
      total_score: score_team_two,
      team_points: team_points[1],
      win: (score_team_two > score_team_one) || currentPlayerTwo.overtimeWin,

      overtime: score_team_one === score_team_two
    },
    date: new Date()
  }
  const tempMatches = [...matches]
  tempMatches[match.id - 1] = match
  setMatches(tempMatches)

  const temp_players_one = [...session.team_one.players]
  temp_players_one[matchId.current - 1] = {
    ...currentPlayerOne,
    total_score: score_team_one,
    team_points: team_points[0],
    win: (score_team_one > score_team_two) || currentPlayerOne.overtimeWin,

    overtime: score_team_one === score_team_two

  }
  const temp_players_two = [...session.team_two.players]
  temp_players_two[matchId.current - 1] = {
    ...currentPlayerTwo,
    total_score: score_team_two,
    team_points: team_points[1],
    win: (score_team_one < score_team_two) || currentPlayerTwo.overtimeWin,

    overtime: score_team_one === score_team_two
  }
  setCurrentPlayerOne({
    ...currentPlayerOne,
    total_score: score_team_one,
    team_points: team_points[0],
    win: (score_team_one > score_team_two) || currentPlayerOne.overtimeWin,
    overtime: score_team_one === score_team_two
  })
  setCurrentPlayerTwo({
    ...currentPlayerTwo,
    total_score: score_team_two,
    team_points: team_points[1],
    win: (score_team_one < score_team_two) || currentPlayerTwo.overtimeWin,

    overtime: score_team_one === score_team_two
  })

  setSession(prevSession => ({
    ...prevSession, team_one: {
      ...prevSession.team_one,
      players: temp_players_one

    }, team_two: { ...prevSession.team_two, players: temp_players_two }
  }))

  const allScoresEntered = currentPlayerOne.scores.includes("-")
    || currentPlayerTwo.scores.includes("-")
    ? false : true
  if (matchId.current < 8 && calledBy === "next" && allScoresEntered) {
    matchId.current += 1
  } else if (matchId.current > 0 && calledBy === "prev") {
    matchId.current -= 1
  } else {
  }
}

export function useLocalStorage(key, initialValue, useState) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  });
  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };
  return [storedValue, setValue];
}

export const formatDate = (date) => {
  const month = months[date.getMonth()]
  const day = date.getDate()
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


export const getDisciplineFromId = (id) => {
  if (id === 3 || id === 7) {
    return `D${id}`
  } else if (id === 4 || id === 8) {
    return `BA${id / 4}`
  } else if ([1, 2].includes(id)) {
    return `H${id}`
  } else if ([5, 6].includes(id)) {
    return `H${id - 2}`
  }
}


export const generatePlayers = (team_id) => {

  const tempArr = new Array(10)
  const scores = ["-", "-", "-", "-", "-"]
  const win = false
  const team_points = 0
  const myId = team_id
  const total_score = 0
  for (let i = 0; i < tempArr.length; i++) {
    const id = i + 1
    const name = `P${i + 1}${Math.floor(Math.random() * 100000)}`
    tempArr[i] = new Player(id, name, scores, myId, win, team_points, total_score)
  }
  return tempArr
}