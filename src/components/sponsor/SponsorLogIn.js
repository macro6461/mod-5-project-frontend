import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import SponsorSignUp from './SponsorSignUp'
import { connect } from 'react-redux';

class SponsorLogIn extends Component {

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
    const token = localStorage.getItem("jwt")
    event.preventDefault()
    fetch('http://localhost:3000/sponsor/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
              },
      body: JSON.stringify({username: this.state.username, password: this.state.password})
    }).then(res => res.json()).then(json => {
      this.setLocalStorage(json)
    })
  }

  setLocalStorage = (data) => {
    if (data.sponsor === undefined){
      this.setState({
        error: true
      })
    } else {
      localStorage.setItem('jwt', data.jwt)
      localStorage.setItem('username', data.sponsor)
      localStorage.setItem('role', data.role)
    }
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

  setClicked = (data) => {
    this.setState({
      clicked: data
    })
  }


  render(){
    return(

      <div>
      <h3> Please Login Sponsor </h3>
      <form onSubmit={this.handleSubmit}>
        { this.state.error === true
          ? <h4>Sponsor not found</h4>
          : null
        }
          Username: <input name="username" type="text" value={this.state.username} onChange={this.handleOnChange} required/><br/>
          <br/>
        Password: <input name="password" type="password" value={this.state.password} onChange={this.handleOnChange} required/><br/>
        <br/>
      <input type="submit" value="Sign In"/>
      </form>
      <h3> Don't have an account?</h3>
      <button onClick={this.clicked}>Sponsor Sign Up</button>
      { this.state.clicked === true
        ? <SponsorSignUp submit={this.props.submit} clicked={this.setClicked}/>
        : null
      }
      </div>
    )
  }
}



export default SponsorLogIn
