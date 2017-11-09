import React from 'react'
import Facilities from './Facilities'
import GoogleMapReact from 'google-map-react';
import FacilityCard from './FacilityCard'
// import { Marker } from "google-map-react"

const pinStyle={
  backgroundColor: "white",
  borderRadius: '10px',
  boxShadow: '2px 2px 1px #888888'
}

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
      <div onClick={()=>{this.props.onClick}}>
        <i class="building icon" style={pinStyle} onClick={this.props.onClick}></i>
      </div>
    )
  }
}

export default FacilityPin
