const {promisify} = require('util')
const jwt = require('jsonwebtoken')
const redisClient = require('./redis.util')
require('dotenv').config()
const secret = process.env.JWT_SECRET

module.exports = {
  sign: (email) => {
    const payload = { email }
    return jwt.sign(payload, secret, {
      algorithm: 'RS256',
      expiresIn: '1h',
    })
  },
  verify: (token) => {
    let decoded = null
    try {
      decoded = jwt.verify(token, secret)
      return {
        type: true,
        email: decoded.email
      }
    } catch (err) {
      return {
        type: false,
        message: err.message
      }
    }
  },
  refresh: () => {
    return jwt.sign({}, secret, {
      algorithm: 'RS256',
      expiresIn: '14d'
    })
  },
  refreshVerify: async (token, email) => {
    const getAsync = promisify(redisClient.get).bind(redisClient)
    try {
      const data = await getAsync(email)
      if (token === data) {
        try {
          jwt.verify(token, secret)
          return true
        } catch (err) {
          return false
        }
      } else {
        return false
      }
    } catch (err) {
      return false
    }
  }
}