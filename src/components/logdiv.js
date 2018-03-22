import React from 'react';

class LogDiv extends React.Component {
  render() {
    const logType = this.props.logType;
    return (
      <div className="log-div">
        <div className="cross" onClick={() => {this.props.changeState(3)}}>x</div>
        <h1>{logType}</h1>
      </div>
    )
  }
}

export default LogDiv