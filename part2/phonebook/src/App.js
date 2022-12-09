import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setFilter] = useState('')

  const addName = (event) => {
    event.preventDefault()

    if (persons.find((person)=> person.name === newName) !== undefined) {
      window.alert(`${newName} is already added to phonebook`);
    }
    else {
      personService
      .create({ name: newName, number: newNumber })
      .then(returned => {
        setPersons(persons.concat(returned))
        setNewName('')
        setNewNumber('')
      })    
    }
  }

  const deletePerson = (id) => {
    if (persons.find((person)=> person.id === id) !== undefined) {
      if (window.confirm(`Delete ${persons.find((person)=> person.id === id).name} ?`)) {
        //window.open("exit.html", "Thanks for Visiting!");
        personService
      .deletePerson({ id })
      .then(returned => {
        setPersons(persons.filter((person) => person.id !== id))
        setNewName('')
        setNewNumber('')
      })    
      }
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const personsToShow = newFilter
  ? persons.filter((person)=> person.name.toUpperCase().includes(newFilter.toUpperCase())) //conver to uppercase so that filter is case insensitive
  : persons //if there is no filter, show all persons

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter value={newFilter} onChange={handleFilterChange}></Filter>

      <h3>add a new</h3>

      <PersonForm 
        onSubmit={addName} 
        nameValue={newName} onChangeName={handleNameChange} 
        numberValue={newNumber} onChangeNumber={handleNumberChange}>
      </PersonForm>
      
      <h3>Numbers</h3>

      <Persons personsToShow={personsToShow} deletePerson={deletePerson}/>  
    </div>
  )
}

export default App