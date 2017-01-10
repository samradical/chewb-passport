var passport = require('passport');
var Strategies = require('./strategies/index');
const queryString = require('query-string');


/*
@
strategies:[
  {
    name:'facebook',
    clientId
    clientSecret,
    clientSecret,
    authUrl,: 'login/facebook'
    redirectUrl,: 'login/facebook/return'
  }
]

@options
{
  host: 'localhost:3000',
  baseRoute: 'auth'
}
*/
class ChewbPassport {
  constructor(app, strategies, options) {

    const { host } = options

    if (!host) {
      throw new Error('Need options.host')
      return
    }

    passport.serializeUser(function(user, cb) {
      cb(null, user);
    });

    passport.deserializeUser(function(obj, cb) {
      cb(null, obj);
    });

    const bodyParser = require('body-parser')

    app.use(require('morgan')('combined'));
    app.use(require('cookie-parser')());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json())
    app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

    // Initialize Passport and restore authentication state, if any, from the
    // session.
    app.use(passport.initialize());
    app.use(passport.session());

    strategies.forEach(stratData => {
      this._addStrategy(app, stratData, options)
    })
  }

  _addStrategy(app, stratData, options) {
    const { host, baseRoute } = options

    let {
      name,
      clientId,
      clientSecret,
      authUrl,
      scope,
      redirectUrl,
      callbackUrl,
    } = stratData

    passport.use(Strategies[name](
      passport, clientId, clientSecret, redirectUrl, scope
    ))


    app.get(`${baseRoute}${authUrl}`,
      passport.authenticate(name));

    /*app.get(`${baseRoute}/${authUrl}`,
      (req, res) => {
        console.log(name);
        passport.authenticate(name);
      });*/

    //callback
    app.get(`${baseRoute}${redirectUrl}`,
      passport.authenticate(name, { failureRedirect: '/login' }),
      (req, res) => {
        res.redirect('/');
        let { user } = req
        if(options.logOut){
          req.logout();
        }
        const {profile} = user
        res.redirect(`${callbackUrl}?${queryString.stringify(user)}&profile=${queryString.stringify(profile)}`);
      });

  }
}

module.exports = ChewbPassport
