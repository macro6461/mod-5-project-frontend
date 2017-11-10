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

  filterGenderOnChange = (event) =>{
    this.setState({
      genderSearch: event.target.value
    }, () => this.filterGender())
  }

  filterGender = () => {
    const genderSearch = this.state.genderSearch
    if (genderSearch === ""){
      this.setState({
        sponsors: this.props.sponsors
      })
    } else {
      let filteredSponsors = this.props.sponsors.filter((sponsor) => {
        return sponsor.gender.toLowerCase() === genderSearch.toLowerCase()
      })
        this.setState({
          sponsors: filteredSponsors
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
