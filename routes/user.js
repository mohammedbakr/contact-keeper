const express = require('express')
const { body } = require('express-validator')

const userController = require('../controllers/user')

const router = express.Router()

// @route  POST api/users
// @desc Register a user
// @access Public
router.post(
  '/',
  [
    body('name', 'Please add name').trim().not().isEmpty(),
    body('email', 'Please include a valid email').isEmail().normalizeEmail(),
    body(
      'password',
      'Please enter a passwoed with 6 or more characters'
    ).isLength({ min: 6 })
  ],
  userController.createUser
)

module.exports = router
