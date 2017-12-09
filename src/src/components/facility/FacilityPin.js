import React from 'react'
import Facilities from './Facilities'
import GoogleMapReact from 'google-map-react';
import FacilityCard from './FacilityCard'
import { Icon } from 'semantic-ui-react'

const pinStyle={
  // backgroundColor: "white",

  borderRadius: '10px',
  transform: 'matrix(-1, 0, 0, 1, 10, 0)'
  // boxShadow: '1px 1px 1px #888888'
}

class FacilityPin extends React.Component {


  render(){

    return(
      <div>
        <Icon className="building icon" size='big' style={pinStyle} onClick={this.props.onClick}/>
      </div>
    )
  }
}

export default FacilityPin
