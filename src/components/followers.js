import React, { Component } from 'react'
import { Link } from 'react-router-dom'
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
  componentWillReceiveProps(props) {
    this.fetchData(props.screen_name)
    this.setState({ isLoaded: false })
  }
  componentDidMount() {
    this.fetchData(this.props.screen_name)
  }
  fetchData = (user) => {
    fetch(`${config.baseURL}/followers/${user}`).then((res) => {
      res.json().then((data) => {
        this.setState({
          followers: data,
          isLoaded: true
        })
      })
    })
  }
  render() {
    if (this.state.isLoaded) {
      var followers = this.state.followers.map((follower) => {
        return <FollowerDiv data={follower} key={follower.screen_name}/>
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

export default Followers