import React, { Component } from 'react'

import FacilityCard from './FacilityCard'
import { connect } from 'react-redux';
import { fetchFacilitiesRequest, fetchFacilitiesRequestResolved, setFacilityMapPosition, removeFacilityMapPosition, setFacilityMapZoom, removeFacilityMapZoom } from '../../actions/facilityActions'
import GoogleMapReact from 'google-map-react';
import { Form, Dropdown } from 'semantic-ui-react'
import FacilitiesMap from './FacilitiesMap'

const insuranceOptions = [
  {key: 'All', value: 'All', text: 'All'},
  {key: 'adva-net', value: 'adva-net', text: 'adva-net'},
  {key: 'aetna', value: 'aetna', text: 'aetna'},
  {key: "america's ppo", value: "america's ppo", text: "america's ppo"},
  {key: 'assurant', value: 'assurant', text: 'assurant'},
  {key: 'amerihealth', value: 'amerihealth', text: 'amerihealth'},
  {key: 'anthem blue cross', value: 'anthem blue cross', text: 'anthem blue cross'},
  {key: 'avera', value: 'avera', text: 'avera'},
  {key: 'beacon health value options', value: 'beacon health value options', text: 'beacon health value options'},
  {key: 'blue cross', value: 'blue cross', text: 'blue cross'},
  {key: 'blue cross blue shield', value: 'blue cross blue shield', text: 'blue cross blue shield'},
  {key: 'blue shield', value: 'blue shield', text: 'blue shield'},
  {key: 'cigna', value: 'cigna', text: 'cigna'},
  {key: 'compsych', value: 'compsych', text: 'compsych'},
  {key: 'emblemhealth', value: 'emblemhealth', text: 'emblemhealth'},
  {key: 'first choice health', value: 'first choice health', text: 'first choice health'},
  {key: 'ghi-bmp', value: 'ghi-bmp', text: 'ghi-bmp'},
  {key: 'healthnet mhn', value: 'healthnet mhn', text: 'healthnet mhn'},
  {key: 'magellan health', value: 'magellan health', text: 'magellan health'},
  {key: 'managed care', value: 'managed care', text: 'managed care'},
  {key: 'medicaid', value: 'medicaid', text: 'medicaid'},
  {key: 'optum', value: 'optum', text: 'optum'},
  {key: 'pacificsource', value: 'pacificsource', text: 'pacificsource'},
  {key: 'pomco', value: 'pomco', text: 'pomco'},
  {key: 'security health plan', value: 'security health plan', text: 'security health plan'},
  {key: 'united healthcare', value: 'united healthcare', text: 'united healthcare'},
  {key: 'ubh', value: 'ubh', text: 'ubh'},
  {key: 'unity health insurance', value: 'unity health insurance', text: 'unity health insurance'},
]

