var express = require('express');
var router = express.Router();
var request = require('request');

//const BASE_URL = 'https://sbk.pedrodavi.com.br/sbk/cipher/json/encrypt/auth'
const BASE_URL = 'https://sbk.pedrodavi.com.br/sbk'

/* GET home page. */
router.get('/', function(req, res, next) {
  //console.log(req.session._ctx.user.email)
  let username = req.session._ctx.user.username
  let email = req.session._ctx.user.email;
  let namep = req.session._ctx.user.name;

  let data = {
    username,
    email,
    namep
  }

  if (username == 'pedro') {

    let healthcheck = {
      uptime: process.uptime(),
      message: 'OK',
      timestamp: Date.now()
    };

    res.render('admin', { title: 'ITSM IDTI ADMIN', user: username, name: namep, mail: email, health: healthcheck });

  } else {

    request({
      url: "https://sbk.pedrodavi.com.br/sbk/cipher/json/encrypt/auth",
      headers: {
        'X-Username': 'developer',
        'X-Password': '123'
      },
      method: "POST",
      json: true,   // <--Very important!!!
      body: data
      }, function (error, response, body){
          console.log(response.body);
          res.render('index', { title: 'ITSM IDTI USER', user: username, name: namep, mail: email, api: response.body });
      }); 

    //res.render('index', { title: 'ITSM IDTI USER', user: username, name: namep, mail: email });

  }

});

router.post('/decrypt', function(req, res, next) {

  let username = req.body.username
  let email = req.body.email;
  let namep = req.body.nome;

  let data = {
    username,
    email,
    namep
  }

  request({
    url: "https://sbk.pedrodavi.com.br/sbk/cipher/json/decrypt/auth",
    headers: {
      'X-Username': 'developer',
      'X-Password': '123'
    },
    method: "POST",
    json: true,   // <--Very important!!!
    body: data
    }, function (error, response, body){
        console.log(response.body);
        res.render('index', { title: 'ITSM IDTI USER', user: username, name: namep, mail: email, api: response.body });
    }); 

})

module.exports = router;
