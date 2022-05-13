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


function Team(id, graphic, name, players, points, status, result, matches_won) {
  this.id = id;
  this.graphic = graphic;
  this.name = name;
  this.players = players;
  this.points = points;
  this.status = status;
  this.result = result;
  this.matches_won = matches_won
}


export function Player(
  id,
  name,
  scores,
  team_id,
  win,
  team_points,
  total_score,
  overtime,
  overtime_win
) {
  this.id = id;
  this.name = name;
  this.scores = scores;
  this.team_id = team_id
  this.win = win;
  this.team_points = team_points;
  this.total_score = total_score
  this.overtime = overtime;
  this.overtime_win = overtime_win;
}






export const teams = [
  new Team(1, wolfPackImage, "Wolfpack", [], 0, "SETUP", 1, 0),
  new Team(2, axeEvengeresImage, "Axevengers", [], 0, "SETUP", 1, 0),
  new Team(3, legendsImage, "Legends", [], 0, "SETUP", 1, 0),
  new Team(4, noNameImage, "Jackalope Axe Club", [], 0, "SETUP", 1, 0),
  new Team(5, primalClubImage, "Primal", [], 0, "SETUP", 1, 0),
  new Team(6, soaringBladesImage, "Soaring Blades", [], 0, "SETUP", 1, 0),
  new Team(7, valkyrianSteelImage, "Valkyrian Steel", [], 0, "SETUP", 1, 0),
  new Team(8, wmImage, "Widomakers", [], 0, "SETUP", 1, 0),
]
