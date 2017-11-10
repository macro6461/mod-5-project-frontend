import React, { Component } from 'react'
import SponsorCard from '../sponsor/SponsorCard'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { fetchSponsorsRequest } from '../../actions/sponsorActions'
import { fetchSponsorsRequestResolved } from '../../actions/sponsorActions'
import { removeSponseeLogin } from '../../actions/sponseeActions'
import { Button } from 'semantic-ui-react'

class SponseeLoggedIn extends Component {

  state = {
    latitude: "",
    longitude: "",
    genderSearch: "",
    ageSearch: "",
    sponsors: []
  }

  componentDidMount = () =>{
    this.setState({
      sponsees: this.props.sponsees
    })
  }

  removeLogin = () => {
    this.props.removeSponseeLogin("")
  }

  filterOnChange = (event) =>{
    this.setState({
      [event.target.name]: event.target.value
    }, () => this.filterSponsors())
  }

  filterSponsors = () => {
    let filteredSponsors;
    let filteredAges;
    let filteredGenders;
    const genderSearch = this.state.genderSearch
    const ageSearch = this.state.ageSearch
    if (genderSearch === "" && ageSearch === ""){
      this.setState({
        sponsors: this.props.sponsors
      })
    } else {
      if (genderSearch === "" && ageSearch.length > 0){
        filteredAges = this.props.sponsors.filter((sponsor) => {
          return sponsor.age === ageSearch
        })
        this.setState({
          sponsors: filteredAges
        })
      } else if (genderSearch.length > 0 && ageSearch === "") {
        filteredGenders = this.props.sponsors.filter((sponsor) => {
          return sponsor.gender.toLowerCase() === genderSearch.toLowerCase()
        })
        this.setState({
          sponsors: filteredGenders
        })
      }
      if (filteredGenders && ageSearch.length > 0){
        debugger
        filteredSponsors = filteredGenders.filter((sponsor) => {
          return sponsor.age === ageSearch
        })
        this.setState({
          sponsors: filteredSponsors
        })
      }
      if (filteredAges && genderSearch.length > 0){
        filteredSponsors = filteredAges.filter((sponsor) => {
          return sponsor.gender.toLowerCase() === genderSearch.toLowerCase()
        })
        this.setState({
          sponsors: filteredSponsors
        })
      }
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
        sponsors: this.props.sponsors
      })
    } else {
      let filteredSponsors = this.props.sponsors.filter((sponsor) => {

        return sponsor.age === ageSearch
      })
        this.setState({
          sponsors: filteredSponsors
        })
    }
  }


  render(){
    let sponsors;
    if (this.state.sponsors.length > 0){
      sponsors = this.state.sponsors.map((sponsor, index) => {
        return(
          <SponsorCard key={index} sponsor={sponsor} currentLatitude={this.props.currentPosition.lat} currentLongitude={this.props.currentPosition.lng}/>
        )
      })
    } else {
      sponsors = this.props.sponsors.map((sponsor, index) => {
        return(
          <SponsorCard key={index} sponsor={sponsor} currentLatitude={this.props.currentPosition.lat} currentLongitude={this.props.currentPosition.lng}/>
        )
      })
    }
    return(
      <div>
        <br/>
        <br/>
        <h3> Welcome Sponsee {localStorage.username}!</h3>
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
      <div className="sponseeDiv">
        {sponsors}
      </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    sponsors: state.sponsorsReducer.sponsors,
    currentSponsee: state.sponseesReducer.currentSponsee,
    currentPosition: state.currentReducer.currentPosition
  }
}

export default connect(mapStateToProps, {fetchSponsorsRequest, fetchSponsorsRequestResolved, removeSponseeLogin})(SponseeLoggedIn)
