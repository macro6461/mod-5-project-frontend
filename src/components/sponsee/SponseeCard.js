import React, { Component } from 'react'

export default class SponseeCard extends Component{
  render(){
    const email = "mailto:" + this.props.sponsee.email
    return(
      <div className="sponseeCard">
        <h2>{this.props.sponsee.username}, {this.props.sponsee.age}, {this.props.sponsee.gender}</h2>
        <p>{this.props.sponsee.bio}</p>
      <a className="mailto" href={email}>email {this.props.sponsee.username}</a>
      </div>
    )
  }
}
