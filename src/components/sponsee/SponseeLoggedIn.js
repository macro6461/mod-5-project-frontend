import React, { Component } from 'react'
import SponsorCard from '../sponsor/SponsorCard'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { fetchSponsorsRequest } from '../../actions/sponsorActions'
import { fetchSponsorsRequestResolved } from '../../actions/sponsorActions'
import { removeSponseeLogin } from '../../actions/sponseeActions'
import { Button } from 'semantic-ui-react'

class SponseeLoggedIn extends Component {

  state = {
    latitude: "",
    longitude: "",
  }

  showPosition = (position) => {
    let geoPosition = {latitude: position.coords.latitude, longitude: position.coords.longitude}
    this.setGeoState(geoPosition)
  }

  setGeoState = (data) => {
    this.setState({
      latitude: data.latitude,
      longitude: data.longitude
    })
  }

  getCurrentGeoLocation = () =>{
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.showPosition);
    } else {
        console.log("Geolocation is not supported by this browser.")
    }
  }

  componentDidMount = () => {
    this.props.fetchSponsorsRequest()
    this.getCurrentGeoLocation()
  }

  removeLogin = () => {
    this.props.removeSponseeLogin()
  }

  render(){
    const sponsors = this.props.sponsors.map((sponsor, index) => {

      return(
        <SponsorCard key={index} sponsor={sponsor} currentLatitude={this.state.latitude} currentLongitude={this.state.longitude}/>
      )
    })
    return(
      <div>
          <br/>
        <br/>
      <br/>
        <h3> Welcome Sponsee {localStorage.username}!</h3>
        <p>You are now logged in.</p>
      <Link to="/"><Button onClick={this.removeLogin}>Sign Out</Button></Link>
        <br/>
      <div className="sponseeDiv">
        {sponsors}
      </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    sponsors: state.sponsorsReducer.sponsors
  }
}

export default connect(mapStateToProps, {fetchSponsorsRequest, fetchSponsorsRequestResolved, removeSponseeLogin})(SponseeLoggedIn)
