import React, { Component } from 'react'
import SponsorLoggedIn from './SponsorLoggedIn'
import SponsorLogIn from './SponsorLogIn'


export default class SponsorHome extends Component {

  render(){
    return(

      <div>
        <h2>Sponsor Home</h2>
        {localStorage.length === 0
          ? <SponsorLogIn submit={this.props.submit}/>
          : <SponsorLoggedIn remove={this.props.remove} submit={this.props.submit}/>
        }
      </div>
    )
  }
}
