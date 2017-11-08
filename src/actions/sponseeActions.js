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
    }).then(res => res.json())
      .then(json => {
        if (json.sponsee === undefined){
          return null
        } else{
          dispatch({
            type: "LOGIN_SPONSEE",
            payload: json
          })
        }
      })
  }
}

export function setSponseeLocal(data){
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
