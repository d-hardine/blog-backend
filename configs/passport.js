//JWT STUFF
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = 'SECRET_KEY' //normally stored in process.env.SECRET

module.exports = new JwtStrategy(opts, (jwt_payload, done) => {
    if(jwt_payload.email === 'bruce.wayne@gmail.com')
        return done(null, true)
    return done(null, false)
})