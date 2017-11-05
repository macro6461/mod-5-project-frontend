import React, { Component } from 'react'
import FacilityCard from './FacilityCard'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { fetchFacilitiesRequest } from '../actions/actions'
import { fetchFacilitiesRequestResolved } from '../actions/actions'
// import GoogleMapReact from 'google-map-react';

class Facilities extends Component {

  state = {
    facilities: [],
    latitude: "",
    longitude: "",
    selected: false
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
    this.props.fetchFacilitiesRequest()
    this.getCurrentGeoLocation()
  }

  render(){
    const facilities = this.props.facilities.map((facility, index) => {
      return <FacilityCard currentLatitude={this.state.latitude} currentLongitude={this.state.longitude} key={index} facility={facility} facilities={this.props.facilities}/>
    })
    console.log(this.props.facilities)
    return(
      <div>
        <br/>
      <br/>
      <br/>
    <br/>
  <div className="sort">
  Sort By:
<br/>
  City <select>
          <option value="city">Brooklyn</option>
      </select>
      <br/>
    Distance<select value="distance">
        <option value="distance">closest</option>
    </select>
    <br/>
  Rating<select>
      <option value="rating">rating</option>
        </select>
      </div>
        <br/>
        <br/>
        <br/>
        <br/>
      {facilities}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    facilities: state.facilitiesReducer.facilities
  }
}

export default connect(mapStateToProps, {fetchFacilitiesRequest, fetchFacilitiesRequestResolved})(Facilities)
