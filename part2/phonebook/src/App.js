import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const addName = (event) => {
    event.preventDefault()

    if (persons.find((person)=> person.name === newName) !== undefined) {
      window.alert(`${newName} is already added to phonebook`);
    }
    else {
      setPersons(persons.concat({ name: newName }))
    }

    setNewName('')
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    console.log(persons)
    console.log({name: event.target.value})
  
    setNewName(event.target.value)
    console.log(newName)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person => 
          <div key={person.name}> {person.name} </div>
        )}
      </ul>
    </div>
  )
}

export default App