import { useReducer } from 'react'
import AlertContext from './alertContext'
import alertReducer from './alertReducer'
import { v4 as uuidv4 } from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from '../types'

const AlertState = props => {
  // STATE
  const initialSatet = [] // array of alerts each with unique id

  const [state, dispatch] = useReducer(alertReducer, initialSatet)
  // ACTIONS
  // SET ALERT
  const setAlert = (msg, type, timeout = 5000) => {
    const id = uuidv4()

    dispatch({
      type: SET_ALERT,
      payload: {msg, type, id}
    })

    setTimeout(() => dispatch({
      type: REMOVE_ALERT,
      payload: id
    }), timeout)
  }

  return (
    <AlertContext.Provider
      value={{
        alerts: state,
        setAlert
      }}
    >
      {props.children}
    </AlertContext.Provider>
  )
}

export default AlertState