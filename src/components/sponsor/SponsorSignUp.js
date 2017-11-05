import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { addSponsor } from '../../actions/actions'
import { connect } from 'react-redux';
import { Link, Route } from 'react-router-dom'
import SponsorLogIn from './SponsorLogIn'

class SponsorSignUp extends Component {

  state = {
    username: "",
    password: "",
    age: "",
    gender: "",
    bio: "",
    email: "",
    address: "",
    local: false
  }

  handleOnChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    let sponsor = {username: this.state.username, password: this.state.password, age: this.state.age, gender: this.state.gender, bio: this.state.bio, email: this.state.email, address: this.state.address}
    this.props.addSponsor(sponsor)
    this.afterSubmit(sponsor)
  }

  afterSubmit = (sponsor) => {
    debugger
    this.setLocalStorage(sponsor)
  }

  setLocalStorage = (data) => {
    debugger
    localStorage.setItem('jwt', data.jwt)
    localStorage.setItem('username', data.username)
    localStorage.setItem('role', "sponsor")
    this.setStateAfterLocal()
  }


  setStateAfterLocal = () => {
    this.setState({
      username: "",
      password: "",
      age: "",
      gender: "",
      bio: "",
      email: "",
      address: ""
    }, ()=>{this.sendState()})
  }


  sendState = () => {
    debugger
    this.setState({
      local: true
    }, () => {this.props.submit(this.state.local)})
  }
  render(){
    return(
        <div className="signUp">
          <h1>Sponsor Sign Up</h1>
        <form className="signUpForm" onSubmit={this.handleSubmit}>
            Username: <input name="username" type="text" value={this.state.username} onChange={this.handleOnChange} required/>
            <br/>
            <br/>
          Password: <input name="password" type="password" value={this.state.password} onChange={this.handleOnChange} required/>
            <br/>
            <br/>
          Address: <input name="address" type="text" value={this.state.address} onChange={this.handleOnChange} required/> (this will not be visible)
            <br/>
            <br/>
          Age: <input name="age" type="text" value={this.state.age} onChange={this.handleOnChange} required/>
            <br/>
            <br/>
          Gender: <input name="gender" type="text" value={this.state.gender} onChange={this.handleOnChange} required/>
            <br/>
            <br/>
          Bio: <input name="bio" type="text" value={this.state.bio} onChange={this.handleOnChange} required/>
            <br/>
            <br/>
          Email: <input name="email" type="text" value={this.state.email} onChange={this.handleOnChange} required/>
            <br/>
            <br/>
            <input type="submit" />
          </form>
        </div>
    )
  }
}

export default connect(null, {addSponsor})(SponsorSignUp)