const cityOptions = [
  {key: 'All', value: 'All', text: 'All'},
  {key: 'Albany', value: 'Albany', text: 'Albany'},
  {key: 'Altamont', value: 'Altamont', text: 'Altamont'},
  {key: 'Amityville', value: 'Amityville', text: 'Amityville'},
  {key: 'Amsterdam', value: 'Amsterdam', text: 'Amsterdam'},
  {key: 'Auburn', value: 'Auburn', text: 'Auburn'},
  {key: 'Batavia', value: 'Batavia', text: 'Batavia'},
  {key: 'Beacon', value: 'Beacon', text: 'Beacon'},
  {key: 'Binghamton', value: 'Binghampton', text: 'Binghamton'},
  {key: 'Brentwood', value: 'Brentwood', text: 'Brentwood'},
  {key: 'Brooklyn', value: 'Brooklyn', text: 'Brooklyn'},
  {key: 'Buffalo', value: 'Buffalo', text: 'Buffalo'},
  {key: 'Canandaigua', value: 'Canandaigua', text: 'Canandaigua'},
  {key: 'Cohoes', value: 'Cohoes', text: 'Cohoes'},
  {key: 'Corning', value: 'Corning', text: 'Corning'},
  {key: 'Cortland', value: 'Cortland', text: 'Cortland'},
  {key: 'Dunkirk', value: 'Dunkirk', text: 'Dunkirk'},
  {key: 'Elmira', value: 'Elmira', text: 'Elmira'},
  {key: 'Fulton', value: 'Fulton', text: 'Fulton'},
  {key: 'Geneva', value: 'Geneva', text: 'Geneva'},
  {key: 'Glen Cove', value: 'Glen Cove', text: 'Glen Cove'},
  {key: 'Glens Falls', value: 'Glens Falls', text: 'Glens Falls'},
  {key: 'Gloversville', value: 'Gloversville', text: 'Gloversville'},
  {key: 'Hornell', value: 'Hornell', text: 'Hornell'},
  {key: 'Hudson', value: 'Hudson', text: 'Hudson'},
  {key: 'Ithaca', value: 'Ithaca', text: 'Ithaca'},
  {key: 'Jamestown', value: 'Jamestown', text: 'Jamestown'},
  {key: 'Johnstown', value: 'Johnstown', text: 'Johnstown'},
  {key: 'Kingston', value: 'Kingston', text: 'Kingston'},
  {key: 'Lackawanna', value: 'Lackawanna', text: 'Lackawanna'},
  {key: 'Little Falls', value: 'Little Falls', text: 'Little Falls'},
  {key: 'Lockport', value: 'Lockport', text: 'Lockport'},
  {key: 'Long Beach', value: 'Long Beach', text: 'Long Beach'},
  {key: 'Mechanicville', value: 'Mechanicville', text: 'Mechanicville'},
  {key: 'Middletown', value: 'Middletown', text: 'Middletown'},
  {key: 'Mount Vernon', value: 'Mount Vernon', text: 'Mount Vernon'},
  {key: 'New Rochelle', value: 'New Rochelle', text: 'New Rochelle'},
  {key: 'New York', value: 'New York', text: 'New York'},
  {key: 'Newburgh', value: 'Newburgh', text: 'Newburgh'},
  {key: 'Niagara Falls', value: 'Niagara Falls', text: 'Niagara Falls'},
  {key: 'North Tonawanda', value: 'North Tonawanda', text: 'North Tonawanda'},
  {key: 'Norwich', value: 'Norwich', text: 'Norwich'},
  {key: 'Ogdensburg', value: 'Ogdensburg', text: 'Ogdensburg'},
  {key: 'Olean', value: 'Olean', text: 'Olean'},
  {key: 'Oneida', value: 'Oneida', text: 'Oneida'},
  {key: 'Oneonta', value: 'Oneonta', text: 'Oneonta'},
  {key: 'Oswego', value: 'Oswego', text: 'Oswego'},
  {key: 'Peekskill', value: 'Peekskill', text: 'Peekskill'},
  {key: 'Plattsburgh', value: 'Plattsburgh', text: 'Plattsburgh'},
  {key: 'Port Jervis', value: 'Port Jervis', text: 'Port Jervis'},
  {key: 'Poughkeepsie', value: 'Poughkeepsie', text: 'Poughkeepsie'},
  {key: 'Rensselaer', value: 'Rensselaer', text: 'Rensselaer'},
  {key: 'Rochester', value: 'Rochester', text: 'Rochester'},
  {key: 'Rome', value: 'Rome', text: 'Rome'},
  {key: 'Rye', value: 'Rye', text: 'Rye'},
  {key: 'Salamanca', value: 'Salamanca', text: 'Salamanca'},
  {key: 'Saratoga Springs', value: 'Saratoga Springs', text: 'Saratoga Springs'},
  {key: 'Schenectady', value: 'Schenectady', text: 'Schenectady'},
  {key: 'Sherrill', value: 'Sherrill', text: 'Sherrill'},
  {key: 'Syracuse', value: 'Syracuse', text: 'Syracuse'},
  {key: 'Tonawanda', value: 'Tonawanda', text: 'Tonawanda'},
  {key: 'Troy', value: 'Troy', text: 'Troy'},
  {key: 'Utica', value: 'Utica', text: 'Utica'},
  {key: 'Watertown', value: 'Watertown', text: 'Watertown'},
  {key: 'Watervliet', value: 'Watervliet', text: 'Watervliet'},
  {key: 'White Plains', value: 'White Plains', text: 'White Plains'},
  {key: 'Yonkers', value: 'Yonkers', text: 'Yonkers'}
]


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
  }


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

  handleCityDropChange = (event) => {
    debugger
    console.log(event.target.value)
    this.setState({
      citySearch: event.target.innerText
    }, () => this.filterByTerms())
  }

  handleInsuranceDropChange = (event) => {
    debugger
    console.log(event.target.innerText)
    if (event.target.innerText === ""){
      null
    } else {
      this.setState({
        insuranceSearch: event.target.innerText
      }, () => this.filterByTerms())
    }
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
    if (this.props.currentPosition.lat === "" || this.props.currentPosition.lng === ""){
      return (
        <div style={{position: 'fixed', left: "8%", top: "50%" }}>
        <div className="loader"></div>

      </div>
      )
    } else {
      return (
        sortedFacilities.map((facility, index) => {
          if (facility === null || this.props.currentPosition === null || this.props.currentPosition.lat === "" || this.props.currentPosition.lng === ""){
            null
          } else {
            return <FacilityCard distance={facility.distance} cardClick={this.cardClick} hover={this.state.hover} currentLatitude={this.props.currentPosition.lat} currentLongitude={this.props.currentPosition.lng} key={index} facility={facility} facilities={this.props.facilities}/>
          }
        })
      )
    }
  }

  cardClick = (data) => {

    this.props.setFacilityMapPosition({lat: data.facility.latitude, lng: data.facility.longitude})
    this.props.setFacilityMapZoom(data.zoom)
  }

  render(){
    console.log(this.state.citySearch)
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
     insurance
      <Dropdown name="insuranceSearch" onChange={this.handleInsuranceDropChange} placeholder='aetna' fluid search selection options={insuranceOptions} value={this.state.insuranceSearch}/>
    <br/>
    city
    <Dropdown name="citySearch" value={this.state.citySearch} onChange={this.handleCityDropChange} placeholder='Albany' fluid search selection options={cityOptions}/>
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


      <div ref="facilitiesRef" className="facilities">
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
