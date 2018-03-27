import React, { Component } from 'react';
import './styles/App.css';
import Heading from './components/heading'
import UsersWrapper from './components/userwrapper'
import Footer from './components/footer'


class App extends Component {
  render() {
    return (
        <div>
          <Heading changeState={this.changeState} />
          <UsersWrapper />
          <Footer />
        </div>
    )
  }
}

export default App
