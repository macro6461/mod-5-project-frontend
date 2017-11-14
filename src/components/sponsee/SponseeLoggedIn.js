import React, { Component } from 'react'
import SponsorCard from '../sponsor/SponsorCard'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { fetchSponsorsRequest, fetchSponsorsRequestResolved } from '../../actions/sponsorActions'
import { removeSponseeLogin, deleteSponseeAccount, editSponsee, removeSponseeError } from '../../actions/sponseeActions'
import { Button, Form } from 'semantic-ui-react'
import SponseeConfirmDelete from './SponseeConfirmDelete'
import SponseeEdit from './SponseeEdit'
import SponsorModal from '../sponsor/SponsorModal'

class SponseeLoggedIn extends Component {

  state = {
    latitude: "",
    longitude: "",
    genderSearch: "",
    ageSearch: "",
    sponsors: [],
    showWindow: false,
    confirmDelete: false,
    confirm: false,
    edit: false,
    currentSponsee: "",
    modal: false,
    modalSponsor: ""
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

  confirmDelete = () => {
    var result = window.confirm("Are you sure you want to delete your account?");
    if (result) {
      this.deleteAccount()
    }
  }

  handleEdit = () => {
    debugger
    this.props.removeSponseeError()
    let currentSponsee = localStorage.getItem('username')
    let editSponsee = this.props.sponsees.find((sponsee)=>{
      debugger
      return sponsee.username === currentSponsee
    })
    debugger
    this.setState({
      currentSponsee: editSponsee,
      edit: !this.state.edit
    })
  }

  deleteAccount = () => {
    let currentSponsee = localStorage.getItem("username")
    let deleteSponsee = this.props.sponsees.find((sponsee)=>{
      debugger
      return sponsee.username === currentSponsee
    })
      this.props.deleteSponseeAccount(deleteSponsee)
  }

  openModal = (data) => {
    debugger
    this.setState({
      modal: !this.state.modal,
      modalSponsor: data
    })
  }

  haversineFunction = (data) => {

    var haversine = require('haversine')
    let start = {
      latitude: this.props.currentPosition.lat,
      longitude: this.props.currentPosition.lng
    }
    let end = {
      latitude: data.latitude,
      longitude: data.longitude
    }
    const haversineCoords = (haversine(start, end, {unit: 'mile'}))
    if (this.props.currentPosition.lat === "" || this.props.currentPosition.lng === ""){
      return "Calculating..."
    } else {
      if (data.longitude === null || data.latitude === null){
        return "No Data"
      } else {
        data.distance = haversineCoords
        return parseFloat(haversineCoords).toFixed(0) + " miles away"
      }
    }
  }



  sortSponsors = (data) => {
    let sortedSponsors = data.sort(function(a, b){
      if (a === null || b === null){
        null
      } else {
        debugger
        return parseInt(a.distance.split(" ")[0]) - parseInt(b.distance.split(" ")[0])
      }
    })

    return (
      sortedSponsors.map((sponsor, index) => {
        if (sponsor === null){
          null
        } else {
          return <SponsorCard key={index} openModal={this.openModal} distance={sponsor.distance} currentLatitude={this.props.currentPosition.lat} currentLongitude={this.props.currentPosition.lng} sponsor={sponsor} sponsors={this.props.sponsors}/>
        }
      })
    )
  }

  render(){
    const finalSponsors = this.state.sponsors && this.state.sponsors.length > 0 ? (this.state.sponsors) : (this.props.sponsors)
    const sponsorsData = finalSponsors.map((sponsor, index) => {
      if (sponsor.latitude === null || sponsor.longitude === null){
        return null
      } else {
        sponsor.distance = this.haversineFunction(sponsor)
        return sponsor
      }
    })

    const newSponsors = this.sortSponsors(sponsorsData)
console.log(this.props.currentSponsee)
    return(
      <div>
        {this.state.modal === true
          ? <SponsorModal openModal={this.openModal} sponsor={this.state.modalSponsor}/>
          : null
        }
        <br/>
        <br/>
        <h3> Welcome Sponsee {localStorage.username}!</h3>
        <p>You are now logged in.</p>
      <Link to="/"><Button onClick={this.removeLogin}>Sign Out</Button></Link>
      <Button className="deleteButton" onClick={this.confirmDelete}>Delete Account</Button>
      <Button className="editButton" onClick={this.handleEdit}>Edit</Button>
        <br/>
      {this.state.showWindow === true
        ? <SponseeConfirmDelete confirmDelete={this.confirmDelete}/>
        : null
      }
      {this.state.edit === false
        ? null
        : <SponseeEdit sponsee={this.state.currentSponsee} className="sponseeEdit" handleEdit={this.handleEdit}/>
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
        {newSponsors}
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

export default connect(mapStateToProps, {fetchSponsorsRequest, fetchSponsorsRequestResolved, removeSponseeLogin, deleteSponseeAccount, editSponsee, removeSponseeError})(SponseeLoggedIn)
