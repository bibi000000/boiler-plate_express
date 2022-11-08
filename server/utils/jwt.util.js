const { promisify } = require('util')
const jwtUtil = require('jsonwebtoken')
require('dotenv').config()
const redisClient = require('./redis.util')
const secret = process.env.JWT_SECRET

module.exports = {
  sign: (email) => {
    const payload = {
      email: email
    }
    return jwtUtil.sign(payload, secret, {
      expiresIn: '1h',
      algorithm: 'HS256',
    })
  },
  verify: (token) => {
    let decoded = null;
    try {
      decoded = jwtUtil.verify(token, secret)
      return {
        type: true,
        email: decoded.email,
      }
    } catch (err) {
      return {
        type: false,
        message: err.message,
      }
    }
  },
  refresh: () => {
    return jwtUtil.sign({}, secret, {
      expiresIn: '14d',
      algorithm: 'HS256',
    })
  },
  refreshVerify: async (token, email) => {
    const getAsync = promisify(redisClient.get).bind(redisClient)
    try {
      const data = await getAsync(email)
      if (token === data) {
        try {
          jwtUtil.verify(token, secret)
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