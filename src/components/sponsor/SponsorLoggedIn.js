import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import SponseeCard from '../sponsee/SponseeCard'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { fetchSponseesRequest } from '../../actions/actions'
import { fetchSponseesRequestResolved } from '../../actions/actions'



class SponsorLoggedIn extends Component {

  componentDidMount = () => {
    this.props.fetchSponseesRequest()
  }

  render(){
    const sponsees = this.props.sponsees.map((sponsee, index) => {
      return(
        <SponseeCard key={index} sponsee={sponsee} />
      )
    })
    return(
      <div>
        <h3> Welcome Sponsor {localStorage.username}!</h3>
        <p>You are now logged in.</p>
      <Link to="/"><button onClick={this.props.remove}>Sign Out</button></Link>
        <br/>
      <div className="sponseeDiv">
        {sponsees}
      </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    sponsees: state.sponseesReducer.sponsees
  }
}

export default connect(mapStateToProps, {fetchSponseesRequest, fetchSponseesRequestResolved})(SponsorLoggedIn)
