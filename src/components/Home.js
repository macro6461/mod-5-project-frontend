import React, { Component } from 'react'
import { Image } from 'semantic-ui-react'
import NextStepLogo from '../TheNextStepLogo3.png'

export default class Home extends Component {

  state = {
    div2Display: 'none',
    div3Display: 'none',
    description: 'none'
  }

  componentDidMount = () => {
    let div2 = this.changeHomeDiv2Opacity
    let div3 = this.changeHomeDiv3Opacity
    let description = this.changeHomeDescription

    setTimeout(function(){

      div2()
    }, 2000)
    setTimeout(function(){

      div3()
    }, 4000)
    setTimeout(function(){

      description()
    }, 6000)
  }

  changeHomeDiv2Opacity = () => {


      this.setState({
        div2Display: 'block'
      })
  }

  changeHomeDiv3Opacity = () => {

    this.setState({
      div3Display: 'block'
    })
  }

  changeHomeDescription = () => {

    this.setState({
      description: 'block'
    })
  }

  render(){
    return(

      <div className="home">
        <br/>
        <br/>
        <br/>


      {/* <Image src={NextStepLogo} alt="embrace"/> */}
      <Image className="openImg" src="https://ak0.picdn.net/shutterstock/videos/4691870/thumb/3.jpg?i10c=img.resize" alt="embrace"/>
    <div id="homeDiv1opacity">
    <div className="homeDiv1">
    <h2 className="homeHeader">"No personal calamity is so crushing that something true and great can’t be made of it."</h2>
    <h4 className="homeSmallerHeader">-Bill W. Founder of Alcoholic Anonymous</h4>
  </div>
  </div>
  <div id="homeDiv2opacity" style={{display: this.state.div2Display}}>
      <div className="homeDiv2">
        <h2 className="homeHeader"> Welcome to The Next Step! Your online resource for addiction and substance abuse.</h2>
    </div>
  </div>
  <div id="homeDiv3opacity" style={{display: this.state.div3Display}}>
      <div className="homeDiv3">
        <h2 className="homeHeader">Whether you are on step twelve or trying to reach step one, the next step is a step forward.</h2>
        {/* <p class="madeFooter">made with <i class="red heart icon" size="large"></i>by <a className="madeByAnchor" href="https://macro6461.github.io/">&copy;Matthew Croak Media 2017</a></p> */}
      </div>
    </div>

    <div className="homeDescription" style={{display: this.state.description}}>
        <h1 className="homeBigHeader">To see all available sponsors in your area, please sign in under the sponsee tab.</h1>
      <h1 className="homeBigHeader">If you're looking for a chance to sponsor someone, please sign in under the sponsor tab.</h1>
    <h1 className="homeBigHeader">You don't have to have to sign in to find facilities near you. All you have to do is click the facilities tab.</h1>
          {/* <p class="madeFooter">made with <i class="red heart icon" size="large"></i>by <a className="madeByAnchor" href="https://macro6461.github.io/">&copy;Matthew Croak Media 2017</a></p> */}
        </div>
      </div>
    )
  }
}
