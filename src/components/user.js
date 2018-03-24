import React, {Component} from 'react'
import '../styles/user.css'
import formatter from '../formatter'

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      screen_name: this.props.data.data.screen_name
    }
  }
  userClicked =  () => {
    this.props.changeClickStat(this.state.screen_name)
  }

  render() {
    return (
      <div className="user-div" onClick={this.userClicked}>
        <img src={this.props.data.data.img_url} alt={this.props.data.name}/>
        <div className="name">{this.props.data.name}<div className="ver"></div></div>
        <div className="screen-name">@{this.props.data.data.screen_name}</div>
        <div className="followers-count">{formatter(this.props.data.data.followers_count)} <span className="followers"> followers</span></div>
      </div>
    )
  }
}

export default User