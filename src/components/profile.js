import React, { Component } from 'react'
import '../styles/profile.css'
import Loader from '../components/loader'
import Followers from '../components/followers'
import Posts from '../components/posts'
import formatter from '../formatter'
import { connect } from 'react-redux'
const config = require('../config.json')


class Profile extends Component {
  constructor () {
    super()
    this.state = {
      isLoaded: false
    }
  }
  componentDidMount() {
    this.props.updateUserData(this.props.user).then(() => {
      this.setState({ isLoaded : true})
    })
  }

  render() {
    return this.state.isLoaded
      ? <ProfileBasic data={this.props.data.user_profile_data} />
      : <Loader />
  }
}
class ProfileBasic extends Component {

  render() {
    var location = (this.props.data.location.length === 0)
      ? undefined
      : <div className="location"><div className="loc"></div>{this.props.data.location}</div>
    var verified = this.props.data.isVerified
      ? <div className="ver"></div>
      : undefined

    return (
      <div className="profile-wrapper">
        <div className="profile-basic">
          <img src={this.props.data.img_url} alt={this.props.data.name} align="middle" />
          <div className="name">{this.props.data.name} {verified}</div>
          <div className="screen-name">@{this.props.data.screen_name}</div>
          <div className="description">{this.props.data.description}</div>
          {location}
          <div className="followers">
            Followed By <span className="follow-count">
              {formatter(this.props.data.followers_count)}
            </span> people
          </div>
          <div className="friends">
            Friends with <span className="friends-count">
              {formatter(this.props.data.friends_count)}
            </span> people
          </div>
        </div>
        <Posts user={this.props.data.screen_name} />
        <Followers screen_name={this.props.data.screen_name} />
      </div>
    )
  }
}
var fetchDataFor = (user) => {
  return function (dispatch) {
    return fetchData(user).then((data) => {
      return dispatch({
        type: 'UPDATE_USER_DATA',
        data
      })
    })
  }
}
var fetchData = (user) => {
  return new Promise((resolve, reject) => {
    fetch(`${config.baseURL}/users/${user}`).then((res) => {
      res.json().then((data) => {
        resolve(data)
      })
    })
  })
}
const mapStateToProps = (state) => {
  return {
    data: state
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    updateUserData: (user) => {
      return new Promise( (resolve, reject) => {
        resolve(dispatch(fetchDataFor(user)))
      })
    }
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)