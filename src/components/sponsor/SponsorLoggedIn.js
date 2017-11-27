import React, { Component } from 'react'
import SponseeCard from '../sponsee/SponseeCard'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { fetchSponseesRequest, fetchSponseesRequestResolved } from '../../actions/sponseeActions'
import { removeSponsorLogin, removeSponsorError, deleteSponsorAccount, isSponsorEdited } from '../../actions/sponsorActions'
import { Button, Form, Icon } from 'semantic-ui-react'
import SponsorConfirmDelete from './SponsorConfirmDelete'
import SponsorEdit from './SponsorEdit'
import SponseeModal from '../sponsee/SponseeModal'

class SponsorLoggedIn extends Component {

  state = {
    latitude: "",
    longitude: "",
    genderSearch: "",
    ageSearch: "",
    sponsees: [],
    showWindow: false,
    confirmDelete: false,
    confirm: false,
    edit: false,
    currentSponsor: "",
    modal: false,
    modalSponsee: ""
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
      this.setState({
        sponsees: ageFilteredSponsees.length > 0 ? ageFilteredSponsees : sponsees
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

  handleNoEdit = () => {
    this.setState({
      edit: false
    }, () => {this.changeEditSponsorState(this.state.edit)})
  }

  handleEdit = () => {

    this.props.removeSponsorError()
    let currentSponsor = localStorage.getItem('username')
    let editSponsor = this.props.sponsors.find((sponsor)=>{

      return sponsor.username === currentSponsor
    })
    this.setState({
      currentSponsor: editSponsor,
      edit: true
    }, ()=>{this.changeEditSponsorState()})
  }

  changeEditSponsorState = () => {

    this.props.isSponsorEdited(this.state.edit)
  }

  deleteAccount = () => {
    let currentSponsor = localStorage.getItem("username")
    let deleteSponsor = this.props.sponsors.find((sponsor)=>{

      return sponsor.username === currentSponsor
    })
      this.props.deleteSponsorAccount(deleteSponsor)
  }

  openModal = (data) => {

    console.log(data)
    this.setState({
      modal: !this.state.modal,
      modalSponsee: data
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


  sortSponsees = (data) => {
    let sortedSponsees = data.sort(function(a, b){
      if (a === null || b === null){
        null
      } else {

        return parseInt(a.distance.split(" ")[0]) - parseInt(b.distance.split(" ")[0])
      }
    })

    return (
      sortedSponsees.map((sponsee, index) => {
        if (sponsee === null){
          null
        } else {
          return <SponseeCard key={index} openModal={this.openModal} distance={sponsee.distance} currentLatitude={this.props.currentPosition.lat} currentLongitude={this.props.currentPosition.lng} sponsee={sponsee} sponsees={this.props.sponsees}/>
        }
      })
    )
  }

  render(){
    const finalSponsees = this.state.sponsees && this.state.sponsees.length > 0 ? (this.state.sponsees) : (this.props.sponsees)
    const sponseesData = finalSponsees.map((sponsee, index) => {
      if (sponsee.latitude === null || sponsee.latitude === null){
        return null
      } else {
        sponsee.distance = this.haversineFunction(sponsee)
        return sponsee
      }
    })

    const newSponsees = this.sortSponsees(sponseesData)

    return(
      <div>
        {this.state.modal === true
          ? <SponseeModal openModal={this.openModal} sponsee={this.state.modalSponsee}/>
          : null
        }
        <br/>
        <br/>
        <br/>
        <br/>
      {this.props.currentSponsor === localStorage.getItem("username")
        ? <h3> Welcome Sponsor {this.props.currentSponsor}!</h3>
        : <h3> Welcome Sponsor {localStorage.username}!</h3>
      }
        <p>You are now logged in.</p>
      <Link to="/sponsors"><Button onClick={this.removeLogin}>Sign Out</Button></Link>
      <Button className="deleteButton" onClick={this.confirmDelete}>Delete Account</Button>
      <Button className="editButton" onClick={this.handleEdit}>Edit</Button>
        <br/>
      {this.state.showWindow === true
        ? <SponsorConfirmDelete confirmDelete={this.confirmDelete}/>
        : null
      }
      {this.props.sponsorEditTrueFalse === false
        ? null
        : <SponsorEdit sponsor={this.state.currentSponsor} className="sponseeEdit" handleEdit={this.handleEdit} handleNoEdit={this.handleNoEdit}/>
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
        <a style={{marginLeft: '2%', fontSize: '1vw'}} href="#top">Back to top of page</a>
      </Form>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
    <h3>Here are some potential sponsees! When you're ready, send them a message. <Icon className="smile" size="large"/> </h3>
      <div className="sponseeDiv">
        {newSponsees}
      </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {

  return {
    sponsors: state.sponsorsReducer.sponsors,
    sponsees: state.sponseesReducer.sponsees,
    currentSponsor: state.sponsorsReducer.sponsor,
    sponsorEditTrueFalse: state.sponsorsReducer.isSponsorEdited,
    currentPosition: state.currentReducer.currentPosition
  }
}

export default connect(mapStateToProps, {fetchSponseesRequest, fetchSponseesRequestResolved, removeSponsorLogin, deleteSponsorAccount, isSponsorEdited, removeSponsorError})(SponsorLoggedIn)
