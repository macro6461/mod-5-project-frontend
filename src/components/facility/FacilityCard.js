import React, { Component } from 'react'
import { Card } from 'semantic-ui-react'
export default class FacilityCard extends Component{

  render(){
    const insurances = this.props.facility.insurance.split(", ")
    return(
      <Card className="facilityCard">
        <h2>{this.props.facility.name}</h2>
      <h3>{this.props.facility.address}</h3>
    <h3>providers: {insurances}</h3>
      {this.props.distance === NaN
        ? <h4>No Data</h4>
        : <h4>Distance: {this.props.distance}</h4>
      }
      <a className="moreInfo" href={this.props.facility.url}>More Info</a>
      <br/>
  </Card>
    )
  }
}
