import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { buttonStyle, headingStyle, inputStyle } from './StyleClasses'
import { UserSignUp } from '../utils/validation'
import { connect, useDispatch } from 'react-redux'
import { postUser } from '../redux/user/actions'

function SingUp({ postUser }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState('')

  const navigate = useNavigate()

  async function handleSignUp() {
    const result = UserSignUp.safeParse({
      email,
      password,
      confirmPassword,
    })

    if (!result.success) {
      console.log(result)
      console.log(UserSignUp)
      setErrors(result.error.format())
    } else {
      postUser(email, password)
      navigate('/')
    }
  }

  return (
    <div className="flex flex-col gap-5 items-center justify-center w-screen h-screen">
      <h1 className={headingStyle}>Sign Up</h1>
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={inputStyle + ' w-1/4'}
      />
      {errors?.email && (
        <div className="text-red-600">{errors?.email?._errors} </div>
      )}
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={inputStyle + ' w-1/4'}
      />
      {errors?.password && (
        <div className="text-red-600">{errors?.password?._errors} </div>
      )}
      <input
        placeholder="Repeat password"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className={inputStyle + ' w-1/4'}
      />
      {errors?.confirmPassword && (
        <div className="text-red-600">{errors?.confirmPassword?._errors} </div>
      )}
      <button onClick={handleSignUp} className={buttonStyle}>
        Sign up
      </button>
      <Link to="/login">Login</Link>
    </div>
  )
}

export default connect(null, { postUser })(SingUp)
