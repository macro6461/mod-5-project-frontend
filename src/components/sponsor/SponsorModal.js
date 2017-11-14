import React, { Component } from 'react'
import { Card, Button } from 'semantic-ui-react'

export default class SponsorModal extends Component{

  unClick = () => {
    this.props.openModal()
  }

  render(){
    console.log(this.props.sponsor.distance)
    const email = "mailto:" + this.props.sponsor.email
    return(
      <div>
      <div className="container">
      </div>
      <div className="sponseeModal">
        <h2>{this.props.sponsor.username} | {this.props.sponsor.age} | {this.props.sponsor.gender}</h2>
      {this.props.sponsor.distance === undefined
        ? <h4>Distance: No Data</h4>
        : <h4>Distance: {Math.round(this.props.sponsor.distance)}</h4>
      }
      <p>{this.props.sponsor.bio}</p>
    <a className="mailto" href={email}>email {this.props.sponsor.username}</a>
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
