import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import '../styles/userwrapper.css'
import User from '../components/user'
import Loader from '../components/loader'
import Profile from '../components/profile'
const config = require('../config.json')

class UsersWrapper extends Component {
  constructor() {
    super()
    this.state = {
      users: '',
      loaded: false,
      followersClick: false,
      clickedUser: ''
    }
  }
  componentDidMount() {
    fetch(`${config.baseURL}/users`).then((res) => {
      res.json().then((data) => {
        this.setState({
          users: data.data,
          loaded: true
        })
      })
    })
  }
  changeClickStat = (user) => {
    if (this.state.clickStat) {
      this.setState({
        followersClick: !this.state.followersClick,
        clickedUser: user,
      })
    } else {
      this.setState({
        clickStat: true,
        clickedUser: user
      })
    }
  }

  render() {

    const AllUser = () => {
      var div = <Loader />
      if (this.state.loaded && !this.state.clickStat) {
        var usersDiv = this.state.users.map((user) => {
          return <Link to={`users/${user.data.screen_name}`}><User data={user} key={user.name} /></Link>
        })
        div = <div className="users">{usersDiv}</div>
      }
      return div
    }
    const Person = ({ match }) => {
      return <Profile user={match.params.user}/>
    }
    return (
      <Router>
        <div className="users-wrapper">
          <Route exact path="/" component={AllUser} />
          <Route path={"/users/:user"} component={Person} />
        </div>
      </Router>
    )
  }
}

export default UsersWrapper
