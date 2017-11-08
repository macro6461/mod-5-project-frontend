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
    }).then(res => res.json())
      .then(json => {
        if (json.sponsor === undefined){
          return null
        } else{
          dispatch({
            type: "LOGIN_SPONSOR",
            payload: json
          })
        }
      })
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
