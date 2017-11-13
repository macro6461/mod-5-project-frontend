import React, { Component } from 'react'
import { editSponsee } from '../../actions/sponseeActions'
import { Button, Form } from 'semantic-ui-react'
import { connect } from 'react-redux'

class SponseeEdit extends Component{

  state = {
    id: this.props.sponsee.id,
    username: this.props.sponsee.username,
    password: this.props.sponsee.password,
    age: this.props.sponsee.age,
    gender: this.props.sponsee.gender,
    bio: this.props.sponsee.bio,
    email: this.props.sponsee.email,
    street: this.props.sponsee.street,
    city: this.props.sponsee.city,
    state: this.props.sponsee.state,
    zip: this.props.sponsee.zip,
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
    let sponsee = {id: this.state.id, username: this.state.username, password: this.state.password, age: this.state.age, gender: this.state.gender, bio: this.state.bio, email: this.state.email, address: this.state.address}
    this.props.editSponsee(sponsee)
    this.props.handleEdit()
  }

  render(){
    console.log(this.props.sponsee)
    return (
      <div className="opaqueFormDiv">
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
    error: state.sponseesReducer.error
  }
}

export default connect(mapStateToProps, { editSponsee })(SponseeEdit)
