import React, { Component } from 'react'
import FacilityCard from './FacilityCard'
import { connect } from 'react-redux';
import { fetchFacilitiesRequest } from '../../actions/facilityActions'
import { fetchFacilitiesRequestResolved } from '../../actions/facilityActions'
import GoogleMapReact from 'google-map-react';
import { Radio } from 'semantic-ui-react'
import FacilitiesMap from './FacilitiesMap'

class Facilities extends Component {

  state = {
    facilities: [],
    latitude: "",
    longitude: "",
    checked: true,
    value: "",
    hover: false,
    citySearch: ""
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
    console.log(event.target.value)
    debugger
    this.setState({
      [event.target.name]: event.target.value
    }, () => this.filterByTerms())
  }

  filterByTerms = () => {
    const search = this.state.citySearch
    let facilities = this.props.fetchedFacilities.filter((facility) => {
      return facility.address.split(", ")[1].toLowerCase() === search.toLowerCase()
    })
    let distanceFacilities;
    let facilitiesData = facilities.length > 0 ? facilities : this.props.fetchedFacilities
    distanceFacilities = facilitiesData.sort(function(a, b){
      return a.distance - b.distance
    })
    this.setState({
      facilities: distanceFacilities.length > 0 ? distanceFacilities : facilities
    })
  }

  handleSubmit = (event) => {
    let facilities
    event.preventDefault()
    if (this.state.facilities.length > 0){
      facilities = this.state.facilities
    } else {
      facilities = this.props.facilities
    }
    const sortedFacilities = facilities.sort(function(a, b){
      return a.distance - b.distance
    })
    this.filterSorted(sortedFacilities)
  }

  render(){
    debugger
    const finalFacilities = this.state.facilities && this.state.facilities.length > 0 ? (this.state.facilities) : (this.props.fetchedFacilities)
    const facilityData = finalFacilities.map((facility, index) => {
      if (facility.latitude === null || facility.longitude === null){
        return null
      } else{
        return <FacilityCard hover={this.state.hover} currentLatitude={this.props.currentPosition.lat} currentLongitude={this.props.currentPosition.lng} key={index} facility={facility} facilities={this.props.facilities}/>
      }
    })

    const facilityCoord = this.props.fetchedFacilities
    return(
      <div>
      <div className="googleMap">
        <FacilitiesMap facilities={this.props.fetchedFacilities} current={this.props.currentPosition}>
       </FacilitiesMap>
     </div>
        <br/>
        <br/>
        <br/>
        <br/>
        <div className="sort">
        <br/>
        <form className="sortForm">
          <div className="radio">
            {this.props.currentPosition.lat === "" || this.props.currentPosition.lng === ""
              ? null
              : <label>
               <Radio toggle style={{display: 'none'}} label='closest' className="radioButton" type="radio" onChange={this.handleChange} value={this.state.checkedValue}/>
              </label>
            }
              <br/>
          </div>
      </form>
      <label>
        city:
        <input
        name="citySearch"
        style={{marginLeft: 10 + "px"}}
        type="text"
        onChange={this.handleChange}
        value={this.state.citySearch}
      />
      </label>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
      </div>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>


      <div className="facilities">
        {facilityData}
      </div>
      <br/>
      <br/>
      </div>
    )
  }
}

const mapStateToProps = (state) => {

  return {
    currentPosition: state.currentReducer.currentPosition,
    fetchedFacilities: state.facilitiesReducer.facilities
  }
}

export default connect(mapStateToProps, {fetchFacilitiesRequest, fetchFacilitiesRequestResolved})(Facilities)
