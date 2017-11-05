import React, { Component } from 'react'
import SponseeLoggedIn from './SponseeLoggedIn'
import SponseeLogIn from './SponseeLogIn'


export default class SponseeHome extends Component {
  render(){
    return(

      <div>
        {localStorage.length === 0
          ? <SponseeLogIn submit={this.props.submit}/>
          : <SponseeLoggedIn remove={this.props.remove} submit={this.props.submit}/>
        }
      </div>
    )
  }
}
