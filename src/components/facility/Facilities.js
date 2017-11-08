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
    checked: false,
    value: "",
    hover: false
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
    debugger
    this.setState({
      checkedValue: !this.state.checked
    })
    const sortedFacilities = this.props.fetchedFacilities.sort(function(a, b){
      return a.distance - b.distance
    })
    this.filterSorted(sortedFacilities)
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
        console.log(facility)
        return <FacilityCard hover={this.state.hover} currentLatitude={this.state.latitude} currentLongitude={this.state.longitude} key={index} facility={facility} facilities={this.props.facilities}/>
      }
    })

    const facilityCoord = this.props.fetchedFacilities
    return(
      <div>
      <div className="googleMap">
        <FacilitiesMap facilities={this.props.fetchedFacilities} currentLocation={this.getCurrentGeoLocation}>
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
            {this.state.latitude === "" || this.state.longitude === ""
              ? null
              : <label>
               <Radio toggle label='closest' className="radioButton" type="radio" onChange={this.handleOnChecked}/>
              </label>
            }
              <br/>
          </div>
      </form>
      </div>
        <br/>
        <br/>
        <br/>

      <div className="facilities">
        {facilities}
      </div>
      <br/>
      <br/>
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
