import React, { Component } from 'react'
import { Card } from 'semantic-ui-react'

export default class SponsorCard extends Component{

  haversineFunction = () => {
    var haversine = require('haversine')
    let start = {
      latitude: this.props.currentLatitude,
      longitude: this.props.currentLongitude
    }
    let end = {
      latitude: this.props.sponsor.latitude,
      longitude: this.props.sponsor.longitude
    }
    const haversineCoords = (haversine(start, end, {unit: 'mile'}))
    if (this.props.currentLatitude === "" || this.props.currentLongitude === ""){
      return "Calculating..."
    } else {
      if (this.props.sponsor.longitude === null || this.props.sponsor.latitude === null){
        return "No Data"
      } else {
        this.props.sponsor.distance = haversineCoords
        // this.props.sponsors.push(this.props.sponsor)
        return parseFloat(haversineCoords).toFixed(0) + " miles away"
      }
    }
  }

  render(){
    const email = "mailto:" + this.props.sponsor.email
    const distance = this.haversineFunction()

    return(
      <Card className="sponseeCard">
        <h2>{this.props.sponsor.username}, {this.props.sponsor.age}, {this.props.sponsor.gender}</h2>
      <p className="sponsorP">{this.props.sponsor.bio}</p>
      {distance === NaN
        ? <h4>No Data</h4>
        : <h4>Distance: {distance}</h4>
      }
    <a className="mailto" href={email}>email {this.props.sponsor.username}</a>
  </Card>
    )
  }
}
