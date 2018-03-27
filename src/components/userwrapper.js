import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import '../styles/userwrapper.css'
import User from '../components/user'
import Loader from '../components/loader'
import Profile from '../components/profile'
import { connect } from 'react-redux'
const config = require('../config.json')

class UsersWrapper extends Component {
  constructor() {
    super()
    this.state = {
      loaded: false
    }
  }
  componentDidMount() {
    fetch(`${config.baseURL}/users`).then((res) => {
      res.json().then((data) => {
        this.props.updateData({ data: data.data })
        this.setState({
          loaded: true
        })
      })
    })
  }

  render() {
    const AllUser = () => {
      var div = <Loader />
      if (this.state.loaded && !this.state.clickStat) {
        var usersDiv = this.props.user.data.map((user) => {
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
const mapStateToProps = (state) => {
  return {
    user: state.users_data
  }
}
const mapDispatchToProps = dispatch => {
  return {
    updateData: (data) => {
      dispatch({
        type: 'TOP_USERS',
        data
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (UsersWrapper)
