import React, {useContext} from 'react'

import Home from '../../ui/Home'
import { AuthContext } from '../../contexts/AuthContext'
// import useInput from '../../utils/hooks/useInput'

export default function HomeRoute() {
    const [auth, setAuth] = useContext(AuthContext)
    const sendDetails = (gameCode, playerName) =>{

    }
    console.log(auth)
    return (
        <Home sendDetails={sendDetails}/>
    )
}
