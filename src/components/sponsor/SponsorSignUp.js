import React, { Component } from 'react'
import { addSponsor } from '../../actions/sponsorActions'
import { connect } from 'react-redux';
import SponsorLogIn from './SponsorLogIn'
import { Button, Checkbox, Form} from 'semantic-ui-react'

const options = [
  { key: 'm', text: 'Male'},
  { key: 'f', text: 'Female'}
]

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
    this.setStateAfterLocal()
  }

  afterSubmit = (sponsor) => {
    this.setLocalStorage(sponsor)
  }

  setLocalStorage = (data) => {

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

    this.setState({
      local: true
    }, () => {this.props.submit(this.state.local)})
  }
  render(){
    return(
        <div className="signUp">
          <h1>Sign Up</h1>
        <Form className="signUpForm" onSubmit={this.handleSubmit}>
          {this.props.error === ""
            ? null
            : <h3 className="pleaseTryAgain">Please try again.</h3>
          }
          <Form.Group widths='equal'>
            <Form.Input className="mediumInput" label='Username' placeholder='Username' name="username" value={this.state.username} onChange={this.handleOnChange} required/>
          <Form.Input className="mediumInput" label='Password' placeholder='Password' type="password" name="password" value={this.state.password} onChange={this.handleOnChange} required/>
        <Form.Input className="mediumInput" label='Gender' placeholder='Gender' type="text" name="gender" value={this.state.gender} onChange={this.handleOnChange} required/>
           <Form.Input className="shorterInput" label='Age' placeholder='Age' type="text" name="age" value={this.state.age} onChange={this.handleOnChange} required/>
          </Form.Group>
          <Form.Group inline>
            <Form.Input label='Address' name="address" value={this.state.address} placeholder='Street, City, State, Zip' onChange={this.handleOnChange} required/>
          </Form.Group>
          <Form.TextArea label='About' name="bio" value={this.state.bio} placeholder='Tell us more about you...' onChange={this.handleOnChange} required/>
        <Form.Input label='Email' placeholder='email' name="email" value={this.state.email} onChange={this.handleOnChange} required/>
      <Form.Button type="submit">Save</Form.Button>
       </Form>
        </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.sponsorsReducer.error
  }
}

export default connect(mapStateToProps, {addSponsor})(SponsorSignUp)
