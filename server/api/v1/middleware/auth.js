const jwt = require('jsonwebtoken')
require('dotenv').config()

export const auth = (req, res, next) => {
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