export default function sponseesReducer(state={sponsees: [], sponsee: "", role: "", error: ""}, action){
  switch(action.type){
    case "FETCH_SPONSEES":
      return {...state, sponsees: action.payload}
    case "RENDER_SPONSEES":
      return {...state, sponsees: action.payload}
    case "RENDER_ADD_SPONSEE":
    localStorage.setItem('jwt', action.payload.jwt)
    localStorage.setItem('role', action.payload.sponsee.role)
    localStorage.setItem('username', action.payload.sponsee.username)
      return {sponsees: state.sponsees.concat(action.sponsee), sponsee: action.payload.sponsee.username, role: action.payload.sponsee.role}
    case "LOGIN_SPONSEE":
      localStorage.setItem('jwt', action.payload.jwt)
      localStorage.setItem('role', action.payload.sponsee.role)
      localStorage.setItem('username', action.payload.sponsee.username)
      return {...state, sponsee: action.payload.sponsee.username, role: action.payload.sponsee.role}
    case "REMOVE_SPONSEE_LOGIN":
    localStorage.clear()
      return {...state, sponsee: action.payload, role: action.payload, error: action.payload}
    case "RENDER_ADD_SPONSEE_FAILED":
      return {...state, error: action.payload.error}
      case "REMOVE_SPONSEE_ERROR":
        return {...state, error: action.payload}
      case "LOGIN_SPONSEE_FAILED":
        return {...state, error: action.payload.error}
      case "GET_CURRENT_SPONSEE_ROLE":
        return {...state, role: action.payload}
        case "GET_CURRENT_SPONSEE":
        var sponsee = state.sponsees.find((sponsee)=>{
          return sponsee.username === action.payload
        })
          return {...state, role: action.payload}
      case "DELETE_SPONSEE_ACCOUNT":
        var index = state.sponsees.indexOf(action.payload)
        var stateSponsees = state.sponsees.splice(index, 1)
        localStorage.clear()
        return {sponsees: state.sponsees, sponsee: "", role: "", error: ""}
      case "SUBMIT_EDIT_SPONSEE":

      localStorage.setItem('username', action.payload.username)
        return {...state, sponsees: [action.payload, ...state.sponsees], sponsee: action.payload.username}
  default:
    return state
  }
}
