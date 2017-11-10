import React from 'react'
import Facilities from './Facilities'
import GoogleMapReact from 'google-map-react';
import FacilityCard from './FacilityCard'
import FacilityPin from './FacilityPin'
import { Icon } from 'semantic-ui-react'



const boxStyle = {
  zIndex: '100',
  border: 'solid 1px black',
  backgroundColor: 'white',
  padding: '10px',
  width: '150px',
  borderRadius: '10px'
}


const iconStyle = {
  borderRadius: '10px',
  boxShadow: '3px 3px 1px #888888'
}



const InfoBox = (props) => {
  return(<div onClick={this.setPinAsCenter}><p style={boxStyle} className="infoBoxP">{props.facility}</p></div>)
}

const CurrentPin = ({text}) => {
  return(
    <div>
      <Icon name="user circle outline" color='blue' size='big' style={iconStyle}/>
      {text}
  </div>
  )
}

export default class FacilitiesMap extends React.Component {


  state = {
    facilityName: "",
    lat: "",
    lng: "",
    center: "",
    zoom: this.props.zoom,
    hover: false,
    currentPosition: false
  }

  handleOnClick = () => {
    this.setState({
      clicked: !this.state.clicked
    })
  }


  static defaultProps = {
    center: {lat: 40.73, lng: -73.93},
    zoom: 14
  };

  componentDidMount = () => {
    navigator.geolocation.getCurrentPosition(this.currentCoords)
  }

  currentCoords = (position) => {
    const latitude = position.coords.latitude
    const longitude = position.coords.longitude
    this.setState({
      center: {lat: latitude, lng: longitude},
      currentPosition: true
    })
  }


  onChildMouseEnter = (num, childProps) => {
    if (childProps.facility === undefined){
      return null
    } else {
      this.setState({
        facilityName: childProps.facility.name,
        lat: childProps.lat,
        lng: childProps.lng,
        hover: true
      })
    }
  }

  onChildMouseLeave = (num, childProps) => {
    if (childProps.facility === undefined){
      return null
    } else {
      this.setState({
        lat: "",
        lng: "",
        hover: false
      })
    }
  }

  setPinAsCenter = () => {
    console.log("clicked")
  }

  render() {
    const facilityPins = this.props.facilities.map((facility, index) => {
      if (facility.latitude === null || facility.longitude === null){
        return null
      } else{
        return <FacilityPin onClick={()=>this.setPinAsCenter(facility)} key={index} onChildMouseEnter={this.onChildMouseEnter} onChildMouseLeave={this.onChildMouseLeave} handlePinClick={this.handleOnClick} facility={facility} hover={this.state.hover} lat={facility.latitude} lng={facility.longitude}/>
      }
    })
    return (
       <GoogleMapReact
         bootstrapURLKeys={{
           key:'AIzaSyBg7ZOFcWttJvTq1H_tnV8q13lPjQUiW1c',
           language: 'en',
         }}
        defaultCenter={this.props.center}
        center={this.state.center}
        defaultZoom={this.props.zoom}
        onChildMouseEnter={this.onChildMouseEnter}
        onChildMouseLeave={this.onChildMouseLeave}
        >
          {facilityPins}
          <CurrentPin
              lat={this.props.current.lat}
              lng={this.props.current.lng}
              text={'You'}
              />
          {this.state.hover === true
            ? <InfoBox onClick={()=>this.setPinAsCenter({lat: this.state.lat, lng: this.state.lng})} lat={this.state.lat} lng={this.state.lng} facility={this.state.facilityName}/>
            : null
          }
      </GoogleMapReact>
    );
  }
}
