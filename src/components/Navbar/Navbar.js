import React, { useState } from 'react'
import { useUser } from '../../contexts/UserContext'
import { Link } from 'react-router-dom'

import Modal from '../Modal/Modal'
import Register from '../Form/Register'
import Login from '../Form/Login'

const Navbar = () => {
  const { user, logout } = useUser()

  const [isRegisterShow, setRegister] = useState(false)
  const [isLoginShow, setLogin] = useState(false)

  return (
    <nav className='navbar navbar-light bg-light'>
      <div className='container'>
        <Link to='/' className='navbar-brand'>
          Pokemonz
        </Link>
        {!user.token && (
          <div>
            <button
              className='btn btn-outline-success me-3'
              onClick={() => setLogin(true)}
            >
              Login
            </button>
            <button
              className='btn btn-outline-success'
              onClick={() => setRegister(true)}
            >
              Register
            </button>

            <Modal
              show={isLoginShow}
              close={() => setLogin(false)}
              title='Login'
            >
              <Login />
            </Modal>

            <Modal
              show={isRegisterShow}
              close={() => setRegister(false)}
              title='Register'
            >
              <Register />
            </Modal>
          </div>
        )}
        {user.token && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
            }}
          >
            {user.username && <p className='mb-0'>{user.username}</p>}
            <button className='btn btn-outline-success'>
              <Link to='/mypokemon' className='btn-link'>
                My Pokemon
              </Link>
            </button>
            <button className='btn btn-outline-success'>
              <Link to='/exchange' className='btn-link'>
                Exchange
              </Link>
            </button>
            <button className='btn btn-outline-success' onClick={logout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
