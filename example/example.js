var express = require('express');
var chewbPassport = require('../index')

// Create a new Express application.
var app = express();

// Configure view engine to render EJS templates.
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// Define routes.
app.get('/',
  function(req, res) {
    res.render('home', { user: req.user });
  });

app.get('/login',
  function(req, res) {
    res.render('login');
  });

let strats = [{
  name: 'facebook',
  clientId: '1656736837874441',
  clientSecret: 'f9da079389ba1b0aef80dc978c632958',
  authUrl: '/login/facebook',
  redirectUrl: '/login/facebook/return'
}, {
  name: 'instagram',
  clientId: 'c82f60355b9d42869a65bad4e0753fdc',
  clientSecret: '7ac9fac8b09b4634af1720e05d376a75',
  authUrl: '/login/instagram',
  redirectUrl: '/login/instagram/return'
}]

let Chewb = new chewbPassport(app, strats, {
  host: 'http://localhost:3000/',
  baseRoute: ''
})

app.listen(3000);
