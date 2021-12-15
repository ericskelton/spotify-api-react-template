import React from 'react'

import Home from '../../ui/Home'
// import useInput from '../../utils/hooks/useInput'

export default function HomeRoute() {

    const sendDetails = (gameCode, playerName) =>{

    }
    console.log('home')
    return (
        <Home sendDetails={sendDetails}/>
    )
}
