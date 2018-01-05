import React, { Component } from 'react'
import { addSponsee, removeSponseeError } from '../../actions/sponseeActions'
import { connect } from 'react-redux';
import { Button, Checkbox, Form, Icon} from 'semantic-ui-react'

class SponseeSignUp extends Component {

  state = {
    username: "",
    password: "",
    age: "",
    gender: "",
    bio: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    local: false,
    clicked: false
  }

  handleOnChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    debugger
    event.preventDefault()
    let sponsee = {username: this.state.username, password: this.state.password, age: this.state.age, gender: this.state.gender, bio: this.state.bio, email: this.state.email, street: this.state.street, city: this.state.city, state: this.state.state, zip: this.state.zip}
    this.props.addSponsee(sponsee)
    this.setStateAfterLocal()
  }

  afterSubmit = (sponsee) => {
    this.setLocalStorage(sponsee)
  }

  setClicked = (event) => {
    event.preventDefault()

    this.setState({
      clicked: !this.state.clicked
    }, this.props.changeClicked(this.state.clicked) )
    this.props.removeSponseeError()
  }

  checkBioCount = () => {
    console.log(this.state.bio.split("").length)
      this.checkStyle()
      return 200 - (this.state.bio.split("").length)
  }

  checkStyle = () => {
    if (this.state.bio.split("").length > 190){
      return {color: 'red'}
    } else {
      return {color: 'black'}
    }
  }


  setStateAfterLocal = () => {
    this.setState({
      username: "",
      password: "",
      age: this.state.age,
      gender: this.state.gender,
      email: "",
      street: this.state.street,
      city: this.state.city,
      state: this.state.state,
      zip: this.state.zip
    })
  }

  render(){
    const checkStyle = this.checkStyle()
    return(
      <div>
      <div className="container">
      </div>
        <div className="signUp">

        <Form className="signUpForm" onSubmit={this.handleSubmit}>
        <Icon className="close" size="large" style={{color: 'red', marginLeft: '99%'}} onClick={this.setClicked}/>
          <h1>Sponsee Sign Up</h1>
          {this.props.error
            ? <h3 className="pleaseTryAgain">{this.props.error}</h3>
            : null
          }
          <Form.Group widths='equal'>
            <Form.Input className="mediumInput" label='Username' name="username" value={this.state.username} onChange={this.handleOnChange} required/>
          <Form.Input className="mediumInput" label='Password' type="password" name="password" value={this.state.password} onChange={this.handleOnChange} required/>
        <Form.Input className="mediumInput" label='Gender' type="text" name="gender" value={this.state.gender} onChange={this.handleOnChange} required/>
           <Form.Input className="shorterInput" label='Age' type="text" name="age" value={this.state.age} onChange={this.handleOnChange} required/>
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Input className="mediumInput" label='Street' name="street" value={this.state.street}  onChange={this.handleOnChange} required/>
          <Form.Input className="mediumInput" label='City' name="city" value={this.state.city} onChange={this.handleOnChange} required/>
        <Form.Input className="shorterInput" label='State' name="state" value={this.state.state}  onChange={this.handleOnChange} maxLength="2" required/>
      <Form.Input className="mediumInput" label='Zip' name="zip" value={this.state.zip}  onChange={this.handleOnChange} maxLength="5" required/>
          </Form.Group>
          <p>*address will not be public</p>
          <Form.TextArea label='About' name="bio" value={this.state.bio} placeholder='Tell us more about you...' onCount={this.checkBioCount} onChange={this.handleOnChange} maxLength="200" required/>
        <p style={checkStyle} onChange={this.checkStyle}>remaining characters: {this.checkBioCount()}</p>
        <Form.Input label='Email' name="email" value={this.state.email} onChange={this.handleOnChange} required/>
      <Form.Button className="save" type="submit">Save</Form.Button>


       </Form>
        </div>

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.sponseesReducer.error
  }
}

export default connect(mapStateToProps, {addSponsee, removeSponseeError})(SponseeSignUp)
