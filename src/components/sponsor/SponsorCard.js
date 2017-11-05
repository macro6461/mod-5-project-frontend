import React, { Component } from 'react'

export default class SponseeCard extends Component{
  render(){
    const email = "mailto:" + this.props.sponsor.email
    return(
      <div className="sponseeCard">
        <h2>{this.props.sponsor.username}, {this.props.sponsor.age}, {this.props.sponsor.gender}</h2>
      <p>{this.props.sponsor.bio}</p>
    <a className="mailto" href={email}>email {this.props.sponsor.username}</a>
      </div>
    )
  }
}
