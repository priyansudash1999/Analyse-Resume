import React from 'react'
import "../../auth/auth.form.scss"
import { useNavigate } from 'react-router'
import { Link } from 'react-router'

const login = () => {
    const handleSubmit = (e) => {
        e.preventDefault()
    }
  return (
    <main>
        <div className="form-container">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div className="inputs">
                    <label htmlFor="email">Email</label>
                    <input type="email" id='email' name='email' placeholder='Enter your email' />
                </div>
                <div className="inputs">
                    <label htmlFor="password">Password</label>
                    <input type="password" id='password' name='password' placeholder='Enter your Password' />
                </div>
                <button className='button login-button'>
                    Login
                </button>
            </form>
            <p>Do not have an account ? <Link to={"/register"}>Register here</Link></p>
        </div>
    </main>
  )
}

export default login
