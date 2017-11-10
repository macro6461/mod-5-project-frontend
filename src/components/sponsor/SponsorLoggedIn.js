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
    genderSearch: "",
    ageSearch: "",
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

  filterGenderOnChange = (event) =>{

    this.setState({
      genderSearch: event.target.value
    }, () => this.filterGender())
  }

  filterGender = () => {
    const genderSearch = this.state.genderSearch
    if (genderSearch === ""){
      this.setState({
        sponsees: this.props.sponsees
      })
    } else {
      let filteredSponsees = this.props.sponsees.filter((sponsee) => {

        return sponsee.gender.toLowerCase() === genderSearch.toLowerCase()
      })
        this.setState({
          sponsees: filteredSponsees
        })
    }
  }

  filterAgeOnChange = (event) =>{

    this.setState({
      ageSearch: event.target.value
    }, () => this.filterAge())
  }

  filterAge = () => {

    const ageSearch = this.state.ageSearch
    if (ageSearch === ""){
      this.setState({
        sponsees: this.props.sponsees
      })
    } else {
      let filteredSponsees = this.props.sponsees.filter((sponsee) => {

        return sponsee.age === ageSearch
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
              onChange={this.filterGenderOnChange}

              value={this.state.genderSearch}
            />
            </label>
      </form>
      <form className="sortSponsees">
            <label>
              age:
              <input
              style={{marginLeft: 10 + "px"}}
              type="text"
              onChange={this.filterAgeOnChange}

              value={this.state.ageSearch}
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
