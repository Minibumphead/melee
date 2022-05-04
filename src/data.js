export const STATUS_OPTIONS = ['SETUP', "READY", "THROWING", "HALFTIME", "DONE"]


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
    { id: 1, name: "", scores: [0, 0, 0, 0, 0], teamm_id: 1 },
    { id: 2, name: "", scores: [0, 0, 0, 0, 0], teamm_id: 1 },
    { id: 3, name: "", scores: [0, 0, 0, 0, 0], teamm_id: 1 },
    { id: 4, name: "", scores: [0, 0, 0, 0, 0], teamm_id: 1 },
    { id: 5, name: "", scores: [0, 0, 0, 0, 0], teamm_id: 1 },
    { id: 6, name: "", scores: [0, 0, 0, 0, 0], teamm_id: 1 },
    { id: 7, name: "", scores: [0, 0, 0, 0, 0], teamm_id: 1 },
    { id: 8, name: "", scores: [0, 0, 0, 0, 0], teamm_id: 1 }],
  points: 0,
  status: STATUS_OPTIONS[0],
  result: ""
}
export const team_two = {
  id: 2,
  graphic: '',
  name: "",
  players: [
    { id: 1, name: "", scores: [0, 0, 0, 0, 0], teamm_id: 2 },
    { id: 2, name: "", scores: [0, 0, 0, 0, 0], teamm_id: 2 },
    { id: 3, name: "", scores: [0, 0, 0, 0, 0], teamm_id: 2 },
    { id: 4, name: "", scores: [0, 0, 0, 0, 0], teamm_id: 2 },
    { id: 5, name: "", scores: [0, 0, 0, 0, 0], teamm_id: 2 },
    { id: 6, name: "", scores: [0, 0, 0, 0, 0], teamm_id: 2 },
    { id: 7, name: "", scores: [0, 0, 0, 0, 0], teamm_id: 2 },
    { id: 8, name: "", scores: [0, 0, 0, 0, 0], teamm_id: 2 }],
  points: 0,
  status: STATUS_OPTIONS[0],
  result: ""
}
