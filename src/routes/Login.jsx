import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { buttonStyle, headingStyle, inputStyle } from './StyleClasses'
import { UserLogin } from '../utils/validation'
import { connect } from 'react-redux'
import { fetchOnMount, fetchUser } from '../redux/user/actions'
import { selectUser } from '../redux/user/selectors'

function Login({ user, fetchOnMount, fetchUser }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    fetchOnMount()
  }, [])

  useEffect(() => {
    if (user.id) navigate('/')
  }, [user])

  function handleLogin() {
    const result = UserLogin.safeParse({ email, password })

    if (!result.success) {
      setErrors(result.error.format())
    } else {
      const query = new URLSearchParams({
        email,
        password,
      }).toString()

      fetchUser(query)
    }
  }

  return (
    <div className="flex flex-col gap-5 items-center justify-center w-screen h-screen">
      <h1 className={headingStyle}>Login</h1>
      <input
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={inputStyle + ' w-1/4'}
      />
      {errors?.email && (
        <div className="text-red-600">{errors?.email?._errors} </div>
      )}
      <input
        placeholder="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={inputStyle + ' w-1/4'}
      />
      {errors?.password && (
        <div className="text-red-600">{errors?.password?._errors} </div>
      )}
      {errors?.invalid && (
        <div className="text-red-600">{errors?.invalid} </div>
      )}
      <button onClick={handleLogin} className={buttonStyle}>
        Login
      </button>

      <Link to="/signup">Sign Up</Link>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)

function mapStateToProps(state) {
  return {
    user: selectUser(state),
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchOnMount: () => dispatch(fetchOnMount()),
    fetchUser: () => dispatch(fetchUser()),
  }
}
