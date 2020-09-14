import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Header from './components/header/Header'
import Home from './components/home/Home'
import Cart from './components/basket/Basket'
import Checkout from './components/checkout/Checkout'
import Login from './components/login/Login'
import { auth } from './firebase'
import { useStateValue } from './StateProvider'


function App() {
  const [{}, dispatch] = useStateValue()

  useEffect(() => {
    // will only run when the app component loads
    auth.onAuthStateChanged(authUser => {
      // console.log('The user is >>>', authUser.email)
      if (authUser) {
        // user logged in / or was logged in
        dispatch({
          type: 'SET_USER',
          user: authUser
        })
      } else {
        // user logged out
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }
    })
  }, [])

  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/basket'>
            <Header />
            <Cart />
          </Route>
          <Route path='/checkout'>
            <Header />
            <Checkout />
          </Route>
          <Route path='/'>
            <Header />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App
