const baseUrl = 'https://stormy-cliffs-45704.herokuapp.com'

export function addSponsee(sponsee){

  return (dispatch) => {
    fetch(`${baseUrl}/sponsees`, {
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
    .then(res => {
    if (res.ok){
      return res.json()
    } else {
      throw res
    }})
    .then(json => {
        dispatch(renderAddSponsee(json))
      }
    )
    .catch(error => error.json())
    .then(error => {
      dispatch(renderSignUpError(error))
    })
    }
  }

  export function renderSignUpError(data){
    if (data === undefined){
      return {
        type: "default"
      }
    } else {
      return {
        type: "RENDER_ADD_SPONSEE_FAILED",
        payload: data
      }
    }
  }

export function renderAddSponsee(data){

  return {
    type: "RENDER_ADD_SPONSEE",
    payload: data
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


export function loginSponsee(sponsee){
  debugger
  return (dispatch) => {
    fetch(`${baseUrl}/sponsee/login`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json',
                'Accept': 'application/json',
              },
      body: JSON.stringify({username: sponsee.username, password: sponsee.password})
    }).then(res => res.json())
      .then(json => {
        if (json.sponsee === undefined){
          dispatch(sponseeLoginError({error: json.message}))
        } else{
          dispatch({
            type: "LOGIN_SPONSEE",
            payload: json
          })
        }
      })
  }
}

export function getCurrentSponsee(data){
  debugger

    return {
      type:"GET_CURRENT_SPONSEE",
      payload: data
    }
}

export function removeCurrentSponsee(){
  return{
    type: "REMOVE_CURRENT_SPONSEE"
  }
}

export function sponseeLoginError(data){
  return {
    type: "LOGIN_SPONSEE_FAILED",
    payload: data
  }
}

export function removeSponseeLogin(data){
  debugger
  return {
    type: "REMOVE_SPONSEE_LOGIN",
    payload: data
  }
}

export function deleteSponseeAccount(data){
  return (dispatch) => {
    fetch(`${baseUrl}/sponsees/${data.id}`, {
        headers: {"Content-Type": "application/json",
        "Accept":"application/json"},
        method: "DELETE",
        body: JSON.stringify({
          id: data.id
        })
      })
    .then(() => dispatch(sendDeleteData(data)))
  }
}

export function sendDeleteData(data){

  return {
    type: "DELETE_SPONSEE_ACCOUNT",
    payload: data
  }
}


export function fetchSponseesRequest(){
  return (dispatch) =>{
    fetch(`${baseUrl}/sponsees`)
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

export function editSponsee(data){

  return (dispatch) =>{
    fetch(`${baseUrl}/sponsees/${data.id}`, {
        headers: {"Content-Type": "application/json",
        "Accept":"application/json"},
        method: "POST",
        body: JSON.stringify({
          id: data.id,
          username: data.username,
          password: data.password,
          age: data.age,
          gender: data.gender,
          bio: data.bio,
          email: data.email,
          street: data.street,
          city: data.city,
          state: data.state,
          zip: data.zip
        })
      })
      .then(res => {
      if (res.ok){
        return res.json()
      } else {
        throw res
      }})
      .then(json => {
          dispatch(submitEditSponsee(json))
        }
      )
      .catch(error => error.json())
      .then(error => {
        dispatch(editSponseeFailed(error))
      })
  }
}

export function submitEditSponsee(data){

  return{
    type: "SUBMIT_EDIT_SPONSEE",
    payload: data
  }
}

export function editSponseeFailed(data){

  if (data === undefined){
    return {
      type: "default"
    }
  } else {
    return{
      type: "EDIT_SPONSEE_FAILED",
      payload: data
    }
  }
}

export function isSponseeEdited(data){

  return {
    type: "IS_SPONSEE_EDITED",
    payload: data
  }
}
