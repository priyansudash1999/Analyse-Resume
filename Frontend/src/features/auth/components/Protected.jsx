import { useAuth } from "../hooks/use.auth";
import Loader from "./Loader";
import { useNavigate } from "react-router";
import { useEffect } from 'react'

const Protected = ({children}) => {

    const navigate = useNavigate()
    const {loading, user} = useAuth()
    if(loading){
        return (
            <main>
                <Loader />
            </main>
        )
    }

    if(!user){
        useEffect(() => {
            navigate("/login")
        }, [])
    }

  return children
}

export default Protected
