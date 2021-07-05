const { validationResult } = require('express-validator')

const Contact = require('../models/contact')
const User = require('../models/user')

exports.getContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find({ userId: req.user.id }).sort({
      date: -1
    })

    res.json(contacts)
  } catch (err) {
    console.error(err.message)

    res.status(500).json({ msg: 'Server Error, please try again later' })
  }
}

exports.createContact = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })

  const { name, email, phone, type } = req.body
  try {
    const newContact = new Contact({
      name,
      email,
      phone,
      type,
      userId: req.user.id
    })

    const contact = await newContact.save()

    res.status(201).json(contact)
  } catch (err) {
    console.error(err.message)

    res.status(500).json({ msg: 'Server Error, please try again later' })
  }
}

exports.updateContact = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })

  const contactId = req.params.id
  let { name, email, phone, type } = req.body
  if (!type) type = 'personal'

  try {
    let contact = await Contact.findById(contactId)
    if (!contact) return res.status(500).json({ msg: 'Contact Not Found.' })

    if (contact.userId.toString() !== req.user.id.toString())
      return res.status(403).json({ msg: 'Not Authorized' })

    contact = await Contact.findByIdAndUpdate(
      contactId,
      {
        $set: { name, email, phone, type }
      },
      { new: true }
    )

    res.status(200).json(contact)
  } catch (err) {
    console.error(err.message)

    res.status(500).json({ msg: 'Server Error, please try again later' })
  }
}

exports.deleteContact = async (req, res, next) => {
  const contactId = req.params.id
  try {
    const contact = await Contact.findById(contactId)
    if (!contact) return res.status(404).json({ msg: 'Contact Not Found' })

    if (contact.userId.toString() !== req.user.id.toString())
      return res.status(403).json({ msg: 'Not Authorized' })

    await Contact.findByIdAndDelete(contactId)

    res.status(200).json({ msg: 'Contact Deleted Successfully' })
  } catch (err) {
    console.error(err.message)

    res.status(500).json({ msg: 'Server Error, please try again later' })
  }
}
