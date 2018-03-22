import React, { Component } from 'react';
import './App.css';
import Heading from './components/heading.js'
import LogDiv from './components/logdiv.js'

class App extends Component {
  constructor() {
    super();
    this.state = {
      login: false,
      signup: false
    }
    this.changeState = this.changeState.bind(this)
  }
  changeState(flag){
    switch(flag){
      case 1: this.state.signup ? undefined : this.setState({login: true});
              break;
      case 2: this.state.login ? undefined : this.setState({signup: true});
              break;
      case 3: this.setState({login: false, signup: false})
    }
    
  }
  render() {
    const logDiv = (this.state.login || this.state.signup )
    ? (this.state.login 
      ? <LogDiv changeState={this.changeState} logType="Login"/> 
      : <LogDiv changeState={this.changeState} logType="Sign up"/>)
    : undefined; 
    return (
    <div>
      <Heading changeState={this.changeState}/>
      {logDiv}
    </div>
    )
  }
}

export default App;
