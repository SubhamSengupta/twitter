import React from 'react';

class LogButtons extends React.Component{
  render () {
    return (
      <div className="buttons">
        <p onClick={() => {this.props.changeState(1)}}>Login</p>
        <p onClick={() => {this.props.changeState(2)}}>Sign up</p>
      </div>
    )
  }
}

export default LogButtons;