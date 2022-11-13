const express = require('express')
const router = express.Router()

router.get(`/:id`, (req, res, next) => {
  console.log(`member.js /member/:id`)
  next()
})

module.exports = router