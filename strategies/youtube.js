var Strategy = require('passport-youtube-v3').Strategy

const Youtube = function(passport, clientID, clientSecret, callbackURL, scope = []) {
  return new Strategy({
      clientID: clientID,
      clientSecret: clientSecret,
      callbackURL: callbackURL,
      scope: scope
    },
    function(accessToken, refreshToken, profile, cb) {
      process.nextTick(function() {
        return cb(null, {
          accessToken: accessToken,
          refreshToken: refreshToken,
          profile: profile
        });
      });
    });
}

module.exports = Youtube
