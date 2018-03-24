import React, {Component} from 'react'
import '../styles/userwrapper.css'
import User from '../components/user'
import Loader from '../components/loader'
import Profile from '../components/profile'
const config = require('../config.json')

class UsersWrapper extends Component {
  constructor() {
    super()
    this.state = {
      users:'',
      loaded: false,
      clickStat: false,
      followersClick: false,
      clickedUser: ''
    }
  }
  componentDidMount() {
    fetch(`${config.baseURL}/users`).then((res) =>{
      res.json().then((data) => {
        this.setState({
          users: data.data,
          loaded: true
        })
      })
    })
  } 
  changeClickStat = (user) => {
    if (this.state.clickStat){
      this.setState({
        followersClick: !this.state.followersClick,
        clickedUser: user,
      })
    } else {
      this.setState({
        clickStat: true,
        clickedUser: user
      })
    }
  }
  
  render() {
    
    var div = <Loader/>
    if ( this.state.clickStat ){
<<<<<<< HEAD
=======
      console.log(this.state)
>>>>>>> 2540049577f3cf9b95d1ec086199e7e59819833b
      div = <Profile user={this.state.clickedUser} changeClickStat={this.changeClickStat}/>
    }
    if ( this.state.loaded && !this.state.clickStat){     
      var usersDiv = this.state.users.map((user) =>  {
        return <User data={user} key={user.name} changeClickStat={this.changeClickStat}/>
      })
      div = <div className="users">{usersDiv}</div> 
    }
<<<<<<< HEAD
=======
    console.log(div)
>>>>>>> 2540049577f3cf9b95d1ec086199e7e59819833b
    return (
      <div className="users-wrapper">{div}</div>
    )
  }
}

export default UsersWrapper
