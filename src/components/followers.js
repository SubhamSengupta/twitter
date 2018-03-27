import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../styles/followers.css'
import { connect } from 'react-redux'
const config = require('../config.json')
class Followers extends Component {
  constructor(props) {
    super(props)
    this.state = {
      followers: '',
      isLoaded: false
    }
  }
  
  componentDidMount() {
    this.props.updateFollowerData(this.props.screen_name).then(() => {
      this.setState({ isLoaded: true})
    })
  }
  
  render() {
    if (this.state.isLoaded) {
      var followers = this.props.followers.map((follower) => {
        return <FollowerDiv data={follower} key={'F_' + follower.screen_name} />
      })
    } else {
      followers = <div className="loading-follower"></div>
    }
    return (
      <div className="profile-followers">
        {followers}
      </div>
    )
  }
}

class FollowerDiv extends Component {
  render() {
    return (
      <Link to={`/users/${this.props.data.screen_name}`} >
        <div className="follower-div">
          <img src={this.props.data.img_url} alt={this.props.data.name} />
          <div className="details">
            <p className="name">{this.props.data.name}</p>
            <p className="screen-name">@{this.props.data.screen_name}</p>
          </div>
        </div>
      </Link>
    )
  }
}
var fetchDataForFollower = (user) => {
  return function (dispatch) {
    return fetchFollowers(user).then((data) => {
      return dispatch({
        type: 'UPDATE_FOLLOWER_DATA',
        data
      })
    })
  }
}

var fetchFollowers = (user) => {
  return new Promise((resolve, reject) => {
    fetch(`${config.baseURL}/followers/${user}`).then((res) => {
      res.json().then((data) => {
        resolve(data)
      })
    })
  })
}
var mapStateToProps = (state) => {
  return {
    followers: state.user_follower_data
  }
}
var mapDispatchToProps = (dispatch) => {
  return {
    updateFollowerData : (user) => {
      return new Promise ((resolve, reject) => {
        resolve(dispatch(fetchDataForFollower(user)))
      })
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps) (Followers)