export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"]

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



export const match = {
  active_player_one: {},
  active_player_two: {},
  status_team_one: "",
  status_team_two: "",
}


function Team(id, graphic, name, players, points, status, result) {
  this.id = id;
  this.graphic = graphic;
  this.name = name;
  this.players = players;
  this.points = points;
  this.status = status;
  this.result = result;
}


function Player(
  id,
  name,
  scores,
  team_id,
  win,
  team_points,
  status
) {
  this.id = id;
  this.name = name;
  this.scores = scores;
  this.team_id = team_id
  this.status = status;
  this.win = win;
  this.team_points = team_points;
}



export const generatePlayers = (team_id) => {

  const tempArr = new Array(8)
  const name = ''
  const scores = ["-", "-", "-", "-", "-"]
  const win = false
  const team_points = 0
  const status = -1
  const myId = team_id
  for (let i = 0; i < tempArr.length; i++) {
    const id = i + 1
    tempArr[i] = new Player(id, name, scores, myId, win, team_points, status)
  }
  return tempArr
}


export const teams = [
  new Team(1, "./img", "Test Team", [], 0, "SETUP", 1),
  new Team(2, "./img", "Test Team 2", [], 0, "SETUP", 1),
  new Team(3, "./img", "Test Team 3", [], 0, "SETUP", 1),
  new Team(4, "./img", "Test Team 4", [], 0, "SETUP", 1),
  new Team(5, "./img", "Test Team 5", [], 0, "SETUP", 1)
]

// export const team_one = {
//   id: 1,
//   graphic: '',
//   name: "",
//   players: [
//     {
//       id: 1,
//       name: "Andreas",
//       scores: ["-", "-", "-", "-", "-"],
//       team_id: 1,
//       win: false,
//       team_points: 0,
//       status: -1
//     },
//     {
//       id: 2,
//       name: "Marc",
//       scores: ["-", "-", "-", "-", "-"],
//       team_id: 1,
//       win: false,
//       team_points: 0,
//       status: -1
//     },
//     {
//       id: 3,
//       name: "Jo",
//       scores: ["-", "-", "-", "-", "-"],
//       team_id: 1,
//       win: false,
//       team_points: 0,
//       status: -1
//     },
//     {
//       id: 4,
//       name: "Mi",
//       scores: ["-", "-", "-", "-", "-"],
//       team_id: 1,
//       win: false,
//       team_points: 0,
//       status: -1
//     },
//     {
//       id: 5,
//       name: "Fr",
//       scores: ["-", "-", "-", "-", "-"],
//       team_id: 1,
//       win: false,
//       team_points: 0,
//       status: -1
//     },
//     {
//       id: 6,
//       name: "Ana",
//       scores: ["-", "-", "-", "-", "-"],
//       team_id: 1,
//       win: false,
//       team_points: 0,
//       status: -1
//     },
//     {
//       id: 7,
//       name: "eli",
//       scores: ["-", "-", "-", "-", "-"],
//       team_id: 1,
//       win: false,
//       team_points: 0,
//       status: -1
//     },
//     {
//       id: 8,
//       name: "Dan",
//       scores: ["-", "-", "-", "-", "-"],
//       team_id: 1,
//       win: false,
//       team_points: 0,
//       status: -1
//     }
//   ],
//   points: 0,
//   status: STATUS_OPTIONS[0],
//   result: ""
// }
// export const team_two = {
//   id: 2,
//   graphic: '',
//   name: "",
//   players: [
//     {
//       id: 1,
//       name: "Renate",
//       scores: ["-", "-", "-", "-", "-"],
//       team_id: 2,
//       win: false,
//       team_points: 0,
//       status: -1

//     },
//     {
//       id: 2,
//       name: "Pat",
//       scores: ["-", "-", "-", "-", "-"],
//       team_id: 2,
//       win: false,
//       team_points: 0,
//       status: -1

//     },
//     {
//       id: 3,
//       name: "Tamy",
//       scores: ["-", "-", "-", "-", "-"],
//       team_id: 2,
//       win: false,
//       team_points: 0,
//       status: -1

//     },
//     {
//       id: 4,
//       name: "Randy",
//       scores: ["-", "-", "-", "-", "-"],
//       team_id: 2,
//       win: false,
//       team_points: 0,
//       status: -1

//     },
//     {
//       id: 5,
//       name: "Charl",
//       scores: ["-", "-", "-", "-", "-"],
//       team_id: 2,
//       win: false,
//       team_points: 0,
//       status: -1

//     },
//     {
//       id: 6,
//       name: "Lucy",
//       scores: ["-", "-", "-", "-", "-"],
//       team_id: 2,
//       win: false,
//       team_points: 0,
//       status: -1

//     },
//     {
//       id: 7,
//       name: "Elise",
//       scores: ["-", "-", "-", "-", "-"],
//       team_id: 2,
//       win: false,
//       team_points: 0,
//       status: -1

//     },
//     {
//       id: 8,
//       name: "Lauren",
//       scores: ["-", "-", "-", "-", "-"],
//       team_id: 2,
//       win: false,
//       team_points: 0,
//       status: -1

//     }],
//   points: 0,
//   status: STATUS_OPTIONS[0],
//   result: ""
// }
