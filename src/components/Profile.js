import React, { Component } from 'react'
import '../styles/profile.css'
import Loader from '../components/Loader'
import Followers from '../components/Followers'
import Posts from '../components/Posts'
import {Formatter} from '../utils/formatter'
import { connect } from 'react-redux'
const config = require('../config.json')


class Profile extends Component {

  render() {
    var location = (this.props.user_profile.profile.location.length === 0)
      ? undefined
      : <div className="location"><div className="loc"></div>{this.props.user_profile.profile.location}</div>
    var verified = this.props.user_profile.profile.isVerified
      ? <div className="ver"></div>
      : undefined

    return (
      <div className="profile-wrapper">
        <div className="profile-basic">
          <img src={this.props.user_profile.profile.img_url} alt={this.props.user_profile.profile.name} align="middle" />
          <div className="name">{this.props.user_profile.profile.name} {verified}</div>
          <div className="screen-name">@{this.props.user_profile.profile.screen_name}</div>
          <div className="description">{this.props.user_profile.profile.description}</div>
          {location}
          <div className="followers">
            Followed By <span className="follow-count">
              {Formatter(this.props.user_profile.profile.followers_count)}
            </span> people
          </div>
          <div className="friends">
            Friends with <span className="friends-count">
              {Formatter(this.props.user_profile.profile.friends_count)}
            </span> people
          </div>
        </div>

        <Posts/>
        <Followers/> 
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return state
}


export default connect(mapStateToProps)(Profile)