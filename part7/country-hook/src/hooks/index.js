import { useState, useEffect } from 'react'
import axios from 'axios'

export const useCountry = (name) => {
    const [country, setCountry] = useState(null)

    const getCountry = async () => {
        axios
            .get(`https://restcountries.com/v2/name/${name}?fullText=true`)
            .then((response) => {
                console.log(response)
                setCountry(response)
            })
            .catch(() => {
                setCountry(null)
            })
    };

    useEffect(() => {
        getCountry();
    }, [name])

    return country
}