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

  removeLogin = () => {
    this.props.removeSponseeLogin("")
  }

  deleteAccount = () => {
    console.log("hello")
    // fetch(`http://localhost:3000/sponsors/${deleteData.user.id}`, {
    //   headers: {"Content-Type": "application/json",
    //   "Accept":"application/json"},
    //   method: "DELETE",
    //   body: JSON.stringify({
    //     name: deleteData.user.name,
    //     age: deleteData.user.age,
    //     gender: deleteData.user.gender,
    //     city: newCity, state: newState, picture_url: deleteData.user.picture_url, bio: deleteData.user.bio, password: deleteData.user.password
    //   })
    // })
  }

  filterOnChange = (event) =>{
    this.setState({
      [event.target.name]: event.target.value
    }, () => this.filterBySearchTerms())
  }

  filterBySearchTerms = () => {
    let sponsors = this.props.sponsors.filter((sponsor) => {
      return sponsor.gender.toLowerCase() === this.state.genderSearch.toLowerCase()
    })
    let ageFilteredSponsors;
    let sponsorsData = sponsors.length > 0 ? sponsors:this.props.sponsors
      ageFilteredSponsors = sponsorsData.filter((sponsor) => {
        return sponsor.age == this.state.ageSearch
      })
      this.setState({
        sponsors: ageFilteredSponsors.length > 0 ? ageFilteredSponsors : sponsors
      })
  }


  render(){
    let sponsors = this.state.sponsors.length > 0 ? (this.state.sponsors) : (this.props.sponsors)
    const sponsorsData = sponsors.map((sponsor, index) => {
      return(
        <SponsorCard key={index} sponsor={sponsor} currentLatitude={this.props.currentPosition.lat} currentLongitude={this.props.currentPosition.lng}/>
      )
    })
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
        {sponsorsData}
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
