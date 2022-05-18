import { months, Player, Team } from "./data"

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
  const disciplines = ["H1", "H2", "D1", "D1", "BA1", "H3", "H4", "D2", "D2", "BA2"]
  return disciplines[id - 1]
}


export const generatePlayers = (team_id) => {

  const tempArr = new Array(10)
  const win = false
  const team_points = 0
  const myId = team_id
  const total_score = 0
  const overtime = false
  const overtime_scores = []
  const finished_match = false


  for (let i = 0; i < tempArr.length; i++) {
    const scores = ["", "", "", "", ""]
    const overtime_scores = []
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
      overtime_scores,
      finished_match
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
    p1.overtime = true
    p2.overtime = true
    return true
  }
}
export const checkDualsOvertime = (p1, p2, p1_partner, p2_partner) => {
  const cleaned_scores_t1 = cleanScores(p1.scores, p1_partner.scores)
  const cleaned_scores_t2 = cleanScores(p2.scores, p2_partner.scores)
  const total_scores_t1 = totalScores(cleaned_scores_t1)
  const total_scores_t2 = totalScores(cleaned_scores_t2)
  // overtimecheck
  if (total_scores_t1[0] + total_scores_t1[1] === total_scores_t2[0] + total_scores_t2[1]) {
    p1.overtime = true
    p2.overtime = true
    p1_partner.overtime = true
    p2_partner.overtime = true
    return true
  } else {
    return false
  }
}

