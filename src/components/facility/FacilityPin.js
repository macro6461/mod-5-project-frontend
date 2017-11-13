import React from 'react'
import Facilities from './Facilities'
import GoogleMapReact from 'google-map-react';
import FacilityCard from './FacilityCard'

const pinStyle={
  backgroundColor: "white",
  borderRadius: '10px',
  boxShadow: '2px 2px 1px #888888'
}

class FacilityPin extends React.Component {

  render(){
    return(
      <div onClick={()=>{this.props.onClick}}>
        <i class="building icon" style={pinStyle} onClick={this.props.onClick}></i>
      </div>
    )
  }
}

export default FacilityPin
