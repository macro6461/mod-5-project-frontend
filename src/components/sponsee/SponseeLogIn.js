import React, { Component } from 'react'
import SponseeSignUp from './SponseeSignUp'
import { connect } from 'react-redux';
import { loginSponsee, removeSponseeError } from '../../actions/sponseeActions'
import { Button, Checkbox, Form} from 'semantic-ui-react'

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
    this.props.removeSponseeError()
  }
  handleSubmit = (event) => {
    event.preventDefault()
    const token = localStorage.getItem("jwt")
    let sponsee = {username: this.state.username, password: this.state.password}
    this.props.loginSponsee(sponsee)
    this.setStateAfterLocal()
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

  changeClicked = (data) => {
    this.setState({
      clicked: data
    })
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
      <br/>
    <br/>
    {this.state.clicked === true
    ? null
    : <div>
    <h3> Please Login </h3>
  <Form className="loginForm" onSubmit={this.handleSubmit}>
            {this.props.error === null
              ? null
              : <h3 className="notFound">Sponsee Not Found!</h3>
            }
      <Form.Field>
        <label>Username</label>
      <input placeholder='Username' name="username" type="text" value={this.state.username} onChange={this.handleOnChange} required/>
      </Form.Field>
      <Form.Field>
        <label>Password</label>
      <input placeholder='Password' name="password" type="password" value={this.state.password} onChange={this.handleOnChange} required/>
      </Form.Field>
      <Button type='submit'>Submit</Button>
    </Form>
  <br/>
  <br/>
  <br/>
  <br/>
  <br/>
  <br/>
  <br/>
  <br/>
</div>
}
{ this.state.clicked === true
  ? <div><h3 className="backH3">Bla</h3>
  <Button onClick={this.clicked}>back</Button></div>
  : <div><h3> Don't have an account?</h3>
  <Button onClick={this.clicked}>Sign Up</Button>
  </div>
}
  { this.state.clicked === true
    ? <SponseeSignUp changeClicked={this.changeClicked} submit={this.props.submit} clicked={this.setClicked}/>
    : null
  }
  </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.sponseesReducer.error
  }
}



export default connect(mapStateToProps, {loginSponsee, removeSponseeError})(SponseeLogIn)
