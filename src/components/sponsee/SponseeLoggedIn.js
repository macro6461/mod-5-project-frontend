import React, { Component } from 'react'
import SponsorCard from '../sponsor/SponsorCard'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { fetchSponsorsRequest } from '../../actions/actions'
import { fetchSponsorsRequestResolved } from '../../actions/actions'

class SponseeLoggedIn extends Component {

  componentDidMount = () => {
    this.props.fetchSponsorsRequest()
  }

  render(){
    const sponsors = this.props.sponsors.map((sponsor, index) => {
      return(
        <SponsorCard key={index} sponsor={sponsor} />
      )
    })
    return(
      <div>
        <h3> Welcome Sponsee {localStorage.username}!</h3>
        <p>You are now logged in.</p>
        <Link to="/"><button onClick={this.props.remove}>Sign Out</button></Link>
        <br/>
      <div className="sponseeDiv">
        {sponsors}
      </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    sponsors: state.sponsorsReducer.sponsors
  }
}

export default connect(mapStateToProps, {fetchSponsorsRequest, fetchSponsorsRequestResolved})(SponseeLoggedIn)
