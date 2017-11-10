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
  default:
    return state
  }
}
