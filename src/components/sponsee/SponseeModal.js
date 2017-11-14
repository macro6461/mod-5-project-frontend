import React, { Component } from 'react'
import { Card, Button } from 'semantic-ui-react'

export default class SponseeModal extends Component{

  unClick = () => {
    this.props.openModal()
  }

  render(){
    const distance = Math.round(this.props.sponsee.distance.split(" ")[0])
    const email = "mailto:" + this.props.sponsee.email
    return(
      <div>
      <div className="container">
      </div>
      <div className="sponseeModal">
        <h2>{this.props.sponsee.username} | {this.props.sponsee.age} | {this.props.sponsee.gender}</h2>
      {distance === undefined
        ? <h4>Distance: No Data</h4>
        : <h4>Distance: {distance} miles away</h4>
      }
      <p>{this.props.sponsee.bio}</p>
    <a className="mailto" href={email}>email {this.props.sponsee.username}</a>
  <br/>
  <br/>
  <br/>
  <br/>
  <Button onClick={this.unClick}>back</Button>
</div>
</div>
    )
  }
}
