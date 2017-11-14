import React from 'react'
import Facilities from './Facilities'
import GoogleMapReact from 'google-map-react';
import FacilityCard from './FacilityCard'
import { Icon } from 'semantic-ui-react'

const pinStyle={
  // backgroundColor: "white",
  borderRadius: '20px',
  boxShadow: '0px 5px 0px 0px #888888'
}

class FacilityPin extends React.Component {

  render(){
    return(
      <div>
        <Icon className="building icon" size='huge' style={pinStyle} onClick={this.props.onClick}/>
      </div>
    )
  }
}

export default FacilityPin
