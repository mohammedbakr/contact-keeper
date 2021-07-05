const express = require('express')
const { body } = require('express-validator')

const contactController = require('../controllers/contact')
const isAuth = require('../middleware/auth')

const router = express.Router()

// @route  GET api/contacts
// @desc Get all users contact
// @access Private
router.get('/', isAuth, contactController.getContacts)

// @route  POST api/contacts
// @desc Add new contact
// @access Private
router.post(
  '/',
  [body('name', 'Name is required').trim().not().isEmpty()],
  isAuth,
  contactController.createContact
)

// @route  PUT api/contacts/:id
// @desc Update contact
// @access Private
router.put(
  '/:id',
  [body('name', 'Name is required').trim().not().isEmpty()],
  isAuth,
  contactController.updateContact
)

// @route  PUT api/contacts/:id
// @desc Delete contact
// @access Private
router.delete('/:id', isAuth, contactController.deleteContact)

module.exports = router
