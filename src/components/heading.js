import React from 'react';
import LogButtons from './logButtons.js'

class Heading extends React.Component{
  render () {
    return  (
      <div className="heading">
        <a href={'/'}><div className="img"></div></a>
        <LogButtons {...this.props}/>
      </div>
    )
  }
}

export default Heading;