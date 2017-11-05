import React, { Component } from 'react'
// import haversineDistance from '../haversine'
export default class FacilityCard extends Component{

  haversineFunction = () => {
    var haversine = require('haversine')
    let start = {
      latitude: this.props.currentLatitude,
      longitude: this.props.currentLongitude
    }
    let end = {
      latitude: this.props.facility.latitude,
      longitude: this.props.facility.longitude
    }
    const haversineCoords = (haversine(start, end, {unit: 'mile'}))
    if (this.props.currentLatitude === "" || this.props.currentLongitude === ""){
      return "Calculating..."
    } else {
      if (this.props.facility.longitude === null || this.props.facility.latitude === null){
        return "No Data"
      } else {
        return parseFloat(haversineCoords).toFixed(0) + " miles away"
      }
    }
  }

  render(){
    const distance = this.haversineFunction()
    return(
      <div className="facilityCard">
        <h2>{this.props.facility.name}</h2>
      <h3>{this.props.facility.address}</h3>
      {distance === NaN
        ? <h4>No Data</h4>
        : <h4>Distance: {distance}</h4>
      }
      <br/>
      <a className="moreInfo" href={this.props.facility.url}>More Info</a>
      </div>
    )
  }
}
