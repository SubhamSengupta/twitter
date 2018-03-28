import React, {Component} from 'react'
import '../styles/user.css'
import {Formatter} from '../utils/formatter'

class User extends Component {
  render() {
    return (
      <div className="user-div">
        <img src={this.props.data.data.img_url} alt={this.props.data.name}/>
        <div className="name">{this.props.data.name}<div className="ver"></div></div>
        <div className="screen-name">@{this.props.data.data.screen_name}</div>
        <div className="followers-count">{Formatter(this.props.data.data.followers_count)} <span className="followers"> followers</span></div>
      </div>
    )
  }
}

export default User