import React , { Component } from 'react'
import '../styles/profile.css'
import Loader from '../components/loader'
import Followers from '../components/followers'
import Posts from '../components/posts'
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
  componentWillReceiveProps(props){
    this.fetchData(props.user)
    this.setState({isLoaded: false})
  }
  componentDidMount() {
    this.fetchData(this.props.user)
  }
  fetchData = (user) => {
    fetch(`${config.baseURL}/users/${user}`).then((res) =>{
      res.json().then((data) => {
        this.setState({
          isLoaded: true,
          data: data
        })
      })
    })
  }
  componentWillUnmount(){
    console.log('triggered')
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
    var verified =  this.props.data.isVerified ? <div className="ver"></div> : undefined
    return (
      <div className="profile-wrapper">
        <div className="profile-basic">
          <img src={this.props.data.img_url} alt={this.props.data.name} align="middle"/>
          <div className="name">{this.props.data.name} {verified}</div>
          <div className="screen-name">@{this.props.data.screen_name}</div>
          <div className="description">{this.props.data.description}</div>
          {location}
          <div className="followers">Followed By <span className="follow-count">{formatter(this.props.data.followers_count)}</span> people</div>
          <div className="friends">Friends with <span className="friends-count">{formatter(this.props.data.friends_count)} </span>people</div>
        </div>
        <Posts user={this.props.data.screen_name} changeClickStat={this.props.changeClickStat}/>
        <Followers screen_name={this.props.data.screen_name} changeClickStat={this.props.changeClickStat}/>
      </div>
    )
  }
}

export default Profile