export default function sponseesReducer(state={sponsees: []}, action){
  switch(action.type){
    case "FETCH_SPONSEES":
      return {...state, sponsees: action.payload}
    case "RENDER_SPONSEES":
      return {...state, sponsees: action.payload}
    case "ADD_SPONSEE":
      return {sponsees: state.sponsees.concat(action.sponsee)}
  default:
    return state
  }
}
