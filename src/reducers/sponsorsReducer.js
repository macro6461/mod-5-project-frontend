export default function sponsorsReducer(state={sponsors: [], sponsor: "", role: "", error: ""}, action){
  switch(action.type){
    case "FETCH_SPONSORS":
      return {...state, sponsors: action.payload}
    case "RENDER_SPONSORS":
      return {...state, sponsors: action.payload}
    case "RENDER_ADD_SPONSOR":
    localStorage.setItem('jwt', action.payload.jwt)
    localStorage.setItem('role', action.payload.sponsor.role)
    localStorage.setItem('username', action.payload.sponsor.username)
      return {sponsors: state.sponsors.concat(action.payload), sponsor: action.payload.sponsor.username, role: action.payload.sponsor.role}
    case "LOGIN_SPONSOR":
    localStorage.setItem('jwt', action.payload.jwt)
    localStorage.setItem('role', action.payload.role)
    localStorage.setItem('username', action.payload.sponsor)
      //not changing the state necesarilly
      return {...state, sponsor: action.payload.sponsor, role: action.payload.role}
    case "REMOVE_SPONSOR_LOGIN":
    localStorage.clear()
      return {...state, sponsor: action.payload, role: action.payload, error: action.payload}
    case "RENDER_ADD_SPONSOR_FAILED":
      return {...state, error: action.payload.error}
    case "REMOVE_SPONSOR_ERROR":
      return {...state, error: action.payload}
    case "LOGIN_SPONSOR_FAILED":
      return {...state, error: action.payload.error}
    case "GET_CURRENT_SPONSOR_ROLE":
      return {...state, role: action.payload}
    case "DELETE_SPONSOR_ACCOUNT":
      var index = state.sponsors.indexOf(action.payload)
      var stateSponsors = state.sponsors.splice(index, 1)
      localStorage.clear()
      return {sponsors: state.sponsors, sponsor: "", role: "", error: ""}
  default:
    return state
  }
}
