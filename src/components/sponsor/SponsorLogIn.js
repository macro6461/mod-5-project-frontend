import React, { Component } from 'react'
import SponsorSignUp from './SponsorSignUp'
import { connect } from 'react-redux';
import { loginSponsor, removeSponsorError } from '../../actions/sponsorActions'
import { Button, Checkbox, Form} from 'semantic-ui-react'

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
    this.props.removeSponsorError()
  }

  handleSubmit = (event) => {
    debugger
    event.preventDefault()
    const token = localStorage.getItem("jwt")
    let sponsor = {username: this.state.username, password: this.state.password}
    this.props.loginSponsor(sponsor)
    this.setStateAfterLocal()
  }

  setStateAfterLocal = () => {

    this.setState({
      username: '',
      password: ''
    })
  }

  setClicked = (data) => {
    this.setState({
      clicked: data
    })
  }

  changeClicked = (data) => {
    this.setState({
      clicked: data
    })
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
  <br/>
  <br/>

<h3> Sponsor Login </h3>
      <Form className="loginForm" onSubmit={this.handleSubmit}>
        {this.props.error
          ?  <h3 className="notFound">Sponsor Not Found!</h3>
          : null
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

</div>
}
    { this.state.clicked === true
      ? null
      : <div><h3> Don't have an account?</h3>
      <Button onClick={this.clicked}>Sign Up</Button>
      </div>
    }
      { this.state.clicked === true
        ? <SponsorSignUp changeClicked={this.changeClicked} submit={this.props.submit} clicked={this.setClicked}/>
        : null
      }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.sponsorsReducer.error
  }
}

export default connect(mapStateToProps, {loginSponsor, removeSponsorError})(SponsorLogIn)
