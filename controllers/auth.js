const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const { validationResult } = require('express-validator')

const User = require('../models/user')

exports.getAuth = async (req, res, nect) => {
  try {
    // const user = await User.findById(req.user.id).select('-password')
    const user = await User.findById(req.user.id, { password: 0 })
    res.json(user)
  } catch (err) {
    console.error(err.message)

    res.status(500).json({ msg: 'Server Error, please try agian later' })
  }
}

exports.postAuth = async (req, res, nect) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })

  const { email, password } = req.body

  try {
    let user = await User.findOne({ email })
    if (!user) return res.status(400).json({ msg: 'Invalid credentials.' })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(400).json({ msg: 'Invalid password' })

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

    res.status(500).json({ msg: 'Server Error, please try again later' })
  }
}
