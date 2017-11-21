import React, { Component } from 'react'
import { Card, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'

class SponseeCard extends Component{

  state = {
    modal: false
  }

  haversineFunction = () => {
    var haversine = require('haversine')
    let start = {
      latitude: this.props.currentLatitude,
      longitude: this.props.currentLongitude
    }
    let end = {
      latitude: this.props.sponsee.latitude,
      longitude: this.props.sponsee.longitude
    }
    const haversineCoords = (haversine(start, end, {unit: 'mile'}))
    if (this.props.currentLatitude === "" || this.props.currentLongitude === ""){
      return "Calculating..."
    } else {
      if (this.props.sponsee.longitude === null || this.props.sponsee.latitude === null){
        return "No Data"
      } else {
        this.props.sponsee.distance = haversineCoords
        // this.props.sponsees.push(this.props.sponsee)
        return parseFloat(haversineCoords).toFixed(0) + " miles away"
      }
    }
  }

  checkBio = () => {
    let cutBio
    if (this.props.sponsee.bio.length > 80){
      let arr = this.props.sponsee.bio.split("").slice(0, 80)
      let cutBio = arr.join("") + "..."
      return <p className="sponsorP">{cutBio}</p>
    } else {
      return <p className="sponsorP">{this.props.sponsee.bio}</p>
    }
  }

  checkModal = (data) => {
    this.props.openModal(data)
  }


  render(){
    const email = "mailto:" + this.props.sponsee.email + "?subject=The Next Step: " + this.props.currentSponsor + " sent you a message!"
    const distance = this.haversineFunction()

    return(
      <div className="sponseeCard" >
      <div onClick={()=>{this.checkModal(this.props.sponsee)}}>
        <h2 className="sponseeCardHeader">{this.props.sponsee.username} | {this.props.sponsee.age} | {this.props.sponsee.gender}</h2>
          {this.checkBio()}
          {distance === NaN
        ? <h4>No Data</h4>
        : <h4 className="distance">Distance: {distance}</h4>
      }
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
    </div>
    <a className="mailto" href={email}><Icon className="mail outline" size="big"></Icon></a>
  </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentSponsor: state.sponsorsReducer.sponsor,
    currentSponsee: state.sponseesReducer.sponsee,
    sponsees: state.sponseesReducer.sponsees,
    sponsors: state.sponsorsReducer.sponsors,
    currentPosition: state.currentReducer.currentPosition
  }
}

export default connect(mapStateToProps)(SponseeCard)
