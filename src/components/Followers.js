import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../styles/followers.css'
import { connect } from 'react-redux'
class Followers extends Component {
  render() {
    var followers = this.props.user_profile.followers.map((follower) => {
      return <FollowerDiv data={follower} key={'F_' + follower.screen_name} />
    })
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

var mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps)(Followers)