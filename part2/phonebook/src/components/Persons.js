const Persons = (props) =>       
<ul>
  {props.personsToShow.map(person => 
          <li key={person.name}> {person.name} {person.number} <button onClick={() => props.deletePerson(person.id)}>delete</button></li> )}
</ul>

export default Persons