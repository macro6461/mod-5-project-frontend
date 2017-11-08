import React, { Component } from 'react'
import Facilities from './facility/Facilities'
import { Link, Route, withRouter } from 'react-router-dom'
import SponsorHome from './sponsor/SponsorHome'
import SponseeHome from './sponsee/SponseeHome'
import { removeSponsorError } from '../actions/sponsorActions'
import { removeSponseeError } from '../actions/sponseeActions'
import Home from './Home'
import { connect } from 'react-redux'

class Nav extends Component {
  constructor(props){
    super(props)
    this.state ={
      clicked: false,
      showClass: true
    }
  }


  removerErrors = () =>{
    this.props.removeSponseeError()
    this.props.removeSponsorError()
  }

  render(){

    const sponsorOrSponseeOrUndefined = () =>{
      if (localStorage.role === undefined){
        return (
          <div>
            <Link className="link" to="/sponsors" onClick={this.removerErrors}>Sponsor</Link><Link className="link" to="/sponsees" onClick={this.removerErrors}>Sponsee</Link>
          </div>
        )
      } else if (localStorage.role === "sponsor"){
        return <Link className="link" to="/sponsors" onClick={this.removerErrors}>Sponsor</Link>
      } else if (localStorage.role === "sponsee"){
        return <Link className="link" to="/sponsees" onClick={this.removerErrors}>Sponsee</Link>
      }
    }
    return(
      <div className="navDiv">
        {sponsorOrSponseeOrUndefined()}
        <div className="navDiv">
      <Link className="link" to="/facilities" onClick={this.removerErrors}>Facilities</Link>
      <Link className="link" to="/" onClick={this.removerErrors}>Home</Link>
      <Route exact path="/" component = {Home} />
      <Route exact path='/sponsors' render={(props) => (
          <SponsorHome remove={this.props.remove} submit={this.props.submit}/>
        )}/>
      <Route exact path='/sponsees' render={(props) => (
          <SponseeHome remove={this.props.remove} submit={this.props.submit}/>
        )}/>
      <Route exact path='/facilities' render={(props) => (
            <Facilities remove={this.props.remove} submit={this.props.submit}/>
          )}/>
          </div>
      </div>
  )}
}

const mapStateToProps = (state) => {

  return{
    sponsorError: state.sponsorsReducer.error,
    sponseeError: state.sponseesReducer.error
  }
}

export default withRouter(connect(mapStateToProps, {removeSponsorError, removeSponseeError})(Nav))
