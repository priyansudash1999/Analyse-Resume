import React from 'react'
import { useNavigate } from 'react-router'
import { Link } from 'react-router'

const Register = () => {
    const handleSubmit = (e) => {
        e.preventDefault()
    }
    const navigate = useNavigate()
  return (
    <main>
        <div className="form-container">
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <div className="inputs">
                    <label htmlFor="text">Username</label>
                    <input type="name" id='name' name='name' placeholder='Enter your name' />
                </div>
                <div className="inputs">
                    <label htmlFor="email">Email</label>
                    <input type="email" id='email' name='email' placeholder='Enter your email' />
                </div>
                <div className="inputs">
                    <label htmlFor="password">Password</label>
                    <input type="password" id='password' name='password' placeholder='Enter your Password' />
                </div>
                <button className='button register-button'>
                    Register
                </button>
            </form>

            <p>Already have an account ? <Link to={"/login"}>Login here</Link></p>
        </div>
    </main>
  )
}

export default Register
