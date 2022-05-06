
export const trackMatchOutcomes = (currentPlayerOne, currentPlayerTwo, matches, setMatches) => {

  console.log('trackmatchoutcomes ran')
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


  const cleaned_scores_team_one = cleanScores(currentPlayerOne.scores)
  const cleaned_scores_team_two = cleanScores(currentPlayerTwo.scores)


  const score_team_one = cleaned_scores_team_one.reduce((prev, curr) => parseInt(prev) + parseInt(curr), 0)
  const score_team_two = cleaned_scores_team_two.reduce((prev, curr) => parseInt(prev) + parseInt(curr), 0)
  // determine Winner
  const getWinner = () => {
    if (score_team_one > score_team_two) return currentPlayerOne.team_id
    else return currentPlayerTwo.team_id
  }

  const winner = getWinner()

  const match = {
    id: currentPlayerOne.id,
    player_one: {
      ...currentPlayerOne
    },
    player_two: {
      ...currentPlayerTwo
    },
    winner: winner,
    date: new Date()
  }
  const tempMatches = [...matches]
  tempMatches[match.id - 1] = match
  setMatches(tempMatches)
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
