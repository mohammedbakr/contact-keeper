import { useReducer } from 'react'
import ContactContext from './contactContext'
import ContactReducer from './contactReducer'
import uuid from 'uuid'
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
    ]
  }

  const [state, dispatch] = useReducer(ContactReducer, initialSatet)

  // ACTIONS
  // ADD CONATCT
  // DELETE CONTACT
  // SET CURRENT CONATCT
  // CLEAR CURRENT CONATCT
  // UPDATE CONTACT
  // FILTER CONTACTS
  // CLEAR FILTER

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts
      }}
    >
      {props.children}
    </ContactContext.Provider>
  )
}

export default ContactState