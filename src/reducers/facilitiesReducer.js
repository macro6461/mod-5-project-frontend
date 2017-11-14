export default function facilitiesReducer(state={facilities: [], currentFacilityPosition: "", currentFacilityZoom: ""}, action){
  switch(action.type){
    case "FETCH_FACILITIES":
      return {...state, facilities: action.payload}
    case "RENDER_FACILITIES":
        return {...state, facilities: action.payload}
    case "SET_FACILITY_MAP_POSITION":
    debugger
      return{...state, currentFacilityPosition: action.payload }
    case "REMOVE_FACILITY_MAP_POSITION":
      return{...state, currentFacilityPosition: ""}
    case "SET_FACILITY_MAP_ZOOM":
    debugger
      return{...state, currentFacilityZoom: action.payload }
    case "REMOVE_FACILITY_MAP_ZOOM":
      return{...state, currentFacilityZoom: ""}
    default:
      return state
  }
}
