import React, { Component } from 'react'
import { Form, Button } from 'semantic-ui-react'


export default class SponseeConfirmDelete extends Component{

  state = {
    confirm: false,
    password: ""
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.confirmDelete(this.state.password)
  }

  handleBack = () => {
    this.props.confirmDelete(false)
  }

  render(){
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
    <Form.Field>
      <label>confirm password</label>
    <input name="password" type="password" value={this.state.password} onChange={this.handleChange} required/>
    </Form.Field>

    <Button type='submit'>Submit</Button>
    <Button onClick={this.handleBack}>back</Button>
  </Form>
      </div>
    )
  }

}
