var Strategy = require('passport-instagram').Strategy;

const Instagram = function(passport, clientID, clientSecret, callbackURL){
  return new Strategy({
    clientID: clientID,
    clientSecret: clientSecret,
    callbackURL: callbackURL
  },
  function(accessToken, refreshToken, profile, cb) {

    let _user = {
      id:profile.id,
      displayName:profile.displayName,
    }

    return cb(null,{
      accessToken:accessToken,
      refreshToken:refreshToken,
      id:profile.id,
      displayName:profile.displayName,
      profile:_user
    })
  });
}

module.exports = Instagram