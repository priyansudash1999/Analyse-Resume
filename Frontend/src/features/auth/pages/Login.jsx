import React, { useState } from 'react'
import "../../auth/auth.form.scss"
import { useNavigate } from 'react-router'
import { Link } from 'react-router'
import { useAuth } from '../hooks/use.auth'
import Loader from '../components/Loader.jsx'

const login = () => {

    const {loading, handleLogin} = useAuth()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        handleLogin({email, password})
        navigate('/')
    }

    if(loading){
        return (
            <main>
                <Loader />
            </main>
        )
    }
  return (
    <main>
        <div className="form-container">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div className="inputs">
                    <label htmlFor="email">Email</label>
                    <input type="email" id='email' name='email' placeholder='Enter your email' onChange={e => setEmail(e.target.value)}/>
                </div>
                <div className="inputs">
                    <label htmlFor="password">Password</label>
                    <input type="password" id='password' name='password' placeholder='Enter your Password' onChange={e => setPassword(e.target.value)}/>
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
