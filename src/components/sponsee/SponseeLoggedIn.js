import React, { Component } from 'react'
import SponsorCard from '../sponsor/SponsorCard'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { fetchSponsorsRequest } from '../../actions/actions'
import { fetchSponsorsRequestResolved } from '../../actions/actions'

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

  render(){
    const sponsors = this.props.sponsors.map((sponsor, index) => {
      debugger
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
        <Link to="/"><button onClick={this.props.remove}>Sign Out</button></Link>
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

export default connect(mapStateToProps, {fetchSponsorsRequest, fetchSponsorsRequestResolved})(SponseeLoggedIn)
