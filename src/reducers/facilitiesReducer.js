export default function facilitiesReducer(state={facilities: [], currentPosition: ""}, action){
  switch(action.type){
    case "FETCH_FACILITIES":
      return {...state, facilities: action.payload}
    case "RENDER_FACILITIES":
    debugger
        return {...state, facilities: action.payload}
    case "CURRENT_POSITION":
      return{...state, currentPosition: action.payload }
  default:
        return state
  }
}
