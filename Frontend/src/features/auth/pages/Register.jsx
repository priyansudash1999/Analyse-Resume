import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router' 
import Loader from '../components/Loader.jsx' 
import { useAuth } from '../hooks/use.auth.js'

const Register = () => {
    const [username, setuserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()
    const {loading, handleRegister} = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault()
        await handleRegister({username, email, password})
        navigate("/")
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
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <div className="inputs">
                    <label htmlFor="text">Username</label>
                    <input onChange={(e) => setuserName(e.target.value)} type="name" id='name' name='name' placeholder='Enter your name' />
                </div>
                <div className="inputs">
                    <label htmlFor="email">Email</label>
                    <input onChange={(e) => setEmail(e.target.value)} type="email" id='email' name='email' placeholder='Enter your email' />
                </div>
                <div className="inputs">
                    <label htmlFor="password">Password</label>
                    <input onChange={(e) => setPassword(e.target.value)} type="password" id='password' name='password' placeholder='Enter your Password' />
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
