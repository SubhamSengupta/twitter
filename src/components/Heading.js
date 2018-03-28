import React from 'react';
import '../styles/heading.css'

class Heading extends React.Component{
  render () {
    return  (
      <div className="heading">
        <a href={'/'}><div className="img"></div></a>
      </div>
    )
  }
}

export default Heading;