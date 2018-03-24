import React, { Component } from 'react'
import '../styles/posts.css'
const config = require('../config.json')
class Posts extends Component {
  constructor(){
    super()
    this.state = {
      isLoaded: false,
      posts: ''
    }
  }
  componentWillReceiveProps(props){
    this.fetchData(props.user)
    this.setState({
      isLoaded: false
    })
  }
  componentDidMount(){
    this.fetchData(this.props.user)
  }
  fetchData = (user) => {
    fetch(`${config.baseURL}/tweets/${user}`).then((res) =>{
      res.json().then((data) => {
        this.setState({
          isLoaded: true,
          data: data
        })
      })
    })
  }
  render() {
    if ( this.state.isLoaded){
      var posts = this.state.data.map ((tweet) => {
        return <PostDiv data={tweet}/>
      })

    } else {
      posts = <div className="loading-follower"></div>
    }
    return (
      <div className="posts-wrapper">
        {posts}
      </div>
    )
  }
}

class PostDiv extends Component {
  render () {
    var verified =  this.props.data.isVerified ? <div className="ver"></div> : undefined
    return (
      <div className="posts-div">
        <div className="details">
          <img src={this.props.data.url} alt=""/>
          <div className="name">{this.props.data.name} {verified}</div>
          <div className="screen-name">{this.props.data.screen_name}</div>
        </div>
        <div className="time">{this.props.data.created_at}</div>
        <div className="text">{this.props.data.text}</div>
        <div className="favorite">{this.props.data.favorite_count}</div>
        <div className="retweet">{this.props.data.retweet_count}</div>
      </div>
    )
  }
}

export default Posts