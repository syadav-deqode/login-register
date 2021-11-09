const express = require('express')
const router = express.Router()

const asyncHandler = fn => (req, res, next) => {
  return Promise
    .resolve(fn(req, res, next))
    .catch(next)
}
const userController = require('../controllers/usercontroller')

router.get('/login', asyncHandler(userController.loginUserPage))

router.post('/login', asyncHandler(userController.loginUser))

router.get('/list/user-list', asyncHandler(userController.userListWithPage))

router.get('/register-user', asyncHandler(userController.registerUserPage))

router.post('/register-user', asyncHandler(userController.registerUser))

module.exports = router