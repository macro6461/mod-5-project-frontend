import React from 'react'
import Facilities from './Facilities'
import GoogleMapReact from 'google-map-react';
import FacilityCard from './FacilityCard'
import FacilityPin from './FacilityPin'
import { Icon, Popup, Button } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { removeFacilityMapZoom, removeFacilityMapPosition } from '../../actions/facilityActions'


const boxStyle = {
  zIndex: '100',
  border: 'solid 1px black',
  backgroundColor: 'white',
  padding: '10px',
  width: '150px',
  borderRadius: '10px'
}


const iconStyle = {
  borderRadius: '100px',
  boxShadow: '3px 3px 1px #888888'
}



const InfoBox = (props) => {
  console.log(props)
  return (<Popup trigger={<Icon className="building icon" size='big' style={{transform: 'matrix(-1, 0, 0, 1, 10, 0)'}}/>} content={props.facility} position='top center' style={{backgroundColor: 'AliceBlue', border: 'solid 1px light', textAlign: 'center'}}/>)

}

const CurrentPin = ({text}) => {
  return(
    <div>
      <Icon name="user circle outline" color='blue' size='big' style={iconStyle}/>
      {text}
  </div>
  )
}

class FacilitiesMap extends React.Component {

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

  componentWillMount = () =>{
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
    console.log("hovered")
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
    console.log("leaving")
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

  removeCenterAndZoom = () => {
    this.props.removeFacilityMapZoom()
    this.props.removeFacilityMapPosition()
  }

  render() {

    const setCenter = this.props.currentFacilityPosition === "" || this.props.currentFacilityPosition === undefined ? (this.state.center) : (this.props.currentFacilityPosition)

    const setZoom = this.props.currentFacilityZoom === "" || this.props.currentFacilityZoom === undefined ? (this.props.zoom) : (this.props.currentFacilityZoom)

    const infoBox = this.state.hover === true ? <InfoBox onClick={()=>this.setPinAsCenter({lat: this.state.lat, lng: this.state.lng})} lat={this.state.lat} lng={this.state.lng} facility={this.state.facilityName}/> : null

    const facilityPins = this.props.facilities.map((facility, index) => {
      if (facility.latitude === null || facility.longitude === null){
        return null
      } else{
        return <FacilityPin style={{width: '50px', height: '50px'}} key={index} onChildMouseEnter={this.onChildMouseEnter} onChildMouseLeave={this.onChildMouseLeave} handlePinClick={this.handleOnClick} facility={facility} hover={this.state.hover} lat={facility.latitude} lng={facility.longitude}/>
      }
    })
    return (
       <GoogleMapReact
         bootstrapURLKeys={{
           key:'AIzaSyBg7ZOFcWttJvTq1H_tnV8q13lPjQUiW1c',
           language: 'en',
         }}
        defaultCenter={this.props.center}
        center={setCenter}
        defaultZoom={this.props.zoom}
        zoom={setZoom}
        onChildMouseEnter={this.onChildMouseEnter}
        onChildMouseLeave={this.onChildMouseLeave}
        >
          {facilityPins}
          <CurrentPin
              lat={this.props.current.lat}
              lng={this.props.current.lng}
              text={'You'}
              />
            {infoBox}
            {this.props.currentFacilityPosition === "" && this.props.currentFacilityZoom === ""
              ? null
              : <Button onClick={this.removeCenterAndZoom} style={{float: 'left', backgroundColor: 'AliceBlue', margin: '5px', border: 'solid 1px black', fontSize: '100%', boxShadow: '3px 3px 1px #888888'}}><Icon className="compass" size="large" />re-center</Button>

            }
      </GoogleMapReact>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentFacilityPosition: state.facilitiesReducer.currentFacilityPosition,
    currentFacilityZoom: state.facilitiesReducer.currentFacilityZoom
  }
}

export default connect(mapStateToProps, { removeFacilityMapZoom, removeFacilityMapPosition })(FacilitiesMap)
