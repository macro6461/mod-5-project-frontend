import React, { Component } from 'react'
import { Card, Icon } from 'semantic-ui-react'


export default class FacilityCard extends Component{

  handleOnClick = () => {
    let facility = this.props.facility
    this.props.cardClick({facility: facility, zoom: 17})
  }

  render(){
    const phone = "tel:" + this.props.facility.phone
    const insurances = this.props.facility.insurance.split(", ")
    return(
      <div onClick={this.handleOnClick} style={{width: '20%', marginBottom: '20px'}}>
      <Card className="facilityCard">
        <h2>{this.props.facility.name}</h2>
        <h3>{this.props.facility.address}</h3>
        <h3>insurance: {insurances}</h3>
      {this.props.distance === NaN
        ? <h4>No Data</h4>
        : <h4>Distance: {this.props.distance}</h4>
      }
      <a className="moreInfo" href={this.props.facility.url}>More Info</a>
    <br/>
    <br/>
    {this.props.facility.phone === null
      ? null
      : <a href={phone}><Icon className="phone" size="big"/></a>
    }
      <br/>
      </Card>
  </div>
    )
  }
}
