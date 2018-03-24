import React, { Component } from 'react'
import '../styles/followers.css'
const config = require('../config.json')
class Followers extends Component {
  constructor(props) {
    super(props)
    this.state = {
      followers: '',
      isLoaded: false
    }
  }
<<<<<<< HEAD
  componentWillReceiveProps(props){
    this.fetchData(props.screen_name)
    this.setState({isLoaded: false})
  }
  componentDidMount() {
    this.fetchData(this.props.screen_name)
  }
  fetchData = (user) => {
    fetch(`${config.baseURL}/followers/${user}`).then((res) => {
=======
  componentDidMount() {
    fetch(`${config.baseURL}/followers/${this.props.screen_name}`).then((res) => {
>>>>>>> 2540049577f3cf9b95d1ec086199e7e59819833b
      res.json().then((data) => {
        this.setState({
          followers: data,
          isLoaded: true
        })
      })
    })
<<<<<<< HEAD
=======
    
>>>>>>> 2540049577f3cf9b95d1ec086199e7e59819833b
  }
  render() {
    if( this.state.isLoaded){
      var followers = this.state.followers.map((follower) => {
        return <FollowerDiv data={follower} key={follower.screen_name} changeClickStat={this.props.changeClickStat}/>
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
  userClicked =  () => {
    this.props.changeClickStat(this.props.data.screen_name)
  }
  render() {
    return (
      <div className="follower-div" onClick={this.userClicked}>
        <img src={this.props.data.img_url} alt={this.props.data.name}/>
        <div className="details">
          <p className="name">{this.props.data.name}</p>
          <p className="screen-name">@{this.props.data.screen_name}</p>
        </div>
      </div>
    )
  }
}

export default Followers