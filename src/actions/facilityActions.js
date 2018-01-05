const baseUrl = 'http://localhost:3000'

export function fetchFacilitiesRequest(){

  return (dispatch) =>{
    fetch(`${baseUrl}/facilities`)
    .then(res => res.json())
    .then(json => dispatch(fetchFacilitiesRequestResolved(json)))
  }
}

export function fetchFacilitiesRequestResolved(data){

  return {
    type: "RENDER_FACILITIES",
    payload: data
  }
}

export function setFacilityMapPosition(data){

  return {
    type: "SET_FACILITY_MAP_POSITION",
    payload: data
  }
}

export function removeFacilityMapPosition(){
  return {
    type: "REMOVE_FACILITY_MAP_POSITION"
  }
}

export function setFacilityMapZoom(data){

  return {
    type: "SET_FACILITY_MAP_ZOOM",
    payload: data
  }
}

  export function removeFacilityMapZoom(){
  return {
    type: "REMOVE_FACILITY_MAP_ZOOM"
  }
}
