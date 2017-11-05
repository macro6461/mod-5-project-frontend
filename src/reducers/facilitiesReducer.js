export default function facilitiesReducer(state={facilities: []}, action){
  switch(action.type){
    case "FETCH_FACILITIES":
      return {...state, facilities: action.payload}
    case "RENDER_FACILITIES":
        return {...state, facilities: action.payload}
  default:
    return state
  }
}
