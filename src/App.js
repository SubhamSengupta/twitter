import React, { Component } from 'react';
import './styles/App.css';
import Heading from './components/Heading'
import UsersWrapper from './components/Userwrapper'
import Footer from './components/Footer'


class App extends Component {
  render() {
    return (
        <div>
          <Heading/>
          <UsersWrapper />
          <Footer />
        </div>
    )
  }
}

export default App
