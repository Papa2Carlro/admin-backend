const express = require('express')
const router = express.Router()
const UserController = require('../../controller/users.controller');
// const Authorization = require('../../auth/authorization');

// router.post('/login/', UserController.loginUser)
// router.get('/', Authorization, UserController.getUsers)
// router.delete('/:id', Authorization, UserController.removeUser)

// Authorize each API with middleware and map to the Controller Functions
router.post('/add', UserController.createUser)

// Export the Router
module.exports = router;

// /api/users/add