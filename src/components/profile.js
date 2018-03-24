import React , { Component } from 'react'
import '../styles/profile.css'
import Loader from '../components/loader'
import Followers from '../components/followers'
import formatter from '../formatter'
const config = require('../config.json')


class Profile extends Component {
  constructor(props) {
      super(props)
      this.state = {
          isLoaded: false,
          data: ''
      }
  }
  componentDidMount () {
      fetch(`${config.baseURL}/users/${this.props.user}`).then((res) =>{
        res.json().then((data) => {
          this.setState({
            isLoaded: true,
            data: data
          })
        })
      })
  }
  render() {
    var div = <Loader/>
      if ( this.state.isLoaded){
          div =  <ProfileBasic data={this.state.data} changeClickStat={this.props.changeClickStat}/>
      } 
      return (
        div
      )
  }
}
class ProfileBasic extends Component {
  
  render() {
    if ( this.props.data.location.length === 0){
      var location = undefined
    } else {
      location = <div className="location"><div className="loc"></div>{this.props.data.location}</div>    
    }
    return (
      <div className="profile-wrapper">
        <div className="profile-basic">
          <img src={this.props.data.img_url} alt={this.props.data.name}/>
          <div className="name">{this.props.data.name} <div className="ver"></div></div>
          <div className="screen-name">@{this.props.data.screen_name}</div>
          {location}
          <div className="followers">Followed By <span className="follow-count">{formatter(this.props.data.followers_count)}</span> people</div>
          <div className="friends">Friends with <span className="friends-count">{formatter(this.props.data.friends_count)} </span>people</div>
        </div>
        <div className="posts"></div>
        <Followers screen_name={this.props.data.screen_name} changeClickStat={this.props.changeClickStat}/>
      </div>
    )
  }
}

export default Profile