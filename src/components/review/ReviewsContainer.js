import React, { Component } from 'react'
import { Link, Route, withRouter, Redirect } from 'react-router-dom'
import { Image, Form, Button, Dropdown, Card, Icon, Radio, Divider } from 'semantic-ui-react'
import { connect } from 'react-redux'
import SponsorReview from './sponsorReview'
import SponseeReview from './sponseeReview'
import { fetchSponsorReviewsRequestResolved, fetchSponseeReviewsRequestResolved, removeSponsorReviews, removeSponseeReviews, deleteSponseeReview, deleteSponsorReview  } from '../../actions/reviewActions'

const baseUrl = 'http://localhost:3000'

class ReviewsContainer extends Component {

  state = {
    showForm: false,
    facilitySponsorReviews: [],
    facilitySponseeReviews: [],
    role: localStorage.getItem("role"),
    signedIn: false,
    reviewClicked: false,
    toggle: false
  }

  checkReviewClicked = () => {
    this.setState({
      reviewClicked: !this.state.reviewClicked
    }, () => this.reviewType())
  }


  componentDidMount = () => {
    debugger
    fetch(`${baseUrl}/sponsee_reviews`)
    .then(res => res.json())
    .then(json => this.props.fetchSponseeReviewsRequestResolved({json: json, facility_id: this.props.facility.id}))


    fetch(`${baseUrl}/sponsor_reviews`)
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
    let sponsor = this.props.sponsors.find((sponsor)=>{
      return sponsor.id === data.sponsor_id
    })
    return sponsor
  }


  findSponsee = (data) => {
    debugger
    const sponsee = this.props.sponsees.find((sponsee)=>{
      return sponsee.id === data.sponsee_id
    })
    return sponsee
  }

  reviewType = () => {
    if (this.state.role === "sponsor"){
      return <SponsorReview facilityId={this.props.facility.id} reviewClicked={this.checkReviewClicked} showReviews={this.props.showReviews} submittedModal={this.props.submittedModal} deletedModal={this.props.deletedModal}/>
    } else if (this.state.role === "sponsee"){
      return <SponseeReview facilityId={this.props.facility.id} reviewClicked={this.checkReviewClicked} showReviews={this.props.showReviews} submittedModal={this.props.submittedModal} deletedModal={this.props.deletedModal}/>
    }
  }

  confirmDeleteSponsorReview = (data) => {
    var result = window.confirm("Are you sure you want to delete your account?");
    if (result) {
      this.deleteSponsorReview(data)
    }
  }

  confirmDeleteSponseeReview = (data) => {
    var result = window.confirm("Are you sure you want to delete your account?");
    if (result) {
      this.deleteSponseeReview(data)
    }
  }


  deleteSponsorReview = (data) => {
    this.props.showReviews()
    this.props.deleteSponsorReview(data)
    this.props.deletedModal()
  }

  deleteSponseeReview = (data) => {
    this.props.showReviews()
    this.props.deleteSponseeReview(data)
    this.props.deletedModal()
  }

  removeAndShow = () => {
    this.props.removeSponseeReviews()
    this.props.removeSponsorReviews()
    this.props.showReviews()
  }

  handleToggleChange = () => {
    this.setState({
      toggle: !this.state.toggle
    })
  }

