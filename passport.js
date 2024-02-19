const passport = require('passport')
const { Strategy } = require('passport-discord')

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((obj, done) => {
    done(null, obj)
})

passport.use(
  new Strategy(
    {
    clientID: "1042965052661190726",
    clientSecret: "a3jNC6Q_VAdrQeoAhW2uDnwbCMoOp5VF",
    callbackURL: "https://martxnodev.github.io/login",
    scope: ["identify", "guilds"]
    }, 
    (accestoken, refreshtoken, profile, cb) => {
      process.nextTick(() => {
        return cb(null, profile);
    });
}));

module.exports = passport