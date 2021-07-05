const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const { validationResult } = require('express-validator')

const User = require('../models/user')

exports.createUser = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })

  const { name, email, password } = req.body
  try {
    let user = await User.findOne({ email })
    if (user) return res.status(400).json({ msg: 'User already exists' })

    user = new User({
      name,
      email,
      password
    })

    user.password = await bcrypt.hash(password, 10)
    await user.save()

    const payload = {
      user: {
        id: user._id
      }
    }

    jwt.sign(
      payload,
      config.get('JWTSecret'),
      {
        expiresIn: 3600 // 1 hour
      },
      (err, token) => {
        if (err) throw err

        res.status(200).json({ token })
      }
    )
  } catch (err) {
    console.error(err.message)

    res.status(500).json({ msg: 'Server Error, Please try again later' })
  }
}
