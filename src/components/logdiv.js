import React from 'react';
import '../styles/logdiv.css'

class LogDiv extends React.Component {
  constructor(){
    super();
    this.state = {
      email: '',
      password: '',
      passwordRe: ''
    }
  }
  validate = (e) => {
    e.preventDefault();
    if ( this.props.logType === 'Sign up'){
      if ( this.state.password === this.state.passwordRe){
        this.signUp();
      } else {
        this.showError('Passwords do not Match');
      }
    } else {
      this.signIn();
    }
  }
  signIn = () => {
    console.log('signed with: ',this.state.email, this.state.password)
    this.props.changeState(3);
  }
  signUp = () => {
    console.log('Signed up with', this.state.email, this.state.password)
    this.props.changeState(3);
  }
  showError = (err) => {
    alert(err);
  }
  updateState = () => {
    let passRe = (this.refs.c === undefined) ? this.state.passwordRe : this.refs.c.value
    this.setState({
      email: this.refs.a.value,
      password: this.refs.b.value,
      passwordRe: passRe
    })
  }
  render() {
    const logType = this.props.logType;
    const repeatPassword = this.props.logType === 'Sign up' ? 
      <input type="password" ref="c" placeholder="again" minLength="5" onChange={this.updateState} required/> : undefined;
    const signType = repeatPassword ? 'Sign up' : 'Log in';
    return (
      <div className="log-div">
        <div className="cross" onClick={() => {this.props.changeState(3)}}>x</div>
        <h1>{logType}</h1>
        <form onSubmit={this.validate}>
          <input type="email" placeholder="email" ref="a" onChange={this.updateState} required/>
          <input type="password" placeholder="password" minLength="5" ref="b" onChange={this.updateState} required/>
          {repeatPassword}
          <input type="submit" value={signType}/>
        </form>
      </div>
    )
  }
}

export default LogDiv