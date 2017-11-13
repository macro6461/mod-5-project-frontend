import React, { Component } from 'react';
import './App.css';
import Nav from './components/Nav'
import { getCurrentUserPosition, getCurrentPerson } from './actions/actions'
import { fetchFacilitiesRequest } from './actions/facilityActions'
import { fetchSponseesRequest } from './actions/sponseeActions'
import { fetchSponsorsRequest } from './actions/sponsorActions'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Icon } from 'semantic-ui-react'


class App extends Component {

  state = {
    username: '',
    local: false,
    currentPosition: ""
  }

  getCurrentSponsorRole = () => {
    let sponsor = localStorage.getItem("username")
    let currentSponsor = this.props.sponsors.find((sponsor)=>{
      return sponsor.username === sponsor
    })

  }

  componentDidMount = () => {
    this.props.fetchSponsorsRequest()
    this.props.fetchSponseesRequest()
    this.props.fetchFacilitiesRequest()
    this.getCurrentSponsorRole
    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position) => {
          let currentPosition = {latitude: position.coords.latitude, longitude: position.coords.longitude}
          this.props.getCurrentUserPosition(currentPosition)
        })
    } else {
      console.log("not yet")
    }
    if (localStorage.length > 0){
      this.setState({
        local: true,
        username: localStorage.username
      })
    } else {
      this.setState({
        local: false,
        username: ''
      })
    }
  }

  removeLocalStorage = () => {
    localStorage.clear()
    this.setState({
      local: false
    })
  }

  retrieveSubmitData = (data) => {
    this.setState({
      local: data,
      username: localStorage.username
    })
  }

  render() {
    const pStyle = {
      fontSize: '10px',
      paddingTop: '10px'
    }
    return (
      <div className="App">
        <h1 className="nextStepHeader">The Next Step</h1>
      <Nav remove={this.removeLocalStorage} submit={this.retrieveSubmitData}/>
      <br/>
    <br/>
  <br/>
      <br/>
    <br/>
  <br/>
<p className="madeFooter" style={pStyle}>made with <i class="red heart icon" size="large"></i>by <a className="madeByAnchor" href="https://macro6461.github.io/">&copy;Matthew Croak Media 2017</a></p>
<br/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentPerson: state.currentReducer.currentPerson,
    sponsees: state.sponseesReducer.sponsees,
    sponsors: state.sponsorsReducer.sponsors,
    currentPosition: state.currentReducer.currentPosition
  }
}


export default withRouter(connect(mapStateToProps, { getCurrentUserPosition, fetchFacilitiesRequest, fetchSponseesRequest, fetchSponsorsRequest, getCurrentPerson })(App))
