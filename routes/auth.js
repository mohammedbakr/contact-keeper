const express = require('express')
const { body } = require('express-validator')

const authController = require('../controllers/auth')
const isAuth = require('../middleware/auth')

const router = express.Router()

// @route  GET api/auth
// @desc Get logged in user
// @access Private
router.get('/', isAuth, authController.getAuth)

// @route  POST api/auth
// @desc Auth user & get token
// @access Public
router.post(
  '/',
  [
    body('email', 'Please enter a valid email').isEmail(),
    body('password', 'Password is required').exists()
  ],
  authController.postAuth
)

module.exports = router
