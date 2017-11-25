import React, { Component } from 'react';
import './App.css';
// import './mobile.css';
import Nav from './components/Nav'
import { getCurrentUserPosition, getCurrentPerson } from './actions/actions'
import { fetchFacilitiesRequest } from './actions/facilityActions'
import { fetchSponseesRequest, getCurrentSponsee } from './actions/sponseeActions'
import { fetchSponsorsRequest, getCurrentSponsor } from './actions/sponsorActions'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Icon } from 'semantic-ui-react'
import NextStepLogo from './TheNextStepLogo3.png'
import Loading from './components/Loading'



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
    // this.getCurrentSponsorRole()
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

  // testScroll = () => {
  //   window.onscroll = function(){
  //     // if(window.scrollTop === window.scrollHeight - window.clientHeight){
  //     //   alert('User scrolled to bottom')
  //     // } else{
  //     //   console.log()
  //     console.log(window.scroll())
  //       // console.log("not yet")
  //     }
  //   }


  render() {
    const pStyle = {
      fontSize: '10px',
      paddingTop: '10px'
    }
    return (
      <div className="App">
        {/* <Loading /> */}

      <Nav remove={this.removeLocalStorage} submit={this.retrieveSubmitData}/>
      <br/>
    <br/>
  <br/>
      <br/>
    <br/>
  <br/>
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


export default withRouter(connect(mapStateToProps, { getCurrentUserPosition, fetchFacilitiesRequest, fetchSponseesRequest, fetchSponsorsRequest, getCurrentPerson, getCurrentSponsor, getCurrentSponsee })(App))
