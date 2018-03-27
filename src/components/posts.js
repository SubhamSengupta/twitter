import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../styles/posts.css'
import formatter from '../formatter'
import { connect } from 'react-redux'
const config = require('../config.json')

class Posts extends Component {
  constructor() {
    super()
    this.state = {
      isLoaded: false
    }
  }
  componentDidMount() {
    this.props.updatePostData(this.props.user).then(() => {
      this.setState({
        isLoaded: true
      })
    })
  }

  render() {
    if (this.state.isLoaded) {
      var posts = this.props.data.map((tweet) => {
        return <PostDiv data={tweet} key={tweet.created_at}/>
      })

    } else {
      var posts = <div className="loading-follower"></div>
    }
    return (
      <div className="posts-wrapper">
        {posts}
      </div>
    )
  }
}

class PostDiv extends Component {
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
        while (word.charAt(word.length - 1).match(format) || word.charAt(word.length - 2).match(format)) {
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
      case 'Tue': return 'Tuesday'
      case 'Wed': return 'Wednesday'
      case 'Thu': return 'Thursday'
      case 'Fri': return 'Friday'
      case 'Sat': return 'Saturday'
      case 'Sun': return 'Sunday'
      default: return ''
    }
  }
}

var fetchDataForPosts = (user) => {
  return function (dispatch) {
    return fetchPosts(user).then((data) => {
      return dispatch({
        type: 'UPDATE_POST_DATA',
        data
      })
    })
  }
}
var fetchPosts = (user) => {
  return new Promise((resolve, reject) => {
    fetch(`${config.baseURL}/tweets/${user}`).then((res) => {
      res.json().then((data) => {
        resolve(data)
      })
    })
  })
}

var mapStateToProps = (state) => {
  return {
    data: state.user_post_data
  }
}
var mapDispatchToProps = (dispatch) => {
  return {
    updatePostData: (user) => {
      return new Promise((resolve, reject) => {
        resolve(dispatch(fetchDataForPosts(user)))
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts)