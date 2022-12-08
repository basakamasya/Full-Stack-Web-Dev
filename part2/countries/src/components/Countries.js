const Countries = (props) =>       
<ul>
  {props.countriesToShow.map(country => 
          <li key={country.name.official}> {country.name.official} </li> )}
</ul>

export default Countries