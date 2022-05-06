export const STATUS_OPTIONS = [
  'SETUP',
  "READY",
  "M1",
  "M2",
  "M3",
  "M4",
  "HALFTIME",
  "M5",
  "M6",
  "M7",
  "M8",
  "DONE",
  "WAIT",
]


export const player = {
  id: "",
  name: "",
  scores: [],

}

export const match = {
  active_player_one: {},
  active_player_two: {},
  status_team_one: "",
  status_team_two: "",
}

export const team_one = {
  id: 1,
  graphic: '',
  name: "",
  players: [
    { id: 1, name: "Andreas", scores: ["-", "-", "-", "-", "-"], team_id: 1, win: false, team_points: 0 },
    { id: 2, name: "Marc", scores: ["-", "-", "-", "-", "-"], team_id: 1, win: false, team_points: 0 },
    { id: 3, name: "Jo", scores: ["-", "-", "-", "-", "-"], team_id: 1, win: false, team_points: 0 },
    { id: 4, name: "Mi", scores: ["-", "-", "-", "-", "-"], team_id: 1, win: false, team_points: 0 },
    { id: 5, name: "Fr", scores: ["-", "-", "-", "-", "-"], team_id: 1, win: false, team_points: 0 },
    { id: 6, name: "Ana", scores: ["-", "-", "-", "-", "-"], team_id: 1, win: false, team_points: 0 },
    { id: 7, name: "eli", scores: ["-", "-", "-", "-", "-"], team_id: 1, win: false, team_points: 0 },
    { id: 8, name: "Dan", scores: ["-", "-", "-", "-", "-"], team_id: 1, win: false, team_points: 0, }],
  points: 0,
  status: STATUS_OPTIONS[0],
  result: ""
}
export const team_two = {
  id: 2,
  graphic: '',
  name: "",
  players: [
    { id: 1, name: "Renate", scores: ["-", "-", "-", "-", "-"], team_id: 2, win: false, team_points: 0 },
    { id: 2, name: "Pat", scores: ["-", "-", "-", "-", "-"], team_id: 2, win: false, team_points: 0 },
    { id: 3, name: "Tamy", scores: ["-", "-", "-", "-", "-"], team_id: 2, win: false, team_points: 0 },
    { id: 4, name: "Randy", scores: ["-", "-", "-", "-", "-"], team_id: 2, win: false, team_points: 0 },
    { id: 5, name: "Charl", scores: ["-", "-", "-", "-", "-"], team_id: 2, win: false, team_points: 0 },
    { id: 6, name: "Lucy", scores: ["-", "-", "-", "-", "-"], team_id: 2, win: false, team_points: 0 },
    { id: 7, name: "Elise", scores: ["-", "-", "-", "-", "-"], team_id: 2, win: false, team_points: 0 },
    { id: 8, name: "Lauren", scores: ["-", "-", "-", "-", "-"], team_id: 2, win: false, team_points: 0 }],
  points: 0,
  status: STATUS_OPTIONS[0],
  result: ""
}
