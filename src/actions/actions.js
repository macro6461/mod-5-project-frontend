export function getCurrentPosition(){
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        dispatch(showPosition(position))
      })
  } else {
      console.log("Geolocation is not supported by this browser.")
  }
}

export function showPosition(data){
  return {
    type: "GET_CURRENT_POSITION",
    payload: data
  }
}
