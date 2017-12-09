export default function reviewReducer(state={sponsorReviews: [], sponseeReviews: []}, action){

  switch(action.type){
      case "FETCH_SPONSOR_REVIEWS":
        return {...state, sponsorReviews: action.payload}
      case "RENDER_SPONSOR_REVIEWS":
      debugger
      const facilitySponsorReviews = action.payload.json.filter((review) =>{
        return review.facility_id === action.payload.facility_id
      })
        return {...state, sponsorReviews: facilitySponsorReviews}
      case "REMOVE_SPONSOR_REVIEWS":
        return {...state, sponsorReviews: []}
      case "RENDER_ADD_SPONSOR_REVIEW":
        debugger
        return {...state, sponsorReviews: state.sponsorReviews.concat(action.payload)}
      case "FETCH_SPONSEE_REVIEWS":
        return {...state, sponseeReviews: action.payload}
      case "RENDER_SPONSEE_REVIEWS":
      debugger
      const facilitySponseeReviews = action.payload.json.filter((review) =>{
        return review.facility_id === action.payload.facility_id
      })
        return {...state, sponseeReviews: facilitySponseeReviews}
      case "RENDER_ADD_SPONSEE_REVIEW":
        return {...state, sponseeReviews: state.sponsorReviews.concat(action.payload)}
      case "REMOVE_SPONSEE_REVIEWS":
      debugger
        return {...state, sponseeReviews: []}
      case "DELETE_SPONSEE_REVIEW":
        var index = state.sponseeReviews.indexOf(action.payload)
        var stateSponseeReviews = state.sponseeReviews.splice(index, 1)
          return {...state, sponseeReviews: stateSponseeReviews}
      case "DELETE_SPONSOR_REVIEW":
        var index = state.sponsorReviews.indexOf(action.payload)
        var stateSponsorReviews = state.sponsorReviews.splice(index, 1)
          return {...state, sponsorReviews: stateSponsorReviews}
    default:
      return state
  }
}
