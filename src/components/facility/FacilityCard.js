import React, { Component } from 'react'
import { Card, Icon, Button, Popup } from 'semantic-ui-react'
import ReviewsContainer from '../review/ReviewsContainer'
import { connect } from 'react-redux'
import { removeSponsorReviews } from '../../actions/reviewActions'
import { removeFacilityMapZoom, removeFacilityMapPosition } from '../../actions/facilityActions'


class FacilityCard extends Component{

  state = {
    insurance: false,
    reviews: false,
    facilitySponsorReviews: "",
    facilitySponseeReviews: "",
    submitted: false
  }

  showInsurance = () => {
    this.setState({
      insurance: !this.state.insurance
    })
  }

  handleSubmittedModal = () => {
    this.setState({
      submitted: true
    }, () => {this.changeSubmittedModal()})
  }

  changeSubmittedState = () => {
    debugger
    this.setState({
      submitted: false
    })
  }

  changeSubmittedModal = () => {
    debugger
    let changeSubmittedStateStored = this.changeSubmittedState
    setTimeout(function(){changeSubmittedStateStored()}, 3900)
  }

  showReviews = () => {
    this.setState({
      reviews: !this.state.reviews
    })
  }

  componentDidMount = () => {
    this.filterSponsorReviews(this.props.sponsorReviews)
    this.filterSponseeReviews(this.props.sponseeReviews)
  }

  filterSponsorReviews = (data) => {

    let facilitySponsorReviews = data.filter((sponsorReview)=>{
      return sponsorReview.facility_id === this.props.facility.id
    })
    this.setState({
      facilitySponsorReviews: facilitySponsorReviews
    })
  }

  filterSponseeReviews = (data) => {
    let facilitySponseeReviews = data.filter((sponseeReview)=>{
      return sponseeReview.facility_id === this.props.facility.id
    })
    this.setState({
      facilitySponseeReviews: facilitySponseeReviews
    })
  }

  handleOnLeave = () => {
    this.props.removeFacilityMapZoom()
    this.props.removeFacilityMapPosition()
  }

  handleOnEnter = () => {
    let facility = this.props.facility
    this.props.cardClick({facility: facility, zoom: 17})
  }

  render(){
    console.log(this.props)
    const phone = "tel:" + this.props.facility.phone
    const insurance = this.props.facility.insurance.split(" ")
    let insurances
    if (insurance.length > 1 ){
      insurances = insurance.join(" ")
    } else {
      insurances = insurance[0]
    }

    let googleMapLocation = "https://maps.google.com/maps/dir/?q=" + this.props.facility.latitude + ", " + this.props.facility.longitude

    return(
      <div style={{width: '20%', marginBottom: '20px'}}>
      <div>
      {this.state.reviews === false
        ? null
        : <ReviewsContainer submittedModal={this.handleSubmittedModal} name="reviewsContainer" facility={this.props.facility} filterSponsorReviews={this.filterSponsorReviews} sponsorReviews={this.state.facilitySponsorReviews} sponseeReviews={this.state.facilitySponseeReviews} showReviews={this.showReviews} removeSponsorReviews={this.props.removeSponsorReviews}/>
      }
      {this.state.submitted
        ? <div className="thanksForReview">thanks for the review!<Icon className="checkmark box" size="large"/></div>
        : null
      }
      </div>
      <div className="facilityCardDiv"onMouseEnter={this.handleOnEnter}>
      <Card className="facilityCard">
        <br/>
      <p className="reviews" onClick={this.showReviews}><Icon className="pencil" size="large"/>reviews</p>
      <br/>
        <h2>{this.props.facility.name}</h2>
        <h3>{this.props.facility.address}</h3>
      {this.props.distance === NaN
        ? <h4>No Data</h4>
        : <h4>Distance: {this.props.distance}</h4>
      }
      <a className="moreInfo" href={this.props.facility.url} target="_blank">website</a>
    <br/>
      <a className="moreInfo" target="_blank" href={googleMapLocation}>directions</a>
    <br/>
    <br/>
    {this.props.facility.phone === null
      ? null
      : <a href={phone}><Icon className="phone" size="big"/></a>
    }
      <br/>
      <div>
        <Popup
          style={{fontSize: '1.2vw', zIndex: '1'}}
          on='click'
          trigger={<Button className="insuranceButton" content='insurance' />}
          content={insurances}
          position='right center'
        />
      </div>
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

export default connect(mapStateToProps, {removeSponsorReviews, removeFacilityMapZoom, removeFacilityMapPosition})(FacilityCard)
