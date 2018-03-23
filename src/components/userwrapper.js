import React, {Component} from 'react'
import '../styles/userwrapper.css'
import User from '../components/user'
const config = require('../config.json')

class UsersWrapper extends Component {
  constructor() {
    super()
    this.state = {
      users:'',
      loaded: false
    }
  }
  componentDidMount() {
    fetch(`${config.baseURL}/users`).then((res) =>{
      res.json().then((data) => {
        this.setState({
          users: data.data,
          loaded: true
        })
      })
    })
  }
  
  render() {
    var usersDiv = <h1>Hello</h1>
    if ( this.state.loaded){
      usersDiv = this.state.users.map((user) => {
        return <User data={user}/>
      })
    }
    return (
      <div className="users-wrapper">
        {usersDiv}
      </div>
    )
  }
}

export default UsersWrapper
