import {createContext, useState,useEffect} from "react"
import {getMe} from "./services/auth.api"
export const AuthContext=createContext();

export const AuthProvider=({children})=>{
    const [User, setUser] = useState(null);
    const [Loading, setLoading] = useState(true);
useEffect( () => {
 
    const getAndSetUser=async()=>{
    const data=await getMe();
        if (data) {
            setUser(data.user);
        }
        setLoading(false);
    }
    getAndSetUser();
}, [])

    return(
        <AuthContext.Provider value={{User,setUser,Loading,setLoading}}>
            {children}
        </AuthContext.Provider>
    )
}