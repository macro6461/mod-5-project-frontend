export function fetchFacilitiesRequest(){
  return (dispatch) =>{
    debugger
    fetch('http://localhost:3000/facilities')
    .then(res => res.json())
    .then(json => dispatch(fetchFacilitiesRequestResolved(json)))
  }
}

export function fetchFacilitiesRequestResolved(data){
  debugger
  return {
    type: "RENDER_FACILITIES",
    payload: data
  }
}

export function getCurrentGeoLocation(){
    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position) => {
          let geoPosition = {latitude: position.coords.latitude, longitude: position.coords.longitude}
          return {
            type: "CURRENT_POSITION",
            payload: geoPosition
          }
        })
    }
}
