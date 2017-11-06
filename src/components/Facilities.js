import React, { Component } from 'react'
import FacilityCard from './FacilityCard'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { fetchFacilitiesRequest } from '../actions/facilityActions'
import { fetchFacilitiesRequestResolved } from '../actions/facilityActions'
import GoogleMapReact from 'google-map-react';
import FacilitiesMap from './FacilitiesMap'

class Facilities extends Component {

  state = {
    facilities: [],
    latitude: "",
    longitude: "",
    checkedValue: "",
    value: ""
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

  handleChange = (event) => {
    this.setState({
      value: event.target.value
    })
  }

  handleOnChecked = (event) => {
    this.setState({
      checkedValue: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const value = this.state.value
    const sortedFacilities = this.props.fetchedFacilities.sort(function(a, b){
      return a.distance - b.distance
    })
    this.filterSorted(sortedFacilities)
  }

  filterSorted = (data) => {
    debugger
    const newFacilities = data.filter((facility) =>{
      return facility.distance !== null
    }, this.setState({
      facilities: newFacilities
    }) )
  }

  sortFacilities = () => {
    const sortedFacilities = this.props.facilities.sort(function(a, b){
      debugger
      if (a.distance !== null || b.distance !== null){
          return a.distance - b.distance
      }
    })
    this.setState({
      facilities: sortedFacilities
    })
  }

  componentDidMount = () => {
    debugger
    this.props.fetchFacilitiesRequest()
    this.setState({
      facilities: this.props.fetchedFacilities
    })
    this.getCurrentGeoLocation()
  }

  render(){
    const facilities = this.props.fetchedFacilities.map((facility, index) => {
      if (facility.latitude === null || facility.longitude === null){
        return null
      } else{
        return <FacilityCard currentLatitude={this.state.latitude} currentLongitude={this.state.longitude} key={index} facility={facility} facilities={this.props.facilities}/>
      }
    })
    return(
      <div>
        <GoogleMapReact
         defaultCenter={this.props.center}
         defaultZoom={this.props.zoom}
       ></GoogleMapReact>
        <br/>
        <br/>
        <br/>
        <br/>
        <div className="sort">
        <br/>
        <form className="sortForm" onSubmit={this.handleSubmit}>
          <div className="radio">
            <label>
              <input type="radio" value="yes" onChange={this.handleOnChecked} checked={this.state.checkedValue === "yes"}/>
            nearest to you
              </label>
              <br/>
            <input type="submit" value="Submit" />
          </div>
      </form>
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
  debugger
  return {
    fetchedFacilities: state.facilitiesReducer.facilities
  }
}

export default connect(mapStateToProps, {fetchFacilitiesRequest, fetchFacilitiesRequestResolved})(Facilities)
