import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import SponseeCard from '../sponsee/SponseeCard'
import { connect } from 'react-redux';
import { fetchSponseesRequest } from '../../actions/sponseeActions'
import { removeSponsorLogin } from '../../actions/sponsorActions'
import { Button, Form, Radio, Search } from 'semantic-ui-react'



class SponsorLoggedIn extends Component {

  state = {
    latitude: "",
    longitude: "",
    searchTerm: "",
    sponsees: []
  }

  componentDidMount = () =>{
    this.setState({
      sponsees: this.props.sponsees
    })
  }

  removeLogin = () => {
    this.props.removeSponsorLogin("")
  }

  filterOnChange = (event) =>{
    console.log(event.target.value)
    this.setState({
      searchTerm: event.target.value
    }, () => this.filterGender())
  }

  filterGender = () => {
    console.log(this.props.sponsees)
    const searchTerm = this.state.searchTerm
    if (searchTerm === ""){
      this.setState({
        sponsees: this.props.sponsees
      })
    } else {
      let filteredSponsees = this.props.sponsees.filter((sponsee) => {
        debugger
        return sponsee.gender.toLowerCase() === searchTerm.toLowerCase()
      })
        this.setState({
          sponsees: filteredSponsees
        })
    }
  }

  render(){
    let sponsees;
    if (this.state.sponsees.length > 0){
      sponsees = this.state.sponsees.map((sponsee, index) => {
        return(
          <SponseeCard key={index} sponsee={sponsee} currentLatitude={this.props.currentPosition.lat} currentLongitude={this.props.currentPosition.lng}/>
        )
      })
    } else {
      sponsees = this.props.sponsees.map((sponsee, index) => {
        return(
          <SponseeCard key={index} sponsee={sponsee} currentLatitude={this.props.currentPosition.lat} currentLongitude={this.props.currentPosition.lng}/>
        )
      })
    }
    return(
      <div>
        <br/>
        <br/>
        <h3> Welcome Sponsor {localStorage.username}!</h3>
        <p>You are now logged in.</p>
      <Link to="/"><Button onClick={this.removeLogin}>Sign Out</Button></Link>
        <br/>
      <form className="sortSponsees">
            <label>
              gender:
              <input
              style={{marginLeft: 10 + "px"}}
              type="text"
              onChange={this.filterOnChange}
              placeholder={"gender preference..."}
              value={this.state.searchTerm}
            />
            </label>
      </form>
      <div className="sponseeDiv">
        {sponsees}
      </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {

  return {
    sponsees: state.sponseesReducer.sponsees,
    currentSponsor: state.sponsorsReducer.currentSponsor,
    currentPosition: state.currentReducer.currentPosition
  }
}

export default connect(mapStateToProps, {removeSponsorLogin, fetchSponseesRequest})(SponsorLoggedIn)
