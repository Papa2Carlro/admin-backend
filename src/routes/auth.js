const express = require('express')
const router = express.Router()

router.get('/login', (res, req) => {
  req.send('<h1>/login</h1>')
})

module.exports = router