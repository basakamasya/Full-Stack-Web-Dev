import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Countries from './components/Countries'
import SingleCountry from './components/SingleCountry'

import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([])

  const hook = () => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }

  useEffect(hook, [])

  const [newFilter, setFilter] = useState('')

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const showCountry = (country) => {
    //setCountries(country)
    // countries.filter((countries)=> countries.name.official.toUpperCase().includes(newFilter.toUpperCase()))
    setFilter(country.name.common)
  }  

  const countriesToShow = newFilter
  ? countries.filter((countries)=> countries.name.official.toUpperCase().includes(newFilter.toUpperCase())) //conver to uppercase so that filter is case insensitive
  : countries //if there is no filter, show all persons

  if (countriesToShow.length > 10) {
    return (
      <div>
      <Filter value={newFilter} onChange={handleFilterChange}></Filter>
      <p>Too many matches, specify another filter</p>
    </div>
    )
  }
  if (countriesToShow.length === 1) {
    console.log("single country", countriesToShow)
    console.log("filter is", newFilter)
    return (
      <div>
      <Filter value={newFilter} onChange={handleFilterChange}></Filter>
      <SingleCountry countriesToShow={countriesToShow}></SingleCountry>
    </div>
    )
  }
  return (
    <div>
      <Filter value={newFilter} onChange={handleFilterChange}></Filter>
      <Countries countriesToShow={countriesToShow} showCountry={showCountry}> </Countries>
    </div>
  )
}

export default App