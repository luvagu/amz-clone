import React from 'react'
import { Link } from 'react-router-dom'

import './Login.css'

function Login() {
    return (
        <div className="login">
            <Link to="/">
                <img className="login__logo" src="http://pngimg.com/uploads/amazon/amazon_PNG1.png" alt="" />
            </Link>

            <div className="login__container">
                <h1>Sign-In</h1>
            </div>
        </div>
    )
}

export default Login
