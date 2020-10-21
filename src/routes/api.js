const express = require('express')
const router = express.Router()

const users = require('./api/user.route')

// Routes
router.use('/users', users);

module.exports = router;