import { months, Player } from "./data"

export const saveMatch = (
  session,
  setSession,
  matches,
  setMatches,
  matchId,
  calledBy,
  overtimeWin = false) => {



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
    ...prevSession,
    team_one: {
      ...prevSession.team_one,
      players: temp_players_one


    }, team_two: {
      ...prevSession.team_two,
      players: temp_players_two
    }
  }))


  if (matchId.current < 8 && calledBy === "next") {
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
  const win = false
  const team_points = 0
  const myId = team_id
  const total_score = 0
  const overtime = false
  const overtime_win = false

  for (let i = 0; i < tempArr.length; i++) {
    const scores = ["", "", "", "", ""]
    const id = i + 1
    const name = `P${i + 1}${Math.floor(Math.random() * 100000)}`
    tempArr[i] = new Player(
      id,
      name,
      scores,
      myId,
      win,
      team_points,
      total_score,
      overtime,
      overtime_win
    )
  }
  return tempArr
}



const cleanScores = (p1_scores, p2_scores) => {
  const p1_temp = []
  const p2_temp = []
  p1_scores.forEach(score => {
    if (isNaN(parseInt(score))) {
      p1_temp.push(0)
    } else {
      p1_temp.push(parseInt(score))
    }
  })
  p2_scores.forEach(score => {
    if (isNaN(parseInt(score))) {
      p2_temp.push(0)
    } else {
      p2_temp.push(parseInt(score))
    }
  })
  return [p1_temp, p2_temp]
}

const totalScores = (scoresArray) => {
  const t1 = scoresArray[0].reduce((prev, curr) => prev + curr, 0)
  const t2 = scoresArray[1].reduce((prev, curr) => prev + curr, 0)
  return [t1, t2]
}

export const checkOvertime = (p1, p2) => {

  const cleaned_scores = cleanScores(p1.scores, p2.scores)
  const total_scores = totalScores(cleaned_scores)
  // overtimecheck
  if (total_scores[0] === total_scores[1]) {
    console.log('ran')
    p1.overtime = true
    p2.overtime = true
    return true
  }
}

const countPointsForEights = (scoresArray) => {
  var p1_count = 0
  var p2_count = 0
  scoresArray[0].forEach(score => {
    if (score === 8) {
      p1_count += 1
    }
  })
  scoresArray[1].forEach(score => {
    if (score === 8) {
      p2_count += 1
    }
  })
  return [p1_count, p2_count]
}
const countPerfectMatch = (totalScoreArray) => {
  const tempArray = [0, 0]
  if (totalScoreArray[0] === 34) {
    tempArray[0] = 2
  }
  if (totalScoreArray[1] === 34) {
    tempArray[1] = 2
  }
  return tempArray
}

const countWinPoints = (scoresArray, p1, p2) => {
  const tempArray = [0, 0]
  console.log(scoresArray)
  if (scoresArray[0] > scoresArray[1]) {
    tempArray[0] = 4
  } else if (scoresArray[1] > scoresArray[0]) {
    tempArray[1] = 4
  } else if (scoresArray[1] === scoresArray[0]) {
    if (p1.overtime_win === true) {
      tempArray[0] = 4
    } else if (p2.overtime_win === true) {
      tempArray[1] = 4
    }
  }
  return tempArray
}




const temp_matches = []
export const saveSession = (p1, p2, setSavedMatches, setSavedSession, session, setSession) => {
  const cleaned_scores = cleanScores(p1.scores, p2.scores)
  const total_scores = totalScores(cleaned_scores)
  const s1 = countPointsForEights(cleaned_scores)
  const s2 = countPerfectMatch(total_scores)
  const s3 = countWinPoints(total_scores, p1, p2)
  p1.team_points = s1[0] + s2[0] + s3[0]
  p1.total_score = total_scores[0]
  p2.team_points = s1[1] + s2[1] + s3[1]
  p2.total_score = total_scores[1]
  p1.win = s3[0] === 4 ? true : false
  p2.win = s3[1] === 4 ? true : false



  const { team_one, team_two } = session
  var t1_matches_won = team_one.matches_won
  var t2_matches_won = team_two.matches_won
  var t1_points = team_one.points
  var t2_points = team_two.points

  t1_matches_won = p1.win || p1.overtime_win ? t1_matches_won += 1 : t1_matches_won + 0
  t2_matches_won = p2.win || p2.overtime_win ? t2_matches_won += 1 : t2_matches_won + 0
  t1_points += p1.team_points
  t2_points += p2.team_points

  setSession({
    ...session, team_one: {
      ...session.team_one,
      matches_won: t1_matches_won,
      points: t1_points
    },
    team_two: {
      ...session.team_two,
      matches_won: t2_matches_won,
      points: t2_points
    }
  })

  setSavedSession({
    ...session, team_one: {
      ...session.team_one,
      matches_won: t1_matches_won,
      points: t1_points
    },
    team_two: {
      ...session.team_two,
      matches_won: t2_matches_won,
      points: t2_points
    }
  })
  temp_matches[p1.id - 1] = {
    player_one: p1,
    player_two: p2,
    date: new Date()
  }
  setSavedMatches(temp_matches)




}

