import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useUser } from '../contexts/UserContext'

function PrivateRoute({ component: Component, ...rest }) {
  const { user } = useUser()

  return (
    <>
      <Route
        {...rest}
        render={(props) =>
          user?.token ? (
            <>
              <Component {...props} />
            </>
          ) : (
            <Redirect to='/' />
          )
        }
      />
    </>
  )
}

export default PrivateRoute
