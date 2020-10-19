const express = require('express')
const router = express.Router()

router.get('/', (res, req) => {
  req.send('<h1>Api Admin</h1>')
})

module.exports = router