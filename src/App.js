import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { UserProvider } from './contexts/UserContext'

import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home/Home'
import DetailPokemon from './pages/DetailPokemon/DetailPokemon'
import MyPokemon from './pages/MyPokemon/MyPokemon'
import Exchange from './pages/Exchange/Exchange'
import PrivateRoute from './routes/PrivateRoute'

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/pokemon/:id' component={DetailPokemon} />
          <PrivateRoute path='/mypokemon' component={MyPokemon} />
          <PrivateRoute path='/exchange' component={Exchange} />
        </Switch>
      </Router>
    </UserProvider>
  )
}

export default App
