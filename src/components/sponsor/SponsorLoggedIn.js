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

  removeLogin = () => {
    this.props.removeSponsorLogin("")
  }

  filterOnChange = (event) =>{
    this.setState({
      [event.target.name]: event.target.value
    }, () => this.filterBySearchTerms())
  }

  filterBySearchTerms = () => {
    let sponsees = this.props.sponsees.filter((sponsee) => {
      return sponsee.gender.toLowerCase() === this.state.genderSearch.toLowerCase()
    })
    let ageFilteredSponsees;
    let sponseesData = sponsees.length > 0 ? sponsees:this.props.sponsees
      ageFilteredSponsees = sponseesData.filter((sponsee) => {
        return sponsee.age == this.state.ageSearch
      })
      debugger
      this.setState({
        sponsees: ageFilteredSponsees.length > 0 ? ageFilteredSponsees : sponsees
      })
  }

  render(){
    let sponsees = this.state.sponsees.length > 0 ? (this.state.sponsees) : (this.props.sponsees)
    const sponseesData = sponsees.map((sponsee, index) => {
      return(
        <SponseeCard key={index} sponsee={sponsee} currentLatitude={this.props.currentPosition.lat} currentLongitude={this.props.currentPosition.lng}/>
      )
    })
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
              name="genderSearch"
              style={{marginLeft: 10 + "px"}}
              type="text"
              onChange={this.filterOnChange}

              value={this.state.genderSearch}
            />
            </label>
      </form>
      <form className="sortSponsees">
            <label>
              age:
              <input
              name="ageSearch"
              style={{marginLeft: 10 + "px"}}
              type="text"
              onChange={this.filterOnChange}
              value={this.state.ageSearch}
            />
            </label>
      </form>
      <br/>
      <div className="sponseeDiv">
        {sponseesData}
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
