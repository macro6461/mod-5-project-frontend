import React, { Component } from 'react'
import { editSponsor } from '../../actions/sponsorActions'
import { Button, Form } from 'semantic-ui-react'
import { connect } from 'react-redux'
// import { withRouter } from 'react-router-dom'

class SponsorEdit extends Component{

  state = {
    id: this.props.sponsor.id,
    username: this.props.sponsor.username,
    password: this.props.sponsor.password,
    age: this.props.sponsor.age,
    gender: this.props.sponsor.gender,
    bio: this.props.sponsor.bio,
    email: this.props.sponsor.email,
    street: this.props.sponsor.street,
    city: this.props.sponsor.city,
    state: this.props.sponsor.state,
    zip: this.props.sponsor.zip,
    local: false,
    clicked: false
  }

  handleOnChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  setClicked = () => {
    this.props.handleEdit()
  }

  handleSubmit = (event) => {
    event.preventDefault()
    let sponsor = {id: this.state.id, username: this.state.username, password: this.state.password, age: this.state.age, gender: this.state.gender, bio: this.state.bio, email: this.state.email, street: this.state.street, city: this.state.city, state: this.state.state, zip: this.state.zip}
    this.props.editSponsor(sponsor)
    this.props.handleEdit()
  }

  render(){
    return (
      <div>
        <div className="container">
        </div>
      <Form className="editForm" onSubmit={this.handleSubmit}>
        {this.props.error === ""
          ? null
          : <h3 className="pleaseTryAgain">Please try again.</h3>
        }
        <h1>Edit Profile</h1>
        <Form.Group widths='equal'>
          <Form.Input className="mediumInput" label='Username' placeholder='Username' name="username" value={this.state.username} onChange={this.handleOnChange} required/>
        <Form.Input className="mediumInput" label='Password' placeholder='Password' type="password" name="password" value={this.state.password} onChange={this.handleOnChange} required/>
      <Form.Input className="mediumInput" label='Gender' placeholder='Gender' type="text" name="gender" value={this.state.gender} onChange={this.handleOnChange} required/>
         <Form.Input className="shorterInput" label='Age' placeholder='Age' type="text" name="age" value={this.state.age} onChange={this.handleOnChange} required/>
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Input className="mediumInput" label='Street' name="street" value={this.state.street}  onChange={this.handleOnChange} required/>
        <Form.Input className="mediumInput" label='City' name="city" value={this.state.city} onChange={this.handleOnChange} required/>
      <Form.Input className="shorterInput" label='State' name="state" value={this.state.state}  onChange={this.handleOnChange} maxLength="2" required/>
    <Form.Input className="mediumInput" label='Zip' name="zip" value={this.state.zip}  onChange={this.handleOnChange} maxLength="5" required/>
        </Form.Group>
        <Form.TextArea label='About' name="bio" value={this.state.bio} placeholder='Tell us more about you...' onCount={this.checkBioCount} onChange={this.handleOnChange} maxLength="200" required/>
      <p>remaining characters:</p>
      <Form.Input label='Email' placeholder='email' name="email" value={this.state.email} onChange={this.handleOnChange} required/>
      <Form.Button className="save" type="submit">save</Form.Button>
      <Form.Button className="backButton" onClick= {this.setClicked} type="submit">back</Form.Button>
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

export default connect(mapStateToProps, { editSponsor })(SponsorEdit)
