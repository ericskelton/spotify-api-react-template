import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import LoadingIndicator from '../ui/General/LoadingIndicator'
import { callbackAuthorizationCodeFlow, callbackImplicitGrantFlow } from "../utils/auth/authSpotify";
import { useLocation } from 'react-router-dom';
import CenteredCard from '../ui/General/CenteredCard'

const useQuery = () => new URLSearchParams(useLocation().search);

export default function Callback() {
    const [auth,setAuth] = useContext(AuthContext)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState({status: false, data: {}}) 
    const urlParams = useQuery()
    console.log(urlParams)
    //callbackImplicitGrantFlow()
    console.log('wtf')
    setLoading(true)
    callbackAuthorizationCodeFlow().then(res=>{
        setAuth(res)
    }).catch(err => {
        setLoading(false)
        setError({status: true, data: err})
    })
    if(loading){
        return <CenteredCard>
            <LoadingIndicator/>
        </CenteredCard>
    }

    if(error){
        
    }

    return error ? 
}
