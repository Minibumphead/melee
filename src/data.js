const wolfPackImage = require('./assets/images/wolfpack.png')
const axeEvengeresImage = require('./assets/images/axevengers.png')
const legendsImage = require('./assets/images/legends.png')
const noNameImage = require('./assets/images/no_name.png')
const primalClubImage = require('./assets/images/primal_club.png')
const soaringBladesImage = require('./assets/images/soaring_blades.png')
const valkyrianSteelImage = require('./assets/images/valkyrian_steel.png')
const wmImage = require('./assets/images/wm.png')
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
  total_score
) {
  this.id = id;
  this.name = name;
  this.scores = scores;
  this.team_id = team_id
  this.win = win;
  this.team_points = team_points;
  this.total_score = total_score
}



export const generatePlayers = (team_id) => {

  const tempArr = new Array(8)
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


export const teams = [
  new Team(1, wolfPackImage, "Wolfpack", [], 0, "SETUP", 1),
  new Team(2, axeEvengeresImage, "Axevengers", [], 0, "SETUP", 1),
  new Team(3, '', "Legends", [], 0, "SETUP", 1),
  new Team(4, '', "Jackalope Axe Club", [], 0, "SETUP", 1),
  new Team(5, primalClubImage, "Primal", [], 0, "SETUP", 1),
  new Team(6, soaringBladesImage, "Soaring Blades", [], 0, "SETUP", 1),
  new Team(7, valkyrianSteelImage, "Valkyrian Steel", [], 0, "SETUP", 1),
  new Team(8, wmImage, "Widomakers", [], 0, "SETUP", 1),
]

