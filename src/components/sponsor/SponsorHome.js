import React, { Component } from 'react'
import SponsorLoggedIn from './SponsorLoggedIn'
import SponsorLogIn from './SponsorLogIn'
import { connect } from 'react-redux';

class SponsorHome extends Component {

  render(){
    
    return(

      <div>
        {localStorage.getItem('jwt')
          ? <SponsorLoggedIn remove={this.props.remove} submit={this.props.submit}/>
          : <SponsorLogIn submit={this.props.submit}/>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  
  return {
    sponsees: state.sponseesReducer.sponsees,
    currentSponsor: state.sponsorsReducer.sponsor
  }
}

export default connect(mapStateToProps)(SponsorHome)
