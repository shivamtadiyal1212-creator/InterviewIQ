import { Navigate } from "react-router";
import {useAuth} from "../hooks/useAuth.js";
import React from 'react'

const Protected = ({children}) => {
    const {Loading,User}=useAuth();


    if(Loading){
        return (
            <main>
                <h1>
                    loading....
                </h1>
            </main>
        )
    }

    if(!User){
        return (
            <Navigate to={"/login"}/>
        )
    }
  return (
    children
  )
}

export default Protected