import React, { Component } from 'react'
import { Card, Icon, Button, Popup } from 'semantic-ui-react'


export default class FacilityCard extends Component{

  state = {
    insurance: false
  }

  showInsurance = () => {
    this.setState({
      insurance: !this.state.insurance
    })
  }

  handleOnClick = () => {
    let facility = this.props.facility
    this.props.cardClick({facility: facility, zoom: 17})
  }

  render(){

    const phone = "tel:" + this.props.facility.phone
    const insurance = this.props.facility.insurance.split(" ")
    let insurances
    if (insurance.length > 1 ){
      debugger
      console.log(insurance)
      insurances = insurance.join(" ")
    } else {
      debugger
      console.log(insurance)
      insurances = insurance[0]
    }

    return(
      <div onClick={this.handleOnClick} style={{width: '20%', marginBottom: '20px'}}>
      <Card className="facilityCard">
        <h2>{this.props.facility.name}</h2>
        <h3>{this.props.facility.address}</h3>
      {this.props.distance === NaN
        ? <h4>No Data</h4>
        : <h4>Distance: {this.props.distance}</h4>
      }
      <a className="moreInfo" href={this.props.facility.url} target="_blank">More Info</a>
    <br/>
    <br/>
    {this.props.facility.phone === null
      ? null
      : <a href={phone}><Icon className="phone" size="big"/></a>
    }
      <br/>
      <div><Popup
              style={{fontSize: '1.2vw', zIndex: '1'}}
              on='click'
              trigger={<Button content='insurance' />}
              content={insurances}
              position='right center'
            /></div>
      </Card>
  </div>
    )
  }
}
