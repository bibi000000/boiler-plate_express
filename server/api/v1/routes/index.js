const express = require('express')
const router = express.Router()
const memberRouter = require('./member')

router.use('/member', memberRouter)

module.exports = router