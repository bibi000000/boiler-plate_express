// const jwt = require('jsonwebtoken')
const jwtUtil = require('../../utils/jwt.util')
require('dotenv').config()

const secret = process.env.JWT_SECRET

const verifyToken = async (req, res, next) => {
  const headers = req.headers
  if (!headers.hasOwnProperty('authorization')) {
    return res
      .status(403)
      .json({
        success: false,
        message: '로그인이 필요합니다.'
      })
  }
  const token = req.headers.authorization.split('Bearer ')[1] || req.headers['x-access-token']
  if (!token || token === 'null') {
    return res
      .status(402)
      .json({
        success: false,
        message: '로그인이 필요합니다.'
      })
  }
  let info = {
    type: false,
    message: ''
  }
  const p = new Promise((resolve, reject) => {
    jwt.verify
  })
}

const auth = (req, res, next) => {
  const key = process.env.JWT_SECRET
  try {
    req.decoded = jwt.verify(req.headers.authorization, key)
    return next()
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res
        .status(419)
        .json({
          success: false,
          message: "토큰이 만료되었습니다."
        })
    }
    if (err.name === "JsonWebTokenError") {
      return res
        .status(401)
        .json({
          success: false,
          message: "유효하지 않은 토큰입니다."
        })
    }
  }
}

module.exports = { auth }