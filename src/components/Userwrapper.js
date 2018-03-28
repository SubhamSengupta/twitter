import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import '../styles/userwrapper.css'
import User from '../components/User'
import Loader from '../components/Loader'
import Profile from '../components/Profile'
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
        var usersDiv = this.props.top_users.map((user) => {
          return <Link to={`users/${user.data.screen_name}`} key={user.data.screen_name}><User data={user} /></Link>
        })
        div = <div className="users">{usersDiv}</div>
      }
      return div
    }
    const Person = ({ match }) => { 
      
      if ( !this.props.user_profile ||  this.props.user_profile.profile.screen_name !== match.params.user ) {
        this.props.updateUserProfileData(match.params.user)
      }


      return this.props.user_profile && this.props.user_profile.profile.screen_name === match.params.user 
        ? <Profile />
        : <Loader />
      
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
var fetchProfileData = (user) => {
  return function (dispatch) {
    return fetchData(user).then((data) => {
      return dispatch({
        type: 'UPDATE_USER_PROFILE',
        data
      })
    })
  }
}
var fetchData = (user) => {
  return new Promise((resolve, reject) => {
    var requests = []
    requests.push(fetchFromServer(`${config.baseURL}/users/${user}`))
    requests.push(fetchFromServer(`${config.baseURL}/followers/${user}`))
    requests.push(fetchFromServer(`${config.baseURL}/tweets/${user}`))
    var data;
    Promise.all(requests).then((res) => {
      resolve ({
        profile: res[0],
        followers: res[1],
        posts: res[2]
      })
    })
  })
}
var fetchFromServer = (url) => {
  return new Promise((resolve, reject) => {
    fetch(url).then((res) => {
      res.json().then((data) => {
        resolve(data)
      })
    })
  })
}
const mapStateToProps = (state) => {
  return state
}
const mapDispatchToProps = dispatch => {
  return {
    updateData: (data) => {
      dispatch({
        type: 'FETCH_TOP_USERS',
        data
      })
    },
    updateUserProfileData: (user) => {
      dispatch(fetchProfileData(user))
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(UsersWrapper)
