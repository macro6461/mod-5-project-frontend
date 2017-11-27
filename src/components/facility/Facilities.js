import React, { Component } from 'react'
import FacilityCard from './FacilityCard'
import { connect } from 'react-redux';
import { fetchFacilitiesRequest, fetchFacilitiesRequestResolved, setFacilityMapPosition, removeFacilityMapPosition, setFacilityMapZoom, removeFacilityMapZoom } from '../../actions/facilityActions'
import GoogleMapReact from 'google-map-react';
import { Form } from 'semantic-ui-react'
import FacilitiesMap from './FacilitiesMap'
var ExecutionEnvironment = require('exenv');

class Facilities extends Component {

  state = {
    facilities: [],
    latitude: "",
    longitude: "",
    checked: true,
    value: "",
    hover: false,
    citySearch: "",
    insuranceSearch: ""
  }

  showPosition = (position) => {
    let geoPosition = {latitude: position.coords.latitude, longitude: position.coords.longitude}
    this.setGeoState(geoPosition)
  }

  componentDidMount = () =>{
    this.setState({
      facilities: this.props.fetchedFacilities
    })
    this.props.removeFacilityMapPosition()
    this.props.removeFacilityMapZoom()
    // this.testScroll()
    if (ExecutionEnvironment.canUseDOM) {
      document.documentElement.addEventListener('scroll', this.handleScroll);
    }
  }

  // testScroll = () => {
  //   if (this.refs.facilitiesRef === undefined) {
  //     return null
  //   } else{
  //     let scrollHeight = this.refs.facilitiesRef.scrollHeight
  //     let clientHeight = this.refs.facilitiesRef.clientHieght
  //     window.onscroll = function(){
  //       // console.log(window.)
  //     }
  //   }
  //
  //
  // }

  setGeoState = (data) => {
    this.setState({
      latitude: data.latitude,
      longitude: data.longitude
    })
  }

  getCurrentGeoLocation = () =>{
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.showPosition);
    } else {
        console.log("Geolocation is not supported by this browser.")
    }
  }

  handleChange = (event) => {
    console.log(event.target.value)
    this.setState({
      [event.target.name]: event.target.value
    }, () => this.filterByTerms())
  }

  filterByTerms = () => {
    const citySearch = this.state.citySearch
    const insuranceSearch = this.state.insuranceSearch
    let facilities = this.props.fetchedFacilities.filter((facility) => {
      return facility.address.split(", ")[1].toLowerCase() === citySearch.toLowerCase()
    })
    let insuranceFacilities;
    let facilitiesData = facilities.length > 0 ? facilities : this.props.fetchedFacilities
    insuranceFacilities = facilitiesData.filter((facility) => {
      return facility.insurance.includes(insuranceSearch.toLowerCase())
    })
    this.setState({
      facilities: insuranceFacilities.length > 0 ? insuranceFacilities : facilities
    })
  }

  haversineFunction = (data) => {

    var haversine = require('haversine')
    let start = {
      latitude: this.props.currentPosition.lat,
      longitude: this.props.currentPosition.lng
    }
    let end = {
      latitude: data.latitude,
      longitude: data.longitude
    }
    const haversineCoords = (haversine(start, end, {unit: 'mile'}))
    if (this.props.currentPosition.lat === "" || this.props.currentPosition.lng === ""){
      return "Calculating..."
    } else {
      if (data.longitude === null || data.latitude === null){
        return "No Data"
      } else {
        data.distance = haversineCoords
        return parseFloat(haversineCoords).toFixed(0) + " miles away"
      }
    }
  }

  sortFacilities = (data) => {
    let sortedFacilities = data.sort(function(a, b){
      if (a === null || b === null){
        null
      } else {
        return parseInt(a.distance.split(" ")[0]) - parseInt(b.distance.split(" ")[0])
      }
    })

    return (
      sortedFacilities.map((facility, index) => {
        if (facility === null){
          null
        } else {
          return <FacilityCard distance={facility.distance} cardClick={this.cardClick} hover={this.state.hover} currentLatitude={this.props.currentPosition.lat} currentLongitude={this.props.currentPosition.lng} key={index} facility={facility} facilities={this.props.facilities}/>
        }
      })
    )
  }

  cardClick = (data) => {

    this.props.setFacilityMapPosition({lat: data.facility.latitude, lng: data.facility.longitude})
    this.props.setFacilityMapZoom(data.zoom)
  }

  render(){

    const finalFacilities = this.state.facilities && this.state.facilities.length > 0 ? (this.state.facilities) : (this.props.fetchedFacilities)
    const notNullFacilities = finalFacilities.filter((facility) => {
      return facility.latitude !== null && facility.latitude !== null
    })
    const facilityData = notNullFacilities.map((facility) => {
        facility.distance = this.haversineFunction(facility)
        return facility
    })
    const newFacilities = this.sortFacilities(facilityData)
    return(
      <div>

      <div className="googleMap">
        <FacilitiesMap facilities={this.props.fetchedFacilities} current={this.props.currentPosition}>
       </FacilitiesMap>
       <br/>
     <a style={{float: 'right'}} href="#top">Back to top of page</a>
     </div>
     <br/>
     <br/>
     <br/>
     <br/>
     <br/>
     <br/>
     <br/>
     <br/>

   <Form className="sortFacilities">
      <Form.Field >
      <label>
        city:
        <input
        placeholder="New York"
        name="citySearch"
        style={{marginLeft: 10 + "px"}}
        type="text"
        onChange={this.handleChange}
        value={this.state.citySearch}
      />
      </label>
    </Form.Field>
    <Form.Field >
    <label>
      insurance:
      <input
      placeholder="Aetna"
      name="insuranceSearch"
      style={{marginLeft: 10 + "px"}}
      type="text"
      onChange={this.handleChange}
      value={this.state.insuranceSearch}
    />
    </label>
    </Form.Field>
  </Form>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>


      <div ref="facilitiesRef" onScroll={this.handleScroll} className="facilities">
        {newFacilities}
      </div>
      <br/>
      <br/>
      </div>
    )
  }
}

const mapStateToProps = (state) => {

  return {
    currentPosition: state.currentReducer.currentPosition,
    currentFacilityPosition: state.facilitiesReducer.currentFacilityPosition,
    currentFacilityZoom: state.facilitiesReducer.currentFacilityZoom,
    fetchedFacilities: state.facilitiesReducer.facilities
  }
}

export default connect(mapStateToProps, {fetchFacilitiesRequest, fetchFacilitiesRequestResolved, setFacilityMapPosition, removeFacilityMapPosition, setFacilityMapZoom, removeFacilityMapZoom})(Facilities)
