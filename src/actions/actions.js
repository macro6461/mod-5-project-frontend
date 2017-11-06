export function addSponsor(sponsor){

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
        email: sponsor.email,
        address: sponsor.address
      })
    })
    .then(res => res.json())
    .then(json => dispatch(renderAddSponsor(json)))
  }
}

export function renderAddSponsor(data){

  return {
    type: "RENDER_ADD_SPONSOR",
    payload: data
  }
}

export function loginSponsor(sponsor){

  return (dispatch) => {
    fetch('http://localhost:3000/sponsor/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json',
                'Accept': 'application/json',
              },
      body: JSON.stringify({username: sponsor.username, password: sponsor.password})
    }).then(res => res.json()).then(json =>
      dispatch(setSponsorLocal(json)))
  }
}

export function setSponsorLocal(data){
  if (data.sponsor === undefined){
    return null
  } else{
    return {
      type: "LOGIN_SPONSOR",
      payload: data
    }
  }
}

export function removeSponsorLogin(){
  return {
    type: "REMOVE_SPONSOR_LOGIN",
    payload: ""
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
  debugger
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
        email: sponsee.email,
        address: sponsee.address
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

export function loginSponsee(sponsee){

  return (dispatch) => {
    fetch('http://localhost:3000/sponsee/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json',
                'Accept': 'application/json',
              },
      body: JSON.stringify({username: sponsee.username, password: sponsee.password})
    }).then(res => res.json()).then(json =>
      dispatch(setSponseeLocal(json)))
  }
}

export function setSponseeLocal(data){

  if (data.sponsee === undefined){
    return null
  } else{

    return {
      type: "LOGIN_SPONSEE",
      payload: data
    }
  }
}

export function removeSponseeLogin(){
  return {
    type: "REMOVE_SPONSEE_LOGIN",
    payload: ""
  }
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
