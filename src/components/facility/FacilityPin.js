import React from 'react'
import Facilities from './Facilities'
import GoogleMapReact from 'google-map-react';
import FacilityCard from './FacilityCard'
// import { Marker } from "google-map-react"


class FacilityPin extends React.Component {

  state = {
    hover: false
  }


  handleOnHover = (event) => {
    debugger
    this.setState({
      hover: !this.state.hover
    })
    this.props.hover = false
  }

  render(){
    return(
      <div className="facilityPin" >
        
      </div>
    )
  }
}

export default FacilityPin
