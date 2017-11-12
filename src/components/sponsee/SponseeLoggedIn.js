import React, { Component } from 'react'
import SponsorCard from '../sponsor/SponsorCard'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { fetchSponsorsRequest } from '../../actions/sponsorActions'
import { fetchSponsorsRequestResolved } from '../../actions/sponsorActions'
import { removeSponseeLogin, deleteSponseeAccount } from '../../actions/sponseeActions'
import { Button, Form } from 'semantic-ui-react'
import SponseeConfirmDelete from './SponseeConfirmDelete'

class SponseeLoggedIn extends Component {

  state = {
    latitude: "",
    longitude: "",
    genderSearch: "",
    ageSearch: "",
    sponsors: [],
    showWindow: false,
    confirmDelete: false,
    confirm: false
  }


  removeLogin = () => {
    this.props.removeSponseeLogin("")
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

  confirmWindow = () => {
    this.setState({
      showWindow: !this.state.showWindow
    })
  }

  // confirmDelete = (data) => {
  //   console.log(this.props)
  //   if (data === false){
  //     this.setState({
  //       showWindow: false
  //     })
  //   }
  // }

  confirmDelete = () => {
    var result = window.confirm("Are you sure you want to delete your account?");
    if (result) {
      debugger
      this.deleteAccount()
    }
  }

  deleteAccount = () => {
    let currentSponsee = localStorage.getItem("username")
    let deleteSponsee = this.props.sponsees.find((sponsee)=>{
      debugger
      return sponsee.username === currentSponsee
    })
    console.log(deleteSponsee)
      this.props.deleteSponseeAccount(deleteSponsee)
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
    <Button className="deleteButton" onClick={this.confirmDelete}>Delete Account</Button>
        <br/>
      {this.state.showWindow === true
        ? <SponseeConfirmDelete confirmDelete={this.confirmDelete}/>
        : null
      }
        <Form className="sort">
          <Form.Field>
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
        </Form.Field>
        <Form.Field>
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
        </Form.Field>
      </Form>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
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
    sponsees: state.sponseesReducer.sponsees,
    currentSponsee: state.sponseesReducer.sponsee,
    currentPosition: state.currentReducer.currentPosition
  }
}

export default connect(mapStateToProps, {fetchSponsorsRequest, fetchSponsorsRequestResolved, removeSponseeLogin, deleteSponseeAccount})(SponseeLoggedIn)
