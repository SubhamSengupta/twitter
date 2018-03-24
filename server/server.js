const express = require('express')
const path = require('path')
const publicPath = path.join(__dirname, '../public')
const request = require('request')
const people = require('./people.json')
const config = require('../config/config.json')
const bodyParser = require('body-parser')

var app = express()
app.use(express.static(publicPath))
app.use(bodyParser.json())
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, content-type, Accept');
  next();
});
var getTwitterData = (name) => {
  let url = 'https://api.twitter.com/1.1/users/show.json?cursor=' + 
      `-1&screen_name=${name}&skip_status=true&include_user_entities=false`;
    let options = {
      url: url,
      headers: {
        'Authorization': config.bearer_token
      }
    }
    return new Promise((resolve, reject) => {
      request(options, (err, res, body) => {
        resolve(body)
      })
    })
}
var  requestData = (name) => {
  return new Promise((resolve, reject) => {
    
    getTwitterData(name).then((body) => {
      body = JSON.parse(body)
      let obj = {}
      var url = body.profile_image_url_https.replace('_normal', '')

      obj.name = body.name;
      obj.data = {
        screen_name: body.screen_name,
        img_url: url,
        followers_count: body.followers_count
      }
      resolve(obj)
    })
  })
}

app.get('/users', (req, res)=> {
  res.send({data})
})

app.get('/users/:user', (req, res) => {
  getTwitterData(req.params.user).then((body) => {
    body = JSON.parse(body)
    var url = body.profile_image_url_https.replace('_normal', '')
    let obj = {
      'name': body.name, 
      'screen_name': body.screen_name, 
      'location': body.location, 
      'description': body.description, 
      'followers_count': body.followers_count, 
      'friends_count': body.friends_count,
      'img_url': url,
    }
    res.send(obj)
  })
})
app.get('/followers/:name', (req, response) => {
  let name = req.params.name;
  let url = 'https://api.twitter.com/1.1/followers/list.json?cursor=' + 
      `-1&screen_name=${name}&skip_status=true&include_user_entities=false&count=10`;
  let options = {
    url: url,
    headers: {
      'Authorization': config.bearer_token
    }
  }
  request(options, (err, res, body) => {
    users = JSON.parse(body).users
    var data = users.map((user) => {
      let obj = {
        'name': user.name, 
        'screen_name': user.screen_name, 
        'img_url': user.profile_image_url_https,
      }
      return obj
    })

    response.send(data)
  })
})

let promises = []
people.people.forEach((name)=> {
  promises.push(requestData(name))
})
var data;
Promise.all(promises).then(res => {
  data = res;
  app.listen(3030, ()=> {
    console.log('Server is On')
  })
})



