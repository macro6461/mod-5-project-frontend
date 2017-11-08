import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import SponseeCard from '../sponsee/SponseeCard'
import { connect } from 'react-redux';
import { fetchSponseesRequest } from '../../actions/sponseeActions'
import { fetchSponseesRequestResolved } from '../../actions/sponseeActions'
import { removeSponsorLogin } from '../../actions/sponsorActions'
import { Button, Form, Radio } from 'semantic-ui-react'



class SponsorLoggedIn extends Component {

  state = {
    latitude: "",
    longitude: "",
  }

  componentDidMount = () => {
    this.props.fetchSponseesRequest()
    this.getCurrentGeoLocation()
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

  removeLogin = () => {
    this.props.removeSponsorLogin()
  }

  render(){

    const sponsees = this.props.sponsees.map((sponsee, index) => {
      return(
        <SponseeCard key={index} sponsee={sponsee} currentLatitude={this.state.latitude} currentLongitude={this.state.longitude}/>
      )
    })
    return(
      <div>
        <br/>
        <br/>
        <h3> Welcome Sponsor {localStorage.username}!</h3>
        <p>You are now logged in.</p>
      <Link to="/"><Button onClick={this.removeLogin}>Sign Out</Button></Link>
        <br/>
      <form className="sortSponsees">
          <div className="radio">
            <label>
             <Radio toggle label='age' className="radioButton" type="radio"/>
            </label>
          </div>
      </form>
      <form className="sortSponsees">
            <label>
             <Radio toggle label='gender' className="radioButton" type="radio"/>
            </label>
      </form>
      <div className="sponseeDiv">
        {sponsees}
      </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {

  return {
    sponsees: state.sponseesReducer.sponsees,
    currentSponsor: state.sponsorsReducer.currentSponsor
  }
}

export default connect(mapStateToProps, {removeSponsorLogin, fetchSponseesRequest, fetchSponseesRequestResolved})(SponsorLoggedIn)
