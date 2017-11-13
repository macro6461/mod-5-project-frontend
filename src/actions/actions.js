export function getCurrentUserPosition(data){
  return {
    type: "GET_CURRENT_POSITION",
    payload: data
  }
}

export function getCurrentPerson(data){
  debugger
  if (data.role === "sponsor"){
    return {
      type: "GET_CURRENT_SPONSOR",
      payload: data.username
    }
  } else if (data.role === "sponsee") {
    debugger
    return {
      type: "GET_CURRENT_SPONSEE",
      payload: data.username
    }
  }
}
