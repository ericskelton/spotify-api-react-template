import React, { useContext, useState, useEffect, useMemo} from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import LoadingIndicator from '../ui/General/LoadingIndicator'
import { callbackAuthorizationCodeFlow, callbackImplicitGrantFlow } from "../utils/auth/authSpotify";
import { useLocation } from 'react-router-dom';
import CenteredCard from '../ui/General/CenteredCard'
import ErrorRoute from './Error/ErrorRoute'
import { useEffectDebugger } from '../utils/hooks/useEffectDebugger.ts'

const useQuery = () => new URLSearchParams(useLocation().search);

export default function Callback() {
    const [auth,setAuth] = useContext(AuthContext)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState({status: false, data: {}}) 
    const urlParams = useQuery()

    // For debug purposes only therefore should not be used outside dev
    // its pretty annoying too, so just do && false or comment it out if you don't need it
    if(process.env.REACT_APP_ENV === 'dev' && false){
        useEffect = useEffectDebugger
    }
    let authFunction = callbackAuthorizationCodeFlow
    // authFunction = callbackImplicitGrantFlow
    const login = ()=>{
        let isSubscribed = true
        setLoading(true)
        authFunction(urlParams.get('code')).then(res=>{
            console.log(res)
            if(isSubscribed){
                setAuth(res)
                setLoading(false)
            }
        }).catch(err => {
            console.log(err)
            if(isSubscribed){
                setError({status: true, data: err})
                setLoading(false)
            }
        })

        return () => isSubscribed = false
    }

    useEffect(login, [])

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
