export function addSponsor(sponsor){
  debugger
  return (dispatch) => {
    fetch('http://localhost:3000/sponsors', {
      headers: {"Content-Type": "application/json",
      "Accept":"application/json"},
      method: "POST",
      body: JSON.stringify({
        username: sponsor.username,
        password: sponsor.password,
        age: sponsor.age,
        gender: sponsor.gender,
        bio: sponsor.bio,
        email: sponsor.email
      })
    })
    .then(res => res.json())
    .then(json => dispatch(renderAddSponsor(json)))
  }
}

export function renderAddSponsor(data){
  debugger
  return {
    type: "RENDER_ADD_SPONSOR",
    payload: data
  }
}

export function fetchSponsorsRequest(){
  return (dispatch) => {
    fetch('http://localhost:3000/sponsors')
    .then(res => res.json())
    .then(json => dispatch(fetchSponsorsRequestResolved(json)))
  }
}

export function fetchSponsorsRequestResolved(data){
  return {
    type: "RENDER_SPONSORS",
    payload: data
  }
}

export function addSponsee(sponsee){
  return (dispatch) => {
    fetch('http://localhost:3000/sponsees', {
      headers: {"Content-Type": "application/json",
      "Accept":"application/json"},
      method: "POST",
      body: JSON.stringify({
        username: sponsee.username,
        password: sponsee.password,
        age: sponsee.age,
        gender: sponsee.gender,
        bio: sponsee.bio,
        email: sponsee.email
      })
    })
    .then(res => res.json())
    .then(json => dispatch(renderAddSponsee(json)))
  }
}

export function renderAddSponsee(data){
  debugger
  return {
    type: "RENDER_ADD_SPONSEE",
    payload: data
  }
}

export function loginSponsee(data){
  
}

export function fetchSponseesRequest(){
  return (dispatch) =>{
    fetch('http://localhost:3000/sponsees')
    .then(res => res.json())
    .then(json => dispatch(fetchSponseesRequestResolved(json)))
  }
}

export function fetchSponseesRequestResolved(data){
  return {
    type: "RENDER_SPONSEES",
    payload: data
  }
}

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
