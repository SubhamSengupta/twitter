import React, {Component} from 'react'
import '../styles/user.css'

class User extends Component {
  render() {
    return (
      <div className="user-div">
        <img src={this.props.data.data.img_url} alt={this.props.data.name}/>
        <div className="name">{this.props.data.name}</div>
        <div className="screen-name">{this.props.data.data.screen_name}</div>
        <div className="followers-count">{this.props.data.data.followers_count}</div>
      </div>
    )
  }
}

export default User