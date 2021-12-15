import axios from 'axios'
import react, {useContext} from 'react'
import { AuthContext } from '../../contexts/AuthContext'

const spotifyGet = async (path) => {
    const [auth] = useContext(AuthContext)
    response = await axios.get(path, {
        headers: {
            Authorization: `Bearer ${auth.token}`
        }
    })
    return response

}
export default spotifyGet