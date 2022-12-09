import { useState, useEffect } from 'react'
import axios from 'axios'

const SingleCountry = (props) =>  {
  const [weather, setWeather] = useState("")

  const capital = props.countriesToShow[0].capital[0]
  console.log(capital)

  const hook = () => {
    axios
      .get('https://wttr.in/'+capital+'.png')
      .then(response => {
        console.log('promise fulfilled')
        setWeather(response.data)
        console.log(response.data)
      })
  }
  
  useEffect(hook, [])
  return (
    <>
  {props.countriesToShow.map(country => 
    <div key={country.name.common}>
    <h1>{country.name.common}</h1>
    <p>capital {country.capital}</p>
    <p>area {country.area}</p>
    <b>languages</b>

      <ul>
      {Object.values(country.languages).map(language => 
              <li key={language}> {language} </li> )}
      </ul>

    <p>{country.flag}</p>
    <h1>Weather in {country.capital}</h1>
    <img src={"https://wttr.in/"+ country.capital +'.png'} ></img>
    </div>  
  )}
  </>
  )
} 


export default SingleCountry