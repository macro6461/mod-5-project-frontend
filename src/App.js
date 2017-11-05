import React, { Component } from 'react';
import './App.css';
import Nav from './components/Nav'

class App extends Component {

  state = {
    username: '',
    local: false
  }

  componentDidMount = () => {
    if (localStorage.length > 0){
      this.setState({
        local: true,
        username: localStorage.username
      })
    } else {
      this.setState({
        local: false,
        username: ''
      })
    }
  }

  removeLocalStorage = () => {
    localStorage.clear()
    this.setState({
      local: false
    })
  }

  retrieveSubmitData = (data) => {
    this.setState({
      local: data,
      username: localStorage.username
    })
  }

  render() {
    return (
      <div className="App">
        <h1>The Next Step</h1>
      <Nav remove={this.removeLocalStorage} submit={this.retrieveSubmitData} navClicked={this.navClicked} navUnClick={this.navUnClick}/>

      </div>
    );
  }
}



export default App
