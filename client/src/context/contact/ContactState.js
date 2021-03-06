import { useReducer } from 'react'
import axios from 'axios'
import ContactContext from './contactContext'
import contactReducer from './contactReducer'
import {
  GET_CONTACTS,
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  CLEAR_FILTER,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_CONTACTS,
  CONTACT_ERROR
} from '../types'

const ContactState = props => {
  // STATE
  const initialSatet = {
    contacts: null,
    current: null,
    filtered: null,
    error: null
  }

  const [state, dispatch] = useReducer(contactReducer, initialSatet)

  // ACTIONS
  // GET CONTACTS
  const getContacts = async () => {
    try {
      const res = await axios.get('api/contacts')
  
      dispatch({
        type: GET_CONTACTS,
        payload: res.data
      })
    } catch (error) {
      dispatch({
        type: CONTACT_ERROR,
        payload: error.response.msg
      })
    }
  }

  // ADD CONATCT
  const addContact = async contact => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    try {
      const res = await axios.post('api/contacts', contact, config)

      dispatch({
        type: ADD_CONTACT,
        payload: res.data
      })
    } catch (error) {
      dispatch({
        type: CONTACT_ERROR,
        payload: error.response.msg
      })
    }
  }

  // UPDATE CONTACT
  const updateContact = async contact => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    try {
      const res = await axios.put(`api/contacts/${contact._id}`, contact, config)

      dispatch({
        type: UPDATE_CONTACT,
        payload: res.data
      })
    } catch (error) {
      dispatch({
        type: CONTACT_ERROR,
        payload: error.response.msg
      })
    }
  }

  // DELETE CONTACT
  const deleteContact = async id => {
    try {
      await axios.delete(`api/contacts/${id}`)

      dispatch({
        type: DELETE_CONTACT,
        payload: id
      })
    } catch (error) {
      dispatch({
        type: CONTACT_ERROR,
        payload: error.response.msg
      })
    }    
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

  // CLEAR CONTACT
  const clearContacts = () => {
    dispatch({
      type: CLEAR_CONTACTS
    })
  }

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        getContacts,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
        filterContacts,
        clearFilter,
        clearContacts
      }}
    >
      {props.children}
    </ContactContext.Provider>
  )
}

export default ContactState