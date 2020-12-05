import { useContext, useState, useEffect } from "react"
import ContactContext from '../../context/contact/contactContext'

const ContactForm = () => {
  const contactContext = useContext(ContactContext)
  const { addContact, current, clearCurrent, updateContact } = contactContext

  useEffect(() => {
    if (current) {
      setContact(current)
    } else {
      setContact({
        name: '',
        email: '',
        phone: '',
        type: 'personal'
      })
    }
  }, [contactContext, current])

  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'personal'
  })
  
  const { name, email, phone, type } = contact

  const onChangeHandler = e => setContact({ ...contact, [e.target.name]: e.target.value})

  const onSubmitHandler = e => {
    e.preventDefault()
    if (!current) {
      addContact(contact)
    } else {
      updateContact(contact)
    }
    clearAll()
  }

  const clearAll = () => {
    clearCurrent()
  }

  return (
    <form onSubmit={onSubmitHandler}>
      <h2 className="text-primary">{current ? 'Edit Contact' : 'Add Contact'}</h2>
      <input type="text" id="name" name="name" value={name} onChange={onChangeHandler} placeholder="Add Name..." />
      <input type="text" id="email" name="email" value={email} onChange={onChangeHandler} placeholder="Add Email..." />
      <input type="text" id="phone" name="phone" value={phone} onChange={onChangeHandler} placeholder="Add Phone..." />
      <h5>Contact Type</h5>
      <input type="radio" name="type" id="type" value="personal" checked={type === 'personal'} onChange={onChangeHandler} />
      Personal{' '}
      <input type="radio" name="type" id="type" value="professional" checked={type === 'professional'} onChange={onChangeHandler} />
      Professional{' '}
      <div>
        <input type="submit" value={current ? 'Update Contact' : 'Add Contact'} className="btn btn-primary btn-block" />
      </div>
      {current && (
        <div>
          <button className="btn btn-light btn-block" onClick={clearAll}>Clear</button>
        </div>
      )}
    </form>
  )
}

export default ContactForm
