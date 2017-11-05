import React, { Component } from 'react'
import FacilityCard from './FacilityCard'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { fetchFacilitiesRequest } from '../actions/actions'
import { fetchFacilitiesRequestResolved } from '../actions/actions'

class Facilities extends Component {

  state = {
    facilities: [],
    latitude: "",
    longitude: ""
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

  sortByDistance = (data) => {
    console.log(data)
  }

  render(){
    const facilities = this.props.facilities.map((facility, index) => {
      return <FacilityCard sort={this.sortByDistance} currentLatitude={this.state.latitude} currentLongitude={this.state.longitude} key={index} facility={facility}/>
    })
    debugger
    return(
      <div>
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
