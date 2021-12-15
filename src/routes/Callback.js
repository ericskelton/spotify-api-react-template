import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { usePromiseTracker } from "react-promise-tracker";
import LoadingIndicator from '../reusable/LoadingIndicator'
import { callbackAuthorizationCodeFlow, callbackImplicitGrantFlow } from "../utils/auth/authSpotify";
export default function Callback() {
    const {promiseInProgress} = usePromiseTracker();
    const [auth,setAuth] = useContext(AuthContext)
    //callbackImplicitGrantFlow()
    console.log('wtf')
    callbackAuthorizationCodeFlow().then(res=>{
        setAuth(res)
    })


    return promiseInProgress ? <LoadingIndicator/> : <Navigate to="/" />;
}
