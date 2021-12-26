import { useState, useContext } from "react";
import { AuthContext } from '../../contexts/AuthContext'
import axios from 'axios'
// custom hook to get details from the spotify api
// supports post and put, I dont know if thats even useful
// I was thinking it was a regular function and not a hook
// not gonna remove it so I gave it a default value of get
//
// the use case that I have used this for is getting data 
// and having that the data needed changed, for example:
// you want to use the spotify api to get the top 100 songs 
// and display them on your page with server side pagination, 
// do the following: const {data, loading, error} = useSpotify() https://www.api.spotify.com/v1/some/data/endpoint?offset=${first state variable}&limit={second state variable}
// use the first to determine the number of offset records and second to determine how many records are returned
export default function useSpotify(url, http_method = 'get'){
    const [auth] = useContext(AuthContext)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [data, setData] = useState({})
    const [response, setResponse] = useState({}) 

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

    
    
    const sendRequest = () => {
        setLoading(true)
        axiosMethod(url, {'Authorization': 'Bearer ' + auth.token}).then(res =>{
            setData(res.data)
            setError(false)
            setLoading(false)
            setResponse(res)
        }).catch(err =>{
            setError(true)
            setData(err.data)
            setResponse(err)
            setLoading(false)

        })
        
        
    }
    useEffect(() =>{
        const fetchData = async () =>{
            
            return sendRequest(http_method, url)
        }

        fetchData()

    }, [url])

    return {data, loading, error, response}
}