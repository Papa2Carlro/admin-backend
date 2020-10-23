const express = require('express')
const router = express.Router()
const UserController = require('../../controller/users.controller');
// const Authorization = require('../../auth/authorization');

// router.get('/', Authorization, UserController.getUsers)
// router.delete('/:id', Authorization, UserController.removeUser)

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

// Export the Router
module.exports = router;

// /api/users/add
// /api/users/login
// /api/users/send-password
// /api/users/modify
// /api/users/password
// /api/users/profile