import axios from 'axios'
import react, {useContext} from 'react'

const spotifyGet = async (path, token = null) => {
    if(path[0] === '/'){
        path = "https://api.spotify.com/v1" + path
    }
    let tokenHeader = undefined

    if(token){
        tokenHeader = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    }
    const response = await axios.get(path, tokenHeader)
    return response.data

}
export default spotifyGet