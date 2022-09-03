import React, {useState, useEffect} from 'react'
import axios from 'axios'

import apiConfig from './apiConfig'

const headers = {
    'Content-Type': 'application/json',
    'X-API-KEY': apiConfig.apiKey,
}

const GetMovies = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        axios.get(`${apiConfig.baseUrl}`, {
            headers
        })
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        })
    }, [])

    return (
        <div>
            <ul>
                {
                    movies.map(movie => <li key={movie.id}>{movie.title}</li>)
                }
            </ul>
        </div>
    )
}
export default GetMovies