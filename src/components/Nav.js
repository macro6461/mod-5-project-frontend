import React, { Component } from 'react'
import Facilities from './facility/Facilities'
import { Link, Route, withRouter, Redirect } from 'react-router-dom'
import SponsorHome from './sponsor/SponsorHome'
import SponseeHome from './sponsee/SponseeHome'
import { removeSponsorError, getCurrentSponsorRole } from '../actions/sponsorActions'
import { removeSponseeError, getCurrentSponseeRole } from '../actions/sponseeActions'
import Home from './Home'
import { connect } from 'react-redux'
import {browserLocation} from 'browser-location'
import NextStepLogo from '../TheNextStepLogo3.png'



class Nav extends Component {

  state ={
      clicked: false,
      showClass: true,
      role: ""
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

checkLoggedIn = () => {
    if (localStorage.role === "sponsor"){
      return <Redirect to="/sponsors"/>
    } else if (localStorage.role === "sponsee") {
      return <Redirect to="/sponsees"/>
    }
}

  removeErrors = () =>{
    this.props.removeSponseeError()
    this.props.removeSponsorError()
  }

  render(){
    // this.checkLoggedIn()
    debugger
    const sponsorOrSponseeOrUndefined = () =>{
      if (this.props.sponsorRole === '' && this.props.sponseeRole === ''){
          return (
            <div>
              <Link className="link" to="/sponsors" onClick={this.removeErrors}>Sponsor</Link><Link className="link" to="/sponsees" onClick={this.removeErrors}>Sponsee</Link>
            </div>
          )
      } else if (this.props.sponsorRole === undefined && this.props.sponseeRole === undefined){
        return (
          <div>
            <Link className="link" to="/sponsors" onClick={this.removeErrors}>Sponsor</Link><Link className="link" to="/sponsees" onClick={this.removeErrors}>Sponsee</Link>
          </div>
        )
      }
      else if (this.props.sponsorRole === null && this.props.sponseeRole === null){
        return (
          <div>
            <Link className="link" to="/sponsors" onClick={this.removeErrors}>Sponsor</Link><Link className="link" to="/sponsees" onClick={this.removeErrors}>Sponsee</Link>
          </div>
        )
      } else if (this.props.sponsorRole === "sponsor" && this.props.sponseeRole === ""){
        return(
        <div>
          <Link className="link" to="/sponsors" onClick={this.removeErrors}>Sponsor</Link>
        </div>
      )
      } else if (this.props.sponsorRole === "" && this.props.sponseeRole === "sponsee" ){
        return (
          <Link className="link" to="/sponsees" onClick={this.removeErrors}>Sponsee</Link>
        )
      }
    }
    return(
      <div className="navBar">
      <div className="navDiv">
        <img className="navLogo" src={NextStepLogo}/>
        {sponsorOrSponseeOrUndefined()}
      <Link className="link" to="/facilities" onClick={this.removeErrors}>Facilities</Link>
      <Link className="link" to="/" onClick={this.removeErrors}>Home</Link>
      </div>
    <Route exact path="/" component = {Home} />

    <Route exact path='/sponsors' render={(props) => {

          if (localStorage.getItem('role') === "sponsor" || localStorage.getItem('role') === null){
            return (<SponsorHome remove={this.props.remove} submit={this.props.submit}/>)
          } else {
            return (<Redirect to='/sponsees'/>)
          }
        }}/>
      <Route exact path='/sponsees' render={(props) => {
              // this.checkLoggedIn()
              if (localStorage.getItem('role') === "sponsee" || localStorage.getItem('role') === null){
                return (<SponseeHome remove={this.props.remove} submit={this.props.submit}/>)
              } else {
                return (<Redirect to='/sponsors'/>)
              }
            }}/>
      <Route exact path='/facilities' render={(props) => (
            <Facilities remove={this.props.remove} submit={this.props.submit}/>
          )}/>
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
