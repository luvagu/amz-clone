import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { auth } from './firebase'
import { useStateValue } from './StateProvider'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

import Header from './components/header/Header'
import Home from './components/home/Home'
import Cart from './components/basket/Basket'
import Checkout from './components/checkout/Checkout'
import Login from './components/login/Login'
import Orders from './components/orders/Orders'

const promise = loadStripe('pk_test_519LE50LWDjvp29Bflo1RmTfOE9ZAIoLgOR5FPq0yujNgchqvkTm7xEg4GQZjOMKywqrThByBboSffzMlRQbim1nN00thJDBzDg')

function App() {
  const [{}, dispatch] = useStateValue()

  useEffect(() => {
    // will only run when the app component loads
    auth.onAuthStateChanged(authUser => {
      // console.log('The user is >>>', authUser)
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
            <Elements stripe={promise}>
              <Checkout />
            </Elements>
          </Route>
          <Route path='/orders'>
            <Header />
            <Orders />
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
