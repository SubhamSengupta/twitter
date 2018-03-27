import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import '../styles/posts.css'
import formatter from '../formatter'
const config = require('../config.json')
class Posts extends Component {
  constructor() {
    super()
    this.state = {
      isLoaded: false,
      posts: ''
    }
  }
  componentWillReceiveProps(props) {
    this.fetchData(props.user)
    this.setState({
      isLoaded: false
    })
  }
  componentDidMount() {
    this.fetchData(this.props.user)
  }
  fetchData = (user) => {
    fetch(`${config.baseURL}/tweets/${user}`).then((res) => {
      res.json().then((data) => {
        this.setState({
          isLoaded: true,
          data: data
        })
      })
    })
  }
  render() {
    if (this.state.isLoaded) {
      var posts = this.state.data.map((tweet) => {
        return <PostDiv data={tweet} changeClickStat={this.props.changeClickStat} />
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
  userClicked = (user) => {
    user = user.substr(1, user.length)
    this.props.changeClickStat(user)
  }
  render() {
    var verified = this.props.data.isVerified ? <div className="ver"></div> : undefined
    var text = this.formatText(this.props.data.text).map((word) => {
      return <span>{word} </span>
    })
    return (
      <div className="posts-div">
        <div className="details">
          <img src={this.props.data.url} alt="" />
          <div className="name-details">
            <div className="name">{this.props.data.name} {verified}</div>
            <div className="screen-name">@{this.props.data.screen_name}</div>
          </div>
        </div>

        <div className="text"><p>{text}</p></div>
        <div className="time">{this.shape(this.props.data.created_at)}</div>
        <div className="tweet-stat">
          <div className="favorite"><div className="fav"></div>{formatter(this.props.data.favorite_count)}</div>
          <div className="retweet"><div className="re-tweet"></div>{formatter(this.props.data.retweet_count)}</div>
        </div>
      </div>
    )
  }
  formatText = (text) => {
    text = text.split(' ').map((word) => {
      if (word.startsWith('#') || word.startsWith('\n#')) {
        return <span className="hash" key={'hash_' + word}>{word}</span>
      } else if (word.startsWith('http') || (word.startsWith('www')) || word.startsWith('\nhttp')) {
        return <a target="_blank" href={word} key={'l_' + word}>{word}</a>
      } else if (word.startsWith('@') || word.startsWith('\n@')) {
        var format = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
        word = word.substr(1, word.length)
        var text = word
        while( word.charAt(word.length - 1).match(format) || word.charAt(word.length - 2).match(format)){
          word = word.substr(0, word.length - 1)
        }
        text = text.substr(word.length, text.length);
        return <Link to={`/users/${word}`}><span><span className="user-redir" key={'@' + word}>@{word}</span>{text}</span></Link>
      }
      return word
    })
    return text
  }
  shape = (time) => {
    time = time.split(' ')
    time.splice(3, 2)
    var day = this.dayForm(time[0])
    return day + ', ' + time[1] + ' ' + time[2] + ', ' + time[3]
  }
  dayForm = (day) => {
    switch (day) {
      case 'Mon': return 'Monday'
        break;
      case 'Tue': return 'Tuesday'
        break;
      case 'Wed': return 'Wednesday'
        break;
      case 'Thu': return 'Thursday'
        break;
      case 'Fri': return 'Friday'
        break;
      case 'Sat': return 'Saturday'
        break;
      case 'Sun': return 'Sunday'
        break;
      default: return ''
    }
  }
}

export default Posts