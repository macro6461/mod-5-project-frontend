import React from 'react'
import Facilities from './Facilities'
import GoogleMapReact from 'google-map-react';
import FacilityCard from './FacilityCard'
// import FacilityPinImage from '../../src/map-pin.png'
import FacilityPin from './FacilityPin'



const boxStyle = {
  zIndex: '100',
  border: 'solid 1px black',
  backgroundColor: 'white',
  padding: '10px',
  width: '150px',
  borderRadius: '10px'
}



const InfoBox = (props) => {
  console.log(props)
  return(<div style={boxStyle}><p className="infoBoxP">{props.facility}</p></div>)
}

const CurrentPin = ({text}) => {
  return(
    <div className="currentPin">
      <img className="pinImage"/>
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
    zoom: 11
  };

  componentDidMount = () =>{
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

  render() {
    const facilityPins = this.props.facilities.map((facility, index) => {
      if (facility.latitude === null || facility.longitude === null){
        return null
      } else{
        return <FacilityPin key={index} onChildMouseEnter={this.onChildMouseEnter} onChildMouseLeave={this.onChildMouseLeave} handlePinClick={this.handleOnClick} facility={facility} hover={this.state.hover} lat={facility.latitude} lng={facility.longitude}/>
      }
    })
    return (
       <GoogleMapReact
         bootstrapURLKeys={{
           key:'AIzaSyBg7ZOFcWttJvTq1H_tnV8q13lPjQUiW1c',
           language: 'en',
         }}
        defaultCenter={this.props.center}
        defaultZoom={this.props.zoom}
        currentPosition={this.state.center}
        onChildMouseEnter={this.onChildMouseEnter}
        onChildMouseLeave={this.onChildMouseLeave}
        >
          {facilityPins}
          {this.state.currentPosition === true
            ?  <CurrentPin
              lat={this.state.center.lat}
              lng={this.state.center.lng}
              text={'You are here'}
              />
            : null
          }
          {this.state.hover === true
            ? <InfoBox lat={this.state.lat} lng={this.state.lng} facility={this.state.facilityName}/>
            : null
          }
      </GoogleMapReact>
    );
  }
}
