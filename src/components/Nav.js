import React, { Component } from 'react'
import Facilities from './facility/Facilities'
import { Link, Route, withRouter } from 'react-router-dom'
import SponsorHome from './sponsor/SponsorHome'
import SponseeHome from './sponsee/SponseeHome'
import { removeSponsorError, getCurrentSponsorRole } from '../actions/sponsorActions'
import { removeSponseeError, getCurrentSponseeRole } from '../actions/sponseeActions'
import Home from './Home'
import { connect } from 'react-redux'

let localRole = ""

class Nav extends Component {
  constructor(props){
    super(props)
    this.state ={
      clicked: false,
      showClass: true,
      role: ""
    }
  }

  componentDidMount = () =>{
    if (localStorage.getItem("role") === null || localStorage.getItem("role") === undefined){
      this.props.getCurrentSponsorRole("")
      this.props.getCurrentSponseeRole("")
    } else {
      if (localStorage.getItem("role") === "sponsor"){
        this.props.getCurrentSponsorRole(localStorage.getItem("role"))
      } else {
        this.props.getCurrentSponseeRole(localStorage.getItem("role"))
      }
    }
  }

  removeErrors = () =>{
    this.props.removeSponseeError()
    this.props.removeSponsorError()
  }

  render(){
    console.log(this.state)
    const sponsorOrSponseeOrUndefined = () =>{
      if (this.props.sponsorRole === '' && this.props.sponseeRole === ''){
          return (
            <div>
              <Link className="link" to="/sponsors" onClick={this.removeErrors}>Sponsor</Link><Link className="link" to="/sponsees" onClick={this.removeErrors}>Sponsee</Link>
            </div>
          )
      } else if (this.props.sponsorRole === null && this.props.sponseeRole === null){
        return (
          <div>
            <Link className="link" to="/sponsors" onClick={this.removeErrors}>Sponsor</Link><Link className="link" to="/sponsees" onClick={this.removeErrors}>Sponsee</Link>
          </div>
        )
      } else if (this.props.sponsorRole === "sponsor" && this.props.sponseeRole === ""){
        return <Link className="link" to="/sponsors" onClick={this.removeErrors}>Sponsor</Link>
      } else if (this.props.sponsorRole === "" && this.props.sponseeRole === "sponsee" ){
        return <Link className="link" to="/sponsees" onClick={this.removeErrors}>Sponsee</Link>
      }
    }
    return(
      <div className="navDiv">
        {sponsorOrSponseeOrUndefined()}
        <div className="navDiv">
      <Link className="link" to="/facilities" onClick={this.removeErrors}>Facilities</Link>
    <Link className="link" to="/" onClick={this.removeErrors}>Home</Link>
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
    sponsorRole: state.sponsorsReducer.role,
    sponseeRole: state.sponseesReducer.role,
    sponsorError: state.sponsorsReducer.error,
    sponseeError: state.sponseesReducer.error
  }
}

export default withRouter(connect(mapStateToProps, {removeSponsorError, removeSponseeError, getCurrentSponseeRole, getCurrentSponsorRole})(Nav))
