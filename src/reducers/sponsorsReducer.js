export default function sponsorsReducer(state={sponsors: []}, action){
  switch(action.type){
    case "FETCH_SPONSORS":
      return {...state, sponsors: action.payload}
    case "RENDER_SPONSORS":
      return {...state, sponsors: action.payload}
    case "RENDER_ADD_SPONSOR":
      return {sponsors: state.sponsors.concat(action.payload)}
  default:
    return state
  }
}
