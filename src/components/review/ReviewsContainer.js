import React, { Component } from 'react'
import { Image, Form, Button, Dropdown, Card } from 'semantic-ui-react'
import { connect } from 'react-redux'
import SponsorReview from './sponsorReview'
import SponseeReview from './sponseeReview'

class ReviewsContainer extends Component {

  state = {
    facilitySponsorReviews: "",
    role: localStorage.getItem("role"),
    signedIn: false,
    reviewClicked: false
  }

  filterSponsorReviews = (data) => {

    let facilitySponsorReviews = data.filter((sponsorReview)=>{

      return sponsorReview.facility_id === this.props.facility.id
    })
        debugger
      this.setState({
        facilitySponsorReviews: facilitySponsorReviews
      })
  }

  checkReviewClicked = () => {

    this.setState({
      reviewClicked: !this.state.reviewClicked
    }, () => this.reviewType())
  }

  componentDidMount = () => {
    if (localStorage.getItem("role") === null || localStorage.getItem("role") === undefined){
      this.setState({
        signedIn: false
      })
    } else {
      this.setState({
        signedIn: true
      }, () => {
        debugger
        fetch('http://localhost:3000/sponsor_reviews')
        .then(res => res.json())
        .then(json => this.filterSponsorReviews(json))
      })
    }
  }

  findSponsor = (data) => {
    const sponsor = this.props.sponsors.find((sponsor)=>{
      return sponsor.id === data.sponsor_id
    })
    return (<p>{sponsor.username}</p>)
  }

  checkReviews = (data) => {
    let averageRating = 0
    let rating = 0
    if (data === undefined || data === null ){
      return this.state.facilitySponsorReviews
    } else {
      return data.map((review) => {
        debugger
        const sponsor = this.findSponsor(review)
        rating = review.rating
        averageRating += rating
        debugger
        return (
          <div>
          <div className="individualSponsorReview">
          <p className="ratingP">{rating}/5</p>
          <p>"{review.body}" <em>{sponsor}</em></p>
          <p>{review.created_at.split("T")[0]}</p>
          </div>
          <br/>
          </div>
        )
      })
    }
  }

  reviewType = () => {

    if (this.state.role === "sponsor"){
      return <SponsorReview facilityId={this.props.facility.id}/>
    } else if (this.state.role === "sponsee"){
      return <SponseeReview facilityId={this.props.facility.id}/>
    }
  }

  render(){
    const reviews = this.state.facilitySponsorReviews

    const reviewType = this.reviewType()
    const facilitySponsorReviews = this.state.facilitySponsorReviews && this.state.facilitySponsorReviews.length > 1 ? this.state.facilitySponsorReviews : "be the first to review!"

    // const orderedReviews = this.checkReviews(reviews).sort(function(a, b){
    //   return new Date(b.created_at) - new Date(a.created_at)
    // })
    console.log(reviews)
    console.log(facilitySponsorReviews)
    console.log(this.props.sponsorReviews)
    return(
      <div>
        <div className="container">
        </div>
      <div className="reviewsContainerCard">
        <Card className="reviewsContainerCardInt">
          <Button className="reviewBack" onClick={this.props.showReviews}>back</Button>
          <h3>Reviews for {this.props.facility.name}</h3>
          {this.state.signedIn === false
            ? <Button className="writeAReview">please sign in to write a review</Button>
            : <Button className="writeAReview" onClick={this.checkReviewClicked}>write a review!</Button>
          }
          {this.state.reviewClicked === false
            ? null
            : reviewType
          }
          {/* {this.props.sponsorReviews} */}
          {this.state.facilitySponsorReviews === "" || this.state.facilitySponsorReviews === undefined
            ? <h4>be the first to review!</h4>
            : this.checkReviews(reviews)
          }
        </Card>
      </div>
    </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentSponsor: state.sponsorsReducer.sponsor,
    currentSponsee: state.sponseesReducer.sponsee,
    sponsees: state.sponseesReducer.sponsees,
    sponsors: state.sponsorsReducer.sponsors,
    currentPosition: state.currentReducer.currentPosition
  }
}

export default connect(mapStateToProps)(ReviewsContainer)
