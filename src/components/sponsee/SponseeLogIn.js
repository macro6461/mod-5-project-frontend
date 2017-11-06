import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import SponseeSignUp from './SponseeSignUp'
import { connect } from 'react-redux';
import { loginSponsee } from '../../actions/sponseeActions'

class SponseeLogIn extends Component {

  state = {
    username: "",
    password: "",
    local: false,
    clicked: false,
    error: false
  }

  handleOnChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  clicked = () => {
    this.setState({
      clicked: !this.state.clicked
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const token = localStorage.getItem("jwt")
    let sponsee = {username: this.state.username, password: this.state.password}
    this.props.loginSponsee(sponsee)
    this.afterSubmit(sponsee)
  }

  afterSubmit = (sponsee) => {
    this.setLocalStorage(sponsee)
  }

  setLocalStorage = (data) => {
    localStorage.setItem('jwt', data.jwt)
    localStorage.setItem('username', data.username)
    localStorage.setItem('role', "sponsee")
    this.setStateAfterLocal()
  }

  setStateAfterLocal = () => {
    this.setState({
      username: '',
      password: ''
    }, () => {this.sendState()})
  }


  sendState = () => {
    this.setState({
      local: true
    }, () => {this.props.submit(this.state.local)})
  }


  render(){
    return(
      <div>
        <br/>
      <br/>
    <br/>
      <h3> Please Login Sponsee </h3>
      <form onSubmit={this.handleSubmit}>
        {this.state.error === true
          ? <h4>Sponsee not found</h4>
          : null
        }
          Username: <input name="username" type="text" value={this.state.username} onChange={this.handleOnChange} required/><br/>
          <br/>
          Password: <input name="password" type="password" value={this.state.password} onChange={this.handleOnChange} required/><br/>
        <br/>
      <input type="submit" value="Sign In"/>
      </form>
      <br/>
    <br/>
    <br/>
  <br/>
  <br/>
  <br/>
  <br/>
  <br/>
  <br/>
      <h3> Don't have an account?</h3>
      { this.state.clicked === true
        ? <button onClick={this.clicked}>back</button>
        : <button onClick={this.clicked}>Sign Up</button>
      }
        { this.state.clicked === true
          ? <SponseeSignUp submit={this.props.submit} clicked={this.setClicked}/>
          : null
        }
      </div>
    )
  }
}



export default connect(null, {loginSponsee})(SponseeLogIn)
