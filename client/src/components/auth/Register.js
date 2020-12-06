import { useContext, useEffect, useState } from 'react'
import AlertContext from '../../context/alert/alertContext'
import AuthContext from '../../context/auth/authContext'

const Register = (props) => {
  const alertContext = useContext(AlertContext)
  const authContext = useContext(AuthContext)

  const { setAlert } = alertContext
  const { register, error, clearErrors, isAuthenticated } = authContext

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/')
    }

    if (error === 'User already exists') {
      setAlert(error, 'danger')
      clearErrors()
    }
    // eslint-disable-next-line 
  }, [error, isAuthenticated, props.history])

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  })

  const { name, email, password, password2 } = user

  const onchangeHandler = e => setUser({...user, [e.target.name]: e.target.value})

  const onSubmitHandler = e => {
    e.preventDefault()
    if (!name.trim() || !email.trim() || !password.trim()) {
      setAlert('Please enter all fileds', 'danger')
    } else if (password !== password2) {
      setAlert('Passwords do not match', 'danger')
    } else {
      register({
        name,
        email,
        password
      })
    }
  }

  return (
    <div className="form-container">
      <h1>Acount <span className="text-primary">Register</span></h1>
      <form onSubmit={onSubmitHandler} className="form-group">
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" value={name} onChange={onchangeHandler} required />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="text" name="email" value={email} onChange={onchangeHandler} required />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" value={password} onChange={onchangeHandler} required minLength="6" />
        </div>
        <div>
          <label htmlFor="password2">Confirm Password</label>
          <input type="password" name="password2" value={password2} onChange={onchangeHandler} required />
        </div>
        <div>
          <input type="submit" vlaue="Register" className="btn btn-primary btn-block" />
        </div>
      </form>
    </div>
  )
}

export default Register
