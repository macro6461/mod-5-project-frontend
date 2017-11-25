import React, { Component } from 'react'
import { Card, Icon, Button, Popup } from 'semantic-ui-react'
import ReviewsContainer from '../review/ReviewsContainer'


export default class FacilityCard extends Component{

  state = {
    insurance: false,
    reviews: false,
    facilitySponsorReviews: ""
  }

  showInsurance = () => {
    this.setState({
      insurance: !this.state.insurance
    })
  }

  showReviews = () => {
    this.setState({
      reviews: !this.state.reviews
    })
  }

  componentDidMount = () => {
    fetch('http://localhost:3000/sponsor_reviews')
    .then(res => res.json())
    .then(json => this.filterSponsorReviews(json))
  }

  filterSponsorReviews = (data) => {

    let facilitySponsorReviews = data.filter((sponsorReview)=>{

      return sponsorReview.facility_id === this.props.facility.id
    })
    this.setState({
      facilitySponsorReviews: facilitySponsorReviews
    })
  }

  handleOnClick = () => {
    let facility = this.props.facility
    this.props.cardClick({facility: facility, zoom: 17})
  }

  render(){

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
        : <ReviewsContainer name="reviewsContainer" facility={this.props.facility} sponsorReviews={this.state.facilitySponsorReviews} showReviews={this.showReviews}/>
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
          trigger={<Button content='insurance' />}
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
