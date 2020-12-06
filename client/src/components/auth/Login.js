import { useState, useEffect, useContext } from 'react'
import AlertContext from '../../context/alert/alertContext'
import AuthContext from '../../context/auth/authContext'

const Login = (props) => {
  const alertContext = useContext(AlertContext)
  const authContext = useContext(AuthContext)

  const { setAlert } = alertContext
  const { login, error, clearErrors, isAuthenticated } = authContext

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/')
    }

    if (error === 'Invalid Credentials') {
      setAlert(error, 'danger')
      clearErrors()
    }
    // eslint-disable-next-line 
  }, [error, isAuthenticated, props.history])

  const [user, setUser] = useState({
    email: '',
    password: '',
  })

  const { email, password } = user

  const onchangeHandler = e => setUser({...user, [e.target.name]: e.target.value})

  const onSubmitHandler = e => {
    e.preventDefault()
    if (!email.trim() || !password.trim()) {
      setAlert('Please fill in all fields', 'danger')
    } else {
      login({
        email,
        password
      })
    }
  }

  return (
    <div className="form-container">
      <h1>Acount <span className="text-primary">Login</span></h1>
      <form onSubmit={onSubmitHandler} className="form-group">
        <div>
          <label htmlFor="email">Email</label>
          <input type="text" name="email" value={email} onChange={onchangeHandler} required />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" value={password} onChange={onchangeHandler} required />
        </div>
        <div>
          <input type="submit" vlaue="Login" className="btn btn-primary btn-block" />
        </div>
      </form>
    </div>
  )
}

export default Login
