var Strategy = require('passport-google-oauth').OAuth2Strategy;

const Facebook = function(passport, clientID, clientSecret, callbackURL){
  return new Strategy({
    clientID: clientID,
    clientSecret: clientSecret,
    callbackURL: callbackURL
  },
  function(accessToken, refreshToken, profile, cb) {
    // In this example, the user's Facebook profile is supplied as the user
    // record.  In a production-quality application, the Facebook profile should
    // be associated with a user record in the application's database, which
    // allows for account linking and authentication with other identity
    // providers.
    return cb({
      accessToken:accessToken,
      refreshToken:refreshToken,
      profile:profile
    })
  });
}

module.exports = Facebook