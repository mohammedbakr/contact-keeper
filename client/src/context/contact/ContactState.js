import { useReducer } from 'react'
import ContactContext from './contactContext'
import contactReducer from './contactReducer'
import { v4 as uuidv4 } from 'uuid';
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  CLEAR_FILTER,
  UPDATE_CONTACT,
  FILTER_CONTACTS
} from '../types'

const ContactState = props => {
  // STATE
  const initialSatet = {
    contacts: [
      {
        id: 1,
        name: 'test 1',
        email: 'test1@test.com',
        phone: '111-111-1111',
        type: 'personal'
      },
      {
        id: 2,
        name: 'test 2',
        email: 'test2@test.com',
        phone: '222-222-2222',
        type: 'personal'
      },
      {
        id: 3,
        name: 'test 3',
        email: 'test3@test.com',
        phone: '333-333-3333',
        type: 'professional'
      },
    ],
    current: null,
    filtered: null
  }

  const [state, dispatch] = useReducer(contactReducer, initialSatet)

  // ACTIONS
  // ADD CONATCT
  const addContact = contact => {
    contact.id = uuidv4()
    dispatch({
      type: ADD_CONTACT,
      payload: contact
    })
  }

  // DELETE CONTACT
  const deleteContact = id => {
    dispatch({
      type: DELETE_CONTACT,
      payload: id
    })
  }

  // SET CURRENT CONATCT
  const setCurrent = contact => {
    dispatch({
      type: SET_CURRENT,
      payload: contact
    })
  }

  // CLEAR CURRENT CONATCT
  const clearCurrent = () => {
    dispatch({
      type: CLEAR_CURRENT
    })
  }

  // UPDATE CONTACT
  const updateContact = contact => {
    dispatch({
      type: UPDATE_CONTACT,
      payload: contact
    })
  }

  // FILTER CONTACTS
  const filterContacts = text => {
    dispatch({
      type: FILTER_CONTACTS,
      payload: text
    })
  }

  // CLEAR FILTER
  const clearFilter = () => {
    dispatch({
      type: CLEAR_FILTER
    })
  }

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
        filterContacts,
        clearFilter
      }}
    >
      {props.children}
    </ContactContext.Provider>
  )
}

export default ContactState