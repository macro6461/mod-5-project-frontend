import React, { Component } from 'react'
import { Link, Route, withRouter, Redirect } from 'react-router-dom'
import { Image, Form, Button, Dropdown, Card, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'
import SponsorReview from './sponsorReview'
import SponseeReview from './sponseeReview'
import { fetchSponsorReviewsRequestResolved, fetchSponseeReviewsRequestResolved, removeSponsorReviews, removeSponseeReviews } from '../../actions/reviewActions'

class ReviewsContainer extends Component {

  state = {
    showForm: false,
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
    fetch('http://localhost:3000/sponsee_reviews')
    .then(res => res.json())
    .then(json => this.props.fetchSponseeReviewsRequestResolved({json: json, facility_id: this.props.facility.id}))
    fetch('http://localhost:3000/sponsor_reviews')
    .then(res => res.json())
    .then(json => this.props.fetchSponsorReviewsRequestResolved({json: json, facility_id: this.props.facility.id}))
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
      debugger
      const sponsor = this.props.sponsors.find((sponsor)=>{
        debugger
        return sponsor.id === data.sponsor_id
      })
      return (<p>{sponsor.username} (sponsor)</p>)
    }


  findSponsee = (data) => {
    debugger
    const sponsee = this.props.sponsees.find((sponsee)=>{
      return sponsee.id === data.sponsee_id
    })
    return (<p>{sponsee.username} (sponsee)</p>)
  }

  reviewType = () => {
    if (this.state.role === "sponsor"){
      return <SponsorReview facilityId={this.props.facility.id} reviewClicked={this.checkReviewClicked}/>
    } else if (this.state.role === "sponsee"){
      return <SponseeReview facilityId={this.props.facility.id} reviewClicked={this.checkReviewClicked} />
    }
  }

  removeAndShow = () => {
    this.props.removeSponseeReviews()
    this.props.removeSponsorReviews()
    this.props.showReviews()
  }

  render(){
    const finalSponsorReviews = this.props.sponsorReviews.map((review) => {
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
    const finalSponseeReviews = this.props.sponseeReviews.map((review) => {
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
    console.log(finalSponsorReviews)
    console.log(finalSponseeReviews)
    const reviewType = this.reviewType()
    return(
      <div>
        <div className="container">
        </div>
      <div className="reviewsContainerCard">
        <Card className="reviewsContainerCardInt">
          <br/>
        <Icon className="close" size="large" style={{color: 'red', marginLeft: '99%'}}onClick={this.removeAndShow}/>
          <h3>Reviews for {this.props.facility.name}</h3>
          {this.state.signedIn === false
            ? <div>
              <p>please sign in to write a review</p>
            <Link to="/sponsors"><Button className="sponsorLogin" style={{ fontSize: '1vw', float: 'left', marginLeft: '20%', width: '20%'}}>sponsor</Button></Link>
          <Link to="/sponsees"><Button className="sponsorLogin" style={{fontSize: '1vw', float: 'right', marginRight: '20%', width: '20%'}}>sponsee</Button></Link>
            </div>
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
                <div>
                  {finalSponsorReviews}
                  {finalSponseeReviews}
                </div>
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

export default connect(mapStateToProps, { fetchSponsorReviewsRequestResolved, fetchSponseeReviewsRequestResolved, removeSponsorReviews, removeSponseeReviews })(ReviewsContainer)
