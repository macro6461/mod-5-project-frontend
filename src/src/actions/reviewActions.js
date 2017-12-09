export function fetchSponsorReviewsRequest(data){

  return (dispatch) => {
    fetch('http://localhost:3000/sponsor_reviews')
    .then(res => res.json())
    .then(json => dispatch(fetchSponsorReviewsRequestResolved({json: json, facility_id: data})))
  }
}

export function fetchSponsorReviewsRequestResolved(data){
  debugger
  return {
    type: "RENDER_SPONSOR_REVIEWS",
    payload: data
  }
}

export function removeSponsorReviews(){
  return {
    type: "REMOVE_SPONSOR_REVIEWS"
  }
}

export function addSponsorReview(data){
  debugger
  return (dispatch) => {
    fetch('http://localhost:3000/sponsor_reviews', {
      headers: {"Content-Type": "application/json",
      "Accept":"application/json"},
      method: "POST",
      body: JSON.stringify({
        sponsor_id: data.sponsor_id,
        rating: data.rating,
        body: data.body,
        facility_id: data.facility_id
      })
    })
    .then(res => res.json())
    .then(json => dispatch(addSponsorReviewResolved(json)))
  }
}

export function addSponsorReviewResolved(data){
  debugger
  return {
    type: "RENDER_ADD_SPONSOR_REVIEW",
    payload: data.sponsor_review
  }
}

export function fetchSponseeReviewsRequest(data){
debugger
  return (dispatch) => {
    fetch('http://localhost:3000/sponsee_reviews')
    .then(res => res.json())
    .then(json => dispatch(fetchSponseeReviewsRequestResolved({json: json, facility_id: data})))
  }
}

export function fetchSponseeReviewsRequestResolved(data){
debugger
  return {
    type: "RENDER_SPONSEE_REVIEWS",
    payload: data
  }
}

export function addSponseeReview(data){
  debugger
  return (dispatch) => {
    fetch('http://localhost:3000/sponsee_reviews', {
      headers: {"Content-Type": "application/json",
      "Accept":"application/json"},
      method: "POST",
      body: JSON.stringify({
        sponsee_id: data.sponsee_id,
        rating: data.rating,
        body: data.body,
        facility_id: data.facility_id
      })
    })
    .then(res => res.json())
    .then(json => dispatch(addSponseeReviewResolved(json)))
  }
}

export function addSponseeReviewResolved(data){
  debugger
  return {
    type: "RENDER_ADD_SPONSEE_REVIEW",
    payload: data
  }
}

export function removeSponseeReviews(){
  return {
    type: "REMOVE_SPONSEE_REVIEWS"
  }
}

export function deleteSponseeReview(data){
  return (dispatch) => {
    fetch(`http://localhost:3000/sponsee_reviews/${data.id}`, {
        headers: {"Content-Type": "application/json",
        "Accept":"application/json"},
        method: "DELETE",
        body: JSON.stringify({
          id: data.id
        })
      })
    .then(() => dispatch(sendSponseeReviewDeleteData(data)))
  }
}

export function sendSponseeReviewDeleteData(data){
  return {
    type: "DELETE_SPONSEE_REVIEW",
    payload: data
  }
}

export function deleteSponsorReview(data){
  debugger
  return (dispatch) => {
    fetch(`http://localhost:3000/sponsor_reviews/${data.id}`, {
        headers: {"Content-Type": "application/json",
        "Accept":"application/json"},
        method: "DELETE",
        body: JSON.stringify({
          id: data.id
        })
      })
    .then(() => dispatch(sendSponsorReviewDeleteData(data)))
  }
}

export function sendSponsorReviewDeleteData(data){
  return {
    type: "DELETE_SPONSOR_REVIEW",
    payload: data
  }
}
