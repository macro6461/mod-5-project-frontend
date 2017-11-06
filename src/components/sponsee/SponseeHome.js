import React, { Component } from 'react'
import SponseeLoggedIn from './SponseeLoggedIn'
import SponseeLogIn from './SponseeLogIn'
import { connect } from 'react-redux';

class SponseeHome extends Component {

  render(){

    return(

      <div>
        {localStorage.getItem('jwt')
          ? <SponseeLoggedIn remove={this.props.remove} submit={this.props.submit}/>
          : <SponseeLogIn submit={this.props.submit}/>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {

  return {
    sponsors: state.sponsorsReducer.sponsors,
    currentSponsee: state.sponseesReducer.sponsee
  }
}

export default connect(mapStateToProps)(SponseeHome)
