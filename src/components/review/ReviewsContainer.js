import React, { Component } from 'react'
import { Image, Form, Button, Dropdown, Card } from 'semantic-ui-react'
import { connect } from 'react-redux'
import SponsorReview from './sponsorReview'
import SponseeReview from './sponseeReview'
import { fetchSponsorReviewsRequest, fetchSponseeReviewsRequest, removeSponsorReviews, removeSponseeReviews } from '../../actions/reviewActions'

class ReviewsContainer extends Component {

  state = {
    facilitySponsorReviews: [],
    facilitySponseeReviews: [],
    role: localStorage.getItem("role"),
    signedIn: false,
    reviewClicked: false
  }

  checkReviewClicked = () => {
    this.setState({
      reviewClicked: !this.state.reviewClicked
    }, () => this.reviewType())
  }

  componentDidMount = () => {
    this.props.fetchSponsorReviewsRequest(this.props.facility.id)
    this.props.fetchSponseeReviewsRequest(this.props.facility.id)
    if (localStorage.getItem("role") === null || localStorage.getItem("role") === undefined){
      this.setState({
        signedIn: false
      })
    } else {
      this.setState({
        signedIn: true
      })
    }
  }

  findSponsor = (data) => {
    if (data.sponsee_id){
      this.findSponsee(data)
    } else{
      debugger
      const sponsor = this.props.sponsors.find((sponsor)=>{
        debugger
        return sponsor.id === data.sponsor_id
      })
      return (<p>{sponsor.username}</p>)
    }
  }

  findSponsee = (data) => {
    debugger
    const sponsee = this.props.sponsees.find((sponsee)=>{
      //debugger
      return sponsee.id === data.sponsee_id
    })
    return (<p>{sponsee.username}</p>)
  }

  reviewType = () => {

    if (this.state.role === "sponsor"){
      return <SponsorReview facilityId={this.props.facility.id}/>
    } else if (this.state.role === "sponsee"){
      return <SponseeReview facilityId={this.props.facility.id} />
    }
  }

  removeAndShow = () => {
    this.props.removeSponseeReviews()
    this.props.removeSponsorReviews()
    this.props.showReviews()
  }

  render(){
    const sponsorReviews = this.props.sponsorReviews.map((review) => {
      debugger
      const sponsor = this.findSponsor(review)
      return(
        <div>
        <div className="individualSponsorReview">
        <p className="ratingP">{review.rating}/5</p>
        <p>"{review.body}" <em>{sponsor}</em></p>
        <p>{review.created_at.split("T")[0]}</p>
        </div>
        <br/>
        </div>
      )
    })
    const sponseeReviews = this.props.sponseeReviews.map((review) => {
      debugger
      const sponsee = this.findSponsee(review)
      return(
        <div>
        <div className="individualSponsorReview">
        <p className="ratingP">{review.rating}/5</p>
        <p>"{review.body}" <em>{sponsee}</em></p>
        <p>{review.created_at.split("T")[0]}</p>
        </div>
        <br/>
        </div>
      )
    })

    const reviewType = this.reviewType()
    return(
      <div>
        <div className="container">
        </div>
      <div className="reviewsContainerCard">
        <Card className="reviewsContainerCardInt">
          <Button className="reviewBack" onClick={this.removeAndShow}>back</Button>
          <h3>Reviews for {this.props.facility.name}</h3>
          {this.state.signedIn === false
            ? <Button className="writeAReview">please sign in to write a review</Button>
            : <Button className="writeAReview" onClick={this.checkReviewClicked}>write a review!</Button>
          }
          {this.state.reviewClicked === false
            ? null
            : reviewType
          }
          {this.props.sponsorReviews.length === 0 && this.props.sponseeReviews.length === 0
            ? <div>
              <br/>
              <p>be the first review!</p>
              </div>
            : <div className="reviewList">
              {sponsorReviews}
              {sponseeReviews}
            </div>
          }

        </Card>
      </div>
    </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    sponsorReviews: state.reviewReducer.sponsorReviews,
    sponseeReviews: state.reviewReducer.sponseeReviews,
    currentSponsor: state.sponsorsReducer.sponsor,
    currentSponsee: state.sponseesReducer.sponsee,
    sponsees: state.sponseesReducer.sponsees,
    sponsors: state.sponsorsReducer.sponsors,
    currentPosition: state.currentReducer.currentPosition
  }
}

export default connect(mapStateToProps, { fetchSponsorReviewsRequest, fetchSponseeReviewsRequest, removeSponsorReviews, removeSponseeReviews })(ReviewsContainer)
