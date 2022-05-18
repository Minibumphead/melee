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

export function Player(
  id,
  name,
  scores,
  team_id,
  win,
  team_points,
  total_score,
  overtime,
  overtime_scores,
  finished_match,

) {
  this.id = id;
  this.name = name;
  this.scores = scores;
  this.team_id = team_id
  this.win = win;
  this.team_points = team_points;
  this.total_score = total_score
  this.overtime = overtime;
  this.overtime_scores = overtime_scores;
  this.finished_match = finished_match
}

const cleanArray = (array) => {
  const temp_arr = []
  array.forEach(score => {
    if (isNaN(parseInt(score))) {
      temp_arr.push(0)
    } else {
      temp_arr.push(parseInt(score))
    }
  })
  return temp_arr
}


export function Team(id, graphic, name, players, points_array, status, matches_won_array, starter, points_sum, matches_sum,) {
  this.id = id;
  this.graphic = graphic;
  this.name = name;
  this.players = players;
  this.points_array = points_array;
  this.status = status;
  this.matches_won_array = matches_won_array
  this.starter = starter
  this.points_sum = points_sum
  this.matches_sum = matches_sum

  Team.prototype.sumPoints = function () {
    const cleaned = cleanArray(this.points_array)
    var total = 0
    cleaned.forEach((point, index) => {
      if (index === 3 || index === 7) {
      } else {

        total += point
      }
    })
    this.points_sum = total
    return total
  }

  Team.prototype.sumMatches = function () {
    const temp_matches = this.matches_won_array
    var count = 0
    temp_matches.forEach((match, index) => {
      if (index === 3 || index === 7) {
      } else {
        if (match) {
          count += 1
        }
      }

    })
    this.matches_sum = count
    return count
  }

}



export const teams = [
  new Team(1, wolfPackImage, "Wolfpack", [], [], "SETUP", [], false, 0, 0),
  new Team(2, axeEvengeresImage, "Axevengers", [], [], "SETUP", [], false, 0, 0),
  new Team(3, legendsImage, "Legends", [], [], "SETUP", [], false, 0, 0),
  new Team(4, noNameImage, "Jackalope Axe Club", [], [], "SETUP", [], false, 0, 0),
  new Team(5, primalClubImage, "Primal", [], [], "SETUP", [], false, 0, 0),
  new Team(6, soaringBladesImage, "Soaring Blades", [], [], "SETUP", [], false, 0, 0),
  new Team(7, valkyrianSteelImage, "Valkyrian Steel", [], [], "SETUP", [], false, 0, 0),
  new Team(8, wmImage, "Widomakers", [], [], "SETUP", [], false, 0, 0),
]

