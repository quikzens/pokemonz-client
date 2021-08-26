import React, { useState, useEffect } from 'react'
import { useUser } from '../../contexts/UserContext'

import './Form.css'

const Register = () => {
  // init context
  const { register } = useUser()

  // init state
  const [form, setForm] = useState({
    username: '',
    password: '',
  })
  const [error, setError] = useState(null)

  // init lifecycle
  useEffect(() => {
    return () => {
      setForm(null)
      setError(null)
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const msg = await register(form)
    if (msg?.error) setError(msg.error)
  }

  const handleChange = (e) => {
    const { name, value } = e.target

    setForm({
      ...form,
      [name]: value,
    })
  }

  return (
    <form className='form' onSubmit={handleSubmit}>
      {error && (
        <div className='form-alert alert alert-danger'>
          <p>{error}</p>
        </div>
      )}
      <div className='form-item'>
        <input
          type='text'
          name='username'
          id='username'
          value={form.username}
          onChange={handleChange}
          placeholder='Username'
          required
        />
      </div>
      <div className='form-item'>
        <input
          type='password'
          name='password'
          id='password'
          value={form.password}
          onChange={handleChange}
          placeholder='Password'
          required
        />
      </div>
      <button
        className='btn-outline-success form-submit btn w-100'
        type='submit'
      >
        Register
      </button>
    </form>
  )
}

export default Register
