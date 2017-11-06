export default function sponsorsReducer(state={sponsors: [], sponsor: "", role: ""}, action){
  switch(action.type){
    case "FETCH_SPONSORS":
      return {...state, sponsors: action.payload}
    case "RENDER_SPONSORS":
      return {...state, sponsors: action.payload}
    case "RENDER_ADD_SPONSOR":
    debugger
    localStorage.setItem('jwt', action.payload.jwt)
    localStorage.setItem('role', action.payload.sponsor.role)
    localStorage.setItem('username', action.payload.sponsor.username)
      return {sponsors: state.sponsors.concat(action.payload), sponsor: action.payload.sponsor.username, role: action.payload.sponsor.role}
    case "LOGIN_SPONSOR":
    debugger
    localStorage.setItem('jwt', action.payload.jwt)
    localStorage.setItem('role', action.payload.role)
    localStorage.setItem('username', action.payload.sponsor)
      //not changing the state necesarilly
      return {...state, sponsor: action.payload.sponsor, role: action.payload.role}
      case "REMOVE_SPONSOR_LOGIN":
      localStorage.clear()
      return {...state, currentSponsor: action.payload, currentRole: action.payload}
  default:
    return state
  }
}
