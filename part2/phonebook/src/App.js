import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Success from './components/Success'
import Error from './components/Error'

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
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const addName = (event) => {
    event.preventDefault()

    if (persons.find((person)=> person.name === newName) !== undefined) {
      const personId = persons.find((person)=> person.name === newName).id
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personService
        .update(personId, { name: newName, number: newNumber })
        .then(returned => {
          setPersons(persons.map(person => person.id !== personId ? person : returned.data))
          setNewName('')
          setNewNumber('')

          setSuccessMessage(
            `Updated ${returned.data.name}`
          )
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
        })
        .catch(error =>{
          setErrorMessage("Information of " + newName + " has already been removed from server" )
        })
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)      
      }
    }
    else {
      personService
      .create({ name: newName, number: newNumber })
      .then(returned => {
        setPersons(persons.concat(returned))
        setNewName('')
        setNewNumber('')

        setSuccessMessage(
          `Added ${newName}`
        )
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)       
      })
      .catch(error =>{
        setErrorMessage("Something went wrong." + newName + " couldn't be added" )
      })  
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)     
    }
  }

  const deletePerson = (id) => {
    if (persons.find((person)=> person.id === id) !== undefined) {
      if (window.confirm(`Delete ${persons.find((person)=> person.id === id).name} ?`)) {
        personService
      .deletePerson({ id })
      .then(returned => {
        setPersons(persons.filter((person) => person.id !== id))
        setNewName('')
        setNewNumber('')
      })
      .catch(error =>{
        setErrorMessage("Something went wrong. Couldn't delete the person." )
      }) 
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)    
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

      <Success message={successMessage} />
      <Error message={errorMessage} />

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