const express = require('express')
const router = express.Router()
const { memberRegist, memberDetail, memberLogin, memberWithdrawl, memberModify, memberLogout } = require('../controller/member')
const { auth } = require('../middleware/auth')

router
  .post(`/login`, memberLogin)
router
  .post(`/logout`, memberLogout)

router
  .post(`/`, memberRegist)
router
  .get(`/:memberId`, auth, memberDetail)
router
  .put(`/`, memberModify)
router
  .delete(`/:memberId`, memberWithdrawl)

module.exports = router