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
    debugger
      return {sponsors: state.sponsors.concat(action.payload.sponsor), sponsor: action.payload.sponsor.username, role: action.payload.sponsor.role}
    case "LOGIN_SPONSOR":
    debugger
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
    case "GET_CURRENT_SPONSOR":
      var sponsor = state.sponsors.find((sponsor)=>{
        return sponsor.username === action.payload
      })
        return {...state, role: action.payload}
    case "DELETE_SPONSOR_ACCOUNT":
      var index = state.sponsors.indexOf(action.payload)
      var stateSponsors = state.sponsors.splice(index, 1)
      localStorage.clear()
      return {sponsors: state.sponsors, sponsor: "", role: "", error: ""}
    case "SUBMIT_EDIT_SPONSOR":
    debugger
      var oldSponsor = state.sponsors.find(sponsor => sponsor.id === action.payload.id)
      var index = state.sponsors.indexOf(oldSponsor)
      state.sponsors[index] = action.payload
      localStorage.setItem('username', action.payload.username)
        return {...state, sponsors: state.sponsors, sponsor: action.payload.username}
  default:
    return state
  }
}
