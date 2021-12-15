import { useState, useContext } from "react";
import { AuthContext } from '../../contexts/AuthContext'
import axios from 'axios'
// custom hook to get details from the spotify api
export default function useSpotify(http_method, url){
    const [auth] = useContext(AuthContext)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [data, setData] = useState({})

    let axiosMethod = null
    switch(toLowerCase(http_method)){
        case 'get':
            axiosMethod = axios.get
            break
        case 'put':
            axiosMethod = axios.put
            break
        case 'post':
            axiosMethod = axios.post
            break
        default: 
            axiosMethod = axios.get
    }

    const headers = {
        
    }
    
    const sendRequest = async () => {
        setLoading(true)
        const response = await axiosMethod(url, {'Authorization': 'Bearer ' + auth.token})
        
        setData(response.data)
        console.log(response)
        setLoading(false)
    }
    useEffect(() =>{
        const fetchData = async () =>{
            
            return await sendRequest(http_method, url)
        }

        fetchData()

    }, [url])

    return {data, loading, error}
}