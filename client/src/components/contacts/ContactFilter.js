import { useContext, useRef, useEffect } from "react"
import ContactContext from '../../context/contact/contactContext'

// Filter contacts by name or email in one input only
const ContactFilter = () => {
  const contactContext = useContext(ContactContext)
  const text = useRef('')

  const { filterContacts, clearFilter, filtered } = contactContext

  useEffect(() => {
    if (!filtered) {
      text.current.value = ''
    }
  })

  const onchangeHandler = e => {
    // .current => property in useRef hook
    if (text.current.value.trim()) {
      filterContacts(e.target.value)
    } else {
      clearFilter()
    }
  }

  return (
    <form>
      <input type="text" ref={text} onChange={onchangeHandler} placeholder="Filter Contacts..."/>
    </form>
  )
}

export default ContactFilter
