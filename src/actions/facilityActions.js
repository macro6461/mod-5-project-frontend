export function fetchFacilitiesRequest(){
  return (dispatch) =>{

    fetch('http://localhost:3000/facilities')
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
