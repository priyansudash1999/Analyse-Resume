import { useContext } from "react";
import { AuthContext } from "../services/auth.context";
import {login, register, logout, getme} from "../services/auth.api.js"

export const useAuth = () => {
    const context = useContext(AuthContext)
    const {user, setUser, loading, setLoading} = context

    const handleLogin = async({email, password}) => {
        setLoading(true)
        try {
            const data = await login({email, password})
            setUser(data.user)
            // localStorage.setItem("user", data.user)
        } catch (error) {
            console.error(error);      
        }
        finally{
            setLoading(false)   
        }
        
    }

    const handleRegister = async({username, email, password}) => {
        setLoading(true)
        try {
            const data = await register({username, email, password})
            setUser(data.user)
        } catch (error) {
            console.error(error);
        }
        finally{
            setLoading(false)
        }  
    }

    const handleLogout = async() => {
        setLoading(true)
        try {
            const data = await logout()
            setUser(null)
        } catch (error) {
            console.error(error);  
        }
        finally{
            setLoading(false)
        }
    }

    const handleGetme = async() => {
        setLoading(true)
        try {
            const data = await getme()
            setUser(data.user)
        } catch (error) {
            console.error(error);
        }
        finally{
            setLoading(false)
        }
    }

    return {user, loading, handleRegister, handleLogin, handleLogout, handleGetme}
}