const countPointsForEights = (scoresArray) => {
  var p1_count = 0
  var p2_count = 0
  scoresArray[0].forEach(score => {
    if (score >= 8) {
      p1_count += 1
    }
  })
  scoresArray[1].forEach(score => {
    if (score >= 8) {
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
  if (scoresArray[0] > scoresArray[1]) {
    tempArray[0] = 4
  } else if (scoresArray[1] > scoresArray[0]) {
    tempArray[1] = 4
  } else if (scoresArray[1] === scoresArray[0]) {
    if (p1.overtime_scores.length > p2.overtime_scores.length) {
      tempArray[0] = 4
    } else if (p2.overtime_scores.length > p1.overtime_scores.length) {
      tempArray[1] = 4
    }
  }
  return tempArray
}


export const handleResetOvertime = (p1, p2, setSavedMatches, setSavedSession, setSession, session) => {
  p1.overtime_scores = []
  p2.overtime_scores = []
  saveSession(p1, p2, setSavedMatches, setSavedSession, session, setSession)

}

export const handleResetDualsOvertime = (
  p1,
  p2,
  p1_partner,
  p2_partner,
  setSavedMatches,
  setSavedSession,
  session, setSession, option
) => {
  p1.overtime_scores = []
  p1_partner.overtime_scores = []
  p2.overtime_scores = []
  p2_partner.overtime_scores = []
  saveSessionAfterDual(
    p1,
    p2,
    p1_partner,
    p2_partner,
    setSavedMatches,
    setSavedSession,
    session, setSession
  )

}

export const saveOvertime = (
  p1, p2, setSavedMatches, setSavedSession, setSession, session, option, setOvertime
) => {
  if (option === 1) {
    p1.overtime_scores.push("8 OT")
  } else if (option === 2) {
    p1.overtime_scores.push("0")
  } else if (option === 3) {
    p2.overtime_scores.push("8 OT")
  } else if (option === 4) {
    p2.overtime_scores.push("0")
  } else if (option === 5) {
    p1.overtime_scores.push("8 OT")
    p2.overtime_scores.push("8 OT")
  }

  if (p1.overtime_scores.length === p2.overtime_scores.length) {

    saveSession(p1, p2, setSavedMatches, setSavedSession, session, setSession)
  } else {
    saveSession(p1, p2, setSavedMatches, setSavedSession, session, setSession)
    setOvertime(false)
  }
}


export const saveDualsOvertime = (
  p1,
  p2,
  p1_partner,
  p2_partner,
  setSavedMatches,
  setSavedSession,
  session, setSession, option, setOvertime
) => {
  if (option === 1) {
    p1.overtime_scores.push("8 OT")
    p1_partner.overtime_scores.push("8 OT")
  } else if (option === 2) {
    p1.overtime_scores.push("8 OT")
    p1_partner.overtime_scores.push("0")
  } else if (option === 3) {
    p1.overtime_scores.push("0")
    p1_partner.overtime_scores.push("0")
  } else if (option === 4) {
    p2.overtime_scores.push("8 OT")
    p2_partner.overtime_scores.push("8 OT")
  } else if (option === 5) {
    p2.overtime_scores.push("8 OT")
    p2_partner.overtime_scores.push("0")
  } else if (option === 6) {
    p2.overtime_scores.push("0")
    p2_partner.overtime_scores.push("0")
  } else if (option === 7) {
    p1.overtime_scores.push("8 OT")
    p1_partner.overtime_scores.push("0")
    p2.overtime_scores.push("8 OT")
    p2_partner.overtime_scores.push("0")
  } else if (option === 8) {
    p1.overtime_scores.push("8 OT")
    p1_partner.overtime_scores.push("8 OT")
    p2.overtime_scores.push("8 OT")
    p2_partner.overtime_scores.push("8 OT")
  } else if (option === 9) {
    p1.overtime_scores.push("8 OT")
    p1_partner.overtime_scores.push("8 OT")
    p2.overtime_scores.push("8 OT")
  } else if (option === 10) {
    p1.overtime_scores.push("8 OT")
    p2.overtime_scores.push("8 OT")
    p2_partner.overtime_scores.push("8 OT")
  }

  const len_t1 = p1.overtime_scores.length + p1_partner.overtime_scores.length
  const len_t2 = p2.overtime_scores.length + p2_partner.overtime_scores.length
  if (len_t1 === len_t2) {
    saveSessionAfterDual(p1, p2, p1_partner, p2_partner, setSavedMatches, setSavedSession, session, setSession)
  } else {

    saveSessionAfterDual(p1, p2, p1_partner, p2_partner, setSavedMatches, setSavedSession, session, setSession)
    setOvertime(false)
  }




}

const temp_matches = []
export const saveSession = (p1, p2, setSavedMatches, setSavedSession, session, setSession) => {
  const currentMatchId = p1.id
  const { team_one, team_two } = session

  const cleaned_scores = cleanScores(p1.scores, p2.scores)
  const cleaned_overtime_scores = cleanScores(p1.overtime_scores, p2.overtime_scores)
  console.log(cleaned_overtime_scores)
  const total_scores = totalScores(cleaned_scores)
  const s1 = countPointsForEights(cleaned_scores)
  const s2 = countPerfectMatch(total_scores)
  const s3 = countWinPoints(total_scores, p1, p2)
  const s4 = countPointsForEights(cleaned_overtime_scores)

  console.log(s4)

  p1.team_points = s1[0] + s2[0] + s3[0] + s4[0]
  p1.total_score = total_scores[0]
  p2.team_points = s1[1] + s2[1] + s3[1] + s4[1]
  p2.total_score = total_scores[1]
  p1.win = s3[0] === 4 ? true : false
  p2.win = s3[1] === 4 ? true : false
  p1.finished_match = true
  p2.finished_match = true

  const t1_vals = [...Object.values(team_one)]
  t1_vals[4][currentMatchId - 1] = p1.team_points
  t1_vals[6][currentMatchId - 1] = p1.win
  const t1 = new Team(...t1_vals)

  console.log(t1)

  const t2_vals = Object.values(team_two)
  t2_vals[4][currentMatchId - 1] = p2.team_points
  t2_vals[6][currentMatchId - 1] = p2.win
  const t2 = new Team(...t2_vals)

  t1.sumPoints()
  t2.sumPoints()
  t1.sumMatches()
  t2.sumMatches()


  const calcStatus = (currentMatchId) => {
    if (session.status !== "FINISHED") {
      if (currentMatchId === 5) {
        return "HALFTIME"
      } else if (currentMatchId < 9) {
        return "READY_FOR_NEXT"
      } else if (currentMatchId === 10) {
        return "FINISHED"
      }
    }

  }




  setSession({
    ...session, team_one: t1, team_two: t2, status: calcStatus(currentMatchId)
  })

  setSavedSession({
    ...session, team_one: t1, team_two: t2, status: calcStatus(currentMatchId)
  })

  // save Players as actual Player Objects
  // const p1_obj = new Player(...Object.values(p1))
  // const p2_obj = new Player(...Object.values(p2))
  if (currentMatchId < 4) {
    temp_matches[currentMatchId - 1] = {
      player_one: p1,
      player_two: p2,
      date: new Date()
    }

  } else if (currentMatchId > 4) {
    temp_matches[currentMatchId - 2] = {
      player_one: p1,
      player_two: p2,
      date: new Date()
    }
  } else if (currentMatchId === 10) {
    temp_matches[currentMatchId - 3] = {
      player_one: p1,
      player_two: p2,
      date: new Date()
    }
  }
  setSavedMatches(temp_matches)
}



const countPerfectDualsMatch = (total_score_array) => {
  if (total_score_array[0] + total_score_array[1] >= 68) {
    return 2
  } else {
    return 0
  }

}


const countDualWinPoints = (p1, p2, p1_partner, p2_partner, total_scores_array) => {
  const overtime_scores_t1 = p1.overtime_scores.length + p1_partner.overtime_scores.length
  const overtime_scores_t2 = p2.overtime_scores.length + p2_partner.overtime_scores.length
  if (total_scores_array[0] > total_scores_array[1]) {
    return [4, 0]
  } else if (total_scores_array[0] < total_scores_array[1]) {
    return [0, 4]
  } else if (total_scores_array[0] === total_scores_array[1]) {
    if (overtime_scores_t1 > overtime_scores_t2) {

      return [4, 0]
    } else if (overtime_scores_t2 > overtime_scores_t1) {
      return [0, 4]
    }
    else {
      return [0, 0]
    }

  }
}



export const saveSessionAfterDual = (
  p1,
  p2,
  p1_partner,
  p2_partner,
  setSavedMatches,
  setSavedSession,
  session, setSession) => {
  const currentMatchId = p1.id
  const { team_one, team_two } = session

  const cleaned_scores_t1 = cleanScores(p1.scores, p1_partner.scores)
  const cleaned_scores_t2 = cleanScores(p2.scores, p2_partner.scores)
  const cleaned_overtime_scores_t1 = cleanScores(p1.overtime_scores, p1_partner.overtime_scores)
  const cleaned_overtime_scores_t2 = cleanScores(p2.overtime_scores, p2_partner.overtime_scores)


  const total_scores_t1 = totalScores(cleaned_scores_t1)
  const total_scores_t2 = totalScores(cleaned_scores_t2)
  const total_sum_t1 = total_scores_t1[0] + total_scores_t1[1]
  const total_sum_t2 = total_scores_t2[0] + total_scores_t2[1]
  const pointsArrayt1 = countPointsForEights(cleaned_scores_t1)
  const pointsArrayt2 = countPointsForEights(cleaned_scores_t2)
  const overtimeEightsArrayt1 = countPointsForEights(cleaned_overtime_scores_t1)
  const overtimeEightsArrayt2 = countPointsForEights(cleaned_overtime_scores_t2)

  const s1t1 = pointsArrayt1[0] + pointsArrayt1[1]
  const s1t2 = pointsArrayt2[0] + pointsArrayt2[1]
  const s2t1 = countPerfectDualsMatch(total_scores_t1)
  const s2t2 = countPerfectDualsMatch(total_scores_t2)
  const s3t1 = countDualWinPoints(p1, p2, p1_partner, p2_partner, [total_sum_t1, total_sum_t2])[0]
  const s3t2 = countDualWinPoints(p1, p2, p1_partner, p2_partner, [total_sum_t1, total_sum_t2])[1]
  const s4t1 = overtimeEightsArrayt1[0] + overtimeEightsArrayt1[1]
  const s4t2 = overtimeEightsArrayt2[0] + overtimeEightsArrayt2[1]




  p1.team_points = s1t1 + s2t1 + s3t1 + s4t1
  p1.total_score = total_sum_t1
  p1_partner.team_points = s1t1 + s2t1 + s3t1
  p1_partner.total_score = total_sum_t1


  p2.team_points = s1t2 + s2t2 + s3t2 + s4t2
  p2.total_score = total_sum_t2
  p2_partner.team_points = s1t2 + s2t2 + s3t2
  p2_partner.total_score = total_sum_t2


  p1.win = s3t1 === 4 ? true : false
  p2.win = s3t2 === 4 ? true : false
  p1_partner.win = s3t1 === 4 ? true : false
  p2_partner.win = s3t2 === 4 ? true : false
  p1.finished_match = true
  p2.finished_match = true
  p1_partner.finished_match = true
  p2_partner.finished_match = true


  const t1_vals = [...Object.values(team_one)]
  t1_vals[4][currentMatchId - 1] = p1.team_points
  t1_vals[4][currentMatchId] = p1_partner.team_points
  t1_vals[6][currentMatchId - 1] = p1.win
  t1_vals[6][currentMatchId] = p1_partner.win
  const t1 = new Team(...t1_vals)
  const t2_vals = Object.values(team_two)
  t2_vals[4][currentMatchId - 1] = p2.team_points
  t2_vals[4][currentMatchId] = p2_partner.team_points
  t2_vals[6][currentMatchId - 1] = p2.win
  t2_vals[6][currentMatchId] = p2_partner.win
  const t2 = new Team(...t2_vals)

  t1.sumPoints()
  t2.sumPoints()
  t1.sumMatches()
  t2.sumMatches()


  const calcStatus = (currentMatchId) => {
    if (currentMatchId === 5) {
      return "HALFTIME"
    } else if (currentMatchId < 9) {
      return "READY_FOR_NEXT"
    } else if (currentMatchId === 9) {
      return "FINISHED"
    }
  }



  setSession({
    ...session, team_one: t1, team_two: t2, status: calcStatus(currentMatchId)
  })

  setSavedSession({
    ...session, team_one: t1, team_two: t2
  })
  if (currentMatchId <= 4) {
    temp_matches[currentMatchId - 1] = {
      player_one: p1,
      player_one_partner: p1_partner,
      player_two: p2,
      player_two_partner: p2_partner,
      date: new Date()
    }
  } else if (currentMatchId > 4) {
    temp_matches[currentMatchId - 2] = {
      player_one: p1,
      player_one_partner: p1_partner,
      player_two: p2,
      player_two_partner: p2_partner,

    }
  }

  setSavedMatches(temp_matches)
  // save Players as actual Player Objects
  // const p1_obj = new Player(...Object.values(p1))
  // const p2_obj = new Player(...Object.values(p2))
  // temp_matches[currentMatchId - 1] = {
  //   player_one: p1_obj,
  //   player_two: p2_obj,
  //   date: new Date()
  // }
  // setSavedMatches(temp_matches)
}