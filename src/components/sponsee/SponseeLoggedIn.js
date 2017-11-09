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
    searchTerm: "",
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
    console.log(event.target.value)
    this.setState({
      searchTerm: event.target.value
    }, () => this.filterGender())
  }

  filterGender = () => {
    console.log(this.props.sponsors)
    const searchTerm = this.state.searchTerm
    if (searchTerm === ""){
      this.setState({
        sponsors: this.props.sponsors
      })
    } else {
      let filteredSponsors = this.props.sponsors.filter((sponsor) => {
        debugger
        return sponsor.gender.toLowerCase() === searchTerm.toLowerCase()
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
              onChange={this.filterOnChange}
              placeholder={"gender preference..."}
              value={this.state.searchTerm}
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
