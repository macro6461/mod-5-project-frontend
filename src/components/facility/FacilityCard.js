import React, { Component } from 'react'
import { Card, Icon, Button, Popup } from 'semantic-ui-react'
import ReviewsContainer from '../review/ReviewsContainer'
import { connect } from 'react-redux'
import { removeSponsorReviews } from '../../actions/reviewActions'


class FacilityCard extends Component{

  state = {
    insurance: false,
    reviews: false,
    facilitySponsorReviews: "",
    facilitySponseeReviews: ""
  }

  showInsurance = () => {
    this.setState({
      insurance: !this.state.insurance
    })
  }

  showReviews = (e) => {
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

  handleOnClick = () => {
    let facility = this.props.facility
    this.props.cardClick({facility: facility, zoom: 17})
  }

  render(){
    console.log(this.state.facilitySponsorReviews)
    const phone = "tel:" + this.props.facility.phone
    const insurance = this.props.facility.insurance.split(" ")
    let insurances
    if (insurance.length > 1 ){
      insurances = insurance.join(" ")
    } else {
      insurances = insurance[0]
    }

    return(
      <div style={{width: '20%', marginBottom: '20px'}}>
      <div>
      {this.state.reviews === false
        ? null
        : <ReviewsContainer name="reviewsContainer" facility={this.props.facility} filterSponsorReviews={this.filterSponsorReviews} sponsorReviews={this.state.facilitySponsorReviews} sponseeReviews={this.state.facilitySponseeReviews} showReviews={this.showReviews} removeSponsorReviews={this.props.removeSponsorReviews}/>
      }
      </div>
      <div onClick={this.handleOnClick}>
      <Card className="facilityCard">
        <br/>
        <Button className="reviews" onClick={this.showReviews}>reviews</Button>
      <br/>
        <h2>{this.props.facility.name}</h2>
        <h3>{this.props.facility.address}</h3>
      {this.props.distance === NaN
        ? <h4>No Data</h4>
        : <h4>Distance: {this.props.distance}</h4>
      }
      <a className="moreInfo" href={this.props.facility.url} target="_blank">website</a>
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

export default connect(mapStateToProps, {removeSponsorReviews})(FacilityCard)