  render(){

    let sponsorAverage = 0
    let sponseeAverage = 0

    let filteredSponsorReviews = this.props.sponsorReviews.filter(function(review) {
      return review.sponsor_id
    })


    let finalSponsorReviews = this.props.sponsorReviews.length === 0 ? <p>No Sponsor Reviews</p> : filteredSponsorReviews.map((review) => {
      debugger
        let sponsor = this.findSponsor(review)
        sponsorAverage += review.rating
        debugger
        return(
        <div >
          <Divider inverted/>
          <div className="individualSponsorReview">
          <p className="ratingP">{review.rating}/5<span style={{color: "gold",  textShadow: "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black", marginRight: '0'}}>&#9733;</span></p><em>{sponsor.username} said:</em>
          <br/>
        <br/>
      <p style={{marginLeft: '15%', marginRight: '10%'}}>"{review.body}"</p>

    <p style={{marginLeft: '5%'}}>{review.created_at.split("T")[0]}</p>
        {sponsor.username === localStorage.getItem("username")
          ? <p style={{color: 'red', marginLeft: '5%'}} onClick={() => {this.confirmDeleteSponsorReview(review)}}>delete</p>
          : null
        }
          </div>
          <br/>
        <Divider inverted/>
          </div>
      )
    })

    let filteredSponseeReviews = this.props.sponseeReviews.filter(function(review) {
      return review.sponsee_id
    })

    let finalSponseeReviews = this.props.sponseeReviews.length === 0 ? <p>No Sponsee Reviews</p> : filteredSponseeReviews.map((review) => {
      let sponsee = this.findSponsee(review)
      sponseeAverage += review.rating
      return(
        <div >
          <Divider inverted/>
        <div className="individualSponseeReview">
        <p className="ratingP">{review.rating}/5<span style={{color: "gold",  textShadow: "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black"}}>&#9733;</span></p>
        <br/>
      <br/>
        <p>"{review.body}"</p>
        <p><em>{sponsee.username}</em></p>
        <p>{review.created_at.split("T")[0]}</p>
      {sponsee.username === localStorage.getItem("username")
      ? <p style={{color: 'red'}} onClick={() => {this.confirmDeleteSponseeReview(review)}}>delete</p>
      : null
      }
        </div>
        <br/>
      <Divider inverted/>

        </div>
      )
    })


  const reviewType = this.reviewType()
  const totalAverage = () => {
      if (sponseeAverage === 0 && sponsorAverage === 0){
      return 0
    } else if (sponseeAverage === 0){
      return (sponsorAverage / this.props.sponsorReviews.length)
    } else if (sponsorAverage === 0){
      return (sponseeAverage / this.props.sponseeReviews.length)
    } else if (sponsorAverage > 0 && sponseeAverage > 0){
      return (((sponseeAverage / this.props.sponseeReviews.length) + (sponsorAverage / this.props.sponsorReviews.length)) / 2)
    }
  }

const reviews = () => {
  if (this.props.sponsorReviews.length + this.props.sponseeReviews.length === 0){
    return <h3>be the first review!</h3>
  } else if (this.props.sponsorReviews.length + this.props.sponseeReviews.length === 1){
    return <h3>1 Review</h3>
  } else {
    return <h3>{this.props.sponsorReviews.length + this.props.sponseeReviews.length} reviews</h3>
  }
}

    return(
      <div>
        <div className="container">
        </div>
      <div className="reviewsContainerCard">
        <Card className="reviewsContainerCardInt">
          <br/>

        <Icon className="close" size="large" style={{color: 'red', marginLeft: '99%'}}onClick={this.removeAndShow}/>
          <h3>Reviews for {this.props.facility.name}</h3>
        {totalAverage() === 0
          ? <h3>No rating</h3>
          : <h3>average rating: {totalAverage().toFixed(1)}/5 <span style={{color: "gold",  textShadow: "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black"}}>&#9733;</span></h3>
        }
        {reviews()}
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
            ? null
            : <div className="reviewList">
              <br/>
            <div style={{fontSize: '1vw'}}>
            Sponsor Reviews <Radio toggle onChange={this.handleToggleChange}/> Sponsee Reviews
          </div>
          <br/>
            {this.state.toggle === false
              ? <div style={{width: '100%', overflow: 'hidden'}}>
                <h3>Sponsor Reviews</h3>
                   <div className="sponsorReviewOuter">
                     {finalSponsorReviews}
                     <br/>
                   </div>
                 </div>
              : <div style={{width: '100%', overflow: 'hidden'}}>
                <h3>Sponsee Reviews</h3>
                   <div className="sponsorReviewOuter">
                     {finalSponseeReviews}
                     <br/>
                   </div>
                 </div>

            }
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

export default connect(mapStateToProps, { fetchSponsorReviewsRequestResolved, fetchSponseeReviewsRequestResolved, removeSponsorReviews, removeSponseeReviews, deleteSponseeReview, deleteSponsorReview })(ReviewsContainer)
