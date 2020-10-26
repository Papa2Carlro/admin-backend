const express = require('express')
const router = express.Router()
const UserController = require('../../controller/users.controller');

// Authorize each API with middleware and map to the Controller Functions
// POST
router.post('/add', UserController.createUser)
router.post('/login', UserController.loginUser)
router.post('/send-password', UserController.sendPassword)
router.post('/modify', UserController.changeHash)
router.post('/password', UserController.changePassword)
router.post('/profile/:name', UserController.saveUser)

// GET
router.get('/profile/:name', UserController.getUser)
router.get('/', UserController.getUsers)

// DELETE
router.delete('/profile/:name', UserController.removeUser)

// Export the Router
module.exports = router;

// POST
// /api/users/add
// /api/users/login
// /api/users/modify
// /api/users/profile
// /api/users/password
// /api/users/send-password

// GET
// /api/users
// /api/users/profile/:name

// DELETE
// /api/users/profile/:name