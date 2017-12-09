import React, { Component } from 'react'
import { Image } from 'semantic-ui-react'
import NextStepLogo from '../TheNextStepLogo3.png'


export default class Loading extends Component{
  render(){
    return(
      <div>
          <img src={NextStepLogo}/>
      </div>
    )
  }
}
