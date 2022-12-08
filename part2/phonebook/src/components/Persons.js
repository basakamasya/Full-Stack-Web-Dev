const Persons = (props) =>       
<ul>
  {props.personsToShow.map(person => 
          <p key={person.name}> {person.name} {person.number} </p> )}
</ul>

export default Persons