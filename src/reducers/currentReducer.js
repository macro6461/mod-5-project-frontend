export default function currentReducer(state={currentPosition: {lat: "", lng: ""}}, action){
  switch(action.type){
    case "GET_CURRENT_POSITION":
      return {...state, currentPosition: {lat: action.payload.latitude, lng: action.payload.longitude}}
    default:
      return state
  }
}
