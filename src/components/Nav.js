import React, { Component } from 'react'
import Facilities from './Facilities'
import { Link, Route } from 'react-router-dom'
import SponsorHome from './sponsor/SponsorHome'
import SponseeHome from './sponsee/SponseeHome'
import Home from './Home'

class Nav extends Component {
  constructor(props){
    super(props)
    this.state ={
      clicked: false,
      showClass: true
    }
  }

  render(){
    const sponsorOrSponseeOrUndefined = () =>{
      if (localStorage.role === undefined){
        return (
          <div>
            <Link className="link" to="/sponsors" onClick={this.props.navClicked}>Sponsor</Link><Link className="link" to="/sponsees" onClick={this.props.navClicked}>Sponsee</Link>
          </div>
        )
      } else if (localStorage.role === "sponsor"){
        return (<Link className="link" to="/sponsors" onClick={this.props.navClicked}>Sponsor</Link>)
      } else if (localStorage.role === "sponsee"){
        return (<Link className="link" to="/sponsees" onClick={this.props.navClicked}>Sponsee</Link>)
      }
    }

    return(
      <div>
        {sponsorOrSponseeOrUndefined()}
      <Link className="link" to="/facilities" onClick={this.props.navClicked}>Facilities</Link>
      <Link className="link" to="/" onClick={this.props.navUnClick}>Home</Link>
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
  )}
}

export default Nav
