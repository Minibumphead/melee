
export const trackMatchOutcomes = (currentPlayerOne, currentPlayerTwo, matches) => {

  const cleanScores = (scoreArray) => {
    const tempArr = []
    scoreArray.forEach(score => {
      if (isNaN(parseInt(score))) {
        tempArr.push(0)
      } else {
        tempArr.push(parseInt(score))
      }
    })
    console.log(tempArr)
    return tempArr
  }


  const cleaned_scores_team_one = cleanScores(currentPlayerOne.scores)
  const cleaned_scores_team_two = cleanScores(currentPlayerTwo.scores)


  const score_team_one = cleaned_scores_team_one.reduce((prev, curr) => parseInt(prev) + parseInt(curr), 0)
  const score_team_two = cleaned_scores_team_two.reduce((prev, curr) => parseInt(prev) + parseInt(curr), 0)
  // determine Winner
  if (score_team_one > score_team_two) {
    matches.current.push({
      player_one: {
        id: currentPlayerOne.id,
        team_id: currentPlayerOne.team_id,
        name: currentPlayerOne.name,
        scores: currentPlayerOne.scores,
        total_score: score_team_one,
        points: 4,
        time: new Date(),
        winner: true
      },
      player_two: {
        id: currentPlayerTwo.id,
        team_id: currentPlayerTwo.team_id,
        name: currentPlayerTwo.name,
        scores: currentPlayerTwo.scores,
        total_score: score_team_two,
        points: 0,
        time: new Date(),
        winner: false
      },
    })
  } else if (score_team_one === score_team_two) {
    console.log('TIE')
  } else {
    matches.current.push({
      player_one: {
        id: currentPlayerOne.id,
        team_id: currentPlayerOne.team_id,
        name: currentPlayerOne.name,
        scores: currentPlayerOne.scores,
        total_score: score_team_one,
        points: 0,
        time: new Date(),
        winner: false
      },
      player_two: {
        id: currentPlayerTwo.id,
        team_id: currentPlayerTwo.team_id,
        name: currentPlayerTwo.name,
        scores: currentPlayerTwo.scores,
        total_score: score_team_two,
        points: 4,
        time: new Date(),
        winner: true
      },
    })
  }
  localStorage.setItem("matches", JSON.stringify(matches))
}
