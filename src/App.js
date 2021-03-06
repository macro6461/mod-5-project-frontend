import React, { Component } from 'react';
import './App.css';
// import './mobile.css';
import Nav from './components/Nav'
import { getCurrentUserPosition, getCurrentPerson } from './actions/actions'
import { fetchFacilitiesRequest } from './actions/facilityActions'
import { fetchSponseesRequest} from './actions/sponseeActions'
import { fetchSponsorsRequest} from './actions/sponsorActions'
// import { fetchSponsorReviewsRequest, fetchSponseeReviewsRequest } from './actions/reviewActions'
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

  componentDidMount = () => {
    this.props.fetchSponsorsRequest()
    this.props.fetchSponseesRequest()
    this.props.fetchFacilitiesRequest()

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
    currentSponsor: state.sponsorsReducer.sponsor,
    currentSponsee: state.sponseesReducer.sponsee,
    sponsees: state.sponseesReducer.sponsees,
    sponsors: state.sponsorsReducer.sponsors,
    currentPosition: state.currentReducer.currentPosition
  }
}


export default withRouter(connect(mapStateToProps, { getCurrentUserPosition, fetchFacilitiesRequest, fetchSponseesRequest, fetchSponsorsRequest, getCurrentPerson})(App))
