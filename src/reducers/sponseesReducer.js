export default function sponseesReducer(state={sponsees: [], sponsee: "", role: "", error: null, isSponseeEdited: false}, action){
  switch(action.type){
    case "FETCH_SPONSEES":
      return {...state, sponsees: action.payload}
    case "RENDER_SPONSEES":
    let filteredSponsees = action.payload.filter((sponsee) => {
      return sponsee.latitude !== null && sponsee.longitude !== null
    })
    if (localStorage.getItem("role") === "sponsee"){
      const username = localStorage.getItem("username")
      let sponsee = filteredSponsees.find((sponsee) => {
        debugger
        return sponsee.username === username
      })
      return {...state, sponsee: sponsee, sponsees: filteredSponsees}
    } else {
      return {...state, sponsee: "", sponsees: filteredSponsees}
    }
    case "RENDER_ADD_SPONSEE":
    localStorage.setItem('jwt', action.payload.jwt)
    localStorage.setItem('role', action.payload.sponsee.role)
    localStorage.setItem('username', action.payload.sponsee.username)
      return {sponsees: state.sponsees.concat(action.payload.sponsee), sponsee: action.payload.sponsee.username, role: action.payload.sponsee.role, error: null, isSponseeEdited: false}
    case "LOGIN_SPONSEE":
    debugger
      localStorage.setItem('jwt', action.payload.jwt)
      localStorage.setItem('role', action.payload.sponsee.role)
      localStorage.setItem('username', action.payload.sponsee.username)
      return {...state, sponsee: action.payload.sponsee, role: action.payload.sponsee.role}
      case "REMOVE_SPONSEE_LOGIN":
      localStorage.clear()
        return {...state, sponsee: action.payload, role: action.payload, error: null}
    case "RENDER_ADD_SPONSEE_FAILED":
      return {...state, error: action.payload.error}
      case "REMOVE_SPONSEE_ERROR":
        return {...state, error: null}
      case "LOGIN_SPONSEE_FAILED":
        return {...state, error: action.payload.error}
      case "GET_CURRENT_SPONSEE_ROLE":
        return {...state, role: action.payload}
      case "GET_CURRENT_SPONSEE":
      debugger
      var sponsee = state.sponsees.find((sponsee)=>{
        return sponsee.username === action.payload
      })
        return {...state, sponsee: sponsee}
      case "REMOVE_CURRENT_SPONSEE":
        return{...state, sponsee: ""}
      case "DELETE_SPONSEE_ACCOUNT":
        var index = state.sponsees.indexOf(action.payload)
        var stateSponsees = state.sponsees.splice(index, 1)
        localStorage.clear()
          return {sponsees: state.sponsees, sponsee: "", role: "", error: null, isSponseeEdited: false}
      case "SUBMIT_EDIT_SPONSEE":
        var oldSponsee = state.sponsees.find(sponsee => sponsee.id === action.payload.id)
        var index = state.sponsees.indexOf(oldSponsee)
        state.sponsees[index] = action.payload
        localStorage.setItem('username', action.payload.username)
          return {...state, sponsees: state.sponsees, error: null, isSponseeEdited: false}
      case "EDIT_SPONSEE_FAILED":
        return {...state, error: action.payload.error, isSponseeEdited: true}
      case "IS_SPONSEE_EDITED":
        return {...state, isSponseeEdited: action.payload}
      default:
    return state
  }
}
