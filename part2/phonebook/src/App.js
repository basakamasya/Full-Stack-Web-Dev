import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setFilter] = useState('')

  const addName = (event) => {
    event.preventDefault()

    if (persons.find((person)=> person.name === newName) !== undefined) {
      window.alert(`${newName} is already added to phonebook`);
    }
    else {
      setPersons(persons.concat({ name: newName, number: newNumber }))
    }

    setNewName('')
    setNewNumber('')
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

      <Persons personsToShow={personsToShow}/>  
    </div>
  )
}

export default App