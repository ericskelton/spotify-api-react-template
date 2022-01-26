import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import LoadingIndicator from '../ui/General/LoadingIndicator'
import { callbackAuthorizationCodeFlow, callbackImplicitGrantFlow } from "../utils/auth/authSpotify";
import { useLocation } from 'react-router-dom';
import CenteredCard from '../ui/General/CenteredCard'
import ErrorRoute from './Error/ErrorRoute'

const useQuery = () => new URLSearchParams(useLocation().search);

export default function Callback() {
    const [auth,setAuth] = useContext(AuthContext)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState({status: false, data: {}}) 
    const urlParams = useQuery()
    
    //callbackImplicitGrantFlow()
    useEffect(()=>{
        setLoading(true)
        callbackAuthorizationCodeFlow(urlParams.get('code')).then(res=>{
            setAuth(res)
            setLoading(false)
        }).catch(err => {
            setLoading(false)
            setError({status: true, data: err})
        })
     
    }, [urlParams])

    if(loading){
        return <CenteredCard>
            <LoadingIndicator/>
        </CenteredCard>
    }

    if(error.status){
        return <ErrorRoute error={error.data}/>
    }

    return (<Navigate to='/'/>)
}
