import { createContext, useEffect, useState } from "react";
import { getme } from "./auth.api.js";

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getAndsetUser = async() => {
            const data = await getme()
            console.log(data.user);
            
            setUser(data.user)
            setLoading(false)
        }

        getAndsetUser()
    }, [])

    return (
        <AuthContext.Provider value={{user, setUser, loading, setLoading}}>
            {children}
        </AuthContext.Provider>
    )
}