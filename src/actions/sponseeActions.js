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
        email: sponsee.email,
        street: sponsee.street,
        city: sponsee.city,
        state: sponsee.state,
        zip: sponsee.zip
      })
    })
    .then(res => res.json())
    .then(json => {
      if (json.sponsee === undefined){
        dispatch(renderSignUpError({error: "invalid signup"}))
      } else{
        dispatch(renderAddSponsee(json))
      }
    })
  }
}

export function removeSponseeError(){
  return{
    type: "REMOVE_SPONSEE_ERROR",
    payload: ""
  }
}

export function getCurrentSponseeRole(data){
  return{
    type: "GET_CURRENT_SPONSEE_ROLE",
    payload: data
  }
}

export function renderSignUpError(data){

    return {
      type: "RENDER_ADD_SPONSEE_FAILED",
      payload: data
    }
}



export function renderAddSponsee(data){

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
          dispatch(sponseeLoginError({error: "invalid login"}))
        } else{
          dispatch({
            type: "LOGIN_SPONSEE",
            payload: json
          })
        }
      })
  }
}

export function sponseeLoginError(data){
  return {
    type: "LOGIN_SPONSEE_FAILED",
    payload: data
  }
}

export function removeSponseeLogin(data){
  return {
    type: "REMOVE_SPONSEE_LOGIN",
    payload: data
  }
}

// export function deleteSponseeAccount(data){
//
// }

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
